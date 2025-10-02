from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    HealthCheckView, UserViewSet, CategoryViewSet, CourseViewSet,
    ModuleViewSet, LessonViewSet, ExerciseViewSet, EnrollmentViewSet,
    CertificateViewSet, PaymentViewSet, DashboardView, SearchView,
    CourseContentView
)
from .profile_views import (
    get_user_profile, update_user_profile, get_dashboard_data, update_study_session
)
from .expanded_content import (
    list_expanded_courses, get_course_detail, get_lesson_content,
    get_course_modules, search_content, get_course_stats
)
from .exercises_quizzes import (
    get_course_exercises, get_course_quizzes, get_exercise_detail,
    get_quiz_detail, submit_exercise_answer, submit_quiz_answer,
    get_exercises_stats
)
from .progress_integration import (
    get_user_course_progress, enroll_in_expanded_course,
    mark_lesson_completed, mark_exercise_completed,
    get_user_achievements, get_learning_dashboard
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
    path('dashboard/data/', get_dashboard_data, name='dashboard-data'),
    
    # Profile endpoints
    path('profile/', get_user_profile, name='user-profile'),
    path('profile/update/', update_user_profile, name='update-profile'),
    path('study-session/', update_study_session, name='update-study-session'),
    
    # Search
    path('search/', SearchView.as_view(), name='search'),
    
    # Course content
    path('courses/<int:course_id>/content/', CourseContentView.as_view(), name='course-content'),
    
    # Expanded content endpoints
    path('expanded/courses/', list_expanded_courses, name='expanded-courses'),
    path('expanded/courses/<str:course_slug>/', get_course_detail, name='expanded-course-detail'),
    path('expanded/courses/<str:course_slug>/modules/', get_course_modules, name='expanded-course-modules'),
    path('expanded/courses/<str:course_slug>/<str:level>/<str:lesson_file>/', get_lesson_content, name='expanded-lesson-content'),
    path('expanded/search/', search_content, name='expanded-search'),
    path('expanded/stats/', get_course_stats, name='expanded-stats'),
    
    # Exercises and Quizzes endpoints
    path('expanded/courses/<str:course_slug>/exercises/', get_course_exercises, name='expanded-course-exercises'),
    path('expanded/courses/<str:course_slug>/quizzes/', get_course_quizzes, name='expanded-course-quizzes'),
    path('expanded/exercises/<str:course_slug>/<str:exercise_id>/', get_exercise_detail, name='expanded-exercise-detail'),
    path('expanded/quizzes/<str:course_slug>/<str:quiz_id>/', get_quiz_detail, name='expanded-quiz-detail'),
    path('expanded/exercises/<str:course_slug>/<str:exercise_id>/submit/', submit_exercise_answer, name='submit-exercise-answer'),
    path('expanded/quizzes/<str:course_slug>/<str:quiz_id>/submit/', submit_quiz_answer, name='submit-quiz-answer'),
    path('expanded/activities/stats/', get_exercises_stats, name='expanded-activities-stats'),
    
    # Progress integration endpoints
    path('progress/courses/<str:course_slug>/', get_user_course_progress, name='user-course-progress'),
    path('progress/courses/<str:course_slug>/enroll/', enroll_in_expanded_course, name='enroll-expanded-course'),
    path('progress/lessons/<str:course_slug>/<str:lesson_file>/complete/', mark_lesson_completed, name='mark-lesson-completed'),
    path('progress/exercises/<str:course_slug>/<str:exercise_id>/complete/', mark_exercise_completed, name='mark-exercise-completed'),
    path('progress/achievements/', get_user_achievements, name='user-achievements'),
    path('progress/dashboard/', get_learning_dashboard, name='learning-dashboard'),
    
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