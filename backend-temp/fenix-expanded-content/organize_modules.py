#!/usr/bin/env python3
"""
Script para organizar conteúdo por módulos separados
"""

import os
import shutil
from pathlib import Path

def organize_course_modules(course_dir: str):
    """Organiza um curso em módulos separados"""
    course_path = Path(course_dir)
    
    if not course_path.exists():
        print(f"❌ Diretório {course_dir} não encontrado")
        return
    
    print(f"\n📚 ORGANIZANDO CURSO: {course_dir.upper()}")
    print("-" * 50)
    
    # Definir módulos para cada curso
    modules = get_course_modules(course_dir)
    
    # Criar diretório de módulos
    modules_dir = course_path / "modulos"
    modules_dir.mkdir(exist_ok=True)
    
    # Criar cada módulo
    for i, module in enumerate(modules, 1):
        create_module_file(modules_dir, i, module, course_dir)
    
    print(f"✅ {len(modules)} módulos criados para {course_dir}")

def get_course_modules(course_type: str) -> list:
    """Retorna os módulos específicos para cada curso"""
    modules_map = {
        'devops-docker': [
            "Fundamentos de DevOps",
            "Docker e Containers",
            "CI/CD e Automação",
            "Kubernetes e Orquestração",
            "Infraestrutura como Código",
            "Monitoramento e Observabilidade",
            "Segurança em DevOps",
            "Cloud Native Development"
        ],
        'aws-cloud': [
            "Fundamentos AWS",
            "Computação (EC2, Lambda)",
            "Armazenamento (S3, EBS)",
            "Banco de Dados (RDS, DynamoDB)",
            "Redes e Segurança (VPC, IAM)",
            "Monitoramento (CloudWatch)",
            "Serverless e Containers",
            "Arquiteturas Cloud"
        ],
        'python-data-science': [
            "Fundamentos Python",
            "Análise de Dados com Pandas",
            "Visualização com Matplotlib/Seaborn",
            "Machine Learning Básico",
            "Deep Learning com TensorFlow",
            "Processamento de Linguagem Natural",
            "Big Data com PySpark",
            "Deploy de Modelos ML"
        ],
        'web-fundamentals': [
            "HTML5 e Semântica",
            "CSS3 e Layouts",
            "JavaScript Básico",
            "JavaScript Avançado (ES6+)",
            "React.js e Componentes",
            "Node.js e APIs",
            "Banco de Dados e ORMs",
            "Deploy e DevOps para Web"
        ],
        'react-advanced': [
            "Hooks e Estado",
            "Context API e Redux",
            "Roteamento e Navegação",
            "Testes e Debugging",
            "Performance e Otimização",
            "Server-Side Rendering",
            "TypeScript com React",
            "Arquitetura e Padrões"
        ]
    }
    
    return modules_map.get(course_type, [
        "Módulo 1: Fundamentos",
        "Módulo 2: Conceitos Intermediários",
        "Módulo 3: Técnicas Avançadas",
        "Módulo 4: Projetos Práticos",
        "Módulo 5: Deploy e Produção"
    ])

def create_module_file(modules_dir: Path, module_num: int, module_name: str, course_type: str):
    """Cria um arquivo de módulo específico"""
    # Limpar nome do arquivo removendo caracteres especiais
    safe_name = module_name.lower().replace(' ', '-').replace('(', '').replace(')', '').replace('/', '-').replace('ç', 'c').replace('ã', 'a')
    filename = f"modulo-{module_num:02d}-{safe_name}.md"
    filepath = modules_dir / filename
    
    content = generate_module_content(module_num, module_name, course_type)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  📝 Criado: {filename}")

