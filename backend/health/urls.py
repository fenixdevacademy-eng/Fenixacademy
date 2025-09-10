from django.urls import path
from . import views

urlpatterns = [
    path('', views.health_check, name='health_check'),
    path('readiness/', views.readiness_check, name='readiness_check'),
]
