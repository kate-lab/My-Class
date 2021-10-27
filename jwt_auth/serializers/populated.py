from jwt_auth.serializers.common import UserSerializer
from lessons.serializers.noowner import PopulatedLessonSerializerNoOwner

# this is the populated user serialiszer for generic users
class PopulatedUserSerializer(UserSerializer):
    lessons = PopulatedLessonSerializerNoOwner(many=True)