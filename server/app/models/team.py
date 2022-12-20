from django.db import models


class Team(models.Model):
  """
  It could be Argentina, France, Barcelona, PSG...
  """
  name = models.CharField(max_length=100)
  short_name = models.CharField(max_length=4, blank=True, default='')
  image = models.CharField(max_length=255, blank=True, default='')

  def __str__(self) -> str:
    return self.name
