from .common import LessonSerializer
from topics.serializers.common import TopicSerializer

class PopulatedLessonSerializerNoOwner(LessonSerializer):
    topics = TopicSerializer(many=True)