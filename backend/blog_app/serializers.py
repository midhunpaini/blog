from rest_framework import serializers
from .models import Blog, Comment, Like

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    likes = LikeSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = '__all__'

    
    def get_author_name(self, obj):
        return obj.author.name if obj.author else None
    

    def get_likes_count(self, obj):
        return obj.likes.count()

class EmailSerializer(serializers.Serializer):
    to_email = serializers.EmailField()
    subject = serializers.CharField()
    message = serializers.CharField()