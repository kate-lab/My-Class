from rest_framework import serializers
from django.contrib.auth import get_user_model
# from django.contrib.auth.hashers import make_password
# from django.core.exceptions import ValidationError

User = get_user_model()

class AuthUserSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = User
        fields = ('id', 'display_name', 'profile_image', 'email')