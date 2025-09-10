#!/usr/bin/env python3
"""
Script para configurar banco de dados e dados de exemplo
"""

import os
import sys
import django
from django.core.management import execute_from_command_line
from django.db import transaction
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fenix_academy.settings.local')
django.setup()

from courses.models import Category, Course, Module, Lesson, Exercise
from users.models import User
from progress.models import UserProgress, CourseProgress, LessonProgress, ExerciseProgress, UserAchievement
from payments.models import Payment, Subscription

User = get_user_model()

def create_superuser():
    """Cria superusuário"""
    print("Criando superusuário...")
    
    if not User.objects.filter(is_superuser=True).exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@fenixacademy.com',
            password='admin123',
            first_name='Admin',
            last_name='Fenix'
        )
        print("✅ Superusuário criado: admin@fenixacademy.com / admin123")
    else:
        print("ℹ️ Superusuário já existe")

def create_categories():
    """Cria categorias de cursos"""
    print("Criando categorias...")
    
    categories_data = [
        {
            'name': 'Desenvolvimento Web',
            'name_pt': 'Desenvolvimento Web',
            'description': 'Cursos de desenvolvimento web, HTML, CSS, JavaScript e frameworks modernos',
            'description_pt': 'Cursos de desenvolvimento web, HTML, CSS, JavaScript e frameworks modernos',
            'icon': 'web',
            'color': '#007bff',
            'order': 1
        },
        {
            'name': 'Programação Backend',
            'name_pt': 'Programação Backend',
            'description': 'Cursos de programação backend, APIs, bancos de dados e servidores',
            'description_pt': 'Cursos de programação backend, APIs, bancos de dados e servidores',
            'icon': 'server',
            'color': '#28a745',
            'order': 2
        },
        {
            'name': 'Data Science',
            'name_pt': 'Ciência de Dados',
            'description': 'Cursos de ciência de dados, Python, machine learning e análise de dados',
            'description_pt': 'Cursos de ciência de dados, Python, machine learning e análise de dados',
            'icon': 'chart',
            'color': '#ffc107',
            'order': 3
        },
        {
            'name': 'DevOps',
            'name_pt': 'DevOps',
            'description': 'Cursos de DevOps, Docker, CI/CD e infraestrutura como código',
            'description_pt': 'Cursos de DevOps, Docker, CI/CD e infraestrutura como código',
            'icon': 'cloud',
            'color': '#dc3545',
            'order': 4
        },
        {
            'name': 'Mobile Development',
            'name_pt': 'Desenvolvimento Mobile',
            'description': 'Cursos de desenvolvimento mobile, React Native, Flutter e apps nativos',
            'description_pt': 'Cursos de desenvolvimento mobile, React Native, Flutter e apps nativos',
            'icon': 'mobile',
            'color': '#6f42c1',
            'order': 5
        }
    ]
    
    for data in categories_data:
        category, created = Category.objects.get_or_create(
            name=data['name'],
            defaults=data
        )
        if created:
            print(f"✅ Categoria criada: {category.name}")
        else:
            print(f"ℹ️ Categoria já existe: {category.name}")

def create_instructors():
    """Cria instrutores"""
    print("Criando instrutores...")
    
    instructors_data = [
        {
            'username': 'joao.silva',
            'email': 'joao.silva@fenixacademy.com',
            'first_name': 'João',
            'last_name': 'Silva',
            'bio': 'Desenvolvedor Full Stack com 8 anos de experiência em React, Node.js e Python',
            'skill_level': 'advanced'
        },
        {
            'username': 'maria.santos',
            'email': 'maria.santos@fenixacademy.com',
            'first_name': 'Maria',
            'last_name': 'Santos',
            'bio': 'Especialista em Data Science e Machine Learning com experiência em empresas de tecnologia',
            'skill_level': 'advanced'
        },
        {
            'username': 'pedro.oliveira',
            'email': 'pedro.oliveira@fenixacademy.com',
            'first_name': 'Pedro',
            'last_name': 'Oliveira',
            'bio': 'DevOps Engineer com expertise em Docker, Kubernetes e AWS',
            'skill_level': 'advanced'
        }
    ]
    
    for data in instructors_data:
        instructor, created = User.objects.get_or_create(
            email=data['email'],
            defaults={
                **data,
                'password': 'instructor123',
                'is_staff': True
            }
        )
        if created:
            instructor.set_password('instructor123')
            instructor.save()
            print(f"✅ Instrutor criado: {instructor.get_full_name()}")
        else:
            print(f"ℹ️ Instrutor já existe: {instructor.get_full_name()}")

