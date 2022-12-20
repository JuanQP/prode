from django.db import models

from .competition import Competition
from .custom_user import CustomUser


class League(models.Model):
  """
  Uses a Competition to bootstrap a League.

  Leagues can be private (a user needs to ask for permission to participate)
  or can be public (everyone can participate).
  """
  owner = models.ForeignKey(CustomUser, related_name='leagues', on_delete=models.CASCADE, default=1)
  competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
  participants = models.ManyToManyField(CustomUser, through='Participant')
  name = models.CharField(max_length=100)
  is_public = models.BooleanField(default=False)

  def __str__(self) -> str:
    return self.name
