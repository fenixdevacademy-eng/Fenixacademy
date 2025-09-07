#!/usr/bin/env python
"""
Script para corrigir problemas de client components no Next.js
"""
import os
import re

def fix_client_component_order():
    """Corrigir ordem das importações em client components"""
    print("🔧 Corrigindo ordem das importações em client components...")
    
    # Arquivos que precisam ser verificados
    files_to_check = [
        "app/auth/login/page.tsx",
        "app/auth/register/page.tsx",
        "app/page.tsx",
        "app/courses/page.tsx",
        "app/dashboard/page.tsx",
        "app/payments/page.tsx",
        "app/components/Header.tsx",
        "app/components/InternationalHeader.tsx",
        "app/components/AnalyticsProvider.tsx",
    ]
    
    fixed_count = 0
    
    for file_path in files_to_check:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Verificar se tem 'use client' mas está na posição errada
            if "'use client'" in content or '"use client"' in content:
                lines = content.split('\n')
                
                # Verificar se 'use client' está na primeira linha
                if lines[0].strip() not in ["'use client'", '"use client"']:
                    # Mover 'use client' para a primeira linha
                    new_lines = []
                    use_client_line = None
                    
                    for i, line in enumerate(lines):
                        if line.strip() in ["'use client'", '"use client'"]:
                            use_client_line = line
                        else:
                            new_lines.append(line)
                    
                    if use_client_line:
                        new_content = use_client_line + '\n' + '\n'.join(new_lines)
                        
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        
                        print(f"✅ Corrigido: {file_path}")
                        fixed_count += 1
                    else:
                        print(f"⚠️ 'use client' não encontrado em: {file_path}")
                else:
                    print(f"✅ Já correto: {file_path}")
            else:
                print(f"⚠️ Sem 'use client' em: {file_path}")
    
    print(f"\n✅ {fixed_count} arquivos corrigidos!")

def check_for_use_state_without_client():
    """Verificar se há useState sem 'use client'"""
    print("\n🔍 Verificando useState sem 'use client'...")
    
    # Procurar por arquivos .tsx
    for root, dirs, files in os.walk('app'):
        for file in files:
            if file.endswith('.tsx'):
                file_path = os.path.join(root, file)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Verificar se tem useState mas não tem 'use client'
                if 'useState' in content and "'use client'" not in content and '"use client"' not in content:
                    print(f"❌ {file_path} - Tem useState mas não tem 'use client'")

def main():
    """Função principal"""
    print("🔧 Corrigindo problemas de client components")
    print("=" * 50)
    
    # Verificar se estamos na pasta correta
    if not os.path.exists('app'):
        print("❌ Pasta 'app' não encontrada!")
        print("📁 Certifique-se de estar na pasta frontend")
        return 1
    
    # Corrigir ordem das importações
    fix_client_component_order()
    
    # Verificar problemas
    check_for_use_state_without_client()
    
    print("\n✅ Problemas de client components corrigidos!")
    print("🚀 Execute: npm run dev")
    
    return 0

if __name__ == '__main__':
    import sys
    sys.exit(main()) 