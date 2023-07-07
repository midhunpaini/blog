from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Blog, Comment, Like
from .serializers import BlogSerializer
import jwt
from user.models import User
from rest_framework.exceptions import  PermissionDenied
from django.core.mail import send_mail
from blog.settings import EMAIL_HOST_USER

class BlogListCreateView(APIView):
    def get(self, request):
        blogs = Blog.objects.filter(is_deleted=False)
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CommentCreateView(APIView):
    def post(self, request):
        blog_id = request.data['blogId']
        content= request.data['content']
        token = request.data['token']
        blog = Blog.objects.get(id=blog_id)
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise PermissionDenied('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()
        Comment.objects.create(blog=blog, user=user, author=user.name, content=content)
        return Response( status=status.HTTP_201_CREATED)
   



class LikeCreateView(APIView):
    def post(self, request):
        blog_id = request.data['blogId']
        token = request.data['token']
        blog = Blog.objects.get(id=blog_id)
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise PermissionDenied('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

        if Like.objects.filter(user=user,blog=blog).exists():
            Like.objects.filter(user=user,blog=blog).delete()
        else:
            Like.objects.create(user=user,blog=blog)
        return Response(status=status.HTTP_201_CREATED)


class SendEmailView(APIView):
    def post(self, request):
        subject = request.data.get('subject')
        message = request.data.get('message')
        to_email = request.data.get('email')
        url = request.data.get('url')
        
     
        try:
            payload = jwt.decode(request.data.get('token'), 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise PermissionDenied('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

       
        email_subject = f"{subject} - {user.name}"
        email_message = f"{message}\n\nURL: {url}"
        
       
        send_mail(email_subject, email_message, EMAIL_HOST_USER, [to_email])

        return Response({'success': 'Email sent successfully'})
  



    
        
