from django.db import models

from .match import Match
from .participant import Participant


class Prediction(models.Model):
  """
  The Prediction made by an user.
  """
  POINTS_FOR_GUESSING_WINNER = 45
  POINTS_FOR_GUESSING_GOALS = 15
  match = models.ForeignKey(Match, on_delete=models.CASCADE)
  participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
  team_a_score = models.CharField(max_length=2)
  team_b_score = models.CharField(max_length=2)

  class Meta:
    # Only one prediction per match per participant
    unique_together = ('match', 'participant')

  def update_score(self, finished_match: Match):
    total_points = 0
    guessed_tie = (finished_match.team_a_score == finished_match.team_b_score) and (self.team_a_score == self.team_b_score)
    guessed_team_a_has_won = (finished_match.team_a_score > finished_match.team_b_score) and (self.team_a_score > self.team_b_score)
    guessed_team_b_has_won = (finished_match.team_a_score < finished_match.team_b_score) and (self.team_a_score < self.team_b_score)
    guessed_winner = guessed_tie or guessed_team_a_has_won or guessed_team_b_has_won

    if(guessed_winner):
      total_points += self.POINTS_FOR_GUESSING_WINNER
    if(finished_match.team_a_score == self.team_a_score):
      total_points += self.POINTS_FOR_GUESSING_GOALS
    if(finished_match.team_b_score == self.team_b_score):
      total_points += self.POINTS_FOR_GUESSING_GOALS

    self.participant.score += total_points
    self.participant.save()

  def __str__(self) -> str:
    team_a = self.match.team_a.short_name
    score_a = self.team_a_score
    team_b = self.match.team_b.short_name
    score_b = self.team_b_score

    if score_a == '' or score_b == '':
      return f"{team_a} - {team_b}"

    return f"{team_a} {score_a} - {team_b} {score_b}"
