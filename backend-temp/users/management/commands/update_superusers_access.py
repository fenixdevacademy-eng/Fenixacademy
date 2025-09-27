from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class Command(BaseCommand):
    help = 'Atualiza acesso gratuito dos super usuários existentes'

    def add_arguments(self, parser):
        parser.add_argument(
            '--emails',
            nargs='+',
            type=str,
            help='Lista de emails dos super usuários para atualizar'
        )

    def handle(self, *args, **options):
        self.stdout.write(
            self.style.SUCCESS('🔄 Atualizando Acesso Gratuito dos Super Usuários')
        )
        self.stdout.write('=' * 50)

        # Lista de super usuários
        superuser_emails = [
            'cezarcamaralins0607@gmail.com',
            'ls9229613@gmail.com',
            'robertdemoraes@gmail.com'
        ]

        # Se emails específicos foram fornecidos, usar apenas eles
        if options['emails']:
            superuser_emails = options['emails']

        updated_users = []

        for email in superuser_emails:
            self.stdout.write(f'\n📝 Verificando super usuário: {email}')
            
            try:
                user = User.objects.get(email=email)
                
                if user.is_superuser:
                    # Atualizar permissões se necessário
                    updated = self.update_user_permissions(user)
                    
                    # Garantir acesso gratuito a todos os cursos
                    self.grant_free_access_to_all_courses(user)
                    
                    updated_users.append(user)
                    
                    self.stdout.write(
                        self.style.SUCCESS(f'✅ {email} atualizado com sucesso!')
                    )
                else:
                    self.stdout.write(
                        self.style.WARNING(f'⚠️  {email} não é um super usuário')
                    )
                    
            except User.DoesNotExist:
                self.stdout.write(
                    self.style.ERROR(f'❌ Usuário {email} não encontrado')
                )

        self.stdout.write('\n' + '=' * 50)
        self.stdout.write(
            self.style.SUCCESS('📊 Resumo da Atualização')
        )
        self.stdout.write('=' * 50)

        if updated_users:
            self.stdout.write(
                self.style.SUCCESS(f'✅ {len(updated_users)} super usuários atualizados!')
            )

            self.stdout.write('\n🔐 Super Usuários Atualizados:')
            self.stdout.write('-' * 40)

            for user in updated_users:
                self.stdout.write(f'📧 Email: {user.email}')
                self.stdout.write(f'👤 Nome: {user.get_full_name()}')
                self.stdout.write(f'🔑 Username: {user.username}')
                self.stdout.write(f'⭐ Status: Super Admin')
                self.stdout.write(f'💎 Plano: Premium (10 anos)')
                self.stdout.write(f'📚 Acesso: Gratuito a todos os cursos')
                self.stdout.write('-' * 40)

        else:
            self.stdout.write(
                self.style.ERROR('❌ Nenhum super usuário foi atualizado!')
            )

        self.stdout.write('\n✨ Comando concluído!')

    def update_user_permissions(self, user):
        """
        Atualiza permissões do usuário se necessário
        """
        updated = False
        
        # Garantir que é super usuário
        if not user.is_superuser:
            user.is_superuser = True
            user.is_staff = True
            updated = True
        
        # Garantir status premium
        if user.subscription_status != 'premium':
            user.subscription_status = 'premium'
            updated = True
        
        # Garantir data de expiração longa
        if not user.subscription_expires or user.subscription_expires < timezone.now() + timedelta(days=365):
            user.subscription_expires = timezone.now() + timedelta(days=3650)  # 10 anos
            updated = True
        
        # Garantir verificação de email
        if not user.email_verified:
            user.email_verified = True
            user.is_verified = True
            updated = True
        
        if updated:
            user.save()
            self.stdout.write(f'   🔧 Permissões atualizadas')
        
        return updated

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
                self.style.SUCCESS(f'   📚 Acesso gratuito: {enrollments_created} novos, {enrollments_updated} atualizados')
            )
            
        except ImportError:
            self.stdout.write(
                self.style.WARNING('   ⚠️  Modelo de cursos não encontrado - pulando matrículas')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'   ❌ Erro ao conceder acesso aos cursos: {str(e)}')
            ) 