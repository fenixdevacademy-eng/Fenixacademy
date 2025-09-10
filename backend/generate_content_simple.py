#!/usr/bin/env python3
"""
Script simples para gerar conteúdo dos cursos
"""

import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fenix_academy.settings.local')

# Adicionar o diretório atual ao path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

django.setup()

from courses.models import Category, Course, Module, Lesson, Exercise
from django.contrib.auth import get_user_model

User = get_user_model()

def create_simple_content():
    """Criar conteúdo simples para os cursos"""
    
    print("🎓 Criando conteúdo simples para os cursos...")
    
    # Criar categoria
    category, created = Category.objects.get_or_create(
        name='Desenvolvimento Web'
    )
    print(f"✅ Categoria: {category.name}")
    
    # Criar ou obter usuário instrutor
    instructor, created = User.objects.get_or_create(
        username='joao_silva',
        defaults={
            'email': 'joao@fenixacademy.com',
            'first_name': 'João',
            'last_name': 'Silva',
            'is_staff': True
        }
    )
    print(f"✅ Instrutor: {instructor.get_full_name()}")
    
    # Criar curso
    course, created = Course.objects.get_or_create(
        title='Fundamentos de Desenvolvimento Web',
        defaults={
            'slug': 'fundamentos-desenvolvimento-web',
            'description': 'Aprenda HTML, CSS e JavaScript do zero.',
            'category': category,
            'difficulty': 'beginner',
            'status': 'published',
            'price': 197.00,
            'original_price': 297.00,
            'is_free': False,
            'duration_hours': 80,
            'total_lessons': 80,
            'total_exercises': 240,
            'instructor': instructor
        }
    )
    print(f"✅ Curso: {course.title}")
    
    # Criar módulo
    module, created = Module.objects.get_or_create(
        course=course,
        title='Introdução ao Desenvolvimento Web',
        defaults={
            'description': 'Conceitos básicos e configuração do ambiente',
            'order': 1
        }
    )
    print(f"✅ Módulo: {module.title}")
    
    # Criar aulas
    lessons_data = [
        {
            'title': 'O que é Desenvolvimento Web?',
            'content': '# Introdução ao Desenvolvimento Web\n\nO desenvolvimento web é o processo de criação de sites e aplicações web.',
            'video_duration': 1800,
            'lesson_type': 'video'
        },
        {
            'title': 'História da Web',
            'content': '# História da World Wide Web\n\nA World Wide Web foi criada em 1989 por Tim Berners-Lee.',
            'video_duration': 1800,
            'lesson_type': 'video'
        },
        {
            'title': 'Ferramentas Essenciais',
            'content': '# Ferramentas Essenciais\n\nVS Code, navegadores, Git e outras ferramentas importantes.',
            'video_duration': 3600,
            'lesson_type': 'video'
        }
    ]
    
    for i, lesson_data in enumerate(lessons_data):
        lesson, created = Lesson.objects.get_or_create(
            module=module,
            title=lesson_data['title'],
            defaults={
                'content': lesson_data['content'],
                'video_duration': lesson_data['video_duration'],
                'order': i + 1,
                'lesson_type': lesson_data['lesson_type']
            }
        )
        print(f"✅ Aula: {lesson.title}")
        
        # Criar exercícios para cada aula
        exercises_data = [
            {
                'title': 'Questionário sobre o conteúdo',
                'description': 'Responda 5 perguntas sobre o que foi aprendido nesta aula.',
                'instructions': 'Leia atentamente o conteúdo da aula e responda as perguntas.',
                'exercise_type': 'multiple_choice',
                'difficulty': 'easy'
            },
            {
                'title': 'Exercício prático',
                'description': 'Aplique os conceitos aprendidos em um projeto prático.',
                'instructions': 'Crie um projeto simples aplicando os conceitos da aula.',
                'exercise_type': 'coding',
                'difficulty': 'medium'
            }
        ]
        
        for j, exercise_data in enumerate(exercises_data):
            exercise, created = Exercise.objects.get_or_create(
                lesson=lesson,
                title=exercise_data['title'],
                defaults={
                    'description': exercise_data['description'],
                    'instructions': exercise_data['instructions'],
                    'exercise_type': exercise_data['exercise_type'],
                    'difficulty': exercise_data['difficulty'],
                    'order': j + 1
                }
            )
            print(f"✅ Exercício: {exercise.title}")
    
    print("\n📊 Resumo:")
    print(f"   - Cursos: {Course.objects.count()}")
    print(f"   - Módulos: {Module.objects.count()}")
    print(f"   - Aulas: {Lesson.objects.count()}")
    print(f"   - Exercícios: {Exercise.objects.count()}")
    print("\n✅ Conteúdo criado com sucesso!")

if __name__ == '__main__':
    create_simple_content() 