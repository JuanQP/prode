from django.db import models


class Competition(models.Model):
  """
  League's templates. This is where the participant teams and matches
  are defined.
  """
  name = models.CharField(max_length=100)

  def __str__(self) -> str:
    return self.name
