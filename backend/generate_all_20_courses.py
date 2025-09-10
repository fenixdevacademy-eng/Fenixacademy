#!/usr/bin/env python3
"""
Script para gerar páginas HTML específicas para TODOS os 20 cursos da Fenix Academy
Layout moderno, responsivo e IMPECÁVEL!
"""

import os
from datetime import datetime

def create_all_courses_data():
    """Retorna dados específicos para TODOS os 20 cursos"""
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
        },
        "artificial-intelligence": {
            "title": "🤖 Artificial Intelligence",
            "description": "Domine a inteligência artificial e machine learning com projetos práticos",
            "icon": "🤖",
            "color": "#dc2626",
            "modules": {
                "iniciante": [
                    {"title": "Introdução IA", "duration": "60 min", "topics": ["História IA", "Aplicações", "Tendências", "Futuro"]},
                    {"title": "Machine Learning Básico", "duration": "70 min", "topics": ["Algoritmos", "Treinamento", "Validação", "Deploy"]},
                    {"title": "Neural Networks", "duration": "75 min", "topics": ["Perceptron", "Backpropagation", "Ativação", "Otimização"]}
                ]
            }
        },
        "cybersecurity": {
            "title": "🔒 Cybersecurity",
            "description": "Proteja sistemas e dados com técnicas avançadas de segurança digital",
            "icon": "🔒",
            "color": "#ea580c",
            "modules": {
                "iniciante": [
                    {"title": "Fundamentos Segurança", "duration": "55 min", "topics": ["Confidencialidade", "Integridade", "Disponibilidade", "Ameaças"]},
                    {"title": "Criptografia Básica", "duration": "65 min", "topics": ["Hash", "Simétrica", "Assimétrica", "Certificados"]},
                    {"title": "Análise Vulnerabilidades", "duration": "60 min", "topics": ["Scanning", "Penetration Testing", "OWASP", "Relatórios"]}
                ]
            }
        },
        "cloud-computing": {
            "title": "☁️ Cloud Computing",
            "description": "Implemente soluções escaláveis na nuvem com AWS, Azure e Google Cloud",
            "icon": "☁️",
            "color": "#0891b2",
            "modules": {
                "iniciante": [
                    {"title": "Fundamentos Cloud", "duration": "50 min", "topics": ["IaaS", "PaaS", "SaaS", "Modelos"]},
                    {"title": "AWS Básico", "duration": "70 min", "topics": ["EC2", "S3", "RDS", "Lambda"]},
                    {"title": "Azure Fundamentos", "duration": "65 min", "topics": ["Virtual Machines", "Storage", "Databases", "Functions"]}
                ]
            }
        },
        "devops": {
            "title": "🔧 DevOps",
            "description": "Automatize e otimize o desenvolvimento com CI/CD e infraestrutura como código",
            "icon": "🔧",
            "color": "#059669",
            "modules": {
                "iniciante": [
                    {"title": "Introdução DevOps", "duration": "45 min", "topics": ["Cultura", "Práticas", "Ferramentas", "Benefícios"]},
                    {"title": "Git e GitHub", "duration": "60 min", "topics": ["Versionamento", "Branches", "Merge", "Pull Requests"]},
                    {"title": "CI/CD Básico", "duration": "70 min", "topics": ["Jenkins", "GitHub Actions", "Pipelines", "Automação"]}
                ]
            }
        },
        "game-development": {
            "title": "🎮 Game Development",
            "description": "Crie jogos incríveis com Unity, Unreal Engine e programação de jogos",
            "icon": "🎮",
            "color": "#7c2d12",
            "modules": {
                "iniciante": [
                    {"title": "Fundamentos Jogos", "duration": "55 min", "topics": ["Game Design", "Mecânicas", "Narrativa", "Arte"]},
                    {"title": "Unity Básico", "duration": "75 min", "topics": ["Interface", "GameObjects", "Scripts", "Física"]},
                    {"title": "Programação Jogos", "duration": "65 min", "topics": ["C#", "Game Loops", "Input", "Colisões"]}
                ]
            }
        },
        "blockchain": {
            "title": "⛓️ Blockchain",
            "description": "Desenvolva aplicações descentralizadas e smart contracts revolucionários",
            "icon": "⛓️",
            "color": "#f59e0b",
            "modules": {
                "iniciante": [
                    {"title": "Fundamentos Blockchain", "duration": "60 min", "topics": ["Criptomoedas", "Consenso", "Mineração", "Wallets"]},
                    {"title": "Ethereum Básico", "duration": "70 min", "topics": ["Smart Contracts", "Solidity", "Gas", "DeFi"]},
                    {"title": "Web3 Development", "duration": "65 min", "topics": ["DApps", "MetaMask", "IPFS", "DeFi"]}
                ]
            }
        },
        "machine-learning": {
            "title": "🧠 Machine Learning",
            "description": "Aprenda algoritmos de ML e deep learning para resolver problemas complexos",
            "icon": "🧠",
            "color": "#be185d",
            "modules": {
                "iniciante": [
                    {"title": "Introdução ML", "duration": "55 min", "topics": ["Supervisionado", "Não Supervisionado", "Reinforcement", "Aplicações"]},
                    {"title": "Algoritmos Clássicos", "duration": "75 min", "topics": ["Regressão", "Classificação", "Clustering", "Decision Trees"]},
                    {"title": "Deep Learning", "duration": "80 min", "topics": ["Neural Networks", "CNN", "RNN", "Transformers"]}
                ]
            }
        },
        "full-stack-development": {
            "title": "🚀 Full Stack Development",
            "description": "Domine frontend e backend para criar aplicações completas e escaláveis",
            "icon": "🚀",
            "color": "#1d4ed8",
            "modules": {
                "iniciante": [
                    {"title": "Arquitetura Full Stack", "duration": "50 min", "topics": ["Frontend", "Backend", "Database", "Deploy"]},
                    {"title": "Stack MERN", "duration": "80 min", "topics": ["MongoDB", "Express", "React", "Node.js"]},
                    {"title": "Stack MEAN", "duration": "75 min", "topics": ["MongoDB", "Express", "Angular", "Node.js"]}
                ]
            }
        },
        "frontend-development": {
            "title": "🎨 Frontend Development",
            "description": "Crie interfaces incríveis e experiências de usuário memoráveis",
            "icon": "🎨",
            "color": "#9333ea",
            "modules": {
                "iniciante": [
                    {"title": "Design UI/UX", "duration": "60 min", "topics": ["Princípios", "Wireframes", "Prototipagem", "Testes"]},
                    {"title": "React Avançado", "duration": "75 min", "topics": ["Hooks", "Context", "Redux", "Performance"]},
                    {"title": "Vue.js Avançado", "duration": "70 min", "topics": ["Composition API", "Vuex", "Router", "Nuxt.js"]}
                ]
            }
        },
        "backend-development": {
            "title": "⚙️ Backend Development",
            "description": "Construa APIs robustas e sistemas backend escaláveis e seguros",
            "icon": "⚙️",
            "color": "#16a34a",
            "modules": {
                "iniciante": [
                    {"title": "Arquitetura Backend", "duration": "55 min", "topics": ["MVC", "REST", "Microserviços", "APIs"]},
                    {"title": "Node.js Avançado", "duration": "70 min", "topics": ["Event Loop", "Streams", "Clusters", "Performance"]},
                    {"title": "Python Backend", "duration": "65 min", "topics": ["Django", "Flask", "FastAPI", "ORM"]}
                ]
            }
        },
        "database-design": {
            "title": "🗄️ Database Design",
            "description": "Projete e otimize bancos de dados relacionais e NoSQL",
            "icon": "🗄️",
            "color": "#ca8a04",
            "modules": {
                "iniciante": [
                    {"title": "Modelagem Dados", "duration": "60 min", "topics": ["ER", "Normalização", "Índices", "Constraints"]},
                    {"title": "SQL Avançado", "duration": "70 min", "topics": ["Stored Procedures", "Triggers", "Views", "Performance"]},
                    {"title": "NoSQL Databases", "duration": "65 min", "topics": ["MongoDB", "Redis", "Cassandra", "Elasticsearch"]}
                ]
            }
        },
        "software-architecture": {
            "title": "🏗️ Software Architecture",
            "description": "Projete sistemas robustos com padrões arquiteturais e melhores práticas",
            "icon": "🏗️",
            "color": "#dc2626",
            "modules": {
                "iniciante": [
                    {"title": "Padrões Arquiteturais", "duration": "65 min", "topics": ["MVC", "MVP", "MVVM", "Clean Architecture"]},
                    {"title": "Design Patterns", "duration": "75 min", "topics": ["Creational", "Structural", "Behavioral", "SOLID"]},
                    {"title": "Microserviços", "duration": "70 min", "topics": ["Decomposição", "Comunicação", "Data Management", "Deploy"]}
                ]
            }
        },
        "agile-methodology": {
            "title": "📋 Agile Methodology",
            "description": "Implemente metodologias ágeis para projetos eficientes e colaborativos",
            "icon": "📋",
            "color": "#0891b2",
            "modules": {
                "iniciante": [
                    {"title": "Fundamentos Agile", "duration": "50 min", "topics": ["Manifesto", "Valores", "Princípios", "Benefícios"]},
                    {"title": "Scrum Framework", "duration": "70 min", "topics": ["Roles", "Events", "Artifacts", "Sprints"]},
                    {"title": "Kanban", "duration": "60 min", "topics": ["Visualização", "Limites", "Flow", "Melhoria"]}
                ]
            }
        },
        "ui-ux-design": {
            "title": "🎭 UI/UX Design",
            "description": "Crie interfaces intuitivas e experiências de usuário excepcionais",
            "icon": "🎭",
            "color": "#ec4899",
            "modules": {
                "iniciante": [
                    {"title": "Design Thinking", "duration": "60 min", "topics": ["Empatia", "Definição", "Ideação", "Prototipagem"]},
                    {"title": "Figma Avançado", "duration": "70 min", "topics": ["Components", "Auto Layout", "Prototypes", "Collaboration"]},
                    {"title": "User Research", "duration": "65 min", "topics": ["Entrevistas", "Surveys", "Analytics", "Personas"]}
                ]
            }
        },
        "digital-marketing": {
            "title": "📈 Digital Marketing",
            "description": "Domine estratégias digitais para crescimento e engajamento online",
            "icon": "📈",
            "color": "#059669",
            "modules": {
                "iniciante": [
                    {"title": "Estratégia Digital", "duration": "55 min", "topics": ["Planejamento", "Audience", "Canais", "Métricas"]},
                    {"title": "SEO Avançado", "duration": "70 min", "topics": ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"]},
                    {"title": "Marketing de Conteúdo", "duration": "65 min", "topics": ["Blog", "Vídeos", "Infográficos", "E-books"]}
                ]
            }
        },
        "product-management": {
            "title": "📊 Product Management",
            "description": "Gerencie produtos digitais desde a concepção até o lançamento",
            "icon": "📊",
            "color": "#7c3aed",
            "modules": {
                "iniciante": [
                    {"title": "Fundamentos PM", "duration": "60 min", "topics": ["Role", "Responsabilidades", "Habilidades", "Carreira"]},
                    {"title": "Product Strategy", "duration": "70 min", "topics": ["Vision", "Roadmap", "Priorização", "Métricas"]},
                    {"title": "User Research", "duration": "65 min", "topics": ["Interviews", "Surveys", "Analytics", "Insights"]}
                ]
            }
        },
        "entrepreneurship": {
            "title": "💼 Entrepreneurship",
            "description": "Transforme suas ideias em negócios lucrativos e sustentáveis",
            "icon": "💼",
            "color": "#16a34a",
            "modules": {
                "iniciante": [
                    {"title": "Mindset Empreendedor", "duration": "55 min", "topics": ["Características", "Desafios", "Oportunidades", "Resiliência"]},
                    {"title": "Business Model Canvas", "duration": "70 min", "topics": ["Value Proposition", "Customer Segments", "Revenue Streams", "Channels"]},
                    {"title": "MVP e Validação", "duration": "65 min", "topics": ["Minimum Viable Product", "Customer Discovery", "Feedback", "Iteração"]}
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

def create_mega_index_page(pages_dir, course_data):
    """Cria uma página índice mega com todos os 20 cursos"""
    
    index_html = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚀 Fenix Academy - TODOS os 20 Cursos</title>
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
            max-width: 1600px;
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
            font-size: 4.5rem;
            font-weight: 800;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .subtitle {
            font-size: 1.5rem;
            color: #666;
            max-width: 900px;
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
            font-size: 3.5rem;
            font-weight: 800;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .stat-label-mega {
            font-size: 1.1rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }
        
        .courses-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 25px;
            margin-top: 50px;
        }
        
        .course-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(15px);
            transition: all 0.4s ease;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .course-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }
        
        .course-header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .course-icon-large {
            font-size: 3.5rem;
            margin-bottom: 15px;
        }
        
        .course-title-large {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: #333;
        }
        
        .course-description-large {
            color: #666;
            font-size: 1rem;
            line-height: 1.5;
        }
        
        .course-features {
            margin: 20px 0;
        }
        
        .feature {
            display: flex;
            align-items: center;
            margin: 12px 0;
            padding: 8px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .feature-icon {
            margin-right: 12px;
            font-size: 1.1rem;
        }
        
        .feature-text {
            color: #555;
            font-size: 0.9rem;
        }
        
        .course-cta {
            text-align: center;
            margin-top: 20px;
        }
        
        .course-button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 10px 25px;
            border-radius: 20px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .course-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #333;
        }
        
        .footer-description {
            color: #666;
            font-size: 1.2rem;
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
                font-size: 3rem;
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
            <p class="subtitle">A MAIOR plataforma de educação em tecnologia do mundo! 20 cursos especializados com metodologia comprovada CS50!</p>
            
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
    
    # Adicionar cards de TODOS os 20 cursos
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
            <h3 class="footer-title">🎉 Transforme sua carreira com TODOS os 20 cursos!</h3>
            <p class="footer-description">Junte-se a mais de 100.000 alunos que já transformaram suas vidas com a Fenix Academy. Comece gratuitamente e veja a diferença!</p>
            <a href="#" class="mega-cta">🚀 Começar Gratuitamente - Agora!</a>
            <p style="margin-top: 25px; color: #666; font-size: 1rem;">
                ✅ Acesso vitalício • ✅ Certificado reconhecido • ✅ Suporte 24/7 • ✅ Projetos reais • ✅ Comunidade ativa
            </p>
        </footer>
    </div>
</body>
</html>"""
    
    # Salvar página índice mega
    with open(f"{pages_dir}/index.html", 'w', encoding='utf-8') as f:
        f.write(index_html)
    
    print("✅ Página índice MEGA criada com sucesso!")

def main():
    """Função principal"""
    print("🚀 INICIANDO GERAÇÃO DE TODOS OS 20 CURSOS DA FENIX ACADEMY...")
    print("=" * 80)
    print("🎯 Criando páginas HTML únicas e especializadas para TODOS os cursos!")
    print("=" * 80)
    
    course_data = create_all_courses_data()
    
    # Criar diretório para as páginas
    pages_dir = "fenix-all-20-courses"
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
    
    # Criar página índice mega
    create_mega_index_page(pages_dir, course_data)
    
    print("\n" + "=" * 80)
    print(f"🎉 TODOS OS 20 CURSOS GERADOS COM SUCESSO!")
    print(f"📁 Total de páginas criadas: {total_pages}")
    print(f"🌐 Verifique a pasta '{pages_dir}' para ver TODOS os cursos!")
    print(f"🏆 Layout IMPECÁVEL e responsivo para todos os 20 cursos!")
    print("=" * 80)
    print("\n📱 Características das páginas:")
    print("   ✅ Design moderno e responsivo")
    print("   ✅ Conteúdo específico para cada curso")
    print("   ✅ Animações e interações")
    print("   ✅ Layout otimizado para mobile")
    print("   ✅ Cores e temas personalizados")
    print("   ✅ Navegação intuitiva")
    print("   ✅ Call-to-actions estratégicos")
    print("\n🎯 Cursos criados:")
    for course_name, course_info in course_data.items():
        print(f"   {course_info['icon']} {course_info['title']}")

if __name__ == "__main__":
    main()
