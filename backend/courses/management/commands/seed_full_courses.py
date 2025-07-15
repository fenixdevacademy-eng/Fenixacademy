from django.core.management.base import BaseCommand
from courses.models import Course, Module, Lesson, Exercise, Category
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Popula o banco com cursos, módulos, lições e exercícios de exemplo.'

    def handle(self, *args, **kwargs):
        # Cria categoria
        cat, _ = Category.objects.get_or_create(name='Programação', defaults={
            'description': 'Cursos de programação',
            'color': '#FF6A00',
            'is_active': True
        })

        # Cria curso
        course, _ = Course.objects.get_or_create(
            title='Python para Iniciantes',
            defaults={
                'slug': 'python-para-iniciantes',
                'description': 'Aprenda Python do zero com projetos práticos.',
                'category': cat,
                'difficulty': 'beginner',
                'status': 'published',
                'price_brl': 497,
                'is_free': False,
            }
        )

        # Cria módulos
        for m in range(1, 4):
            module, _ = Module.objects.get_or_create(
                course=course,
                order=m,
                defaults={
                    'title': f'Módulo {m}',
                    'description': f'Conteúdo do módulo {m}',
                }
            )
            # Cria lições
            for l in range(1, 3):
                lesson, _ = Lesson.objects.get_or_create(
                    module=module,
                    order=l,
                    defaults={
                        'title': f'Lição {l} do Módulo {m}',
                        'content': f'Conteúdo da lição {l} do módulo {m}',
                        'lesson_type': 'text',
                    }
                )
                # Cria exercício para cada lição
                exercise, _ = Exercise.objects.get_or_create(
                    lesson=lesson,
                    order=1,
                    defaults={
                        'title': f'Exercício prático da Lição {l} do Módulo {m}',
                        'description': 'Resolva o desafio proposto.',
                        'exercise_type': 'coding',
                        'difficulty': 'easy',
                        'instructions': 'Implemente uma função que retorna "Hello, World!"',
                        'starter_code': 'def hello():\n    pass',
                        'solution_code': 'def hello():\n    return "Hello, World!"',
                        'test_cases': [{"input": "", "output": "Hello, World!"}],
                        'points': 10,
                    }
                )
        self.stdout.write(self.style.SUCCESS('Cursos, módulos, lições e exercícios de exemplo criados!')) 