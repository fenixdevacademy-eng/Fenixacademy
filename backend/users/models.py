from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
import uuid
from django.utils import timezone

class User(AbstractUser):
    """
    Enhanced user model for international edtech platform
    """
    # Basic information
    email = models.EmailField(unique=True, verbose_name=_('email address'))
    username = models.CharField(
        max_length=150, 
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z0-9_]+$',
                message=_('Username can only contain letters, numbers, and underscores.')
            )
        ],
        verbose_name=_('username')
    )
    
    # Profile information
    first_name = models.CharField(max_length=30, verbose_name=_('first name'))
    last_name = models.CharField(max_length=30, verbose_name=_('last name'))
    bio = models.TextField(blank=True, verbose_name=_('bio'))
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, verbose_name=_('avatar'))
    date_of_birth = models.DateField(null=True, blank=True, verbose_name=_('date of birth'))
    
    # Contact information
    phone_number = models.CharField(max_length=20, blank=True, verbose_name=_('phone number'))
    country = models.CharField(max_length=100, blank=True, verbose_name=_('country'))
    city = models.CharField(max_length=100, blank=True, verbose_name=_('city'))
    timezone = models.CharField(max_length=50, default='UTC', verbose_name=_('timezone'))
    
    # Preferences
    preferred_language = models.CharField(
        max_length=10,
        choices=[
            ('en', 'English'),
            ('pt', 'Português'),
            ('es', 'Español'),
            ('fr', 'Français'),
            ('de', 'Deutsch'),
            ('it', 'Italiano'),
            ('ja', '日本語'),
            ('ko', '한국어'),
            ('zh', '中文'),
            ('ar', 'العربية'),
        ],
        default='en',
        verbose_name=_('preferred language')
    )
    email_notifications = models.BooleanField(default=True, verbose_name=_('email notifications'))
    push_notifications = models.BooleanField(default=True, verbose_name=_('push notifications'))
    marketing_emails = models.BooleanField(default=False, verbose_name=_('marketing emails'))
    
    # Learning preferences
    learning_goals = models.JSONField(default=list, blank=True, verbose_name=_('learning goals'))
    skill_level = models.CharField(
        max_length=20,
        choices=[
            ('beginner', _('Beginner')),
            ('intermediate', _('Intermediate')),
            ('advanced', _('Advanced')),
            ('expert', _('Expert')),
        ],
        default='beginner',
        verbose_name=_('skill level')
    )
    interests = models.JSONField(default=list, blank=True, verbose_name=_('interests'))
    
    # Founder program
    is_founder = models.BooleanField(default=False, verbose_name=_('is founder'))
    founder_payment_id = models.CharField(max_length=128, blank=True, null=True)
    founder_benefits_granted = models.BooleanField(default=False, verbose_name=_('founder benefits granted'))
    founder_joined_date = models.DateTimeField(null=True, blank=True, verbose_name=_('founder joined date'))
    
    # Account status
    is_verified = models.BooleanField(default=False, verbose_name=_('is verified'))
    email_verified = models.BooleanField(default=False, verbose_name=_('email verified'))
    phone_verified = models.BooleanField(default=False, verbose_name=_('phone verified'))
    verification_token = models.UUIDField(default=uuid.uuid4, editable=False)
    
    # Social login
    google_id = models.CharField(max_length=100, blank=True, null=True)
    facebook_id = models.CharField(max_length=100, blank=True, null=True)
    github_id = models.CharField(max_length=100, blank=True, null=True)
    linkedin_id = models.CharField(max_length=100, blank=True, null=True)
    
    # Subscription and billing
    subscription_status = models.CharField(
        max_length=20,
        choices=[
            ('free', _('Free')),
            ('basic', _('Basic')),
            ('premium', _('Premium')),
            ('enterprise', _('Enterprise')),
        ],
        default='free',
        verbose_name=_('subscription status')
    )
    subscription_expires = models.DateTimeField(null=True, blank=True, verbose_name=_('subscription expires'))
    
    # Analytics and tracking
    last_login_ip = models.GenericIPAddressField(null=True, blank=True, verbose_name=_('last login IP'))
    registration_ip = models.GenericIPAddressField(null=True, blank=True, verbose_name=_('registration IP'))
    user_agent = models.TextField(blank=True, verbose_name=_('user agent'))
    referrer = models.URLField(blank=True, verbose_name=_('referrer'))
    
    # GDPR and privacy
    gdpr_consent = models.BooleanField(default=False, verbose_name=_('GDPR consent'))
    data_processing_consent = models.BooleanField(default=False, verbose_name=_('data processing consent'))
    marketing_consent = models.BooleanField(default=False, verbose_name=_('marketing consent'))
    consent_date = models.DateTimeField(null=True, blank=True, verbose_name=_('consent date'))
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('created at'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('updated at'))
    last_activity = models.DateTimeField(null=True, blank=True, verbose_name=_('last activity'))
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        db_table = 'users'
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['username']),
            models.Index(fields=['is_founder']),
            models.Index(fields=['subscription_status']),
            models.Index(fields=['preferred_language']),
            models.Index(fields=['created_at']),
            models.Index(fields=['last_activity']),
        ]
    
    def __str__(self):
        return self.email
    
    @property
    def full_name(self):
        """Get user's full name"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name:
            return self.first_name
        elif self.username:
            return self.username
        return self.email
    
    @property
    def display_name(self):
        """Get user's display name"""
        if self.first_name:
            return self.first_name
        return self.username
    
    @property
    def is_subscribed(self):
        """Check if user has active subscription"""
        if self.subscription_status == 'free':
            return False
        if self.subscription_expires and self.subscription_expires < timezone.now():
            return False
        return True
    
    @property
    def subscription_days_left(self):
        """Get days left in subscription"""
        if not self.subscription_expires:
            return 0
        delta = self.subscription_expires - timezone.now()
        return max(0, delta.days)
    
    def clean(self):
        """Custom validation"""
        super().clean()
        
        # Validate phone number format
        if self.phone_number:
            phone_regex = RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message=_('Phone number must be entered in the format: +999999999. Up to 15 digits allowed.')
            )
            try:
                phone_regex(self.phone_number)
            except ValidationError:
                raise ValidationError({'phone_number': _('Invalid phone number format.')})
    
    def save(self, *args, **kwargs):
        """Custom save method"""
        if self.is_founder and not self.founder_joined_date:
            self.founder_joined_date = timezone.now()
        
        if not self.username:
            self.username = self.email.split('@')[0]
        
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        """Get user's profile URL"""
        from django.urls import reverse
        return reverse('user-profile', kwargs={'username': self.username})
    
    def get_avatar_url(self):
        """Get user's avatar URL"""
        if self.avatar:
            return self.avatar.url
        return f"https://ui-avatars.com/api/?name={self.full_name}&background=random"
    
    def update_last_activity(self):
        """Update last activity timestamp"""
        self.last_activity = timezone.now()
        self.save(update_fields=['last_activity'])
    
    def get_learning_progress(self):
        """Get user's learning progress summary"""
        from progress.models import UserProgress
        try:
            return self.progress
        except UserProgress.DoesNotExist:
            return None
    
    def get_enrolled_courses(self):
        """Get user's enrolled courses"""
        from courses.models import Enrollment
        return Enrollment.objects.filter(user=self, status='active').select_related('course')
    
    def get_completed_courses(self):
        """Get user's completed courses"""
        from courses.models import Enrollment
        return Enrollment.objects.filter(user=self, status='completed').select_related('course')
    
    def get_certificates(self):
        """Get user's certificates"""
        from certificates.models import Certificate
        return Certificate.objects.filter(user=self, status='issued')
    
    def get_total_study_time(self):
        """Get total study time in hours"""
        from progress.models import StudySession
        total_minutes = StudySession.objects.filter(user=self).aggregate(
            total=models.Sum('duration_minutes')
        )['total'] or 0
        return total_minutes / 60
    
    def get_current_streak(self):
        """Get current study streak in days"""
        from progress.models import UserProgress
        try:
            return self.progress.current_streak_days
        except UserProgress.DoesNotExist:
            return 0
    
    def get_achievements(self):
        """Get user's achievements"""
        # This would be implemented with an achievements system
        return []
    
    def can_access_course(self, course):
        """Check if user can access a specific course"""
        if course.is_free:
            return True
        
        if self.is_founder:
            return True
        
        if self.subscription_status in ['premium', 'enterprise']:
            return True
        
        # Check if user has purchased the course
        from courses.models import Enrollment
        return Enrollment.objects.filter(
            user=self, 
            course=course, 
            status='active'
        ).exists()
    
    def get_recommended_courses(self, limit=5):
        """Get recommended courses based on user preferences"""
        from courses.models import Course
        return Course.objects.filter(
            status='published',
            difficulty=self.skill_level
        ).exclude(
            enrollments__user=self
        )[:limit]
    
    def send_welcome_email(self):
        """Send welcome email to new user"""
        from courses.tasks import send_welcome_email
        send_welcome_email.delay(self.id)
    
    def send_verification_email(self):
        """Send email verification"""
        from users.tasks import send_verification_email
        send_verification_email.delay(self.id)
    
    def mark_email_verified(self):
        """Mark email as verified"""
        self.email_verified = True
        self.is_verified = True
        self.save(update_fields=['email_verified', 'is_verified'])
    
    def update_subscription(self, status, expires=None):
        """Update user subscription"""
        self.subscription_status = status
        if expires:
            self.subscription_expires = expires
        self.save(update_fields=['subscription_status', 'subscription_expires'])
    
    def grant_founder_benefits(self):
        """Grant founder benefits"""
        self.founder_benefits_granted = True
        self.subscription_status = 'premium'
        self.save(update_fields=['founder_benefits_granted', 'subscription_status'])
    
    def get_learning_path(self):
        """Get personalized learning path"""
        # This would implement AI-based learning path recommendation
        return []
    
    def get_skill_gaps(self):
        """Get user's skill gaps analysis"""
        # This would implement skill gap analysis
        return []
    
    def get_learning_recommendations(self):
        """Get personalized learning recommendations"""
        # This would implement AI-based recommendations
        return []
    
    def export_data(self):
        """Export user data for GDPR compliance"""
        return {
            'profile': {
                'email': self.email,
                'username': self.username,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'bio': self.bio,
                'country': self.country,
                'city': self.city,
                'timezone': self.timezone,
                'preferred_language': self.preferred_language,
                'skill_level': self.skill_level,
                'interests': self.interests,
                'created_at': self.created_at.isoformat(),
                'last_activity': self.last_activity.isoformat() if self.last_activity else None,
            },
            'learning_data': {
                'enrolled_courses': list(self.get_enrolled_courses().values('course__title', 'enrolled_at')),
                'completed_courses': list(self.get_completed_courses().values('course__title', 'completed_at')),
                'certificates': list(self.get_certificates().values('course__title', 'issued_at')),
                'total_study_time': self.get_total_study_time(),
                'current_streak': self.get_current_streak(),
            },
            'preferences': {
                'email_notifications': self.email_notifications,
                'push_notifications': self.push_notifications,
                'marketing_emails': self.marketing_emails,
                'learning_goals': self.learning_goals,
            },
            'consent': {
                'gdpr_consent': self.gdpr_consent,
                'data_processing_consent': self.data_processing_consent,
                'marketing_consent': self.marketing_consent,
                'consent_date': self.consent_date.isoformat() if self.consent_date else None,
            }
        }
    
    def delete_user_data(self):
        """Delete user data for GDPR compliance"""
        # Anonymize user data instead of deleting
        self.email = f"deleted_{uuid.uuid4()}@deleted.com"
        self.username = f"deleted_{uuid.uuid4()}"
        self.first_name = "Deleted"
        self.last_name = "User"
        self.bio = ""
        self.avatar = None
        self.phone_number = ""
        self.country = ""
        self.city = ""
        self.is_active = False
        self.save()
        
        # Delete related data
        from progress.models import UserProgress, StudySession
        UserProgress.objects.filter(user=self).delete()
        StudySession.objects.filter(user=self).delete()
        
        # Note: Keep payment records for legal compliance 