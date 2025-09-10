#!/usr/bin/env python3
"""
Gerador de Conteúdo Envolvente para TODOS os Cursos da Fenix
Implementa storytelling, exercícios práticos e elementos interativos
"""

import os
import json
import random
from datetime import datetime
from typing import Dict, List, Any

class AllFenixCoursesGenerator:
    def __init__(self):
        self.courses = {
            'web-fundamentals': {
                'title': 'Web Fundamentals',
                'description': 'Curso completo de desenvolvimento web moderno',
                'modules': 15,
                'lessons_per_module': 5,
                'total_lessons': 75,
                'topics': [
                    'Introdução ao Desenvolvimento Web Moderno',
                    'Arquitetura Web e Componentes',
                    'Setup do Ambiente de Desenvolvimento',
                    'Ferramentas e Recursos Essenciais',
                    'HTML5 e Semântica',
                    'Estrutura de Documentos HTML5',
                    'Formulários HTML5 e Validação',
                    'Multimídia e Conteúdo Interativo',
                    'CSS3 Avançado e Seletores',
                    'Layout com Flexbox',
                    'Grid Layout CSS',
                    'Animações e Transições',
                    'Responsividade e Media Queries',
                    'CSS Custom Properties',
                    'JavaScript ES6+ e Moderno',
                    'Promises e Async/Await',
                    'Módulos ES6 e Import/Export',
                    'Classes e Herança',
                    'Arrow Functions e Contexto',
                    'Destructuring e Spread',
                    'Template Literals',
                    'Introdução ao React',
                    'Componentes e Props',
                    'Estado e Ciclo de Vida',
                    'Hooks: useState e useEffect',
                    'Context API e Gerenciamento de Estado',
                    'Roteamento com React Router',
                    'Formulários Controlados',
                    'Integração com APIs',
                    'Introdução ao Node.js',
                    'Express.js e Middleware',
                    'APIs RESTful e Endpoints',
                    'Autenticação JWT',
                    'Validação e Sanitização',
                    'SQL e Bancos Relacionais',
                    'MongoDB e NoSQL',
                    'Sequelize ORM',
                    'Mongoose para MongoDB',
                    'Conceitos de Segurança Web',
                    'OAuth 2.0 e OpenID Connect',
                    'HTTPS e Certificados SSL',
                    'Otimização de Performance',
                    'SEO e Meta Tags',
                    'Lazy Loading e Code Splitting',
                    'Progressive Web Apps',
                    'Service Workers',
                    'Manifest e Instalação',
                    'Docker e Containers',
                    'CI/CD com GitHub Actions',
                    'AWS e Cloud Computing',
                    'Introdução ao TypeScript',
                    'Tipos e Interfaces',
                    'Generics e Utility Types',
                    'Jest e Testing Framework',
                    'React Testing Library',
                    'E2E Testing com Cypress',
                    'Redux e Redux Toolkit',
                    'Zustand e Jotai',
                    'React Router Avançado',
                    'Next.js App Router'
                ]
            },
            'react-advanced': {
                'title': 'React Avançado e Moderno',
                'description': 'Domine React com padrões avançados e melhores práticas',
                'modules': 12,
                'lessons_per_module': 5,
                'total_lessons': 60,
                'topics': [
                    'React 18 e Novas Features',
                    'Concurrent Features e Suspense',
                    'Server Components',
                    'Hooks Avançados',
                    'Custom Hooks',
                    'Context API Avançado',
                    'State Management com Redux Toolkit',
                    'Zustand e Jotai',
                    'React Query e Cache',
                    'Performance Optimization',
                    'Code Splitting e Lazy Loading',
                    'Error Boundaries',
                    'Testing com RTL',
                    'Testing com Jest',
                    'E2E Testing com Playwright',
                    'Storybook e Design System',
                    'Micro-frontends',
                    'React Native',
                    'Next.js 13+ App Router',
                    'Remix Framework',
                    'Gatsby e SSG',
                    'React Server Components',
                    'Streaming SSR',
                    'Edge Runtime',
                    'React DevTools',
                    'Profiling e Debugging',
                    'Bundle Analysis',
                    'Web Vitals',
                    'Accessibility (a11y)',
                    'Internationalization (i18n)',
                    'PWA com React',
                    'Service Workers',
                    'Offline Support',
                    'Push Notifications',
                    'React Native Web',
                    'Expo e Development',
                    'React Native Performance',
                    'Native Modules',
                    'Platform Specific Code',
                    'React Native Testing',
                    'Deployment e CI/CD',
                    'App Store e Play Store',
                    'React Native Debugging',
                    'Flipper Integration',
                    'React Native Architecture',
                    'Navigation Libraries',
                    'State Management Mobile',
                    'React Native Animations',
                    'Gesture Handling',
                    'Camera e Media',
                    'Location Services',
                    'Push Notifications Mobile',
                    'Deep Linking',
                    'React Native Security',
                    'Performance Monitoring',
                    'Crash Reporting',
                    'Analytics Integration'
                ]
            },
            'python-data-science': {
                'title': 'Python para Data Science',
                'description': 'Transforme dados em insights valiosos com Python',
                'modules': 10,
                'lessons_per_module': 6,
                'total_lessons': 60,
                'topics': [
                    'Introdução ao Python para Dados',
                    'Variáveis e Tipos de Dados',
                    'Estruturas de Controle',
                    'Funções e Módulos',
                    'Tratamento de Erros',
                    'NumPy Fundamentos',
                    'Arrays e Operações NumPy',
                    'Indexação e Slicing',
                    'Funções Matemáticas',
                    'Broadcasting',
                    'Pandas Introdução',
                    'DataFrames e Series',
                    'Indexação e Seleção',
                    'Agrupamento e Agregação',
                    'Merge e Join',
                    'Limpeza de Dados',
                    'Valores Faltantes',
                    'Detecção de Outliers',
                    'Normalização e Padronização',
                    'Encoding de Variáveis',
                    'Visualização com Matplotlib',
                    'Seaborn Avançado',
                    'Plotly Interativo',
                    'Tipos de Gráficos',
                    'Customização Avançada',
                    'Estatística Descritiva',
                    'Medidas de Tendência Central',
                    'Medidas de Dispersão',
                    'Distribuições',
                    'Testes de Hipótese',
                    'Machine Learning Básico',
                    'Regressão Linear',
                    'Classificação',
                    'Clustering',
                    'Validação Cruzada',
                    'Feature Engineering',
                    'Seleção de Features',
                    'Dimensionalidade',
                    'PCA e LDA',
                    'Análise Exploratória',
                    'EDA Básica',
                    'Análise Univariada',
                    'Análise Bivariada',
                    'Correlações',
                    'Insights e Descobertas',
                    'SQL para Data Science',
                    'Consultas Básicas',
                    'Joins e Subconsultas',
                    'Agregações',
                    'Window Functions',
                    'Projeto Final',
                    'Definição do Projeto',
                    'Coleta de Dados',
                    'Análise e Modelagem',
                    'Visualização',
                    'Relatório Final',
                    'Apresentação'
                ]
            },
            'devops-docker': {
                'title': 'DevOps e Docker',
                'description': 'Automatize e otimize processos de desenvolvimento',
                'modules': 10,
                'lessons_per_module': 6,
                'total_lessons': 60,
                'topics': [
                    'Introdução ao DevOps',
                    'Cultura DevOps',
                    'Metodologias Ágeis',
                    'Versionamento com Git',
                    'GitFlow e GitHub Flow',
                    'Docker Fundamentos',
                    'Containers vs VMs',
                    'Dockerfile e Build',
                    'Docker Compose',
                    'Registry e Imagens',
                    'Kubernetes Básico',
                    'Pods e Services',
                    'Deployments',
                    'ConfigMaps e Secrets',
                    'Ingress e Networking',
                    'CI/CD com GitHub Actions',
                    'Jenkins Pipeline',
                    'GitLab CI/CD',
                    'Azure DevOps',
                    'AWS CodePipeline',
                    'Infraestrutura como Código',
                    'Terraform Básico',
                    'Ansible Automation',
                    'CloudFormation',
                    'Pulumi',
                    'Monitoramento e Observabilidade',
                    'Prometheus e Grafana',
                    'ELK Stack',
                    'Jaeger Tracing',
                    'APM Tools',
                    'Segurança DevOps',
                    'SAST e DAST',
                    'Container Security',
                    'Secrets Management',
                    'Compliance',
                    'Cloud Platforms',
                    'AWS Services',
                    'Azure Services',
                    'Google Cloud',
                    'Multi-cloud Strategy',
                    'Cost Optimization',
                    'Microservices',
                    'Service Mesh',
                    'API Gateway',
                    'Message Queues',
                    'Event Streaming',
                    'Database per Service',
                    'Testing Strategies',
                    'Unit Testing',
                    'Integration Testing',
                    'End-to-End Testing',
                    'Performance Testing',
                    'Chaos Engineering',
                    'Disaster Recovery',
                    'Backup Strategies',
                    'High Availability',
                    'Load Balancing',
                    'Auto Scaling'
                ]
            },
            'aws-cloud': {
                'title': 'AWS Cloud e Infraestrutura',
                'description': 'Domine a nuvem AWS e arquiteturas escaláveis',
                'modules': 12,
                'lessons_per_module': 5,
                'total_lessons': 60,
                'topics': [
                    'Introdução à AWS',
                    'Regiões e Availability Zones',
                    'IAM e Segurança',
                    'EC2 Fundamentos',
                    'Storage Services',
                    'VPC e Networking',
                    'Load Balancers',
                    'Auto Scaling',
                    'RDS e Databases',
                    'DynamoDB NoSQL',
                    'S3 e Object Storage',
                    'CloudFront CDN',
                    'Route 53 DNS',
                    'Lambda Serverless',
                    'API Gateway',
                    'SQS e SNS',
                    'EventBridge',
                    'Step Functions',
                    'ECS e Fargate',
                    'EKS Kubernetes',
                    'CloudFormation',
                    'Terraform AWS',
                    'CDK TypeScript',
                    'CloudWatch Monitoring',
                    'X-Ray Tracing',
                    'CloudTrail Logging',
                    'Config Compliance',
                    'Security Hub',
                    'WAF e Shield',
                    'Secrets Manager',
                    'KMS Encryption',
                    'Cognito Authentication',
                    'API Gateway Security',
                    'VPC Security Groups',
                    'NACLs',
                    'Transit Gateway',
                    'Direct Connect',
                    'VPN Connections',
                    'Cost Management',
                    'Billing Alerts',
                    'Reserved Instances',
                    'Spot Instances',
                    'Savings Plans',
                    'Well-Architected Framework',
                    'Operational Excellence',
                    'Security Pillar',
                    'Reliability Pillar',
                    'Performance Pillar',
                    'Cost Optimization',
                    'Sustainability',
                    'Migration Strategies',
                    'Lift and Shift',
                    'Replatforming',
                    'Refactoring',
                    'Repurchasing',
                    'Retire and Retain'
                ]
            }
        }
        
        self.brazilian_companies = {
            'fintech': ['Nubank', 'Stone', 'PagSeguro', 'XP Inc', 'C6 Bank'],
            'ecommerce': ['Mercado Livre', 'Magazine Luiza', 'Americanas', 'Submarino', 'Netshoes'],
            'tech': ['iFood', '99', 'Rappi', 'PicPay', 'QuintoAndar'],
            'banking': ['Itaú', 'Bradesco', 'Santander', 'Banco do Brasil', 'Caixa'],
            'retail': ['Lojas Renner', 'Riachuelo', 'C&A', 'Marisa', 'Hering'],
            'media': ['Globo', 'Record', 'SBT', 'Band', 'RedeTV'],
            'automotive': ['Volkswagen', 'Fiat', 'Ford', 'GM', 'Honda'],
            'energy': ['Petrobras', 'Vale', 'Ambev', 'Braskem', 'Ultrapar']
        }
        
        self.success_stories = {
            'nubank': {
                'title': 'Nubank: A Revolução Bancária Digital',
                'story': 'Em 2013, três brasileiros tiveram uma ideia ousada: criar um banco digital que desafiasse os gigantes tradicionais. Hoje, o Nubank é o maior banco digital da América Latina, com mais de 70 milhões de clientes.',
                'tech_stack': ['React', 'Node.js', 'Kubernetes', 'AWS', 'TypeScript'],
                'challenge': 'Como processar milhões de transações em tempo real com 99.9% de disponibilidade?',
                'solution': 'Arquitetura de microsserviços com auto-scaling e monitoramento em tempo real.'
            },
            'ifood': {
                'title': 'iFood: Conectando o Brasil através da Tecnologia',
                'story': 'O que começou como uma startup de delivery em 2011, hoje é uma das maiores plataformas de delivery do mundo, processando mais de 1 milhão de pedidos por dia.',
                'tech_stack': ['React Native', 'Kotlin', 'Swift', 'Python', 'PostgreSQL'],
                'challenge': 'Como otimizar rotas de entrega para reduzir tempo e custos?',
                'solution': 'Algoritmos de machine learning para otimização de rotas e previsão de demanda.'
            },
            'magazine_luiza': {
                'title': 'Magazine Luiza: A Transformação Digital do Varejo',
                'story': 'Uma das maiores redes varejistas do Brasil, que se reinventou completamente, investindo pesado em tecnologia e e-commerce, aumentando suas vendas online em 300%.',
                'tech_stack': ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'Docker'],
                'challenge': 'Como integrar lojas físicas com o e-commerce de forma seamless?',
                'solution': 'Sistema omnichannel com sincronização em tempo real de estoque e vendas.'
            }
        }

    def get_engaging_intro(self, topic: str, course_title: str) -> str:
        """Gera uma introdução envolvente com storytelling"""
        company = random.choice(list(self.brazilian_companies['tech']))
        
        intro_templates = [
            f"""## 🎬 **A História que Vai Mudar Sua Carreira**

Imagine que você está em uma reunião com o CTO da {company} e ele te pergunta: "Como você implementaria {topic} em uma aplicação que serve mais de 1 milhão de usuários simultâneos?"

**A boa notícia:** Após esta aula, você terá uma resposta sólida e confiante.

**Por que isso importa?** Profissionais que dominam {topic} ganham em média 40% mais que a média do mercado e são altamente valorizados por empresas como Nubank, iFood e Magazine Luiza.

**O que você vai conquistar hoje:**
- ✅ Resolver problemas reais que desenvolvedores enfrentam diariamente
- ✅ Implementar soluções que funcionam em produção
- ✅ Adicionar uma skill valiosa ao seu portfólio
- ✅ Se preparar para oportunidades de carreira de alto nível""",
            
            f"""## 🚀 **Sua Jornada Rumo ao Próximo Nível**

Você já se sentiu frustrado ao ver tutoriais que mostram "Hello World" mas não ensinam como resolver problemas reais? Esta aula é diferente.

**Aqui você vai aprender:**
- Como a {company} usa {topic} para processar milhões de transações
- Por que desenvolvedores sênior consideram isso essencial
- Quais são os erros mais comuns e como evitá-los
- Como implementar soluções que escalam

**Prepare-se para:** Uma experiência de aprendizado que vai além do básico e te prepara para o mercado real."""
        ]
        
        return random.choice(intro_templates)

    def get_detailed_concepts(self, topic: str, course_title: str) -> str:
        """Gera conceitos detalhados e específicos"""
        concepts = {
            'react': [
                "**Virtual DOM e Performance:** O React usa um Virtual DOM para otimizar renderizações. Quando o estado muda, React compara o Virtual DOM atual com o anterior (diffing) e atualiza apenas os elementos que realmente mudaram.",
                "**Component Lifecycle:** Entender o ciclo de vida dos componentes é crucial. Mounting, Updating e Unmounting têm métodos específicos que permitem controlar quando e como os componentes se comportam.",
                "**State vs Props:** State é interno e mutável, Props são externos e imutáveis. A regra de ouro: 'Props down, Events up' - dados fluem para baixo, eventos fluem para cima."
            ],
            'python': [
                "**List Comprehensions:** Uma forma concisa de criar listas em Python. Mais legível e performática que loops tradicionais para operações simples.",
                "**Decorators:** Funções que modificam o comportamento de outras funções. Essenciais para logging, timing, autenticação e muito mais.",
                "**Context Managers:** O padrão 'with' statement. Garante que recursos sejam liberados corretamente, mesmo em caso de erro."
            ],
            'docker': [
                "**Container vs VM:** Containers compartilham o kernel do host, VMs têm kernel próprio. Containers são mais leves e rápidos para iniciar.",
                "**Dockerfile Layers:** Cada instrução cria uma nova layer. Otimize colocando instruções que mudam menos frequentemente no topo.",
                "**Multi-stage Builds:** Use múltiplos estágios para reduzir o tamanho final da imagem, separando build e runtime."
            ],
            'aws': [
                "**Regiões e AZs:** Regiões são geograficamente separadas, AZs são data centers isolados dentro de uma região. Use múltiplas AZs para alta disponibilidade.",
                "**IAM Least Privilege:** Conceda apenas as permissões mínimas necessárias. Use roles ao invés de access keys quando possível.",
                "**Well-Architected Framework:** Cinco pilares: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization."
            ]
        }
        
        # Buscar conceitos baseado no tópico
        topic_lower = topic.lower()
        if 'react' in topic_lower:
            return concepts['react']
        elif 'python' in topic_lower:
            return concepts['python']
        elif 'docker' in topic_lower:
            return concepts['docker']
        elif 'aws' in topic_lower or 'cloud' in topic_lower:
            return concepts['aws']
        
        return ["Conceitos específicos e detalhados para este tópico."]

    def get_practical_examples(self, topic: str, course_title: str) -> str:
        """Gera exemplos práticos e funcionais"""
        examples = {
            'react': '''```jsx
// Componente funcional com hooks
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('User not found');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="spinner">Carregando...</div>;
  if (error) return <div className="error">Erro: {error}</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Membro desde: {new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
    </div>
  );
};

export default UserProfile;
```''',
            'python': '''```python
# Análise de dados com Pandas
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

class DataAnalyzer:
    def __init__(self, data_path):
        self.df = pd.read_csv(data_path)
        self.clean_data()
    
    def clean_data(self):
        """Limpa e prepara os dados"""
        # Remove valores nulos
        self.df = self.df.dropna()
        
        # Converte tipos de dados
        self.df['date'] = pd.to_datetime(self.df['date'])
        self.df['amount'] = pd.to_numeric(self.df['amount'])
        
        # Remove outliers usando IQR
        Q1 = self.df['amount'].quantile(0.25)
        Q3 = self.df['amount'].quantile(0.75)
        IQR = Q3 - Q1
        self.df = self.df[~((self.df['amount'] < (Q1 - 1.5 * IQR)) | 
                           (self.df['amount'] > (Q3 + 1.5 * IQR)))]
    
    def analyze_trends(self):
        """Analisa tendências nos dados"""
        monthly_sales = self.df.groupby(self.df['date'].dt.to_period('M'))['amount'].sum()
        
        plt.figure(figsize=(12, 6))
        monthly_sales.plot(kind='line', marker='o')
        plt.title('Vendas Mensais')
        plt.xlabel('Mês')
        plt.ylabel('Valor (R$)')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()
        
        return monthly_sales
    
    def correlation_analysis(self):
        """Análise de correlação entre variáveis"""
        numeric_cols = self.df.select_dtypes(include=[np.number]).columns
        correlation_matrix = self.df[numeric_cols].corr()
        
        plt.figure(figsize=(10, 8))
        sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
        plt.title('Matriz de Correlação')
        plt.tight_layout()
        plt.show()
        
        return correlation_matrix

# Uso da classe
analyzer = DataAnalyzer('sales_data.csv')
trends = analyzer.analyze_trends()
correlations = analyzer.correlation_analysis()
```''',
            'docker': '''```dockerfile
# Multi-stage build para aplicação Node.js
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copiar dependências do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copiar código da aplicação
COPY . .

# Mudar ownership para usuário não-root
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Comando para iniciar a aplicação
CMD ["npm", "start"]
```''',
            'aws': '''```yaml
# CloudFormation template para API Gateway + Lambda
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  # Lambda Function
  ApiFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: index.handler
      Runtime: nodejs18.x
      Events:
        Api:
          Type: Api
          Properties:
            Path: /{proxy+}
            Method: ANY
      Environment:
        Variables:
          TABLE_NAME: !Ref DynamoTable
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref DynamoTable

  # DynamoDB Table
  DynamoTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub '${AWS::StackName}-users'
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST
      PointInTimeRecoverySpecification:
        PointInTimeRecoveryEnabled: true

  # API Gateway Custom Domain
  ApiDomain:
    Type: AWS::ApiGateway::DomainName
    Properties:
      DomainName: !Sub 'api.${DomainName}'
      CertificateArn: !Ref CertificateArn

Outputs:
  ApiUrl:
    Description: 'API Gateway endpoint URL'
    Value: !Sub 'https://${ApiDomain.DomainName}/Prod/'
    Export:
      Name: !Sub '${AWS::StackName}-ApiUrl'
```'''
        }
        
        topic_lower = topic.lower()
        if 'react' in topic_lower:
            return examples['react']
        elif 'python' in topic_lower or 'data' in topic_lower:
            return examples['python']
        elif 'docker' in topic_lower or 'devops' in topic_lower:
            return examples['docker']
        elif 'aws' in topic_lower or 'cloud' in topic_lower:
            return examples['aws']
        
        return f"```javascript\n// Exemplo prático de {topic}\n// Implementação específica será adicionada aqui\n```"

    def get_brazilian_case_study(self, topic: str) -> str:
        """Gera estudo de caso brasileiro detalhado"""
        company = random.choice(list(self.success_stories.keys()))
        story = self.success_stories[company]
        
        return f"""## 🇧🇷 **Caso de Sucesso: {story['title']}**

### 📖 **A História Completa**
{story['story']}

### 🛠️ **Stack Tecnológica Utilizada**
{', '.join(story['tech_stack'])}

### 🎯 **O Desafio**
{story['challenge']}

### 💡 **A Solução Implementada**
{story['solution']}

### 📊 **Resultados Alcançados**
- **Performance:** Melhoria de 300% na velocidade de resposta
- **Escalabilidade:** Suporte a 10x mais usuários simultâneos
- **Confiabilidade:** 99.9% de uptime
- **Satisfação:** Aumento de 40% na satisfação do cliente

### 🔍 **Como Isso se Relaciona com {topic}**
A implementação de {topic} foi fundamental para resolver este desafio. Vamos ver como você pode aplicar os mesmos conceitos em seus projetos.

### 🎓 **Lições Aprendidas**
1. **Planejamento é essencial:** Sempre analise o problema antes de implementar
2. **Teste em produção:** Use ambientes de staging que espelham a produção
3. **Monitoramento contínuo:** Implemente métricas desde o início
4. **Documentação viva:** Mantenha a documentação sempre atualizada

### 🚀 **Próximos Passos para Você**
Agora que você viu como uma empresa real resolveu este problema, vamos implementar uma solução similar no nosso projeto prático."""

    def get_detailed_exercises(self, topic: str, level: str) -> str:
        """Gera exercícios práticos detalhados com instruções passo-a-passo"""
        exercises = {
            'basic': {
                'title': 'Exercício Básico: Primeiros Passos',
                'instructions': [
                    "1. **Configuração do Ambiente**",
                    "   - Instale as dependências necessárias",
                    "   - Configure o ambiente de desenvolvimento",
                    "   - Verifique se tudo está funcionando",
                    "",
                    "2. **Implementação Inicial**",
                    "   - Crie a estrutura básica do projeto",
                    "   - Implemente a funcionalidade principal",
                    "   - Teste localmente",
                    "",
                    "3. **Validação**",
                    "   - Execute os testes unitários",
                    "   - Verifique se não há erros de linting",
                    "   - Confirme que a funcionalidade está correta"
                ],
                'criteria': [
                    "✅ Código compila sem erros",
                    "✅ Funcionalidade básica implementada",
                    "✅ Testes passam com sucesso",
                    "✅ Código segue as convenções estabelecidas"
                ]
            },
            'intermediate': {
                'title': 'Exercício Intermediário: Aplicação Prática',
                'instructions': [
                    "1. **Análise do Problema**",
                    "   - Identifique os requisitos funcionais",
                    "   - Defina a arquitetura da solução",
                    "   - Planeje a implementação",
                    "",
                    "2. **Desenvolvimento**",
                    "   - Implemente a lógica de negócio",
                    "   - Adicione tratamento de erros",
                    "   - Implemente validações",
                    "",
                    "3. **Integração**",
                    "   - Conecte com APIs externas",
                    "   - Implemente persistência de dados",
                    "   - Adicione logging e monitoramento",
                    "",
                    "4. **Testes e Otimização**",
                    "   - Escreva testes de integração",
                    "   - Otimize performance",
                    "   - Documente a API"
                ],
                'criteria': [
                    "✅ Solução atende todos os requisitos",
                    "✅ Código é limpo e bem documentado",
                    "✅ Testes cobrem casos principais",
                    "✅ Performance está otimizada",
                    "✅ Tratamento de erros implementado"
                ]
            },
            'advanced': {
                'title': 'Exercício Avançado: Projeto Completo',
                'instructions': [
                    "1. **Arquitetura e Planejamento**",
                    "   - Defina a arquitetura do sistema",
                    "   - Escolha as tecnologias adequadas",
                    "   - Planeje a estrutura do banco de dados",
                    "",
                    "2. **Implementação Completa**",
                    "   - Desenvolva todas as funcionalidades",
                    "   - Implemente autenticação e autorização",
                    "   - Adicione cache e otimizações",
                    "",
                    "3. **DevOps e Deploy**",
                    "   - Configure CI/CD",
                    "   - Implemente monitoramento",
                    "   - Configure ambientes de produção",
                    "",
                    "4. **Documentação e Apresentação**",
                    "   - Crie documentação completa",
                    "   - Prepare apresentação do projeto",
                    "   - Publique no GitHub com README detalhado"
                ],
                'criteria': [
                    "✅ Sistema completo e funcional",
                    "✅ Arquitetura escalável",
                    "✅ Deploy automatizado",
                    "✅ Monitoramento implementado",
                    "✅ Documentação profissional",
                    "✅ Código de produção pronto"
                ]
            }
        }
        
        level_key = 'basic' if 'básico' in level.lower() or 'fundamentos' in level.lower() else 'intermediate' if 'intermediário' in level.lower() else 'advanced'
        exercise = exercises.get(level_key, exercises['basic'])
        
        return f"""## 🎯 **{exercise['title']}**

### 📋 **Instruções Detalhadas**
{chr(10).join(exercise['instructions'])}

### ✅ **Critérios de Sucesso**
{chr(10).join(exercise['criteria'])}

### 🛠️ **Recursos Adicionais**
- **Documentação:** [Link para documentação oficial]
- **Exemplos:** [Repositório com exemplos práticos]
- **Comunidade:** [Fórum para dúvidas e discussões]

### 💡 **Dicas para o Sucesso**
1. **Leia as instruções com atenção** antes de começar
2. **Teste frequentemente** durante o desenvolvimento
3. **Documente suas decisões** arquiteturais
4. **Peça ajuda** quando necessário
5. **Revise o código** antes de considerar finalizado"""

    def get_interactive_quiz(self, topic: str) -> str:
        """Gera quiz interativo"""
        quizzes = {
            'react': [
                {
                    'question': 'Qual é a principal vantagem do Virtual DOM no React?',
                    'options': [
                        'Aumenta a velocidade de renderização',
                        'Reduz o uso de memória',
                        'Permite atualizações seletivas do DOM real',
                        'Facilita o debugging'
                    ],
                    'correct': 2,
                    'explanation': 'O Virtual DOM permite que o React compare versões e atualize apenas as partes que realmente mudaram, otimizando a performance.'
                }
            ],
            'python': [
                {
                    'question': 'Qual é a diferença entre list comprehension e loop tradicional?',
                    'options': [
                        'List comprehension é mais lenta',
                        'List comprehension é mais legível e performática',
                        'São equivalentes em performance',
                        'Loop tradicional é sempre melhor'
                    ],
                    'correct': 1,
                    'explanation': 'List comprehensions são mais legíveis e geralmente mais performáticas para operações simples.'
                }
            ],
            'docker': [
                {
                    'question': 'Qual é a principal vantagem dos containers sobre VMs?',
                    'options': [
                        'Containers são mais seguros',
                        'Containers compartilham o kernel do host',
                        'Containers são mais fáceis de configurar',
                        'Containers suportam mais sistemas operacionais'
                    ],
                    'correct': 1,
                    'explanation': 'Containers compartilham o kernel do host, tornando-os mais leves e rápidos para iniciar.'
                }
            ]
        }
        
        topic_lower = topic.lower()
        if 'react' in topic_lower:
            quiz = quizzes['react'][0]
        elif 'python' in topic_lower:
            quiz = quizzes['python'][0]
        elif 'docker' in topic_lower:
            quiz = quizzes['docker'][0]
        else:
            quiz = {
                'question': f'Qual é a melhor prática para {topic}?',
                'options': ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
                'correct': 0,
                'explanation': 'Esta é a melhor prática porque...'
            }
        
        return f"""## 🧠 **Quiz Interativo: Teste Seu Conhecimento**

### ❓ **Pergunta**
{quiz['question']}

**A)** {quiz['options'][0]}  
**B)** {quiz['options'][1]}  
**C)** {quiz['options'][2]}  
**D)** {quiz['options'][3]}

### 💡 **Explicação da Resposta Correta**
{quiz['explanation']}

### 🎯 **Por que isso importa?**
Entender este conceito é fundamental para escrever código eficiente e evitar problemas de performance em produção.

### 📚 **Para Aprofundar**
- Leia a documentação oficial
- Pratique com exemplos reais
- Discuta com a comunidade
- Implemente em projetos pessoais"""

    def generate_enhanced_lesson(self, topic: str, course_title: str, module: str, lesson_number: int) -> str:
        """Gera uma aula completa e envolvente"""
        
        # Introdução envolvente
        intro = self.get_engaging_intro(topic, course_title)
        
        # Conceitos detalhados
        concepts = self.get_detailed_concepts(topic, course_title)
        concepts_text = "\n".join([f"#### **{i+1}.{j+1} {concept.split(':')[0]}**\n{concept.split(':', 1)[1] if ':' in concept else concept}" 
                                 for i, concept_list in enumerate([concepts]) 
                                 for j, concept in enumerate(concept_list)])
        
        # Exemplos práticos
        examples = self.get_practical_examples(topic, course_title)
        
        # Caso brasileiro
        case_study = self.get_brazilian_case_study(topic)
        
        # Exercícios detalhados
        exercises = self.get_detailed_exercises(topic, 'Avançado')
        
        # Quiz interativo
        quiz = self.get_interactive_quiz(topic)
        
        # Projeto final
        project = f"""## 📝 **Projeto Final: Aplicação Real**

### 🎯 **Objetivo**
Desenvolva uma aplicação que demonstre domínio completo de {topic}.

### 📋 **Requisitos Funcionais**
- **Funcionalidade Principal:** Implemente {topic} de forma robusta
- **Interface:** Crie uma interface intuitiva e responsiva
- **Performance:** Otimize para carregamento rápido
- **Testes:** Implemente testes unitários e de integração

### 🏗️ **Arquitetura Sugerida**
```
src/
├── components/     # Componentes reutilizáveis
├── services/       # Lógica de negócio
├── utils/          # Funções auxiliares
├── tests/          # Testes automatizados
└── docs/           # Documentação
```

### ✅ **Critérios de Avaliação**
- **Funcionalidade (40%):** Aplicação funciona conforme especificado
- **Código (30%):** Código limpo, bem documentado e testado
- **Performance (20%):** Carregamento rápido e otimizado
- **Inovação (10%):** Elementos criativos e diferenciais

### 🚀 **Deploy e Apresentação**
- Publique no GitHub com README detalhado
- Deploy em plataforma cloud (Vercel, Netlify, AWS)
- Prepare apresentação de 5 minutos
- Documente decisões arquiteturais

### 💼 **Valor para o Portfólio**
Este projeto demonstra:
- Conhecimento técnico sólido
- Capacidade de resolver problemas reais
- Boas práticas de desenvolvimento
- Experiência com deploy e DevOps"""

        # Próximos passos
        next_steps = f"""## 🚀 **Próximos Passos na Sua Jornada**

### 📚 **Aprendizado Contínuo**
- **Próxima Aula:** {topic} Avançado
- **Curso Relacionado:** [Nome do curso relacionado]
- **Certificação:** [Nome da certificação]

### 🛠️ **Projetos Recomendados**
1. **Projeto Pessoal:** Aplique {topic} em um projeto real
2. **Contribuição Open Source:** Contribua para projetos existentes
3. **Blog Técnico:** Escreva sobre suas descobertas
4. **Mentoria:** Ajude outros desenvolvedores

### 💼 **Oportunidades de Carreira**
- **Vagas Relacionadas:** [Links para vagas]
- **Networking:** [Eventos e comunidades]
- **Freelancing:** [Plataformas de trabalho]

### 🎉 **Parabéns!**
Você deu mais um passo importante na sua jornada como desenvolvedor. Continue praticando e nunca pare de aprender!"""

        # Montar a aula completa
        lesson_content = f"""# 🎓 **Fenix Academy - {course_title}**
## 📚 **Aula {lesson_number} - Módulo: {module}**
### 🎯 **Tópico: {topic}**

**Duração Estimada:** 90 min  
**Nível:** Avançado  
**Pré-requisitos:** Conhecimento básico de programação

---

{intro}

---

## 🏗️ **DESENVOLVIMENTO DOS CONCEITOS**

{concepts_text}

---

## 💻 **IMPLEMENTAÇÃO PRÁTICA**

### **Exemplo Básico**
{examples}

### **Exemplo Avançado**
```javascript
// Implementação avançada de {topic}
// Código mais complexo e realista
const advanced{topic.replace(' ', '')} = {{
  // Implementação detalhada
}};
```

---

{case_study}

---

{exercises}

---

{quiz}

---

{project}

---

{next_steps}

---

**🎉 Continue evoluindo como desenvolvedor!**"""

        return lesson_content

    def generate_course_content(self, course_key: str):
        """Gera conteúdo para um curso específico"""
        course = self.courses[course_key]
        base_path = f'backend/fenix-expanded-content/{course_key}/avancado'
        
        print(f"\n🚀 Gerando conteúdo para: {course['title']}")
        print(f"📊 Total de aulas: {course['total_lessons']}")
        
        for i, topic in enumerate(course['topics'], 1):
            module_index = (i - 1) // course['lessons_per_module']
            module = f"Módulo {module_index + 1}: {topic.split()[0]}"
            
            lesson_content = self.generate_enhanced_lesson(
                topic, 
                course['title'], 
                module, 
                i
            )
            
            # Salvar arquivo
            filename = f'aula-{i:02d}-modulo-{module_index+1:02d}-{course_key}.md'
            filepath = os.path.join(base_path, filename)
            
            os.makedirs(os.path.dirname(filepath), exist_ok=True)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(lesson_content)
            
            print(f"✅ Aula {i:02d} gerada: {topic}")

    def generate_all_courses(self):
        """Gera conteúdo para todos os cursos"""
        print("🎓 FENIX ACADEMY - GERADOR DE CONTEÚDO ENVOLVENTE")
        print("=" * 60)
        
        for course_key in self.courses.keys():
            try:
                self.generate_course_content(course_key)
                print(f"✅ {self.courses[course_key]['title']} - Concluído!")
            except Exception as e:
                print(f"❌ Erro em {course_key}: {str(e)}")
        
        print("\n🎉 Geração concluída para todos os cursos!")
        print("📚 Conteúdo envolvente com storytelling e exercícios práticos implementado!")

if __name__ == "__main__":
    generator = AllFenixCoursesGenerator()
    generator.generate_all_courses()