def generate_module_content(module_num: int, module_name: str, course_type: str) -> str:
    """Gera conteúdo específico para cada módulo"""
    
    # Título e introdução
    content = [
        f"# Módulo {module_num}: {module_name}",
        "",
        "## 📋 Visão Geral do Módulo",
        f"Este módulo aborda os conceitos fundamentais de **{module_name}**, preparando você para aplicar essas técnicas em projetos reais.",
        "",
        "## 🎯 Objetivos de Aprendizagem",
        f"- Compreender os fundamentos de {module_name}",
        f"- Implementar soluções práticas usando {module_name}",
        f"- Aplicar melhores práticas em {module_name}",
        f"- Resolver problemas complexos relacionados a {module_name}",
        "",
        "## ⏱️ Duração Estimada",
        "- **Teoria**: 4-6 horas",
        "- **Prática**: 6-8 horas",
        "- **Projeto**: 8-10 horas",
        "- **Total**: 18-24 horas",
        "",
        "---",
        ""
    ]
    
    # Conteúdo específico do módulo
    if course_type == 'devops-docker':
        content.extend(generate_devops_module_content(module_name))
    elif course_type == 'aws-cloud':
        content.extend(generate_aws_module_content(module_name))
    elif course_type == 'python-data-science':
        content.extend(generate_python_module_content(module_name))
    elif course_type == 'web-fundamentals':
        content.extend(generate_web_module_content(module_name))
    elif course_type == 'react-advanced':
        content.extend(generate_react_module_content(module_name))
    else:
        content.extend(generate_generic_module_content(module_name))
    
    # Exercícios e projetos
    content.extend([
        "## 🧪 Exercícios Práticos",
        "",
        "### Exercício 1: Implementação Básica",
        f"Implemente os conceitos básicos de {module_name}:",
        "- Configure o ambiente de desenvolvimento",
        "- Crie um exemplo simples",
        "- Teste a funcionalidade básica",
        "",
        "### Exercício 2: Aplicação Intermediária",
        f"Aplique técnicas intermediárias de {module_name}:",
        "- Implemente funcionalidades avançadas",
        "- Adicione tratamento de erros",
        "- Otimize a performance",
        "",
        "### Exercício 3: Projeto Completo",
        f"Desenvolva um projeto completo usando {module_name}:",
        "- Arquitetura escalável",
        "- Testes automatizados",
        "- Documentação técnica",
        "- Deploy em produção",
        "",
        "## 📚 Recursos Adicionais",
        "",
        "### Documentação Oficial",
        "- Links para documentação oficial",
        "- Tutoriais recomendados",
        "- Exemplos de código",
        "",
        "### Ferramentas e Tecnologias",
        "- IDEs e editores recomendados",
        "- Ferramentas de debugging",
        "- Bibliotecas e frameworks",
        "",
        "### Comunidade e Suporte",
        "- Fóruns e grupos de discussão",
        "- Stack Overflow",
        "- Canais do YouTube",
        "",
        "## 🔄 Próximos Passos",
        "",
        "Após completar este módulo, você estará preparado para:",
        f"- Aplicar {module_name} em projetos reais",
        f"- Contribuir para projetos open source",
        f"- Participar de discussões técnicas sobre {module_name}",
        f"- Continuar para o próximo módulo do curso",
        "",
        "---",
        f"*Módulo {module_num} concluído - {module_name}*"
    ])
    
    return "\n".join(content)

def generate_devops_module_content(module_name: str) -> list:
    """Gera conteúdo específico para módulos DevOps"""
    content = [
        "## 🚀 Conceitos Principais",
        "",
        f"### 1. Fundamentos de {module_name}",
        f"O {module_name} é essencial para práticas modernas de desenvolvimento e operações...",
        "",
        "### 2. Arquitetura e Componentes",
        "A arquitetura inclui:",
        "- Pipeline de integração contínua",
        "- Sistema de deploy automatizado",
        "- Monitoramento em tempo real",
        "- Rollback automático em caso de falha",
        "",
        "### 3. Implementação Prática",
        "```yaml",
        f"# Exemplo de configuração {module_name}",
        f"{module_name.lower().replace(' ', '_')}:",
        "  enabled: true",
        "  version: '1.0.0'",
        "  config:",
        "    timeout: 30",
        "    retries: 3",
        "    logging:",
        "      level: 'info'",
        "      format: 'json'",
        "```",
        "",
        "## 🔧 Ferramentas e Tecnologias",
        "",
        "### Ferramentas Principais",
        "- Jenkins, GitLab CI, GitHub Actions",
        "- Docker, Kubernetes, Helm",
        "- Terraform, Ansible, Chef",
        "- Prometheus, Grafana, ELK Stack",
        "",
        "### Configuração do Ambiente",
        "```bash",
        "# Configurar ambiente de desenvolvimento",
        "docker --version",
        "kubectl version",
        "terraform --version",
        "```",
        ""
    ]
    return content

