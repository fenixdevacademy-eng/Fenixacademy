from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from .models import User

@shared_task
def send_welcome_email(user_id):
    """
    Send welcome email to new user
    """
    try:
        user = User.objects.get(id=user_id)
        subject = 'Bem-vindo à Fenix Academy!'
        message = f"""
        Olá {user.first_name},
        
        Bem-vindo à Fenix Academy! Estamos muito felizes em tê-lo conosco.
        
        Comece sua jornada de aprendizado explorando nossos cursos.
        
        Atenciosamente,
        Equipe Fenix Academy
        """
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        
        return f"Welcome email sent to {user.email}"
    except User.DoesNotExist:
        return f"User with id {user_id} not found"

@shared_task
def send_verification_email(user_id):
    """
    Send email verification to user
    """
    try:
        user = User.objects.get(id=user_id)
        subject = 'Verifique seu email - Fenix Academy'
        message = f"""
        Olá {user.first_name},
        
        Por favor, clique no link abaixo para verificar seu email:
        
        {settings.SITE_URL}/verify-email/{user.verification_token}/
        
        Atenciosamente,
        Equipe Fenix Academy
        """
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        
        return f"Verification email sent to {user.email}"
    except User.DoesNotExist:
        return f"User with id {user_id} not found"

@shared_task
def send_password_reset_email(user_id):
    """
    Send password reset email to user
    """
    try:
        user = User.objects.get(id=user_id)
        subject = 'Redefinir Senha - Fenix Academy'
        message = f"""
        Olá {user.first_name},
        
        Você solicitou a redefinição de sua senha. Clique no link abaixo:
        
        {settings.SITE_URL}/reset-password/{user.verification_token}/
        
        Se você não solicitou esta alteração, ignore este email.
        
        Atenciosamente,
        Equipe Fenix Academy
        """
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        
        return f"Password reset email sent to {user.email}"
    except User.DoesNotExist:
        return f"User with id {user_id} not found" 