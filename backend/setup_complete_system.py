#!/usr/bin/env python3
"""
Script de Instalação e Configuração Completa - Fenix Academy
Instala dependências, configura variáveis de ambiente e valida o sistema
"""

import subprocess
import sys
import os
import platform
import json
from pathlib import Path

class FenixAcademySetup:
    def __init__(self):
        self.system = platform.system().lower()
        self.python_version = sys.version_info
        self.requirements_file = "requirements.txt"
        self.env_file = ".env"
        
    def print_header(self, title: str):
        """Imprime cabeçalho formatado"""
        print("\n" + "=" * 60)
        print(f"🚀 {title}")
        print("=" * 60)
    
    def print_step(self, step: str, status: str = ""):
        """Imprime passo do processo"""
        if status:
            print(f"   {step} - {status}")
        else:
            print(f"   {step}")
    
    def check_python_version(self):
        """Verifica versão do Python"""
        self.print_header("VERIFICAÇÃO DO PYTHON")
        
        if self.python_version.major < 3 or (self.python_version.major == 3 and self.python_version.minor < 8):
            print(f"❌ Python {self.python_version.major}.{self.python_version.minor} não é suportado!")
            print("💡 Requer Python 3.8 ou superior")
            return False
        
        print(f"✅ Python {self.python_version.major}.{self.python_version.minor}.{self.python_version.micro} - OK")
        return True
    
    def check_docker(self):
        """Verifica se o Docker está instalado e rodando"""
        self.print_header("VERIFICAÇÃO DO DOCKER")
        
        try:
            # Verificar se Docker está instalado
            result = subprocess.run(["docker", "--version"], capture_output=True, text=True)
            if result.returncode == 0:
                print(f"✅ Docker instalado: {result.stdout.strip()}")
            else:
                print("❌ Docker não encontrado")
                return False
        except FileNotFoundError:
            print("❌ Docker não está instalado")
            print("💡 Instale o Docker em: https://docs.docker.com/get-docker/")
            return False
        
        try:
            # Verificar se Docker está rodando
            result = subprocess.run(["docker", "info"], capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Docker está rodando")
                return True
            else:
                print("❌ Docker não está rodando")
                print("💡 Inicie o Docker Desktop ou serviço")
                return False
        except Exception as e:
            print(f"❌ Erro ao verificar Docker: {e}")
            return False
    
    def install_python_dependencies(self):
        """Instala dependências Python"""
        self.print_header("INSTALAÇÃO DE DEPENDÊNCIAS PYTHON")
        
        if not os.path.exists(self.requirements_file):
            print(f"❌ Arquivo {self.requirements_file} não encontrado")
            return False
        
        try:
            print("📦 Instalando dependências...")
            result = subprocess.run([
                sys.executable, "-m", "pip", "install", "-r", self.requirements_file
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                print("✅ Dependências instaladas com sucesso")
                return True
            else:
                print(f"❌ Erro na instalação: {result.stderr}")
                return False
                
        except Exception as e:
            print(f"❌ Erro ao instalar dependências: {e}")
            return False
    
    def create_env_file(self):
        """Cria arquivo de variáveis de ambiente"""
        self.print_header("CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE")
        
        env_content = """# Configurações da Fenix Academy
# Copie este arquivo para .env e configure com seus valores reais

# Stripe (Pagamentos)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Email (Notificações)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here
FROM_EMAIL=noreply@fenix.academy

# JWT (Autenticação)
JWT_SECRET_KEY=your_super_secret_jwt_key_here_2024
JWT_ALGORITHM=HS256

# Banco de Dados (Opcional - para produção)
DATABASE_URL=postgresql://user:password@localhost:5432/fenix_academy

# Redis (Opcional - para cache)
REDIS_URL=redis://localhost:6379

# Configurações do Sistema
ENVIRONMENT=development
DEBUG=true
LOG_LEVEL=INFO
"""
        
        try:
            with open(self.env_file, 'w') as f:
                f.write(env_content)
            
            print(f"✅ Arquivo {self.env_file} criado")
            print("💡 Configure as variáveis com seus valores reais")
            return True
            
        except Exception as e:
            print(f"❌ Erro ao criar {self.env_file}: {e}")
            return False
    
    def create_directories(self):
        """Cria diretórios necessários"""
        self.print_header("CRIAÇÃO DE DIRETÓRIOS")
        
        directories = [
            "models",
            "logs",
            "uploads",
            "certificates",
            "temp"
        ]
        
        for directory in directories:
            try:
                Path(directory).mkdir(exist_ok=True)
                print(f"✅ Diretório {directory} criado/verificado")
            except Exception as e:
                print(f"❌ Erro ao criar {directory}: {e}")
    
    def validate_apis(self):
        """Valida se todas as APIs podem ser importadas"""
        self.print_header("VALIDAÇÃO DAS APIS")
        
        api_files = [
            "api/code_execution.py",
            "api/authentication.py", 
            "api/recommendations.py",
            "api/payments.py",
            "api/notifications.py",
            "api/certificates.py"
        ]
        
        for api_file in api_files:
            if os.path.exists(api_file):
                print(f"✅ {api_file} - OK")
            else:
                print(f"❌ {api_file} - Não encontrado")
    
    def create_startup_scripts(self):
        """Cria scripts de inicialização"""
        self.print_header("CRIAÇÃO DE SCRIPTS DE INICIALIZAÇÃO")
        
        # Script para Windows
        if self.system == "windows":
            batch_content = """@echo off
echo Iniciando Fenix Academy...
cd /d "%~dp0"
python start_apis.py
pause
"""
            try:
                with open("start_fenix.bat", "w") as f:
                    f.write(batch_content)
                print("✅ start_fenix.bat criado")
            except Exception as e:
                print(f"❌ Erro ao criar start_fenix.bat: {e}")
        
        # Script para Unix/Linux/Mac
        else:
            shell_content = """#!/bin/bash
echo "🚀 Iniciando Fenix Academy..."
cd "$(dirname "$0")"
python3 start_apis.py
"""
            try:
                with open("start_fenix.sh", "w") as f:
                    f.write(shell_content)
                
                # Tornar executável
                os.chmod("start_fenix.sh", 0o755)
                print("✅ start_fenix.sh criado e configurado como executável")
            except Exception as e:
                print(f"❌ Erro ao criar start_fenix.sh: {e}")
    
    def create_docker_compose(self):
        """Cria arquivo docker-compose.yml para desenvolvimento"""
        self.print_header("CONFIGURAÇÃO DO DOCKER COMPOSE")
        
        docker_compose_content = """version: '3.8'

services:
  # Redis para cache e sessões
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  # PostgreSQL para banco de dados (opcional)
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: fenix_academy
      POSTGRES_USER: fenix_user
      POSTGRES_PASSWORD: fenix_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  redis_data:
  postgres_data:
"""
        
        try:
            with open("docker-compose.yml", "w") as f:
                f.write(docker_compose_content)
            
            print("✅ docker-compose.yml criado")
            print("💡 Execute 'docker-compose up -d' para iniciar serviços")
            return True
            
        except Exception as e:
            print(f"❌ Erro ao criar docker-compose.yml: {e}")
            return False
    
    def print_next_steps(self):
        """Imprime próximos passos"""
        self.print_header("PRÓXIMOS PASSOS")
        
        print("🎯 Para iniciar o sistema:")
        print("   1. Configure as variáveis no arquivo .env")
        print("   2. Execute: python start_apis.py")
        print("   3. Ou use o script: ./start_fenix.sh (Linux/Mac)")
        print("   4. Ou use o script: start_fenix.bat (Windows)")
        
        print("\n🔧 Para desenvolvimento:")
        print("   1. Execute: docker-compose up -d (para Redis/PostgreSQL)")
        print("   2. Configure suas chaves de API (Stripe, SMTP, etc.)")
        print("   3. Execute os testes: python test_complete_system.py")
        
        print("\n📚 Documentação:")
        print("   - README.md: Visão geral completa")
        print("   - /docs: Documentação técnica detalhada")
        print("   - /examples: Exemplos de uso")
        
        print("\n🚀 URLs das APIs:")
        print("   - Execução de Código: http://localhost:8001")
        print("   - Autenticação: http://localhost:8002")
        print("   - Recomendações: http://localhost:8003")
        print("   - Pagamentos: http://localhost:8004")
        print("   - Notificações: http://localhost:8005")
        print("   - Certificados: http://localhost:8006")
    
    def run_complete_setup(self):
        """Executa configuração completa"""
        print("🚀 CONFIGURAÇÃO COMPLETA DA FENIX ACADEMY")
        print("=" * 60)
        print(f"🖥️  Sistema: {platform.system()} {platform.release()}")
        print(f"🐍 Python: {sys.version}")
        print(f"📁 Diretório: {os.getcwd()}")
        print("=" * 60)
        
        # Verificações básicas
        if not self.check_python_version():
            return False
        
        if not self.check_docker():
            print("⚠️  Docker não está disponível - algumas funcionalidades podem não funcionar")
        
        # Instalação e configuração
        if not self.install_python_dependencies():
            return False
        
        self.create_env_file()
        self.create_directories()
        self.validate_apis()
        self.create_startup_scripts()
        self.create_docker_compose()
        
        # Próximos passos
        self.print_next_steps()
        
        print("\n🎉 Configuração concluída com sucesso!")
        return True

def main():
    """Função principal"""
    setup = FenixAcademySetup()
    
    try:
        success = setup.run_complete_setup()
        if success:
            print("\n✅ Sistema configurado e pronto para uso!")
            sys.exit(0)
        else:
            print("\n❌ Configuração falhou!")
            sys.exit(1)
    except KeyboardInterrupt:
        print("\n\n⚠️  Configuração interrompida pelo usuário")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Erro inesperado: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
