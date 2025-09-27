from django.http import JsonResponse
from django.db import connection
from django.core.cache import cache
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.db.models import Q, Count, Avg
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta
import json
import os

from courses.models import Category, Course, Module, Lesson, Exercise
from users.models import User
from progress.models import UserProgress, CourseProgress, LessonProgress, ExerciseProgress, UserAchievement
from payments.models import Payment, Subscription

User = get_user_model()

class HealthCheckView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Health check endpoint for Docker containers"""
        try:
            # Check database connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            
            # Check cache connection
            cache.set('health_check', 'ok', 10)
            cache_result = cache.get('health_check')
            
            return Response({
                'status': 'healthy',
                'database': 'connected',
                'cache': 'connected' if cache_result == 'ok' else 'error',
                'timestamp': timezone.now().isoformat()
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'status': 'unhealthy',
                'error': str(e),
                'timestamp': timezone.now().isoformat()
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)

class UserViewSet(ModelViewSet):
    """User management viewset"""
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)
    
    @action(detail=False, methods=['get'])
    def profile(self, request):
        """Get current user profile"""
        user = request.user
        progress = UserProgress.objects.filter(user=user).first()
        
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'bio': user.bio,
            'avatar': user.avatar.url if user.avatar else None,
            'preferred_language': user.preferred_language,
            'learning_goals': user.learning_goals,
            'skill_level': user.skill_level,
            'subscription_status': user.subscription_status,
            'date_joined': user.date_joined,
            'progress': {
                'total_courses_completed': progress.total_courses_completed if progress else 0,
                'total_lessons_completed': progress.total_lessons_completed if progress else 0,
                'total_exercises_completed': progress.total_exercises_completed if progress else 0,
                'current_streak_days': progress.current_streak_days if progress else 0,
                'total_study_hours': progress.total_study_hours if progress else 0,
            } if progress else {}
        })
    
    @action(detail=False, methods=['put'])
    def update_profile(self, request):
        """Update user profile"""
        user = request.user
        data = request.data
        
        # Update allowed fields
        allowed_fields = ['first_name', 'last_name', 'bio', 'preferred_language', 'learning_goals', 'skill_level']
        for field in allowed_fields:
            if field in data:
                setattr(user, field, data[field])
        
        user.save()
        
        return Response({'message': 'Profile updated successfully'})

class CategoryViewSet(ModelViewSet):
    """Category management viewset"""
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Category.objects.all()
    
    def get_serializer_class(self):
        from .serializers import CategorySerializer
        return CategorySerializer

class CourseViewSet(ModelViewSet):
    """Course management viewset"""
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = Course.objects.select_related('category', 'instructor').prefetch_related('modules')
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__name__iexact=category)
        
        # Filter by difficulty
        difficulty = self.request.query_params.get('difficulty')
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        
        # Filter by price
        price_type = self.request.query_params.get('price_type')
        if price_type == 'free':
            queryset = queryset.filter(price=0)
        elif price_type == 'paid':
            queryset = queryset.filter(price__gt=0)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(category__name__icontains=search)
            )
        
        return queryset
    
    def get_serializer_class(self):
        from .serializers import CourseSerializer
        return CourseSerializer
    
    @action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        """Enroll user in a course"""
        course = self.get_object()
        user = request.user
        
        # Check if user is already enrolled
        if CourseProgress.objects.filter(user=user, course=course).exists():
            return Response({'message': 'Already enrolled'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create course progress
        CourseProgress.objects.create(
            user=user,
            course=course,
            progress_percentage=0,
            completed_lessons=0,
            completed_exercises=0
        )
        
        return Response({'message': 'Enrolled successfully'}, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def rate(self, request, pk=None):
        """Rate a course"""
        course = self.get_object()
        user = request.user
        rating = request.data.get('rating')
        review = request.data.get('review', '')
        
        if not rating or not (1 <= rating <= 5):
            return Response({'error': 'Invalid rating'}, status=status.HTTP_400_BAD_REQUEST)
        
        # TODO: Implement rating system
        # For now, just return success
        return Response({'message': 'Rating submitted successfully'})

class ModuleViewSet(ModelViewSet):
    """Module management viewset"""
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Module.objects.filter(course_id=self.kwargs.get('course_pk'))
    
    def get_serializer_class(self):
        from .serializers import ModuleSerializer
        return ModuleSerializer

class LessonViewSet(ModelViewSet):
    """Lesson management viewset"""
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Lesson.objects.filter(module_id=self.kwargs.get('module_pk'))
    
    def get_serializer_class(self):
        from .serializers import LessonSerializer
        return LessonSerializer
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Mark lesson as completed"""
        lesson = self.get_object()
        user = request.user
        
        # Check if user is enrolled in the course
        course_progress = CourseProgress.objects.filter(
            user=user,
            course=lesson.module.course
        ).first()
        
        if not course_progress:
            return Response({'error': 'Not enrolled in course'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create or update lesson progress
        lesson_progress, created = LessonProgress.objects.get_or_create(
            user=user,
            lesson=lesson,
            defaults={
                'completed': True,
                'completed_at': timezone.now(),
                'time_spent': request.data.get('time_spent', 0)
            }
        )
        
        if not created and not lesson_progress.completed:
            lesson_progress.completed = True
            lesson_progress.completed_at = timezone.now()
            lesson_progress.time_spent = request.data.get('time_spent', lesson_progress.time_spent)
            lesson_progress.save()
        
        # Update course progress
        total_lessons = lesson.module.course.modules.aggregate(
            total=Count('lessons')
        )['total']
        completed_lessons = LessonProgress.objects.filter(
            user=user,
            lesson__module__course=lesson.module.course,
            completed=True
        ).count()
        
        course_progress.progress_percentage = (completed_lessons / total_lessons) * 100
        course_progress.completed_lessons = completed_lessons
        course_progress.save()
        
        return Response({'message': 'Lesson completed successfully'})

class ExerciseViewSet(ModelViewSet):
    """Exercise management viewset"""
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Exercise.objects.filter(lesson_id=self.kwargs.get('lesson_pk'))
    
    def get_serializer_class(self):
        from .serializers import ExerciseSerializer
        return ExerciseSerializer
    
    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        """Submit exercise answer"""
        exercise = self.get_object()
        user = request.user
        answer = request.data.get('answer')
        
        if not answer:
            return Response({'error': 'Answer required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create or update exercise progress
        exercise_progress, created = ExerciseProgress.objects.get_or_create(
            user=user,
            exercise=exercise,
            defaults={
                'attempts': 1,
                'last_attempt': timezone.now()
            }
        )
        
        if not created:
            exercise_progress.attempts += 1
            exercise_progress.last_attempt = timezone.now()
        
        # Check if answer is correct (simplified)
        is_correct = answer.strip().lower() == exercise.solution_code.strip().lower()
        exercise_progress.is_completed = is_correct
        exercise_progress.save()
        
        return Response({
            'correct': is_correct,
            'attempts': exercise_progress.attempts,
            'message': 'Correct!' if is_correct else 'Try again'
        })

class EnrollmentViewSet(ModelViewSet):
    """Enrollment management viewset"""
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return CourseProgress.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        from .serializers import EnrollmentSerializer
        return EnrollmentSerializer

class CertificateViewSet(ModelViewSet):
    """Certificate management viewset"""
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserAchievement.objects.filter(
            user=self.request.user,
            achievement_type='certificate'
        )
    
    def get_serializer_class(self):
        from .serializers import CertificateSerializer
        return CertificateSerializer
    
    @action(detail=False, methods=['get'])
    def verify(self, request):
        """Verify certificate (public endpoint)"""
        certificate_id = request.query_params.get('id')
        if not certificate_id:
            return Response({'error': 'Certificate ID required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            achievement = UserAchievement.objects.get(
                id=certificate_id,
                achievement_type='certificate'
            )
            
            return Response({
                'valid': True,
                'user_name': f"{achievement.user.first_name} {achievement.user.last_name}",
                'course_name': achievement.course.title if achievement.course else 'N/A',
                'issued_date': achievement.earned_at,
                'certificate_id': achievement.id
            })
        except UserAchievement.DoesNotExist:
            return Response({'valid': False}, status=status.HTTP_404_NOT_FOUND)

class PaymentViewSet(ModelViewSet):
    """Payment management viewset"""
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        from .serializers import PaymentSerializer
        return PaymentSerializer

class DashboardView(APIView):
    """Dashboard data endpoint"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Get user progress
        progress = UserProgress.objects.filter(user=user).first()
        
        # Get enrolled courses
        enrolled_courses = CourseProgress.objects.filter(user=user).select_related('course')
        
        # Get recent achievements
        recent_achievements = UserAchievement.objects.filter(
            user=user
        ).order_by('-earned_at')[:5]
        
        # Get study streak
        today = timezone.now().date()
        streak_days = 0
        if progress:
            streak_days = progress.current_streak_days
        
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'avatar': user.avatar.url if user.avatar else None,
            },
            'stats': {
                'courses_enrolled': enrolled_courses.count(),
                'courses_completed': enrolled_courses.filter(progress_percentage=100).count(),
                'lessons_completed': progress.total_lessons_completed if progress else 0,
                'exercises_completed': progress.total_exercises_completed if progress else 0,
                'certificates_earned': recent_achievements.filter(achievement_type='certificate').count(),
                'current_streak': streak_days,
                'total_study_hours': progress.total_study_hours if progress else 0,
            },
            'recent_courses': [
                {
                    'id': cp.course.id,
                    'title': cp.course.title,
                    'progress': cp.progress_percentage,
                    'completed_lessons': cp.completed_lessons,
                    'total_lessons': cp.course.total_lessons,
                }
                for cp in enrolled_courses[:5]
            ],
            'recent_achievements': [
                {
                    'id': achievement.id,
                    'title': achievement.title,
                    'description': achievement.description,
                    'earned_at': achievement.earned_at,
                    'type': achievement.achievement_type,
                }
                for achievement in recent_achievements
            ]
        }, status=status.HTTP_200_OK)

class SearchView(APIView):
    """Search endpoint"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        query = request.query_params.get('q', '')
        category = request.query_params.get('category', '')
        difficulty = request.query_params.get('difficulty', '')
        
        if not query and not category and not difficulty:
            return Response({'error': 'Search query or filters required'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = Course.objects.select_related('category', 'instructor')
        
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(category__name__icontains=query) |
                Q(instructor__first_name__icontains=query) |
                Q(instructor__last_name__icontains=query)
            )
        
        if category:
            queryset = queryset.filter(category__name__iexact=category)
        
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        
        # Add pagination
        page = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('page_size', 10))
        start = (page - 1) * page_size
        end = start + page_size
        
        results = queryset[start:end]
        
        return Response({
            'query': query,
            'filters': {
                'category': category,
                'difficulty': difficulty
            },
            'total_results': queryset.count(),
            'page': page,
            'page_size': page_size,
            'results': [
                {
                    'id': course.id,
                    'title': course.title,
                    'description': course.description,
                    'category': course.category.name,
                    'difficulty': course.difficulty,
                    'price': course.price,
                    'instructor': f"{course.instructor.first_name} {course.instructor.last_name}",
                    'rating': 4.5,  # Default rating
                    'total_lessons': course.total_lessons,
                    'total_exercises': course.total_exercises,
                    'image_url': course.image.url if course.image else None,
                }
                for course in results
            ]
        }, status=status.HTTP_200_OK)

class CourseContentView(APIView):
    """Get course content with modules, lessons, and exercises"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        
        # Check if user is enrolled
        user = request.user
        is_enrolled = CourseProgress.objects.filter(user=user, course=course).exists()
        
        # Get course content
        modules = Module.objects.filter(course=course).prefetch_related('lessons', 'lessons__exercises')
        
        course_data = {
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'category': course.category.name,
            'difficulty': course.difficulty,
            'price': course.price,
            'instructor': f"{course.instructor.first_name} {course.instructor.last_name}",
                            'rating': 4.5,  # Default rating
            'total_lessons': course.total_lessons,
            'total_exercises': course.total_exercises,
            'is_enrolled': is_enrolled,
            'modules': []
        }
        
        for module in modules:
            module_data = {
                'id': module.id,
                'title': module.title,
                'description': module.description,
                'order': module.order,
                'lessons': []
            }
            
            for lesson in module.lessons.all():
                lesson_data = {
                    'id': lesson.id,
                    'title': lesson.title,
                    'description': lesson.description,
                    'lesson_type': lesson.lesson_type,
                    'duration': lesson.duration,
                    'order': lesson.order,
                    'content': lesson.content,
                    'video_url': lesson.video_url,
                    'quiz_data': lesson.quiz_data,
                    'exercises': []
                }
                
                for exercise in lesson.exercises.all():
                    exercise_data = {
                        'id': exercise.id,
                        'title': exercise.title,
                        'description': exercise.description,
                        'instructions': exercise.instructions,
                        'starter_code': exercise.starter_code,
                        'solution_code': exercise.solution_code,
                        'test_cases': exercise.test_cases,
                        'difficulty': exercise.difficulty,
                        'estimated_time': exercise.estimated_time,
                    }
                    lesson_data['exercises'].append(exercise_data)
                
                module_data['lessons'].append(lesson_data)
            
            course_data['modules'].append(module_data)
        
        return Response(course_data) 