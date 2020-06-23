from rest_framework import serializers
from .models import NGO


class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = ('id', 'name', 'full_address', 'contact_1',
                  'contact_2', 'website', 'email')


class CreateNGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = "__all__"

        extra_kwargs = {
            'website': {
                # Tell DRF that the link field is not required.
                'required': False,
                'allow_blank': True,
            },
            'contact_2': {
                # Tell DRF that the link field is not required.
                'required': False,
                'allow_blank': True,
            }
        }
