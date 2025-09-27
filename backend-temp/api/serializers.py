from rest_framework import serializers
from django.contrib.auth import get_user_model
from courses.models import Category, Course, Module, Lesson, Exercise
from users.models import User
from progress.models import UserProgress, CourseProgress, LessonProgress, ExerciseProgress, UserAchievement
from payments.models import Payment, Subscription

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'bio', 'avatar', 'preferred_language', 'learning_goals',
            'skill_level', 'subscription_status', 'date_joined'
        ]
        read_only_fields = ['id', 'date_joined']

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile with progress"""
    progress = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'bio', 'avatar', 'preferred_language', 'learning_goals',
            'skill_level', 'subscription_status', 'date_joined', 'progress'
        ]
        read_only_fields = ['id', 'date_joined']
    
    def get_progress(self, obj):
        progress = UserProgress.objects.filter(user=obj).first()
        if progress:
            return {
                'total_courses_completed': progress.total_courses_completed,
                'total_lessons_completed': progress.total_lessons_completed,
                'total_exercises_completed': progress.total_exercises_completed,
                'current_streak_days': progress.current_streak_days,
                'total_study_time': progress.total_study_time,
            }
        return {}

class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model"""
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image']

class CourseSerializer(serializers.ModelSerializer):
    """Serializer for Course model"""
    category = CategorySerializer(read_only=True)
    instructor_name = serializers.SerializerMethodField()
    enrollment_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'description', 'category', 'difficulty',
            'price', 'instructor', 'instructor_name', 'total_lessons',
            'total_exercises', 'rating', 'image', 'enrollment_count'
        ]
    
    def get_instructor_name(self, obj):
        if obj.instructor:
            return f"{obj.instructor.first_name} {obj.instructor.last_name}"
        return "N/A"
    
    def get_enrollment_count(self, obj):
        return CourseProgress.objects.filter(course=obj).count()

class ModuleSerializer(serializers.ModelSerializer):
    """Serializer for Module model"""
    lessons_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Module
        fields = ['id', 'title', 'description', 'order', 'lessons_count']
    
    def get_lessons_count(self, obj):
        return obj.lessons.count()

class LessonSerializer(serializers.ModelSerializer):
    """Serializer for Lesson model"""
    exercises_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'description', 'lesson_type', 'duration',
            'order', 'content', 'video_url', 'quiz_data', 'exercises_count'
        ]
    
    def get_exercises_count(self, obj):
        return obj.exercises.count()

class ExerciseSerializer(serializers.ModelSerializer):
    """Serializer for Exercise model"""
    class Meta:
        model = Exercise
        fields = [
            'id', 'title', 'description', 'instructions', 'starter_code',
            'solution_code', 'test_cases', 'difficulty', 'estimated_time'
        ]

class CourseProgressSerializer(serializers.ModelSerializer):
    """Serializer for CourseProgress model"""
    course = CourseSerializer(read_only=True)
    
    class Meta:
        model = CourseProgress
        fields = [
            'id', 'course', 'progress_percentage', 'completed_lessons',
            'completed_exercises', 'started_at', 'completed_at'
        ]

class LessonProgressSerializer(serializers.ModelSerializer):
    """Serializer for LessonProgress model"""
    lesson = LessonSerializer(read_only=True)
    
    class Meta:
        model = LessonProgress
        fields = [
            'id', 'lesson', 'completed', 'completed_at', 'time_spent',
            'video_progress', 'quiz_score'
        ]

class ExerciseProgressSerializer(serializers.ModelSerializer):
    """Serializer for ExerciseProgress model"""
    exercise = ExerciseSerializer(read_only=True)
    
    class Meta:
        model = ExerciseProgress
        fields = [
            'id', 'exercise', 'is_completed', 'attempts', 'last_attempt',
            'test_results', 'time_spent'
        ]

class UserAchievementSerializer(serializers.ModelSerializer):
    """Serializer for UserAchievement model"""
    course = CourseSerializer(read_only=True)
    
    class Meta:
        model = UserAchievement
        fields = [
            'id', 'title', 'description', 'achievement_type', 'earned_at',
            'course', 'badge_image'
        ]

class EnrollmentSerializer(serializers.ModelSerializer):
    """Serializer for enrollment data"""
    course = CourseSerializer(read_only=True)
    progress = serializers.SerializerMethodField()
    
    class Meta:
        model = CourseProgress
        fields = ['id', 'course', 'progress', 'started_at', 'completed_at']
    
    def get_progress(self, obj):
        return {
            'percentage': obj.progress_percentage,
            'completed_lessons': obj.completed_lessons,
            'completed_exercises': obj.completed_exercises,
            'total_lessons': obj.course.total_lessons,
            'total_exercises': obj.course.total_exercises,
        }

class CertificateSerializer(serializers.ModelSerializer):
    """Serializer for certificates"""
    course = CourseSerializer(read_only=True)
    
    class Meta:
        model = UserAchievement
        fields = [
            'id', 'title', 'description', 'earned_at', 'course',
            'certificate_url', 'verification_url'
        ]

class PaymentSerializer(serializers.ModelSerializer):
    """Serializer for Payment model"""
    class Meta:
        model = Payment
        fields = [
            'id', 'amount', 'currency', 'payment_method', 'status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class SubscriptionSerializer(serializers.ModelSerializer):
    """Serializer for Subscription model"""
    class Meta:
        model = Subscription
        fields = [
            'id', 'plan_type', 'status', 'start_date', 'end_date',
            'auto_renew', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class CourseRatingSerializer(serializers.Serializer):
    """Serializer for course ratings"""
    rating = serializers.IntegerField(min_value=1, max_value=5)
    review = serializers.CharField(max_length=1000, required=False)

class DashboardSerializer(serializers.Serializer):
    """Serializer for dashboard data"""
    user = UserSerializer()
    stats = serializers.DictField()
    recent_courses = EnrollmentSerializer(many=True)
    recent_achievements = UserAchievementSerializer(many=True)

class SearchResultSerializer(serializers.Serializer):
    """Serializer for search results"""
    query = serializers.CharField()
    filters = serializers.DictField()
    total_results = serializers.IntegerField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()
    results = CourseSerializer(many=True)

class CourseContentSerializer(serializers.Serializer):
    """Serializer for complete course content"""
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    category = serializers.CharField()
    difficulty = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    instructor = serializers.CharField()
    rating = serializers.FloatField()
    total_lessons = serializers.IntegerField()
    total_exercises = serializers.IntegerField()
    is_enrolled = serializers.BooleanField()
    modules = serializers.ListField()

class HealthCheckSerializer(serializers.Serializer):
    """Serializer for health check response"""
    status = serializers.CharField()
    database = serializers.CharField()
    cache = serializers.CharField()
    timestamp = serializers.CharField() 