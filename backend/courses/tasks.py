from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from .models import Course, Enrollment
from progress.models import UserProgress
from certificates.models import Certificate
import logging

logger = logging.getLogger(__name__)

@shared_task
def send_welcome_email(user_id):
    """
    Send welcome email to new users
    """
    try:
        from users.models import User
        user = User.objects.get(id=user_id)
        
        subject = f"Welcome to Fênix Dev Academy, {user.first_name}!"
        subject_pt = f"Bem-vindo à Fênix Dev Academy, {user.first_name}!"
        
        # Get user's preferred language
        language = user.preferred_language
        
        if language == 'pt':
            subject = subject_pt
            template_name = 'emails/welcome_pt.html'
        else:
            template_name = 'emails/welcome_en.html'
        
        context = {
            'user': user,
            'site_name': 'Fênix Dev Academy',
            'login_url': f"{settings.SITE_URL}/login",
            'courses_url': f"{settings.SITE_URL}/courses",
        }
        
        html_message = render_to_string(template_name, context)
        plain_message = f"""
        Welcome to Fênix Dev Academy!
        
        Hi {user.first_name},
        
        Thank you for joining Fênix Dev Academy! We're excited to have you on board.
        
        Get started by exploring our courses: {context['courses_url']}
        
        Best regards,
        The Fênix Dev Academy Team
        """
        
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html_message,
            fail_silently=False,
        )
        
        logger.info(f"Welcome email sent to {user.email}")
        
    except Exception as e:
        logger.error(f"Failed to send welcome email to user {user_id}: {str(e)}")
        raise

@shared_task
def send_course_enrollment_email(enrollment_id):
    """
    Send course enrollment confirmation email
    """
    try:
        enrollment = Enrollment.objects.select_related('user', 'course').get(id=enrollment_id)
        user = enrollment.user
        course = enrollment.course
        
        subject = f"Welcome to {course.title}!"
        subject_pt = f"Bem-vindo ao {course.get_title('pt')}!"
        
        language = user.preferred_language
        
        if language == 'pt':
            subject = subject_pt
            template_name = 'emails/course_enrollment_pt.html'
        else:
            template_name = 'emails/course_enrollment_en.html'
        
        context = {
            'user': user,
            'course': course,
            'enrollment': enrollment,
            'course_url': f"{settings.SITE_URL}/courses/{course.slug}",
            'dashboard_url': f"{settings.SITE_URL}/dashboard",
        }
        
        html_message = render_to_string(template_name, context)
        plain_message = f"""
        Welcome to {course.title}!
        
        Hi {user.first_name},
        
        You have successfully enrolled in {course.title}.
        
        Start learning now: {context['course_url']}
        
        Best regards,
        The Fênix Dev Academy Team
        """
        
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html_message,
            fail_silently=False,
        )
        
        logger.info(f"Course enrollment email sent to {user.email} for {course.title}")
        
    except Exception as e:
        logger.error(f"Failed to send course enrollment email for enrollment {enrollment_id}: {str(e)}")
        raise

@shared_task
def send_course_completion_email(enrollment_id):
    """
    Send course completion email and generate certificate
    """
    try:
        enrollment = Enrollment.objects.select_related('user', 'course').get(id=enrollment_id)
        user = enrollment.user
        course = enrollment.course
        
        # Generate certificate
        certificate, created = Certificate.objects.get_or_create(
            user=user,
            course=course,
            defaults={
                'title': f"Certificate of Completion - {course.title}",
                'title_pt': f"Certificado de Conclusão - {course.get_title('pt')}",
                'description': f"This certificate is awarded to {user.get_full_name()} for successfully completing {course.title}.",
                'description_pt': f"Este certificado é concedido a {user.get_full_name()} por concluir com sucesso {course.get_title('pt')}.",
                'status': 'generated',
                'language': user.preferred_language,
            }
        )
        
        if created:
            certificate.generate_qr_code()
        
        subject = f"Congratulations! You've completed {course.title}"
        subject_pt = f"Parabéns! Você concluiu {course.get_title('pt')}"
        
        language = user.preferred_language
        
        if language == 'pt':
            subject = subject_pt
            template_name = 'emails/course_completion_pt.html'
        else:
            template_name = 'emails/course_completion_en.html'
        
        context = {
            'user': user,
            'course': course,
            'certificate': certificate,
            'certificate_url': f"{settings.SITE_URL}/certificates/{certificate.certificate_id}",
            'dashboard_url': f"{settings.SITE_URL}/dashboard",
        }
        
        html_message = render_to_string(template_name, context)
        plain_message = f"""
        Congratulations on completing {course.title}!
        
        Hi {user.first_name},
        
        You have successfully completed {course.title}. Your certificate is ready!
        
        View your certificate: {context['certificate_url']}
        
        Best regards,
        The Fênix Dev Academy Team
        """
        
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html_message,
            fail_silently=False,
        )
        
        logger.info(f"Course completion email sent to {user.email} for {course.title}")
        
    except Exception as e:
        logger.error(f"Failed to send course completion email for enrollment {enrollment_id}: {str(e)}")
        raise

