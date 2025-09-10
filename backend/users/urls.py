from django.urls import path
from .views import (
    LoginView, RegisterView, LogoutView, RefreshTokenView,
    ProfileView, ChangePasswordView, ForgotPasswordView,
    ResetPasswordView, VerifyEmailView,
    LoginPageView, RegisterPageView, logout_view, profile_view,
    UserProfileAPIView
)

app_name = 'users'

urlpatterns = [
    # API endpoints
    path('api/login/', LoginView.as_view(), name='api_login'),
    path('api/register/', RegisterView.as_view(), name='api_register'),
    path('api/logout/', LogoutView.as_view(), name='api_logout'),
    path('api/refresh/', RefreshTokenView.as_view(), name='api_refresh'),
    path('api/profile/', ProfileView.as_view(), name='api_profile'),
    path('api/users/profile/', UserProfileAPIView.as_view(), name='api_user_profile'),
    path('api/change-password/', ChangePasswordView.as_view(), name='api_change_password'),
    path('api/forgot-password/', ForgotPasswordView.as_view(), name='api_forgot_password'),
    path('api/reset-password/', ResetPasswordView.as_view(), name='api_reset_password'),
    path('api/verify-email/', VerifyEmailView.as_view(), name='api_verify_email'),
    
    # Frontend pages
    path('login/', LoginPageView.as_view(), name='login'),
    path('register/', RegisterPageView.as_view(), name='register'),
    path('logout/', logout_view, name='logout'),
    path('profile/', profile_view, name='profile'),
] 