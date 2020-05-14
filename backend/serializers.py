from rest_framework import serializers
from .models import NGO

class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = ('name', 'city', 'state', 'full_address', 'contact_1', 'contact_2', 'website', 'email', 'pincode' )