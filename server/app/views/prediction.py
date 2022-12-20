from django.utils import timezone
from rest_framework import mixins, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from app import mixins as appMixins
from app import models, serializers


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
