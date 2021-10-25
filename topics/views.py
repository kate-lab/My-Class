from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers.populated import PopulatedTopicSerializer
from .serializers.common import TopicSerializer
from .models import Topic

# Create your views here.
class TopicListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # GET ALL TOPICS as list for filter and react select
    def get(self, _request):
        topics = Topic.objects.all()
        serialized_topics = PopulatedTopicSerializer(topics, many=True)
        return Response(serialized_topics.data, status=status.HTTP_200_OK)

        # POST NEW TOPIC
    def post(self, request):
        # print('view ->', request.user)
        request.data['owner'] = request.user.id
        topic_to_add = TopicSerializer(data=request.data)
        if topic_to_add.is_valid():
            topic_to_add.save()
            return Response(topic_to_add.data, status=status.HTTP_201_CREATED)
        return Response(topic_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)