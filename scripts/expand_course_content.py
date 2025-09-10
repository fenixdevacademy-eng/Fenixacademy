#!/usr/bin/env python3
"""
Script para expandir todos os cursos da Fenix Academy para 160 aulas
Autor: Fenix Academy
Data: 2024
"""

import os
import json
import re
from typing import Dict, List, Any
from datetime import datetime

# Configurações
COURSE_DIR = "frontend/app/course/[slug]/courses"
OUTPUT_DIR = "frontend/app/course/[slug]/courses"
BACKUP_DIR = "frontend/app/course/[slug]/courses/backup"

# Estrutura dos cursos
COURSE_STRUCTURE = {
    'web-fundamentals': {
        'title': 'Fundamentos de Desenvolvimento Web',
        'category': 'Frontend',
        'level': 'Iniciante',
        'modules': [
            'Introdução ao Desenvolvimento Web',
            'HTML5 Fundamentos',
            'CSS3 e Estilização',
            'JavaScript Básico',
            'JavaScript Avançado',
            'Responsividade e Mobile First',
            'Frameworks CSS',
            'JavaScript Moderno (ES6+)',
            'Ferramentas de Build',
            'Deploy e Hospedagem'
        ]
    },
    'python-data-science': {
        'title': 'Python para Data Science',
        'category': 'Data Science',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos do Python',
            'Estruturas de Dados',
            'Manipulação de Dados',
            'Visualização de Dados',
            'Análise Estatística',
            'Machine Learning Básico',
            'Deep Learning',
            'Big Data e Spark',
            'APIs e Web Scraping',
            'Projetos Práticos'
        ]
    },
    'react-advanced': {
        'title': 'React Avançado e Moderno',
        'category': 'Frontend',
        'level': 'Avançado',
        'modules': [
            'Fundamentos Avançados',
            'Hooks Avançados',
            'Context API e Redux',
            'Performance e Otimização',
            'Testing e Debugging',
            'Server-Side Rendering',
            'PWA e Offline',
            'Micro Frontends',
            'Arquitetura de Aplicações',
            'Deploy e CI/CD'
        ]
    },
    'nodejs-apis': {
        'title': 'Node.js e APIs Backend',
        'category': 'Backend',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos do Node.js',
            'Express.js Framework',
            'Banco de Dados',
            'Autenticação e Autorização',
            'APIs RESTful',
            'GraphQL',
            'Microserviços',
            'Testes e Debugging',
            'Performance e Escalabilidade',
            'Deploy e Monitoramento'
        ]
    },
    'machine-learning': {
        'title': 'Machine Learning',
        'category': 'AI/ML',
        'level': 'Avançado',
        'modules': [
            'Fundamentos de ML',
            'Algoritmos Supervisionados',
            'Algoritmos Não Supervisionados',
            'Deep Learning',
            'NLP e Processamento de Texto',
            'Computer Vision',
            'Reinforcement Learning',
            'MLOps e Deploy',
            'Ética em IA',
            'Projetos Práticos'
        ]
    },
    'flutter-mobile': {
        'title': 'Flutter para Desenvolvimento Mobile',
        'category': 'Mobile',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos do Flutter',
            'Widgets e UI',
            'Navegação e Roteamento',
            'State Management',
            'Banco de Dados Local',
            'APIs e HTTP',
            'Notificações Push',
            'Testes e Debugging',
            'Performance e Otimização',
            'Deploy e Publicação'
        ]
    },
    'cybersecurity': {
        'title': 'Cibersegurança',
        'category': 'Security',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos de Segurança',
            'Análise de Vulnerabilidades',
            'Penetration Testing',
            'Forense Digital',
            'Criptografia',
            'Segurança de Redes',
            'Segurança de Aplicações',
            'Incident Response',
            'Compliance e Governança',
            'Projetos Práticos'
        ]
    },
    'devops-docker': {
        'title': 'DevOps e Docker',
        'category': 'DevOps',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos de DevOps',
            'Docker e Containers',
            'Kubernetes',
            'CI/CD Pipelines',
            'Infraestrutura como Código',
            'Monitoramento e Logs',
            'Segurança em DevOps',
            'Cloud Native',
            'Microserviços',
            'Deploy e Operações'
        ]
    },
    'aws-cloud': {
        'title': 'AWS Cloud Computing',
        'category': 'Cloud',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos da AWS',
            'Computação (EC2, Lambda)',
            'Armazenamento (S3, EBS)',
            'Banco de Dados',
            'Rede e Segurança',
            'Serverless',
            'Containers e Kubernetes',
            'Machine Learning',
            'Monitoramento e Logs',
            'Arquiteturas na Nuvem'
        ]
    },
    'blockchain-smart-contracts': {
        'title': 'Blockchain e Smart Contracts',
        'category': 'Blockchain',
        'level': 'Avançado',
        'modules': [
            'Fundamentos de Blockchain',
            'Criptografia e Hash',
            'Bitcoin e Altcoins',
            'Ethereum e Smart Contracts',
            'Solidity Programming',
            'DeFi e DApps',
            'NFTs e Tokens',
            'Segurança e Auditoria',
            'Escalabilidade',
            'Projetos Práticos'
        ]
    },
    'react-native-mobile': {
        'title': 'React Native Mobile',
        'category': 'Mobile',
        'level': 'Avançado',
        'modules': [
            'Fundamentos do React Native',
            'Componentes Nativos',
            'Navegação e Roteamento',
            'State Management',
            'APIs Nativas',
            'Performance e Otimização',
            'Testing e Debugging',
            'Deploy e Publicação',
            'Integração com Backend',
            'Projetos Avançados'
        ]
    },
    'data-science': {
        'title': 'Data Science',
        'category': 'Data Science',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos de Data Science',
            'Coleta e Limpeza de Dados',
            'Exploração e Análise',
            'Visualização de Dados',
            'Machine Learning',
            'Deep Learning',
            'Big Data',
            'Storytelling com Dados',
            'Ética e Privacidade',
            'Projetos Práticos'
        ]
    },
    'game-development': {
        'title': 'Game Development',
        'category': 'Game Dev',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos de Game Dev',
            'Game Design',
            'Programação de Jogos',
            'Física e Matemática',
            'IA para Jogos',
            'Audio e Música',
            '3D Graphics',
            'Multiplayer e Networking',
            'Otimização e Performance',
            'Deploy e Monetização'
        ]
    },
    'ui-ux-design': {
        'title': 'UI/UX Design',
        'category': 'Design',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos de Design',
            'User Research',
            'Wireframing e Prototipagem',
            'Design Systems',
            'Visual Design',
            'Interaction Design',
            'Usabilidade e Acessibilidade',
            'Design Thinking',
            'Ferramentas e Software',
            'Portfolio e Carreira'
        ]
    },
    'backend-development': {
        'title': 'Backend Development',
        'category': 'Backend',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos de Backend',
            'Arquitetura de Sistemas',
            'Banco de Dados',
            'APIs e Web Services',
            'Autenticação e Segurança',
            'Performance e Escalabilidade',
            'Microserviços',
            'Cloud e DevOps',
            'Testing e Qualidade',
            'Deploy e Monitoramento'
        ]
    },
    'frontend-development': {
        'title': 'Frontend Development',
        'category': 'Frontend',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos de Frontend',
            'HTML5 Semântico',
            'CSS3 Avançado',
            'JavaScript ES6+',
            'Frameworks Modernos',
            'State Management',
            'Performance e Otimização',
            'Testing e Debugging',
            'PWA e Mobile',
            'Deploy e CI/CD'
        ]
    },
    'full-stack-development': {
        'title': 'Full Stack Development',
        'category': 'Full Stack',
        'level': 'Avançado',
        'modules': [
            'Arquitetura Full Stack',
            'Frontend Avançado',
            'Backend Robusto',
            'Banco de Dados',
            'APIs e Integração',
            'Segurança e Autenticação',
            'Performance e Escalabilidade',
            'Testing e Qualidade',
            'DevOps e Deploy',
            'Projetos Completos'
        ]
    },
    'product-management': {
        'title': 'Product Management',
        'category': 'Management',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos de Product Management',
            'Estratégia de Produto',
            'User Research',
            'Product Discovery',
            'Roadmapping',
            'Agile e Scrum',
            'Analytics e Métricas',
            'Stakeholder Management',
            'Go-to-Market',
            'Carreira em Product Management'
        ]
    },
    'software-architecture': {
        'title': 'Software Architecture',
        'category': 'Architecture',
        'level': 'Avançado',
        'modules': [
            'Fundamentos de Arquitetura',
            'Padrões Arquiteturais',
            'Microserviços',
            'Cloud Native',
            'Performance e Escalabilidade',
            'Segurança e Compliance',
            'Monitoramento e Observabilidade',
            'DevOps e CI/CD',
            'Arquitetura de Dados',
            'Projetos de Arquitetura'
        ]
    },
    'gestao-trafego': {
        'title': 'Gestão de Tráfego',
        'category': 'Marketing',
        'level': 'Intermediário',
        'modules': [
            'Fundamentos de Gestão de Tráfego',
            'Google Ads',
            'Facebook Ads',
            'LinkedIn Ads',
            'Analytics e Métricas',
            'Otimização de Campanhas',
            'Remarketing',
            'Automação de Marketing',
            'ROI e Performance',
            'Estratégias Avançadas'
        ]
    }
}

