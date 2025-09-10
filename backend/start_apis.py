#!/usr/bin/env python3
"""
Script para Iniciar Todas as APIs da Fenix Academy
Execução de Código, Autenticação e Recomendações
"""

import subprocess
import sys
import os
import time
import signal
import threading
from pathlib import Path

# Configurações das APIs
APIS_CONFIG = {
    "code_execution": {
        "name": "🚀 API de Execução de Código",
        "file": "api/code_execution.py",
        "port": 8001,
        "description": "Execução segura de código em múltiplas linguagens"
    },
    "authentication": {
        "name": "🔐 API de Autenticação",
        "file": "api/authentication.py",
        "port": 8002,
        "description": "Sistema de autenticação para projetos colaborativos"
    },
    "recommendations": {
        "name": "🤖 API de Recomendações",
        "file": "api/recommendations.py",
        "port": 8003,
        "description": "Machine Learning para recomendações personalizadas"
    },
    "payments": {
        "name": "💳 API de Pagamentos",
        "file": "api/payments.py",
        "port": 8004,
        "description": "Sistema de pagamentos e assinaturas com Stripe"
    },
    "notifications": {
        "name": "🔔 API de Notificações",
        "file": "api/notifications.py",
        "port": 8005,
        "description": "Sistema de notificações, chat e comunicação"
    },
    "certificates": {
        "name": "🏆 API de Certificados",
        "file": "api/certificates.py",
        "port": 8006,
        "description": "Sistema de certificados e credenciais digitais"
    }
}

# Processos das APIs
api_processes = {}
stop_event = threading.Event()

def print_banner():
    """Exibe banner da Fenix Academy"""
    print("=" * 80)
    print("🚀 FENIX ACADEMY - PLATAFORMA DE APRENDIZADO INTERATIVO")
    print("=" * 80)
    print("🎯 APIs Disponíveis:")
    for api_id, config in APIS_CONFIG.items():
        print(f"   • {config['name']} (Porta {config['port']})")
        print(f"     {config['description']}")
    print("=" * 80)
    print()

def check_dependencies():
    """Verifica se as dependências estão instaladas"""
    print("🔍 Verificando dependências...")
    
    required_packages = [
        "fastapi", "uvicorn", "pydantic", "numpy", "pandas", 
        "scikit-learn", "docker", "bcrypt", "python-jose"
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package.replace("-", "_"))
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print(f"❌ Dependências faltando: {', '.join(missing_packages)}")
        print("💡 Execute: pip install -r requirements.txt")
        return False
    
    print("✅ Todas as dependências estão instaladas")
    return True

def check_docker():
    """Verifica se o Docker está disponível"""
    print("🐳 Verificando Docker...")
    
    try:
        result = subprocess.run(
            ["docker", "--version"], 
            capture_output=True, 
            text=True, 
            timeout=10
        )
        
        if result.returncode == 0:
            print(f"✅ Docker disponível: {result.stdout.strip()}")
            return True
        else:
            print("❌ Docker não está funcionando corretamente")
            return False
            
    except (subprocess.TimeoutExpired, FileNotFoundError):
        print("❌ Docker não encontrado ou não acessível")
        print("💡 Instale o Docker para usar a API de execução de código")
        return False

def start_api(api_id, config):
    """Inicia uma API específica"""
    try:
        print(f"🚀 Iniciando {config['name']}...")
        
        # Verificar se o arquivo existe
        api_file = Path(config['file'])
        if not api_file.exists():
            print(f"❌ Arquivo {api_file} não encontrado")
            return None
        
        # Iniciar processo da API
        process = subprocess.Popen([
            sys.executable, str(api_file),
            "--host", "0.0.0.0",
            "--port", str(config['port'])
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Aguardar um pouco para ver se inicia sem erro
        time.sleep(2)
        
        if process.poll() is None:
            print(f"✅ {config['name']} iniciada na porta {config['port']}")
            return process
        else:
            stdout, stderr = process.communicate()
            print(f"❌ Erro ao iniciar {config['name']}:")
            print(f"   STDOUT: {stdout.decode()}")
            print(f"   STDERR: {stderr.decode()}")
            return None
            
    except Exception as e:
        print(f"❌ Erro ao iniciar {config['name']}: {e}")
        return None

def start_all_apis():
    """Inicia todas as APIs"""
    print("🚀 Iniciando todas as APIs...")
    print()
    
    for api_id, config in APIS_CONFIG.items():
        process = start_api(api_id, config)
        if process:
            api_processes[api_id] = process
        else:
            print(f"⚠️  {config['name']} não foi iniciada")
        print()
    
    # Verificar status
    running_apis = len(api_processes)
    total_apis = len(APIS_CONFIG)
    
    print(f"📊 Status: {running_apis}/{total_apis} APIs rodando")
    
    if running_apis > 0:
        print("\n🌐 URLs das APIs:")
        for api_id, process in api_processes.items():
            config = APIS_CONFIG[api_id]
            print(f"   • {config['name']}: http://localhost:{config['port']}")
            print(f"     Docs: http://localhost:{config['port']}/docs")
    
    return running_apis > 0

def monitor_apis():
    """Monitora o status das APIs"""
    print("\n📊 Monitorando APIs... (Ctrl+C para parar)")
    
    try:
        while not stop_event.is_set():
            time.sleep(10)
            
            # Verificar status dos processos
            for api_id, process in list(api_processes.items()):
                if process.poll() is not None:
                    config = APIS_CONFIG[api_id]
                    print(f"⚠️  {config['name']} parou inesperadamente")
                    
                    # Tentar reiniciar
                    print(f"🔄 Tentando reiniciar {config['name']}...")
                    new_process = start_api(api_id, config)
                    if new_process:
                        api_processes[api_id] = new_process
                        print(f"✅ {config['name']} reiniciada com sucesso")
                    else:
                        print(f"❌ Falha ao reiniciar {config['name']}")
                        del api_processes[api_id]
            
            # Mostrar status
            running_count = sum(1 for p in api_processes.values() if p.poll() is None)
            print(f"📈 Status: {running_count}/{len(APIS_CONFIG)} APIs rodando")
            
    except KeyboardInterrupt:
        print("\n🛑 Interrupção detectada...")

def stop_all_apis():
    """Para todas as APIs"""
    print("\n🛑 Parando todas as APIs...")
    
    for api_id, process in api_processes.items():
        config = APIS_CONFIG[api_id]
        print(f"🛑 Parando {config['name']}...")
        
        try:
            process.terminate()
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
        
        print(f"✅ {config['name']} parada")
    
    api_processes.clear()

def signal_handler(signum, frame):
    """Manipulador de sinais para parada limpa"""
    print(f"\n🛑 Sinal {signum} recebido...")
    stop_event.set()
    stop_all_apis()
    sys.exit(0)

def main():
    """Função principal"""
    # Configurar manipulador de sinais
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    # Exibir banner
    print_banner()
    
    # Verificar dependências
    if not check_dependencies():
        print("\n❌ Dependências não atendidas. Abortando.")
        sys.exit(1)
    
    print()
    
    # Verificar Docker (opcional)
    docker_available = check_docker()
    if not docker_available:
        print("⚠️  API de execução de código pode não funcionar corretamente")
    
    print()
    
    # Iniciar APIs
    if not start_all_apis():
        print("\n❌ Nenhuma API foi iniciada. Abortando.")
        sys.exit(1)
    
    # Monitorar APIs
    try:
        monitor_apis()
    except KeyboardInterrupt:
        pass
    finally:
        stop_all_apis()
        print("\n👋 Todas as APIs foram paradas. Até logo!")

if __name__ == "__main__":
    main()
