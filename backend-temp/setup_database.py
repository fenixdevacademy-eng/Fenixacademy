#!/usr/bin/env python
"""
Script para configurar o banco de dados e executar migrações
"""
import os
import sys
import django
from django.core.management import execute_from_command_line
from django.db import connection
from django.conf import settings

def setup_database():
    """Configurar banco de dados e executar migrações"""
    
    # Configurar Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fenix_academy.settings')
    django.setup()
    
    print("🚀 Configurando banco de dados da Fênix Academy...")
    
    try:
        # Verificar conexão com o banco
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        print("✅ Conexão com o banco de dados estabelecida")
        
        # Executar migrações
        print("📦 Executando migrações...")
        execute_from_command_line(['manage.py', 'migrate'])
        print("✅ Migrações executadas com sucesso")
        
        # Criar superusuário se não existir
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        if not User.objects.filter(is_superuser=True).exists():
            print("👤 Criando superusuário...")
            User.objects.create_superuser(
                username='admin',
                email='admin@fenixacademy.com',
                password='admin123',
                first_name='Admin',
                last_name='Fênix'
            )
            print("✅ Superusuário criado: admin / admin123")
        else:
            print("ℹ️ Superusuário já existe")
        
        # Criar dados de exemplo
        print("📊 Criando dados de exemplo...")
        create_sample_data()
        print("✅ Dados de exemplo criados")
        
        print("🎉 Configuração do banco de dados concluída!")
        
    except Exception as e:
        print(f"❌ Erro ao configurar banco de dados: {e}")
        sys.exit(1)

