from rest_framework import generics, mixins, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from app import mixins as appMixins
from app import models, serializers


# DRF SimpleJWT Login
class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.EmailTokenObtainSerializer

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
    public_actions = ['list', 'retrieve']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return serializers.CompetitionDetailSerializer
        return super().get_serializer_class()

class TeamViewSet(
    appMixins.PublicListAndRetrieveAdminEverythingElse,
    viewsets.ModelViewSet,
):
    """
    Teams
    """
    queryset = models.Team.objects.all()
    serializer_class = serializers.TeamSerializer

class ParticipantViewSet(
    appMixins.PublicListAndRetrieveAuthenticatedEverythingElse,
    viewsets.GenericViewSet,
):
    """
    Participants in Leagues
    """
    queryset = models.Participant.objects.all()
    serializer_class = serializers.ParticipantSerializer
    public_actions = ['retrieve', 'list', 'ranking']

    @action(detail=False, methods=['get'])
    def ranking(self, request):
        qs = models.Participant.objects.order_by('-score')[:10]
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def my_participations(self, request):
        user = self.request.user
        qs = models.Participant.objects.filter(user__id=user.id).all()
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
