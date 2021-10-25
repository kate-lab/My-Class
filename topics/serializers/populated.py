from .common import TopicSerializer
from lessons.serializers.common import LessonSerializer

class PopulatedTopicSerializer(TopicSerializer):
    lessons=LessonSerializer(many=True)