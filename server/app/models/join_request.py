from django.db import models

from .custom_user import CustomUser
from .league import League


class JoinRequest(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  league = models.ForeignKey(League, on_delete=models.CASCADE)
  accepted = models.BooleanField(blank=True, null=True, default=None)

  def __str__(self) -> str:
    return f"{self.user.username} -> {self.league.name} league"