def create_sample_data():
    """Criar dados de exemplo para demonstração"""
    from django.contrib.auth import get_user_model
    from courses.models import Category, Course, Module, Lesson, Exercise
    from progress.models import UserProgress, CourseProgress, UserAchievement
    from users.models import User
    
    User = get_user_model()
    
    # Criar categorias
    categories_data = [
        {'name': 'Programação', 'name_pt': 'Programação', 'description': 'Cursos de programação e desenvolvimento'},
        {'name': 'Web Development', 'name_pt': 'Desenvolvimento Web', 'description': 'Cursos de desenvolvimento web'},
        {'name': 'Data Science', 'name_pt': 'Ciência de Dados', 'description': 'Cursos de ciência de dados e análise'},
        {'name': 'Mobile', 'name_pt': 'Desenvolvimento Mobile', 'description': 'Cursos de desenvolvimento mobile'},
    ]
    
    categories = []
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            name=cat_data['name'],
            defaults=cat_data
        )
        categories.append(category)
    
    # Criar usuário de exemplo
    user, created = User.objects.get_or_create(
        email='usuario@exemplo.com',
        defaults={
            'username': 'usuario_exemplo',
            'first_name': 'João',
            'last_name': 'Silva',
            'bio': 'Desenvolvedor apaixonado por tecnologia',
            'skill_level': 'intermediate',
            'preferred_language': 'pt',
            'country': 'Brasil',
            'city': 'São Paulo',
            'is_verified': True,
            'email_verified': True,
        }
    )
    
    if created:
        user.set_password('123456')
        user.save()
    
    # Criar progresso do usuário
    progress, created = UserProgress.objects.get_or_create(
        user=user,
        defaults={
            'total_courses_enrolled': 0,
            'total_courses_completed': 0,
            'total_lessons_completed': 0,
            'total_exercises_completed': 0,
            'total_study_hours': 0,
            'total_points_earned': 0,
            'current_streak_days': 5,
            'longest_streak_days': 15,
            'current_level': 3,
            'experience_points': 250,
            'experience_to_next_level': 300,
        }
    )
    
    # Criar cursos de exemplo
    courses_data = [
        {
            'title': 'Python para Iniciantes',
            'title_pt': 'Python para Iniciantes',
            'description': 'Aprenda Python do zero',
            'description_pt': 'Aprenda Python do zero',
            'slug': 'python-iniciantes',
            'category': categories[0],
            'difficulty': 'beginner',
            'price': 0,
            'is_free': True,
            'duration_hours': 20,
            'total_lessons': 15,
            'total_exercises': 25,
            'status': 'published',
        },
        {
            'title': 'React Avançado',
            'title_pt': 'React Avançado',
            'description': 'React com hooks e context',
            'description_pt': 'React com hooks e context',
            'slug': 'react-avancado',
            'category': categories[1],
            'difficulty': 'advanced',
            'price': 199.90,
            'is_free': False,
            'duration_hours': 30,
            'total_lessons': 20,
            'total_exercises': 35,
            'status': 'published',
        },
        {
            'title': 'Machine Learning com Python',
            'title_pt': 'Machine Learning com Python',
            'description': 'Introdução ao ML com Python',
            'description_pt': 'Introdução ao ML com Python',
            'slug': 'machine-learning-python',
            'category': categories[2],
            'difficulty': 'intermediate',
            'price': 299.90,
            'is_free': False,
            'duration_hours': 40,
            'total_lessons': 25,
            'total_exercises': 40,
            'status': 'published',
        }
    ]
    
    courses = []
    for course_data in courses_data:
        course, created = Course.objects.get_or_create(
            slug=course_data['slug'],
            defaults=course_data
        )
        courses.append(course)
    
    # Criar módulos e lições para o primeiro curso
    if courses:
        course = courses[0]
        
        modules_data = [
            {
                'title': 'Introdução ao Python',
                'title_pt': 'Introdução ao Python',
                'description': 'Conceitos básicos do Python',
                'description_pt': 'Conceitos básicos do Python',
                'order': 1,
            },
            {
                'title': 'Estruturas de Dados',
                'title_pt': 'Estruturas de Dados',
                'description': 'Listas, tuplas e dicionários',
                'description_pt': 'Listas, tuplas e dicionários',
                'order': 2,
            },
        ]
        
        for module_data in modules_data:
            module, created = Module.objects.get_or_create(
                course=course,
                order=module_data['order'],
                defaults=module_data
            )
            
            # Criar lições para cada módulo
            lessons_data = [
                {
                    'title': f'L{i+1}: {module.title} - Parte {i+1}',
                    'title_pt': f'L{i+1}: {module.title} - Parte {i+1}',
                    'content': f'Conteúdo da lição {i+1} do módulo {module.title}',
                    'content_pt': f'Conteúdo da lição {i+1} do módulo {module.title}',
                    'lesson_type': 'video',
                    'order': i+1,
                    'video_duration': 600,  # 10 minutos
                }
                for i in range(3)
            ]
            
            for lesson_data in lessons_data:
                lesson, created = Lesson.objects.get_or_create(
                    module=module,
                    order=lesson_data['order'],
                    defaults=lesson_data
                )
    
    # Criar progresso do curso para o usuário
    if courses:
        course_progress, created = CourseProgress.objects.get_or_create(
            user=user,
            course=courses[0],
            defaults={
                'progress_percentage': 45.5,
                'total_time_spent': 180,  # 3 horas
                'is_active': True,
            }
        )
    
    # Criar conquistas de exemplo
    achievements_data = [
        {
            'title': 'Primeiro Curso',
            'title_pt': 'Primeiro Curso',
            'description': 'Completou o primeiro curso',
            'description_pt': 'Completou o primeiro curso',
            'achievement_type': 'first_course',
            'difficulty': 'bronze',
            'icon': '🎓',
            'color': '#CD7F32',
            'points_earned': 50,
        },
        {
            'title': 'Estudioso Dedicado',
            'title_pt': 'Estudioso Dedicado',
            'description': 'Manteve uma sequência de 5 dias estudando',
            'description_pt': 'Manteve uma sequência de 5 dias estudando',
            'achievement_type': 'streak',
            'difficulty': 'silver',
            'icon': '🔥',
            'color': '#C0C0C0',
            'points_earned': 100,
        },
    ]
    
    for achievement_data in achievements_data:
        UserAchievement.objects.get_or_create(
            user=user,
            title=achievement_data['title'],
            defaults=achievement_data
        )

if __name__ == '__main__':
    setup_database()














