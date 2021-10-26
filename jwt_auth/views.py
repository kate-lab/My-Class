from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from datetime import datetime, timedelta

from django.contrib.auth import get_user_model
from django.conf import settings

import jwt

from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer
from .serializers.profile import PopulatedProfileSerializer
from lessons.serializers.populated import PopulatedLessonSerializer

from lessons.models import Lesson

User = get_user_model()

# Create your views here.

# REGISTER NEW USER


class RegisterView(APIView):
    def post(self, request):
        print(request.data)
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration Successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# LOGIN


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Login Credentials')
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Login Credentials')

        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        print('token -> ', token)
        return Response({'token': token, 'message': f"Welcome back to your classroom, {user_to_login.display_name}"})


#  GET SINGLE USER BY ID
class SingleUserView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound(detail="Can't find that user!")

    # GET SINGLE USER BY PK!
    def get(self, request, pk):
        this_user = self.get_user(pk=pk)
        serialized_user = PopulatedUserSerializer(this_user)
        print(serialized_user.data)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

# GET CURRENT USER PROFILE AND THEIR LESSONS
class CurrentUserView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        serialized_user = PopulatedProfileSerializer(request.user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)
    


