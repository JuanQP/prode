from django.contrib.auth.models import AbstractUser
from django.db import models, transaction
from django.utils import timezone


# Create your models here.
class CustomUser(AbstractUser):
  USERNAME_FIELD = 'email'
  EMAIL_FIELD = 'email'
  REQUIRED_FIELDS = ['username']
  avatar = models.CharField(max_length=255, blank=True, default='')
  email = models.EmailField(max_length=255, unique=True)

class Team(models.Model):
  """
  It could be Argentina, France, Barcelona, PSG...
  """
  name = models.CharField(max_length=100)
  short_name = models.CharField(max_length=4, blank=True, default='')
  image = models.CharField(max_length=255, blank=True, default='')

  def __str__(self) -> str:
    return self.name

class Competition(models.Model):
  """
  League's templates. This is where the participant teams and matches
  are defined.
  """
  name = models.CharField(max_length=100)

  def __str__(self) -> str:
    return self.name

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

class JoinRequest(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  league = models.ForeignKey(League, on_delete=models.CASCADE)
  accepted = models.BooleanField(blank=True, null=True, default=None)

  def __str__(self) -> str:
    return f"{self.user.username} -> {self.league.name} league"
