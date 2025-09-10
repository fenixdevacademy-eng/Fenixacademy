#!/usr/bin/env python3
"""
Script simples para expandir todos os cursos da Fenix Academy para 160 aulas
Autor: Fenix Academy
Data: 2024
"""

import os
from datetime import datetime

# Diretório dos cursos
COURSE_DIR = "frontend/app/course/[slug]/courses"

def create_backup():
    """Cria backup dos arquivos existentes"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = f"courses_backup_{timestamp}.txt"
    
    print(f"📦 Criando backup: {backup_file}")
    
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(f"Backup dos cursos - {timestamp}\n")
        f.write("=" * 50 + "\n\n")
        
        for course_file in os.listdir(COURSE_DIR):
            if course_file.endswith('.ts') and course_file != 'index.ts':
                file_path = os.path.join(COURSE_DIR, course_file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as cf:
                        content = cf.read()
                        f.write(f"=== {course_file} ===\n")
                        f.write(content)
                        f.write("\n\n" + "="*50 + "\n\n")
                except Exception as e:
                    f.write(f"Erro ao ler {course_file}: {e}\n")
    
    print(f"✅ Backup criado: {backup_file}")
    return backup_file

def expand_course_file(course_slug: str) -> str:
    """Expande um arquivo de curso para 160 aulas"""
    
    # Mapeamento de títulos dos cursos
    course_titles = {
        'web-fundamentals': 'Fundamentos de Desenvolvimento Web',
        'python-data-science': 'Python para Data Science',
        'react-advanced': 'React Avançado e Moderno',
        'nodejs-apis': 'Node.js e APIs Backend',
        'machine-learning': 'Machine Learning',
        'flutter-mobile': 'Flutter para Desenvolvimento Mobile',
        'cybersecurity': 'Cibersegurança',
        'devops-docker': 'DevOps e Docker',
        'aws-cloud': 'AWS Cloud Computing',
        'blockchain-smart-contracts': 'Blockchain e Smart Contracts',
        'react-native-mobile': 'React Native Mobile',
        'data-science': 'Data Science',
        'game-development': 'Game Development',
        'ui-ux-design': 'UI/UX Design',
        'backend-development': 'Backend Development',
        'frontend-development': 'Frontend Development',
        'full-stack-development': 'Full Stack Development',
        'product-management': 'Product Management',
        'software-architecture': 'Software Architecture',
        'gestao-trafego': 'Gestão de Tráfego'
    }
    
    # Mapeamento de categorias
    course_categories = {
        'web-fundamentals': 'Frontend',
        'python-data-science': 'Data Science',
        'react-advanced': 'Frontend',
        'nodejs-apis': 'Backend',
        'machine-learning': 'AI/ML',
        'flutter-mobile': 'Mobile',
        'cybersecurity': 'Security',
        'devops-docker': 'DevOps',
        'aws-cloud': 'Cloud',
        'blockchain-smart-contracts': 'Blockchain',
        'react-native-mobile': 'Mobile',
        'data-science': 'Data Science',
        'game-development': 'Game Dev',
        'ui-ux-design': 'Design',
        'backend-development': 'Backend',
        'frontend-development': 'Frontend',
        'full-stack-development': 'Full Stack',
        'product-management': 'Management',
        'software-architecture': 'Architecture',
        'gestao-trafego': 'Marketing'
    }
    
    # Mapeamento de níveis
    course_levels = {
        'web-fundamentals': 'Iniciante',
        'python-data-science': 'Intermediário',
        'react-advanced': 'Avançado',
        'nodejs-apis': 'Intermediário',
        'machine-learning': 'Avançado',
        'flutter-mobile': 'Intermediário',
        'cybersecurity': 'Intermediário',
        'devops-docker': 'Intermediário',
        'aws-cloud': 'Intermediário',
        'blockchain-smart-contracts': 'Avançado',
        'react-native-mobile': 'Avançado',
        'data-science': 'Intermediário',
        'game-development': 'Intermediário',
        'ui-ux-design': 'Intermediário',
        'backend-development': 'Intermediário',
        'frontend-development': 'Intermediário',
        'full-stack-development': 'Avançado',
        'product-management': 'Intermediário',
        'software-architecture': 'Avançado',
        'gestao-trafego': 'Intermediário'
    }
    
    title = course_titles.get(course_slug, course_slug.replace('-', ' ').title())
    category = course_categories.get(course_slug, 'Tecnologia')
    level = course_levels.get(course_slug, 'Intermediário')
    
    # Template do arquivo TypeScript
    template = f'''import {{ CourseContent }} from '../types/course-types';

export const {course_slug.replace('-', '')}Course: CourseContent = {{
    id: "{course_slug}",
    title: "{title}",
    description: "Curso completo de {title.lower()} com conteúdo atualizado e expandido para 160 aulas",
    category: "{category}",
    level: "{level}",
    duration_hours: 130,
    total_modules: 10,
    total_lessons: 160,
    price: 297.00,
    currency: "BRL",
    instructor: "Fenix Academy",
    certificate: true,
    languages: ["pt-BR"],
    tags: ["{title}", "{category}", "Programação", "Tecnologia"],
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
            elif i % 3 == 0:
                lesson_type = 'exercise'
                lesson_title = f"Exercício {i+1}: {module_title}"
                duration = "45 min"
            else:
                lesson_type = 'text'
                lesson_title = f"Aula {i+1}: {module_title}"
                duration = "25 min"
            
            # Conteúdo da aula
            if lesson_type == 'project':
                content = f"Projeto prático para consolidar os conhecimentos do módulo {module_id}. Você aplicará todos os conceitos aprendidos em um projeto real e funcional."
            elif lesson_type == 'exercise':
                content = f"Exercício prático para reforçar os conceitos da aula. Atividades hands-on que consolidam o aprendizado teórico."
            else:
                content = f"Conteúdo teórico e prático sobre {module_title.lower()}. Explicações detalhadas com exemplos reais e casos de uso."
            
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
    print("🚀 EXPANSOR SIMPLES DE CONTEÚDO DOS CURSOS - FENIX ACADEMY")
    print("=" * 70)
    
    # Verificar se o diretório existe
    if not os.path.exists(COURSE_DIR):
        print(f"❌ Diretório não encontrado: {COURSE_DIR}")
        return
    
    # Criar backup
    backup_file = create_backup()
    
    # Lista de cursos para expandir
    courses = [
        'web-fundamentals', 'python-data-science', 'react-advanced', 'nodejs-apis',
        'machine-learning', 'flutter-mobile', 'cybersecurity', 'devops-docker',
        'aws-cloud', 'blockchain-smart-contracts', 'react-native-mobile',
        'data-science', 'game-development', 'ui-ux-design', 'backend-development',
        'frontend-development', 'full-stack-development', 'product-management',
        'software-architecture', 'gestao-trafego'
    ]
    
    # Processar cada curso
    success_count = 0
    error_count = 0
    
    for course_slug in courses:
        try:
            print(f"\n🔄 Processando: {course_slug}")
            
            # Gerar conteúdo expandido
            expanded_content = expand_course_file(course_slug)
            
            # Nome do arquivo
            filename = f"{course_slug}.ts"
            filepath = os.path.join(COURSE_DIR, filename)
            
            # Salvar arquivo
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(expanded_content)
            
            print(f"✅ {course_slug} expandido para 160 aulas")
            success_count += 1
            
        except Exception as e:
            print(f"❌ Erro ao processar {course_slug}: {e}")
            error_count += 1
    
    # Resumo final
    print("\n" + "=" * 70)
    print("📊 RESUMO DA EXPANSÃO:")
    print(f"✅ Cursos expandidos com sucesso: {success_count}")
    print(f"❌ Cursos com erro: {error_count}")
    print(f"📁 Arquivos salvos em: {COURSE_DIR}")
    print(f"📦 Backup disponível em: {backup_file}")
    
    if success_count > 0:
        print("\n🎉 Expansão concluída! Todos os cursos agora têm 160 aulas.")
        print("🔧 Próximos passos:")
        print("   1. Verificar se os arquivos foram criados corretamente")
        print("   2. Testar a aplicação")
        print("   3. Ajustar conteúdo específico se necessário")
    else:
        print("\n💥 Nenhum curso foi expandido. Verifique os erros acima.")

if __name__ == "__main__":
    main()














