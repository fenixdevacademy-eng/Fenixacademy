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
            'Pensamento Computacional': {
                'price_usd': 2999,  # $29.99
                'price_brl': 14999,  # R$ 149,99
            },
            'Programação Orientada a Objetos': {
                'price_usd': 4999,  # $49.99
                'price_brl': 24999,  # R$ 249,99
            },
            'APIs e Integração': {
                'price_usd': 7999,  # $79.99
                'price_brl': 39999,  # R$ 399,99
            },
            'DevOps e Deploy': {
                'price_usd': 9999,  # $99.99
                'price_brl': 49999,  # R$ 499,99
            },
            'Algoritmos de Ordenação': {
                'price_usd': 3999,  # $39.99
                'price_brl': 19999,  # R$ 199,99
            },
            'Recursão e Backtracking': {
                'price_usd': 5499,  # $54.99
                'price_brl': 27499,  # R$ 274,99
            },
            'Grafos e Árvores': {
                'price_usd': 6499,  # $64.99
                'price_brl': 32499,  # R$ 324,99
            },
            'Programação Dinâmica': {
                'price_usd': 7999,  # $79.99
                'price_brl': 39999,  # R$ 399,99
            },
            'Concorrência e Paralelismo': {
                'price_usd': 8999,  # $89.99
                'price_brl': 44999,  # R$ 449,99
            },
            'Arquitetura de Software': {
                'price_usd': 9999,  # $99.99
                'price_brl': 49999,  # R$ 499,99
            },
            'Testes e Qualidade': {
                'price_usd': 4499,  # $44.99
                'price_brl': 22499,  # R$ 224,99
            },
            'Otimização de Performance': {
                'price_usd': 6499,  # $64.99
                'price_brl': 32499,  # R$ 324,99
            },
        }

        with transaction.atomic():
            updated_count = 0
            for course_title, new_prices in updated_prices.items():
                try:
                    course = Course.objects.get(title=course_title)
                    old_price_usd = course.price_usd
                    old_price_brl = course.price_brl
                    
                    course.price_usd = new_prices['price_usd']
                    course.price_brl = new_prices['price_brl']
                    course.save()
                    
                    self.stdout.write(
                        self.style.SUCCESS(
                            f'✅ {course.title} - '
                            f'USD: ${old_price_usd/100:.2f} → ${new_prices["price_usd"]/100:.2f} | '
                            f'BRL: R$ {old_price_brl/100:.2f} → R$ {new_prices["price_brl"]/100:.2f}'
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
                f'USD: ${course.price_usd/100:<6.2f} | '
                f'BRL: R$ {course.price_brl/100:<8.2f} | '
                f'{course.difficulty.title()}'
            ) 