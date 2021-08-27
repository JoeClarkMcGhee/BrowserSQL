from cryptography import fernet
from django.conf import settings
from django.db import models

__all__ = ["RemoteDatabaseConnections"]


class RemoteDatabaseConnections(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    host = models.CharField(max_length=255)
    port = models.IntegerField(max_length=4)
    database = models.CharField(max_length=255)
    user = models.CharField(max_length=255)
    password = models.TextField()

    def save(self, *args, **kwargs):
        # Encrypt the password before it is saved.
        key = settings.ENCRYPTION_KEY.encode("utf_8")
        f = fernet.Fernet(key)
        self.password = str(f.encrypt(self.password.encode("utf_8")))
        super().save(*args, **kwargs)
