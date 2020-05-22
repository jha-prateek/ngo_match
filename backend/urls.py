from django.urls import path
from . import views

urlpatterns = [
    path('api/ngos/at/', views.NGOList.as_view()),
    path('api/cities/', views.CityList.as_view()),
]