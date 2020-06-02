from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('api/ngos/at/', views.NGOList.as_view()),
    path('api/ngos/search/', views.NGOListByCity.as_view()),
    path('api/cities/', views.CityList.as_view()),
    url(r'^', views.IndexPage.as_view()),
]