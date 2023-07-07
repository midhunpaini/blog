from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from .models import User
from .serializers import UserSerializers
import datetime
import jwt
from blog_app.models import Like
from blog_app.serializers import LikeSerializer

class RegisterView(APIView):

    def post(self, request):

        serializer = UserSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            errors = serializer.errors
            print(errors)
            return Response(errors, status=400)


class Login(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not Found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True, secure=True)


        response.data = {
            'jwt': token,
            'message': True,
            'name': user.name,
            'is_superuser': user.is_superuser
        }
        return response


class UserViews(APIView):
    def get(self, request):

        token = request.headers.get('Authorization')

    
        if not token:
            raise PermissionDenied('Unauthenticated')
        
        if not token or not token.startswith('Bearer '):
            raise PermissionDenied('Unauthenticated')

        token = token.split(' ')[1]

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise PermissionDenied('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()
        

        if not user:
            raise PermissionDenied('User not found')
        
        liked_blog = Like.objects.filter(user=user)
        liked_serializer = LikeSerializer(liked_blog, many=True) 
        serializer = UserSerializers(user)
        data = serializer.data
        data['liked_blogs'] = liked_serializer.data
        return Response(data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response