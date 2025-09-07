#!/usr/bin/env python
"""
Script para debugar e corrigir problemas do frontend
"""
import os
import subprocess
import json
import sys

def check_dependencies():
    """Verificar dependências"""
    print("📦 Verificando dependências...")
    
    try:
        # Verificar package.json
        with open('package.json', 'r') as f:
            package_data = json.load(f)
        
        print(f"✅ package.json encontrado - versão: {package_data.get('version', 'N/A')}")
        
        # Verificar node_modules
        if os.path.exists('node_modules'):
            print("✅ node_modules encontrado")
        else:
            print("❌ node_modules não encontrado")
            return False
            
        return True
    except Exception as e:
        print(f"❌ Erro ao verificar dependências: {e}")
        return False

def check_images():
    """Verificar imagens"""
    print("\n🖼️ Verificando imagens...")
    
    required_images = [
        'public/hero-image.png',
        'public/avatars/maria.jpg',
        'public/avatars/joao.jpg',
        'public/avatars/ana.jpg',
        'public/courses/python-basics.jpg',
        'public/courses/javascript-complete.jpg',
        'public/courses/react-nextjs.jpg',
    ]
    
    missing_images = []
    for img in required_images:
        if not os.path.exists(img):
            missing_images.append(img)
            print(f"❌ Faltando: {img}")
        else:
            print(f"✅ Encontrada: {img}")
    
    return len(missing_images) == 0

def check_config_files():
    """Verificar arquivos de configuração"""
    print("\n⚙️ Verificando arquivos de configuração...")
    
    config_files = [
        'next.config.js',
        'tailwind.config.js',
        'tsconfig.json',
        'env.local'
    ]
    
    for file in config_files:
        if os.path.exists(file):
            print(f"✅ {file}")
        else:
            print(f"❌ {file}")

def run_npm_command(command):
    """Executar comando npm"""
    try:
        result = subprocess.run(['npm', *command], capture_output=True, text=True, check=True)
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr

def main():
    """Função principal"""
    print("🔍 Debugando Frontend Fenix Academy")
    print("=" * 50)
    
    # Verificar se estamos na pasta correta
    if not os.path.exists('package.json'):
        print("❌ package.json não encontrado!")
        print("📁 Certifique-se de estar na pasta frontend")
        return 1
    
    # Verificar dependências
    deps_ok = check_dependencies()
    
    # Verificar imagens
    images_ok = check_images()
    
    # Verificar configurações
    check_config_files()
    
    print("\n🔧 Corrigindo problemas...")
    
    # Instalar dependências se necessário
    if not deps_ok:
        print("📦 Instalando dependências...")
        success, output = run_npm_command(['install'])
        if success:
            print("✅ Dependências instaladas")
        else:
            print(f"❌ Erro ao instalar: {output}")
    
    # Criar imagens se necessário
    if not images_ok:
        print("🖼️ Criando imagens...")
        try:
            subprocess.run([sys.executable, 'fix_images.py'], check=True)
            print("✅ Imagens criadas")
        except Exception as e:
            print(f"❌ Erro ao criar imagens: {e}")
    
    # Limpar cache
    print("🧹 Limpando cache...")
    if os.path.exists('.next'):
        import shutil
        shutil.rmtree('.next')
        print("✅ Cache limpo")
    
    # Verificar build
    print("🔨 Testando build...")
    success, output = run_npm_command(['run', 'build'])
    if success:
        print("✅ Build bem-sucedido")
    else:
        print(f"❌ Erro no build: {output}")
    
    print("\n🎉 Debug concluído!")
    print("🚀 Execute: npm run dev")
    
    return 0

if __name__ == '__main__':
    sys.exit(main()) 