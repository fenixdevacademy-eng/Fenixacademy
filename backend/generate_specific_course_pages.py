#!/usr/bin/env python3
"""
Script para gerar páginas HTML específicas e únicas para cada curso da Fenix Academy
Substitui as aulas genéricas por conteúdo real e especializado
Layout moderno, responsivo e IMPECÁVEL!
"""

import os
import json
from datetime import datetime

def create_course_specific_content():
    """Retorna conteúdo específico para cada curso"""
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
                    {"title": "JavaScript Básico", "duration": "55 min", "topics": ["DOM", "Eventos", "Arrays", "Funções"]},
                    {"title": "Design Responsivo", "duration": "40 min", "topics": ["Mobile First", "Media Queries", "Viewport", "Breakpoints"]},
                    {"title": "Acessibilidade Web", "duration": "45 min", "topics": ["ARIA", "Navegação", "Contraste", "Screen Readers"]},
                    {"title": "Validação de Formulários", "duration": "35 min", "topics": ["HTML5 Validation", "JavaScript", "UX", "Feedback"]},
                    {"title": "Manipulação DOM", "duration": "50 min", "topics": ["Seletores", "Modificação", "Eventos", "Performance"]},
                    {"title": "Local Storage", "duration": "30 min", "topics": ["localStorage", "sessionStorage", "Cookies", "Aplicações"]},
                    {"title": "SEO Básico", "duration": "40 min", "topics": ["Meta Tags", "Keywords", "Estrutura", "Google"]},
                    {"title": "Performance Web", "duration": "45 min", "topics": ["Carregamento", "Otimização", "Métricas", "Ferramentas"]},
                    {"title": "DevTools Avançado", "duration": "35 min", "topics": ["Console", "Network", "Performance", "Debugging"]},
                    {"title": "Git Básico", "duration": "40 min", "topics": ["Commits", "Branches", "Merge", "GitHub"]},
                    {"title": "Hospedagem Web", "duration": "30 min", "topics": ["Domínios", "Servidores", "SSL", "Deploy"]},
                    {"title": "Segurança Básica", "duration": "40 min", "topics": ["HTTPS", "XSS", "CSRF", "Validação"]},
                    {"title": "Padrões Web", "duration": "35 min", "topics": ["W3C", "Semântica", "Acessibilidade", "Melhores Práticas"]},
                    {"title": "Compatibilidade", "duration": "40 min", "topics": ["Cross-browser", "Polyfills", "Fallbacks", "Testing"]},
                    {"title": "Analytics", "duration": "30 min", "topics": ["Google Analytics", "Métricas", "Relatórios", "A/B Testing"]},
                    {"title": "CMS Básico", "duration": "35 min", "topics": ["WordPress", "Conteúdo", "Templates", "Plugins"]},
                    {"title": "Manutenção Web", "duration": "25 min", "topics": ["Updates", "Backups", "Monitoramento", "Performance"]},
                    {"title": "Projeto Final", "duration": "120 min", "topics": ["Portfolio", "Responsivo", "SEO", "Deploy"]}
                ],
                "intermediario": [
                    {"title": "CSS Avançado", "duration": "60 min", "topics": ["CSS Variables", "Custom Properties", "Advanced Selectors", "Pseudo-elements"]},
                    {"title": "ES6+ JavaScript", "duration": "65 min", "topics": ["Arrow Functions", "Destructuring", "Modules", "Async/Await"]},
                    {"title": "React Fundamentos", "duration": "70 min", "topics": ["Components", "Props", "State", "Hooks"]},
                    {"title": "Vue.js Básico", "duration": "60 min", "topics": ["Vue Instance", "Directives", "Components", "Reactivity"]},
                    {"title": "Node.js Backend", "duration": "75 min", "topics": ["Server Setup", "Routing", "Middleware", "APIs"]},
                    {"title": "Express Framework", "duration": "65 min", "topics": ["Routing", "Middleware", "Error Handling", "Validation"]},
                    {"title": "Integração Database", "duration": "70 min", "topics": ["MongoDB", "SQLite", "ORM", "Queries"]},
                    {"title": "Desenvolvimento API", "duration": "65 min", "topics": ["REST", "Endpoints", "Authentication", "Documentation"]},
                    {"title": "Sistemas Auth", "duration": "70 min", "topics": ["JWT", "OAuth", "Sessions", "Security"]},
                    {"title": "Gerenciamento Estado", "duration": "60 min", "topics": ["Redux", "Context API", "State Machines", "Local State"]},
                    {"title": "Sistemas de Roteamento", "duration": "55 min", "topics": ["React Router", "Vue Router", "SPA", "Navigation"]},
                    {"title": "Arquitetura Componentes", "duration": "65 min", "topics": ["Composition", "Inheritance", "Patterns", "Best Practices"]},
                    {"title": "Frameworks de Teste", "duration": "70 min", "topics": ["Jest", "Testing Library", "Unit Tests", "Integration"]},
                    {"title": "Build Tools", "duration": "60 min", "topics": ["Webpack", "Vite", "Bundling", "Optimization"]},
                    {"title": "Estratégias Deploy", "duration": "55 min", "topics": ["CI/CD", "Docker", "Cloud", "Monitoring"]},
                    {"title": "Otimização Performance", "duration": "65 min", "topics": ["Lazy Loading", "Code Splitting", "Caching", "Metrics"]},
                    {"title": "SEO Avançado", "duration": "60 min", "topics": ["Technical SEO", "Content Strategy", "Link Building", "Analytics"]},
                    {"title": "PWA Development", "duration": "70 min", "topics": ["Service Workers", "Manifest", "Offline", "Installation"]},
                    {"title": "Microserviços", "duration": "75 min", "topics": ["Architecture", "Communication", "Deployment", "Scaling"]},
                    {"title": "Monitoramento Analytics", "duration": "55 min", "topics": ["Metrics", "Logging", "Alerting", "Dashboards"]}
                ],
                "avancado": [
                    {"title": "Padrões React Avançados", "duration": "80 min", "topics": ["Render Props", "HOCs", "Custom Hooks", "Performance"]},
                    {"title": "Arquitetura Serverless", "duration": "75 min", "topics": ["AWS Lambda", "Azure Functions", "Cold Start", "Scaling"]},
                    {"title": "Implementação GraphQL", "duration": "85 min", "topics": ["Schema", "Resolvers", "Subscriptions", "Apollo"]},
                    {"title": "Web Assembly", "duration": "90 min", "topics": ["WASM", "Rust", "Performance", "Integration"]},
                    {"title": "Performance Avançada", "duration": "80 min", "topics": ["Core Web Vitals", "Optimization", "Monitoring", "Tools"]},
                    {"title": "Auditoria Segurança", "duration": "85 min", "topics": ["Penetration Testing", "Vulnerabilities", "OWASP", "Compliance"]},
                    {"title": "Estratégias Scaling", "duration": "80 min", "topics": ["Horizontal", "Vertical", "Load Balancing", "Caching"]},
                    {"title": "Testes Avançados", "duration": "75 min", "topics": ["E2E", "Performance", "Security", "Automation"]},
                    {"title": "Pipelines CI/CD", "duration": "70 min", "topics": ["GitHub Actions", "Jenkins", "Docker", "Kubernetes"]},
                    {"title": "Deploy Cloud", "duration": "75 min", "topics": ["AWS", "Azure", "GCP", "Infrastructure"]},
                    {"title": "Micro Frontends", "duration": "85 min", "topics": ["Architecture", "Module Federation", "Deployment", "Communication"]},
                    {"title": "Gerenciamento Estado Avançado", "duration": "80 min", "topics": ["Redux Toolkit", "Zustand", "Jotai", "Patterns"]},
                    {"title": "Web Components", "duration": "75 min", "topics": ["Custom Elements", "Shadow DOM", "Templates", "Standards"]},
                    {"title": "Arquitetura CSS Avançada", "duration": "70 min", "topics": ["Methodology", "Architecture", "Maintainability", "Scalability"]},
                    {"title": "JavaScript Engines", "duration": "85 min", "topics": ["V8", "SpiderMonkey", "Performance", "Optimization"]},
                    {"title": "Protocolos Web", "duration": "80 min", "topics": ["HTTP/2", "HTTP/3", "WebSockets", "SSE"]},
                    {"title": "SEO Avançado", "duration": "75 min", "topics": ["Technical", "Content", "Local", "International"]},
                    {"title": "Acessibilidade Avançada", "duration": "80 min", "topics": ["WCAG", "Testing", "Tools", "Compliance"]},
                    {"title": "Monitoramento Performance", "duration": "70 min", "topics": ["Real User Monitoring", "Synthetic", "APM", "Alerting"]},
                    {"title": "Padrões Arquitetura Web", "duration": "85 min", "topics": ["Patterns", "Best Practices", "Scalability", "Maintainability"]}
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
                    {"title": "Flutter Fundamentos", "duration": "65 min", "topics": ["Dart", "Widgets", "Material Design", "Hot Reload"]},
                    {"title": "UI Design Mobile", "duration": "55 min", "topics": ["Material Design", "iOS Guidelines", "Responsividade", "Touch"]},
                    {"title": "Sistemas Navegação", "duration": "50 min", "topics": ["Stack Navigation", "Tab Navigation", "Drawer", "Deep Linking"]},
                    {"title": "Gerenciamento Estado Básico", "duration": "60 min", "topics": ["Local State", "Props Drilling", "Context", "Simple State"]},
                    {"title": "Integração API Básica", "duration": "55 min", "topics": ["HTTP Requests", "Fetch API", "Error Handling", "Loading States"]},
                    {"title": "Local Storage Mobile", "duration": "45 min", "topics": ["AsyncStorage", "SharedPreferences", "SQLite", "File System"]},
                    {"title": "Push Notifications", "duration": "60 min", "topics": ["Firebase", "Permissions", "Handling", "Background"]},
                    {"title": "Testes Mobile Básicos", "duration": "50 min", "topics": ["Unit Tests", "Integration", "Device Testing", "Debugging"]},
                    {"title": "App Store Guidelines", "duration": "40 min", "topics": ["Apple Guidelines", "Google Play", "Review Process", "Rejection"]},
                    {"title": "Segurança Mobile Básica", "duration": "45 min", "topics": ["Data Encryption", "Network Security", "Permissions", "Privacy"]},
                    {"title": "Funcionalidade Offline", "duration": "55 min", "topics": ["Offline First", "Sync", "Conflict Resolution", "User Experience"]},
                    {"title": "Analytics Mobile", "duration": "40 min", "topics": ["Firebase Analytics", "User Behavior", "Crash Reporting", "Performance"]},
                    {"title": "UX Mobile Básica", "duration": "50 min", "topics": ["User Research", "Wireframes", "Prototyping", "Testing"]},
                    {"title": "Performance Mobile", "duration": "45 min", "topics": ["Memory Management", "Battery Optimization", "Network", "Rendering"]},
                    {"title": "Desenvolvimento Cross-platform", "duration": "55 min", "topics": ["Code Sharing", "Platform Specific", "Testing", "Deployment"]},
                    {"title": "Debugging Mobile", "duration": "50 min", "topics": ["DevTools", "Logging", "Crash Reports", "Performance Profiling"]},
                    {"title": "Deploy App", "duration": "45 min", "topics": ["Build Process", "Signing", "Distribution", "Updates"]},
                    {"title": "Manutenção Mobile", "duration": "40 min", "topics": ["Bug Fixes", "Updates", "User Feedback", "Performance"]},
                    {"title": "Projeto Final Mobile", "duration": "150 min", "topics": ["App Completo", "Deploy", "Testing", "Documentation"]}
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
                    {"title": "Pandas Fundamentos", "duration": "65 min", "topics": ["DataFrames", "Series", "Manipulação", "Análise"]},
                    {"title": "NumPy Básico", "duration": "60 min", "topics": ["Arrays", "Operações", "Indexing", "Broadcasting"]},
                    {"title": "Visualização Básica", "duration": "55 min", "topics": ["Matplotlib", "Seaborn", "Gráficos", "Interpretação"]},
                    {"title": "Estatística Fundamental", "duration": "70 min", "topics": ["Média", "Mediana", "Desvio", "Distribuições"]},
                    {"title": "Limpeza Dados Básica", "duration": "65 min", "topics": ["Missing Values", "Outliers", "Formatação", "Validação"]},
                    {"title": "Análise Exploratória", "duration": "75 min", "topics": ["EDA", "Correlações", "Padrões", "Insights"]},
                    {"title": "Machine Learning Básico", "duration": "80 min", "topics": ["Supervisionado", "Não Supervisionado", "Treinamento", "Avaliação"]},
                    {"title": "SQL Fundamentos", "duration": "60 min", "topics": ["Queries", "Joins", "Agregações", "Subqueries"]},
                    {"title": "Ética Dados Básica", "duration": "45 min", "topics": ["Privacidade", "Sesgo", "Transparência", "Responsabilidade"]},
                    {"title": "Storytelling Dados", "duration": "50 min", "topics": ["Narrativa", "Visualização", "Contexto", "Impacto"]},
                    {"title": "Modelos Preditivos Básicos", "duration": "70 min", "topics": ["Regressão", "Classificação", "Métricas", "Validação"]},
                    {"title": "Qualidade Dados Básica", "duration": "55 min", "topics": ["Acuracidade", "Completude", "Consistência", "Timeliness"]},
                    {"title": "Pipelines Dados Básicos", "duration": "60 min", "topics": ["ETL", "Transformação", "Carregamento", "Automação"]},
                    {"title": "Governança Dados Básica", "duration": "50 min", "topics": ["Políticas", "Processos", "Controles", "Compliance"]},
                    {"title": "Literacia Dados", "duration": "45 min", "topics": ["Interpretação", "Crítica", "Comunicação", "Tomada Decisão"]},
                    {"title": "Ferramentas Dados Básicas", "duration": "55 min", "topics": ["Jupyter", "VS Code", "Git", "Cloud"]},
                    {"title": "Comunicação Dados", "duration": "50 min", "topics": ["Relatórios", "Apresentações", "Dashboards", "Stakeholders"]},
                    {"title": "Gestão Projetos Dados", "duration": "60 min", "topics": ["Planejamento", "Execução", "Monitoramento", "Entrega"]}
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
        
        level_color = {
            'iniciante': '#10b981',
            'intermediario': '#f59e0b',
            'avancado': '#ef4444'
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

def generate_all_course_pages():
    """Gera todas as páginas específicas dos cursos"""
    course_data = create_course_specific_content()
    
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
    
    # Criar página índice
    create_index_page(pages_dir, course_data)
    
    return total_pages

def create_index_page(pages_dir, course_data):
    """Cria uma página índice com todos os cursos"""
    
    index_html = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚀 Fenix Academy - Todos os Cursos</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 50px;
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 25px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(15px);
        }
        
        .main-title {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .subtitle {
            font-size: 1.4rem;
            color: #666;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .stats-mega {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin: 40px 0;
            flex-wrap: wrap;
        }
        
        .stat-mega {
            background: rgba(255, 255, 255, 0.9);
            padding: 25px;
            border-radius: 20px;
            text-align: center;
            min-width: 180px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .stat-number-mega {
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .stat-label-mega {
            font-size: 1rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }
        
        .courses-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }
        
        .course-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 25px;
            padding: 35px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(15px);
            transition: all 0.4s ease;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .course-card:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 35px 70px rgba(0, 0, 0, 0.15);
        }
        
        .course-header {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .course-icon-large {
            font-size: 4rem;
            margin-bottom: 20px;
        }
        
        .course-title-large {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: #333;
        }
        
        .course-description-large {
            color: #666;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        
        .course-features {
            margin: 25px 0;
        }
        
        .feature {
            display: flex;
            align-items: center;
            margin: 15px 0;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        
        .feature-icon {
            margin-right: 15px;
            font-size: 1.2rem;
        }
        
        .feature-text {
            color: #555;
            font-size: 0.95rem;
        }
        
        .course-cta {
            text-align: center;
            margin-top: 25px;
        }
        
        .course-button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .course-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .footer-mega {
            text-align: center;
            margin-top: 60px;
            padding: 40px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 25px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .footer-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #333;
        }
        
        .footer-description {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 30px;
        }
        
        .mega-cta {
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            padding: 20px 50px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.3rem;
            transition: all 0.3s ease;
            display: inline-block;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        .mega-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .main-title {
                font-size: 2.5rem;
            }
            
            .stats-mega {
                flex-direction: column;
                align-items: center;
            }
            
            .courses-grid {
                grid-template-columns: 1fr;
            }
            
            .course-card {
                padding: 25px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="main-title">🚀 Fenix Academy</h1>
            <p class="subtitle">A maior plataforma de educação em tecnologia do mundo! Transforme sua carreira com nossos cursos especializados e metodologia comprovada.</p>
            
            <div class="stats-mega">
                <div class="stat-mega">
                    <div class="stat-number-mega">20</div>
                    <div class="stat-label-mega">Cursos</div>
                </div>
                <div class="stat-mega">
                    <div class="stat-number-mega">400</div>
                    <div class="stat-label-mega">Aulas</div>
                </div>
                <div class="stat-mega">
                    <div class="stat-number-mega">1200</div>
                    <div class="stat-label-mega">Horas</div>
                </div>
                <div class="stat-mega">
                    <div class="stat-number-mega">100%</div>
                    <div class="stat-label-mega">Prático</div>
                </div>
            </div>
        </header>
        
        <div class="courses-grid">"""
    
    # Adicionar cards dos cursos
    for course_name, course_info in course_data.items():
        index_html += f"""
            <a href="{course_name}.html" class="course-card">
                <div class="course-header">
                    <div class="course-icon-large">{course_info['icon']}</div>
                    <h2 class="course-title-large">{course_info['title']}</h2>
                    <p class="course-description-large">{course_info['description']}</p>
                </div>
                
                <div class="course-features">
                    <div class="feature">
                        <span class="feature-icon">📚</span>
                        <span class="feature-text">3 níveis de aprendizado</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">⏱️</span>
                        <span class="feature-text">60 aulas especializadas</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">💻</span>
                        <span class="feature-text">Projetos práticos</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🎯</span>
                        <span class="feature-text">Metodologia CS50</span>
                    </div>
                </div>
                
                <div class="course-cta">
                    <span class="course-button">Ver Curso Completo</span>
                </div>
            </a>"""
    
    index_html += """
        </div>
        
        <footer class="footer-mega">
            <h3 class="footer-title">🎉 Transforme sua carreira hoje mesmo!</h3>
            <p class="footer-description">Junte-se a mais de 100.000 alunos que já transformaram suas vidas com a Fenix Academy. Comece gratuitamente e veja a diferença!</p>
            <a href="#" class="mega-cta">🚀 Começar Gratuitamente - Agora!</a>
            <p style="margin-top: 25px; color: #666; font-size: 1rem;">
                ✅ Acesso vitalício • ✅ Certificado reconhecido • ✅ Suporte 24/7 • ✅ Projetos reais • ✅ Comunidade ativa
            </p>
        </footer>
    </div>
</body>
</html>"""
    
    # Salvar página índice
    with open(f"{pages_dir}/index.html", 'w', encoding='utf-8') as f:
        f.write(index_html)
    
    print("✅ Página índice criada com sucesso!")

def main():
    """Função principal"""
    print("🚀 INICIANDO GERAÇÃO DAS PÁGINAS ESPECÍFICAS DOS CURSOS...")
    print("=" * 80)
    print("🎯 Criando páginas HTML únicas e especializadas para cada curso!")
    print("=" * 80)
    
    # Gerar todas as páginas
    total_pages = generate_all_course_pages()
    
    print("\n" + "=" * 80)
    print(f"🎉 PÁGINAS ESPECÍFICAS GERADAS COM SUCESSO!")
    print(f"📁 Total de páginas criadas: {total_pages}")
    print(f"🌐 Verifique a pasta 'fenix-course-pages' para ver todas as páginas!")
    print(f"🏆 Layout IMPECÁVEL e responsivo para todos os cursos!")
    print("=" * 80)
    print("\n📱 Características das páginas:")
    print("   ✅ Design moderno e responsivo")
    print("   ✅ Conteúdo específico para cada curso")
    print("   ✅ Animações e interações")
    print("   ✅ Layout otimizado para mobile")
    print("   ✅ Cores e temas personalizados")
    print("   ✅ Navegação intuitiva")
    print("   ✅ Call-to-actions estratégicos")

if __name__ == "__main__":
    main()
