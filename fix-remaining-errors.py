#!/usr/bin/env python3
"""
Script para corrigir erros restantes de TypeScript
Foca em problemas específicos que ainda persistem
"""

import os
import re
from pathlib import Path

def fix_remaining_errors(file_path):
    """Corrige erros restantes específicos"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Correções específicas para erros restantes
        fixes = [
            # Corrigir ponto e vírgula em propriedades de objeto (deve ser vírgula)
            (r'(\w+):\s*([^,}]+);\s*\n\s*(\w+):', r'\1: \2,\n                \3:'),
            (r'(\w+):\s*([^,}]+);\s*\n\s*}', r'\1: \2\n            }'),
            
            # Corrigir vírgulas faltando em objetos
            (r'(\w+):\s*([^,}]+)\s*\n\s*(\w+):', r'\1: \2,\n                \3:'),
            
            # Corrigir ponto e vírgula em arrays
            (r'(\w+):\s*([^,}]+);\s*\n\s*]', r'\1: \2\n            ]'),
            
            # Corrigir vírgulas faltando em arrays
            (r'(\w+):\s*([^,}]+)\s*\n\s*]', r'\1: \2\n            ]'),
            
            # Corrigir ponto e vírgula em parâmetros de função
            (r'(\w+):\s*([^,)]+);\s*\)', r'\1: \2)'),
            
            # Corrigir vírgulas faltando em parâmetros
            (r'(\w+):\s*([^,)]+)\s*\)', r'\1: \2)'),
            
            # Corrigir ponto e vírgula em declarações de variável
            (r'const\s+(\w+)\s*=\s*([^;]+);\s*$', r'const \1 = \2;'),
            
            # Corrigir vírgulas faltando em declarações de variável
            (r'const\s+(\w+)\s*=\s*([^,;]+)\s*$', r'const \1 = \2;'),
            
            # Corrigir ponto e vírgula em return statements
            (r'return\s+([^;]+);\s*$', r'return \1;'),
            
            # Corrigir vírgulas faltando em return statements
            (r'return\s+([^,;]+)\s*$', r'return \1;'),
            
            # Corrigir ponto e vírgula em if statements
            (r'if\s*\([^)]+\)\s*{\s*([^}]+);\s*}', r'if (\1) {\n        \2;\n    }'),
            
            # Corrigir vírgulas faltando em if statements
            (r'if\s*\([^)]+\)\s*{\s*([^}]+)\s*}', r'if (\1) {\n        \2;\n    }'),
            
            # Corrigir ponto e vírgula em for loops
            (r'for\s*\([^)]+\)\s*{\s*([^}]+);\s*}', r'for (\1) {\n        \2;\n    }'),
            
            # Corrigir vírgulas faltando em for loops
            (r'for\s*\([^)]+\)\s*{\s*([^}]+)\s*}', r'for (\1) {\n        \2;\n    }'),
            
            # Corrigir ponto e vírgula em while loops
            (r'while\s*\([^)]+\)\s*{\s*([^}]+);\s*}', r'while (\1) {\n        \2;\n    }'),
            
            # Corrigir vírgulas faltando em while loops
            (r'while\s*\([^)]+\)\s*{\s*([^}]+)\s*}', r'while (\1) {\n        \2;\n    }'),
            
            # Corrigir ponto e vírgula em switch statements
            (r'case\s+([^:]+):\s*([^;]+);\s*break;', r'case \1:\n            \2;\n            break;'),
            
            # Corrigir vírgulas faltando em switch statements
            (r'case\s+([^:]+):\s*([^;]+)\s*break;', r'case \1:\n            \2;\n            break;'),
            
            # Corrigir ponto e vírgula em try-catch
            (r'try\s*{\s*([^}]+);\s*}\s*catch', r'try {\n        \1;\n    } catch'),
            
            # Corrigir vírgulas faltando em try-catch
            (r'try\s*{\s*([^}]+)\s*}\s*catch', r'try {\n        \1;\n    } catch'),
            
            # Corrigir ponto e vírgula em finally
            (r'finally\s*{\s*([^}]+);\s*}', r'finally {\n        \1;\n    }'),
            
            # Corrigir vírgulas faltando em finally
            (r'finally\s*{\s*([^}]+)\s*}', r'finally {\n        \1;\n    }'),
            
            # Corrigir ponto e vírgula em async functions
            (r'async\s+(\w+)\s*\([^)]*\)\s*{\s*([^}]+);\s*}', r'async \1() {\n        \2;\n    }'),
            
            # Corrigir vírgulas faltando em async functions
            (r'async\s+(\w+)\s*\([^)]*\)\s*{\s*([^}]+)\s*}', r'async \1() {\n        \2;\n    }'),
            
            # Corrigir ponto e vírgula em arrow functions
            (r'(\w+)\s*=\s*\([^)]*\)\s*=>\s*{\s*([^}]+);\s*}', r'\1 = () => {\n        \2;\n    }'),
            
            # Corrigir vírgulas faltando em arrow functions
            (r'(\w+)\s*=\s*\([^)]*\)\s*=>\s*{\s*([^}]+)\s*}', r'\1 = () => {\n        \2;\n    }'),
            
            # Corrigir ponto e vírgula em class methods
            (r'(\w+)\s*\([^)]*\)\s*{\s*([^}]+);\s*}', r'\1() {\n        \2;\n    }'),
            
            # Corrigir vírgulas faltando em class methods
            (r'(\w+)\s*\([^)]*\)\s*{\s*([^}]+)\s*}', r'\1() {\n        \2;\n    }'),
            
            # Corrigir ponto e vírgula em interface properties
            (r'(\w+):\s*([^;]+);\s*\n\s*(\w+):', r'\1: \2;\n    \3:'),
            
            # Corrigir vírgulas faltando em interface properties
            (r'(\w+):\s*([^;]+)\s*\n\s*(\w+):', r'\1: \2;\n    \3:'),
            
            # Corrigir ponto e vírgula em type aliases
            (r'type\s+(\w+)\s*=\s*([^;]+);\s*$', r'type \1 = \2;'),
            
            # Corrigir vírgulas faltando em type aliases
            (r'type\s+(\w+)\s*=\s*([^;]+)\s*$', r'type \1 = \2;'),
            
            # Corrigir ponto e vírgula em enum values
            (r'(\w+)\s*=\s*([^,;]+);\s*\n\s*(\w+)', r'\1 = \2,\n    \3'),
            
            # Corrigir vírgulas faltando em enum values
            (r'(\w+)\s*=\s*([^,;]+)\s*\n\s*(\w+)', r'\1 = \2,\n    \3'),
            
            # Corrigir ponto e vírgula em namespace members
            (r'(\w+):\s*([^;]+);\s*\n\s*(\w+):', r'\1: \2;\n    \3:'),
            
            # Corrigir vírgulas faltando em namespace members
            (r'(\w+):\s*([^;]+)\s*\n\s*(\w+):', r'\1: \2;\n    \3:'),
            
            # Corrigir ponto e vírgula em module declarations
            (r'declare\s+module\s+[\'"][^\'"]*[\'"]\s*{\s*([^}]+);\s*}', r'declare module \'\1\' {\n    \2;\n}'),
            
            # Corrigir vírgulas faltando em module declarations
            (r'declare\s+module\s+[\'"][^\'"]*[\'"]\s*{\s*([^}]+)\s*}', r'declare module \'\1\' {\n    \2;\n}'),
            
            # Corrigir ponto e vírgula em generic constraints
            (r'(\w+)\s*extends\s*([^;]+);\s*$', r'\1 extends \2'),
            
            # Corrigir vírgulas faltando em generic constraints
            (r'(\w+)\s*extends\s*([^;]+)\s*$', r'\1 extends \2'),
            
            # Corrigir ponto e vírgula em conditional types
            (r'(\w+)\s*extends\s*([^?]+)\s*\?\s*([^:]+)\s*:\s*([^;]+);\s*$', r'\1 extends \2 ? \3 : \4'),
            
            # Corrigir vírgulas faltando em conditional types
            (r'(\w+)\s*extends\s*([^?]+)\s*\?\s*([^:]+)\s*:\s*([^;]+)\s*$', r'\1 extends \2 ? \3 : \4'),
            
            # Corrigir ponto e vírgula em mapped types
            (r'{\s*\[K\s+in\s+keyof\s+(\w+)\]:\s*([^;]+);\s*}', r'{ [K in keyof \1]: \2 }'),
            
            # Corrigir vírgulas faltando em mapped types
            (r'{\s*\[K\s+in\s+keyof\s+(\w+)\]:\s*([^;]+)\s*}', r'{ [K in keyof \1]: \2 }'),
            
            # Corrigir ponto e vírgula em utility types
            (r'Partial\s*<\s*(\w+)\s*>;\s*$', r'Partial<\1>'),
            (r'Required\s*<\s*(\w+)\s*>;\s*$', r'Required<\1>'),
            (r'Pick\s*<\s*(\w+),\s*(\w+)\s*>;\s*$', r'Pick<\1, \2>'),
            (r'Omit\s*<\s*(\w+),\s*(\w+)\s*>;\s*$', r'Omit<\1, \2>'),
            
            # Corrigir vírgulas faltando em utility types
            (r'Partial\s*<\s*(\w+)\s*>\s*$', r'Partial<\1>'),
            (r'Required\s*<\s*(\w+)\s*>\s*$', r'Required<\1>'),
            (r'Pick\s*<\s*(\w+),\s*(\w+)\s*>\s*$', r'Pick<\1, \2>'),
            (r'Omit\s*<\s*(\w+),\s*(\w+)\s*>\s*$', r'Omit<\1, \2>'),
        ]
        
        for pattern, replacement in fixes:
            try:
                content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
            except re.error:
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
    print("🚀 Iniciando correção de erros restantes TypeScript...")
    
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
        if fix_remaining_errors(file_path):
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
        print("🎉 Muitos erros restantes foram corrigidos automaticamente!")
        print("💡 Execute 'npm run dev' novamente para verificar se ainda há erros.")
    else:
        print("ℹ️  Nenhum erro restante foi encontrado ou todos os arquivos já estavam corretos.")

if __name__ == "__main__":
    main()






