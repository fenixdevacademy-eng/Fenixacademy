from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import uuid

User = get_user_model()

class AnalyticsEvent(models.Model):
    """
    Track user events for analytics
    """
    EVENT_TYPES = [
        ('page_view', 'Page View'),
        ('course_view', 'Course View'),
        ('course_enroll', 'Course Enrollment'),
        ('lesson_start', 'Lesson Start'),
        ('lesson_complete', 'Lesson Complete'),
        ('exercise_start', 'Exercise Start'),
        ('exercise_complete', 'Exercise Complete'),
        ('quiz_start', 'Quiz Start'),
        ('quiz_complete', 'Quiz Complete'),
        ('certificate_earned', 'Certificate Earned'),
        ('payment_start', 'Payment Start'),
        ('payment_complete', 'Payment Complete'),
        ('search', 'Search'),
        ('download', 'Download'),
        ('share', 'Share'),
        ('rating', 'Rating'),
        ('review', 'Review'),
        ('support_request', 'Support Request'),
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('registration', 'Registration'),
        ('email_open', 'Email Open'),
        ('email_click', 'Email Click'),
        ('push_notification', 'Push Notification'),
    ]
    
    event_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    session_id = models.CharField(max_length=100, blank=True)
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES)
    event_data = models.JSONField(default=dict, blank=True)
    
    # Page/Content information
    page_url = models.URLField(blank=True)
    page_title = models.CharField(max_length=200, blank=True)
    referrer = models.URLField(blank=True)
    
    # User context
    user_agent = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    country = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    device_type = models.CharField(max_length=20, blank=True)
    browser = models.CharField(max_length=50, blank=True)
    os = models.CharField(max_length=50, blank=True)
    
    # Timestamp
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('analytics event')
        verbose_name_plural = _('analytics events')
        db_table = 'analytics_events'
        indexes = [
            models.Index(fields=['event_type']),
            models.Index(fields=['user', 'timestamp']),
            models.Index(fields=['session_id']),
            models.Index(fields=['timestamp']),
        ]
    
    def __str__(self):
        return f"{self.event_type} - {self.user or 'Anonymous'} - {self.timestamp}"

