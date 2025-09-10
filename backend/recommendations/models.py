from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import uuid

User = get_user_model()

class UserPreference(models.Model):
    """
    User preferences for recommendation system
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferences')
    
    # Learning preferences
    preferred_topics = models.JSONField(default=list, help_text="List of preferred topics")
    preferred_difficulty = models.CharField(max_length=20, default='beginner')
    preferred_duration = models.IntegerField(default=30, help_text="Preferred lesson duration in minutes")
    preferred_format = models.JSONField(default=list, help_text="Preferred content formats")
    
    # Time preferences
    preferred_study_time = models.TimeField(null=True, blank=True)
    preferred_study_days = models.JSONField(default=list, help_text="Preferred days of week")
    timezone = models.CharField(max_length=50, default='UTC')
    
    # Learning style
    learning_style = models.CharField(
        max_length=20,
        choices=[
            ('visual', 'Visual'),
            ('auditory', 'Auditory'),
            ('kinesthetic', 'Kinesthetic'),
            ('reading', 'Reading/Writing'),
        ],
        default='visual'
    )
    
    # Goals and interests
    career_goals = models.JSONField(default=list, help_text="Career goals")
    skill_gaps = models.JSONField(default=list, help_text="Identified skill gaps")
    interests = models.JSONField(default=list, help_text="User interests")
    
    # Engagement preferences
    notification_frequency = models.CharField(
        max_length=20,
        choices=[
            ('immediate', 'Immediate'),
            ('daily', 'Daily'),
            ('weekly', 'Weekly'),
            ('never', 'Never'),
        ],
        default='daily'
    )
    
    # Metadata
    last_updated = models.DateTimeField(auto_now=True)
    confidence_score = models.DecimalField(max_digits=3, decimal_places=2, default=0.5)
    
    class Meta:
        verbose_name = _('user preference')
        verbose_name_plural = _('user preferences')
        db_table = 'user_preferences'
    
    def __str__(self):
        return f"Preferences for {self.user.email}"

class UserBehavior(models.Model):
    """
    Track user behavior for recommendation system
    """
    BEHAVIOR_TYPES = [
        ('view', 'View'),
        ('click', 'Click'),
        ('enroll', 'Enroll'),
        ('complete', 'Complete'),
        ('rate', 'Rate'),
        ('review', 'Review'),
        ('share', 'Share'),
        ('bookmark', 'Bookmark'),
        ('search', 'Search'),
        ('pause', 'Pause'),
        ('resume', 'Resume'),
        ('skip', 'Skip'),
        ('replay', 'Replay'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='behaviors')
    behavior_type = models.CharField(max_length=20, choices=BEHAVIOR_TYPES)
    
    # Content reference
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    # Behavior details
    duration = models.IntegerField(null=True, blank=True, help_text="Duration in seconds")
    progress = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    
    # Context
    session_id = models.CharField(max_length=100, blank=True)
    device_type = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('user behavior')
        verbose_name_plural = _('user behaviors')
        db_table = 'user_behaviors'
        indexes = [
            models.Index(fields=['user', 'behavior_type']),
            models.Index(fields=['content_type', 'object_id']),
            models.Index(fields=['timestamp']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.behavior_type} - {self.timestamp}"

class Recommendation(models.Model):
    """
    Generated recommendations for users
    """
    RECOMMENDATION_TYPES = [
        ('course', 'Course'),
        ('lesson', 'Lesson'),
        ('exercise', 'Exercise'),
        ('path', 'Learning Path'),
        ('achievement', 'Achievement'),
        ('challenge', 'Challenge'),
        ('peer', 'Peer'),
        ('resource', 'Resource'),
    ]
    
    ALGORITHM_CHOICES = [
        ('collaborative', 'Collaborative Filtering'),
        ('content_based', 'Content-Based'),
        ('hybrid', 'Hybrid'),
        ('popularity', 'Popularity-Based'),
        ('recent', 'Recently Added'),
        ('trending', 'Trending'),
        ('personalized', 'Personalized'),
    ]
    
    # Basic information
    recommendation_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recommendations')
    
    # Recommendation details
    recommendation_type = models.CharField(max_length=20, choices=RECOMMENDATION_TYPES)
    algorithm = models.CharField(max_length=20, choices=ALGORITHM_CHOICES)
    
    # Content reference
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    # Scoring
    score = models.DecimalField(max_digits=5, decimal_places=4, help_text="Recommendation score (0-1)")
    confidence = models.DecimalField(max_digits=3, decimal_places=2, help_text="Confidence in recommendation")
    
    # User interaction
    is_clicked = models.BooleanField(default=False)
    is_enrolled = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    is_dismissed = models.BooleanField(default=False)
    
    # Timing
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    clicked_at = models.DateTimeField(null=True, blank=True)
    
    # Metadata
    reason = models.CharField(max_length=200, blank=True, help_text="Why this was recommended")
    metadata = models.JSONField(default=dict, blank=True)
    
    class Meta:
        verbose_name = _('recommendation')
        verbose_name_plural = _('recommendations')
        db_table = 'recommendations'
        indexes = [
            models.Index(fields=['user', 'recommendation_type']),
            models.Index(fields=['algorithm']),
            models.Index(fields=['score']),
            models.Index(fields=['created_at']),
        ]
        ordering = ['-score', '-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.recommendation_type} - {self.score}"

class LearningPath(models.Model):
    """
    Personalized learning paths
    """
    PATH_TYPES = [
        ('career', 'Career Path'),
        ('skill', 'Skill Path'),
        ('project', 'Project Path'),
        ('certification', 'Certification Path'),
        ('custom', 'Custom Path'),
    ]
    
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('expert', 'Expert'),
    ]
    
    # Basic information
    path_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200)
    name_pt = models.CharField(max_length=200, blank=True, help_text="Portuguese name")
    description = models.TextField()
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    
    # Path details
    path_type = models.CharField(max_length=20, choices=PATH_TYPES)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='beginner')
    estimated_duration = models.IntegerField(help_text="Estimated duration in hours")
    
    # Content
    courses = models.ManyToManyField('courses.Course', through='LearningPathCourse')
    prerequisites = models.JSONField(default=list, help_text="Prerequisites for this path")
    outcomes = models.JSONField(default=list, help_text="Learning outcomes")
    
    # Settings
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    is_premium = models.BooleanField(default=False)
    
    # Visual elements
    icon = models.CharField(max_length=50, blank=True)
    banner_image = models.ImageField(upload_to='learning_paths/banners/', null=True, blank=True)
    color = models.CharField(max_length=7, default="#007bff")
    
    # Metadata
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('learning path')
        verbose_name_plural = _('learning paths')
        db_table = 'learning_paths'
        indexes = [
            models.Index(fields=['path_type']),
            models.Index(fields=['difficulty']),
            models.Index(fields=['is_active']),
            models.Index(fields=['is_featured']),
        ]
    
    def __str__(self):
        return self.name
    
    def get_name(self, language='en'):
        """Get localized name"""
        if language == 'pt' and self.name_pt:
            return self.name_pt
        return self.name
    
    def get_description(self, language='en'):
        """Get localized description"""
        if language == 'pt' and self.description_pt:
            return self.description_pt
        return self.description

class LearningPathCourse(models.Model):
    """
    Courses within learning paths
    """
    learning_path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, related_name='path_courses')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='learning_paths')
    
    # Order and requirements
    order = models.IntegerField(default=0)
    is_required = models.BooleanField(default=True)
    is_prerequisite = models.BooleanField(default=False)
    
    # Progress tracking
    estimated_duration = models.IntegerField(help_text="Estimated duration in hours")
    
    class Meta:
        verbose_name = _('learning path course')
        verbose_name_plural = _('learning path courses')
        db_table = 'learning_path_courses'
        unique_together = ['learning_path', 'course']
        ordering = ['order']
    
    def __str__(self):
        return f"{self.learning_path.name} - {self.course.title}"

class UserLearningPath(models.Model):
    """
    User's progress in learning paths
    """
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('paused', 'Paused'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_learning_paths')
    learning_path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, related_name='user_paths')
    
    # Progress
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    progress_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    completed_courses = models.ManyToManyField('courses.Course', blank=True)
    
    # Timing
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    last_accessed = models.DateTimeField(auto_now=True)
    
    # Metadata
    notes = models.TextField(blank=True)
    goals = models.JSONField(default=list, blank=True)
    
    class Meta:
        verbose_name = _('user learning path')
        verbose_name_plural = _('user learning paths')
        db_table = 'user_learning_paths'
        unique_together = ['user', 'learning_path']
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['learning_path', 'status']),
            models.Index(fields=['progress_percentage']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.learning_path.name}"

class SkillGap(models.Model):
    """
    Identified skill gaps for users
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skill_gaps')
    
    # Skill information
    skill_name = models.CharField(max_length=100)
    skill_category = models.CharField(max_length=50)
    current_level = models.CharField(max_length=20, default='beginner')
    target_level = models.CharField(max_length=20, default='intermediate')
    
    # Gap analysis
    gap_score = models.DecimalField(max_digits=3, decimal_places=2, help_text="Gap severity (0-1)")
    priority = models.CharField(
        max_length=20,
        choices=[
            ('low', 'Low'),
            ('medium', 'Medium'),
            ('high', 'High'),
            ('critical', 'Critical'),
        ],
        default='medium'
    )
    
    # Recommendations
    recommended_courses = models.ManyToManyField('courses.Course', blank=True)
    recommended_resources = models.JSONField(default=list, blank=True)
    
    # Metadata
    identified_at = models.DateTimeField(auto_now_add=True)
    last_assessed = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('skill gap')
        verbose_name_plural = _('skill gaps')
        db_table = 'skill_gaps'
        indexes = [
            models.Index(fields=['user', 'priority']),
            models.Index(fields=['skill_category']),
            models.Index(fields=['gap_score']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.skill_name} gap"

class AIRecommendationEngine(models.Model):
    """
    Configuration for AI recommendation engines
    """
    ENGINE_TYPES = [
        ('collaborative', 'Collaborative Filtering'),
        ('content_based', 'Content-Based'),
        ('hybrid', 'Hybrid'),
        ('deep_learning', 'Deep Learning'),
        ('reinforcement', 'Reinforcement Learning'),
    ]
    
    name = models.CharField(max_length=100)
    engine_type = models.CharField(max_length=20, choices=ENGINE_TYPES)
    
    # Configuration
    parameters = models.JSONField(default=dict, help_text="Engine parameters")
    is_active = models.BooleanField(default=True)
    
    # Performance metrics
    accuracy_score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    precision_score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    recall_score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    
    # Metadata
    description = models.TextField(blank=True)
    version = models.CharField(max_length=20, default='1.0.0')
    last_trained = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('AI recommendation engine')
        verbose_name_plural = _('AI recommendation engines')
        db_table = 'ai_recommendation_engines'
    
    def __str__(self):
        return f"{self.name} - {self.engine_type}" 