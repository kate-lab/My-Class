from .common import LessonSerializer
from jwt_auth.serializers.common import UserSerializer
from topics.serializers.common import TopicSerializer

class PopulatedLessonSerializer(LessonSerializer):
    owner = UserSerializer()
    topics = TopicSerializer(many=True)
