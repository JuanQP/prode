from django.utils import timezone
from rest_framework import filters, generics, pagination, status, viewsets
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
    public_actions = ['retrieve', 'list', 'can_join', 'next_matches', 'matches']

    def get_serializer_class(self):
        if self.action == 'add_prediction':
            return serializers.PredictionCreateSerializer
        elif self.action == 'retrieve':
            return serializers.LeagueDetailSerializer
        elif self.action == 'create':
            return serializers.LeagueCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return serializers.LeagueUpdateSerializer
        elif self.action in ['my_leagues', 'my_league']:
            return serializers.MyLeagueSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(owner=user)
        return super().perform_create(serializer)

    def perform_update(self, serializer):
        league = self.get_object()
        user = self.request.user
        if not self.request.user.is_staff and league.owner.id != user.id:
            raise PermissionDenied({'message': 'This League is not yours.'})
        return super().perform_update(serializer)

    def perform_destroy(self, instance):
        league = self.get_object()
        user = self.request.user
        if not self.request.user.is_staff and league.owner.id != user.id:
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

    @action(detail=True, methods=['get'])
    def can_join(self, request, pk=None):
        user = self.request.user
        league = self.get_object()

        if not user.is_authenticated:
            return Response({'can_join': False, 'is_participant': False, 'message': 'Tenés que estar logueado.'})

        is_participant = league.participant_set.filter(user=user).exists()
        has_pending_join_request = league.joinrequest_set.filter(user=user, accepted__isnull=True).exists()
        message = 'Podés unirte'

        if has_pending_join_request:
            message = 'Tenés una solicitud para unirte pendiente.'
        if is_participant:
            message = 'Ya estás participando en esta liga.'

        return Response({
            'can_join': not has_pending_join_request and not is_participant,
            'is_participant': is_participant,
            'message': message
        })

    @action(detail=True, methods=['get'])
    def next_matches(self, request, pk=None):
        league = self.get_object()
        matches = league.competition.match_set.filter(datetime__gte=timezone.now())
        serializer = serializers.MatchSerializer(matches, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def matches(self, request, pk=None):
        league = self.get_object()
        matches = league.competition.match_set.all()
        serializer = serializers.MatchSerializer(matches, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def my_predictions(self, request, pk=None):
        league = self.get_object()
        user = self.request.user
        participant = models.Participant.objects.filter(user=user, league=league).first()
        if participant is None and league.is_public:
            return Response([])
        elif participant is None and not league.is_public:
            return Response({'message': 'No sos parte de esta liga'}, status=status.HTTP_403_FORBIDDEN)

        predictions = participant.prediction_set.all()
        serializer = serializers.PredictionSerializer(predictions, many=True)

        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def my_leagues(self, request, pk=None):
        """Returns users created leagues with their join requests."""
        user = self.request.user
        leagues = models.League.objects.filter(owner=user).all()
        serializer = self.get_serializer(leagues, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def my_league(self, request, pk=None):
        """Returns users created leagues with their join requests."""
        user = self.request.user
        league = self.get_object()
        serializer = self.get_serializer(league)

        if not self.request.user.is_staff and league.owner.id != user.id:
            raise PermissionDenied({'message': 'This League is not yours.'})

        return Response(serializer.data)

class LeagueSearchPagination(pagination.PageNumberPagination):
    page_size = 10
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'currentPage': self.page.number,
            'pages': self.page.paginator.num_pages,
            'results': data,
        })

class LeagueListView(generics.ListAPIView):
    queryset = models.League.objects.order_by('-id').all()
    serializer_class = serializers.LeagueSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'competition__name']
    pagination_class = LeagueSearchPagination
