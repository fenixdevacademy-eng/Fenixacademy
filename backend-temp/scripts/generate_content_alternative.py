#!/usr/bin/env python3
"""
Script alternativo para gerar conteúdo dos cursos usando manage.py
"""

import os
import sys
import subprocess

def run_django_command(command):
    """Executar comando Django usando manage.py"""
    try:
        result = subprocess.run(
            ['python', 'manage.py', 'shell', '-c', command],
            cwd='backend',
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro ao executar comando: {e}")
        print(f"Stderr: {e.stderr}")
        return None

def create_course_content():
    """Gerar conteúdo dos cursos usando comandos Django"""
    
    print("🎓 Gerando conteúdo dos cursos...")
    
    # Comando para criar conteúdo
    command = '''
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fenix_academy.settings.local')
django.setup()

from courses.models import Category, Course, Module, Lesson, Exercise

# Dados dos cursos
courses_data = [
    {
        'title': 'Fundamentos de Desenvolvimento Web',
        'description': 'Aprenda HTML, CSS e JavaScript do zero.',
        'instructor': 'João Silva',
        'level': 'beginner',
        'price': 19700,
        'category': 'Desenvolvimento Web',
        'modules': [
            {
                'title': 'Introdução ao Desenvolvimento Web',
                'description': 'Conceitos básicos e configuração do ambiente',
                'lessons': [
                    {
                        'title': 'O que é Desenvolvimento Web?',
                        'content': '# Introdução ao Desenvolvimento Web\\n\\nO desenvolvimento web é o processo de criação de sites e aplicações web.',
                        'video_duration': 1800,
                        'type': 'video'
                    },
                    {
                        'title': 'História da Web',
                        'content': '# História da World Wide Web\\n\\nA World Wide Web foi criada em 1989 por Tim Berners-Lee.',
                        'video_duration': 1800,
                        'type': 'video'
                    }
                ]
            }
        ]
    },
    {
        'title': 'Python para Iniciantes',
        'description': 'Aprenda Python do zero e construa seus primeiros programas',
        'instructor': 'Maria Santos',
        'level': 'beginner',
        'price': 19700,
        'category': 'Programação',
        'modules': [
            {
                'title': 'Introdução ao Python',
                'description': 'Conceitos básicos e primeira execução',
                'lessons': [
                    {
                        'title': 'O que é Python?',
                        'content': '# O que é Python?\\n\\nPython é uma linguagem de programação de alto nível.',
                        'video_duration': 1800,
                        'type': 'video'
                    },
                    {
                        'title': 'Instalando Python',
                        'content': '# Instalando Python\\n\\nAprenda como instalar o Python em diferentes sistemas.',
                        'video_duration': 3600,
                        'type': 'video'
                    }
                ]
            }
        ]
    }
]

# Criar conteúdo
for course_data in courses_data:
    # Criar categoria
    category, created = Category.objects.get_or_create(name=course_data['category'])
    print(f"Categoria: {category.name}")
    
    # Criar curso
    course, created = Course.objects.get_or_create(
        title=course_data['title'],
        defaults={
            'description': course_data['description'],
            'instructor': course_data['instructor'],
            'level': course_data['level'],
            'price': course_data['price'],
            'category': category,
            'duration': '80 horas',
            'lessons_count': 80,
            'students_count': 1247,
            'rating': 4.8,
            'certificate': True
        }
    )
    print(f"Curso: {course.title}")
    
    # Criar módulos
    for module_index, module_data in enumerate(course_data['modules']):
        module, created = Module.objects.get_or_create(
            course=course,
            title=module_data['title'],
            defaults={
                'description': module_data['description'],
                'order': module_index + 1
            }
        )
        print(f"  Módulo: {module.title}")
        
        # Criar aulas
        for lesson_index, lesson_data in enumerate(module_data['lessons']):
            lesson, created = Lesson.objects.get_or_create(
                module=module,
                title=lesson_data['title'],
                defaults={
                    'content': lesson_data['content'],
                    'video_duration': lesson_data['video_duration'],
                    'order': lesson_index + 1,
                    'lesson_type': lesson_data['type']
                }
            )
            print(f"    Aula: {lesson.title}")
            
            # Criar exercícios
            exercises = [
                {
                    'title': 'Questionário sobre o conteúdo',
                    'content': 'Responda 5 perguntas sobre o que foi aprendido.',
                    'type': 'quiz'
                },
                {
                    'title': 'Exercício prático',
                    'content': 'Aplique os conceitos aprendidos em um projeto.',
                    'type': 'practice'
                }
            ]
            
            for exercise_index, exercise_data in enumerate(exercises):
                exercise, created = Exercise.objects.get_or_create(
                    lesson=lesson,
                    title=exercise_data['title'],
                    defaults={
                        'content': exercise_data['content'],
                        'exercise_type': exercise_data['type'],
                        'order': exercise_index + 1
                    }
                )
                print(f"      Exercício: {exercise.title}")

print("✅ Conteúdo gerado com sucesso!")
print(f"Cursos: {Course.objects.count()}")
print(f"Módulos: {Module.objects.count()}")
print(f"Aulas: {Lesson.objects.count()}")
print(f"Exercícios: {Exercise.objects.count()}")
'''
    
    # Executar o comando
    result = run_django_command(command)
    
    if result:
        print("✅ Conteúdo gerado com sucesso!")
        print(result)
    else:
        print("❌ Erro ao gerar conteúdo")

def main():
    """Função principal"""
    print("🚀 Gerador de Conteúdo - Fenix Academy")
    print("=" * 50)
    
    # Verificar se estamos no diretório correto
    if not os.path.exists('manage.py'):
        print("❌ Erro: execute este script do diretório backend/")
        return
    
    create_course_content()

if __name__ == '__main__':
    main() 