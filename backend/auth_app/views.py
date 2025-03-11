from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer
import logging

logger = logging.getLogger(__name__)
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully"}, status=201)
    return Response({"error": serializer.errors}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    logger.info(f"Login attempt: username={username}, password={password}")
    
    if not username or not password:
        return Response({"error": "Username and password are required"}, status=400)
    
    user = authenticate(request, username=username, password=password)
    if user is not None:
        logger.info(f"User authenticated: {user.id}")
        return Response({"message": "Login successful", "user_id": user.id}, status=200)
    logger.warning(f"Authentication failed for username={username}")
    return Response({"error": "Invalid username or password"}, status=401)