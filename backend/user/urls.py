from django.urls import path
from .views import *


urlpatterns = [
    path('register',RegisterView.as_view(), name='register' ), 
    path('login',Login.as_view(), name='login' ), 
    path('user',UserViews.as_view(), name='user' ), 
    path('logout',LogoutView.as_view(), name='logout' ),  
]