from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from app import mixins as appMixins
from app import models, serializers


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
