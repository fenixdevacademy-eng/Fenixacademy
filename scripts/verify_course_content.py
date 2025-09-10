#!/usr/bin/env python3
"""
Script para verificar e corrigir conteúdos dos arquivos JSON de cursos
"""

import json
import os
from pathlib import Path

def load_json_file(file_path):
    """Carrega um arquivo JSON"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"❌ Erro ao carregar {file_path}: {e}")
        return None

def verify_course_structure(course_data):
    """Verifica se a estrutura do curso está correta"""
    required_fields = ['id', 'title', 'description', 'modules']
    
    for field in required_fields:
        if field not in course_data:
            print(f"⚠️  Campo obrigatório ausente: {field}")
            return False
    
    # Verificar módulos
    if not isinstance(course_data['modules'], list):
        print("⚠️  'modules' deve ser uma lista")
        return False
    
    for i, module in enumerate(course_data['modules']):
        if 'id' not in module or 'title' not in module:
            print(f"⚠️  Módulo {i+1} está incompleto")
            return False
        
        # Verificar aulas
        if 'lessons' in module:
            for j, lesson in enumerate(module['lessons']):
                if 'id' not in lesson or 'title' not in lesson:
                    print(f"⚠️  Aula {j+1} do módulo {i+1} está incompleta")
                    return False
    
    return True

def fix_placeholders_in_content(content):
    """Corrige placeholders incorretos no conteúdo"""
    if isinstance(content, str):
        # Corrigir placeholder incorreto
        content = content.replace(
            "{module.lower().replace(' ', '')}",
            "{module_name}"
        )
        # Corrigir outros placeholders comuns
        content = content.replace("{{", "{").replace("}}", "}")
    return content

def fix_course_content(course_data):
    """Corrige placeholders no conteúdo do curso"""
    fixed = False
    
    # Corrigir conteúdo dos módulos
    for module in course_data.get('modules', []):
        # Corrigir descrição do módulo
        if 'description' in module:
            module['description'] = fix_placeholders_in_content(module['description'])
        
        # Corrigir conteúdo das aulas
        for lesson in module.get('lessons', []):
            if 'content' in lesson:
                original_content = lesson['content']
                lesson['content'] = fix_placeholders_in_content(lesson['content'])
                if original_content != lesson['content']:
                    fixed = True
    
    return fixed

def process_course_file(file_path):
    """Processa um arquivo de curso"""
    print(f"\n🔍 Processando: {file_path}")
    
    course_data = load_json_file(file_path)
    if not course_data:
        return False
    
    # Verificar estrutura
    if not verify_course_structure(course_data):
        print(f"❌ Estrutura inválida em {file_path}")
        return False
    
    # Corrigir placeholders
    if fix_course_content(course_data):
        # Salvar arquivo corrigido
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(course_data, f, indent=2, ensure_ascii=False)
        print(f"✅ Arquivo corrigido: {file_path}")
        return True
    else:
        print(f"✅ Arquivo já está correto: {file_path}")
        return False

def main():
    """Função principal"""
    print("🎓 Verificando e corrigindo conteúdos de cursos...")
    
    # Diretório com os arquivos JSON (relativo ao script)
    script_dir = Path(__file__).parent
    course_content_dir = script_dir.parent / "course_content"
    
    print(f"🔍 Procurando em: {course_content_dir.absolute()}")
    
    if not course_content_dir.exists():
        print(f"❌ Diretório não encontrado: {course_content_dir}")
        print("📁 Diretórios disponíveis:")
        for item in script_dir.parent.iterdir():
            if item.is_dir():
                print(f"  - {item.name}")
        return
    
    # Lista de arquivos para processar
    json_files = list(course_content_dir.glob("*.json"))
    
    if not json_files:
        print("❌ Nenhum arquivo JSON encontrado")
        return
    
    processed_count = 0
    fixed_count = 0
    
    for file_path in json_files:
        if process_course_file(file_path):
            fixed_count += 1
        processed_count += 1
    
    print(f"\n🎉 Processamento concluído!")
    print(f"📊 Arquivos processados: {processed_count}")
    print(f"🔧 Arquivos corrigidos: {fixed_count}")

if __name__ == "__main__":
    main()
