#!/usr/bin/env python
"""
Script para executar o frontend Next.js
"""
import os
import sys
import subprocess
import platform

def main():
    """Função principal"""
    print("🚀 Iniciando Fenix Academy Frontend")
    print("=" * 50)
    
    # Verificar se estamos na pasta correta
    if not os.path.exists('package.json'):
        print("❌ package.json não encontrado!")
        print("📁 Certifique-se de estar na pasta frontend")
        print("💡 Execute: cd frontend")
        return 1
    
    # Verificar se node_modules existe
    if not os.path.exists('node_modules'):
        print("📦 Instalando dependências...")
        subprocess.run(['npm', 'install'], check=True)
    
    # Verificar se .env.local existe
    if not os.path.exists('.env.local'):
        print("⚙️ Criando arquivo de configuração...")
        if os.path.exists('env.example'):
            subprocess.run(['cp', 'env.example', '.env.local'], check=True)
    
    # Executar servidor de desenvolvimento
    print("🌐 Iniciando servidor de desenvolvimento...")
    print("📍 Acesse: http://localhost:3000")
    print("🔗 API Backend: http://127.0.0.1:8000")
    print("=" * 50)
    
    try:
        subprocess.run(['npm', 'run', 'dev'], check=True)
    except KeyboardInterrupt:
        print("\n👋 Servidor interrompido pelo usuário")
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro ao executar o servidor: {e}")
        return 1
    
    return 0

if __name__ == '__main__':
    sys.exit(main()) 