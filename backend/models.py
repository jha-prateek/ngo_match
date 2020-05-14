from django.db import models

# Create your models here.
class NGO(models.Model):
    name = models.TextField()
    city = models.TextField()
    state = models.TextField()
    full_address = models.TextField()
    contact_1 = models.CharField(max_length=13, null=True)
    contact_2 = models.CharField(max_length=13, null=True)
    website = models.URLField(null=True)
    email = models.EmailField(null=True)
    pincode = models.CharField(max_length=6, null=True)

    # python manage.py makemigrations --empty --name NGO backend 