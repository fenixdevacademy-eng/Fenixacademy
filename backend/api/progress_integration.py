"""
API endpoints for integrating expanded content with user progress tracking
"""
import os
import json
from django.http import JsonResponse
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.cache import cache
from django.utils import timezone
from django.db.models import Q

from progress.models import UserProgress, CourseProgress, LessonProgress, ExerciseProgress, UserAchievement
from courses.models import Course, Module, Lesson, Exercise

# Base path for expanded content
EXPANDED_CONTENT_PATH = os.path.join(settings.BASE_DIR, 'fenix-expanded-content')

class ProgressIntegrationAPI(APIView):
    """API for integrating expanded content with user progress"""
    permission_classes = [IsAuthenticated]
    
    def get_user_progress_for_course(self, user, course_slug):
        """Get user progress for a specific course"""
        try:
            # Try to find course by slug or title
            course = Course.objects.filter(
                Q(slug__icontains=course_slug) | 
                Q(title__icontains=course_slug.replace('-', ' '))
            ).first()
            
            if not course:
                return None
            
            course_progress = CourseProgress.objects.filter(
                user=user, 
                course=course
            ).first()
            
            if not course_progress:
                return None
            
            # Get lesson progress
            lesson_progress = LessonProgress.objects.filter(
                user=user,
                lesson__module__course=course
            ).values('lesson_id', 'completed', 'completed_at', 'time_spent')
            
            # Get exercise progress
            exercise_progress = ExerciseProgress.objects.filter(
                user=user,
                exercise__lesson__module__course=course
            ).values('exercise_id', 'is_completed', 'attempts', 'last_attempt')
            
            return {
                'course_id': course.id,
                'course_title': course.title,
                'progress_percentage': course_progress.progress_percentage,
                'completed_lessons': course_progress.completed_lessons,
                'completed_exercises': course_progress.completed_exercises,
                'total_lessons': course.total_lessons,
                'total_exercises': course.total_exercises,
                'lesson_progress': list(lesson_progress),
                'exercise_progress': list(exercise_progress),
                'last_accessed': course_progress.updated_at
            }
        except Exception as e:
            return None
    
    def create_course_progress(self, user, course_slug):
        """Create course progress for expanded content"""
        try:
            # Try to find or create course
            course, created = Course.objects.get_or_create(
                slug=course_slug,
                defaults={
                    'title': course_slug.replace('-', ' ').title(),
                    'description': f'Expanded content course: {course_slug}',
                    'difficulty': 'beginner',
                    'price': 0,
                    'is_free': True
                }
            )
            
            # Create course progress
            course_progress, created = CourseProgress.objects.get_or_create(
                user=user,
                course=course,
                defaults={
                    'progress_percentage': 0,
                    'completed_lessons': 0,
                    'completed_exercises': 0
                }
            )
            
            return course_progress
        except Exception as e:
            return None
    
    def mark_lesson_completed(self, user, course_slug, lesson_file, time_spent=0):
        """Mark a lesson as completed"""
        try:
            # Find course
            course = Course.objects.filter(
                Q(slug__icontains=course_slug) | 
                Q(title__icontains=course_slug.replace('-', ' '))
            ).first()
            
            if not course:
                return False
            
            # Create or find lesson
            lesson, created = Lesson.objects.get_or_create(
                title=f"Lesson: {lesson_file}",
                module__course=course,
                defaults={
                    'content': f"Expanded content lesson: {lesson_file}",
                    'lesson_type': 'text',
                    'module': course.modules.first() or Module.objects.create(
                        course=course,
                        title=f"Module for {course.title}",
                        order=1
                    )
                }
            )
            
            # Mark as completed
            lesson_progress, created = LessonProgress.objects.get_or_create(
                user=user,
                lesson=lesson,
                defaults={
                    'completed': True,
                    'completed_at': timezone.now(),
                    'time_spent': time_spent
                }
            )
            
            if not created:
                lesson_progress.completed = True
                lesson_progress.completed_at = timezone.now()
                lesson_progress.time_spent = time_spent
                lesson_progress.save()
            
            # Update course progress
            self.update_course_progress(user, course)
            
            return True
        except Exception as e:
            return False
    
    def mark_exercise_completed(self, user, course_slug, exercise_id, is_correct=True):
        """Mark an exercise as completed"""
        try:
            # Find course
            course = Course.objects.filter(
                Q(slug__icontains=course_slug) | 
                Q(title__icontains=course_slug.replace('-', ' '))
            ).first()
            
            if not course:
                return False
            
            # Create or find exercise
            exercise, created = Exercise.objects.get_or_create(
                title=f"Exercise: {exercise_id}",
                lesson__module__course=course,
                defaults={
                    'description': f"Expanded content exercise: {exercise_id}",
                    'instructions': "Complete this exercise",
                    'lesson': course.modules.first().lessons.first() if course.modules.exists() else None
                }
            )
            
            # Mark as completed
            exercise_progress, created = ExerciseProgress.objects.get_or_create(
                user=user,
                exercise=exercise,
                defaults={
                    'is_completed': is_correct,
                    'attempts': 1,
                    'last_attempt': timezone.now()
                }
            )
            
            if not created:
                exercise_progress.is_completed = is_correct
                exercise_progress.attempts += 1
                exercise_progress.last_attempt = timezone.now()
                exercise_progress.save()
            
            # Update course progress
            self.update_course_progress(user, course)
            
            return True
        except Exception as e:
            return False
    
    def update_course_progress(self, user, course):
        """Update course progress percentage"""
        try:
            course_progress = CourseProgress.objects.filter(
                user=user,
                course=course
            ).first()
            
            if not course_progress:
                return
            
            # Calculate progress
            total_lessons = course.total_lessons or 1
            completed_lessons = LessonProgress.objects.filter(
                user=user,
                lesson__module__course=course,
                completed=True
            ).count()
            
            total_exercises = course.total_exercises or 1
            completed_exercises = ExerciseProgress.objects.filter(
                user=user,
                exercise__lesson__module__course=course,
                is_completed=True
            ).count()
            
            # Update progress
            course_progress.completed_lessons = completed_lessons
            course_progress.completed_exercises = completed_exercises
            course_progress.progress_percentage = min(100, (completed_lessons / total_lessons) * 100)
            course_progress.save()
            
        except Exception as e:
            pass

