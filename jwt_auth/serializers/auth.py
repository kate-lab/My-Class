from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

User = get_user_model()


# this is the auth serialier which runs through password validation in order to allow teachers to register

class AuthUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'Password confirmation does not match password field'})
        
        try: 
            password_validation.validate_password(password=password)
        except ValidationError as error:
            raise ValidationError({'password': error.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('id', 'display_name', 'profile_image', 'email', 'password', 'password_confirmation', 'username')