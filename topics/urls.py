from django.urls import path
from .views import TopicListView

urlpatterns = [
    path('', TopicListView.as_view())
]