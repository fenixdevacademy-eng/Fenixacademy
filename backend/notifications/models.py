from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import uuid

User = get_user_model()

class Notification(models.Model):
    """
    Notification system for users
    """
    NOTIFICATION_TYPES = [
        ('course_enrollment', 'Course Enrollment'),
        ('lesson_complete', 'Lesson Complete'),
        ('exercise_complete', 'Exercise Complete'),
        ('certificate_earned', 'Certificate Earned'),
        ('payment_success', 'Payment Success'),
        ('payment_failed', 'Payment Failed'),
        ('subscription_expiring', 'Subscription Expiring'),
        ('subscription_expired', 'Subscription Expired'),
        ('achievement_unlocked', 'Achievement Unlocked'),
        ('streak_milestone', 'Streak Milestone'),
        ('level_up', 'Level Up'),
        ('course_recommendation', 'Course Recommendation'),
        ('instructor_message', 'Instructor Message'),
        ('system_announcement', 'System Announcement'),
        ('welcome', 'Welcome'),
        ('reminder', 'Reminder'),
        ('achievement', 'Achievement'),
        ('social', 'Social'),
        ('marketing', 'Marketing'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('normal', 'Normal'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    notification_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    
    # Notification content
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    title_pt = models.CharField(max_length=200, blank=True, help_text="Portuguese title")
    message = models.TextField()
    message_pt = models.TextField(blank=True, help_text="Portuguese message")
    
    # Priority and status
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='normal')
    is_read = models.BooleanField(default=False)
    is_sent = models.BooleanField(default=False)
    
    # Delivery channels
    email_sent = models.BooleanField(default=False)
    push_sent = models.BooleanField(default=False)
    sms_sent = models.BooleanField(default=False)
    in_app_sent = models.BooleanField(default=False)
    
    # Related content
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')
    
    # Action data
    action_url = models.URLField(blank=True)
    action_text = models.CharField(max_length=100, blank=True)
    action_text_pt = models.CharField(max_length=100, blank=True, help_text="Portuguese action text")
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    scheduled_at = models.DateTimeField(null=True, blank=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    read_at = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('notification')
        verbose_name_plural = _('notifications')
        db_table = 'notifications'
        indexes = [
            models.Index(fields=['user', 'is_read']),
            models.Index(fields=['notification_type']),
            models.Index(fields=['priority']),
            models.Index(fields=['created_at']),
            models.Index(fields=['scheduled_at']),
        ]
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.notification_type} - {self.user.email} - {self.title}"
    
    def get_title(self, language='en'):
        """Get localized title"""
        if language == 'pt' and self.title_pt:
            return self.title_pt
        return self.title
    
    def get_message(self, language='en'):
        """Get localized message"""
        if language == 'pt' and self.message_pt:
            return self.message_pt
        return self.message
    
    def get_action_text(self, language='en'):
        """Get localized action text"""
        if language == 'pt' and self.action_text_pt:
            return self.action_text_pt
        return self.action_text
    
    def mark_as_read(self):
        """Mark notification as read"""
        from django.utils import timezone
        self.is_read = True
        self.read_at = timezone.now()
        self.save(update_fields=['is_read', 'read_at'])
    
    def mark_as_sent(self, channel):
        """Mark notification as sent for specific channel"""
        from django.utils import timezone
        if channel == 'email':
            self.email_sent = True
        elif channel == 'push':
            self.push_sent = True
        elif channel == 'sms':
            self.sms_sent = True
        elif channel == 'in_app':
            self.in_app_sent = True
        
        self.is_sent = True
        self.sent_at = timezone.now()
        self.save()

class NotificationTemplate(models.Model):
    """
    Templates for notifications
    """
    template_name = models.CharField(max_length=100, unique=True)
    notification_type = models.CharField(max_length=50, choices=Notification.NOTIFICATION_TYPES)
    
    # Template content
    title_template = models.CharField(max_length=200)
    title_template_pt = models.CharField(max_length=200, blank=True)
    message_template = models.TextField()
    message_template_pt = models.TextField(blank=True)
    
    # Email template
    email_subject = models.CharField(max_length=200, blank=True)
    email_subject_pt = models.CharField(max_length=200, blank=True)
    email_template = models.TextField(blank=True)
    email_template_pt = models.TextField(blank=True)
    
    # Push notification
    push_title = models.CharField(max_length=100, blank=True)
    push_title_pt = models.CharField(max_length=100, blank=True)
    push_body = models.TextField(blank=True)
    push_body_pt = models.TextField(blank=True)
    
    # SMS template
    sms_template = models.TextField(blank=True)
    sms_template_pt = models.TextField(blank=True)
    
    # Settings
    is_active = models.BooleanField(default=True)
    priority = models.CharField(max_length=20, choices=Notification.PRIORITY_CHOICES, default='normal')
    
    # Delivery settings
    send_email = models.BooleanField(default=True)
    send_push = models.BooleanField(default=True)
    send_sms = models.BooleanField(default=False)
    send_in_app = models.BooleanField(default=True)
    
    # Timing
    delay_minutes = models.IntegerField(default=0, help_text="Delay in minutes before sending")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('notification template')
        verbose_name_plural = _('notification templates')
        db_table = 'notification_templates'
    
    def __str__(self):
        return f"{self.template_name} - {self.notification_type}"

class NotificationPreference(models.Model):
    """
    User notification preferences
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='notification_preferences')
    
    # Channel preferences
    email_enabled = models.BooleanField(default=True)
    push_enabled = models.BooleanField(default=True)
    sms_enabled = models.BooleanField(default=False)
    in_app_enabled = models.BooleanField(default=True)
    
    # Type preferences
    course_notifications = models.BooleanField(default=True)
    achievement_notifications = models.BooleanField(default=True)
    payment_notifications = models.BooleanField(default=True)
    system_notifications = models.BooleanField(default=True)
    marketing_notifications = models.BooleanField(default=False)
    social_notifications = models.BooleanField(default=True)
    
    # Frequency
    email_frequency = models.CharField(
        max_length=20,
        choices=[
            ('immediate', 'Immediate'),
            ('daily', 'Daily Digest'),
            ('weekly', 'Weekly Digest'),
            ('never', 'Never'),
        ],
        default='immediate'
    )
    
    # Quiet hours
    quiet_hours_start = models.TimeField(null=True, blank=True)
    quiet_hours_end = models.TimeField(null=True, blank=True)
    quiet_hours_enabled = models.BooleanField(default=False)
    
    # Language
    preferred_language = models.CharField(
        max_length=10,
        choices=[
            ('en', 'English'),
            ('pt', 'Português'),
            ('es', 'Español'),
            ('fr', 'Français'),
            ('de', 'Deutsch'),
        ],
        default='en'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('notification preference')
        verbose_name_plural = _('notification preferences')
        db_table = 'notification_preferences'
    
    def __str__(self):
        return f"Preferences for {self.user.email}"

class PushToken(models.Model):
    """
    Push notification tokens for mobile devices
    """
    DEVICE_TYPES = [
        ('ios', 'iOS'),
        ('android', 'Android'),
        ('web', 'Web'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='push_tokens')
    token = models.CharField(max_length=500, unique=True)
    device_type = models.CharField(max_length=20, choices=DEVICE_TYPES)
    device_id = models.CharField(max_length=100, blank=True)
    
    # Device info
    app_version = models.CharField(max_length=20, blank=True)
    os_version = models.CharField(max_length=20, blank=True)
    device_model = models.CharField(max_length=100, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    last_used = models.DateTimeField(auto_now=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('push token')
        verbose_name_plural = _('push tokens')
        db_table = 'push_tokens'
        indexes = [
            models.Index(fields=['user', 'is_active']),
            models.Index(fields=['device_type']),
        ]
    
    def __str__(self):
        return f"{self.device_type} token for {self.user.email}"

class NotificationCampaign(models.Model):
    """
    Campaign-based notifications
    """
    CAMPAIGN_TYPES = [
        ('welcome', 'Welcome Series'),
        ('onboarding', 'Onboarding'),
        ('engagement', 'Engagement'),
        ('retention', 'Retention'),
        ('conversion', 'Conversion'),
        ('announcement', 'Announcement'),
        ('promotion', 'Promotion'),
    ]
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('scheduled', 'Scheduled'),
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    campaign_name = models.CharField(max_length=100)
    campaign_type = models.CharField(max_length=20, choices=CAMPAIGN_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Content
    subject = models.CharField(max_length=200)
    subject_pt = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    message_pt = models.TextField(blank=True)
    
    # Targeting
    target_segment = models.CharField(max_length=100, blank=True)
    target_criteria = models.JSONField(default=dict, blank=True)
    
    # Scheduling
    scheduled_at = models.DateTimeField(null=True, blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    
    # Delivery settings
    send_email = models.BooleanField(default=True)
    send_push = models.BooleanField(default=True)
    send_sms = models.BooleanField(default=False)
    
    # Metrics
    total_recipients = models.IntegerField(default=0)
    sent_count = models.IntegerField(default=0)
    opened_count = models.IntegerField(default=0)
    clicked_count = models.IntegerField(default=0)
    unsubscribed_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('notification campaign')
        verbose_name_plural = _('notification campaigns')
        db_table = 'notification_campaigns'
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['campaign_type']),
            models.Index(fields=['scheduled_at']),
        ]
    
    def __str__(self):
        return f"{self.campaign_name} - {self.status}" 