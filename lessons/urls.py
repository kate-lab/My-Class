from django.urls import path
from .views import LessonListView, LessonDetailView

urlpatterns = [
    path('', LessonListView.as_view()),
    path('<int:pk>/', LessonDetailView.as_view())
]