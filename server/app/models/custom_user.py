from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
  USERNAME_FIELD = 'email'
  EMAIL_FIELD = 'email'
  REQUIRED_FIELDS = ['username']
  avatar = models.ImageField(upload_to='avatars', blank=True)
  email = models.EmailField(max_length=255, unique=True)
