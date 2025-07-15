from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.models import UserProfile
from courses.models import (
    Category, Course, Module, Lesson, Exercise, IDEConfiguration,
    Enrollment, CourseRating
)
from certificates.models import Certificate, CertificateTemplate, CertificateVerification, CertificateAchievement
from payments.models import Payment, Subscription, PaymentMethod, Refund
from progress.models import UserProgress, CourseProgress, LessonProgress, ExerciseProgress, Achievement, StudySession

User = get_user_model()

# User Serializers
class UserSerializer(serializers.ModelSerializer):
    """Basic user serializer"""
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    display_name = serializers.CharField(source='display_name', read_only=True)
    avatar_url = serializers.CharField(source='get_avatar_url', read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'full_name', 'display_name',
            'avatar_url', 'country', 'city', 'preferred_language', 'bio',
            'website', 'github_username', 'linkedin_url', 'twitter_username',
            'is_email_verified', 'created_at', 'last_activity'
        ]
        read_only_fields = ['id', 'created_at', 'last_activity']

class UserProfileSerializer(serializers.ModelSerializer):
    """User profile serializer"""
    user = UserSerializer(read_only=True)
    experience_display = serializers.CharField(source='get_experience_display', read_only=True)
    skills_display = serializers.CharField(source='get_skills_display', read_only=True)
    interests_display = serializers.CharField(source='get_interests_display', read_only=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    """User registration serializer"""
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'email', 'first_name', 'last_name', 'password', 'password_confirm',
            'country', 'preferred_language'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user

# Category Serializers
class CategorySerializer(serializers.ModelSerializer):
    """Category serializer with localization"""
    name_localized = serializers.SerializerMethodField()
    description_localized = serializers.SerializerMethodField()
    courses_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'name_pt', 'name_localized', 'description', 'description_pt',
            'description_localized', 'icon', 'color', 'order', 'is_active',
            'courses_count', 'created_at'
        ]
    
    def get_name_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_name(language)
    
    def get_description_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_description(language)
    
    def get_courses_count(self, obj):
        return obj.courses.filter(status='published').count()

# Course Serializers
class CourseSerializer(serializers.ModelSerializer):
    """Course serializer with localization"""
    category = CategorySerializer(read_only=True)
    title_localized = serializers.SerializerMethodField()
    description_localized = serializers.SerializerMethodField()
    short_description_localized = serializers.SerializerMethodField()
    current_price_usd = serializers.DecimalField(source='current_price_usd', read_only=True, max_digits=10, decimal_places=2)
    current_price_brl = serializers.DecimalField(source='current_price_brl', read_only=True, max_digits=10, decimal_places=2)
    total_enrollments = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    user_enrollment = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'title_pt', 'title_localized', 'slug', 'description', 'description_pt',
            'description_localized', 'short_description', 'short_description_pt', 'short_description_localized',
            'category', 'difficulty', 'status', 'thumbnail', 'video_intro', 'price_usd', 'price_brl',
            'current_price_usd', 'current_price_brl', 'is_free', 'discount_percentage', 'total_modules',
            'total_lessons', 'total_exercises', 'estimated_hours', 'has_certificate', 'has_live_support',
            'has_community_access', 'has_mentor_access', 'total_enrollments', 'average_rating',
            'user_enrollment', 'created_at', 'published_at'
        ]
    
    def get_title_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_title(language)
    
    def get_description_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_description(language)
    
    def get_short_description_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_short_description(language)
    
    def get_total_enrollments(self, obj):
        return obj.get_total_enrollments()
    
    def get_average_rating(self, obj):
        return obj.get_average_rating()
    
    def get_user_enrollment(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            enrollment = obj.enrollments.filter(user=request.user).first()
            if enrollment:
                return {
                    'id': enrollment.id,
                    'status': enrollment.status,
                    'progress_percentage': enrollment.progress_percentage,
                    'enrolled_at': enrollment.enrolled_at,
                    'completed_at': enrollment.completed_at
                }
        return None

class CourseDetailSerializer(CourseSerializer):
    """Detailed course serializer with modules"""
    modules = serializers.SerializerMethodField()
    
    class Meta(CourseSerializer.Meta):
        fields = CourseSerializer.Meta.fields + ['modules']
    
    def get_modules(self, obj):
        modules = obj.modules.all().order_by('order')
        return ModuleSerializer(modules, many=True, context=self.context).data

# Module Serializers
class ModuleSerializer(serializers.ModelSerializer):
    """Module serializer with localization"""
    title_localized = serializers.SerializerMethodField()
    description_localized = serializers.SerializerMethodField()
    lessons_count = serializers.SerializerMethodField()
    exercises_count = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Module
        fields = [
            'id', 'title', 'title_pt', 'title_localized', 'description', 'description_pt',
            'description_localized', 'order', 'estimated_hours', 'is_required', 'is_free_preview',
            'lessons_count', 'exercises_count', 'user_progress', 'created_at'
        ]
    
    def get_title_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_title(language)
    
    def get_description_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_description(language)
    
    def get_lessons_count(self, obj):
        return obj.lessons.count()
    
    def get_exercises_count(self, obj):
        return obj.exercises.count()
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Check if user has completed this module
            completed_lessons = obj.lessons.filter(completed_by=request.user).count()
            total_lessons = obj.lessons.count()
            if total_lessons > 0:
                return {
                    'completed_lessons': completed_lessons,
                    'total_lessons': total_lessons,
                    'progress_percentage': (completed_lessons / total_lessons) * 100
                }
        return None

# Lesson Serializers
class LessonSerializer(serializers.ModelSerializer):
    """Lesson serializer with localization"""
    title_localized = serializers.SerializerMethodField()
    content_localized = serializers.SerializerMethodField()
    exercises_count = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'title_pt', 'title_localized', 'content', 'content_pt', 'content_localized',
            'lesson_type', 'order', 'video_url', 'video_duration', 'attachments', 'is_required',
            'is_free_preview', 'estimated_minutes', 'exercises_count', 'user_progress', 'created_at'
        ]
    
    def get_title_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_title(language)
    
    def get_content_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_content(language)
    
    def get_exercises_count(self, obj):
        return obj.exercises.count()
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Check if user has completed this lesson
            is_completed = obj.completed_by.filter(id=request.user.id).exists()
            return {
                'is_completed': is_completed,
                'completed_at': None  # You could add this field to track completion time
            }
        return None

