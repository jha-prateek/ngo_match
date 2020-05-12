from django.urls import path
from . import views

urlpatterns = [
    path('api/ngos/', views.NGOListCreate.as_view()),
]