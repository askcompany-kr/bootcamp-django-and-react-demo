from django.db import models


class Post(models.Model):
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def as_dict(self):
        return {
            'pk': self.pk,
            'message': self.message,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
