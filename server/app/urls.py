from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from app import views

apiRouter = DefaultRouter()
apiRouter.register(r'competitions', views.CompetitionViewSet, basename='competition')
apiRouter.register(r'teams', views.TeamViewSet, basename='team')
apiRouter.register(r'matches', views.MatchViewSet, basename='match')
apiRouter.register(r'leagues', views.LeagueViewSet, basename='league')
apiRouter.register(r'participants', views.ParticipantViewSet, basename='participant')
apiRouter.register(r'predictions', views.PredictionViewSet, basename='prediction')
apiRouter.register(r'join-requests', views.JoinRequestViewSet, basename='join-request')

urlpatterns = [
    path('hello-world/', views.hello_world),
    path('token/', views.EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('logged/', views.Authenticated.as_view()),
    path('admin/', views.AdminAuthenticated.as_view()),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('leagues-search/', views.LeagueListView.as_view(), name='league-search')
] + apiRouter.urls
