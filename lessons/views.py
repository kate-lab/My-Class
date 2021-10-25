from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Lesson
from .serializers.common import LessonSerializer
from .serializers.populated import PopulatedLessonSerializer

# Create your views here.


class LessonListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # GET ALL LESSONS AS LIST
    def get(self, _request):
        lessons = Lesson.objects.all()
        serialized_lessons = PopulatedLessonSerializer(lessons, many=True)
        return Response(serialized_lessons.data, status=status.HTTP_200_OK)

    # POST LESSON
    def post(self, request):
        # print('view ->', request.user)
        request.data['owner'] = request.user.id
        lesson_to_add = LessonSerializer(data=request.data)
        if lesson_to_add.is_valid():
            lesson_to_add.save()
            return Response(lesson_to_add.data, status=status.HTTP_201_CREATED)
        return Response(lesson_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# SINGLE LESSON from pk (primary key)
class LessonDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    def get_lesson(self, pk):
        try:
            return Lesson.objects.get(pk=pk)
        except Lesson.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that lesson!")

    # GET single lesson
    def get(self, _request, pk):
        lesson = self.get_lesson(pk=pk)
        serialized_lesson = PopulatedLessonSerializer(lesson)
        print(serialized_lesson.data)
        return Response(serialized_lesson.data, status=status.HTTP_200_OK)

    # DELETE single lesson
    def delete(self, _request, pk):
        lesson_to_delete = self.get_lesson(pk=pk)
        lesson_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # PUT / EDIT single lesson
    def put(self, request, pk):
        lesson_to_update = self.get_lesson(pk=pk)
        print('Request data', request.data)
        updated_lesson = LessonSerializer(lesson_to_update, data=request.data)
        if updated_lesson.is_valid():
            updated_lesson.save()
            print('Updated data', updated_lesson.data)
            return Response(updated_lesson.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_lesson.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
