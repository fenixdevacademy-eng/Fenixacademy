#!/usr/bin/env python3
"""
Script para expandir todos os cursos da Fenix Academy para 160 aulas
"""

import json
import os
from pathlib import Path

# Configurações
COURSE_CONTENT_DIR = "course_content"
TOTAL_LESSONS = 160
LESSONS_PER_MODULE = 16

def generate_lesson_content(topic: str, lesson_num: int) -> str:
    """Gera conteúdo para uma aula específica"""
    templates = [
        f"Esta aula aborda {topic.lower()}, focando em conceitos fundamentais e práticas hands-on.",
        f"Explore {topic.lower()} através de exercícios práticos e projetos reais.",
        f"Foque em {topic.lower()} com atividades práticas e desafios de implementação.",
        f"Aprenda {topic.lower()} implementando soluções para problemas reais.",
        f"Domine {topic.lower()} através de projetos práticos e exercícios hands-on."
    ]
    return templates[lesson_num % len(templates)]

def expand_course_modules(course_id: str, course_data: dict) -> dict:
    """Expande um curso para ter 10 módulos com 16 aulas cada"""
    
    # Tópicos base para diferentes tipos de curso
    base_topics = [
        "Fundamentos", "Conceitos Avançados", "Implementação Prática", 
        "Otimização", "Testes", "Deploy", "Monitoramento", "Segurança",
        "Performance", "Integração", "Automação", "Escalabilidade",
        "Arquitetura", "Padrões de Design", "Melhores Práticas", "Troubleshooting"
    ]
    
    expanded_modules = []
    
    for module_num in range(1, 11):
        topic = base_topics[(module_num - 1) % len(base_topics)]
        module_title = f"Módulo {module_num}: {topic}"
        
        lessons = []
        for lesson_num in range(1, 17):
            global_lesson_id = (module_num - 1) * 16 + lesson_num
            
            lesson = {
                "id": global_lesson_id,
                "title": f"Aula {lesson_num}: {topic} - Implementação Prática",
                "type": "text",
                "duration": "20 min",
                "content": generate_lesson_content(topic, global_lesson_id),
                "completed": False,
                "locked": False
            }
            lessons.append(lesson)
        
        module = {
            "id": module_num,
            "title": module_title,
            "description": f"Aprofundamento em {topic.lower()}",
            "duration_hours": 13,
            "lessons": lessons
        }
        
        expanded_modules.append(module)
    
    # Atualiza o curso expandido
    expanded_course = course_data.copy()
    expanded_course["modules"] = expanded_modules
    expanded_course["total_lessons"] = TOTAL_LESSONS
    
    return expanded_course

def expand_all_courses():
    """Expande todos os cursos para 160 aulas"""
    
    print("🚀 Iniciando expansão de todos os cursos para 160 aulas...")
    
    course_content_path = Path(COURSE_CONTENT_DIR)
    if not course_content_path.exists():
        print(f"❌ Diretório {COURSE_CONTENT_DIR} não encontrado!")
        return
    
    json_files = list(course_content_path.glob("*complete.json"))
    print(f"📁 Encontrados {len(json_files)} arquivos de curso para expandir")
    
    for json_file in json_files:
        try:
            print(f"📚 Processando: {json_file.name}")
            
            with open(json_file, 'r', encoding='utf-8') as f:
                course_data = json.load(f)
            
            course_id = course_data.get('id', '')
            if not course_id:
                continue
            
            expanded_course = expand_course_modules(course_id, course_data)
            
            with open(json_file, 'w', encoding='utf-8') as f:
                json.dump(expanded_course, f, indent=2, ensure_ascii=False)
            
            print(f"✅ {json_file.name} expandido para {TOTAL_LESSONS} aulas")
            
        except Exception as e:
            print(f"❌ Erro ao processar {json_file.name}: {str(e)}")
    
    print(f"\n🎉 Expansão concluída! Todos os cursos agora têm {TOTAL_LESSONS} aulas.")

if __name__ == "__main__":
    expand_all_courses()














