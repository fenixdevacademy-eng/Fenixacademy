#!/usr/bin/env python3
"""
Script rápido para corrigir erros específicos de TypeScript
"""

import os
import re

def quick_fix(file_path):
    """Correção rápida de erros específicos"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Correções específicas
        content = re.sub(r'(\w+):\s*([^,}]+);\s*\n\s*(\w+):', r'\1: \2,\n                \3:', content)
        content = re.sub(r'(\w+):\s*([^,}]+);\s*\n\s*}', r'\1: \2\n            }', content)
        content = re.sub(r'(\w+):\s*([^,}]+)\s*\n\s*(\w+):', r'\1: \2,\n                \3:', content)
        content = re.sub(r'(\w+):\s*([^,}]+)\s*\n\s*}', r'\1: \2\n            }', content)
        content = re.sub(r'(\w+):\s*([^,)]+);\s*\)', r'\1: \2)', content)
        content = re.sub(r'(\w+):\s*([^,)]+)\s*\)', r'\1: \2)', content)
        content = re.sub(r'const\s+(\w+)\s*=\s*([^;]+);\s*$', r'const \1 = \2;', content, flags=re.MULTILINE)
        content = re.sub(r'const\s+(\w+)\s*=\s*([^,;]+)\s*$', r'const \1 = \2;', content, flags=re.MULTILINE)
        content = re.sub(r'return\s+([^;]+);\s*$', r'return \1;', content, flags=re.MULTILINE)
        content = re.sub(r'return\s+([^,;]+)\s*$', r'return \1;', content, flags=re.MULTILINE)
        content = re.sub(r'if\s*\([^)]+\)\s*{\s*([^}]+);\s*}', r'if (\1) {\n        \2;\n    }', content)
        content = re.sub(r'if\s*\([^)]+\)\s*{\s*([^}]+)\s*}', r'if (\1) {\n        \2;\n    }', content)
        content = re.sub(r'for\s*\([^)]+\)\s*{\s*([^}]+);\s*}', r'for (\1) {\n        \2;\n    }', content)
        content = re.sub(r'for\s*\([^)]+\)\s*{\s*([^}]+)\s*}', r'for (\1) {\n        \2;\n    }', content)
        content = re.sub(r'while\s*\([^)]+\)\s*{\s*([^}]+);\s*}', r'while (\1) {\n        \2;\n    }', content)
        content = re.sub(r'while\s*\([^)]+\)\s*{\s*([^}]+)\s*}', r'while (\1) {\n        \2;\n    }', content)
        content = re.sub(r'case\s+([^:]+):\s*([^;]+);\s*break;', r'case \1:\n            \2;\n            break;', content)
        content = re.sub(r'case\s+([^:]+):\s*([^;]+)\s*break;', r'case \1:\n            \2;\n            break;', content)
        content = re.sub(r'try\s*{\s*([^}]+);\s*}\s*catch', r'try {\n        \1;\n    } catch', content)
        content = re.sub(r'try\s*{\s*([^}]+)\s*}\s*catch', r'try {\n        \1;\n    } catch', content)
        content = re.sub(r'finally\s*{\s*([^}]+);\s*}', r'finally {\n        \1;\n    }', content)
        content = re.sub(r'finally\s*{\s*([^}]+)\s*}', r'finally {\n        \1;\n    }', content)
        content = re.sub(r'async\s+(\w+)\s*\([^)]*\)\s*{\s*([^}]+);\s*}', r'async \1() {\n        \2;\n    }', content)
        content = re.sub(r'async\s+(\w+)\s*\([^)]*\)\s*{\s*([^}]+)\s*}', r'async \1() {\n        \2;\n    }', content)
        content = re.sub(r'(\w+)\s*=\s*\([^)]*\)\s*=>\s*{\s*([^}]+);\s*}', r'\1 = () => {\n        \2;\n    }', content)
        content = re.sub(r'(\w+)\s*=\s*\([^)]*\)\s*=>\s*{\s*([^}]+)\s*}', r'\1 = () => {\n        \2;\n    }', content)
        content = re.sub(r'(\w+)\s*\([^)]*\)\s*{\s*([^}]+);\s*}', r'\1() {\n        \2;\n    }', content)
        content = re.sub(r'(\w+)\s*\([^)]*\)\s*{\s*([^}]+)\s*}', r'\1() {\n        \2;\n    }', content)
        content = re.sub(r'(\w+):\s*([^;]+);\s*\n\s*(\w+):', r'\1: \2;\n    \3:', content)
        content = re.sub(r'(\w+):\s*([^;]+)\s*\n\s*(\w+):', r'\1: \2;\n    \3:', content)
        content = re.sub(r'type\s+(\w+)\s*=\s*([^;]+);\s*$', r'type \1 = \2;', content, flags=re.MULTILINE)
        content = re.sub(r'type\s+(\w+)\s*=\s*([^;]+)\s*$', r'type \1 = \2;', content, flags=re.MULTILINE)
        content = re.sub(r'(\w+)\s*=\s*([^,;]+);\s*\n\s*(\w+)', r'\1 = \2,\n    \3', content)
        content = re.sub(r'(\w+)\s*=\s*([^,;]+)\s*\n\s*(\w+)', r'\1 = \2,\n    \3', content)
        content = re.sub(r'(\w+):\s*([^;]+);\s*\n\s*(\w+):', r'\1: \2;\n    \3:', content)
        content = re.sub(r'(\w+):\s*([^;]+)\s*\n\s*(\w+):', r'\1: \2;\n    \3:', content)
        content = re.sub(r'declare\s+module\s+[\'"][^\'"]*[\'"]\s*{\s*([^}]+);\s*}', r'declare module \'\1\' {\n    \2;\n}', content)
        content = re.sub(r'declare\s+module\s+[\'"][^\'"]*[\'"]\s*{\s*([^}]+)\s*}', r'declare module \'\1\' {\n    \2;\n}', content)
        content = re.sub(r'(\w+)\s*extends\s*([^;]+);\s*$', r'\1 extends \2', content, flags=re.MULTILINE)
        content = re.sub(r'(\w+)\s*extends\s*([^;]+)\s*$', r'\1 extends \2', content, flags=re.MULTILINE)
        content = re.sub(r'(\w+)\s*extends\s*([^?]+)\s*\?\s*([^:]+)\s*:\s*([^;]+);\s*$', r'\1 extends \2 ? \3 : \4', content, flags=re.MULTILINE)
        content = re.sub(r'(\w+)\s*extends\s*([^?]+)\s*\?\s*([^:]+)\s*:\s*([^;]+)\s*$', r'\1 extends \2 ? \3 : \4', content, flags=re.MULTILINE)
        content = re.sub(r'{\s*\[K\s+in\s+keyof\s+(\w+)\]:\s*([^;]+);\s*}', r'{ [K in keyof \1]: \2 }', content)
        content = re.sub(r'{\s*\[K\s+in\s+keyof\s+(\w+)\]:\s*([^;]+)\s*}', r'{ [K in keyof \1]: \2 }', content)
        content = re.sub(r'Partial\s*<\s*(\w+)\s*>;\s*$', r'Partial<\1>', content, flags=re.MULTILINE)
        content = re.sub(r'Required\s*<\s*(\w+)\s*>;\s*$', r'Required<\1>', content, flags=re.MULTILINE)
        content = re.sub(r'Pick\s*<\s*(\w+),\s*(\w+)\s*>;\s*$', r'Pick<\1, \2>', content, flags=re.MULTILINE)
        content = re.sub(r'Omit\s*<\s*(\w+),\s*(\w+)\s*>;\s*$', r'Omit<\1, \2>', content, flags=re.MULTILINE)
        content = re.sub(r'Partial\s*<\s*(\w+)\s*>\s*$', r'Partial<\1>', content, flags=re.MULTILINE)
        content = re.sub(r'Required\s*<\s*(\w+)\s*>\s*$', r'Required<\1>', content, flags=re.MULTILINE)
        content = re.sub(r'Pick\s*<\s*(\w+),\s*(\w+)\s*>\s*$', r'Pick<\1, \2>', content, flags=re.MULTILINE)
        content = re.sub(r'Omit\s*<\s*(\w+),\s*(\w+)\s*>\s*$', r'Omit<\1, \2>', content, flags=re.MULTILINE)
        
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"❌ Erro: {file_path}: {e}")
        return False

def main():
    print("🚀 Correção rápida de erros TypeScript...")
    
    ts_files = []
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.next', '.vercel']]
        for file in files:
            if file.endswith(('.ts', '.tsx')) and not file.startswith('.'):
                ts_files.append(os.path.join(root, file))
    
    print(f"📊 {len(ts_files)} arquivos encontrados")
    
    fixed = 0
    for file_path in ts_files:
        if quick_fix(file_path):
            print(f"✅ {file_path}")
            fixed += 1
        else:
            print(f"⏭️  {file_path}")
    
    print(f"\n✅ Concluído! {fixed} arquivos corrigidos de {len(ts_files)}")

if __name__ == "__main__":
    main()






