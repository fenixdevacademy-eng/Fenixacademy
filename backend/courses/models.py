from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

User = get_user_model()

class Category(models.Model):
    """
    Course categories for organization
    """
    name = models.CharField(max_length=100)
    name_pt = models.CharField(max_length=100, blank=True, help_text="Portuguese name")
    description = models.TextField(blank=True)
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    icon = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=7, default="#007bff")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')
        ordering = ['order', 'name']
        db_table = 'categories'
    
    def __str__(self):
        return self.name

class Course(models.Model):
    """
    Main course model
    """
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('expert', 'Expert'),
    ]
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    # Basic information
    title = models.CharField(max_length=200)
    title_pt = models.CharField(max_length=200, blank=True, help_text="Portuguese title")
    slug = models.SlugField(unique=True, max_length=200)
    description = models.TextField()
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    
    # Course details
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='courses')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='beginner')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Content
    thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True)
    video_intro = models.URLField(blank=True, help_text="Introduction video URL")
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_free = models.BooleanField(default=True)
    
    # Statistics
    duration_hours = models.IntegerField(default=0)
    total_lessons = models.IntegerField(default=0)
    total_exercises = models.IntegerField(default=0)
    
    # Metadata
    instructor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='courses_taught')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('course')
        verbose_name_plural = _('courses')
        ordering = ['-created_at']
        db_table = 'courses'
    
    def __str__(self):
        return self.title

class Module(models.Model):
    """
    Course modules/chapters
    """
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    title_pt = models.CharField(max_length=200, blank=True, help_text="Portuguese title")
    description = models.TextField(blank=True)
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = _('module')
        verbose_name_plural = _('modules')
        ordering = ['course', 'order']
        unique_together = ['course', 'order']
        db_table = 'modules'
    
    def __str__(self):
        return f"{self.course.title} - {self.title}"

class Lesson(models.Model):
    """
    Individual lessons within modules
    """
    LESSON_TYPE_CHOICES = [
        ('video', 'Video Lesson'),
        ('text', 'Text Lesson'),
        ('quiz', 'Quiz'),
        ('exercise', 'Exercise'),
        ('project', 'Project'),
    ]
    
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    title_pt = models.CharField(max_length=200, blank=True, help_text="Portuguese title")
    content = models.TextField(blank=True)
    content_pt = models.TextField(blank=True, help_text="Portuguese content")
    lesson_type = models.CharField(max_length=20, choices=LESSON_TYPE_CHOICES, default='video')
    order = models.IntegerField(default=0)
    
    # Video specific
    video_url = models.URLField(blank=True)
    video_duration = models.IntegerField(default=0, help_text="Duration in seconds")
    
    # Quiz specific
    quiz_data = models.JSONField(default=dict, blank=True)
    
    # Metadata
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('lesson')
        verbose_name_plural = _('lessons')
        ordering = ['module', 'order']
        unique_together = ['module', 'order']
        db_table = 'lessons'
    
    def __str__(self):
        return f"{self.module.title} - {self.title}"

class Exercise(models.Model):
    """
    Coding exercises and challenges
    """
    EXERCISE_TYPE_CHOICES = [
        ('coding', 'Coding Challenge'),
        ('multiple_choice', 'Multiple Choice'),
        ('fill_blank', 'Fill in the Blank'),
        ('true_false', 'True/False'),
        ('matching', 'Matching'),
    ]
    
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
        ('expert', 'Expert'),
    ]
    
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='exercises')
    title = models.CharField(max_length=200)
    title_pt = models.CharField(max_length=200, blank=True, help_text="Portuguese title")
    description = models.TextField()
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    exercise_type = models.CharField(max_length=20, choices=EXERCISE_TYPE_CHOICES, default='coding')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='easy')
    
    # Content
    instructions = models.TextField()
    instructions_pt = models.TextField(blank=True, help_text="Portuguese instructions")
    starter_code = models.TextField(blank=True)
    solution_code = models.TextField(blank=True)
    test_cases = models.JSONField(default=list, blank=True)
    
    # Scoring
    points = models.IntegerField(default=10)
    max_attempts = models.IntegerField(default=3)
    time_limit = models.IntegerField(default=0, help_text="Time limit in minutes (0 = no limit)")
    
    # Metadata
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('exercise')
        verbose_name_plural = _('exercises')
        ordering = ['lesson', 'order']
        unique_together = ['lesson', 'order']
        db_table = 'exercises'
    
    def __str__(self):
        return f"{self.lesson.title} - {self.title}" 