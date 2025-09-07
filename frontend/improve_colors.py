#!/usr/bin/env python
"""
Script para melhorar a paleta de cores do frontend
"""
import os
import re

def improve_text_colors():
    """Melhorar cores de texto nos componentes"""
    print("🎨 Melhorando cores de texto...")
    
    # Arquivos para melhorar
    files_to_improve = [
        "app/page.tsx",
        "app/courses/page.tsx",
        "app/dashboard/page.tsx",
        "app/components/Header.tsx",
    ]
    
    improvements = [
        # Títulos principais
        (r'text-4xl font-bold text-gray-900', 'text-4xl font-bold text-gradient'),
        (r'text-3xl font-bold text-gray-900', 'text-3xl font-bold text-gradient'),
        (r'text-2xl font-bold text-gray-900', 'text-2xl font-bold text-gradient'),
        
        # Subtítulos
        (r'text-xl text-gray-600', 'text-xl text-gray-300'),
        (r'text-lg text-gray-600', 'text-lg text-gray-300'),
        
        # Preços
        (r'text-2xl font-bold text-blue-600', 'text-2xl font-bold text-gradient-secondary'),
        
        # Botões
        (r'bg-blue-600 hover:bg-blue-700', 'bg-gradient-primary hover:shadow-lg'),
        
        # Cards
        (r'bg-white dark:bg-gray-800', 'glass-card'),
        
        # Links
        (r'text-blue-600 hover:underline', 'text-primary hover:text-primary-light transition-colors'),
    ]
    
    for file_path in files_to_improve:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            for pattern, replacement in improvements:
                content = re.sub(pattern, replacement, content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ Melhorado: {file_path}")

def add_hover_effects():
    """Adicionar efeitos de hover"""
    print("✨ Adicionando efeitos de hover...")
    
    # Adicionar classes de hover
    hover_classes = [
        'hover-lift',
        'smooth-transition',
        'hover:scale-105',
        'hover:shadow-lg',
    ]
    
    # Arquivos para adicionar efeitos
    files_to_improve = [
        "app/page.tsx",
        "app/courses/page.tsx",
    ]
    
    for file_path in files_to_improve:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Adicionar hover-lift aos cards
            content = re.sub(
                r'className="([^"]*?)bg-white dark:bg-gray-800([^"]*?)"',
                r'className="\1glass-card hover-lift\2"',
                content
            )
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ Efeitos adicionados: {file_path}")

def improve_buttons():
    """Melhorar estilos dos botões"""
    print("🔘 Melhorando estilos dos botões...")
    
    button_improvements = [
        # Botões primários
        (r'bg-blue-600 hover:bg-blue-700 text-white', 'bg-gradient-primary text-white hover:shadow-lg'),
        (r'bg-green-600 hover:bg-green-700 text-white', 'bg-gradient-secondary text-white hover:shadow-lg'),
        
        # Botões secundários
        (r'bg-gray-600 hover:bg-gray-700 text-white', 'bg-gradient-accent text-white hover:shadow-lg'),
        
        # Botões de ação
        (r'bg-purple-600 hover:bg-purple-700 text-white', 'bg-gradient-purple text-white hover:shadow-lg'),
    ]
    
    files_to_improve = [
        "app/page.tsx",
        "app/courses/page.tsx",
        "app/auth/login/page.tsx",
        "app/auth/register/page.tsx",
    ]
    
    for file_path in files_to_improve:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            for pattern, replacement in button_improvements:
                content = re.sub(pattern, replacement, content)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ Botões melhorados: {file_path}")

def main():
    """Função principal"""
    print("🎨 Melhorando paleta de cores do frontend")
    print("=" * 50)
    
    # Verificar se estamos na pasta correta
    if not os.path.exists('app'):
        print("❌ Pasta 'app' não encontrada!")
        print("📁 Certifique-se de estar na pasta frontend")
        return 1
    
    # Aplicar melhorias
    improve_text_colors()
    add_hover_effects()
    improve_buttons()
    
    print("\n✅ Paleta de cores melhorada!")
    print("🚀 Execute: npm run dev")
    
    return 0

if __name__ == '__main__':
    import sys
    sys.exit(main()) 