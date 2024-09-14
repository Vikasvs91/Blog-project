from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=255)
    summary = models.TextField()
    content = models.TextField()
    image = models.ImageField(upload_to='post_images/', null=True, blank=True)  # Image field
    publication_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
