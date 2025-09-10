from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Cria o superusuário Cezar Camara Lins'

    def handle(self, *args, **options):
        if not User.objects.filter(email='cezar@fenixacademy.com').exists():
            User.objects.create_superuser(
                username='cezar',
                email='cezar@fenixacademy.com',
                password='senha-forte-123',
                is_founder=True,
                founder_benefits_granted=True,
                first_name='Cezar',
                last_name='Camara Lins',
            )
            self.stdout.write(
                self.style.SUCCESS('Superusuário Cezar Camara Lins criado com sucesso!')
            )
        else:
            self.stdout.write(
                self.style.WARNING('Superusuário Cezar Camara Lins já existe!')
            ) 