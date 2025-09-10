#!/usr/bin/env python3
"""
Script para expandir um curso específico para 160 aulas
"""

import os

COURSE_DIR = "frontend/app/course/[slug]/courses"

def expand_single_course(course_slug: str):
    """Expande um curso para 160 aulas"""
    
    # Mapeamento de títulos
    titles = {
        'gestao-trafego': 'Gestão de Tráfego',
        'product-management': 'Product Management',
        'software-architecture': 'Software Architecture',
        'full-stack-development': 'Full Stack Development',
        'game-development': 'Game Development',
        'backend-development': 'Backend Development',
        'data-science': 'Data Science',
        'frontend-development': 'Frontend Development',
        'react-native-mobile': 'React Native Mobile',
        'machine-learning': 'Machine Learning'
    }
    
    title = titles.get(course_slug, course_slug.replace('-', ' ').title())
    
    # Template básico
    template = f'''import {{ CourseContent }} from '../types/course-types';

export const {course_slug.replace('-', '')}Course: CourseContent = {{
    id: "{course_slug}",
    title: "{title}",
    description: "Curso completo de {title.lower()} com conteúdo CS50 expandido para 160 aulas",
    category: "Tecnologia",
    level: "Intermediário",
    duration_hours: 130,
    total_modules: 10,
    total_lessons: 160,
    price: 297.00,
    currency: "BRL",
    instructor: "Fenix Academy",
    certificate: true,
    languages: ["pt-BR"],
    tags: ["{title}", "Programação", "Tecnologia", "CS50"],
    thumbnail: "/images/courses/{course_slug}.jpg",
    status: "active",
    modules: [
'''
    
    # Gerar 10 módulos com 16 aulas cada
    for module_id in range(1, 11):
        module_titles = [
            'Fundamentos e Introdução',
            'Conceitos Básicos',
            'Técnicas Intermediárias',
            'Ferramentas e Recursos',
            'Avançado e Otimização',
            'Integração e APIs',
            'Segurança e Boas Práticas',
            'Performance e Escalabilidade',
            'Deploy e Operações',
            'Projetos Práticos e Aplicações'
        ]
        
        module_title = module_titles[module_id - 1]
        
        template += f'''        {{
            id: {module_id},
            title: "Módulo {module_id}: {module_title}",
            description: "Módulo {module_id}: {module_title}",
            duration_hours: 13,
            lessons: [
'''
        
        # Adicionar as 16 aulas do módulo
        for i in range(16):
            lesson_id = (module_id - 1) * 16 + i + 1
            
            # Tipos de aula variados
            if i % 5 == 0:
                lesson_type = 'project'
                lesson_title = f"Projeto {i+1}: {module_title}"
                duration = "90 min"
                content = f"Projeto prático para consolidar os conhecimentos do módulo {module_id}. Aplique todos os conceitos aprendidos em um projeto real e funcional."
            elif i % 3 == 0:
                lesson_type = 'exercise'
                lesson_title = f"Exercício {i+1}: {module_title}"
                duration = "45 min"
                content = f"Exercício prático para reforçar os conceitos da aula. Atividades hands-on que consolidam o aprendizado teórico."
            else:
                lesson_type = 'text'
                lesson_title = f"Aula {i+1}: {module_title}"
                duration = "25 min"
                content = f"Conteúdo teórico e prático sobre {module_title.lower()}. Explicações detalhadas com exemplos reais e casos de uso prático."
            
            template += f'''                {{
                    id: {lesson_id},
                    title: "{lesson_title}",
                    type: "{lesson_type}",
                    duration: "{duration}",
                    content: "{content}",
                    completed: false,
                    locked: {str(module_id > 1).lower()}
                }}{',' if i < 15 else ''}
'''
        
        template += '''            ]
        }'''
        if module_id < 10:
            template += ','
        template += '\n'
    
    template += '''    ]
};
'''
    
    return template

def main():
    """Função principal"""
    print("🚀 EXPANSOR DE CURSO ÚNICO - FENIX ACADEMY")
    print("=" * 50)
    
    # Expandir apenas gestao-trafego primeiro
    course_slug = 'gestao-trafego'
    
    try:
        print(f"🔄 Expandindo: {course_slug}")
        
        # Gerar conteúdo expandido
        expanded_content = expand_single_course(course_slug)
        
        # Salvar arquivo
        filename = f"{course_slug}.ts"
        filepath = os.path.join(COURSE_DIR, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(expanded_content)
        
        print(f"✅ {course_slug} expandido para 160 aulas!")
        
    except Exception as e:
        print(f"❌ Erro ao processar {course_slug}: {e}")

if __name__ == "__main__":
    main()














