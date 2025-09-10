from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from django.apps import apps
from django.contrib.auth import get_user_model

# Get models safely
Course = apps.get_model('courses', 'Course')
Category = apps.get_model('courses', 'Category')
User = get_user_model()

class Command(BaseCommand):
    help = 'Atualiza os preços dos cursos com valores mais realistas'

    def handle(self, *args, **options):
        # Buscar usuário admin ou criar um
        try:
            admin_user = User.objects.get(username='admin')
        except User.DoesNotExist:
            admin_user = User.objects.create_superuser('admin', 'admin@fenixacademy.com', 'admin123')

        # Preços atualizados baseados na nova estratégia
        updated_prices = {
            'Pensamento Computacional': 14999,  # R$ 149,99
            'Programação Orientada a Objetos': 24999,  # R$ 249,99
            'APIs e Integração': 39999,  # R$ 399,99
            'DevOps e Deploy': 49999,  # R$ 499,99
            'Algoritmos de Ordenação': 19999,  # R$ 199,99
            'Recursão e Backtracking': 27499,  # R$ 274,99
            'Grafos e Árvores': 32499,  # R$ 324,99
            'Programação Dinâmica': 39999,  # R$ 399,99
            'Concorrência e Paralelismo': 44999,  # R$ 449,99
            'Arquitetura de Software': 49999,  # R$ 499,99
            'Testes e Qualidade': 22499,  # R$ 224,99
            'Otimização de Performance': 32499,  # R$ 324,99
        }

        with transaction.atomic():
            updated_count = 0
            for course_title, new_price in updated_prices.items():
                try:
                    course = Course.objects.get(title=course_title)
                    old_price = course.price
                    
                    course.price = new_price
                    course.save()
                    
                    self.stdout.write(
                        self.style.SUCCESS(
                            f'✅ {course.title} - '
                            f'BRL: R$ {old_price/100:.2f} → R$ {new_price/100:.2f}'
                        )
                    )
                    updated_count += 1
                    
                except Course.DoesNotExist:
                    self.stdout.write(
                        self.style.WARNING(f'⚠️ Curso não encontrado: {course_title}')
                    )

        self.stdout.write(
            self.style.SUCCESS(f'📊 Total de cursos atualizados: {updated_count}')
        )
        
        # Mostrar resumo dos preços
        self.stdout.write('\n📋 Resumo dos Preços Atualizados:')
        self.stdout.write('=' * 80)
        
        courses = Course.objects.all().order_by('difficulty', 'title')
        for course in courses:
            self.stdout.write(
                f'{course.title:<35} | '
                f'BRL: R$ {course.price/100:<8.2f} | '
                f'{course.difficulty.title()}'
            ) 