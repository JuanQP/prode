from rest_framework.permissions import IsAdminUser, IsAuthenticated


class PublicListAndRetrieveAdminEverythingElse():
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = []
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

class PublicListAndRetrieveAuthenticatedEverythingElse():
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