def generate_aws_module_content(module_name: str) -> list:
    """Gera conteúdo específico para módulos AWS"""
    content = [
        "## ☁️ Conceitos Principais",
        "",
        f"### 1. Fundamentos de {module_name}",
        f"O {module_name} oferece soluções robustas para aplicações na nuvem...",
        "",
        "### 2. Arquitetura e Serviços",
        "A arquitetura inclui:",
        "- Serviços de computação",
        "- Armazenamento escalável",
        "- Redes e segurança",
        "- Monitoramento e logging",
        "",
        "### 3. Implementação Prática",
        "```bash",
        f"# Exemplo de implementação {module_name}",
        "aws configure",
        f"aws {module_name.lower().replace(' ', '-')} create",
        "```",
        "",
        "## 🛠️ Serviços AWS Relacionados",
        "",
        "### Serviços Principais",
        "- EC2, Lambda, ECS, EKS",
        "- S3, EBS, RDS, DynamoDB",
        "- VPC, IAM, CloudWatch",
        "- CloudFormation, CDK",
        "",
        "### Configuração do Ambiente",
        "```bash",
        "# Configurar AWS CLI",
        "aws configure",
        "aws sts get-caller-identity",
        "```",
        ""
    ]
    return content

def generate_python_module_content(module_name: str) -> list:
    """Gera conteúdo específico para módulos Python"""
    content = [
        "## 🐍 Conceitos Principais",
        "",
        f"### 1. Fundamentos de {module_name}",
        f"O {module_name} utiliza Python para análise e processamento de dados...",
        "",
        "### 2. Metodologia e Processo",
        "O processo inclui:",
        "- Coleta e limpeza de dados",
        "- Análise exploratória",
        "- Feature engineering",
        "- Treinamento e validação",
        "",
        "### 3. Implementação Prática",
        "```python",
        f"# Exemplo de implementação {module_name}",
        "import pandas as pd",
        "import numpy as np",
        f"from sklearn import {module_name.lower().replace(' ', '_')}",
        "",
        "# Implementação do código",
        "def process_data(data):",
        "    # Processamento dos dados",
        "    return processed_data",
        "```",
        "",
        "## 📊 Bibliotecas e Frameworks",
        "",
        "### Bibliotecas Principais",
        "- Pandas, NumPy, SciPy",
        "- Matplotlib, Seaborn, Plotly",
        "- Scikit-learn, TensorFlow, PyTorch",
        "- Jupyter, Streamlit, Dash",
        "",
        "### Configuração do Ambiente",
        "```bash",
        "# Criar ambiente virtual",
        "python -m venv venv",
        "source venv/bin/activate  # Linux/Mac",
        "pip install pandas numpy matplotlib",
        "```",
        ""
    ]
    return content

def generate_web_module_content(module_name: str) -> list:
    """Gera conteúdo específico para módulos Web"""
    content = [
        "## 🌐 Conceitos Principais",
        "",
        f"### 1. Fundamentos de {module_name}",
        f"O {module_name} representa as melhores práticas em desenvolvimento web moderno...",
        "",
        "### 2. Arquitetura e Padrões",
        "A arquitetura inclui:",
        "- Separação de responsabilidades",
        "- Padrões de design reutilizáveis",
        "- Sistema de roteamento",
        "- Gerenciamento de estado",
        "",
        "### 3. Implementação Prática",
        "```javascript",
        f"// Exemplo de implementação {module_name}",
        "const {module_name.lower().replace(' ', '')} = {{",
        "  init() {{",
        "    // Implementação",
        "  }}",
        "}};",
        "```",
        "",
        "## 🛠️ Tecnologias e Ferramentas",
        "",
        "### Tecnologias Principais",
        "- HTML5, CSS3, JavaScript (ES6+)",
        "- React, Vue, Angular",
        "- Node.js, Express, FastAPI",
        "- MongoDB, PostgreSQL, Redis",
        "",
        "### Configuração do Ambiente",
        "```bash",
        "# Instalar dependências",
        "npm install",
        "npm run dev",
        "```",
        ""
    ]
    return content

