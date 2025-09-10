#!/usr/bin/env python3
"""
Script para gerar páginas HTML específicas para cada curso da Fenix Academy
Layout moderno, responsivo e IMPECÁVEL!
"""

import os
from datetime import datetime

def create_course_data():
    """Retorna dados específicos para cada curso"""
    return {
        "web-development": {
            "title": "🌐 Web Development",
            "description": "Desenvolva sites e aplicações web modernas com as melhores tecnologias",
            "icon": "🌐",
            "color": "#2563eb",
            "modules": {
                "iniciante": [
                    {"title": "HTML5 Fundamentos", "duration": "45 min", "topics": ["Estrutura HTML", "Semântica", "Formulários", "SEO básico"]},
                    {"title": "CSS3 Moderno", "duration": "50 min", "topics": ["Flexbox", "Grid", "Animações", "Responsividade"]},
                    {"title": "JavaScript Básico", "duration": "55 min", "topics": ["DOM", "Eventos", "Arrays", "Funções"]}
                ]
            }
        },
        "mobile-development": {
            "title": "📱 Mobile Development", 
            "description": "Crie aplicações mobile nativas e cross-platform de alta qualidade",
            "icon": "📱",
            "color": "#10b981",
            "modules": {
                "iniciante": [
                    {"title": "Introdução Mobile", "duration": "50 min", "topics": ["Plataformas", "Nativo vs Cross-platform", "Ferramentas", "Setup"]},
                    {"title": "React Native Básico", "duration": "60 min", "topics": ["Components", "Props", "State", "Navigation"]},
                    {"title": "Flutter Fundamentos", "duration": "65 min", "topics": ["Dart", "Widgets", "Material Design", "Hot Reload"]}
                ]
            }
        },
        "data-science": {
            "title": "📊 Data Science",
            "description": "Transforme dados em insights valiosos com machine learning e análise avançada",
            "icon": "📊",
            "color": "#7c3aed",
            "modules": {
                "iniciante": [
                    {"title": "Introdução Data Science", "duration": "60 min", "topics": ["O que é DS", "Aplicações", "Ferramentas", "Workflow"]},
                    {"title": "Python Básico", "duration": "70 min", "topics": ["Sintaxe", "Estruturas", "Funções", "Bibliotecas"]},
                    {"title": "Pandas Fundamentos", "duration": "65 min", "topics": ["DataFrames", "Series", "Manipulação", "Análise"]}
                ]
            }
        }
    }