def create_backup():
    """Cria backup dos arquivos existentes"""
    if not os.path.exists(BACKUP_DIR):
        os.makedirs(BACKUP_DIR)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"courses_backup_{timestamp}.txt")
    
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

def generate_lesson_content(module_title: str, lesson_number: int, course_title: str) -> str:
    """Gera conteúdo de qualidade CS50 para uma aula"""
    
    # Templates de conteúdo baseados no tipo de módulo
    if "Fundamentos" in module_title or "Introdução" in module_title:
        content = f"""Este módulo introduz os conceitos fundamentais de {course_title}. Você aprenderá os princípios básicos, terminologia essencial e ferramentas necessárias para começar sua jornada. O foco está em estabelecer uma base sólida que será expandida nos módulos seguintes. Cada conceito é explicado de forma clara e prática, com exemplos reais e exercícios para consolidar o aprendizado."""
    
    elif "HTML" in module_title:
        content = f"""HTML5 é a linguagem de marcação padrão para criar páginas web. Nesta aula, você aprenderá sobre elementos semânticos, estrutura de documentos e boas práticas. O HTML5 introduziu novos elementos que tornam o código mais semântico e acessível. Você verá como criar estruturas bem organizadas e como integrar com CSS e JavaScript."""
    
    elif "CSS" in module_title:
        content = f"""CSS3 oferece recursos avançados para estilização e layout de páginas web. Você aprenderá sobre flexbox, grid, animações e responsividade. O CSS moderno permite criar interfaces sofisticadas e adaptáveis a diferentes dispositivos. Cada propriedade será explicada com exemplos práticos e casos de uso reais."""
    
    elif "JavaScript" in module_title:
        content = f"""JavaScript é a linguagem de programação da web. Nesta aula, você explorará conceitos fundamentais como variáveis, funções, objetos e manipulação do DOM. O JavaScript moderno (ES6+) oferece recursos poderosos como arrow functions, destructuring e módulos. Você verá como criar interatividade e dinamismo nas páginas web."""
    
    elif "React" in module_title:
        content = f"""React é uma biblioteca JavaScript para construir interfaces de usuário. Você aprenderá sobre componentes, props, state e hooks. O React utiliza um Virtual DOM para otimizar performance e oferece uma arquitetura baseada em componentes reutilizáveis. Cada conceito será demonstrado com exemplos práticos e projetos reais."""
    
    elif "Node.js" in module_title or "Backend" in module_title:
        content = f"""Node.js permite executar JavaScript no servidor. Você aprenderá sobre criação de APIs, manipulação de dados e integração com bancos de dados. O Node.js é ideal para aplicações em tempo real e oferece um ecossistema rico de pacotes. Cada funcionalidade será implementada passo a passo."""
    
    elif "Machine Learning" in module_title or "AI" in module_title:
        content = f"""Machine Learning é um subcampo da inteligência artificial que permite computadores aprenderem sem programação explícita. Você explorará algoritmos, modelos e técnicas para análise preditiva. O foco está em aplicações práticas e compreensão dos conceitos fundamentais. Cada algoritmo será explicado com exemplos reais."""
    
    elif "Mobile" in module_title or "Flutter" in module_title:
        content = f"""Desenvolvimento mobile requer conhecimento específico de plataformas e ferramentas. Você aprenderá sobre UI/UX mobile, performance e integração com APIs. O desenvolvimento cross-platform permite criar apps para múltiplas plataformas com um código base. Cada conceito será demonstrado com projetos práticos."""
    
    elif "Security" in module_title or "Cybersecurity" in module_title:
        content = f"""Cibersegurança é essencial no mundo digital atual. Você aprenderá sobre vulnerabilidades, ataques e técnicas de proteção. O foco está em compreender ameaças e implementar medidas de segurança efetivas. Cada conceito será explicado com exemplos práticos e cenários reais."""
    
    elif "DevOps" in module_title or "Docker" in module_title:
        content = f"""DevOps integra desenvolvimento e operações para entrega contínua. Você aprenderá sobre containers, CI/CD e automação. O Docker permite empacotar aplicações com suas dependências. Cada ferramenta será explorada com exemplos práticos e projetos reais."""
    
    elif "Cloud" in module_title or "AWS" in module_title:
        content = f"""Computação em nuvem oferece recursos escaláveis e flexíveis. Você aprenderá sobre serviços AWS, arquiteturas cloud-native e boas práticas. O foco está em compreender como projetar e implementar soluções na nuvem. Cada serviço será explorado com casos de uso reais."""
    
    elif "Blockchain" in module_title:
        content = f"""Blockchain é uma tecnologia revolucionária para transações seguras e descentralizadas. Você aprenderá sobre criptografia, consenso e smart contracts. O foco está em compreender os fundamentos e aplicações práticas. Cada conceito será explicado com exemplos e projetos reais."""
    
    elif "Data Science" in module_title:
        content = f"""Data Science combina estatística, programação e conhecimento de domínio para extrair insights dos dados. Você aprenderá sobre coleta, limpeza, análise e visualização de dados. O foco está em aplicações práticas e interpretação de resultados. Cada técnica será demonstrada com datasets reais."""
    
    elif "Game" in module_title:
        content = f"""Desenvolvimento de jogos combina programação, design e criatividade. Você aprenderá sobre game loops, física, IA e otimização. O foco está em criar experiências envolventes e performáticas. Cada conceito será implementado em projetos práticos de jogos."""
    
    elif "Design" in module_title or "UI/UX" in module_title:
        content = f"""Design de interfaces foca na experiência do usuário e usabilidade. Você aprenderá sobre princípios de design, pesquisa de usuários e prototipagem. O foco está em criar interfaces intuitivas e acessíveis. Cada conceito será aplicado em projetos práticos."""
    
    elif "Management" in module_title or "Product" in module_title:
        content = f"""Gestão de produtos requer visão estratégica e habilidades técnicas. Você aprenderá sobre discovery, roadmapping e execução. O foco está em criar produtos que resolvem problemas reais dos usuários. Cada conceito será aplicado em cenários práticos."""
    
    elif "Architecture" in module_title:
        content = f"""Arquitetura de software define a estrutura e organização de sistemas. Você aprenderá sobre padrões, princípios e boas práticas. O foco está em criar sistemas escaláveis, mantíveis e performáticos. Cada padrão será explicado com exemplos reais."""
    
    elif "Marketing" in module_title or "Tráfego" in module_title:
        content = f"""Marketing digital foca em alcançar e converter audiências online. Você aprenderá sobre campanhas, métricas e otimização. O foco está em maximizar ROI e eficiência de campanhas. Cada estratégia será demonstrada com casos práticos."""
    
    else:
        content = f"""Este módulo aborda conceitos avançados de {course_title}. Você expandirá seu conhecimento com técnicas e ferramentas profissionais. O foco está em aplicações práticas e casos de uso reais. Cada conceito será demonstrado com exemplos e projetos práticos."""
    
    # Limitar a 300 palavras
    words = content.split()
    if len(words) > 300:
        content = ' '.join(words[:300]) + "..."
    
    return content

