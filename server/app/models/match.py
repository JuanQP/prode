from django.db import models, transaction
from django.utils import timezone

from .competition import Competition
from .team import Team


class Match(models.Model):
  """
  A Match is a single football match.

  It holds data about stadium, teams, and their scores.

  A Match can be PENDING or FINISHED.

  When a Match is FINISHED it should trigger an update of all the
  Predictions by informing first to its Competition.
  """
  class MatchStatus(models.TextChoices):
    PENDING = 'Pendiente'
    FINISHED = 'Finalizado'

  competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
  team_a = models.ForeignKey(Team, related_name='+', on_delete=models.CASCADE)
  team_a_score = models.CharField(max_length=2, blank=True, default='')
  team_b = models.ForeignKey(Team, related_name='+', on_delete=models.CASCADE)
  team_b_score = models.CharField(max_length=2, blank=True, default='')
  datetime = models.DateTimeField(default=timezone.now)
  stadium = models.CharField(max_length=50)
  status = models.CharField(
    max_length=30,
    choices=MatchStatus.choices,
    default=MatchStatus.PENDING,
  )
  description = models.CharField(max_length=100, blank=True, default='')

  def mark_as_finished(self, team_a_score: str, team_b_score: str):
    if self.status == Match.MatchStatus.FINISHED:
      return
    with transaction.atomic():
      self.team_a_score = team_a_score
      self.team_b_score = team_b_score
      self.status = Match.MatchStatus.FINISHED
      self.save()
      # Every single prediction should be checked
      for prediction in self.prediction_set.select_related('participant').all():
        prediction.update_score(self)

  def __str__(self) -> str:
    return f"{self.team_a.short_name} - {self.team_b.short_name}"
