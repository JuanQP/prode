from rest_framework import mixins, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from app import exceptions as app_exceptions
from app import models, serializers


class JoinRequestViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = models.JoinRequest.objects.all()
    serializer_class = serializers.JoinRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_staff:
            return self.queryset.filter(user=user)
        return super().get_queryset()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.JoinRequestCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return serializers.JoinRequestUpdateSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        """User wants to join League"""
        user = self.request.user
        league = serializer.validated_data['league']
        if league.is_public:
            raise app_exceptions.LeagueIsPublic()

        hasUnansweredRequests = models.JoinRequest.objects.filter(
            user=user,
            league=league,
            accepted__isnull=True
        ).exists()
        if hasUnansweredRequests:
            raise app_exceptions.UnansweredRequests()

        serializer.save(user=user)

    def perform_update(self, serializer):
        user = self.request.user
        join_request = self.get_object()
        if (not user.is_staff) and (join_request.league.owner.id != user.id):
            raise PermissionDenied({'message': 'You are not the owner of this League.'})
        if not join_request.accepted is None:
            raise PermissionDenied({'message': 'This join request has already been answered.'})
        # Accepted request
        if serializer.validated_data['accepted']:
            join_request.league.participants.add(user)

        return super().perform_update(serializer)
