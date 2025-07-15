from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, FounderRegistrationSerializer
from rest_framework.views import APIView

User = get_user_model()

class FounderRegistrationView(generics.CreateAPIView):
    serializer_class = FounderRegistrationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]
        if User.objects.filter(is_founder=True).count() >= 1000:
            return Response({"detail": "Founders limit reached."}, status=status.HTTP_403_FORBIDDEN)
        user = User.objects.create_user(email=email, username=username, password=password, is_founder=True)
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer 