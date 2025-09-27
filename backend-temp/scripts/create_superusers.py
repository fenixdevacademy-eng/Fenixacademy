#!/usr/bin/env python
"""
Script para criar super usuários para a Fenix Academy
"""
import os
import sys
import django
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fenix_academy.settings.local')
django.setup()

User = get_user_model()

def create_superuser(email, password, first_name, last_name, username=None):
    """
    Cria um super usuário com as especificações fornecidas
    """
    try:
        # Verificar se o usuário já existe
        if User.objects.filter(email=email).exists():
            print(f"⚠️  Usuário {email} já existe!")
            user = User.objects.get(email=email)
            if user.is_superuser:
                print(f"✅ {email} já é um super usuário")
            else:
                user.is_superuser = True
                user.is_staff = True
                user.save()
                print(f"✅ {email} foi promovido a super usuário")
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
        grant_free_access_to_all_courses(user)
        
        print(f"✅ Super usuário criado com sucesso: {email}")
        print(f"   Nome: {first_name} {last_name}")
        print(f"   Username: {username}")
        print(f"   Status: Premium (10 anos)")
        print(f"   Permissões: Super Admin")
        print(f"   📚 Acesso gratuito a todos os cursos")
        
        return user
        
    except Exception as e:
        print(f"❌ Erro ao criar usuário {email}: {str(e)}")
        return None

def grant_free_access_to_all_courses(user):
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
        
        print(f"   📚 Acesso gratuito concedido: {enrollments_created} novos, {enrollments_updated} atualizados")
        
    except ImportError:
        print(f"   ⚠️  Modelo de cursos não encontrado - pulando matrículas")
    except Exception as e:
        print(f"   ❌ Erro ao conceder acesso aos cursos: {str(e)}")

def main():
    """
    Função principal para criar os 3 super usuários
    """
    print("🚀 Criando Super Usuários para Fenix Academy")
    print("=" * 50)
    
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
        print(f"\n📝 Criando super usuário {i}/3...")
        user = create_superuser(**user_data)
        if user:
            created_users.append(user)
    
    print("\n" + "=" * 50)
    print("📊 Resumo da Criação de Super Usuários")
    print("=" * 50)
    
    if created_users:
        print(f"✅ {len(created_users)} super usuários criados/atualizados com sucesso!")
        
        print("\n🔐 Credenciais dos Super Usuários:")
        print("-" * 40)
        
        for user in created_users:
            print(f"📧 Email: {user.email}")
            print(f"👤 Nome: {user.get_full_name()}")
            print(f"🔑 Username: {user.username}")
            print(f"⭐ Status: Super Admin")
            print(f"💎 Plano: Premium (10 anos)")
            print("-" * 40)
        
        print("\n🎯 Próximos Passos:")
        print("1. Teste o login com as credenciais acima")
        print("2. Configure permissões específicas se necessário")
        print("3. Verifique o acesso ao painel administrativo")
        print("4. Configure notificações e preferências")
        
    else:
        print("❌ Nenhum super usuário foi criado!")
    
    print("\n✨ Script concluído!")

if __name__ == '__main__':
    main() 