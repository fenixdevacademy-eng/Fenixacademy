#!/usr/bin/env python3
"""
Script para verificar configurações de segurança do Django
"""

import os
import sys
from pathlib import Path

def check_security_settings():
    """Verifica configurações de segurança"""
    print("🔒 Verificando configurações de segurança...")
    
    # Verificar se estamos no diretório correto
    if not Path('backend').exists():
        print("❌ Execute este script na raiz do projeto")
        return
    
    # Configurações que devem ser verificadas
    security_checks = {
        'SECRET_KEY': {
            'description': 'Chave secreta do Django',
            'required': True,
            'check': lambda x: len(x) > 20 and x != 'django-insecure-your-secret-key-here'
        },
        'DEBUG': {
            'description': 'Modo debug',
            'required': True,
            'check': lambda x: not x  # Deve ser False em produção
        },
        'ALLOWED_HOSTS': {
            'description': 'Hosts permitidos',
            'required': True,
            'check': lambda x: len(x) > 0 and '*' not in x  # Não deve ter wildcard
        },
        'CORS_ALLOWED_ORIGINS': {
            'description': 'Origens CORS permitidas',
            'required': True,
            'check': lambda x: len(x) > 0
        },
        'SECURE_SSL_REDIRECT': {
            'description': 'Redirecionamento SSL',
            'required': False,
            'check': lambda x: x is True  # Deve ser True em produção
        },
        'SESSION_COOKIE_SECURE': {
            'description': 'Cookie de sessão seguro',
            'required': False,
            'check': lambda x: x is True  # Deve ser True em produção
        },
        'CSRF_COOKIE_SECURE': {
            'description': 'Cookie CSRF seguro',
            'required': False,
            'check': lambda x: x is True  # Deve ser True em produção
        },
    }
    
    # Verificar arquivos de configuração
    config_files = [
        'backend/fenix_academy/settings/base.py',
        'backend/fenix_academy/settings/development.py',
        'backend/fenix_academy/settings/production.py',
        'backend/fenix_academy/settings/test.py',
        'backend/fenix_academy/settings/test_simple.py',
    ]
    
    for config_file in config_files:
        if not Path(config_file).exists():
            print(f"⚠️  Arquivo não encontrado: {config_file}")
            continue
            
        print(f"\n📄 Verificando: {config_file}")
        
        try:
            with open(config_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Verificar configurações
            for setting, check_info in security_checks.items():
                if setting in content:
                    # Extrair valor da configuração
                    lines = content.split('\n')
                    for line in lines:
                        if line.strip().startswith(f'{setting} ='):
                            value_str = line.split('=', 1)[1].strip()
                            
                            # Converter string para valor Python
                            try:
                                if value_str.startswith('[') and value_str.endswith(']'):
                                    # Lista
                                    value = eval(value_str)
                                elif value_str.lower() in ['true', 'false']:
                                    # Boolean
                                    value = value_str.lower() == 'true'
                                elif value_str.startswith("'") or value_str.startswith('"'):
                                    # String
                                    value = value_str.strip("'\"")
                                else:
                                    # Outros tipos
                                    value = eval(value_str)
                                
                                # Verificar se está correto
                                if check_info['check'](value):
                                    print(f"✅ {setting}: OK")
                                else:
                                    print(f"❌ {setting}: PROBLEMA - {check_info['description']}")
                                    
                            except Exception as e:
                                print(f"⚠️  {setting}: Erro ao analisar valor - {e}")
                            break
                    else:
                        print(f"⚠️  {setting}: Não encontrado")
                else:
                    if check_info['required']:
                        print(f"❌ {setting}: FALTANDO - {check_info['description']}")
                    else:
                        print(f"⚠️  {setting}: Não encontrado (opcional)")
                        
        except Exception as e:
            print(f"❌ Erro ao verificar {config_file}: {e}")
    
    # Verificar variáveis de ambiente
    print(f"\n🌍 Verificando variáveis de ambiente...")
    env_file = Path('backend/env.example')
    if env_file.exists():
        print(f"✅ Arquivo env.example encontrado")
        with open(env_file, 'r') as f:
            env_content = f.read()
            if 'SECRET_KEY' in env_content:
                print("✅ SECRET_KEY configurada no env.example")
            else:
                print("❌ SECRET_KEY não encontrada no env.example")
    else:
        print("❌ Arquivo env.example não encontrado")

def check_docker_security():
    """Verifica configurações de segurança do Docker"""
    print(f"\n🐳 Verificando configurações de segurança do Docker...")
    
    docker_files = [
        'docker-compose.yml',
        'docker-compose.prod.yml',
        'docker-compose.light.yml',
    ]
    
    for docker_file in docker_files:
        if not Path(docker_file).exists():
            continue
            
        print(f"\n📄 Verificando: {docker_file}")
        
        try:
            with open(docker_file, 'r') as f:
                content = f.read()
            
            # Verificar se há volumes sensíveis
            if 'postgres_data:' in content:
                print("✅ Volume do PostgreSQL configurado")
            else:
                print("⚠️  Volume do PostgreSQL não encontrado")
                
            if 'redis_data:' in content:
                print("✅ Volume do Redis configurado")
            else:
                print("⚠️  Volume do Redis não encontrado")
                
            # Verificar health checks
            if 'healthcheck:' in content:
                print("✅ Health checks configurados")
            else:
                print("⚠️  Health checks não encontrados")
                
        except Exception as e:
            print(f"❌ Erro ao verificar {docker_file}: {e}")

def main():
    """Função principal"""
    print("🔒 Verificação de Segurança - Fenix Academy")
    print("=" * 50)
    
    check_security_settings()
    check_docker_security()
    
    print(f"\n✅ Verificação de segurança concluída!")
    print(f"\n📋 Recomendações:")
    print(f"1. Certifique-se de que SECRET_KEY é única e segura")
    print(f"2. DEBUG deve ser False em produção")
    print(f"3. ALLOWED_HOSTS deve ser específico, não usar wildcards")
    print(f"4. Configure SSL em produção")
    print(f"5. Use HTTPS para cookies de sessão e CSRF")

if __name__ == "__main__":
    main() 