def generate_module_lessons(module_title: str, module_id: int, course_title: str) -> List[Dict[str, Any]]:
    """Gera 16 aulas para um módulo"""
    lessons = []
    
    # Tipos de aula variados
    lesson_types = ['text', 'exercise', 'project', 'text', 'text', 'exercise', 'text', 'text', 'project', 'text', 'text', 'exercise', 'text', 'text', 'project', 'text']
    
    for i in range(16):
        lesson_id = (module_id - 1) * 16 + i + 1
        lesson_type = lesson_types[i]
        
        # Títulos específicos baseados no tipo
        if lesson_type == 'exercise':
            title = f"Exercício Prático {i+1}: {module_title}"
        elif lesson_type == 'project':
            title = f"Projeto {i+1}: {module_title}"
        else:
            title = f"Aula {i+1}: {module_title}"
        
        # Duração baseada no tipo
        if lesson_type == 'exercise':
            duration = "45 min"
        elif lesson_type == 'project':
            duration = "90 min"
        else:
            duration = "25 min"
        
        lesson = {
            "id": lesson_id,
            "title": title,
            "type": lesson_type,
            "duration": duration,
            "content": generate_lesson_content(module_title, i+1, course_title),
            "completed": False,
            "locked": module_id > 1  # Primeiro módulo desbloqueado
        }
        lessons.append(lesson)
    
    return lessons

