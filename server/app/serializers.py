from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from app import models


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.CustomUser
    fields = ['id', 'username', 'avatar']
    read_only_fields = ['id', 'username', 'avatar']

class TeamSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Team
    fields = ['id', 'name', 'short_name', 'image']

class CompetitionSerializer(serializers.ModelSerializer):
  match_count = serializers.SerializerMethodField()
  league_count = serializers.SerializerMethodField()
  class Meta:
    model = models.Competition
    fields = ['id', 'name', 'match_count', 'league_count']

  def get_match_count(self, obj):
    return obj.match_set.count()

  def get_league_count(self, obj):
    return obj.league_set.count()

class LeagueCreateUpdateSerializer(serializers.ModelSerializer):
  competition = serializers.PrimaryKeyRelatedField(many=False, queryset=models.Competition.objects.all())
  participants = serializers.PrimaryKeyRelatedField(many=True, queryset=models.CustomUser.objects.all())

  class Meta:
    model = models.League
    fields = ['id', 'name', 'is_public', 'competition', 'participants']

class LeagueSerializer(serializers.ModelSerializer):
  competition = serializers.PrimaryKeyRelatedField(read_only=True, many=False)
  competition_name = serializers.StringRelatedField(read_only=True, source='competition.name')
  owner_username = serializers.StringRelatedField(read_only=True, source='owner.username')

  class Meta:
    model = models.League
    fields = ['id', 'name', 'is_public', 'competition', 'competition_name', 'owner_username']
    read_only_fields = ['id', 'name', 'is_public', 'competition_name', 'owner_username']

class ParticipantSerializer(serializers.ModelSerializer):
  league = LeagueSerializer(read_only=True)
  user = UserSerializer(read_only=True)
  class Meta:
    model = models.Participant
    fields = ['id', 'score', 'user', 'league']

class FinishMatchSerializer(serializers.ModelSerializer):
  team_a_score = serializers.CharField(allow_blank=False, min_length=1, max_length=2, required=True)
  team_b_score = serializers.CharField(allow_blank=False, min_length=1, max_length=2, required=True)
  class Meta:
    model = models.Match
    fields = [
      'id',
      'team_a_score',
      'team_b_score',
    ]

class MatchSerializer(serializers.ModelSerializer):
  competition = serializers.PrimaryKeyRelatedField(many=False, queryset=models.Competition.objects.all())
  team_a = serializers.PrimaryKeyRelatedField(many=False, queryset=models.Team.objects.all())
  team_b = serializers.PrimaryKeyRelatedField(many=False, queryset=models.Team.objects.all())
  team_a_detail = TeamSerializer(source='team_a', read_only=True)
  team_b_detail = TeamSerializer(source='team_b', read_only=True)

  class Meta:
    model = models.Match
    fields = [
      'id',
      'competition',
      'team_a',
      'team_a_detail',
      'team_a_score',
      'team_b',
      'team_b_detail',
      'team_b_score',
      'datetime',
      'stadium',
      'status',
      'description',
    ]
    depth = 1

  def validate(self, attrs):
    if attrs['team_a'] == attrs['team_b']:
      raise serializers.ValidationError({
        "team_a": "Team A and Team B must be different.",
        "team_b": "Team B and Team A must be different."
      })

    return attrs

class CompetitionDetailSerializer(serializers.ModelSerializer):
  matches = MatchSerializer(source='match_set', many=True)
  leagues = LeagueSerializer(source='league_set', many=True)
  class Meta:
    depth = 1
    model = models.Competition
    fields = ['id', 'name', 'leagues', 'matches']

class PredictionSerializer(serializers.ModelSerializer):
  match = MatchSerializer(read_only=True)
  participant = ParticipantSerializer(read_only=True)
  class Meta:
    model = models.Prediction
    fields = [
      'id',
      'match',
      'participant',
      'team_a_score',
      'team_b_score',
    ]

class PredictionCreateSerializer(serializers.ModelSerializer):
  match = serializers.PrimaryKeyRelatedField(many=False, queryset=models.Match.objects.all())
  class Meta:
    model = models.Prediction
    fields = [
      'id',
      'match',
      'team_a_score',
      'team_b_score',
    ]

class PredictionUpdateSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Prediction
    fields = [
      'id',
      'team_a_score',
      'team_b_score',
    ]

class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=models.CustomUser.objects.all())]
  )
  password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = models.CustomUser
    fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name', 'avatar')

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({"password": "Password fields didn't match."})

    return attrs

  def create(self, validated_data):
    user = models.CustomUser.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      avatar=validated_data['avatar'],
    )
    user.set_password(validated_data['password'])
    user.save()

    return user


class JoinRequestSerializer(serializers.ModelSerializer):
  user = serializers.PrimaryKeyRelatedField(many=False, queryset=models.CustomUser.objects.all())
  league = serializers.PrimaryKeyRelatedField(many=False, queryset=models.League.objects.all())
  class Meta:
    model = models.JoinRequest
    fields = [
      'id',
      'user',
      'league',
      'accepted',
    ]

class JoinRequestCreateSerializer(serializers.ModelSerializer):
  league = serializers.PrimaryKeyRelatedField(many=False, queryset=models.League.objects.all())
  class Meta:
    model = models.JoinRequest
    fields = [
      'id',
      'league',
    ]

class JoinRequestUpdateSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.JoinRequest
    fields = [
      'id',
      'accepted'
    ]


# DRF Simple JWT Login with Email
# https://stackoverflow.com/a/67256983/4792093
class EmailTokenObtainSerializer(TokenObtainPairSerializer):
  username_field = get_user_model().EMAIL_FIELD

  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    token['user'] = UserSerializer(user).data

    return token
