from rest_framework import serializers
from django.contrib.auth import get_user_model
from progress.models import UserProgress

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer básico para User"""
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'bio', 'avatar', 'preferred_language', 'learning_goals',
            'skill_level', 'subscription_status', 'date_joined'
        ]
        read_only_fields = ['id', 'date_joined']

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer para perfil do usuário com progresso"""
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
                'total_study_hours': progress.total_study_hours,
            }
        return {}

class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer para registro de usuário"""
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'email', 'first_name', 'last_name', 'password', 'password_confirm',
            'preferred_language', 'skill_level'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Senhas não coincidem")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        validated_data['username'] = validated_data['email']
        user = User.objects.create_user(**validated_data)
        return user

class UserLoginSerializer(serializers.Serializer):
    """Serializer para login"""
    email = serializers.EmailField()
    password = serializers.CharField()

class ChangePasswordSerializer(serializers.Serializer):
    """Serializer para alteração de senha"""
    current_password = serializers.CharField()
    new_password = serializers.CharField(min_length=8)
    new_password_confirm = serializers.CharField()
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError("Nova senha não coincide")
        return attrs

class ForgotPasswordSerializer(serializers.Serializer):
    """Serializer para recuperação de senha"""
    email = serializers.EmailField()

class ResetPasswordSerializer(serializers.Serializer):
    """Serializer para redefinição de senha"""
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8)
    new_password_confirm = serializers.CharField()
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError("Senhas não coincidem")
        return attrs 