# API Endpoints

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_course_progress(request, course_slug):
    """Get user progress for a specific expanded course"""
    api = ProgressIntegrationAPI()
    progress = api.get_user_progress_for_course(request.user, course_slug)
    
    if not progress:
        return Response({'error': 'Course not found or not enrolled'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response({
        'course_slug': course_slug,
        'progress': progress
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_in_expanded_course(request, course_slug):
    """Enroll user in an expanded course"""
    api = ProgressIntegrationAPI()
    course_progress = api.create_course_progress(request.user, course_slug)
    
    if not course_progress:
        return Response({'error': 'Failed to enroll in course'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({
        'message': 'Successfully enrolled in course',
        'course_slug': course_slug,
        'progress_percentage': course_progress.progress_percentage
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_lesson_completed(request, course_slug, lesson_file):
    """Mark a lesson as completed"""
    time_spent = request.data.get('time_spent', 0)
    
    api = ProgressIntegrationAPI()
    success = api.mark_lesson_completed(request.user, course_slug, lesson_file, time_spent)
    
    if not success:
        return Response({'error': 'Failed to mark lesson as completed'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({
        'message': 'Lesson marked as completed',
        'course_slug': course_slug,
        'lesson_file': lesson_file,
        'time_spent': time_spent
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_exercise_completed(request, course_slug, exercise_id):
    """Mark an exercise as completed"""
    is_correct = request.data.get('is_correct', True)
    
    api = ProgressIntegrationAPI()
    success = api.mark_exercise_completed(request.user, course_slug, exercise_id, is_correct)
    
    if not success:
        return Response({'error': 'Failed to mark exercise as completed'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({
        'message': 'Exercise marked as completed',
        'course_slug': course_slug,
        'exercise_id': exercise_id,
        'is_correct': is_correct
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_achievements(request):
    """Get user achievements from expanded content"""
    user = request.user
    
    # Get all achievements
    achievements = UserAchievement.objects.filter(user=user).order_by('-earned_at')
    
    # Get course progress
    course_progress = CourseProgress.objects.filter(user=user).select_related('course')
    
    # Calculate additional stats
    total_study_time = sum(cp.time_spent or 0 for cp in course_progress)
    completed_courses = course_progress.filter(progress_percentage=100).count()
    
    return Response({
        'achievements': [
            {
                'id': achievement.id,
                'title': achievement.title,
                'description': achievement.description,
                'type': achievement.achievement_type,
                'earned_at': achievement.earned_at,
                'course_title': achievement.course.title if achievement.course else None
            }
            for achievement in achievements
        ],
        'stats': {
            'total_achievements': achievements.count(),
            'completed_courses': completed_courses,
            'total_study_time': total_study_time,
            'current_streak': getattr(user.userprogress, 'current_streak_days', 0) if hasattr(user, 'userprogress') else 0
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_learning_dashboard(request):
    """Get comprehensive learning dashboard for expanded content"""
    user = request.user
    
    # Get user progress
    user_progress = UserProgress.objects.filter(user=user).first()
    
    # Get course progress
    course_progress = CourseProgress.objects.filter(user=user).select_related('course')
    
    # Get recent achievements
    recent_achievements = UserAchievement.objects.filter(
        user=user
    ).order_by('-earned_at')[:5]
    
    # Get expanded content stats
    expanded_courses = []
    if os.path.exists(EXPANDED_CONTENT_PATH):
        for item in os.listdir(EXPANDED_CONTENT_PATH):
            item_path = os.path.join(EXPANDED_CONTENT_PATH, item)
            if os.path.isdir(item_path) and not item.startswith('.'):
                # Check if user is enrolled
                progress = course_progress.filter(
                    Q(course__slug__icontains=item) | 
                    Q(course__title__icontains=item.replace('-', ' '))
                ).first()
                
                expanded_courses.append({
                    'slug': item,
                    'name': item.replace('-', ' ').title(),
                    'is_enrolled': progress is not None,
                    'progress_percentage': progress.progress_percentage if progress else 0,
                    'last_accessed': progress.updated_at if progress else None
                })
    
    return Response({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        },
        'progress': {
            'total_courses_enrolled': course_progress.count(),
            'total_courses_completed': course_progress.filter(progress_percentage=100).count(),
            'total_lessons_completed': user_progress.total_lessons_completed if user_progress else 0,
            'total_exercises_completed': user_progress.total_exercises_completed if user_progress else 0,
            'current_streak': user_progress.current_streak_days if user_progress else 0,
            'total_study_hours': user_progress.total_study_hours if user_progress else 0,
        },
        'expanded_courses': expanded_courses,
        'recent_achievements': [
            {
                'id': achievement.id,
                'title': achievement.title,
                'description': achievement.description,
                'type': achievement.achievement_type,
                'earned_at': achievement.earned_at,
            }
            for achievement in recent_achievements
        ],
        'recent_courses': [
            {
                'id': cp.course.id,
                'title': cp.course.title,
                'slug': cp.course.slug,
                'progress': cp.progress_percentage,
                'completed_lessons': cp.completed_lessons,
                'total_lessons': cp.course.total_lessons,
                'last_accessed': cp.updated_at,
            }
            for cp in course_progress.order_by('-updated_at')[:5]
        ]
    })



