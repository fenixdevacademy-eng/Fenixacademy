from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from .views import (
    UserViewSet, UserRegistrationView,
    CategoryViewSet, CourseViewSet, ModuleViewSet, LessonViewSet, ExerciseViewSet,
    EnrollmentViewSet, CertificateViewSet, PaymentViewSet,
    DashboardView, SearchView
)

# Create router
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'modules', ModuleViewSet, basename='module')
router.register(r'lessons', LessonViewSet, basename='lesson')
router.register(r'exercises', ExerciseViewSet, basename='exercise')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'certificates', CertificateViewSet, basename='certificate')
router.register(r'payments', PaymentViewSet, basename='payment')

# URL patterns
urlpatterns = [
    # Router URLs
    path('', include(router.urls)),
    
    # Authentication URLs
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('auth/register/', UserRegistrationView.as_view(), name='user_register'),
    
    # Dashboard
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    
    # Search
    path('search/', SearchView.as_view(), name='search'),
    
    # Certificate verification (public)
    path('verify/<uuid:certificate_id>/', CertificateViewSet.as_view({'get': 'verify'}), name='certificate_verify'),
    
    # Course enrollment
    path('courses/<int:pk>/enroll/', CourseViewSet.as_view({'post': 'enroll'}), name='course_enroll'),
    path('courses/<int:pk>/rate/', CourseViewSet.as_view({'post': 'rate'}), name='course_rate'),
    
    # Lesson completion
    path('lessons/<int:pk>/complete/', LessonViewSet.as_view({'post': 'complete'}), name='lesson_complete'),
    
    # Exercise submission
    path('exercises/<int:pk>/submit/', ExerciseViewSet.as_view({'post': 'submit'}), name='exercise_submit'),
] 