def create_courses():
    """Cria cursos de exemplo"""
    print("Criando cursos...")
    
    # Get categories and instructors
    web_dev = Category.objects.get(name='Desenvolvimento Web')
    backend = Category.objects.get(name='Programação Backend')
    data_science = Category.objects.get(name='Data Science')
    devops = Category.objects.get(name='DevOps')
    
    joao = User.objects.get(email='joao.silva@fenixacademy.com')
    maria = User.objects.get(email='maria.santos@fenixacademy.com')
    pedro = User.objects.get(email='pedro.oliveira@fenixacademy.com')
    
    courses_data = [
        {
            'title': 'Fundamentos de Desenvolvimento Web',
            'title_pt': 'Fundamentos de Desenvolvimento Web',
            'slug': 'fundamentos-desenvolvimento-web',
            'description': 'Aprenda HTML, CSS e JavaScript do zero. Crie sites responsivos e interativos.',
            'description_pt': 'Aprenda HTML, CSS e JavaScript do zero. Crie sites responsivos e interativos.',
            'category': web_dev,
            'instructor': joao,
            'difficulty': 'beginner',
            'price': 0,
            'is_free': True,
            'total_lessons': 21,
            'total_exercises': 63,
            'duration_hours': 15,
            'status': 'published'
        },
        {
            'title': 'React.js Avançado',
            'title_pt': 'React.js Avançado',
            'slug': 'react-js-avancado',
            'description': 'Domine React com hooks, context API, performance e padrões avançados.',
            'description_pt': 'Domine React com hooks, context API, performance e padrões avançados.',
            'category': web_dev,
            'instructor': joao,
            'difficulty': 'intermediate',
            'price': 199.00,
            'is_free': False,
            'total_lessons': 12,
            'total_exercises': 36,
            'duration_hours': 12,
            'status': 'published'
        },
        {
            'title': 'Python para Data Science',
            'title_pt': 'Python para Ciência de Dados',
            'slug': 'python-data-science',
            'description': 'Aprenda Python, pandas, numpy e matplotlib para análise de dados.',
            'description_pt': 'Aprenda Python, pandas, numpy e matplotlib para análise de dados.',
            'category': data_science,
            'instructor': maria,
            'difficulty': 'intermediate',
            'price': 299.00,
            'is_free': False,
            'total_lessons': 9,
            'total_exercises': 27,
            'duration_hours': 18,
            'status': 'published'
        },
        {
            'title': 'Node.js e APIs RESTful',
            'title_pt': 'Node.js e APIs RESTful',
            'slug': 'nodejs-apis-restful',
            'description': 'Construa APIs robustas com Node.js, Express e MongoDB.',
            'description_pt': 'Construa APIs robustas com Node.js, Express e MongoDB.',
            'category': backend,
            'instructor': joao,
            'difficulty': 'intermediate',
            'price': 249.00,
            'is_free': False,
            'total_lessons': 11,
            'total_exercises': 33,
            'duration_hours': 14,
            'status': 'published'
        },
        {
            'title': 'DevOps e CI/CD',
            'title_pt': 'DevOps e CI/CD',
            'slug': 'devops-cicd',
            'description': 'Aprenda Docker, GitHub Actions e deploy automatizado.',
            'description_pt': 'Aprenda Docker, GitHub Actions e deploy automatizado.',
            'category': devops,
            'instructor': pedro,
            'difficulty': 'advanced',
            'price': 399.00,
            'is_free': False,
            'total_lessons': 10,
            'total_exercises': 30,
            'duration_hours': 20,
            'status': 'published'
        }
    ]
    
    for data in courses_data:
        course, created = Course.objects.get_or_create(
            title=data['title'],
            defaults=data
        )
        if created:
            print(f"✅ Curso criado: {course.title}")
        else:
            print(f"ℹ️ Curso já existe: {course.title}")

