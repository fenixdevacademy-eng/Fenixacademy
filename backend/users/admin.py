from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
from django.contrib.auth import get_user_model

User = get_user_model()

# Criação do superusuário Cezar Camara Lins
if not User.objects.filter(email='cezar@fenixacademy.com').exists():
    User.objects.create_superuser(
        username='cezar',
        email='cezar@fenixacademy.com',
        password='senha-forte-123',
        is_founder=True,
        founder_benefits_granted=True,
        first_name='Cezar',
        last_name='Camara Lins',
    )

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("username", "email", "is_founder", "founder_benefits_granted", "is_staff", "is_active")
    list_filter = ("is_founder", "founder_benefits_granted", "is_staff", "is_active")
    search_fields = ("username", "email") 