#!/usr/bin/env python3
"""
Script para aplicar conteúdo ENGAGANTE em todos os módulos existentes
"""

import os
import shutil
from pathlib import Path

def apply_engaging_content_to_all_modules():
    """Aplica conteúdo engajante em todos os módulos"""
    print("🚀 APLICANDO CONTEÚDO ENGAGANTE EM TODOS OS MÓDULOS!")
    print("=" * 70)
    
    # Cursos e seus módulos
    courses_modules = {
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
    
    total_updated = 0
    
    for course, modules in courses_modules.items():
        print(f"\n📚 CURSO: {course.upper()}")
        print("-" * 50)
        
        course_path = Path(course)
        modules_dir = course_path / "modulos"
        
        if not modules_dir.exists():
            print(f"  ❌ Diretório de módulos não encontrado: {modules_dir}")
            continue
        
        # Atualizar cada módulo
        for i, module_name in enumerate(modules, 1):
            module_file = modules_dir / f"modulo-{i:02d}-{module_name.lower().replace(' ', '-').replace('(', '').replace(')', '').replace('/', '-').replace('ç', 'c').replace('ã', 'a')}.md"
            
            if module_file.exists():
                # Fazer backup
                backup_file = module_file.with_suffix('.md.backup')
                shutil.copy2(module_file, backup_file)
                
                # Gerar conteúdo engajante
                new_content = create_engaging_module(course, module_name, i)
                
                # Escrever novo conteúdo
                with open(module_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                print(f"  ✅ Atualizado: {module_file.name}")
                total_updated += 1
            else:
                print(f"  ❌ Arquivo não encontrado: {module_file.name}")
    
    print(f"\n🎉 CONTEÚDO ENGAGANTE APLICADO COM SUCESSO!")
    print(f"📊 Total de módulos atualizados: {total_updated}")
    print("\n🚀 Agora todos os módulos PREndem a atenção do aluno!")
    print("📚 Histórias reais, desafios, casos práticos")
    print("💰 Foco em carreira e salários")
    print("⚡ Hands-on imediato, projetos reais")

def create_engaging_module(course_type: str, module_name: str, module_num: int) -> str:
    """Cria conteúdo ENGAGANTE para um módulo"""
    
    if course_type == 'devops-docker':
        return create_engaging_devops_module(module_name, module_num)
    elif course_type == 'aws-cloud':
        return create_engaging_aws_module(module_name, module_num)
    elif course_type == 'python-data-science':
        return create_engaging_python_module(module_name, module_num)
    elif course_type == 'web-fundamentals':
        return create_engaging_web_module(module_name, module_num)
    elif course_type == 'react-advanced':
        return create_engaging_react_module(module_name, module_num)
    else:
        return create_engaging_generic_module(module_name, module_num)

def create_engaging_devops_module(module_name: str, module_num: int) -> str:
    """Cria módulo DevOps ENGAGANTE"""
    
    # Histórias e casos reais para capturar atenção
    real_stories = {
        "Fundamentos de DevOps": {
            "story": "🚨 **CENÁRIO REAL: Netflix em 2011**\n\nImagine: Netflix está perdendo milhões de dólares por dia porque seu sistema de DVD está falhando constantemente. Os engenheiros trabalham 16 horas por dia, fazendo deploy manual às 3 da manhã, e ainda assim quebram a aplicação.\n\n**O que aconteceu?**\n- Deploy manual = erros humanos\n- Sem testes automatizados = bugs em produção\n- Sem monitoramento = falhas silenciosas\n- Sem rollback = caos total\n\n**A solução?** DevOps!",
            "challenge": "💪 **DESAFIO IMEDIATO:**\n\nVocê é o novo DevOps Engineer da Netflix. Seu chefe te dá 24 horas para:\n1. Automatizar o deploy\n2. Implementar testes\n3. Criar monitoramento\n4. Configurar rollback automático\n\n**Consegue salvar a Netflix?** 🎯"
        },
        "Docker e Containers": {
            "story": "🐳 **CENÁRIO REAL: Spotify em 2014**\n\nSpotify tem 100+ microserviços rodando em servidores diferentes. Cada desenvolvedor tem um ambiente único, e a frase 'funciona na minha máquina' é o pesadelo da equipe.\n\n**O problema:**\n- 50% do tempo = configurando ambientes\n- 30% do tempo = debuggando diferenças entre máquinas\n- 20% do tempo = desenvolvendo features\n\n**A solução?** Docker containers!",
            "challenge": "💪 **DESAFIO IMEDIATO:**\n\nVocê é o DevOps Engineer da Spotify. Crie um container Docker que:\n1. Rode em qualquer máquina\n2. Tenha todas as dependências\n3. Seja idêntico em dev/prod\n4. Deploy em 1 comando\n\n**Consegue resolver o caos?** 🎯"
        },
        "Kubernetes e Orquestração": {
            "story": "☸️ **CENÁRIO REAL: Uber em 2016**\n\nUber tem 2000+ microserviços rodando em 50+ datacenters. Quando um serviço falha, 100.000+ motoristas ficam offline e a empresa perde milhões por hora.\n\n**O problema:**\n- Orquestração manual = caos total\n- Escalabilidade manual = perda de clientes\n- Falhas em cascata = sistema inteiro cai\n\n**A solução?** Kubernetes!",
            "challenge": "💪 **DESAFIO IMEDIATO:**\n\nVocê é o DevOps Engineer da Uber. Configure Kubernetes para:\n1. Auto-scaling automático\n2. Load balancing inteligente\n3. Failover automático\n4. Zero downtime\n\n**Consegue manter o Uber rodando?** 🎯"
        }
    }
    
    story_data = real_stories.get(module_name, {
        "story": f"🚀 **CENÁRIO REAL: Empresa Tech em 2024**\n\nImagine: Sua empresa está perdendo clientes porque o deploy demora 2 semanas e quebra 3 vezes por mês.\n\n**O problema:**\n- Deploy manual = erros humanos\n- Sem testes = bugs em produção\n- Sem monitoramento = falhas silenciosas\n\n**A solução?** {module_name}!",
        "challenge": f"💪 **DESAFIO IMEDIATO:**\n\nVocê é o DevOps Engineer. Resolva o problema de deploy em 24 horas usando {module_name}!\n\n**Consegue salvar a empresa?** 🎯"
    })
    
    content = [
        f"# 🚀 Módulo {module_num}: {module_name}",
        "",
        "## 🎬 **ABERTURA DRAMÁTICA**",
        "",
        story_data["story"],
        "",
        "---",
        "",
        "## 🎯 **POR QUE VOCÊ PRECISA SABER ISSO?**",
        "",
        "### 💰 **Impacto no Salário:**",
        "- DevOps Engineer: R$ 8.000 - R$ 15.000",
        "- DevOps Senior: R$ 15.000 - R$ 25.000",
        "- DevOps Lead: R$ 25.000 - R$ 40.000",
        "",
        "### 🚀 **Impacto na Carreira:**",
        "- 85% das empresas procuram DevOps Engineers",
        "- 3x mais oportunidades de emprego",
        "- Salários 40% acima da média de TI",
        "",
        "### 🌍 **Impacto no Mundo:**",
        "- Netflix: 99.99% de uptime (era 95%)",
        "- Amazon: Deploy a cada 11 segundos",
        "- Google: 2 bilhões de containers rodando",
        "",
        "---",
        "",
        story_data["challenge"],
        "",
        "## 🧠 **COMO VAMOS RESOLVER ISSO?**",
        "",
        "### 📚 **Método de Aprendizagem:**",
        "1. **TEORIA RÁPIDA** (20 min) - Conceitos essenciais",
        "2. **DEMO AO VIVO** (30 min) - Vendo funcionando",
        "3. **HANDS-ON** (1 hora) - Você faz funcionar",
        "4. **PROJETO REAL** (2 horas) - Aplicação prática",
        "",
        "### ⚡ **Resultado em 4 horas:**",
        "- Conceito dominado",
        "- Projeto funcionando",
        "- Portfolio atualizado",
        "- Pronto para entrevista",
        "",
        "---",
        "",
        "## 🔥 **CONCEITOS QUE VÃO MUDAR SUA VIDA**",
        "",
        "### 1️⃣ **O que é {module_name}?**",
        "Não é só uma ferramenta, é uma **REVOLUÇÃO** na forma de trabalhar!",
        "",
        "**ANTES (Tradicional):**",
        "- Deploy manual = 2 semanas",
        "- Testes manuais = 3 dias",
        "- Rollback = impossível",
        "- Monitoramento = olhando logs",
        "",
        "**DEPOIS (Com {module_name}):**",
        "- Deploy automático = 5 minutos",
        "- Testes automáticos = 2 minutos",
        "- Rollback = 1 clique",
        "- Monitoramento = alertas automáticos",
        "",
        "### 2️⃣ **Como funciona na prática?**",
        "```yaml",
        "# Exemplo REAL que você vai usar:",
        "pipeline:",
        "  name: 'Deploy Automático'",
        "  stages:",
        "    - test: 'Rodar testes'",
        "    - build: 'Criar container'",
        "    - deploy: 'Deploy automático'",
        "    - monitor: 'Verificar saúde'",
        "```",
        "",
        "### 3️⃣ **Ferramentas que você vai dominar:**",
        "- **Jenkins** - O coração da automação",
        "- **Docker** - Containers que funcionam em qualquer lugar",
        "- **Kubernetes** - Orquestração de containers",
        "- **Terraform** - Infraestrutura como código",
        "",
        "---",
        "",
        "## 🎮 **HANDS-ON: VAMOS FAZER FUNCIONAR!**",
        "",
        "### 🚀 **PASSO 1: Setup do Ambiente**",
        "```bash",
        "# Em 5 minutos, você terá tudo funcionando:",
        "curl -fsSL https://get.docker.com | sh",
        "docker run hello-world",
        "echo '🎉 Docker funcionando!'",
        "```",
        "",
        "### 🔧 **PASSO 2: Primeiro Pipeline**",
        "```yaml",
        "# Jenkinsfile que você vai criar:",
        "pipeline {{",
        "    agent any",
        "    stages {{",
        "        stage('Build') {{",
        "            steps {{",
        "                echo 'Construindo aplicação...'",
        "                sh 'docker build -t minha-app .'",
        "            }}",
        "        }}",
        "        stage('Test') {{",
        "            steps {{",
        "                echo 'Testando...'",
        "                sh 'docker run minha-app npm test'",
        "            }}",
        "        }}",
        "        stage('Deploy') {{",
        "            steps {{",
        "                echo 'Deployando...'",
        "                sh 'docker run -d -p 3000:3000 minha-app'",
        "            }}",
        "        }}",
        "    }}",
        "}}",
        "```",
        "",
        "### 🎯 **PASSO 3: Teste Real**",
        "```bash",
        "# Deploy em produção (simulado):",
        "docker run -d -p 3000:3000 minha-app",
        "curl http://localhost:3000",
        "echo '🚀 APLICAÇÃO FUNCIONANDO!'",
        "```",
        "",
        "---",
        "",
        "## 🏆 **PROJETO FINAL: SALVE A EMPRESA!**",
        "",
        "### 📋 **Missão:**",
        "Você é o DevOps Engineer contratado para salvar uma startup que está perdendo R$ 50.000 por dia devido a falhas de deploy.",
        "",
        "### 🎯 **Objetivos:**",
        "1. **Automate o deploy** em 2 horas",
        "2. **Implemente testes** em 1 hora",
        "3. **Configure monitoramento** em 1 hora",
        "4. **Documente tudo** em 30 minutos",
        "",
        "### 🏅 **Critérios de Sucesso:**",
        "- Deploy automático funcionando",
        "- Testes passando 100%",
        "- Monitoramento ativo",
        "- Rollback em 1 clique",
        "",
        "### 💰 **Recompensa:**",
        "- Contrato de R$ 15.000/mês",
        "- Ações da empresa",
        "- Reconhecimento da equipe",
        "- Portfolio atualizado",
        "",
        "---",
        "",
        "## 🚀 **PRÓXIMOS PASSOS**",
        "",
        "### 📚 **Recursos para Aprofundar:**",
        "- **YouTube:** DevOps Roadmap 2024",
        "- **Livros:** The Phoenix Project",
        "- **Cursos:** AWS DevOps, Azure DevOps",
        "- **Comunidades:** DevOps Brasil, Docker Community",
        "",
        "### 🎯 **Próximo Módulo:**",
        "No próximo módulo, você vai aprender **Kubernetes** e orquestrar containers como um PRO!",
        "",
        "### 💼 **Preparação para Entrevista:**",
        "- Conceitos dominados ✅",
        "- Projeto funcionando ✅",
        "- Portfolio atualizado ✅",
        "- Pronto para R$ 15.000+ ✅",
        "",
        "---",
        "",
        "## 🎉 **PARABÉNS!**",
        "",
        f"Você acabou de dominar **{module_name}** em 4 horas!",
        "",
        "**O que você conquistou:**",
        "- 🧠 Conceito dominado",
        "- 🛠️ Ferramentas funcionando",
        "- 🚀 Projeto real no portfolio",
        "- 💰 Preparado para salários altos",
        "- 🌟 Diferencial no mercado",
        "",
        "**Agora é sua vez de:**",
        "- Aplicar em projetos reais",
        "- Compartilhar conhecimento",
        "- Ajudar outros desenvolvedores",
        "- Crescer na carreira",
        "",
        "---",
        "",
        f"*🎯 Módulo {module_num} CONCLUÍDO com sucesso!*",
        f"*🚀 {module_name} DOMINADO!*",
        "*💪 Pronto para o próximo desafio!*"
    ]
    
    return "\n".join(content)

def create_engaging_aws_module(module_name: str, module_num: int) -> str:
    """Cria módulo AWS ENGAGANTE"""
    
    content = [
        f"# ☁️ Módulo {module_num}: {module_name}",
        "",
        "## 🎬 **ABERTURA DRAMÁTICA**",
        "",
        "🚨 **CENÁRIO REAL: Startup Brasileira em 2024**\n\nImagine: Sua startup está crescendo 300% ao mês, mas o servidor local está travando a cada 100 usuários. Os clientes estão reclamando, o dinheiro está sendo perdido, e você tem 24 horas para resolver.",
        "",
        "**O problema:**",
        "- Servidor local = instável",
        "- Sem escalabilidade = perda de clientes",
        "- Sem backup = risco de perder tudo",
        "- Sem segurança = vulnerável a ataques",
        "",
        "**A solução?** AWS Cloud!",
        "",
        "---",
        "",
        "## 🎯 **POR QUE AWS É O FUTURO?**",
        "",
        "### 💰 **Impacto no Salário:**",
        "- AWS Developer: R$ 6.000 - R$ 12.000",
        "- AWS Solutions Architect: R$ 12.000 - R$ 20.000",
        "- AWS DevOps Engineer: R$ 15.000 - R$ 30.000",
        "",
        "### 🚀 **Impacto na Carreira:**",
        "- 90% das empresas usam AWS",
        "- Certificações = 40% mais salário",
        "- Demanda crescente no Brasil",
        "",
        "---",
        "",
        "## 🔥 **VAMOS FAZER FUNCIONAR AGORA!**",
        "",
        "### 🚀 **PASSO 1: Setup AWS**",
        "```bash",
        "# Configure sua conta AWS em 5 minutos:",
        "aws configure",
        "aws sts get-caller-identity",
        "echo '🎉 AWS configurado!'",
        "```",
        "",
        "### 🔧 **PASSO 2: Primeiro Serviço**",
        "```bash",
        "# Crie um bucket S3 em 2 minutos:",
        "aws s3 mb s3://minha-startup-2024",
        "aws s3 ls",
        "echo '🚀 Bucket criado!'",
        "```",
        "",
        "### 🎯 **PASSO 3: Deploy Real**",
        "```bash",
        "# Deploy de uma aplicação em 5 minutos:",
        "aws ec2 run-instances --image-id ami-123456 --instance-type t2.micro",
        "echo '🚀 Servidor rodando na nuvem!'",
        "```",
        "",
        "---",
        "",
        "## 🏆 **PROJETO FINAL: SALVE A STARTUP!**",
        "",
        "**Missão:** Migre a startup para AWS em 4 horas e garanta 99.9% de uptime!",
        "",
        "**Recompensa:** Contrato de R$ 12.000/mês + ações da empresa!",
        "",
        "---",
        "",
        "*🎯 Módulo {module_num} CONCLUÍDO!*",
        "*☁️ AWS DOMINADO!*"
    ]
    
    return "\n".join(content)

def create_engaging_python_module(module_name: str, module_num: int) -> str:
    """Cria módulo Python ENGAGANTE"""
    
    content = [
        f"# 🐍 Módulo {module_num}: {module_name}",
        "",
        "## 🎬 **ABERTURA DRAMÁTICA**",
        "",
        "🚨 **CENÁRIO REAL: Empresa de E-commerce em 2024**\n\nImagine: Sua empresa está perdendo R$ 100.000 por mês porque não consegue prever quais produtos vão vender. Os estoques estão sempre errados, e os clientes estão insatisfeitos.",
        "",
        "**A solução?** Machine Learning com Python!",
        "",
        "---",
        "",
        "## 🔥 **VAMOS FAZER FUNCIONAR AGORA!**",
        "",
        "### 🚀 **PASSO 1: Setup Python**",
        "```python",
        "# Em 5 minutos, você terá ML funcionando:",
        "import pandas as pd",
        "import numpy as np",
        "from sklearn.linear_model import LinearRegression",
        "print('🎉 Machine Learning funcionando!'",
        "```",
        "",
        "### 🔧 **PASSO 2: Primeiro Modelo**",
        "```python",
        "# Previsão de vendas em 10 linhas:",
        "dados = pd.read_csv('vendas.csv')",
        "modelo = LinearRegression()",
        "modelo.fit(dados[['preco', 'promocao']], dados['quantidade'])",
        "previsao = modelo.predict([[50, 1]])",
        "print(f'🚀 Vai vender {previsao[0]:.0f} unidades!'",
        "```",
        "",
        "---",
        "",
        "*🎯 Módulo {module_num} CONCLUÍDO!*",
        "*🐍 Python ML DOMINADO!*"
    ]
    
    return "\n".join(content)

def create_engaging_web_module(module_name: str, module_num: int) -> str:
    """Cria módulo Web ENGAGANTE"""
    
    content = [
        f"# 🌐 Módulo {module_num}: {module_name}",
        "",
        "## 🎬 **ABERTURA DRAMÁTICA**",
        "",
        "🚨 **CENÁRIO REAL: Freelancer em 2024**\n\nImagine: Você está perdendo projetos porque não consegue criar sites responsivos e modernos. Os clientes querem React, mas você só sabe HTML básico.",
        "",
        "**A solução?** Web Development moderno!",
        "",
        "---",
        "",
        "## 🔥 **VAMOS FAZER FUNCIONAR AGORA!**",
        "",
        "### 🚀 **PASSO 1: Setup React**",
        "```bash",
        "# Em 5 minutos, você terá React funcionando:",
        "npx create-react-app meu-site",
        "cd meu-site",
        "npm start",
        "echo '🎉 React funcionando!'",
        "```",
        "",
        "### 🔧 **PASSO 2: Primeiro Componente**",
        "```jsx",
        "// Componente moderno em 10 linhas:",
        "function Header() {{",
        "  return (",
        "    <header className='header-moderno'>",
        "      <h1>Meu Site Incrível</h1>",
        "      <nav>",
        "        <a href='/'>Home</a>",
        "        <a href='/sobre'>Sobre</a>",
        "      </nav>",
        "    </header>",
        "  );",
        "}}",
        "```",
        "",
        "---",
        "",
        "*🎯 Módulo {module_num} CONCLUÍDO!*",
        "*🌐 Web Development DOMINADO!*"
    ]
    
    return "\n".join(content)

def create_engaging_react_module(module_name: str, module_num: int) -> str:
    """Cria módulo React ENGAGANTE"""
    
    content = [
        f"# ⚛️ Módulo {module_num}: {module_name}",
        "",
        "## 🎬 **ABERTURA DRAMÁTICA**",
        "",
        "🚨 **CENÁRIO REAL: Desenvolvedor Frontend em 2024**\n\nImagine: Você está sendo rejeitado em entrevistas porque não consegue implementar Hooks avançados, Context API, e padrões modernos de React.",
        "",
        "**A solução?** React Avançado!",
        "",
        "---",
        "",
        "## 🔥 **VAMOS FAZER FUNCIONAR AGORA!**",
        "",
        "### 🚀 **PASSO 1: Setup Avançado**",
        "```bash",
        "# Em 5 minutos, você terá React avançado:",
        "npx create-react-app app-avancado --template typescript",
        "cd app-avancado",
        "npm install @reduxjs/toolkit react-router-dom",
        "echo '🎉 React avançado funcionando!'",
        "```",
        "",
        "### 🔧 **PASSO 2: Hooks Avançados**",
        "```jsx",
        "// Custom Hook em 15 linhas:",
        "function useLocalStorage(key, initialValue) {{",
        "  const [storedValue, setStoredValue] = useState(() => {{",
        "    try {{",
        "      const item = window.localStorage.getItem(key);",
        "      return item ? JSON.parse(item) : initialValue;",
        "    }} catch (error) {{",
        "      return initialValue;",
        "    }}",
        "  }});",
        "  return [storedValue, setStoredValue];",
        "}}",
        "```",
        "",
        "---",
        "",
        "*🎯 Módulo {module_num} CONCLUÍDO!*",
        "*⚛️ React Avançado DOMINADO!*"
    ]
    
    return "\n".join(content)

def create_engaging_generic_module(module_name: str, module_num: int) -> str:
    """Cria módulo genérico ENGAGANTE"""
    
    content = [
        f"# 📚 Módulo {module_num}: {module_name}",
        "",
        "## 🎬 **ABERTURA DRAMÁTICA**",
        "",
        f"🚨 **CENÁRIO REAL: Desenvolvedor em 2024**\n\nImagine: Você está perdendo oportunidades porque não domina {module_name}. Os empregadores procuram especialistas, mas você só tem conhecimento básico.",
        "",
        f"**A solução?** Dominar {module_name}!",
        "",
        "---",
        "",
        "## 🔥 **VAMOS FAZER FUNCIONAR AGORA!**",
        "",
        "### 🚀 **PASSO 1: Setup Rápido**",
        "```bash",
        "# Em 5 minutos, você terá tudo funcionando:",
        "git clone <seu-projeto>",
        "npm install",
        "npm start",
        "echo '🎉 {module_name} funcionando!'",
        "```",
        "",
        "---",
        "",
        "*🎯 Módulo {module_num} CONCLUÍDO!*",
        f"*📚 {module_name} DOMINADO!*"
    ]
    
    return "\n".join(content)

if __name__ == "__main__":
    apply_engaging_content_to_all_modules()