def create_sample_users():
    """Cria usuários de exemplo"""
    print("Criando usuários de exemplo...")
    
    users_data = [
        {
            'username': 'aluno1',
            'email': 'aluno1@example.com',
            'first_name': 'Ana',
            'last_name': 'Costa',
            'bio': 'Estudante de programação apaixonada por tecnologia',
            'skill_level': 'beginner'
        },
        {
            'username': 'aluno2',
            'email': 'aluno2@example.com',
            'first_name': 'Carlos',
            'last_name': 'Ribeiro',
            'bio': 'Desenvolvedor júnior buscando aprimorar habilidades',
            'skill_level': 'intermediate'
        },
        {
            'username': 'aluno3',
            'email': 'aluno3@example.com',
            'first_name': 'Fernanda',
            'last_name': 'Lima',
            'bio': 'Profissional em transição de carreira para tecnologia',
            'skill_level': 'beginner'
        }
    ]
    
    for data in users_data:
        user, created = User.objects.get_or_create(
            email=data['email'],
            defaults={
                **data,
                'password': 'aluno123'
            }
        )
        if created:
            user.set_password('aluno123')
            user.save()
            
            # Create user progress
            UserProgress.objects.create(
                user=user,
                total_courses_enrolled=0,
                total_courses_completed=0,
                total_lessons_completed=0,
                total_exercises_completed=0,
                total_study_hours=0,
                total_points_earned=0,
                current_streak_days=0,
                longest_streak_days=0,
                current_level=1,
                experience_points=0,
                experience_to_next_level=100
            )
            
            print(f"✅ Usuário criado: {user.get_full_name()}")
        else:
            print(f"ℹ️ Usuário já existe: {user.get_full_name()}")

def create_enrollments():
    """Cria matrículas de exemplo"""
    print("Criando matrículas de exemplo...")
    
    # Get users and courses
    ana = User.objects.get(email='aluno1@example.com')
    carlos = User.objects.get(email='aluno2@example.com')
    fernanda = User.objects.get(email='aluno3@example.com')
    
    web_fundamentals = Course.objects.get(title='Fundamentos de Desenvolvimento Web')
    react_advanced = Course.objects.get(title='React.js Avançado')
    python_data = Course.objects.get(title='Python para Data Science')
    
    enrollments = [
        (ana, web_fundamentals, 75),
        (ana, react_advanced, 30),
        (carlos, web_fundamentals, 100),
        (carlos, python_data, 45),
        (fernanda, web_fundamentals, 60),
    ]
    
    for user, course, progress in enrollments:
        enrollment, created = CourseProgress.objects.get_or_create(
            user=user,
            course=course,
            defaults={
                'progress_percentage': progress,
                'started_at': timezone.now() - timedelta(days=30)
            }
        )
        
        if created:
            print(f"✅ Matrícula criada: {user.get_full_name()} em {course.title}")
        else:
            print(f"ℹ️ Matrícula já existe: {user.get_full_name()} em {course.title}")

def create_achievements():
    """Cria conquistas de exemplo"""
    print("Criando conquistas de exemplo...")
    
    # Get users
    ana = User.objects.get(email='aluno1@example.com')
    carlos = User.objects.get(email='aluno2@example.com')
    
    web_fundamentals = Course.objects.get(title='Fundamentos de Desenvolvimento Web')
    
    achievements_data = [
        {
            'user': carlos,
            'title': 'Primeiro Curso Concluído',
            'description': 'Completou o curso Fundamentos de Desenvolvimento Web',
            'achievement_type': 'certificate',
            'course': web_fundamentals
        },
        {
            'user': ana,
            'title': 'Estudante Dedicado',
            'description': 'Completou 10 aulas em uma semana',
            'achievement_type': 'badge'
        },
        {
            'user': carlos,
            'title': 'Exercícios Perfeitos',
            'description': 'Completou todos os exercícios de um módulo sem erros',
            'achievement_type': 'badge'
        }
    ]
    
    for data in achievements_data:
        achievement, created = UserAchievement.objects.get_or_create(
            user=data['user'],
            title=data['title'],
            defaults=data
        )
        if created:
            print(f"✅ Conquista criada: {achievement.title} para {achievement.user.get_full_name()}")
        else:
            print(f"ℹ️ Conquista já existe: {achievement.title}")

def main():
    """Função principal"""
    print("🚀 Configurando banco de dados da Fenix Academy")
    print("=" * 50)
    
    try:
        with transaction.atomic():
            create_superuser()
            create_categories()
            create_instructors()
            create_courses()
            create_sample_users()
            create_enrollments()
            create_achievements()
        
        print("\n✅ Banco de dados configurado com sucesso!")
        print("\n📋 Resumo:")
        print("- Superusuário: admin@fenixacademy.com / admin123")
        print("- 5 categorias de cursos criadas")
        print("- 3 instrutores criados")
        print("- 5 cursos de exemplo criados")
        print("- 3 usuários de exemplo criados")
        print("- Matrículas e conquistas de exemplo criadas")
        
    except Exception as e:
        print(f"\n❌ Erro ao configurar banco de dados: {str(e)}")
        return False
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 