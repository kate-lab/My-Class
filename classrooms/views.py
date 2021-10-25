# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.exceptions import NotFound
# from jwt_auth.models import User

# from rest_framework.permissions import IsAuthenticatedOrReadOnly

# # Create your views here.

# #GET LESSONS FOR USER - MAY NOT NEED THIS AS CAN FILTER IN FRONT END?
# class ClassroomListView(APIView):
#     # GET ALL LESSONS FILTERED BY username IN URL
#     def get_queryset(self, _request):
#         lessons = Lesson.objects.all()
#         serialized_lessons = PopulatedLessonSerializer(lessons, many=True)
#         username = self.owner.username
#         return Lesson.objects.filter(owner.username=self.username) or is it (pk:pk) 

# class ClassroomView(APIView):    
#     permission_classes = (IsAuthenticatedOrReadOnly, )
#     # GET USER OBJECTS
#     def get_user(self, pk):
#         try:
#             return User.objects.get(pk=pk)
#         except User.DoesNotExist:
#             raise NotFound(detail="Can't find that user!")
#     # GET SINGLE CLASSROOM BY User PK!
#     def get(self, _request, pk):
#         user = self.get_user(pk=pk)
#         print(user.data)
#         return Response(user.data, status=status.HTTP_200_OK)