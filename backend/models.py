from django.db import models

# Create your models here.
class NGO(models.Model):
    ngo_id = models.TextField()
    name = models.TextField()
    city = models.TextField()
    state = models.TextField()
    address_line = models.TextField()
    contact_1 = models.TextField(null=True)
    contact_2 = models.TextField(null=True)

    # python manage.py makemigrations --empty --name NGO backend 