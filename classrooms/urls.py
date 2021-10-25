from django.urls import path
from .views import ClassroomView

urlpatterns = [
    path('<int:pk>/', ClassroomView.as_view())
]



