
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/',include('blog_app.urls')),
    path('api/user/',include('user.urls'))
]
