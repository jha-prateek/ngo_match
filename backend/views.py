from django.shortcuts import render
from rest_framework import generics
from .models import NGO
from .serializers import NGOSerializer

# Create your views here.
class NGOListCreate(generics.ListCreateAPIView):
    queryset = NGO.objects.all()
    serializer_class = NGOSerializer