from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class Command(BaseCommand):
    help = 'Cria super usuários para a Fenix Academy'

    def handle(self, *args, **options):
        self.stdout.write(
            self.style.SUCCESS('🚀 Criando Super Usuários para Fenix Academy')
        )
        self.stdout.write('=' * 50)

        # Lista de super usuários
        superusers = [
            {
                'email': 'cezarcamaralins0607@gmail.com',
                'password': 'cezarmarketing75',
                'first_name': 'Cezar',
                'last_name': 'Camaralins',
                'username': 'cezarcamaralins'
            },
            {
                'email': 'ls9229613@gmail.com',
                'password': 'CEO798',
                'first_name': 'CEO',
                'last_name': 'Fenix',
                'username': 'ceofenix'
            },
            {
                'email': 'robertdemoraes@gmail.com',
                'password': 'obrabo',
                'first_name': 'Robert',
                'last_name': 'de Moraes',
                'username': 'robertdemoraes'
            }
        ]

        created_users = []

        for i, user_data in enumerate(superusers, 1):
            self.stdout.write(f'\n📝 Criando super usuário {i}/3...')
            user = self.create_superuser(**user_data)
            if user:
                created_users.append(user)

        self.stdout.write('\n' + '=' * 50)
        self.stdout.write(
            self.style.SUCCESS('📊 Resumo da Criação de Super Usuários')
        )
        self.stdout.write('=' * 50)

        if created_users:
            self.stdout.write(
                self.style.SUCCESS(f'✅ {len(created_users)} super usuários criados/atualizados com sucesso!')
            )

            self.stdout.write('\n🔐 Credenciais dos Super Usuários:')
            self.stdout.write('-' * 40)

            for user in created_users:
                self.stdout.write(f'📧 Email: {user.email}')
                self.stdout.write(f'👤 Nome: {user.get_full_name()}')
                self.stdout.write(f'🔑 Username: {user.username}')
                self.stdout.write(f'⭐ Status: Super Admin')
                self.stdout.write(f'💎 Plano: Premium (10 anos)')
                self.stdout.write('-' * 40)

            self.stdout.write('\n🎯 Próximos Passos:')
            self.stdout.write('1. Teste o login com as credenciais acima')
            self.stdout.write('2. Configure permissões específicas se necessário')
            self.stdout.write('3. Verifique o acesso ao painel administrativo')
            self.stdout.write('4. Configure notificações e preferências')

        else:
            self.stdout.write(
                self.style.ERROR('❌ Nenhum super usuário foi criado!')
            )

        self.stdout.write('\n✨ Comando concluído!')

    def create_superuser(self, email, password, first_name, last_name, username=None):
        """
        Cria um super usuário com as especificações fornecidas
        """
        try:
            # Verificar se o usuário já existe
            if User.objects.filter(email=email).exists():
                self.stdout.write(f'⚠️  Usuário {email} já existe!')
                user = User.objects.get(email=email)
                if user.is_superuser:
                    self.stdout.write(
                        self.style.SUCCESS(f'✅ {email} já é um super usuário')
                    )
                else:
                    user.is_superuser = True
                    user.is_staff = True
                    user.save()
                    self.stdout.write(
                        self.style.SUCCESS(f'✅ {email} foi promovido a super usuário')
                    )
                return user

            # Criar username se não fornecido
            if not username:
                username = email.split('@')[0]

            # Criar o super usuário
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                is_superuser=True,
                is_staff=True,
                is_active=True,
                email_verified=True,
                is_verified=True,
                subscription_status='premium',
                subscription_expires=timezone.now() + timedelta(days=3650),  # 10 anos
                preferred_language='pt',
                skill_level='expert',
                gdpr_consent=True,
                data_processing_consent=True,
                marketing_consent=True,
                consent_date=timezone.now(),
                last_activity=timezone.now()
            )
            
            # Garantir acesso gratuito a todos os cursos
            self.grant_free_access_to_all_courses(user)

            self.stdout.write(
                self.style.SUCCESS(f'✅ Super usuário criado com sucesso: {email}')
            )
            self.stdout.write(f'   Nome: {first_name} {last_name}')
            self.stdout.write(f'   Username: {username}')
            self.stdout.write(f'   Status: Premium (10 anos)')
            self.stdout.write(f'   Permissões: Super Admin')

            return user

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro ao criar usuário {email}: {str(e)}')
            )
            return None
    
    def grant_free_access_to_all_courses(self, user):
        """
        Garante que o usuário tenha acesso gratuito a todos os cursos
        """
        try:
            from courses.models import Course, Enrollment
            
            # Obter todos os cursos disponíveis
            all_courses = Course.objects.filter(status='published')
            
            # Criar matrículas gratuitas para todos os cursos
            enrollments_created = 0
            enrollments_updated = 0
            
            for course in all_courses:
                enrollment, created = Enrollment.objects.get_or_create(
                    user=user,
                    course=course,
                    defaults={
                        'status': 'active',
                        'enrolled_at': timezone.now(),
                        'payment_status': 'free',
                        'payment_amount': 0.00,
                        'payment_method': 'admin_granted',
                        'notes': 'Acesso gratuito concedido por super usuário'
                    }
                )
                
                if created:
                    enrollments_created += 1
                else:
                    # Atualizar matrícula existente para garantir acesso gratuito
                    if enrollment.payment_status != 'free':
                        enrollment.payment_status = 'free'
                        enrollment.payment_amount = 0.00
                        enrollment.payment_method = 'admin_granted'
                        enrollment.notes = 'Acesso gratuito concedido por super usuário'
                        enrollment.save()
                        enrollments_updated += 1
            
            self.stdout.write(
                self.style.SUCCESS(f'   📚 Acesso gratuito concedido: {enrollments_created} novos, {enrollments_updated} atualizados')
            )
            
        except ImportError:
            self.stdout.write(
                self.style.WARNING('   ⚠️  Modelo de cursos não encontrado - pulando matrículas')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'   ❌ Erro ao conceder acesso aos cursos: {str(e)}')
            ) 