class UserJourney(models.Model):
    """
    Track user journey through the platform
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session_id = models.CharField(max_length=100)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    duration_seconds = models.IntegerField(null=True, blank=True)
    
    # Journey data
    pages_visited = models.JSONField(default=list, blank=True)
    actions_taken = models.JSONField(default=list, blank=True)
    conversion_goal = models.CharField(max_length=50, blank=True)
    conversion_achieved = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _('user journey')
        verbose_name_plural = _('user journeys')
        db_table = 'user_journeys'
        indexes = [
            models.Index(fields=['user', 'start_time']),
            models.Index(fields=['session_id']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.start_time}"

class ConversionFunnel(models.Model):
    """
    Track conversion funnels
    """
    FUNNEL_TYPES = [
        ('course_enrollment', 'Course Enrollment'),
        ('payment', 'Payment'),
        ('certificate', 'Certificate'),
        ('subscription', 'Subscription'),
        ('referral', 'Referral'),
    ]
    
    funnel_name = models.CharField(max_length=100)
    funnel_type = models.CharField(max_length=50, choices=FUNNEL_TYPES)
    steps = models.JSONField(default=list)
    conversion_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    # Tracking
    total_entries = models.IntegerField(default=0)
    total_conversions = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('conversion funnel')
        verbose_name_plural = _('conversion funnels')
        db_table = 'conversion_funnels'
    
    def __str__(self):
        return f"{self.funnel_name} - {self.conversion_rate}%"

class CohortAnalysis(models.Model):
    """
    Cohort analysis for user retention
    """
    cohort_date = models.DateField()
    cohort_size = models.IntegerField()
    retention_data = models.JSONField(default=dict)
    
    # Retention periods
    day_1_retention = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    day_7_retention = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    day_30_retention = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    day_90_retention = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('cohort analysis')
        verbose_name_plural = _('cohort analyses')
        db_table = 'cohort_analyses'
        indexes = [
            models.Index(fields=['cohort_date']),
        ]
    
    def __str__(self):
        return f"Cohort {self.cohort_date} - {self.cohort_size} users"

class ABTest(models.Model):
    """
    A/B testing framework
    """
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
    ]
    
    test_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Test configuration
    variant_a = models.JSONField(default=dict)
    variant_b = models.JSONField(default=dict)
    traffic_split = models.DecimalField(max_digits=3, decimal_places=2, default=0.5)
    
    # Metrics
    primary_metric = models.CharField(max_length=100)
    secondary_metrics = models.JSONField(default=list, blank=True)
    
    # Results
    variant_a_conversions = models.IntegerField(default=0)
    variant_b_conversions = models.IntegerField(default=0)
    variant_a_traffic = models.IntegerField(default=0)
    variant_b_traffic = models.IntegerField(default=0)
    
    # Timing
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('AB test')
        verbose_name_plural = _('AB tests')
        db_table = 'ab_tests'
    
    def __str__(self):
        return f"{self.test_name} - {self.status}"

class UserSegment(models.Model):
    """
    User segmentation for targeted marketing
    """
    segment_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    # Segment criteria
    criteria = models.JSONField(default=dict)
    user_count = models.IntegerField(default=0)
    
    # Performance metrics
    conversion_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    average_order_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    lifetime_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('user segment')
        verbose_name_plural = _('user segments')
        db_table = 'user_segments'
    
    def __str__(self):
        return f"{self.segment_name} - {self.user_count} users"

class PerformanceMetrics(models.Model):
    """
    System performance metrics
    """
    metric_name = models.CharField(max_length=100)
    metric_value = models.FloatField()
    metric_unit = models.CharField(max_length=20, blank=True)
    
    # Context
    timestamp = models.DateTimeField(auto_now_add=True)
    service = models.CharField(max_length=50, blank=True)
    endpoint = models.CharField(max_length=200, blank=True)
    
    # Additional data
    metadata = models.JSONField(default=dict, blank=True)
    
    class Meta:
        verbose_name = _('performance metric')
        verbose_name_plural = _('performance metrics')
        db_table = 'performance_metrics'
        indexes = [
            models.Index(fields=['metric_name', 'timestamp']),
            models.Index(fields=['service', 'timestamp']),
        ]
    
    def __str__(self):
        return f"{self.metric_name}: {self.metric_value} {self.metric_unit}"

class RevenueMetrics(models.Model):
    """
    Revenue and financial metrics
    """
    date = models.DateField()
    
    # Revenue metrics
    total_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    subscription_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    course_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    refunds = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    # Transaction metrics
    total_transactions = models.IntegerField(default=0)
    successful_transactions = models.IntegerField(default=0)
    failed_transactions = models.IntegerField(default=0)
    
    # Customer metrics
    new_customers = models.IntegerField(default=0)
    returning_customers = models.IntegerField(default=0)
    churned_customers = models.IntegerField(default=0)
    
    # Conversion metrics
    conversion_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    average_order_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('revenue metric')
        verbose_name_plural = _('revenue metrics')
        db_table = 'revenue_metrics'
        indexes = [
            models.Index(fields=['date']),
        ]
        unique_together = ['date']
    
    def __str__(self):
        return f"{self.date} - ${self.total_revenue}"

class LearningAnalytics(models.Model):
    """
    Learning-specific analytics
    """
    date = models.DateField()
    
    # Course metrics
    total_courses = models.IntegerField(default=0)
    active_courses = models.IntegerField(default=0)
    completed_courses = models.IntegerField(default=0)
    
    # Lesson metrics
    total_lessons = models.IntegerField(default=0)
    completed_lessons = models.IntegerField(default=0)
    average_lesson_duration = models.IntegerField(default=0)  # in minutes
    
    # Exercise metrics
    total_exercises = models.IntegerField(default=0)
    completed_exercises = models.IntegerField(default=0)
    average_exercise_score = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    # Certificate metrics
    certificates_issued = models.IntegerField(default=0)
    certificate_completion_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    # Engagement metrics
    average_session_duration = models.IntegerField(default=0)  # in minutes
    daily_active_users = models.IntegerField(default=0)
    weekly_active_users = models.IntegerField(default=0)
    monthly_active_users = models.IntegerField(default=0)
    
    # Learning paths
    learning_paths_started = models.IntegerField(default=0)
    learning_paths_completed = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('learning analytics')
        verbose_name_plural = _('learning analytics')
        db_table = 'learning_analytics'
        indexes = [
            models.Index(fields=['date']),
        ]
        unique_together = ['date']
    
    def __str__(self):
        return f"{self.date} - {self.daily_active_users} DAU" 