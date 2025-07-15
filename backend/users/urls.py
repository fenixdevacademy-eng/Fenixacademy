from django.urls import path
from .views import FounderRegistrationView, UserListView

urlpatterns = [
    path("founders/register/", FounderRegistrationView.as_view(), name="founder-register"),
    path("users/", UserListView.as_view(), name="user-list"),
] 