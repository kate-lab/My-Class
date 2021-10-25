from django.db import models

# Create your models here.

class Lesson(models.Model):

    title = models.CharField(max_length=100)
    introduction = models.TextField(max_length=500)

    section_one_title = models.CharField(max_length=100)
    section_one_text = models.TextField(max_length=1000)
    section_one_picture = models.CharField(max_length=250)
    section_one_activity = models.TextField(max_length=500)

    section_two_title = models.CharField(max_length=100)
    section_two_text = models.TextField(max_length=1000)
    section_two_picture = models.CharField(max_length=250)
    section_two_activity = models.TextField(max_length=500)

    summary = models.TextField(max_length=500)
    topics = models.ManyToManyField(
        "topics.Topic",
        related_name = "lessons"
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "lessons",
        on_delete = models.CASCADE
    )

    def __str__(self):
        return f"{self.title} by {self.owner}"