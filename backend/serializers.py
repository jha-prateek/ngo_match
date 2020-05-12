from rest_framework import serializers
from .models import NGO

class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = ('ngo_id', 'name', 'city', 'state', 'address_line', 'contact_1', 'contact_2')