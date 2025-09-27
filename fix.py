import os
import re

def fix_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        content = re.sub(r'(\w+):\s*([^,}]+);\s*\n\s*(\w+):', r'\1: \2,\n                \3:', content)
        content = re.sub(r'(\w+):\s*([^,}]+);\s*\n\s*}', r'\1: \2\n            }', content)
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except:
        return False

ts_files = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.next', '.vercel']]
    for file in files:
        if file.endswith(('.ts', '.tsx')) and not file.startswith('.'):
            ts_files.append(os.path.join(root, file))

fixed = 0
for file_path in ts_files:
    if fix_file(file_path):
        print(f'✅ {file_path}')
        fixed += 1

print(f'Concluído! {fixed} arquivos corrigidos de {len(ts_files)}')






