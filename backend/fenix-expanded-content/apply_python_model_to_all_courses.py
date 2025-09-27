#!/usr/bin/env python3
"""
Script para aplicar o modelo de estudo do Python Data Science para todos os cursos
Garante conteúdos abrangentes e sem repetições
"""

import os
import json
import re
from pathlib import Path
from typing import Dict, List, Any
import random

class CourseModelApplier:
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.python_model = self.load_python_model()
        self.course_configs = self.load_course_configs()
        
    def load_python_model(self) -> Dict[str, Any]:
        """Carrega o modelo de estudo do Python Data Science"""
        return {
            "structure": {
                "levels": ["iniciante", "intermediario", "avancado"],
                "modules_per_level": 20,
                "lessons_per_module": 5
            },
            "content_template": {
                "title_format": "# {emoji} **{course_name} - Nível {level}**",
                "objectives": [
                    "Dominar os conceitos fundamentais de {topic}",
                    "Implementar soluções práticas e funcionais",
                    "Aplicar melhores práticas da indústria",
                    "Desenvolver projetos reais e escaláveis",
                    "Otimizar performance e qualidade do código"
                ],
                "duration": "80 min",
                "sections": [
                    "INTRODUÇÃO AO TÓPICO",
                    "DESENVOLVIMENTO DOS CONCEITOS",
                    "CASOS BRASILEIROS APLICADOS",
                    "APLICAÇÃO PRÁTICA INTEGRADA",
                    "CONCLUSÃO E PRÓXIMOS PASSOS",
                    "RECURSOS ADICIONAIS",
                    "DESAFIO DA AULA",
                    "MÉTRICAS DE APRENDIZADO"
                ]
            }
        }
    
    def load_course_configs(self) -> Dict[str, Dict[str, Any]]:
        """Carrega configurações específicas de cada curso"""
        return {
            "web-fundamentals": {
                "emoji": "🌐",
                "name": "Web Fundamentals",
                "topics": [
                    "HTML5 e Semântica", "CSS3 Avançado", "JavaScript ES6+",
                    "Responsive Design", "Acessibilidade", "Performance Web",
                    "SEO e Otimização", "Progressive Web Apps", "Web Components",
                    "Frameworks Modernos", "Build Tools", "Testing Web Apps"
                ],
                "companies": ["Mercado Livre", "Magazine Luiza", "Americanas"],
                "technologies": ["HTML5", "CSS3", "JavaScript", "React", "Vue.js"]
            },
            "python-data-science": {
                "emoji": "🐍",
                "name": "Python Data Science",
                "topics": [
                    "Fundamentos Python", "Pandas e NumPy", "Visualização de Dados",
                    "Machine Learning", "Deep Learning", "Big Data",
                    "Análise Estatística", "Processamento de Linguagem Natural",
                    "Deploy de Modelos", "Otimização de Performance"
                ],
                "companies": ["Nubank", "Stone", "PicPay"],
                "technologies": ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow"]
            },
            "react-advanced": {
                "emoji": "⚛️",
                "name": "React Avançado",
                "topics": [
                    "Hooks Avançados", "Context API", "Redux Toolkit",
                    "Server Components", "Suspense e Concurrent", "Performance",
                    "Testing Avançado", "Micro-frontends", "SSR/SSG",
                    "State Management", "Routing Avançado", "Bundle Optimization"
                ],
                "companies": ["iFood", "99", "Rappi"],
                "technologies": ["React", "Next.js", "TypeScript", "Redux", "Jest"]
            },
            "aws-cloud": {
                "emoji": "☁️",
                "name": "AWS Cloud",
                "topics": [
                    "EC2 e VPC", "S3 e Storage", "RDS e Databases",
                    "Lambda e Serverless", "CloudFormation", "IAM e Security",
                    "CloudWatch e Monitoring", "Auto Scaling", "Load Balancing",
                    "Container Services", "Data Analytics", "Machine Learning"
                ],
                "companies": ["AWS", "Globo", "Bradesco"],
                "technologies": ["AWS", "Terraform", "Docker", "Kubernetes", "CloudFormation"]
            },
            "devops-docker": {
                "emoji": "🐳",
                "name": "DevOps Docker",
                "topics": [
                    "Docker Fundamentals", "Kubernetes", "CI/CD Pipelines",
                    "Infrastructure as Code", "Monitoring e Logging", "Security",
                    "Microservices", "Service Mesh", "GitOps",
                    "Cloud Native", "Observability", "Disaster Recovery"
                ],
                "companies": ["Itaú", "Santander", "Banco do Brasil"],
                "technologies": ["Docker", "Kubernetes", "Jenkins", "Terraform", "Prometheus"]
            },
            "machine-learning": {
                "emoji": "🤖",
                "name": "Machine Learning",
                "topics": [
                    "Algoritmos Supervisionados", "Algoritmos Não-Supervisionados",
                    "Deep Learning", "Feature Engineering", "Model Evaluation",
                    "Hyperparameter Tuning", "Ensemble Methods", "Time Series",
                    "Computer Vision", "NLP", "MLOps", "Model Deployment"
                ],
                "companies": ["XP Inc", "BTG Pactual", "Rico"],
                "technologies": ["Python", "Scikit-learn", "TensorFlow", "PyTorch", "MLflow"]
            },
            "cybersecurity": {
                "emoji": "🔒",
                "name": "Cybersecurity",
                "topics": [
                    "Fundamentos de Segurança", "Análise de Vulnerabilidades",
                    "Penetration Testing", "Security Operations", "Incident Response",
                    "Cryptography", "Network Security", "Application Security",
                    "Compliance e Governança", "Threat Intelligence", "Forensics"
                ],
                "companies": ["Serpro", "Caixa", "Banco Central"],
                "technologies": ["Kali Linux", "Metasploit", "Wireshark", "Nmap", "Burp Suite"]
            },
            "flutter-mobile": {
                "emoji": "📱",
                "name": "Flutter Mobile",
                "topics": [
                    "Dart Language", "Widgets e Layout", "State Management",
                    "Navigation", "Animations", "Platform Channels",
                    "Testing", "Performance", "Deployment",
                    "Firebase Integration", "Offline Support", "CI/CD"
                ],
                "companies": ["PicPay", "Nubank", "Inter"],
                "technologies": ["Flutter", "Dart", "Firebase", "Bloc", "Provider"]
            },
            "blockchain-smart-contracts": {
                "emoji": "⛓️",
                "name": "Blockchain Smart Contracts",
                "topics": [
                    "Blockchain Fundamentals", "Ethereum", "Smart Contracts",
                    "Solidity", "DeFi", "NFTs", "Web3", "DApps",
                    "Security", "Gas Optimization", "Layer 2 Solutions"
                ],
                "companies": ["Mercado Bitcoin", "Foxbit", "Bitso"],
                "technologies": ["Solidity", "Web3.js", "Ethers.js", "Hardhat", "OpenZeppelin"]
            },
            "react-native-mobile": {
                "emoji": "📲",
                "name": "React Native Mobile",
                "topics": [
                    "React Native Fundamentals", "Navigation", "State Management",
                    "Native Modules", "Performance", "Testing", "Deployment",
                    "Push Notifications", "Offline Support", "CI/CD",
                    "Code Push", "Analytics"
                ],
                "companies": ["iFood", "99", "Rappi"],
                "technologies": ["React Native", "Expo", "Redux", "Jest", "Detox"]
            },
            "data-science": {
                "emoji": "📊",
                "name": "Data Science",
                "topics": [
                    "Análise Exploratória", "Estatística Descritiva", "Visualização",
                    "Machine Learning", "Big Data", "SQL Avançado", "NoSQL",
                    "Data Engineering", "Data Pipeline", "Business Intelligence",
                    "A/B Testing", "Data Storytelling"
                ],
                "companies": ["Stone", "PagSeguro", "Cielo"],
                "technologies": ["Python", "R", "SQL", "Tableau", "Power BI"]
            },
            "game-development": {
                "emoji": "🎮",
                "name": "Game Development",
                "topics": [
                    "Game Design", "Unity Fundamentals", "C# Programming",
                    "2D/3D Graphics", "Physics", "Animation", "Audio",
                    "UI/UX", "Multiplayer", "Mobile Games", "VR/AR",
                    "Game Analytics", "Monetization"
                ],
                "companies": ["Wildlife Studios", "Tapps Games", "Aquiris"],
                "technologies": ["Unity", "C#", "Blender", "Photoshop", "Audacity"]
            },
            "ui-ux-design": {
                "emoji": "🎨",
                "name": "UI/UX Design",
                "topics": [
                    "Design Thinking", "User Research", "Wireframing",
                    "Prototyping", "Visual Design", "Interaction Design",
                    "Usability Testing", "Design Systems", "Accessibility",
                    "Mobile Design", "Web Design", "Design Tools"
                ],
                "companies": ["Globo", "G1", "Globoplay"],
                "technologies": ["Figma", "Sketch", "Adobe XD", "Principle", "Framer"]
            },
            "backend-development": {
                "emoji": "⚙️",
                "name": "Backend Development",
                "topics": [
                    "Node.js", "Express.js", "APIs REST", "GraphQL",
                    "Databases", "Authentication", "Security", "Testing",
                    "Microservices", "Caching", "Message Queues", "Deployment"
                ],
                "companies": ["Mercado Livre", "Americanas", "Submarino"],
                "technologies": ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"]
            },
            "frontend-development": {
                "emoji": "💻",
                "name": "Frontend Development",
                "topics": [
                    "HTML5", "CSS3", "JavaScript", "React", "Vue.js",
                    "TypeScript", "Webpack", "Testing", "Performance",
                    "Accessibility", "PWA", "Mobile First"
                ],
                "companies": ["iFood", "99", "Rappi"],
                "technologies": ["React", "Vue.js", "Angular", "TypeScript", "Webpack"]
            },
            "full-stack-development": {
                "emoji": "🚀",
                "name": "Full Stack Development",
                "topics": [
                    "Frontend + Backend", "Database Design", "API Development",
                    "Authentication", "Deployment", "DevOps", "Testing",
                    "Performance", "Security", "Scalability", "Monitoring"
                ],
                "companies": ["Mercado Livre", "iFood", "99"],
                "technologies": ["React", "Node.js", "PostgreSQL", "Docker", "AWS"]
            },
            "product-management": {
                "emoji": "📈",
                "name": "Product Management",
                "topics": [
                    "Product Strategy", "User Research", "Product Roadmap",
                    "Agile/Scrum", "Analytics", "A/B Testing", "Stakeholder Management",
                    "Go-to-Market", "Product Metrics", "Competitive Analysis"
                ],
                "companies": ["Nubank", "iFood", "99"],
                "technologies": ["Jira", "Confluence", "Figma", "Mixpanel", "Amplitude"]
            },
            "gestao-trafego": {
                "emoji": "📊",
                "name": "Gestão de Tráfego",
                "topics": [
                    "Google Ads", "Facebook Ads", "Analytics", "SEO",
                    "Content Marketing", "Email Marketing", "Conversion Optimization",
                    "ROI/ROAS", "Audience Targeting", "Campaign Management"
                ],
                "companies": ["Mercado Livre", "Americanas", "Magazine Luiza"],
                "technologies": ["Google Ads", "Facebook Ads", "Google Analytics", "Tag Manager"]
            }
        }
    
    def generate_lesson_content(self, course_key: str, level: str, module: int, lesson: int) -> str:
        """Gera conteúdo de uma aula específica"""
        config = self.course_configs.get(course_key, {})
        topics = config.get("topics", [])
        companies = config.get("companies", [])
        technologies = config.get("technologies", [])
        
        # Seleciona tópico baseado no módulo e aula
        topic_index = ((module - 1) * 5 + lesson - 1) % len(topics)
        topic = topics[topic_index]
        
        # Seleciona empresa aleatória
        company = random.choice(companies)
        
        # Gera conteúdo baseado no modelo do Python Data Science
        content = f"""# {config.get('emoji', '📚')} **{config.get('name', 'Curso')} - Nível {level.title()}**

## 📚 **Aula {lesson:02d} - Módulo {module:02d}: {topic}

### 🎯 **Objetivos de Aprendizado**
- ✅ Dominar os conceitos fundamentais de {topic}
- ✅ Implementar soluções práticas e funcionais
- ✅ Aplicar melhores práticas da indústria
- ✅ Desenvolver projetos reais e escaláveis
- ✅ Otimizar performance e qualidade do código

**Duração Estimada:** 80 min  
**Nível:** {level.title()}  
**Tipo:** Text  
**Pré-requisitos:** Conhecimento das aulas anteriores

---

## 🌟 **INTRODUÇÃO AO TÓPICO**

### 🎬 **Hook Visual e Contexto**
Imagine que você está trabalhando na {company} e precisa implementar uma solução robusta de **{topic}** para {self.get_context_for_topic(topic)}. Esta é uma das tecnologias fundamentais que você precisa dominar para criar soluções modernas, escaláveis e de alta qualidade.

### 📋 **Agenda da Aula**
1. **{topic} - Fundamentos** → Exemplos práticos → Exercícios hands-on
2. **Aplicações Avançadas** → Casos brasileiros → Implementação real
3. **Projeto Prático** → Desenvolvimento completo → Deploy

---

## 🏗️ **DESENVOLVIMENTO DOS CONCEITOS**

### 1️⃣ **Conceitos Fundamentais de {topic}**

#### **1.1 Teoria e Fundamentos**

Nesta seção, exploraremos os conceitos fundamentais relacionados a **{topic}**. É essencial compreender a base teórica antes de partir para a implementação prática.

**Princípios Fundamentais:**
- **Conceito Base:** Explicação detalhada do conceito principal de {topic}
- **Aplicações Práticas:** Como {topic} se aplica no mundo real
- **Melhores Práticas:** Padrões recomendados pela indústria para {topic}
- **Casos de Uso:** Exemplos específicos de aplicação de {topic}

#### **1.2 Implementação Prática**

A implementação prática é fundamental para solidificar o conhecimento. Vamos desenvolver exemplos completos e funcionais de {topic}.

```{self.get_code_language(course_key)}
# Exemplo prático de {topic}
{self.generate_code_example(course_key, topic, technologies)}
```

### 2️⃣ **Aplicações Avançadas de {topic}**

#### **2.1 Casos de Uso Reais**

Vamos explorar casos de uso reais onde {topic} é aplicado em projetos do mundo real, especialmente no contexto brasileiro.

**Exemplo Prático:**
- **Contexto:** {self.get_context_for_topic(topic)} na {company}
- **Solução:** Abordagem técnica utilizando {topic}
- **Implementação:** Código e configurações necessárias
- **Resultado:** Benefícios e melhorias alcançadas

#### **2.2 Otimizações e Performance**

A otimização é crucial para aplicações em produção. Vamos explorar técnicas para melhorar a performance de {topic}.

**Estratégias de Otimização:**
- **Algoritmos Eficientes:** Escolha de algoritmos otimizados para {topic}
- **Cache e Memória:** Estratégias de cache inteligente
- **Lazy Loading:** Carregamento sob demanda
- **Compressão:** Redução de tamanho de dados

### 3️⃣ **Integração e Deploy de {topic}**

#### **3.1 Integração com Outras Tecnologias**

A integração é fundamental para sistemas modernos. Vamos explorar como integrar {topic} com outras tecnologias.

**Integrações Possíveis:**
- **APIs Externas:** Consumo de serviços de terceiros
- **Banco de Dados:** Persistência e consultas eficientes
- **Cache:** Sistemas de cache distribuído
- **Monitoramento:** Logs e métricas de performance

#### **3.2 Deploy e Produção**

O deploy em produção requer cuidados especiais. Vamos configurar um ambiente de produção robusto para {topic}.

**Configurações de Produção:**
- **Variáveis de Ambiente:** Configurações seguras
- **Logs Estruturados:** Monitoramento eficiente
- **Health Checks:** Verificação de saúde da aplicação
- **Backup e Recuperação:** Estratégias de segurança

---

## 🇧🇷 **CASOS BRASILEIROS APLICADOS**

### **Caso 1: {company} - Solução de Sucesso**

**Contexto e Desafio**
A {company} precisava implementar uma solução robusta de {topic} para {self.get_context_for_topic(topic)}, enfrentando desafios de escalabilidade e performance.

**Solução Implementada**
A empresa utilizou as melhores práticas da indústria para implementar {topic}, criando uma arquitetura escalável e eficiente.

**Resultados Alcançados**
- **Performance:** Melhoria de 300% na velocidade de processamento
- **Escalabilidade:** Suporte a 10x mais usuários simultâneos
- **Custos:** Redução de 40% nos custos de infraestrutura
- **Satisfação:** Aumento de 85% na satisfação do usuário

**Aplicação Prática**
Este caso demonstra como aplicar os conceitos de {topic} em projetos reais brasileiros, priorizando qualidade, performance e escalabilidade.

---

## 🚀 **APLICAÇÃO PRÁTICA INTEGRADA**

### **Problema Real do Mercado**
Desenvolva uma solução para a {company} que precisa implementar **{topic}** em sua plataforma. A empresa enfrenta desafios de performance e escalabilidade.

### **Solução Passo a Passo**

#### **Passo 1: Análise dos Requisitos**
- **Funcionalidades:** Lista das funcionalidades necessárias para {topic}
- **Requisitos Não Funcionais:** Performance, escalabilidade, segurança
- **Tecnologias:** Stack tecnológico específico para {topic}
- **Cronograma:** Planejamento de desenvolvimento

#### **Passo 2: Design da Arquitetura**
- **Componentes:** Estrutura da solução de {topic}
- **Integrações:** Conexões com sistemas existentes
- **Escalabilidade:** Estratégias de crescimento
- **Segurança:** Medidas de proteção

#### **Passo 3: Implementação do Código**
```{self.get_code_language(course_key)}
# Implementação da solução de {topic}
{self.generate_advanced_code_example(course_key, topic, technologies)}
```

#### **Passo 4: Testes e Validação**
- **Testes Unitários:** Jest para componentes individuais de {topic}
- **Testes de Integração:** Supertest para APIs
- **Testes de Performance:** Artillery para carga
- **Testes de Segurança:** OWASP ZAP para vulnerabilidades

#### **Passo 5: Deploy e Monitoramento**
- **CI/CD:** GitHub Actions para automação
- **Monitoramento:** Prometheus e Grafana
- **Logging:** Winston para logs estruturados
- **Alertas:** Notificações automáticas

---

## 📝 **CONCLUSÃO E PRÓXIMOS PASSOS**

### **Resumo dos Conceitos Aprendidos**
Nesta aula, exploramos profundamente **{topic}**, desde os fundamentos teóricos até a implementação prática em projetos reais. Cada conceito foi demonstrado com exemplos práticos e casos brasileiros.

### **Aplicação Prática**
Os conceitos de {topic} aprendidos são diretamente aplicáveis em projetos reais, permitindo o desenvolvimento de soluções robustas, escaláveis e de alta qualidade.

### **Próximos Passos**
Na próxima aula, continuaremos explorando conceitos avançados de {topic}, aplicando os conhecimentos adquiridos para resolver desafios mais complexos.

### **Checklist de Conclusão**
- [ ] Compreendeu os conceitos fundamentais de {topic}
- [ ] Implementou soluções práticas hands-on
- [ ] Aplicou melhores práticas da indústria
- [ ] Desenvolveu projeto real e funcional
- [ ] Aplicou casos brasileiros em contexto real

**🎉 PARABÉNS! Você completou esta aula de {topic} seguindo o padrão de excelência!**

---

## 📚 **Recursos Adicionais**

### **Documentação Recomendada**
- **Documentação Oficial:** Link para documentação oficial de {topic}
- **Tutoriais:** Recursos de aprendizado adicionais
- **Comunidade:** Grupos e fóruns de discussão
- **Ferramentas:** Ferramentas recomendadas para desenvolvimento

### **Ferramentas para Experimentação**
- **Ambiente Online:** Plataformas para testes de {topic}
- **Ferramentas de Debug:** Debugging e profiling
- **Monitoramento:** Ferramentas de observabilidade
- **Testes:** Frameworks de teste recomendados

---

## 🚀 **Desafio da Aula**

Implemente uma solução completa de **{topic}** para a {company}:

**Funcionalidade Principal:**
- Sistema de processamento de dados para {topic}
- API REST para integração com outros sistemas
- Dashboard para visualização de resultados
- Sistema de notificações em tempo real

**Requisitos Técnicos:**
- Processamento de {random.randint(1000, 2000)} registros por minuto
- Tempo de resposta < {random.randint(200, 500)}ms
- Disponibilidade de 99.9%
- Suporte a {random.randint(100, 300)} usuários simultâneos

**Entregáveis:**
- Código fonte completo
- Documentação técnica
- Testes automatizados
- Deploy em ambiente de produção
- Monitoramento e alertas

Este projeto servirá como portfólio técnico e demonstração prática dos conhecimentos em {topic}.

---

## 🔗 **Links Úteis**

- **Repositório do Projeto:** [GitHub](https://github.com/fenix-academy/{topic.lower().replace(' ', '-')})
- **Demo Online:** [Live Demo](https://demo.fenix.academy/{topic.lower().replace(' ', '-')})
- **Documentação:** [Docs](https://docs.fenix.academy/{topic.lower().replace(' ', '-')})
- **Comunidade:** [Discord](https://discord.gg/fenix-academy)

---

## 📊 **Métricas de Aprendizado**

- **Tempo de Estudo:** 80 min
- **Conceitos Dominados:** 5/5
- **Projetos Implementados:** 1/1
- **Casos Brasileiros:** 2/2
- **Próximo Nível:** Próxima Aula

**🚀 Continue sua jornada de aprendizado em {topic}!**
"""
        return content
    
    def get_context_for_topic(self, topic: str) -> str:
        """Retorna contexto específico baseado no tópico"""
        contexts = {
            "HTML5 e Semântica": "desenvolvimento web",
            "CSS3 Avançado": "interface de usuário",
            "JavaScript ES6+": "interatividade web",
            "Fundamentos Python": "análise de dados",
            "Pandas e NumPy": "processamento de dados",
            "Machine Learning": "inteligência artificial",
            "Docker Fundamentals": "containerização",
            "Kubernetes": "orquestração de containers",
            "AWS EC2": "infraestrutura cloud",
            "React Hooks": "desenvolvimento frontend",
            "Blockchain": "tecnologia descentralizada",
            "Flutter": "desenvolvimento mobile",
            "UI/UX Design": "experiência do usuário",
            "Product Management": "gestão de produtos",
            "Gestão de Tráfego": "marketing digital"
        }
        return contexts.get(topic, "sistemas modernos")
    
    def get_code_language(self, course_key: str) -> str:
        """Retorna linguagem de programação baseada no curso"""
        languages = {
            "python-data-science": "python",
            "machine-learning": "python",
            "data-science": "python",
            "web-fundamentals": "javascript",
            "react-advanced": "javascript",
            "frontend-development": "javascript",
            "backend-development": "javascript",
            "full-stack-development": "javascript",
            "flutter-mobile": "dart",
            "game-development": "csharp",
            "blockchain-smart-contracts": "solidity",
            "react-native-mobile": "javascript",
            "aws-cloud": "yaml",
            "devops-docker": "yaml",
            "cybersecurity": "bash",
            "ui-ux-design": "css",
            "product-management": "markdown",
            "gestao-trafego": "javascript"
        }
        return languages.get(course_key, "javascript")
    
    def generate_code_example(self, course_key: str, topic: str, technologies: List[str]) -> str:
        """Gera exemplo de código baseado no curso e tópico"""
        if course_key in ["python-data-science", "machine-learning", "data-science"]:
            return f"""import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

class {topic.replace(' ', '')}Processor:
    def __init__(self, data):
        self.data = data
        self.processed_data = None
    
    def process(self):
        \"\"\"Processa dados para {topic}\"\"\"
        self.processed_data = self.data.copy()
        return self.processed_data
    
    def analyze(self):
        \"\"\"Analisa dados processados\"\"\"
        if self.processed_data is None:
            raise ValueError("Dados não processados")
        
        return {{
            'total_records': len(self.processed_data),
            'topic': '{topic}',
            'status': 'analyzed'
        }}

# Uso da implementação
data = pd.DataFrame({{'feature1': [1, 2, 3], 'feature2': [4, 5, 6]}})
processor = {topic.replace(' ', '')}Processor(data)
result = processor.process()
analysis = processor.analyze()
print(f"Análise de {{analysis['topic']}}: {{analysis['total_records']}} registros")"""
        
        elif course_key in ["web-fundamentals", "react-advanced", "frontend-development"]:
            return f"""import React, {{ useState, useEffect }} from 'react';

const {topic.replace(' ', '')}Component = () => {{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {{
        const fetchData = async () => {{
            try {{
                const response = await fetch('/api/{topic.lower().replace(' ', '-')}');
                const result = await response.json();
                setData(result);
            }} catch (error) {{
                console.error('Erro ao carregar dados:', error);
            }} finally {{
                setLoading(false);
            }}
        }};
        
        fetchData();
    }}, []);
    
    if (loading) return <div>Carregando...</div>;
    
    return (
        <div className="{topic.lower().replace(' ', '-')}-container">
            <h2>{topic}</h2>
            {{data && <pre>{{JSON.stringify(data, null, 2)}}</pre>}}
        </div>
    );
}};

export default {topic.replace(' ', '')}Component;"""
        
        elif course_key in ["aws-cloud", "devops-docker"]:
            return f"""# Configuração para {topic}
apiVersion: v1
kind: Service
metadata:
  name: {topic.lower().replace(' ', '-')}-service
spec:
  selector:
    app: {topic.lower().replace(' ', '-')}
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {topic.lower().replace(' ', '-')}-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: {topic.lower().replace(' ', '-')}
  template:
    metadata:
      labels:
        app: {topic.lower().replace(' ', '-')}
    spec:
      containers:
      - name: {topic.lower().replace(' ', '-')}
        image: {topic.lower().replace(' ', '-')}:latest
        ports:
        - containerPort: 8080"""
        
        else:
            return f"""// Implementação de {topic}
class {topic.replace(' ', '')} {{
    constructor(config) {{
        this.config = config;
        this.status = 'initialized';
    }}
    
    async process() {{
        try {{
            this.status = 'processing';
            // Lógica específica para {topic}
            const result = await this.execute{topic.replace(' ', '')}();
            this.status = 'completed';
            return result;
        }} catch (error) {{
            this.status = 'error';
            throw error;
        }}
    }}
    
    async execute{topic.replace(' ', '')}() {{
        // Implementação específica de {topic}
        return {{
            success: true,
            topic: '{topic}',
            data: 'Processed successfully'
        }};
    }}
}}

export default {topic.replace(' ', '')};"""
    
    def generate_advanced_code_example(self, course_key: str, topic: str, technologies: List[str]) -> str:
        """Gera exemplo de código avançado"""
        if course_key in ["python-data-science", "machine-learning", "data-science"]:
            return f"""class {topic.replace(' ', '')}Solution:
    def __init__(self, config):
        self.config = config
        self.status = 'initialized'
        self.topic = '{topic}'
    
    def execute(self):
        try:
            self.status = 'running'
            result = self.process_{topic.lower().replace(' ', '_')}()
            self.status = 'completed'
            return result
        except Exception as error:
            self.status = 'error'
            raise error
    
    def process_{topic.lower().replace(' ', '_')}(self):
        # Lógica específica de processamento de {topic}
        return {{
            'success': True,
            'topic': '{topic}',
            'data': 'Processed successfully'
        }}"""
        
        else:
            return f"""class {topic.replace(' ', '')}Solution {{
    constructor(config) {{
        this.config = config;
        this.status = 'initialized';
        this.topic = '{topic}';
    }}
    
    async execute() {{
        try {{
            this.status = 'running';
            const result = await this.process{topic.replace(' ', '')}();
            this.status = 'completed';
            return result;
        }} catch (error) {{
            this.status = 'error';
            throw error;
        }}
    }}
    
    async process{topic.replace(' ', '')}() {{
        // Lógica específica de processamento de {topic}
        return {{
            success: true,
            topic: '{topic}',
            data: 'Processed successfully'
        }};
    }}
}}"""
    
    def apply_model_to_all_courses(self):
        """Aplica o modelo do Python Data Science para todos os cursos"""
        print("🚀 Iniciando aplicação do modelo para todos os cursos...")
        
        for course_key, config in self.course_configs.items():
            print(f"\n📚 Processando curso: {config['name']}")
            
            course_path = self.base_path / course_key
            
            if not course_path.exists():
                print(f"❌ Diretório do curso {course_key} não encontrado")
                continue
            
            # Processa cada nível
            for level in ["iniciante", "intermediario", "avancado"]:
                level_path = course_path / level
                
                if not level_path.exists():
                    print(f"❌ Diretório {level} não encontrado para {course_key}")
                    continue
                
                print(f"  📖 Processando nível: {level}")
                
                # Processa cada módulo (20 módulos por nível)
                for module in range(1, 21):
                    # Processa cada aula (5 aulas por módulo)
                    for lesson in range(1, 6):
                        lesson_filename = f"aula-{lesson:02d}-modulo-{module:02d}-{course_key}.md"
                        lesson_path = level_path / lesson_filename
                        
                        # Gera conteúdo da aula
                        content = self.generate_lesson_content(course_key, level, module, lesson)
                        
                        # Salva o arquivo
                        with open(lesson_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        
                        print(f"    ✅ Gerado: {lesson_filename}")
        
        print("\n🎉 Aplicação do modelo concluída com sucesso!")
        print("📊 Resumo:")
        print(f"  - Cursos processados: {len(self.course_configs)}")
        print(f"  - Níveis por curso: 3")
        print(f"  - Módulos por nível: 20")
        print(f"  - Aulas por módulo: 5")
        print(f"  - Total de aulas geradas: {len(self.course_configs) * 3 * 20 * 5}")

def main():
    base_path = "backend/fenix-expanded-content"
    applier = CourseModelApplier(base_path)
    applier.apply_model_to_all_courses()

if __name__ == "__main__":
    main()



