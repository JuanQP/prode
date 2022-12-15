from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def hello_world(request):
    """
    Retrieve, update or delete a code snippet.
    """
    return Response({'message': 'Hello world! 👋 This is Prode backend API'})
