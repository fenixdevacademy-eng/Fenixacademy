"""
Script adicional para adicionar mais cursos com preços variados
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from courses.models import Category, Course
from django.db import transaction

User = get_user_model()

class Command(BaseCommand):
    help = 'Adiciona mais cursos com preços variados'

    def handle(self, *args, **options):
        self.stdout.write('🚀 Adicionando mais cursos...')
        
        admin_user = User.objects.filter(is_superuser=True).first()
        if not admin_user:
            admin_user = User.objects.create_superuser('admin', 'admin@fenixacademy.com', 'admin123')

        # Buscar categorias existentes
        categories = {cat.name: cat for cat in Category.objects.all()}
        
        additional_courses = [
            {
                'title': 'Pensamento Computacional',
                'title_en': 'Computational Thinking',
                'subtitle': 'Desenvolva habilidades de resolução de problemas',
                'subtitle_en': 'Develop problem-solving skills',
                'description': 'Aprenda a pensar como um cientista da computação, desenvolvendo habilidades de abstração, decomposição e reconhecimento de padrões.',
                'description_en': 'Learn to think like a computer scientist, developing skills in abstraction, decomposition and pattern recognition.',
                'category': categories.get('Fundamentos da Computação'),
                'difficulty': 'beginner',
                'price_usd': 1499,  # $14.99
                'price_brl': 7499,  # R$ 74,99
                'duration_hours': 30,
                'total_lessons': 20,
                'total_exercises': 40,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'Programação Orientada a Objetos',
                'title_en': 'Object-Oriented Programming',
                'subtitle': 'Aprenda POO com projetos práticos',
                'subtitle_en': 'Learn OOP with practical projects',
                'description': 'Domine os conceitos de orientação a objetos, herança, polimorfismo e encapsulamento através de projetos práticos.',
                'description_en': 'Master object-oriented concepts, inheritance, polymorphism and encapsulation through practical projects.',
                'category': categories.get('Programação e Algoritmos'),
                'difficulty': 'intermediate',
                'price_usd': 2499,  # $24.99
                'price_brl': 12499,  # R$ 124,99
                'duration_hours': 45,
                'total_lessons': 28,
                'total_exercises': 60,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'APIs e Integração',
                'title_en': 'APIs and Integration',
                'subtitle': 'REST, GraphQL e microserviços',
                'subtitle_en': 'REST, GraphQL and microservices',
                'description': 'Desenvolva APIs modernas usando REST e GraphQL, e aprenda sobre arquitetura de microserviços.',
                'description_en': 'Develop modern APIs using REST and GraphQL, and learn about microservices architecture.',
                'category': categories.get('Banco de Dados e APIs'),
                'difficulty': 'advanced',
                'price_usd': 4499,  # $44.99
                'price_brl': 22499,  # R$ 224,99
                'duration_hours': 75,
                'total_lessons': 42,
                'total_exercises': 95,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'DevOps e Deploy',
                'title_en': 'DevOps and Deployment',
                'subtitle': 'CI/CD, containers e cloud',
                'subtitle_en': 'CI/CD, containers and cloud',
                'description': 'Aprenda práticas DevOps, CI/CD, containers Docker, Kubernetes e deploy em cloud.',
                'description_en': 'Learn DevOps practices, CI/CD, Docker containers, Kubernetes and cloud deployment.',
                'category': categories.get('Segurança e DevOps'),
                'difficulty': 'advanced',
                'price_usd': 5499,  # $54.99
                'price_brl': 27499,  # R$ 274,99
                'duration_hours': 95,
                'total_lessons': 55,
                'total_exercises': 130,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'Algoritmos de Ordenação',
                'title_en': 'Sorting Algorithms',
                'subtitle': 'Análise e implementação de algoritmos',
                'subtitle_en': 'Analysis and implementation of algorithms',
                'description': 'Estudo aprofundado de algoritmos de ordenação, análise de complexidade e otimização.',
                'description_en': 'In-depth study of sorting algorithms, complexity analysis and optimization.',
                'category': categories.get('Programação e Algoritmos'),
                'difficulty': 'intermediate',
                'price_usd': 1999,  # $19.99
                'price_brl': 9999,  # R$ 99,99
                'duration_hours': 35,
                'total_lessons': 22,
                'total_exercises': 55,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'Recursão e Backtracking',
                'title_en': 'Recursion and Backtracking',
                'subtitle': 'Técnicas avançadas de resolução de problemas',
                'subtitle_en': 'Advanced problem-solving techniques',
                'description': 'Domine técnicas de recursão, backtracking e programação dinâmica para resolver problemas complexos.',
                'description_en': 'Master recursion, backtracking and dynamic programming techniques to solve complex problems.',
                'category': categories.get('Programação e Algoritmos'),
                'difficulty': 'advanced',
                'price_usd': 2999,  # $29.99
                'price_brl': 14999,  # R$ 149,99
                'duration_hours': 45,
                'total_lessons': 28,
                'total_exercises': 75,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'Grafos e Árvores',
                'title_en': 'Graphs and Trees',
                'subtitle': 'Estruturas de dados hierárquicas',
                'subtitle_en': 'Hierarchical data structures',
                'description': 'Estudo aprofundado de grafos, árvores e algoritmos relacionados como busca em largura e profundidade.',
                'description_en': 'In-depth study of graphs, trees and related algorithms such as breadth-first and depth-first search.',
                'category': categories.get('Programação e Algoritmos'),
                'difficulty': 'advanced',
                'price_usd': 3499,  # $34.99
                'price_brl': 17499,  # R$ 174,99
                'duration_hours': 55,
                'total_lessons': 32,
                'total_exercises': 85,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'Programação Dinâmica',
                'title_en': 'Dynamic Programming',
                'subtitle': 'Otimização de algoritmos recursivos',
                'subtitle_en': 'Optimization of recursive algorithms',
                'description': 'Aprenda técnicas de programação dinâmica para otimizar algoritmos recursivos e resolver problemas complexos.',
                'description_en': 'Learn dynamic programming techniques to optimize recursive algorithms and solve complex problems.',
                'category': categories.get('Programação e Algoritmos'),
                'difficulty': 'expert',
                'price_usd': 3999,  # $39.99
                'price_brl': 19999,  # R$ 199,99
                'duration_hours': 65,
                'total_lessons': 38,
                'total_exercises': 95,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'Concorrência e Paralelismo',
                'title_en': 'Concurrency and Parallelism',
                'subtitle': 'Programação multithread e assíncrona',
                'subtitle_en': 'Multithread and asynchronous programming',
                'description': 'Aprenda sobre concorrência, paralelismo, threads, processos e programação assíncrona.',
                'description_en': 'Learn about concurrency, parallelism, threads, processes and asynchronous programming.',
                'category': categories.get('Programação e Algoritmos'),
                'difficulty': 'expert',
                'price_usd': 4499,  # $44.99
                'price_brl': 22499,  # R$ 224,99
                'duration_hours': 75,
                'total_lessons': 45,
                'total_exercises': 110,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'Arquitetura de Software',
                'title_en': 'Software Architecture',
                'subtitle': 'Padrões e princípios de design',
                'subtitle_en': 'Design patterns and principles',
                'description': 'Aprenda sobre arquitetura de software, padrões de design, SOLID e boas práticas de desenvolvimento.',
                'description_en': 'Learn about software architecture, design patterns, SOLID and good development practices.',
                'category': categories.get('Desenvolvimento Web'),
                'difficulty': 'expert',
                'price_usd': 4999,  # $49.99
                'price_brl': 24999,  # R$ 249,99
                'duration_hours': 85,
                'total_lessons': 50,
                'total_exercises': 125,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'Testes e Qualidade',
                'title_en': 'Testing and Quality',
                'subtitle': 'TDD, BDD e garantia de qualidade',
                'subtitle_en': 'TDD, BDD and quality assurance',
                'description': 'Aprenda sobre testes unitários, integração, TDD, BDD e práticas de garantia de qualidade.',
                'description_en': 'Learn about unit testing, integration, TDD, BDD and quality assurance practices.',
                'category': categories.get('Desenvolvimento Web'),
                'difficulty': 'intermediate',
                'price_usd': 2499,  # $24.99
                'price_brl': 12499,  # R$ 124,99
                'duration_hours': 40,
                'total_lessons': 25,
                'total_exercises': 65,
                'is_featured': False,
                'is_free': False,
            },
            {
                'title': 'Otimização de Performance',
                'title_en': 'Performance Optimization',
                'subtitle': 'Técnicas de otimização e profiling',
                'subtitle_en': 'Optimization techniques and profiling',
                'description': 'Aprenda técnicas de otimização de performance, profiling e monitoramento de aplicações.',
                'description_en': 'Learn performance optimization techniques, profiling and application monitoring.',
                'category': categories.get('Desenvolvimento Web'),
                'difficulty': 'advanced',
                'price_usd': 3499,  # $34.99
                'price_brl': 17499,  # R$ 174,99
                'duration_hours': 60,
                'total_lessons': 35,
                'total_exercises': 85,
                'is_featured': False,
                'is_free': False,
            },
        ]

        with transaction.atomic():
            for course_data in additional_courses:
                if not course_data['category']:
                    continue
                    
                course, created = Course.objects.get_or_create(
                    title=course_data['title'],
                    defaults={
                        **course_data,
                        'created_by': admin_user,
                        'status': 'published',
                        'published_at': timezone.now(),
                    }
                )
                
                if created:
                    self.stdout.write(
                        self.style.SUCCESS(
                            f'✅ Curso criado: {course.title} - '
                            f'USD {course.price_formatted_usd} / '
                            f'BRL {course.price_formatted_brl}'
                        )
                    )

        self.stdout.write(
            self.style.SUCCESS(f'📊 Total de cursos: {Course.objects.count()}')
        )
