from django.urls import path
from . import views

urlpatterns = [
    path('image', views.PostView.as_view(), name= 'posts_list'),
]