def expand_course_file(course_slug: str, course_info: Dict[str, Any]) -> str:
    """Expande um arquivo de curso para 160 aulas"""
    
    # Template do arquivo TypeScript
    template = f'''import {{ CourseContent }} from '../types/course-types';

export const {course_slug.replace('-', '')}Course: CourseContent = {{
    id: "{course_slug}",
    title: "{course_info['title']}",
    description: "Curso completo de {course_info['title'].lower()} com conteúdo atualizado e expandido",
    category: "{course_info['category']}",
    level: "{course_info['level']}",
    duration_hours: 130,
    total_modules: 10,
    total_lessons: 160,
    price: 297.00,
    currency: "BRL",
    instructor: "Fenix Academy",
    certificate: true,
    languages: ["pt-BR"],
    tags: ["{course_info['title']}", "{course_info['category']}", "Programação", "Tecnologia"],
    thumbnail: "/images/courses/{course_slug}.jpg",
    status: "active",
    modules: [
'''
    
    # Gerar 10 módulos
    for module_id in range(1, 11):
        module_title = course_info['modules'][module_id - 1]
        lessons = generate_module_lessons(module_title, module_id, course_info['title'])
        
        template += f'''        {{
            id: {module_id},
            title: "{module_title}",
            description: "Módulo {module_id}: {module_title}",
            duration_hours: 13,
            lessons: [
'''
        
        # Adicionar as 16 aulas do módulo
        for i, lesson in enumerate(lessons):
            template += f'''                {{
                    id: {lesson['id']},
                    title: "{lesson['title']}",
                    type: "{lesson['type']}",
                    duration: "{lesson['duration']}",
                    content: "{lesson['content'].replace('"', '\\"')}",
                    completed: {str(lesson['completed']).lower()},
                    locked: {str(lesson['locked']).lower()}
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
    print("🚀 EXPANSOR DE CONTEÚDO DOS CURSOS - FENIX ACADEMY")
    print("=" * 60)
    
    # Criar backup
    backup_file = create_backup()
    print(f"📦 Backup salvo em: {backup_file}")
    
    # Verificar se o diretório existe
    if not os.path.exists(COURSE_DIR):
        print(f"❌ Diretório não encontrado: {COURSE_DIR}")
        return
    
    # Processar cada curso
    success_count = 0
    error_count = 0
    
    for course_slug, course_info in COURSE_STRUCTURE.items():
        try:
            print(f"\n🔄 Processando: {course_info['title']}")
            
            # Gerar conteúdo expandido
            expanded_content = expand_course_file(course_slug, course_info)
            
            # Nome do arquivo
            filename = f"{course_slug}.ts"
            filepath = os.path.join(COURSE_DIR, filename)
            
            # Salvar arquivo
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(expanded_content)
            
            print(f"✅ {course_info['title']} expandido para 160 aulas")
            success_count += 1
            
        except Exception as e:
            print(f"❌ Erro ao processar {course_info['title']}: {e}")
            error_count += 1
    
    # Resumo final
    print("\n" + "=" * 60)
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














