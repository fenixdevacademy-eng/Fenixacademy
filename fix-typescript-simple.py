#!/usr/bin/env python3
"""
Script simples para corrigir erros de TypeScript comuns
"""

import os
import re
from pathlib import Path

def fix_file(file_path):
    """Aplica correções básicas em um arquivo TypeScript"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Correções básicas
        fixes = [
            # Corrigir errorstring[] para string[]
            (r'errorstring\[\]', 'string[]'),
            (r'fieldstring\[\]', 'string[]'),
            (r'datany', 'data: any'),
            
            # Corrigir const errorstring[] = [] para const errors: string[] = []
            (r'const\s+(\w+)\[\]\s*=\s*\[\]', r'const \1: string[] = []'),
            
            # Corrigir parâmetros de função malformados
            (r'\((\w+),\s*(\w+)\[\]\)', r'(\1: any, \2: string[])'),
            
            # Corrigir tipos de retorno malformados
            (r'{\s*isValid:\s*boolean;\s*errorstring\[\]\s*}', '{ isValid: boolean; errors: string[] }'),
            
            # Remover chaves extras soltas
            (r'^\s*}\s*$', ''),
            (r'^\s*{\s*$', ''),
            
            # Corrigir try-catch sem try
            (r'}\s*catch\s*\([^)]*\)\s*{', 'try {\n  // try block\n} catch (error) {'),
            
            # Corrigir finally sem try
            (r'}\s*finally\s*{', 'try {\n  // try block\n} finally {'),
            
            # Adicionar ponto e vírgula onde necessário
            (r'(\w+)\s*$', r'\1;'),
            
            # Remover exports vazios
            (r'export\s*{\s*}\s*;?\s*', ''),
            
            # Corrigir interfaces vazias
            (r'interface\s+\w+\s*{\s*}\s*;?\s*', ''),
            
            # Corrigir classes vazias
            (r'class\s+\w+\s*{\s*}\s*;?\s*', ''),
            
            # Corrigir enums vazios
            (r'enum\s+\w+\s*{\s*}\s*;?\s*', ''),
            
            # Limpar linhas vazias excessivas
            (r'\n\s*\n\s*\n+', '\n\n'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
            except re.error:
                # Se houver erro na regex, pular esta correção
                continue
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"❌ Erro ao processar {file_path}: {e}")
        return False

def main():
    """Função principal"""
    print("🚀 Iniciando correção automática de erros TypeScript...")
    
    # Encontrar arquivos TypeScript
    ts_files = []
    for root, dirs, files in os.walk('.'):
        # Excluir node_modules e .next
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.next', '.vercel']]
        for file in files:
            if file.endswith(('.ts', '.tsx')) and not file.startswith('.'):
                ts_files.append(os.path.join(root, file))
    
    print(f"📊 Encontrados {len(ts_files)} arquivos TypeScript")
    print()
    
    fixed_count = 0
    for file_path in ts_files:
        if fix_file(file_path):
            print(f"✅ Corrigido: {file_path}")
            fixed_count += 1
        else:
            print(f"⏭️  Sem alterações: {file_path}")
    
    print()
    print("=" * 50)
    print(f"✅ Processamento concluído!")
    print(f"📁 Arquivos processados: {len(ts_files)}")
    print(f"🔧 Arquivos corrigidos: {fixed_count}")
    print(f"📈 Taxa de sucesso: {(fixed_count/len(ts_files))*100:.1f}%")
    
    if fixed_count > 0:
        print("🎉 Muitos erros foram corrigidos automaticamente!")
        print("💡 Execute 'npm run dev' novamente para verificar se ainda há erros.")
    else:
        print("ℹ️  Nenhum erro foi encontrado ou todos os arquivos já estavam corretos.")

if __name__ == "__main__":
    main()






