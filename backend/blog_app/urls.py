from django.urls import path
from .views import (
    BlogListCreateView,
    CommentCreateView,
    LikeCreateView,
    SendEmailView
)

urlpatterns = [
    path('blogs/', BlogListCreateView.as_view(), name='blogs'),
    path('add_comments', CommentCreateView.as_view(), name='add_comments'),
    path('like', LikeCreateView.as_view(), name='like'),
    path('share_blog/', SendEmailView.as_view(), name='share_blog'),
]
