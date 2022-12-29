from csv import DictReader
from io import TextIOWrapper

from django.db import transaction
from rest_framework import exceptions, generics, mixins, viewsets
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

    @action(detail=False, methods=['post'])
    def csv_upload(self, request):
        teams_file = request.FILES["file"]
        rows = TextIOWrapper(teams_file, encoding="utf-8", newline="")
        with transaction.atomic():
            for row in DictReader(rows):
                serializer = self.get_serializer(data=row, many=False)
                serializer.is_valid(raise_exception=True)
                serializer.save()
        return Response({'message': f"Se cargaron correctamente todos los equipos."})

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

class UserViewSet(
    appMixins.PublicListAndRetrieveAuthenticatedEverythingElse,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

    def get_serializer_class(self):
        if self.action == 'me':
            return serializers.UserDetailSerializer
        elif self.action == 'change_password':
            return serializers.ChangePasswordSerializer
        return super().get_serializer_class()

    @action(detail=False, methods=['get', 'put', 'patch'])
    def me(self, request):
        user = self.request.user
        if self.request.method.lower() in ['put', 'patch']:
            serializer = self.get_serializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        serializer = self.get_serializer(self.request.user)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def change_password(self, request, pk=None):
        user = self.request.user
        if not user.is_staff and user.id != pk:
            raise exceptions.PermissionDenied({'message': 'No tenés permisos'})

        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)

        user.set_password(serializer.validated_data['password'])
        user.save()

        return Response({'message': 'Password was changed'})
