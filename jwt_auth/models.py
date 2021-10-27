from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class User(User):
    display_name = models.CharField(max_length=50)
    profile_image = models.CharField(max_length=250)