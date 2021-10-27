from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
# from django.contrib.auth.hashers import make_password
# from django.core.exceptions import ValidationError

User = get_user_model()

# this is the generic user view serializer that doesn't pass back any important info like password etc
class UserSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = User
        fields = ('id', 'display_name', 'profile_image', 'email', 'lessons')