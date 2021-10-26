from jwt_auth.serializers.common import UserSerializer
from lessons.serializers.noowner import PopulatedLessonSerializerNoOwner

class PopulatedUserSerializer(UserSerializer):
    lessons = PopulatedLessonSerializerNoOwner(many=True)