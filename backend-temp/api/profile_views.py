from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Count, Sum, Avg
from django.utils import timezone
from datetime import timedelta
import json

from users.models import User
from progress.models import UserProgress, CourseProgress, LessonProgress, ExerciseProgress, UserAchievement, StudySession
from courses.models import Course, Module, Lesson, Exercise
from payments.models import Payment

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get detailed user profile information"""
    user = request.user
    
    try:
        # Get or create user progress
        progress, created = UserProgress.objects.get_or_create(user=user)
        
        # Get user's enrolled courses
        enrolled_courses = CourseProgress.objects.filter(user=user).select_related('course')
        
        # Get user's achievements
        achievements = UserAchievement.objects.filter(user=user).order_by('-awarded_at')[:10]
        
        # Get recent study sessions
        recent_sessions = StudySession.objects.filter(user=user).order_by('-start_time')[:5]
        
        # Calculate additional stats
        total_study_time = StudySession.objects.filter(user=user).aggregate(
            total=Sum('duration_minutes')
        )['total'] or 0
        
        # Get current level and experience
        current_level = progress.current_level
        experience_points = progress.experience_points
        experience_to_next_level = progress.experience_to_next_level
        
        # Get learning goals and interests
        learning_goals = user.learning_goals if user.learning_goals else []
        interests = user.interests if user.interests else []
        
        # Get subscription info
        subscription_status = user.subscription_status
        subscription_expires = user.subscription_expires
        is_founder = user.is_founder
        
        # Get recent activity
        recent_activity = []
        
        # Recent course completions
        recent_completions = enrolled_courses.filter(
            is_completed=True,
            completed_at__gte=timezone.now() - timedelta(days=30)
        ).order_by('-completed_at')[:3]
        
        for completion in recent_completions:
            recent_activity.append({
                'type': 'course_completed',
                'title': completion.course.title,
                'date': completion.completed_at,
                'icon': '🎓'
            })
        
        # Recent achievements
        recent_achievements = achievements[:3]
        for achievement in recent_achievements:
            recent_activity.append({
                'type': 'achievement_earned',
                'title': achievement.title,
                'date': achievement.awarded_at,
                'icon': '🏆'
            })
        
        # Sort by date
        recent_activity.sort(key=lambda x: x['date'], reverse=True)
        
        profile_data = {
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'full_name': user.full_name,
                'display_name': user.display_name,
                'bio': user.bio,
                'avatar': user.get_avatar_url(),
                'date_of_birth': user.date_of_birth,
                'phone_number': user.phone_number,
                'country': user.country,
                'city': user.city,
                'timezone': user.timezone,
                'preferred_language': user.preferred_language,
                'skill_level': user.skill_level,
                'learning_goals': learning_goals,
                'interests': interests,
                'is_founder': is_founder,
                'subscription_status': subscription_status,
                'subscription_expires': subscription_expires,
                'is_verified': user.is_verified,
                'email_verified': user.email_verified,
                'created_at': user.created_at,
                'last_activity': user.last_activity,
            },
            'stats': {
                'courses_enrolled': enrolled_courses.count(),
                'courses_completed': enrolled_courses.filter(is_completed=True).count(),
                'lessons_completed': progress.total_lessons_completed,
                'exercises_completed': progress.total_exercises_completed,
                'certificates_earned': achievements.filter(achievement_type='certificate_earner').count(),
                'total_study_hours': total_study_time / 60,  # Convert minutes to hours
                'current_streak_days': progress.current_streak_days,
                'longest_streak_days': progress.longest_streak_days,
                'total_points_earned': progress.total_points_earned,
                'current_level': current_level,
                'experience_points': experience_points,
                'experience_to_next_level': experience_to_next_level,
                'level_progress': (experience_points / experience_to_next_level) * 100 if experience_to_next_level > 0 else 0,
            },
            'recent_courses': [
                {
                    'id': cp.course.id,
                    'title': cp.course.title,
                    'description': cp.course.description,
                    'category': cp.course.category.name,
                    'difficulty': cp.course.difficulty,
                    'progress_percentage': float(cp.progress_percentage),
                    'is_completed': cp.is_completed,
                    'started_at': cp.started_at,
                    'completed_at': cp.completed_at,
                    'last_accessed': cp.last_accessed,
                    'total_time_spent': cp.total_time_spent,
                    'average_score': float(cp.average_score) if cp.average_score else None,
                }
                for cp in enrolled_courses[:5]
            ],
            'achievements': [
                {
                    'id': achievement.id,
                    'title': achievement.title,
                    'description': achievement.description,
                    'achievement_type': achievement.achievement_type,
                    'difficulty': achievement.difficulty,
                    'icon': achievement.icon,
                    'color': achievement.color,
                    'points_earned': achievement.points_earned,
                    'awarded_at': achievement.awarded_at,
                }
                for achievement in achievements
            ],
            'recent_activity': recent_activity,
            'study_sessions': [
                {
                    'id': session.id,
                    'course_title': session.course.title if session.course else 'General Study',
                    'lesson_title': session.lesson.title if session.lesson else None,
                    'session_type': session.session_type,
                    'duration_minutes': session.duration_minutes,
                    'start_time': session.start_time,
                    'end_time': session.end_time,
                    'focus_score': float(session.focus_score) if session.focus_score else None,
                    'completion_rate': float(session.completion_rate) if session.completion_rate else None,
                }
                for session in recent_sessions
            ],
            'preferences': {
                'email_notifications': user.email_notifications,
                'push_notifications': user.push_notifications,
                'marketing_emails': user.marketing_emails,
                'public_profile': user.public_profile if hasattr(user, 'public_profile') else False,
                'show_progress': user.show_progress if hasattr(user, 'show_progress') else True,
            }
        }
        
        return Response({
            'success': True,
            'profile': profile_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': f'Erro ao carregar perfil: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    """Update user profile information"""
    user = request.user
    data = request.data
    
    try:
        # Update basic information
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'bio' in data:
            user.bio = data['bio']
        if 'phone_number' in data:
            user.phone_number = data['phone_number']
        if 'country' in data:
            user.country = data['country']
        if 'city' in data:
            user.city = data['city']
        if 'timezone' in data:
            user.timezone = data['timezone']
        if 'preferred_language' in data:
            user.preferred_language = data['preferred_language']
        if 'skill_level' in data:
            user.skill_level = data['skill_level']
        if 'learning_goals' in data:
            user.learning_goals = data['learning_goals']
        if 'interests' in data:
            user.interests = data['interests']
        
        # Update preferences
        if 'preferences' in data:
            prefs = data['preferences']
            if 'email_notifications' in prefs:
                user.email_notifications = prefs['email_notifications']
            if 'push_notifications' in prefs:
                user.push_notifications = prefs['push_notifications']
            if 'marketing_emails' in prefs:
                user.marketing_emails = prefs['marketing_emails']
        
        user.save()
        
        return Response({
            'success': True,
            'message': 'Perfil atualizado com sucesso',
            'profile': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'full_name': user.full_name,
                'display_name': user.display_name,
                'bio': user.bio,
                'avatar': user.get_avatar_url(),
                'phone_number': user.phone_number,
                'country': user.country,
                'city': user.city,
                'timezone': user.timezone,
                'preferred_language': user.preferred_language,
                'skill_level': user.skill_level,
                'learning_goals': user.learning_goals,
                'interests': user.interests,
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': f'Erro ao atualizar perfil: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_dashboard_data(request):
    """Get comprehensive dashboard data"""
    user = request.user
    
    try:
        # Get user progress
        progress, created = UserProgress.objects.get_or_create(user=user)
        
        # Get enrolled courses with progress
        enrolled_courses = CourseProgress.objects.filter(user=user).select_related('course')
        
        # Get recent achievements
        recent_achievements = UserAchievement.objects.filter(
            user=user
        ).order_by('-awarded_at')[:5]
        
        # Get study sessions for the last 30 days
        thirty_days_ago = timezone.now() - timedelta(days=30)
        recent_sessions = StudySession.objects.filter(
            user=user,
            start_time__gte=thirty_days_ago
        ).order_by('-start_time')
        
        # Calculate study time by day for the last 7 days
        study_time_by_day = []
        for i in range(7):
            date = timezone.now().date() - timedelta(days=i)
            day_sessions = recent_sessions.filter(start_time__date=date)
            total_minutes = sum(session.duration_minutes for session in day_sessions)
            study_time_by_day.append({
                'date': date.isoformat(),
                'minutes': total_minutes,
                'hours': round(total_minutes / 60, 1)
            })
        
        study_time_by_day.reverse()  # Most recent first
        
        # Get course progress by category
        course_categories = {}
        for cp in enrolled_courses:
            category = cp.course.category.name
            if category not in course_categories:
                course_categories[category] = {
                    'total_courses': 0,
                    'completed_courses': 0,
                    'total_progress': 0
                }
            course_categories[category]['total_courses'] += 1
            if cp.is_completed:
                course_categories[category]['completed_courses'] += 1
            course_categories[category]['total_progress'] += float(cp.progress_percentage)
        
        # Calculate average progress per category
        for category in course_categories:
            if course_categories[category]['total_courses'] > 0:
                course_categories[category]['average_progress'] = round(
                    course_categories[category]['total_progress'] / course_categories[category]['total_courses'], 1
                )
            else:
                course_categories[category]['average_progress'] = 0
        
        # Get recommended courses
        recommended_courses = Course.objects.filter(
            status='published',
            difficulty=user.skill_level
        ).exclude(
            user_progress__user=user
        )[:5]
        
        # Get upcoming deadlines (if any)
        upcoming_deadlines = []
        # This would be implemented based on course schedules
        
        # Get learning streak info
        streak_info = {
            'current_streak': progress.current_streak_days,
            'longest_streak': progress.longest_streak_days,
            'last_study_date': progress.last_study_date,
        }
        
        # Get level and experience info
        level_info = {
            'current_level': progress.current_level,
            'experience_points': progress.experience_points,
            'experience_to_next_level': progress.experience_to_next_level,
            'level_progress': (progress.experience_points / progress.experience_to_next_level) * 100 if progress.experience_to_next_level > 0 else 0
        }
        
        dashboard_data = {
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'full_name': user.full_name,
                'display_name': user.display_name,
                'avatar': user.get_avatar_url(),
                'skill_level': user.skill_level,
                'subscription_status': user.subscription_status,
                'is_founder': user.is_founder,
            },
            'overview': {
                'courses_enrolled': enrolled_courses.count(),
                'courses_completed': enrolled_courses.filter(is_completed=True).count(),
                'lessons_completed': progress.total_lessons_completed,
                'exercises_completed': progress.total_exercises_completed,
                'certificates_earned': recent_achievements.filter(achievement_type='certificate_earner').count(),
                'total_study_hours': sum(session.duration_minutes for session in recent_sessions) / 60,
                'current_streak': progress.current_streak_days,
                'total_points': progress.total_points_earned,
            },
            'recent_courses': [
                {
                    'id': cp.course.id,
                    'title': cp.course.title,
                    'description': cp.course.description,
                    'category': cp.course.category.name,
                    'difficulty': cp.course.difficulty,
                    'progress_percentage': float(cp.progress_percentage),
                    'is_completed': cp.is_completed,
                    'last_accessed': cp.last_accessed,
                    'total_time_spent': cp.total_time_spent,
                }
                for cp in enrolled_courses.order_by('-last_accessed')[:5]
            ],
            'recent_achievements': [
                {
                    'id': achievement.id,
                    'title': achievement.title,
                    'description': achievement.description,
                    'achievement_type': achievement.achievement_type,
                    'difficulty': achievement.difficulty,
                    'icon': achievement.icon,
                    'color': achievement.color,
                    'points_earned': achievement.points_earned,
                    'awarded_at': achievement.awarded_at,
                }
                for achievement in recent_achievements
            ],
            'study_analytics': {
                'study_time_by_day': study_time_by_day,
                'total_sessions_30_days': recent_sessions.count(),
                'average_session_duration': round(
                    sum(session.duration_minutes for session in recent_sessions) / recent_sessions.count(), 1
                ) if recent_sessions.count() > 0 else 0,
            },
            'course_categories': course_categories,
            'recommended_courses': [
                {
                    'id': course.id,
                    'title': course.title,
                    'description': course.description,
                    'category': course.category.name,
                    'difficulty': course.difficulty,
                    'price': float(course.price),
                    'is_free': course.is_free,
                    'total_lessons': course.total_lessons,
                    'total_exercises': course.total_exercises,
                    'duration_hours': course.duration_hours,
                    'thumbnail': course.thumbnail.url if course.thumbnail else None,
                }
                for course in recommended_courses
            ],
            'streak_info': streak_info,
            'level_info': level_info,
            'upcoming_deadlines': upcoming_deadlines,
        }
        
        return Response({
            'success': True,
            'dashboard': dashboard_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': f'Erro ao carregar dashboard: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_study_session(request):
    """Update or create a study session"""
    user = request.user
    data = request.data
    
    try:
        course_id = data.get('course_id')
        lesson_id = data.get('lesson_id')
        session_type = data.get('session_type', 'video')
        duration_minutes = data.get('duration_minutes', 0)
        focus_score = data.get('focus_score')
        completion_rate = data.get('completion_rate')
        
        # Get course and lesson objects
        course = None
        lesson = None
        
        if course_id:
            try:
                course = Course.objects.get(id=course_id)
            except Course.DoesNotExist:
                pass
        
        if lesson_id:
            try:
                lesson = Lesson.objects.get(id=lesson_id)
            except Lesson.DoesNotExist:
                pass
        
        # Create study session
        session = StudySession.objects.create(
            user=user,
            course=course,
            lesson=lesson,
            session_type=session_type,
            duration_minutes=duration_minutes,
            focus_score=focus_score,
            completion_rate=completion_rate,
            device_type=data.get('device_type', ''),
            browser=data.get('browser', ''),
            ip_address=request.META.get('REMOTE_ADDR')
        )
        
        # Update user progress
        progress, created = UserProgress.objects.get_or_create(user=user)
        progress.update_streak()
        progress.total_study_hours += duration_minutes / 60
        progress.save()
        
        return Response({
            'success': True,
            'session_id': session.id,
            'message': 'Sessão de estudo registrada com sucesso'
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': f'Erro ao registrar sessão de estudo: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)