@shared_task
def send_reminder_emails():
    """
    Send reminder emails to users who haven't studied in a while
    """
    try:
        # Find users who haven't studied in 3 days or more
        three_days_ago = timezone.now() - timedelta(days=3)
        
        inactive_users = UserProgress.objects.filter(
            last_study_date__lt=three_days_ago,
            user__email_notifications=True,
            user__course_reminders=True
        ).select_related('user')
        
        for progress in inactive_users:
            user = progress.user
            
            # Get user's active courses
            active_enrollments = user.enrollments.filter(status='active')
            
            if active_enrollments.exists():
                subject = "Don't forget to continue your learning journey!"
                subject_pt = "Não esqueça de continuar sua jornada de aprendizado!"
                
                language = user.preferred_language
                
                if language == 'pt':
                    subject = subject_pt
                    template_name = 'emails/study_reminder_pt.html'
                else:
                    template_name = 'emails/study_reminder_en.html'
                
                context = {
                    'user': user,
                    'active_courses': active_enrollments,
                    'dashboard_url': f"{settings.SITE_URL}/dashboard",
                    'days_inactive': (timezone.now().date() - progress.last_study_date.date()).days,
                }
                
                html_message = render_to_string(template_name, context)
                plain_message = f"""
                Hi {user.first_name},
                
                It's been {context['days_inactive']} days since your last study session.
                Don't lose momentum! Continue your learning journey.
                
                Visit your dashboard: {context['dashboard_url']}
                
                Best regards,
                The Fênix Dev Academy Team
                """
                
                send_mail(
                    subject=subject,
                    message=plain_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[user.email],
                    html_message=html_message,
                    fail_silently=False,
                )
                
                logger.info(f"Study reminder sent to {user.email}")
        
        logger.info(f"Sent {inactive_users.count()} study reminder emails")
        
    except Exception as e:
        logger.error(f"Failed to send reminder emails: {str(e)}")
        raise

@shared_task
def send_achievement_email(achievement_id):
    """
    Send achievement notification email
    """
    try:
        from progress.models import Achievement
        achievement = Achievement.objects.select_related('user').get(id=achievement_id)
        user = achievement.user
        
        subject = f"🎉 New Achievement Unlocked: {achievement.title}"
        subject_pt = f"🎉 Nova Conquista Desbloqueada: {achievement.get_title('pt')}"
        
        language = user.preferred_language
        
        if language == 'pt':
            subject = subject_pt
            template_name = 'emails/achievement_pt.html'
        else:
            template_name = 'emails/achievement_en.html'
        
        context = {
            'user': user,
            'achievement': achievement,
            'dashboard_url': f"{settings.SITE_URL}/dashboard",
            'achievements_url': f"{settings.SITE_URL}/dashboard/achievements",
        }
        
        html_message = render_to_string(template_name, context)
        plain_message = f"""
        🎉 New Achievement Unlocked!
        
        Hi {user.first_name},
        
        Congratulations! You've earned a new achievement: {achievement.title}
        
        {achievement.description}
        
        View your achievements: {context['achievements_url']}
        
        Best regards,
        The Fênix Dev Academy Team
        """
        
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html_message,
            fail_silently=False,
        )
        
        logger.info(f"Achievement email sent to {user.email} for {achievement.title}")
        
    except Exception as e:
        logger.error(f"Failed to send achievement email for achievement {achievement_id}: {str(e)}")
        raise

@shared_task
def send_level_up_email(user_id, new_level):
    """
    Send level up notification email
    """
    try:
        from users.models import User
        user = User.objects.get(id=user_id)
        
        subject = f"🎊 Level Up! You're now Level {new_level}"
        subject_pt = f"🎊 Subiu de Nível! Você agora é Nível {new_level}"
        
        language = user.preferred_language
        
        if language == 'pt':
            subject = subject_pt
            template_name = 'emails/level_up_pt.html'
        else:
            template_name = 'emails/level_up_en.html'
        
        context = {
            'user': user,
            'new_level': new_level,
            'dashboard_url': f"{settings.SITE_URL}/dashboard",
        }
        
        html_message = render_to_string(template_name, context)
        plain_message = f"""
        🎊 Level Up!
        
        Hi {user.first_name},
        
        Congratulations! You've reached Level {new_level}!
        
        Keep up the great work and continue your learning journey.
        
        Visit your dashboard: {context['dashboard_url']}
        
        Best regards,
        The Fênix Dev Academy Team
        """
        
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html_message,
            fail_silently=False,
        )
        
        logger.info(f"Level up email sent to {user.email} for level {new_level}")
        
    except Exception as e:
        logger.error(f"Failed to send level up email to user {user_id}: {str(e)}")
        raise

@shared_task
def update_course_statistics():
    """
    Update course statistics (enrollments, ratings, etc.)
    """
    try:
        courses = Course.objects.all()
        
        for course in courses:
            # Update total enrollments
            total_enrollments = course.enrollments.filter(status='active').count()
            
            # Update total lessons and exercises
            total_lessons = course.lessons.count()
            total_exercises = course.exercises.count()
            
            # Update estimated hours
            estimated_hours = sum(module.estimated_hours for module in course.modules.all())
            
            # Save updates
            course.total_lessons = total_lessons
            course.total_exercises = total_exercises
            course.estimated_hours = estimated_hours
            course.save(update_fields=['total_lessons', 'total_exercises', 'estimated_hours'])
        
        logger.info(f"Updated statistics for {courses.count()} courses")
        
    except Exception as e:
        logger.error(f"Failed to update course statistics: {str(e)}")
        raise

@shared_task
def cleanup_old_sessions():
    """
    Clean up old study sessions (older than 1 year)
    """
    try:
        from progress.models import StudySession
        from datetime import timedelta
        
        one_year_ago = timezone.now() - timedelta(days=365)
        deleted_count = StudySession.objects.filter(start_time__lt=one_year_ago).delete()[0]
        
        logger.info(f"Cleaned up {deleted_count} old study sessions")
        
    except Exception as e:
        logger.error(f"Failed to cleanup old sessions: {str(e)}")
        raise 