from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
# from courses.models import Course, Lesson, Exercise, Module  # Removido para evitar ciclo de importação
import uuid

User = get_user_model()

class UserProgress(models.Model):
    """
    Overall user progress tracking
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='progress')
    
    # Overall statistics
    total_courses_enrolled = models.IntegerField(default=0)
    total_courses_completed = models.IntegerField(default=0)
    total_lessons_completed = models.IntegerField(default=0)
    total_exercises_completed = models.IntegerField(default=0)
    total_study_hours = models.IntegerField(default=0)
    total_points_earned = models.IntegerField(default=0)
    
    # Current streak
    current_streak_days = models.IntegerField(default=0)
    longest_streak_days = models.IntegerField(default=0)
    last_study_date = models.DateTimeField(null=True, blank=True)
    
    # Learning level
    current_level = models.IntegerField(default=1)
    experience_points = models.IntegerField(default=0)
    experience_to_next_level = models.IntegerField(default=100)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('user progress')
        verbose_name_plural = _('user progress')
        db_table = 'user_progress'
    
    def __str__(self):
        return f"Progress for {self.user.email}"
    
    @property
    def completion_rate(self):
        """Calculate overall completion rate"""
        if self.total_courses_enrolled == 0:
            return 0
        return (self.total_courses_completed / self.total_courses_enrolled) * 100
    
    @property
    def level_progress(self):
        """Calculate progress to next level"""
        return (self.experience_points / self.experience_to_next_level) * 100
    
    def add_experience(self, points):
        """Add experience points and check for level up"""
        self.experience_points += points
        
        # Check for level up
        while self.experience_points >= self.experience_to_next_level:
            self.experience_points -= self.experience_to_next_level
            self.current_level += 1
            self.experience_to_next_level = self.current_level * 100
        
        self.save()
    
    def update_streak(self):
        """Update study streak"""
        from django.utils import timezone
        from datetime import timedelta
        
        today = timezone.now().date()
        
        if self.last_study_date:
            last_study = self.last_study_date.date()
            if today - last_study == timedelta(days=1):
                # Consecutive day
                self.current_streak_days += 1
            elif today - last_study > timedelta(days=1):
                # Streak broken
                self.current_streak_days = 1
            # If same day, don't change streak
        else:
            # First study session
            self.current_streak_days = 1
        
        # Update longest streak
        if self.current_streak_days > self.longest_streak_days:
            self.longest_streak_days = self.current_streak_days
        
        self.last_study_date = timezone.now()
        self.save()


class CourseProgress(models.Model):
    """
    Progress tracking for individual courses
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_progress')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='user_progress')
    
    # Progress tracking
    progress_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    completed_modules = models.ManyToManyField('courses.Module', blank=True, related_name='completed_by')
    completed_lessons = models.ManyToManyField('courses.Lesson', blank=True, related_name='completed_by_progress')
    completed_exercises = models.ManyToManyField('courses.Exercise', blank=True, related_name='completed_by_progress')
    
    # Time tracking
    total_time_spent = models.IntegerField(default=0, help_text="Total time spent in minutes")
    last_accessed = models.DateTimeField(auto_now=True)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    # Performance
    average_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    total_points_earned = models.IntegerField(default=0)
    total_attempts = models.IntegerField(default=0)
    
    # Status
    is_active = models.BooleanField(default=True)
    is_completed = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _('course progress')
        verbose_name_plural = _('course progress')
        unique_together = ['user', 'course']
        db_table = 'course_progress'
        indexes = [
            models.Index(fields=['user', 'is_active']),
            models.Index(fields=['course', 'is_completed']),
            models.Index(fields=['progress_percentage']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.course.title} ({self.progress_percentage}%)"
    
    def calculate_progress(self):
        """Calculate progress percentage"""
        total_modules = self.course.modules.count()
        total_lessons = self.course.lessons.count()
        total_exercises = self.course.exercises.count()
        
        if total_modules == 0 and total_lessons == 0 and total_exercises == 0:
            return 0
        
        completed_modules = self.completed_modules.count()
        completed_lessons = self.completed_lessons.count()
        completed_exercises = self.completed_exercises.count()
        
        total_items = total_modules + total_lessons + total_exercises
        completed_items = completed_modules + completed_lessons + completed_exercises
        
        progress = (completed_items / total_items) * 100 if total_items > 0 else 0
        self.progress_percentage = round(progress, 2)
        
        # Check if course is completed
        if self.progress_percentage >= 100:
            self.is_completed = True
            if not self.completed_at:
                from django.utils import timezone
                self.completed_at = timezone.now()
        
        self.save()
        return self.progress_percentage


class LessonProgress(models.Model):
    """
    Detailed progress tracking for individual lessons
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson = models.ForeignKey('courses.Lesson', on_delete=models.CASCADE, related_name='user_progress')
    
    # Progress tracking
    is_completed = models.BooleanField(default=False)
    completion_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    # Time tracking
    time_spent = models.IntegerField(default=0, help_text="Time spent in seconds")
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    last_accessed = models.DateTimeField(auto_now=True)
    
    # Video progress (for video lessons)
    video_progress = models.IntegerField(default=0, help_text="Video progress in seconds")
    video_completed = models.BooleanField(default=False)
    
    # Quiz results (for quiz lessons)
    quiz_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    quiz_attempts = models.IntegerField(default=0)
    best_quiz_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    # Notes and bookmarks
    notes = models.TextField(blank=True)
    bookmarked = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _('lesson progress')
        verbose_name_plural = _('lesson progress')
        unique_together = ['user', 'lesson']
        db_table = 'lesson_progress'
        indexes = [
            models.Index(fields=['user', 'is_completed']),
            models.Index(fields=['lesson', 'is_completed']),
            models.Index(fields=['last_accessed']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.lesson.title}"
    
    def mark_as_completed(self):
        """Mark lesson as completed"""
        self.is_completed = True
        self.completion_percentage = 100
        self.completed_at = timezone.now()
        self.save()
    
    def update_video_progress(self, current_time, total_duration):
        """Update video progress"""
        self.video_progress = current_time
        
        # Calculate completion percentage
        if total_duration > 0:
            self.completion_percentage = (current_time / total_duration) * 100
            
            # Mark as completed if watched 90% or more
            if self.completion_percentage >= 90:
                self.video_completed = True
                if not self.is_completed:
                    self.mark_as_completed()
        
        self.save()


class ExerciseProgress(models.Model):
    """
    Progress tracking for exercises and coding challenges
    """
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='exercise_progress')
    exercise = models.ForeignKey('courses.Exercise', on_delete=models.CASCADE, related_name='user_progress')
    
    # Progress tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    attempts = models.IntegerField(default=0)
    max_attempts_reached = models.BooleanField(default=False)
    
    # Performance
    best_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    current_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    time_spent = models.IntegerField(default=0, help_text="Total time spent in seconds")
    
    # Code submissions
    submitted_code = models.TextField(blank=True)
    last_submission = models.DateTimeField(null=True, blank=True)
    
    # Test results
    test_results = models.JSONField(default=list, blank=True)
    passed_tests = models.IntegerField(default=0)
    total_tests = models.IntegerField(default=0)
    
    # Timestamps
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    last_accessed = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('exercise progress')
        verbose_name_plural = _('exercise progress')
        unique_together = ['user', 'exercise']
        db_table = 'exercise_progress'
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['exercise', 'status']),
            models.Index(fields=['best_score']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.exercise.title}"
    
    def submit_attempt(self, code, score, test_results):
        """Submit an attempt for the exercise"""
        from django.utils import timezone
        
        self.attempts += 1
        self.submitted_code = code
        self.current_score = score
        self.test_results = test_results
        self.last_submission = timezone.now()
        
        # Update best score
        if self.best_score is None or score > self.best_score:
            self.best_score = score
        
        # Check if max attempts reached
        if self.attempts >= self.exercise.max_attempts:
            self.max_attempts_reached = True
        
        # Update status
        if score >= 100:  # Perfect score
            self.status = 'completed'
            self.completed_at = timezone.now()
        elif score >= 70:  # Passing score
            self.status = 'completed'
            self.completed_at = timezone.now()
        elif self.max_attempts_reached:
            self.status = 'failed'
        else:
            self.status = 'in_progress'
        
        self.save()
    
    @property
    def success_rate(self):
        """Calculate success rate based on test results"""
        if self.total_tests == 0:
            return 0
        return (self.passed_tests / self.total_tests) * 100


class UserAchievement(models.Model):
    """
    User achievements and badges
    """
    ACHIEVEMENT_TYPE_CHOICES = [
        ('course_completion', 'Course Completion'),
        ('streak', 'Study Streak'),
        ('perfect_score', 'Perfect Score'),
        ('speed_learner', 'Speed Learner'),
        ('persistent', 'Persistent Learner'),
        ('helper', 'Community Helper'),
        ('innovator', 'Innovator'),
        ('leader', 'Leader'),
        ('first_course', 'First Course'),
        ('certificate_earner', 'Certificate Earner'),
    ]
    
    DIFFICULTY_CHOICES = [
        ('bronze', 'Bronze'),
        ('silver', 'Silver'),
        ('gold', 'Gold'),
        ('platinum', 'Platinum'),
        ('diamond', 'Diamond'),
    ]
    
    # Basic information
    achievement_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_achievements_progress')
    
    # Achievement details
    title = models.CharField(max_length=200)
    title_pt = models.CharField(max_length=200, blank=True, help_text="Portuguese title")
    description = models.TextField()
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    achievement_type = models.CharField(max_length=30, choices=ACHIEVEMENT_TYPE_CHOICES)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='bronze')
    
    # Visual elements
    icon = models.CharField(max_length=50, blank=True, help_text="Icon class or emoji")
    color = models.CharField(max_length=7, default="#FFD700", help_text="Achievement color")
    image = models.ImageField(upload_to='user_achievements/', null=True, blank=True)
    
    # Achievement data
    criteria_met = models.JSONField(default=dict, help_text="Criteria that were met")
    points_earned = models.IntegerField(default=0)
    
    # Timestamps
    awarded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('user achievement')
        verbose_name_plural = _('user achievements')
        db_table = 'user_achievements_progress'
        indexes = [
            models.Index(fields=['user', 'achievement_type']),
            models.Index(fields=['difficulty']),
            models.Index(fields=['awarded_at']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.title}"
    
    def get_title(self, language='en'):
        """Get localized title"""
        if language == 'pt' and self.title_pt:
            return self.title_pt
        return self.title
    
    def get_description(self, language='en'):
        """Get localized description"""
        if language == 'pt' and self.description_pt:
            return self.description_pt
        return self.description


class StudySession(models.Model):
    """
    Individual study sessions for analytics
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='study_sessions')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='study_sessions', null=True, blank=True)
    lesson = models.ForeignKey('courses.Lesson', on_delete=models.CASCADE, related_name='study_sessions', null=True, blank=True)
    
    # Session details
    duration_minutes = models.IntegerField(default=0)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    
    # Session type
    session_type = models.CharField(
        max_length=20,
        choices=[
            ('video', 'Video Learning'),
            ('reading', 'Reading'),
            ('exercise', 'Exercise'),
            ('quiz', 'Quiz'),
            ('project', 'Project'),
        ],
        default='video'
    )
    
    # Performance metrics
    focus_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    completion_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    # Metadata
    device_type = models.CharField(max_length=20, blank=True)
    browser = models.CharField(max_length=50, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('study session')
        verbose_name_plural = _('study sessions')
        db_table = 'study_sessions'
        indexes = [
            models.Index(fields=['user', 'start_time']),
            models.Index(fields=['course', 'session_type']),
            models.Index(fields=['duration_minutes']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.session_type} ({self.duration_minutes}min)"
    
    def end_session(self):
        """End the study session"""
        from django.utils import timezone
        self.end_time = timezone.now()
        self.duration_minutes = int((self.end_time - self.start_time).total_seconds() / 60)
        self.save() 