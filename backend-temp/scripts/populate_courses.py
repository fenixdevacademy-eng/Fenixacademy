#!/usr/bin/env python
"""
Script para popular automaticamente todos os cursos com conteúdo completo
"""
import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fenix_academy.settings')
django.setup()

from courses.models import Course, Module, Lesson, Exercise, Category
from django.contrib.auth import get_user_model
from django.utils import timezone
import random

def create_categories():
    """Cria categorias básicas"""
    categories = {
        'Programação': {'color': '#FF6A00', 'description': 'Cursos de programação e desenvolvimento'},
        'Desenvolvimento Web': {'color': '#2563EB', 'description': 'Frontend, Backend e Full Stack'},
        'Banco de Dados': {'color': '#059669', 'description': 'SQL, NoSQL e modelagem de dados'},
        'DevOps': {'color': '#7C3AED', 'description': 'Deploy, CI/CD e infraestrutura'},
        'Fundamentos da Computação': {'color': '#DC2626', 'description': 'Conceitos básicos de computação'},
        'Programação e Algoritmos': {'color': '#EA580C', 'description': 'Algoritmos e estruturas de dados'},
        'Segurança e DevOps': {'color': '#7C2D12', 'description': 'Segurança e práticas DevOps'}
    }
    
    created_categories = {}
    for name, data in categories.items():
        cat, created = Category.objects.get_or_create(name=name, defaults={
            'description': data['description'],
            'color': data['color'],
            'is_active': True
        })
        created_categories[name] = cat
        if created:
            print(f'✅ Categoria criada: {name}')
    
    return created_categories

def create_basic_courses(categories):
    """Cria cursos básicos se não existirem"""
    basic_courses = [
        {
            'title': 'Python para Iniciantes',
            'slug': 'python-para-iniciantes',
            'description': 'Aprenda Python do zero com projetos práticos e exercícios interativos.',
            'category': categories['Programação'],
            'difficulty': 'beginner',
            'price': 497,
            'is_free': False,
        },
        {
            'title': 'JavaScript Moderno',
            'slug': 'javascript-moderno',
            'description': 'Aprenda JavaScript ES6+ com projetos práticos e frameworks modernos.',
            'category': categories['Desenvolvimento Web'],
            'difficulty': 'intermediate',
            'price': 697,
            'is_free': False,
        },
        {
            'title': 'React com Next.js',
            'slug': 'react-nextjs',
            'description': 'Desenvolva aplicações web modernas com React e Next.js.',
            'category': categories['Desenvolvimento Web'],
            'difficulty': 'advanced',
            'price': 897,
            'is_free': False,
        }
    ]
    
    for course_data in basic_courses:
        course, created = Course.objects.get_or_create(
            slug=course_data['slug'],
            defaults=course_data
        )
        if created:
            print(f'✅ Curso criado: {course.title}')

def add_content_to_courses():
    """Adiciona conteúdo completo aos cursos"""
    # Buscar usuário admin
    User = get_user_model()
    admin_user = User.objects.filter(is_superuser=True).first()
    if not admin_user:
        admin_user = User.objects.create_superuser('admin', 'admin@fenixacademy.com', 'admin123')
    
    # Conteúdo por curso
    course_content = {
        'python-para-iniciantes': {
            'modules': [
                {
                    'title': 'Fundamentos do Python',
                    'lessons': [
                        {
                            'title': 'Introdução ao Python',
                            'content': '''Python é uma linguagem de programação de alto nível, interpretada e de propósito geral.

**Características do Python:**
- Sintaxe simples e legível
- Tipagem dinâmica
- Orientação a objetos
- Grande biblioteca padrão
- Comunidade ativa

**Por que aprender Python?**
- Excelente para iniciantes
- Muito versátil (web, data science, IA, automação)
- Alta demanda no mercado
- Salários competitivos''',
                            'exercises': [
                                {
                                    'title': 'Primeiro Programa',
                                    'description': 'Crie seu primeiro programa em Python',
                                    'instructions': 'Escreva um programa que imprima "Olá, Mundo!" na tela',
                                    'starter_code': '# Escreva seu código aqui\n',
                                    'solution_code': 'print("Olá, Mundo!")',
                                    'test_cases': [{"input": "", "output": "Olá, Mundo!"}],
                                    'points': 10
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    
    # Processar cada curso
    for slug, data in course_content.items():
        try:
            course = Course.objects.get(slug=slug)
            print(f'📚 Adicionando conteúdo ao curso: {course.title}')
            
            for module_index, module_data in enumerate(data['modules'], 1):
                module, created = Module.objects.get_or_create(
                    course=course,
                    order=module_index,
                    defaults={
                        'title': module_data['title'],
                        'description': module_data.get('description', ''),
                    }
                )
                
                if created:
                    print(f'  ✅ Módulo criado: {module.title}')
                
                for lesson_index, lesson_data in enumerate(module_data['lessons'], 1):
                    lesson, created = Lesson.objects.get_or_create(
                        module=module,
                        order=lesson_index,
                        defaults={
                            'title': lesson_data['title'],
                            'content': lesson_data['content'],
                            'lesson_type': 'text',
                            'video_duration': 30 * 60,  # 30 minutos
                        }
                    )
                    
                    if created:
                        print(f'    ✅ Lição criada: {lesson.title}')
                    
                    for exercise_index, exercise_data in enumerate(lesson_data.get('exercises', []), 1):
                        exercise, created = Exercise.objects.get_or_create(
                            lesson=lesson,
                            order=exercise_index,
                            defaults={
                                'title': exercise_data['title'],
                                'description': exercise_data['description'],
                                'exercise_type': 'coding',
                                'difficulty': 'easy',
                                'instructions': exercise_data['instructions'],
                                'starter_code': exercise_data.get('starter_code', ''),
                                'solution_code': exercise_data['solution_code'],
                                'test_cases': exercise_data['test_cases'],
                                'points': exercise_data['points'],
                            }
                        )
                        
                        if created:
                            print(f'      ✅ Exercício criado: {exercise.title}')
                
        except Course.DoesNotExist:
            print(f'⚠️ Curso não encontrado: {slug}')

def main():
    """Função principal"""
    print('🚀 Iniciando população automática dos cursos...')
    
    # 1. Criar categorias
    print('\n📚 Criando categorias...')
    categories = create_categories()
    
    # 2. Criar cursos básicos
    print('\n📚 Criando cursos básicos...')
    create_basic_courses(categories)
    
    # 3. Adicionar conteúdo
    print('\n📚 Adicionando conteúdo aos cursos...')
    add_content_to_courses()
    
    # 4. Resumo final
    print('\n📊 Resumo final:')
    print(f'  - Categorias: {Category.objects.count()}')
    print(f'  - Cursos: {Course.objects.count()}')
    print(f'  - Módulos: {Module.objects.count()}')
    print(f'  - Lições: {Lesson.objects.count()}')
    print(f'  - Exercícios: {Exercise.objects.count()}')
    
    print('\n✅ População automática concluída com sucesso!')

if __name__ == '__main__':
    main() 