from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

User = get_user_model()

class Achievement(models.Model):
    """
    Achievement system for user engagement
    """
    ACHIEVEMENT_TYPES = [
        ('course_completion', 'Course Completion'),
        ('lesson_streak', 'Lesson Streak'),
        ('exercise_mastery', 'Exercise Mastery'),
        ('certificate_earned', 'Certificate Earned'),
        ('social_sharing', 'Social Sharing'),
        ('community_help', 'Community Help'),
        ('perfect_score', 'Perfect Score'),
        ('speed_learner', 'Speed Learner'),
        ('night_owl', 'Night Owl'),
        ('early_bird', 'Early Bird'),
        ('weekend_warrior', 'Weekend Warrior'),
        ('first_course', 'First Course'),
        ('tenth_course', 'Tenth Course'),
        ('hundredth_lesson', 'Hundredth Lesson'),
        ('thousandth_exercise', 'Thousandth Exercise'),
        ('referral_master', 'Referral Master'),
        ('review_writer', 'Review Writer'),
        ('helpful_commenter', 'Helpful Commenter'),
        ('profile_complete', 'Profile Complete'),
        ('avatar_upload', 'Avatar Upload'),
    ]
    
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
        ('epic', 'Epic'),
        ('legendary', 'Legendary'),
    ]
    
    # Basic information
    achievement_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100)
    name_pt = models.CharField(max_length=100, blank=True, help_text="Portuguese name")
    description = models.TextField()
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    
    # Achievement details
    achievement_type = models.CharField(max_length=50, choices=ACHIEVEMENT_TYPES)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='easy')
    points = models.IntegerField(default=10, validators=[MinValueValidator(1), MaxValueValidator(1000)])
    
    # Requirements
    requirements = models.JSONField(default=dict, help_text="Achievement requirements")
    requirement_count = models.IntegerField(default=1, help_text="Number of times requirement must be met")
    
    # Visual elements
    icon = models.CharField(max_length=50, blank=True)
    badge_image = models.ImageField(upload_to='achievements/badges/', null=True, blank=True)
    color = models.CharField(max_length=7, default="#007bff")
    
    # Settings
    is_active = models.BooleanField(default=True)
    is_hidden = models.BooleanField(default=False, help_text="Hidden until unlocked")
    is_repeatable = models.BooleanField(default=False, help_text="Can be earned multiple times")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('achievement')
        verbose_name_plural = _('achievements')
        db_table = 'achievements'
        indexes = [
            models.Index(fields=['achievement_type']),
            models.Index(fields=['difficulty']),
            models.Index(fields=['is_active']),
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

class UserAchievement(models.Model):
    """
    User's earned achievements
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE, related_name='user_achievements')
    
    # Achievement progress
    progress = models.IntegerField(default=0, help_text="Current progress towards achievement")
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    earned_count = models.IntegerField(default=1, help_text="Number of times earned")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('user achievement')
        verbose_name_plural = _('user achievements')
        db_table = 'user_achievements'
        unique_together = ['user', 'achievement']
        indexes = [
            models.Index(fields=['user', 'is_completed']),
            models.Index(fields=['achievement', 'is_completed']),
            models.Index(fields=['completed_at']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.achievement.name}"
    
    @property
    def progress_percentage(self):
        """Get progress percentage"""
        if self.achievement.requirement_count > 0:
            return min(100, (self.progress / self.achievement.requirement_count) * 100)
        return 0
    
    def update_progress(self, increment=1):
        """Update achievement progress"""
        from django.utils import timezone
        
        self.progress += increment
        self.updated_at = timezone.now()
        
        # Check if achievement is completed
        if self.progress >= self.achievement.requirement_count and not self.is_completed:
            self.is_completed = True
            self.completed_at = timezone.now()
            
            # Award points to user
            self.user.progress.experience_points += self.achievement.points
            self.user.progress.save(update_fields=['experience_points'])
        
        self.save()

class Level(models.Model):
    """
    User levels and experience system
    """
    level_number = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    name_pt = models.CharField(max_length=100, blank=True, help_text="Portuguese name")
    
    # Experience requirements
    experience_required = models.IntegerField(help_text="Experience points required for this level")
    
    # Rewards
    points_reward = models.IntegerField(default=0, help_text="Points awarded when reaching this level")
    badge_reward = models.CharField(max_length=50, blank=True)
    
    # Visual elements
    icon = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=7, default="#007bff")
    
    # Settings
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('level')
        verbose_name_plural = _('levels')
        db_table = 'levels'
        ordering = ['level_number']
    
    def __str__(self):
        return f"Level {self.level_number}: {self.name}"
    
    def get_name(self, language='en'):
        """Get localized name"""
        if language == 'pt' and self.name_pt:
            return self.name_pt
        return self.name

class Streak(models.Model):
    """
    User learning streaks
    """
    STREAK_TYPES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='streaks')
    streak_type = models.CharField(max_length=20, choices=STREAK_TYPES, default='daily')
    
    # Streak data
    current_streak = models.IntegerField(default=0)
    longest_streak = models.IntegerField(default=0)
    last_activity_date = models.DateField(null=True, blank=True)
    
    # Milestones
    milestone_7_days = models.BooleanField(default=False)
    milestone_30_days = models.BooleanField(default=False)
    milestone_100_days = models.BooleanField(default=False)
    milestone_365_days = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('streak')
        verbose_name_plural = _('streaks')
        db_table = 'streaks'
        unique_together = ['user', 'streak_type']
        indexes = [
            models.Index(fields=['user', 'streak_type']),
            models.Index(fields=['current_streak']),
            models.Index(fields=['last_activity_date']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.streak_type} streak: {self.current_streak}"
    
    def update_streak(self, activity_date):
        """Update user streak"""
        from datetime import timedelta
        
        if not self.last_activity_date:
            self.current_streak = 1
        else:
            days_diff = (activity_date - self.last_activity_date).days
            
            if days_diff == 1:
                # Consecutive day
                self.current_streak += 1
            elif days_diff == 0:
                # Same day, no change
                pass
            else:
                # Streak broken
                self.current_streak = 1
        
        # Update longest streak
        if self.current_streak > self.longest_streak:
            self.longest_streak = self.current_streak
        
        # Check milestones
        if self.current_streak >= 7 and not self.milestone_7_days:
            self.milestone_7_days = True
        if self.current_streak >= 30 and not self.milestone_30_days:
            self.milestone_30_days = True
        if self.current_streak >= 100 and not self.milestone_100_days:
            self.milestone_100_days = True
        if self.current_streak >= 365 and not self.milestone_365_days:
            self.milestone_365_days = True
        
        self.last_activity_date = activity_date
        self.save()

class Challenge(models.Model):
    """
    Time-limited challenges for user engagement
    """
    CHALLENGE_TYPES = [
        ('course_completion', 'Course Completion'),
        ('lesson_streak', 'Lesson Streak'),
        ('exercise_mastery', 'Exercise Mastery'),
        ('social_engagement', 'Social Engagement'),
        ('referral', 'Referral'),
        ('review', 'Review'),
        ('profile_completion', 'Profile Completion'),
    ]
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
        ('expired', 'Expired'),
    ]
    
    # Basic information
    challenge_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100)
    name_pt = models.CharField(max_length=100, blank=True, help_text="Portuguese name")
    description = models.TextField()
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    
    # Challenge details
    challenge_type = models.CharField(max_length=50, choices=CHALLENGE_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Requirements
    requirements = models.JSONField(default=dict, help_text="Challenge requirements")
    target_value = models.IntegerField(default=1, help_text="Target value to complete challenge")
    
    # Timing
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_recurring = models.BooleanField(default=False, help_text="Recurring challenge")
    recurrence_pattern = models.CharField(max_length=50, blank=True, help_text="Cron-like pattern for recurrence")
    
    # Rewards
    points_reward = models.IntegerField(default=0)
    badge_reward = models.CharField(max_length=50, blank=True)
    certificate_reward = models.BooleanField(default=False)
    
    # Visual elements
    icon = models.CharField(max_length=50, blank=True)
    banner_image = models.ImageField(upload_to='challenges/banners/', null=True, blank=True)
    color = models.CharField(max_length=7, default="#007bff")
    
    # Settings
    is_featured = models.BooleanField(default=False)
    max_participants = models.IntegerField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('challenge')
        verbose_name_plural = _('challenges')
        db_table = 'challenges'
        indexes = [
            models.Index(fields=['challenge_type']),
            models.Index(fields=['status']),
            models.Index(fields=['start_date', 'end_date']),
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
    
    @property
    def is_active(self):
        """Check if challenge is currently active"""
        from django.utils import timezone
        now = timezone.now()
        return self.status == 'active' and self.start_date <= now <= self.end_date
    
    @property
    def days_remaining(self):
        """Get days remaining in challenge"""
        from django.utils import timezone
        if not self.is_active:
            return 0
        delta = self.end_date - timezone.now()
        return max(0, delta.days)

class UserChallenge(models.Model):
    """
    User's participation in challenges
    """
    STATUS_CHOICES = [
        ('joined', 'Joined'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_challenges')
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, related_name='user_challenges')
    
    # Progress
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='joined')
    progress = models.IntegerField(default=0)
    progress_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    # Rewards
    points_earned = models.IntegerField(default=0)
    badge_earned = models.CharField(max_length=50, blank=True)
    certificate_earned = models.BooleanField(default=False)
    
    # Timestamps
    joined_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('user challenge')
        verbose_name_plural = _('user challenges')
        db_table = 'user_challenges'
        unique_together = ['user', 'challenge']
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['challenge', 'status']),
            models.Index(fields=['joined_at']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.challenge.name}"
    
    def update_progress(self, increment=1):
        """Update challenge progress"""
        from django.utils import timezone
        
        self.progress += increment
        self.progress_percentage = min(100, (self.progress / self.challenge.target_value) * 100)
        
        # Check if challenge is completed
        if self.progress >= self.challenge.target_value and self.status != 'completed':
            self.status = 'completed'
            self.completed_at = timezone.now()
            
            # Award rewards
            self.points_earned = self.challenge.points_reward
            self.badge_earned = self.challenge.badge_reward
            self.certificate_earned = self.challenge.certificate_reward
            
            # Add points to user
            self.user.progress.experience_points += self.points_earned
            self.user.progress.save(update_fields=['experience_points'])
        
        self.save()

class Leaderboard(models.Model):
    """
    Leaderboards for competition
    """
    LEADERBOARD_TYPES = [
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('all_time', 'All Time'),
        ('course', 'Course'),
        ('achievement', 'Achievement'),
        ('streak', 'Streak'),
    ]
    
    name = models.CharField(max_length=100)
    leaderboard_type = models.CharField(max_length=20, choices=LEADERBOARD_TYPES)
    
    # Settings
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    max_entries = models.IntegerField(default=100)
    
    # Timing
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    
    # Metadata
    description = models.TextField(blank=True)
    rules = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('leaderboard')
        verbose_name_plural = _('leaderboards')
        db_table = 'leaderboards'
        indexes = [
            models.Index(fields=['leaderboard_type']),
            models.Index(fields=['is_active']),
            models.Index(fields=['start_date', 'end_date']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.leaderboard_type}"
    
    def get_top_players(self, limit=10):
        """Get top players for this leaderboard"""
        # This would implement the logic to get top players
        # based on the leaderboard type and rules
        pass

class LeaderboardEntry(models.Model):
    """
    Individual entries in leaderboards
    """
    leaderboard = models.ForeignKey(Leaderboard, on_delete=models.CASCADE, related_name='entries')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    
    # Score and ranking
    score = models.IntegerField(default=0)
    rank = models.IntegerField(null=True, blank=True)
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('leaderboard entry')
        verbose_name_plural = _('leaderboard entries')
        db_table = 'leaderboard_entries'
        unique_together = ['leaderboard', 'user']
        indexes = [
            models.Index(fields=['leaderboard', 'rank']),
            models.Index(fields=['user', 'score']),
        ]
        ordering = ['-score', 'created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.leaderboard.name} (Rank {self.rank})" 