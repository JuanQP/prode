from django.utils import timezone
from rest_framework import generics, mixins, status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from app import mixins as appMixins
from app import models, serializers


@api_view(['GET'])
def hello_world(request):
    """
    Retrieve, update or delete a code snippet.
    """
    return Response({'message': 'Hello world! 👋 This is the Prode backend API'})

class Authenticated(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"content": "You are seeing this response because you are logged in."})

class AdminAuthenticated(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({"content": "You are seeing this response because you are an admin."})

class RegisterView(generics.CreateAPIView):
    queryset = models.CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = serializers.RegisterSerializer

class CompetitionViewSet(
    appMixins.PublicListAndRetrieveAdminEverythingElse,
    viewsets.ModelViewSet,
):
    """
    Competitions
    """
    queryset = models.Competition.objects.all()
    serializer_class = serializers.CompetitionSerializer

class TeamViewSet(
    appMixins.PublicListAndRetrieveAdminEverythingElse,
    viewsets.ModelViewSet,
):
    """
    Teams
    """
    queryset = models.Team.objects.all()
    serializer_class = serializers.TeamSerializer

class MatchViewSet(
    appMixins.PublicListAndRetrieveAdminEverythingElse,
    viewsets.ModelViewSet,
):
    """
    Matches
    """
    queryset = models.Match.objects.all()
    serializer_class = serializers.MatchSerializer

    def get_serializer_class(self):
        if self.action == 'finish':
            return serializers.FinishMatchSerializer
        return super().get_serializer_class()

    @action(detail=True, methods=['post'])
    def finish(self, request, pk=None):
        match = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if match.status == models.Match.MatchStatus.FINISHED:
            return Response({'message': "Match won't update because it's finished."}, status=status.HTTP_400_BAD_REQUEST)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        team_a_score = serializer.data['team_a_score']
        team_b_score = serializer.data['team_b_score']
        match.mark_as_finished(team_a_score, team_b_score)
        return Response({'message': f'Match finished with result {team_a_score}-{team_b_score}'})

class ParticipantViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """
    Participants in Leagues
    """
    queryset = models.Participant.objects.all()
    serializer_class = serializers.ParticipantSerializer

class LeagueViewSet(
    appMixins.PublicListAndRetrieveAuthenticatedEverythingElse,
    viewsets.ModelViewSet
):
    """
    Leagues
    """
    queryset = models.League.objects.all()
    serializer_class = serializers.LeagueSerializer

    def get_serializer_class(self):
        if self.action == 'add_prediction':
            return serializers.PredictionCreateSerializer
        if self.action in ['create', 'update', 'partial_update']:
            return serializers.LeagueCreateUpdateSerializer
        return super().get_serializer_class()

    def perform_update(self, serializer):
        league = self.get_object()
        user = self.request.user
        if not self.request.user.is_staff and not league.participants.filter(id=user.id).exists():
            raise PermissionDenied({'message': 'This League is not yours.'})
        return super().perform_update(serializer)

    def perform_destroy(self, instance):
        user = self.request.user
        if not self.request.user.is_staff and not instance.participants.filter(id=user.id).exists():
            raise PermissionDenied({'message': 'This League is not yours.'})
        return super().perform_destroy(instance)

    @action(detail=True, methods=['post'])
    def add_prediction(self, request, pk=None):
        user = self.request.user
        league = self.get_object()
        prediction_serializer = self.get_serializer(data=request.data)
        # Check if data is valid
        if not prediction_serializer.is_valid():
            return Response(prediction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Check if participant and match is valid
        participant = models.Participant.objects.filter(user=user.id, league=league.id).first()
        match = league.competition.match_set.filter(id=prediction_serializer.validated_data.get('match').id).first()
        if not match:
            return Response({'message': 'This Match does not belong to this League.'}, status=status.HTTP_400_BAD_REQUEST)
        if not league.is_public and not participant:
            return Response({'message': 'This League is private.'}, status=status.HTTP_403_FORBIDDEN)

        # League is public at this point
        if not participant:
            participant = models.Participant(user=user, league=league)
            participant.save()

        # Whether league is public or private
        prediction_serializer.save(participant=participant, match=match)
        return Response(prediction_serializer.data)

class PredictionViewSet(
    appMixins.PublicListAndRetrieveAuthenticatedEverythingElse,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """
    Predictions of all League Participants
    """
    queryset = models.Prediction.objects.all()
    serializer_class = serializers.PredictionSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return serializers.PredictionUpdateSerializer
        return super().get_serializer_class()

    def match_started_or_finished(self, prediction: models.Prediction):
        is_match_finished = prediction.match.status == models.Match.MatchStatus.FINISHED
        is_match_started = timezone.now() > prediction.match.datetime
        return is_match_finished or is_match_started

    def perform_update(self, serializer):
        prediction = self.get_object()
        user = self.request.user
        if not self.request.user.is_staff and prediction.participant.user.id != user.id:
            raise PermissionDenied({'message': 'This Prediction is not yours.'})
        if self.match_started_or_finished(prediction):
            raise PermissionDenied({'message': 'You can\'t update this Prediction because game has started or has finished.'})
        return super().perform_update(serializer)

    def perform_destroy(self, instance):
        user = self.request.user
        if not self.request.user.is_staff and instance.participant.user.id != user.id:
            raise PermissionDenied({'message': 'This Prediction is not yours.'})
        if self.match_started_or_finished(instance):
            raise PermissionDenied({'message': 'You can\'t delete this Prediction because game has started or has finished.'})
        return super().perform_destroy(instance)
