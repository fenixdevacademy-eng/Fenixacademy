from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    HealthCheckView, UserViewSet, CategoryViewSet, CourseViewSet,
    ModuleViewSet, LessonViewSet, ExerciseViewSet, EnrollmentViewSet,
    CertificateViewSet, PaymentViewSet, DashboardView, SearchView,
    CourseContentView
)

# Create router
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'certificates', CertificateViewSet, basename='certificate')
router.register(r'payments', PaymentViewSet, basename='payment')

# Nested routers for course content
course_router = DefaultRouter()
course_router.register(r'modules', ModuleViewSet, basename='module')

module_router = DefaultRouter()
module_router.register(r'lessons', LessonViewSet, basename='lesson')

lesson_router = DefaultRouter()
lesson_router.register(r'exercises', ExerciseViewSet, basename='exercise')

urlpatterns = [
    # Health check
    path('health/', HealthCheckView.as_view(), name='health-check'),
    
    # Authentication
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Dashboard
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    
    # Search
    path('search/', SearchView.as_view(), name='search'),
    
    # Course content
    path('courses/<int:course_id>/content/', CourseContentView.as_view(), name='course-content'),
    
    # Main router
    path('', include(router.urls)),
    
    # Nested routers
    path('courses/<int:course_pk>/', include(course_router.urls)),
    path('courses/<int:course_pk>/modules/<int:module_pk>/', include(module_router.urls)),
    path('courses/<int:course_pk>/modules/<int:module_pk>/lessons/<int:lesson_pk>/', include(lesson_router.urls)),
]

# API documentation URLs
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
] 