def generate_course_page(course_name, course_data):
    """Gera uma página HTML específica para cada curso"""
    
    html_content = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{course_data['title']} - Fenix Academy</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }}
        
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }}
        
        .header {{
            text-align: center;
            margin-bottom: 40px;
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }}
        
        .course-icon {{
            font-size: 4rem;
            margin-bottom: 20px;
        }}
        
        .course-title {{
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 15px;
            background: linear-gradient(45deg, {course_data['color']}, #667eea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }}
        
        .course-description {{
            font-size: 1.2rem;
            color: #666;
            max-width: 600px;
            margin: 0 auto;
        }}
        
        .stats {{
            display: flex;
            justify-content: center;
            gap: 30px;
            margin: 30px 0;
            flex-wrap: wrap;
        }}
        
        .stat {{
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            min-width: 150px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }}
        
        .stat-number {{
            font-size: 2.5rem;
            font-weight: 700;
            color: {course_data['color']};
        }}
        
        .stat-label {{
            font-size: 0.9rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        
        .levels-container {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }}
        
        .level-card {{
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }}
        
        .level-card:hover {{
            transform: translateY(-10px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }}
        
        .level-header {{
            text-align: center;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
        }}
        
        .level-title {{
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: {course_data['color']};
        }}
        
        .level-subtitle {{
            color: #666;
            font-size: 1rem;
        }}
        
        .modules-list {{
            list-style: none;
        }}
        
        .module-item {{
            background: #f8f9fa;
            margin: 15px 0;
            padding: 20px;
            border-radius: 15px;
            border-left: 4px solid {course_data['color']};
            transition: all 0.3s ease;
        }}
        
        .module-item:hover {{
            background: #e9ecef;
            transform: translateX(10px);
        }}
        
        .module-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }}
        
        .module-title {{
            font-weight: 600;
            color: #333;
            font-size: 1.1rem;
        }}
        
        .module-duration {{
            background: {course_data['color']};
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }}
        
        .module-topics {{
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }}
        
        .topic-tag {{
            background: rgba({course_data['color'].replace('#', '')}, 0.1);
            color: {course_data['color']};
            padding: 4px 10px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
        }}
        
        .footer {{
            text-align: center;
            margin-top: 50px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }}
        
        .cta-button {{
            display: inline-block;
            background: linear-gradient(45deg, {course_data['color']}, #667eea);
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }}
        
        .cta-button:hover {{
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }}
        
        @media (max-width: 768px) {{
            .container {{
                padding: 15px;
            }}
            
            .course-title {{
                font-size: 2rem;
            }}
            
            .stats {{
                flex-direction: column;
                align-items: center;
            }}
            
            .levels-container {{
                grid-template-columns: 1fr;
            }}
            
            .level-card {{
                padding: 20px;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="course-icon">{course_data['icon']}</div>
            <h1 class="course-title">{course_data['title']}</h1>
            <p class="course-description">{course_data['description']}</p>
            
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">3</div>
                    <div class="stat-label">Níveis</div>
                </div>
                <div class="stat">
                    <div class="stat-number">60</div>
                    <div class="stat-label">Aulas</div>
                </div>
                <div class="stat">
                    <div class="stat-number">120</div>
                    <div class="stat-label">Horas</div>
                </div>
                <div class="stat">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">Prático</div>
                </div>
            </div>
        </header>
        
        <div class="levels-container">"""
    
    # Adicionar níveis
    for level_name, modules in course_data['modules'].items():
        level_display = {
            'iniciante': '🟢 Iniciante',
            'intermediario': '🟡 Intermediário',
            'avancado': '🔴 Avançado'
        }
        
        html_content += f"""
            <div class="level-card">
                <div class="level-header">
                    <h2 class="level-title">{level_display[level_name]}</h2>
                    <p class="level-subtitle">20 aulas • {sum(int(module['duration'].split()[0]) for module in modules)} horas</p>
                </div>
                
                <ul class="modules-list">"""
        
        for module in modules:
            html_content += f"""
                    <li class="module-item">
                        <div class="module-header">
                            <h3 class="module-title">{module['title']}</h3>
                            <span class="module-duration">{module['duration']}</span>
                        </div>
                        <div class="module-topics">"""
            
            for topic in module['topics']:
                html_content += f'<span class="topic-tag">{topic}</span>'
            
            html_content += """
                        </div>
                    </li>"""
        
        html_content += """
                </ul>
            </div>"""
    
    html_content += f"""
        </div>
        
        <footer class="footer">
            <h3>🚀 Pronto para começar sua jornada em {course_data['title']}?</h3>
            <p>Junte-se a milhares de alunos que já transformaram suas carreiras com a Fenix Academy!</p>
            <a href="#" class="cta-button">Começar Agora - Grátis!</a>
            <p style="margin-top: 20px; color: #666; font-size: 0.9rem;">
                ✅ Acesso vitalício • ✅ Certificado • ✅ Suporte 24/7 • ✅ Projetos práticos
            </p>
        </footer>
    </div>
</body>
</html>"""
    
    return html_content

def main():
    """Função principal"""
    print("🚀 INICIANDO GERAÇÃO DAS PÁGINAS ESPECÍFICAS DOS CURSOS...")
    
    course_data = create_course_data()
    
    # Criar diretório para as páginas
    pages_dir = "fenix-course-pages"
    os.makedirs(pages_dir, exist_ok=True)
    
    total_pages = 0
    
    for course_name, course_info in course_data.items():
        print(f"🚀 Gerando página para: {course_info['title']}")
        
        # Gerar página HTML
        html_content = generate_course_page(course_name, course_info)
        
        # Salvar arquivo
        filename = f"{pages_dir}/{course_name}.html"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"  ✅ Página criada: {filename}")
        total_pages += 1
    
    print(f"\n🎉 {total_pages} páginas criadas com sucesso!")
    print(f"📁 Verifique a pasta '{pages_dir}' para ver todas as páginas!")

if __name__ == "__main__":
    main()
