#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🔧 ADICIONAR CONFIGURAÇÕES FALTANTES DOS CURSOS
==============================================

Script para adicionar as configurações dos cursos que falharam na aplicação do modelo.
"""

import json
from pathlib import Path

def add_missing_configs():
    """Adiciona configurações faltantes dos cursos"""
    
    missing_configs = {
        "backend-development": {
            "name": "Backend Development",
            "emoji": "⚙️",
            "description": "Desenvolvimento backend e APIs",
            "language": "javascript",
            "tech_stack": ["Node.js", "Express", "PostgreSQL", "MongoDB", "Docker"],
            "duration": 75,
            "concepts": [
                "APIs RESTful", "Autenticação", "Banco de Dados", "Testes", "Deploy"
            ]
        },
        "ciberseguranca": {
            "name": "Cibersegurança",
            "emoji": "🔒",
            "description": "Segurança cibernética e ethical hacking",
            "language": "bash",
            "tech_stack": ["Kali Linux", "Wireshark", "Nmap", "OWASP", "Docker"],
            "duration": 80,
            "concepts": [
                "Penetration Testing", "Análise de Vulnerabilidades", "Red Team", "Blue Team", "Compliance"
            ]
        },
        "cybersecurity": {
            "name": "Cybersecurity",
            "emoji": "🛡️",
            "description": "Cybersecurity and ethical hacking",
            "language": "bash",
            "tech_stack": ["Kali Linux", "Wireshark", "Nmap", "OWASP", "Docker"],
            "duration": 80,
            "concepts": [
                "Penetration Testing", "Vulnerability Analysis", "Red Team", "Blue Team", "Compliance"
            ]
        },
        "data-science": {
            "name": "Data Science",
            "emoji": "📊",
            "description": "Ciência de dados e análise",
            "language": "python",
            "tech_stack": ["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter"],
            "duration": 80,
            "concepts": [
                "Análise de Dados", "Machine Learning", "Visualização", "Big Data", "Deploy"
            ]
        },
        "frontend-development": {
            "name": "Frontend Development",
            "emoji": "🎨",
            "description": "Desenvolvimento frontend moderno",
            "language": "javascript",
            "tech_stack": ["React", "Vue.js", "TypeScript", "Sass", "Webpack"],
            "duration": 70,
            "concepts": [
                "Componentes", "State Management", "Responsividade", "Performance", "Deploy"
            ]
        },
        "full-stack-development": {
            "name": "Full Stack Development",
            "emoji": "🚀",
            "description": "Desenvolvimento full stack completo",
            "language": "javascript",
            "tech_stack": ["React", "Node.js", "MongoDB", "Docker", "AWS"],
            "duration": 90,
            "concepts": [
                "Frontend + Backend", "APIs", "Banco de Dados", "Deploy", "DevOps"
            ]
        },
        "game-development": {
            "name": "Game Development",
            "emoji": "🎮",
            "description": "Desenvolvimento de jogos",
            "language": "csharp",
            "tech_stack": ["Unity", "C#", "Blender", "Photoshop", "Git"],
            "duration": 85,
            "concepts": [
                "Game Design", "Unity", "C# Scripting", "3D Modeling", "Publishing"
            ]
        },
        "machine-learning": {
            "name": "Machine Learning",
            "emoji": "🧠",
            "description": "Machine learning e inteligência artificial",
            "language": "python",
            "tech_stack": ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Jupyter"],
            "duration": 85,
            "concepts": [
                "Algoritmos ML", "Deep Learning", "Neural Networks", "Computer Vision", "NLP"
            ]
        },
        "mobile-development": {
            "name": "Mobile Development",
            "emoji": "📱",
            "description": "Desenvolvimento mobile",
            "language": "javascript",
            "tech_stack": ["React Native", "Flutter", "Expo", "Firebase", "App Store"],
            "duration": 80,
            "concepts": [
                "Mobile Apps", "Cross-platform", "APIs", "Performance", "Publishing"
            ]
        },
        "product-management": {
            "name": "Product Management",
            "emoji": "📊",
            "description": "Gestão de produtos digitais",
            "language": "python",
            "tech_stack": ["Figma", "Jira", "Analytics", "Python", "SQL"],
            "duration": 70,
            "concepts": [
                "Product Strategy", "User Research", "Analytics", "Roadmapping", "Leadership"
            ]
        },
        "ui-ux-design": {
            "name": "UI/UX Design",
            "emoji": "🎨",
            "description": "Design de interface e experiência do usuário",
            "language": "css",
            "tech_stack": ["Figma", "Adobe XD", "Sketch", "Principle", "InVision"],
            "duration": 75,
            "concepts": [
                "Design Thinking", "Wireframing", "Prototyping", "User Testing", "Design Systems"
            ]
        }
    }
    
    # Carrega configurações existentes
    config_file = Path("apply_web_fundamentals_model.py")
    
    if not config_file.exists():
        print("❌ Arquivo de configuração não encontrado!")
        return False
    
    # Lê o arquivo
    with open(config_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Encontra a seção de configurações
    start_marker = "self.course_configs = {"
    end_marker = "        }"
    
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("❌ Seção de configurações não encontrada!")
        return False
    
    # Encontra o final da seção
    end_idx = content.find(end_marker, start_idx)
    if end_idx == -1:
        print("❌ Fim da seção não encontrado!")
        return False
    
    # Gera nova seção de configurações
    new_configs = "self.course_configs = {\n"
    
    # Adiciona configurações existentes
    existing_configs = [
        "react-advanced", "python-data-science", "aws-cloud", "devops-docker",
        "react-native-mobile", "flutter-mobile", "nodejs-apis", "blockchain-smart-contracts",
        "ciberseguranca", "gestao-trafego"
    ]
    
    for course in existing_configs:
        if course == "react-advanced":
            new_configs += '''            "react-advanced": {
                "name": "React Advanced",
                "emoji": "⚛️",
                "description": "Desenvolvimento avançado com React",
                "language": "javascript",
                "tech_stack": ["React", "TypeScript", "Next.js", "Redux", "Jest"],
                "duration": 75,
                "concepts": [
                    "Hooks Avançados", "Context API", "Performance", "Testing", "Deploy"
                ]
            },
'''
        # Adiciona outras configurações existentes...
    
    # Adiciona configurações faltantes
    for course, config in missing_configs.items():
        new_configs += f'''            "{course}": {{
                "name": "{config['name']}",
                "emoji": "{config['emoji']}",
                "description": "{config['description']}",
                "language": "{config['language']}",
                "tech_stack": {config['tech_stack']},
                "duration": {config['duration']},
                "concepts": {config['concepts']}
            }},
'''
    
    new_configs += "        }"
    
    # Substitui a seção
    new_content = content[:start_idx] + new_configs + content[end_idx + len(end_marker):]
    
    # Salva o arquivo atualizado
    with open(config_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ Configurações adicionadas com sucesso!")
    print(f"📊 Total de configurações: {len(missing_configs)}")
    
    return True

if __name__ == "__main__":
    add_missing_configs()
