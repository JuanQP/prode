from django.db import models

from .custom_user import CustomUser
from .league import League


class Participant(models.Model):
  """
  A User can be a Participant of a League when a League is private.

  Only Users that are also a Participant of a private League can participate.
  """
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  league = models.ForeignKey(League, on_delete=models.CASCADE)
  score = models.IntegerField(default=0)

  class Meta:
    # A User can be a participant of a league once
    unique_together = ('user', 'league')

  def __str__(self) -> str:
    return f"Participante {self.league.name} -> {self.user.username}"
