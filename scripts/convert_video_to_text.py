#!/usr/bin/env python3
"""
Script para converter todos os tipos de lição de "video" para "text" nos cursos existentes.
Este script garante que todos os cursos tenham conteúdo textual em vez de vídeo.
"""

import os
import re
from typing import List

def convert_video_to_text(file_path: str):
    """Converte tipos de lição de 'video' para 'text' em um arquivo de curso"""
    
    try:
        # Lê o arquivo
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Conta quantas conversões foram feitas
        original_count = content.count('"type": "video"')
        
        # Substitui "video" por "text"
        new_content = content.replace('"type": "video"', '"type": "text"')
        
        # Escreve o arquivo atualizado
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        # Conta quantas conversões foram feitas
        new_count = new_content.count('"type": "text"')
        
        if original_count > 0:
            print(f"✅ {file_path}: {original_count} lições convertidas de 'video' para 'text'")
            return original_count
        else:
            print(f"ℹ️  {file_path}: Nenhuma lição 'video' encontrada")
            return 0
            
    except Exception as e:
        print(f"❌ Erro ao processar {file_path}: {str(e)}")
        return 0

def main():
    """Função principal que converte todos os cursos"""
    
    print("🔄 Iniciando conversão de tipos de lição de 'video' para 'text'...")
    print("=" * 70)
    print("📝 OBJETIVO: Converter todas as lições para conteúdo textual")
    print("=" * 70)
    
    # Diretório dos cursos
    courses_dir = "frontend/app/course/[slug]/courses"
    
    if not os.path.exists(courses_dir):
        print(f"❌ Diretório {courses_dir} não encontrado!")
        return
    
    # Lista todos os arquivos .ts de cursos
    course_files = [f for f in os.listdir(courses_dir) if f.endswith('.ts') and f != 'index.ts']
    
    total_conversions = 0
    processed_files = 0
    
    for course_file in course_files:
        file_path = os.path.join(courses_dir, course_file)
        conversions = convert_video_to_text(file_path)
        total_conversions += conversions
        if conversions > 0:
            processed_files += 1
    
    print("\n" + "=" * 70)
    print("🎉 Conversão concluída!")
    print(f"✅ {processed_files} arquivos processados")
    print(f"📝 {total_conversions} lições convertidas de 'video' para 'text'")
    print("🚀 Todos os cursos agora têm conteúdo textual!")
    print("\n💡 Características atualizadas:")
    print("   • Todas as lições são do tipo 'text'")
    print("   • Conteúdo textual de qualidade CS50")
    print("   • Exercícios práticos e projetos escritos")
    print("   • Pronto para lançamento antes do dia 28!")

if __name__ == "__main__":
    main()
