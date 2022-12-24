from rest_framework.permissions import IsAdminUser, IsAuthenticated


class PublicListAndRetrieveAdminEverythingElse():

    public_actions = ['list', 'retrieve']

    def get_permissions(self):
        if self.action in self.public_actions:
            permission_classes = []
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

class PublicListAndRetrieveAuthenticatedEverythingElse():

    public_actions = ['list', 'retrieve']

    def get_permissions(self):
        if self.action in self.public_actions:
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
