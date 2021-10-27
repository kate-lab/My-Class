from rest_framework import serializers
from django.contrib.auth import get_user_model

from lessons.serializers.noowner import PopulatedLessonSerializerNoOwner

User = get_user_model()

# this serializer is for the users own profile! SO it has the private info on it like password, email etc.
class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'username', 'display_name', 'profile_image', 'email', 'password', 'password_confirmation', 'lessons')

# and then populating it with their lessons
class PopulatedProfileSerializer(ProfileSerializer):
    lessons = PopulatedLessonSerializerNoOwner(many=True, required=False, allow_null=True)