def generate_react_module_content(module_name: str) -> list:
    """Gera conteúdo específico para módulos React"""
    content = [
        "## ⚛️ Conceitos Principais",
        "",
        f"### 1. Fundamentos de {module_name}",
        f"O {module_name} representa a evolução do React para aplicações modernas...",
        "",
        "### 2. Arquitetura e Padrões",
        "A arquitetura inclui:",
        "- Gerenciamento de estado",
        "- Roteamento e navegação",
        "- Componentes reutilizáveis",
        "- Testes automatizados",
        "",
        "### 3. Implementação Prática",
        "```jsx",
        f"// Exemplo de implementação {module_name}",
        "const {module_name.replace(' ', '')} = () => {{",
        "  // Implementação",
        "  return <div>Componente</div>;",
        "}};",
        "```",
        "",
        "## 🛠️ Ferramentas e Bibliotecas",
        "",
        "### Ferramentas Principais",
        "- Create React App, Vite",
        "- React Router, React Query",
        "- Redux Toolkit, Zustand",
        "- Jest, React Testing Library",
        "",
        "### Configuração do Ambiente",
        "```bash",
        "# Criar projeto React",
        "npx create-react-app my-app",
        "cd my-app",
        "npm start",
        "```",
        ""
    ]
    return content

def generate_generic_module_content(module_name: str) -> list:
    """Gera conteúdo genérico para módulos"""
    content = [
        "## 📚 Conceitos Principais",
        "",
        f"### 1. Fundamentos de {module_name}",
        f"O {module_name} é essencial para o desenvolvimento de software de qualidade...",
        "",
        "### 2. Metodologia e Aplicação",
        "A implementação inclui:",
        "- Metodologias comprovadas",
        "- Ferramentas e tecnologias",
        "- Processos de validação",
        "- Métricas de sucesso",
        "",
        "### 3. Implementação Prática",
        "```bash",
        f"# Exemplo de implementação {module_name}",
        "setup_{module_name.lower().replace(' ', '_')}",
        "configure_{module_name.lower().replace(' ', '_')}",
        "```",
        "",
        "## 🛠️ Ferramentas e Recursos",
        "",
        "### Ferramentas Principais",
        "- IDEs e editores de código",
        "- Sistemas de controle de versão",
        "- Ferramentas de teste e qualidade",
        "- Plataformas de deploy",
        "",
        "### Configuração do Ambiente",
        "```bash",
        "# Configurar ambiente",
        "git clone <repository>",
        "npm install",
        "npm run dev",
        "```",
        ""
    ]
    return content

def main():
    """Função principal"""
    print("📚 ORGANIZANDO CONTEÚDO POR MÓDULOS")
    print("=" * 60)
    
    # Cursos disponíveis
    courses = [
        'devops-docker',
        'aws-cloud', 
        'python-data-science',
        'web-fundamentals',
        'react-advanced'
    ]
    
    for course in courses:
        organize_course_modules(course)
    
    print("\n🎉 Organização por módulos concluída com sucesso!")
    print("\n📁 Os módulos foram criados em cada diretório de curso:")
    print("   - devops-docker/modulos/")
    print("   - aws-cloud/modulos/")
    print("   - python-data-science/modulos/")
    print("   - web-fundamentals/modulos/")
    print("   - react-advanced/modulos/")

if __name__ == "__main__":
    main()