# Exercise Serializers
class ExerciseSerializer(serializers.ModelSerializer):
    """Exercise serializer with localization"""
    title_localized = serializers.SerializerMethodField()
    description_localized = serializers.SerializerMethodField()
    instructions_localized = serializers.SerializerMethodField()
    ide_config = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Exercise
        fields = [
            'id', 'title', 'title_pt', 'title_localized', 'description', 'description_pt',
            'description_localized', 'exercise_type', 'difficulty', 'order', 'instructions',
            'instructions_pt', 'instructions_localized', 'starter_code', 'points', 'time_limit',
            'max_attempts', 'is_required', 'is_free_preview', 'ide_config', 'user_progress', 'created_at'
        ]
    
    def get_title_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_title(language)
    
    def get_description_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_description(language)
    
    def get_instructions_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_instructions(language)
    
    def get_ide_config(self, obj):
        try:
            config = obj.ide_config
            return {
                'language': config.language,
                'theme': config.theme,
                'font_size': config.font_size,
                'tab_size': config.tab_size,
                'word_wrap': config.word_wrap,
                'line_numbers': config.line_numbers,
                'minimap': config.minimap,
                'timeout_seconds': config.timeout_seconds,
                'memory_limit_mb': config.memory_limit_mb,
                'allow_network': config.allow_network,
                'allow_file_upload': config.allow_file_upload,
                'allowed_libraries': config.allowed_libraries,
                'pre_installed_packages': config.pre_installed_packages,
            }
        except IDEConfiguration.DoesNotExist:
            return None
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                progress = obj.user_progress.get(user=request.user)
                return {
                    'status': progress.status,
                    'attempts': progress.attempts,
                    'best_score': progress.best_score,
                    'current_score': progress.current_score,
                    'time_spent': progress.time_spent,
                    'passed_tests': progress.passed_tests,
                    'total_tests': progress.total_tests,
                    'success_rate': progress.success_rate,
                    'completed_at': progress.completed_at
                }
            except ExerciseProgress.DoesNotExist:
                return None
        return None

# Enrollment Serializers
class EnrollmentSerializer(serializers.ModelSerializer):
    """Enrollment serializer"""
    course = CourseSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Enrollment
        fields = [
            'id', 'user', 'course', 'status', 'progress_percentage', 'enrolled_at',
            'completed_at', 'last_accessed'
        ]
        read_only_fields = ['id', 'enrolled_at', 'last_accessed']

class EnrollmentCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating enrollments"""
    
    class Meta:
        model = Enrollment
        fields = ['course']
    
    def create(self, validated_data):
        user = self.context['request'].user
        course = validated_data['course']
        
        # Check if user is already enrolled
        enrollment, created = Enrollment.objects.get_or_create(
            user=user,
            course=course,
            defaults={'status': 'active'}
        )
        
        return enrollment

# Certificate Serializers
class CertificateSerializer(serializers.ModelSerializer):
    """Certificate serializer"""
    user = UserSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    title_localized = serializers.SerializerMethodField()
    description_localized = serializers.SerializerMethodField()
    issued_by_localized = serializers.SerializerMethodField()
    
    class Meta:
        model = Certificate
        fields = [
            'id', 'certificate_id', 'user', 'course', 'title', 'title_pt', 'title_localized',
            'description', 'description_pt', 'description_localized', 'completion_date', 'grade',
            'total_hours', 'certificate_number', 'issued_by', 'issued_by_pt', 'issued_by_localized',
            'pdf_file', 'qr_code', 'certificate_image', 'status', 'is_verified', 'verification_url',
            'template_used', 'language', 'created_at', 'issued_at'
        ]
    
    def get_title_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_title(language)
    
    def get_description_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_description(language)
    
    def get_issued_by_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_issued_by(language)

# Payment Serializers
class PaymentSerializer(serializers.ModelSerializer):
    """Payment serializer"""
    user = UserSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    formatted_amount = serializers.CharField(source='formatted_amount', read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            'id', 'payment_id', 'user', 'course', 'amount', 'currency', 'payment_method',
            'status', 'stripe_payment_intent_id', 'stripe_charge_id', 'description',
            'formatted_amount', 'created_at', 'completed_at'
        ]
        read_only_fields = ['id', 'payment_id', 'created_at']

class PaymentCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating payments"""
    
    class Meta:
        model = Payment
        fields = ['course', 'amount', 'currency', 'payment_method']
    
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

# Progress Serializers
class UserProgressSerializer(serializers.ModelSerializer):
    """User progress serializer"""
    user = UserSerializer(read_only=True)
    completion_rate = serializers.CharField(source='completion_rate', read_only=True)
    level_progress = serializers.CharField(source='level_progress', read_only=True)
    
    class Meta:
        model = UserProgress
        fields = [
            'id', 'user', 'total_courses_enrolled', 'total_courses_completed',
            'total_lessons_completed', 'total_exercises_completed', 'total_study_hours',
            'total_points_earned', 'current_streak_days', 'longest_streak_days',
            'last_study_date', 'current_level', 'experience_points',
            'experience_to_next_level', 'completion_rate', 'level_progress',
            'created_at', 'updated_at'
        ]

class CourseProgressSerializer(serializers.ModelSerializer):
    """Course progress serializer"""
    course = CourseSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = CourseProgress
        fields = [
            'id', 'user', 'course', 'progress_percentage', 'total_time_spent',
            'last_accessed', 'started_at', 'completed_at', 'average_score',
            'total_points_earned', 'total_attempts', 'is_active', 'is_completed'
        ]

# Achievement Serializers
class AchievementSerializer(serializers.ModelSerializer):
    """Achievement serializer"""
    user = UserSerializer(read_only=True)
    title_localized = serializers.SerializerMethodField()
    description_localized = serializers.SerializerMethodField()
    
    class Meta:
        model = Achievement
        fields = [
            'id', 'achievement_id', 'user', 'title', 'title_pt', 'title_localized',
            'description', 'description_pt', 'description_localized', 'achievement_type',
            'difficulty', 'icon', 'color', 'image', 'criteria_met', 'points_earned',
            'awarded_at'
        ]
    
    def get_title_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_title(language)
    
    def get_description_localized(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return obj.get_description(language)

# Dashboard Serializers
class DashboardSerializer(serializers.Serializer):
    """Dashboard data serializer"""
    user = UserSerializer()
    progress = UserProgressSerializer()
    recent_courses = CourseProgressSerializer(many=True)
    recent_achievements = AchievementSerializer(many=True)
    certificates = CertificateSerializer(many=True)
    current_streak = serializers.IntegerField()
    weekly_study_time = serializers.IntegerField()
    monthly_study_time = serializers.IntegerField()
    next_level_progress = serializers.DecimalField(max_digits=5, decimal_places=2) 