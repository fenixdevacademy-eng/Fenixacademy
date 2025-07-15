from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_founder = models.BooleanField(default=False)
    founder_payment_id = models.CharField(max_length=128, blank=True, null=True)
    founder_benefits_granted = models.BooleanField(default=False)

    def __str__(self):
        return self.email 