import json
from django.core.management.base import BaseCommand, CommandError
from courses.models import Course, Module, Lesson, Exercise, Category
from django.core.files.base import ContentFile
import os

class Command(BaseCommand):
    help = 'Importa cursos completos de um arquivo JSON'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Caminho para o arquivo JSON')

    def handle(self, *args, **options):
        json_file = options['json_file']
        
        if not os.path.exists(json_file):
            raise CommandError(f'Arquivo {json_file} não encontrado')

        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                courses_data = json.load(f)
        except json.JSONDecodeError as e:
            raise CommandError(f'Erro ao decodificar JSON: {e}')
        except Exception as e:
            raise CommandError(f'Erro ao ler arquivo: {e}')

        created_courses = 0
        created_modules = 0
        created_lessons = 0
        created_exercises = 0

        for course_data in courses_data:
            # Cria ou obtém categoria
            category_name = course_data.get('category', 'Geral')
            category, _ = Category.objects.get_or_create(
                name=category_name,
                defaults={
                    'description': f'Categoria {category_name}',
                    'color': '#FF6A00',
                    'is_active': True
                }
            )

            # Cria curso
            course, created = Course.objects.get_or_create(
                slug=course_data['slug'],
                defaults={
                    'title': course_data['title'],
                    'description': course_data.get('description', ''),
                    'category': category,
                    'difficulty': course_data.get('difficulty', 'beginner'),
                    'status': course_data.get('status', 'draft'),
                    'price_brl': course_data.get('price_brl', 0),
                    'is_free': course_data.get('is_free', True),
                }
            )
            
            if created:
                created_courses += 1
                self.stdout.write(f'Curso criado: {course.title}')

            # Cria módulos
            for module_data in course_data.get('modules', []):
                module, created = Module.objects.get_or_create(
                    course=course,
                    title=module_data['title'],
                    defaults={
                        'description': module_data.get('description', ''),
                        'order': module_data.get('order', 1),
                    }
                )
                
                if created:
                    created_modules += 1

                # Cria lições
                for lesson_data in module_data.get('lessons', []):
                    lesson, created = Lesson.objects.get_or_create(
                        module=module,
                        title=lesson_data['title'],
                        defaults={
                            'content': lesson_data.get('content', ''),
                            'lesson_type': lesson_data.get('lesson_type', 'text'),
                            'order': lesson_data.get('order', 1),
                            'duration_minutes': lesson_data.get('duration_minutes', 30),
                        }
                    )
                    
                    if created:
                        created_lessons += 1

                    # Cria exercícios
                    for exercise_data in lesson_data.get('exercises', []):
                        exercise, created = Exercise.objects.get_or_create(
                            lesson=lesson,
                            title=exercise_data['title'],
                            defaults={
                                'description': exercise_data.get('description', ''),
                                'exercise_type': exercise_data.get('exercise_type', 'coding'),
                                'difficulty': exercise_data.get('difficulty', 'easy'),
                                'instructions': exercise_data.get('instructions', ''),
                                'starter_code': exercise_data.get('starter_code', ''),
                                'solution_code': exercise_data.get('solution_code', ''),
                                'test_cases': exercise_data.get('test_cases', []),
                                'points': exercise_data.get('points', 10),
                                'order': exercise_data.get('order', 1),
                            }
                        )
                        
                        if created:
                            created_exercises += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Importação concluída!\n'
                f'Cursos criados: {created_courses}\n'
                f'Módulos criados: {created_modules}\n'
                f'Lições criadas: {created_lessons}\n'
                f'Exercícios criados: {created_exercises}'
            )
        ) 