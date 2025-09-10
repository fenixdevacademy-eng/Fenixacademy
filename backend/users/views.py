from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.http import JsonResponse, HttpResponse
from django.contrib import messages
from django.urls import reverse
from django.utils import timezone
from django.db import transaction
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken

from .models import User
from .serializers import (
    UserSerializer, UserProfileSerializer, UserProfileUpdateSerializer,
    UserRegistrationSerializer, UserLoginSerializer, ChangePasswordSerializer,
    ForgotPasswordSerializer, ResetPasswordSerializer
)
from .forms import UserProfileForm
from progress.models import UserProgress
from courses.models import Course, Enrollment, Certificate
from progress.models import Progress, StudySession
from gamification.models import Achievement, UserAchievement
from analytics.models import UserAnalytics

class LoginView(APIView):
    """Login endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({
                'error': 'Email e senha são obrigatórios'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Authenticate user
        user = authenticate(request, username=email, password=password)
        
        if user is None:
            return Response({
                'error': 'Credenciais inválidas'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        if not user.is_active:
            return Response({
                'error': 'Conta desativada'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        # Update last login
        user.last_login = timezone.now()
        user.save()
        
        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': UserSerializer(user).data,
            'message': 'Login realizado com sucesso'
        }, status=status.HTTP_200_OK)

class RegisterView(APIView):
    """Registration endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        password_confirm = request.data.get('password_confirm')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        
        # Validation
        if not email or not password:
            return Response({
                'error': 'Email e senha são obrigatórios'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if password != password_confirm:
            return Response({
                'error': 'Senhas não coincidem'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if len(password) < 8:
            return Response({
                'error': 'Senha deve ter pelo menos 8 caracteres'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user already exists
        if User.objects.filter(email=email).exists():
            return Response({
                'error': 'Email já está em uso'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            with transaction.atomic():
                # Create user
                user = User.objects.create_user(
                    username=email,
                    email=email,
                    password=password,
                    first_name=first_name,
                    last_name=last_name
                )
                
                # Create user progress
                UserProgress.objects.create(
                    user=user,
                    total_courses_completed=0,
                    total_lessons_completed=0,
                    total_exercises_completed=0,
                    current_streak_days=0,
                    total_study_time=0
                )
                
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                
                return Response({
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                    'user': UserSerializer(user).data,
                    'message': 'Conta criada com sucesso'
                }, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            return Response({
                'error': 'Erro ao criar conta'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LogoutView(APIView):
    """Logout endpoint"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            
            return Response({
                'message': 'Logout realizado com sucesso'
            }, status=status.HTTP_200_OK)
            
        except TokenError:
            return Response({
                'error': 'Token inválido'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'error': 'Erro ao fazer logout'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RefreshTokenView(APIView):
    """Refresh token endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        
        if not refresh_token:
            return Response({
                'error': 'Refresh token é obrigatório'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refresh = RefreshToken(refresh_token)
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh)
            }, status=status.HTTP_200_OK)
            
        except TokenError:
            return Response({
                'error': 'Token inválido'
            }, status=status.HTTP_401_UNAUTHORIZED)

class ProfileView(APIView):
    """User profile endpoint"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get user profile"""
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    
    def put(self, request):
        """Update user profile"""
        try:
            with transaction.atomic():
                user = request.user
                serializer = UserProfileUpdateSerializer(user, data=request.data, partial=True)
                
                if serializer.is_valid():
                    # Atualizar o usuário
                    updated_user = serializer.save()
                    
                    # Retornar o perfil atualizado
                    profile_serializer = UserProfileSerializer(updated_user)
                    return Response({
                        'success': True,
                        'message': 'Perfil atualizado com sucesso',
                        'data': profile_serializer.data
                    })
                else:
                    return Response({
                        'success': False,
                        'message': 'Erro na validação dos dados',
                        'errors': serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)
                    
        except ValidationError as e:
            return Response({
                'success': False,
                'message': 'Erro de validação',
                'errors': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Erro interno do servidor',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ChangePasswordView(APIView):
    """Change password endpoint"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        new_password_confirm = request.data.get('new_password_confirm')
        
        # Validation
        if not current_password or not new_password or not new_password_confirm:
            return Response({
                'error': 'Todos os campos são obrigatórios'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if new_password != new_password_confirm:
            return Response({
                'error': 'Nova senha não coincide'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if len(new_password) < 8:
            return Response({
                'error': 'Nova senha deve ter pelo menos 8 caracteres'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check current password
        if not user.check_password(current_password):
            return Response({
                'error': 'Senha atual incorreta'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Change password
        user.set_password(new_password)
        user.save()
        
        return Response({
            'message': 'Senha alterada com sucesso'
        }, status=status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    """Forgot password endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        
        if not email:
            return Response({
                'error': 'Email é obrigatório'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            
            # Generate password reset token
            reset_token = RefreshToken.for_user(user)
            
            # TODO: Send email with reset link
            # For now, just return success
            return Response({
                'message': 'Email de recuperação enviado'
            }, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response({
                'error': 'Email não encontrado'
            }, status=status.HTTP_404_NOT_FOUND)

class ResetPasswordView(APIView):
    """Reset password endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        new_password_confirm = request.data.get('new_password_confirm')
        
        if not token or not new_password or not new_password_confirm:
            return Response({
                'error': 'Todos os campos são obrigatórios'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if new_password != new_password_confirm:
            return Response({
                'error': 'Senhas não coincidem'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if len(new_password) < 8:
            return Response({
                'error': 'Senha deve ter pelo menos 8 caracteres'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Verify token and get user
            refresh = RefreshToken(token)
            user_id = refresh.payload.get('user_id')
            user = User.objects.get(id=user_id)
            
            # Change password
            user.set_password(new_password)
            user.save()
            
            return Response({
                'message': 'Senha redefinida com sucesso'
            }, status=status.HTTP_200_OK)
            
        except (TokenError, User.DoesNotExist):
            return Response({
                'error': 'Token inválido'
            }, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailView(APIView):
    """Email verification endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        token = request.data.get('token')
        
        if not token:
            return Response({
                'error': 'Token é obrigatório'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Verify token and get user
            refresh = RefreshToken(token)
            user_id = refresh.payload.get('user_id')
            user = User.objects.get(id=user_id)
            
            # Mark email as verified
            user.is_email_verified = True
            user.save()
            
            return Response({
                'message': 'Email verificado com sucesso'
            }, status=status.HTTP_200_OK)
            
        except (TokenError, User.DoesNotExist):
            return Response({
                'error': 'Token inválido'
            }, status=status.HTTP_400_BAD_REQUEST)

# Traditional Django views for frontend integration
@method_decorator(csrf_exempt, name='dispatch')
class LoginPageView(View):
    """Login page view"""
    template_name = 'users/login.html'
    
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('dashboard')
        return render(request, self.template_name)
    
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(request, username=email, password=password)
        
        if user is not None and user.is_active:
            login(request, user)
            return JsonResponse({
                'success': True,
                'redirect_url': reverse('dashboard')
            })
        else:
            return JsonResponse({
                'success': False,
                'error': 'Credenciais inválidas'
            }, status=400)

@method_decorator(csrf_exempt, name='dispatch')
class RegisterPageView(View):
    """Register page view"""
    template_name = 'users/register.html'
    
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('dashboard')
        return render(request, self.template_name)
    
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        password_confirm = data.get('password_confirm')
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        
        # Validation
        if not email or not password:
            return JsonResponse({
                'success': False,
                'error': 'Email e senha são obrigatórios'
            }, status=400)
        
        if password != password_confirm:
            return JsonResponse({
                'success': False,
                'error': 'Senhas não coincidem'
            }, status=400)
        
        if User.objects.filter(email=email).exists():
            return JsonResponse({
                'success': False,
                'error': 'Email já está em uso'
            }, status=400)
        
        try:
            with transaction.atomic():
                user = User.objects.create_user(
                    username=email,
                    email=email,
                    password=password,
                    first_name=first_name,
                    last_name=last_name
                )
                
                UserProgress.objects.create(
                    user=user,
                    total_courses_completed=0,
                    total_lessons_completed=0,
                    total_exercises_completed=0,
                    current_streak_days=0,
                    total_study_time=0
                )
                
                login(request, user)
                return JsonResponse({
                    'success': True,
                    'redirect_url': reverse('dashboard')
                })
                
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': 'Erro ao criar conta'
            }, status=500)

@login_required
def logout_view(request):
    """Logout view"""
    logout(request)
    return redirect('login')

@login_required
def profile_view(request):
    """Profile page view"""
    return render(request, 'users/profile.html') 

@method_decorator(csrf_exempt, name='dispatch')
class UserProfileAPIView(View):
    """
    API endpoint to provide user profile data for the frontend
    """
    
    def get(self, request, *args, **kwargs):
        try:
            # Em produção, obter usuário autenticado
            user = User.objects.first()  # Temporário para desenvolvimento
            
            if not user:
                return JsonResponse({
                    'success': False,
                    'error': 'Usuário não encontrado'
                }, status=404)
            
            # Criar dados do perfil
            profile_data = {
                'id': user.id,
                'user_info': {
                    'name': user.full_name,
                    'email': user.email,
                    'phone': user.phone_number or '',
                    'location': f"{user.city or ''}, {user.country or ''}".strip(', '),
                    'bio': user.bio or '',
                    'avatar': user.get_avatar_url(),
                    'joinDate': user.date_joined.strftime('%Y-%m-%d'),
                    'completedCourses': 0,  # Será calculado dinamicamente
                    'studyHours': 0,  # Será calculado dinamicamente
                    'level': user.skill_level or 'beginner'
                },
                'study_stats': {
                    'current_streak': 0,
                    'longest_streak': 0,
                    'total_study_time': 0,
                    'weekly_goal': 20,
                    'weekly_progress': 0
                },
                'certificates': [],
                'enrolled_courses': [],
                'achievements': [],
                'preferences': {
                    'emailNotifications': user.email_notifications,
                    'pushNotifications': user.push_notifications,
                    'weeklyReports': False,
                    'language': user.preferred_language,
                    'timezone': user.timezone
                },
                'lastUpdated': user.updated_at.isoformat() if user.updated_at else timezone.now().isoformat()
            }
            
            return JsonResponse({
                'success': True,
                'data': profile_data
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)
    
    def put(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user = User.objects.first()  # Em produção, obter do request autenticado
            
            if not user:
                return JsonResponse({
                    'success': False,
                    'error': 'Usuário não encontrado'
                }, status=404)
            
            # Mapear dados do frontend para o modelo Django
            update_data = {}
            
            if 'user_info' in data:
                user_info = data['user_info']
                
                # Nome completo
                if 'name' in user_info:
                    names = user_info['name'].split(' ', 1)
                    update_data['first_name'] = names[0]
                    update_data['last_name'] = names[1] if len(names) > 1 else ''
                
                # Outros campos
                if 'phone' in user_info:
                    update_data['phone_number'] = user_info['phone']
                
                if 'bio' in user_info:
                    update_data['bio'] = user_info['bio']
                
                if 'location' in user_info:
                    location_parts = user_info['location'].split(', ')
                    if len(location_parts) >= 2:
                        update_data['city'] = location_parts[0]
                        update_data['country'] = location_parts[1]
                    elif len(location_parts) == 1:
                        update_data['city'] = location_parts[0]
            
            # Atualizar preferências
            if 'preferences' in data:
                prefs = data['preferences']
                if 'language' in prefs:
                    update_data['preferred_language'] = prefs['language']
                if 'timezone' in prefs:
                    update_data['timezone'] = prefs['timezone']
                if 'emailNotifications' in prefs:
                    update_data['email_notifications'] = prefs['emailNotifications']
                if 'pushNotifications' in prefs:
                    update_data['push_notifications'] = prefs['pushNotifications']
            
            # Aplicar atualizações
            with transaction.atomic():
                for field, value in update_data.items():
                    if hasattr(user, field):
                        setattr(user, field, value)
                
                # Atualizar timestamp
                user.last_activity = timezone.now()
                user.save()
            
            return JsonResponse({
                'success': True,
                'message': 'Perfil atualizado com sucesso',
                'data': {
                    'id': user.id,
                    'user_info': {
                        'name': user.full_name,
                        'email': user.email,
                        'phone': user.phone_number or '',
                        'location': f"{user.city or ''}, {user.country or ''}".strip(', '),
                        'bio': user.bio or '',
                        'avatar': user.get_avatar_url(),
                        'joinDate': user.date_joined.strftime('%Y-%m-%d'),
                        'completedCourses': 0,
                        'studyHours': 0,
                        'level': user.skill_level or 'beginner'
                    },
                    'preferences': {
                        'emailNotifications': user.email_notifications,
                        'pushNotifications': user.push_notifications,
                        'weeklyReports': False,
                        'language': user.preferred_language,
                        'timezone': user.timezone
                    }
                }
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500) 