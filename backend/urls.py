from django.urls import path
from django.conf.urls import url
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('api/ngos/at', views.NGOList.as_view()),
    path('api/ngos/search', views.NGOListByCity.as_view()),
    path('api/cities', views.CityList.as_view()),
    path('api/add', views.create_ngo),
    url(r'^$', views.IndexPage.as_view()),   
]