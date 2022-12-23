from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from app import mixins as appMixins
from app import models, serializers


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

    def get_permissions(self):
        if self.action in ['next_matches']:
            return []
        return super().get_permissions()

    @action(detail=False, methods=['get'])
    def next_matches(self, request):
        qs = models.Match.objects.filter(datetime__gte=timezone.now()).order_by('datetime')[:10]
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

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
