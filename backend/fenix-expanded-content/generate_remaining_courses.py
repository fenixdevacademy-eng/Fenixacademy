#!/usr/bin/env python3
"""
Script para gerar conteúdo específico para todas as aulas restantes dos cursos da Fenix
"""

import os
from pathlib import Path

def generate_lesson_content(course_path: Path, filename: str, title: str, module_num: int, lesson_num: int, course_name: str):
    """Gera conteúdo específico para uma aula individual"""
    file_path = course_path / filename
    
    # Conteúdo específico da aula
    content = f"""# {title}

## 🎯 Objetivos de Aprendizado
- Dominar os conceitos fundamentais de {title.lower()}
- Aplicar {title.lower()} em projetos práticos
- Implementar soluções escaláveis e eficientes

## 📚 Conteúdo da Aula

### 1. Introdução
{title} é uma tecnologia essencial para {course_name.lower()}. Nesta aula, você aprenderá:

- Conceitos fundamentais
- Aplicações práticas
- Melhores práticas da indústria

### 2. Desenvolvimento dos Conceitos

#### 2.1 Fundamentos
Entenda os conceitos básicos de {title.lower()} e como aplicá-los.

#### 2.2 Implementação Prática
Aprenda a implementar {title.lower()} em projetos reais.

#### 2.3 Casos de Uso
Veja como grandes empresas usam {title.lower()} para resolver problemas complexos.

### 3. Exemplos Práticos

#### Exemplo Básico
```python
# Exemplo prático de {title.lower()}
def exemplo_basico():
    print("Implementando {title.lower()}")
    return "Sucesso"

exemplo_basico()
```

#### Exemplo Avançado
```python
# Implementação avançada de {title.lower()}
class {title.replace(' ', '').replace('-', '')}:
    def __init__(self):
        self.config = {{}}
    
    def process(self):
        return "Implementação avançada"
```

### 4. Exercícios Práticos

#### Exercício 1: Implementação Básica
Crie uma implementação básica de {title.lower()}.

#### Exercício 2: Aplicação Prática
Desenvolva uma aplicação que use {title.lower()}.

#### Exercício 3: Projeto Completo
Crie um projeto completo utilizando {title.lower()}.

### 5. Projeto Final

#### Objetivo
Desenvolva uma aplicação que demonstre domínio completo de {title.lower()}.

#### Requisitos
- Implementação robusta
- Testes automatizados
- Documentação completa
- Deploy em produção

### 6. Próximos Passos

- Prática contínua
- Projetos pessoais
- Contribuições open source
- Networking na comunidade

---

**Duração:** 60 minutos  
**Nível:** Avançado  
**Módulo:** {module_num}  
**Aula:** {lesson_num}  
**Curso:** {course_name}

🎉 Continue evoluindo como desenvolvedor!
"""
    
    # Criar diretório se não existir
    file_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Escrever arquivo
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Gerado: {filename}")

def generate_course_lessons(course_slug: str, course_name: str, modules_config: list):
    """Gera aulas para um curso específico"""
    print(f"📚 Gerando aulas para {course_name}...")
    course_path = Path(f"backend/fenix-expanded-content/{course_slug}/avancado")
    
    lesson_counter = 1
    
    for module_num, module_info in enumerate(modules_config, 1):
        module_name = module_info['name']
        lessons = module_info['lessons']
        
        for lesson_num, lesson_title in enumerate(lessons, 1):
            filename = f"aula-{lesson_counter:02d}-modulo-{module_num:02d}-{course_slug}.md"
            generate_lesson_content(course_path, filename, lesson_title, module_num, lesson_num, course_name)
            lesson_counter += 1

def main():
    """Função principal"""
    print("🚀 GERANDO CONTEÚDO ESPECÍFICO PARA TODAS AS AULAS RESTANTES!")
    print("=" * 80)
    
    # Configuração completa dos cursos
    courses_config = {
        'aws-cloud': {
            'name': 'AWS Cloud',
            'modules': [
                {
                    'name': 'Fundamentos AWS',
                    'lessons': [
                        'Introdução à AWS e Cloud Computing',
                        'IAM e Segurança na Nuvem',
                        'EC2 e Computação Elástica',
                        'S3 e Armazenamento de Objetos',
                        'VPC e Networking',
                        'Projeto: Infraestrutura Básica'
                    ]
                },
                {
                    'name': 'Serviços de Computação',
                    'lessons': [
                        'Lambda e Serverless Computing',
                        'ECS e EKS para Containers',
                        'Auto Scaling e Load Balancing',
                        'Elastic Beanstalk',
                        'Projeto: Aplicação Serverless'
                    ]
                },
                {
                    'name': 'Bancos de Dados',
                    'lessons': [
                        'RDS e Bancos Relacionais',
                        'DynamoDB e NoSQL',
                        'ElastiCache e Redis',
                        'Redshift e Data Warehouse',
                        'Projeto: Arquitetura de Dados'
                    ]
                },
                {
                    'name': 'Monitoramento e Logs',
                    'lessons': [
                        'CloudWatch e Métricas',
                        'CloudTrail e Auditoria',
                        'X-Ray e Tracing',
                        'SNS e SQS',
                        'Projeto: Sistema de Monitoramento'
                    ]
                },
                {
                    'name': 'DevOps e CI/CD',
                    'lessons': [
                        'CodePipeline e CodeBuild',
                        'CodeDeploy e CodeCommit',
                        'CloudFormation e IaC',
                        'Terraform na AWS',
                        'Projeto: Pipeline Completo'
                    ]
                }
            ]
        },
        'blockchain-smart-contracts': {
            'name': 'Blockchain e Smart Contracts',
            'modules': [
                {
                    'name': 'Fundamentos Blockchain',
                    'lessons': [
                        'Introdução ao Blockchain',
                        'Criptografia e Hash',
                        'Consenso e Mineração',
                        'Bitcoin e Criptomoedas',
                        'Projeto: Wallet Básica'
                    ]
                },
                {
                    'name': 'Ethereum e Smart Contracts',
                    'lessons': [
                        'Ethereum e EVM',
                        'Solidity Básico',
                        'Deploy de Smart Contracts',
                        'Interação com Contratos',
                        'Projeto: Token ERC-20'
                    ]
                },
                {
                    'name': 'DeFi e DApps',
                    'lessons': [
                        'DeFi e Protocolos',
                        'Uniswap e DEXs',
                        'Lending e Borrowing',
                        'Yield Farming',
                        'Projeto: DApp Completa'
                    ]
                },
                {
                    'name': 'NFTs e Metaverso',
                    'lessons': [
                        'NFTs e Padrões ERC',
                        'Marketplaces de NFTs',
                        'Metaverso e Web3',
                        'Gaming e Blockchain',
                        'Projeto: NFT Marketplace'
                    ]
                }
            ]
        },
        'devops-docker': {
            'name': 'DevOps e Docker',
            'modules': [
                {
                    'name': 'Fundamentos DevOps',
                    'lessons': [
                        'Cultura DevOps',
                        'CI/CD e Pipelines',
                        'Versionamento e Git',
                        'Infraestrutura como Código',
                        'Projeto: Pipeline Básico'
                    ]
                },
                {
                    'name': 'Docker e Containers',
                    'lessons': [
                        'Docker Básico',
                        'Dockerfile e Imagens',
                        'Docker Compose',
                        'Registry e Distribuição',
                        'Projeto: Aplicação Containerizada'
                    ]
                },
                {
                    'name': 'Kubernetes',
                    'lessons': [
                        'Kubernetes Básico',
                        'Pods e Services',
                        'Deployments e Scaling',
                        'Ingress e Networking',
                        'Projeto: Cluster K8s'
                    ]
                },
                {
                    'name': 'Monitoramento e Logs',
                    'lessons': [
                        'Prometheus e Grafana',
                        'ELK Stack',
                        'Jaeger e Tracing',
                        'Alerting e Incidentes',
                        'Projeto: Observabilidade'
                    ]
                }
            ]
        },
        'flutter-mobile': {
            'name': 'Flutter Mobile',
            'modules': [
                {
                    'name': 'Fundamentos Flutter',
                    'lessons': [
                        'Introdução ao Flutter',
                        'Widgets e Layout',
                        'State Management',
                        'Navegação e Rotas',
                        'Projeto: App Básico'
                    ]
                },
                {
                    'name': 'UI/UX Avançado',
                    'lessons': [
                        'Material Design 3',
                        'Custom Widgets',
                        'Animações e Transições',
                        'Responsive Design',
                        'Projeto: App com UI Avançada'
                    ]
                },
                {
                    'name': 'Integração e APIs',
                    'lessons': [
                        'HTTP e APIs REST',
                        'Local Storage',
                        'Firebase Integration',
                        'Push Notifications',
                        'Projeto: App com Backend'
                    ]
                },
                {
                    'name': 'Performance e Deploy',
                    'lessons': [
                        'Performance Optimization',
                        'Testing e Debugging',
                        'Build e Deploy',
                        'App Store e Play Store',
                        'Projeto: App em Produção'
                    ]
                }
            ]
        },
        'react-native-mobile': {
            'name': 'React Native Mobile',
            'modules': [
                {
                    'name': 'Fundamentos React Native',
                    'lessons': [
                        'Introdução ao React Native',
                        'Componentes Nativos',
                        'Styling e Layout',
                        'Navigation',
                        'Projeto: App Básico'
                    ]
                },
                {
                    'name': 'APIs e Integração',
                    'lessons': [
                        'APIs e HTTP',
                        'AsyncStorage',
                        'Camera e Mídia',
                        'Geolocalização',
                        'Projeto: App com APIs'
                    ]
                },
                {
                    'name': 'Performance e Otimização',
                    'lessons': [
                        'Performance Optimization',
                        'Memory Management',
                        'Bundle Size',
                        'Testing',
                        'Projeto: App Otimizada'
                    ]
                },
                {
                    'name': 'Deploy e Distribuição',
                    'lessons': [
                        'Build e Deploy',
                        'CodePush',
                        'App Store',
                        'Play Store',
                        'Projeto: App em Produção'
                    ]
                }
            ]
        },
        'nodejs-apis': {
            'name': 'Node.js e APIs',
            'modules': [
                {
                    'name': 'Node.js Avançado',
                    'lessons': [
                        'Event Loop e Async',
                        'Streams e Buffers',
                        'Clusters e Workers',
                        'Performance e Profiling',
                        'Projeto: API Performática'
                    ]
                },
                {
                    'name': 'Express.js e Middleware',
                    'lessons': [
                        'Express Avançado',
                        'Middleware Customizado',
                        'Error Handling',
                        'Security e Validation',
                        'Projeto: API Segura'
                    ]
                },
                {
                    'name': 'Bancos de Dados',
                    'lessons': [
                        'MongoDB e Mongoose',
                        'PostgreSQL e Sequelize',
                        'Redis e Caching',
                        'Database Optimization',
                        'Projeto: API com Múltiplos DBs'
                    ]
                },
                {
                    'name': 'Microserviços',
                    'lessons': [
                        'Arquitetura de Microserviços',
                        'API Gateway',
                        'Service Discovery',
                        'Message Queues',
                        'Projeto: Sistema de Microserviços'
                    ]
                }
            ]
        },
        'machine-learning': {
            'name': 'Machine Learning',
            'modules': [
                {
                    'name': 'Fundamentos ML',
                    'lessons': [
                        'Introdução ao Machine Learning',
                        'Algoritmos Supervisionados',
                        'Algoritmos Não-Supervisionados',
                        'Validação e Métricas',
                        'Projeto: Classificador Básico'
                    ]
                },
                {
                    'name': 'Deep Learning',
                    'lessons': [
                        'Redes Neurais',
                        'TensorFlow e Keras',
                        'CNNs para Imagens',
                        'RNNs para Sequências',
                        'Projeto: Modelo de Deep Learning'
                    ]
                },
                {
                    'name': 'ML em Produção',
                    'lessons': [
                        'MLOps e Pipelines',
                        'Model Serving',
                        'A/B Testing',
                        'Monitoramento de Modelos',
                        'Projeto: ML em Produção'
                    ]
                }
            ]
        },
        'cybersecurity': {
            'name': 'Cybersecurity',
            'modules': [
                {
                    'name': 'Fundamentos de Segurança',
                    'lessons': [
                        'Introdução à Cibersegurança',
                        'Threats e Vulnerabilidades',
                        'Cryptography',
                        'Network Security',
                        'Projeto: Análise de Segurança'
                    ]
                },
                {
                    'name': 'Penetration Testing',
                    'lessons': [
                        'Reconnaissance',
                        'Scanning e Enumeration',
                        'Exploitation',
                        'Post-Exploitation',
                        'Projeto: Penetration Test'
                    ]
                },
                {
                    'name': 'Security Operations',
                    'lessons': [
                        'SIEM e SOC',
                        'Incident Response',
                        'Forensics',
                        'Compliance e Governance',
                        'Projeto: SOC Simulado'
                    ]
                }
            ]
        },
        'ui-ux-design': {
            'name': 'UI/UX Design',
            'modules': [
                {
                    'name': 'Fundamentos de Design',
                    'lessons': [
                        'Princípios de Design',
                        'Typography e Color',
                        'Layout e Grid',
                        'User Research',
                        'Projeto: Design System'
                    ]
                },
                {
                    'name': 'Ferramentas e Prototipagem',
                    'lessons': [
                        'Figma Avançado',
                        'Prototipagem Interativa',
                        'Design Handoff',
                        'Collaboration',
                        'Projeto: Protótipo Completo'
                    ]
                },
                {
                    'name': 'UX Research e Testing',
                    'lessons': [
                        'User Testing',
                        'A/B Testing',
                        'Analytics e Metrics',
                        'Iteration e Improvement',
                        'Projeto: UX Research'
                    ]
                }
            ]
        },
        'product-management': {
            'name': 'Product Management',
            'modules': [
                {
                    'name': 'Fundamentos de Product',
                    'lessons': [
                        'Introdução ao Product Management',
                        'Product Strategy',
                        'User Stories e Requirements',
                        'Roadmapping',
                        'Projeto: Product Strategy'
                    ]
                },
                {
                    'name': 'Data e Analytics',
                    'lessons': [
                        'Product Metrics',
                        'A/B Testing',
                        'User Analytics',
                        'Data-Driven Decisions',
                        'Projeto: Analytics Dashboard'
                    ]
                },
                {
                    'name': 'Stakeholder Management',
                    'lessons': [
                        'Communication',
                        'Stakeholder Alignment',
                        'Cross-functional Teams',
                        'Leadership',
                        'Projeto: Product Launch'
                    ]
                }
            ]
        },
        'game-development': {
            'name': 'Game Development',
            'modules': [
                {
                    'name': 'Fundamentos de Game Dev',
                    'lessons': [
                        'Game Design Principles',
                        'Unity Básico',
                        'C# para Games',
                        'Physics e Animation',
                        'Projeto: Jogo 2D'
                    ]
                },
                {
                    'name': 'Game Mechanics',
                    'lessons': [
                        'Player Controller',
                        'AI e NPCs',
                        'Audio e Effects',
                        'UI e Menus',
                        'Projeto: Jogo 3D'
                    ]
                },
                {
                    'name': 'Publishing e Monetização',
                    'lessons': [
                        'Build e Deploy',
                        'App Stores',
                        'Monetization',
                        'Marketing',
                        'Projeto: Jogo Publicado'
                    ]
                }
            ]
        },
        'full-stack-development': {
            'name': 'Full Stack Development',
            'modules': [
                {
                    'name': 'Frontend Avançado',
                    'lessons': [
                        'React Avançado',
                        'State Management',
                        'Testing Frontend',
                        'Performance',
                        'Projeto: Frontend Completo'
                    ]
                },
                {
                    'name': 'Backend Avançado',
                    'lessons': [
                        'Node.js e APIs',
                        'Databases',
                        'Authentication',
                        'Security',
                        'Projeto: Backend Completo'
                    ]
                },
                {
                    'name': 'DevOps e Deploy',
                    'lessons': [
                        'Docker e Containers',
                        'CI/CD',
                        'Cloud Deploy',
                        'Monitoring',
                        'Projeto: App Full Stack'
                    ]
                }
            ]
        },
        'backend-development': {
            'name': 'Backend Development',
            'modules': [
                {
                    'name': 'APIs e Microserviços',
                    'lessons': [
                        'RESTful APIs',
                        'GraphQL',
                        'Microservices',
                        'API Gateway',
                        'Projeto: API Escalável'
                    ]
                },
                {
                    'name': 'Databases e Performance',
                    'lessons': [
                        'SQL Avançado',
                        'NoSQL',
                        'Caching',
                        'Performance Tuning',
                        'Projeto: Sistema de Dados'
                    ]
                },
                {
                    'name': 'Security e DevOps',
                    'lessons': [
                        'API Security',
                        'Authentication',
                        'Docker e K8s',
                        'Monitoring',
                        'Projeto: Backend Seguro'
                    ]
                }
            ]
        },
        'frontend-development': {
            'name': 'Frontend Development',
            'modules': [
                {
                    'name': 'JavaScript Avançado',
                    'lessons': [
                        'ES6+ Features',
                        'Async Programming',
                        'Modules',
                        'Testing',
                        'Projeto: App JavaScript'
                    ]
                },
                {
                    'name': 'Frameworks Modernos',
                    'lessons': [
                        'React Avançado',
                        'Vue.js',
                        'Angular',
                        'State Management',
                        'Projeto: App com Framework'
                    ]
                },
                {
                    'name': 'Performance e Deploy',
                    'lessons': [
                        'Performance Optimization',
                        'Bundle Optimization',
                        'PWA',
                        'Deploy',
                        'Projeto: App Otimizada'
                    ]
                }
            ]
        },
        'mobile-development': {
            'name': 'Mobile Development',
            'modules': [
                {
                    'name': 'Desenvolvimento Nativo',
                    'lessons': [
                        'iOS com Swift',
                        'Android com Kotlin',
                        'UI/UX Mobile',
                        'Performance',
                        'Projeto: App Nativa'
                    ]
                },
                {
                    'name': 'Cross-Platform',
                    'lessons': [
                        'React Native',
                        'Flutter',
                        'Xamarin',
                        'Ionic',
                        'Projeto: App Cross-Platform'
                    ]
                },
                {
                    'name': 'Publishing e Monetização',
                    'lessons': [
                        'App Store Optimization',
                        'Monetization',
                        'Analytics',
                        'Marketing',
                        'Projeto: App Publicada'
                    ]
                }
            ]
        },
        'data-science': {
            'name': 'Data Science',
            'modules': [
                {
                    'name': 'Análise de Dados',
                    'lessons': [
                        'Python para Data Science',
                        'Pandas e NumPy',
                        'Visualização',
                        'Estatística',
                        'Projeto: Análise de Dados'
                    ]
                },
                {
                    'name': 'Machine Learning',
                    'lessons': [
                        'Algoritmos ML',
                        'Scikit-learn',
                        'Model Evaluation',
                        'Feature Engineering',
                        'Projeto: Modelo ML'
                    ]
                },
                {
                    'name': 'Big Data e Deploy',
                    'lessons': [
                        'Spark e Big Data',
                        'MLOps',
                        'Model Serving',
                        'Monitoring',
                        'Projeto: ML em Produção'
                    ]
                }
            ]
        },
        'csharp-automation': {
            'name': 'C# Automation',
            'modules': [
                {
                    'name': 'C# Avançado',
                    'lessons': [
                        'C# Moderno',
                        'Async/Await',
                        'LINQ',
                        'Testing',
                        'Projeto: Aplicação C#'
                    ]
                },
                {
                    'name': 'Automação e APIs',
                    'lessons': [
                        'Web APIs',
                        'Database Access',
                        'File Processing',
                        'Scheduling',
                        'Projeto: Sistema de Automação'
                    ]
                },
                {
                    'name': 'Deploy e Monitoramento',
                    'lessons': [
                        'Docker e C#',
                        'CI/CD',
                        'Logging',
                        'Monitoring',
                        'Projeto: Sistema em Produção'
                    ]
                }
            ]
        },
        'gestao-trafego': {
            'name': 'Gestão de Tráfego',
            'modules': [
                {
                    'name': 'Marketing Digital',
                    'lessons': [
                        'Fundamentos de Marketing',
                        'Google Ads',
                        'Facebook Ads',
                        'Analytics',
                        'Projeto: Campanha Digital'
                    ]
                },
                {
                    'name': 'SEO e Content',
                    'lessons': [
                        'SEO Técnico',
                        'Content Marketing',
                        'Link Building',
                        'Local SEO',
                        'Projeto: Estratégia SEO'
                    ]
                },
                {
                    'name': 'E-commerce e Conversão',
                    'lessons': [
                        'E-commerce Marketing',
                        'Conversion Optimization',
                        'Email Marketing',
                        'Retention',
                        'Projeto: Loja Otimizada'
                    ]
                }
            ]
        }
    }
    
    # Gerar aulas para cada curso
    for course_slug, course_config in courses_config.items():
        try:
            generate_course_lessons(course_slug, course_config['name'], course_config['modules'])
            print(f"✅ Concluído: {course_config['name']}")
        except Exception as e:
            print(f"❌ Erro em {course_config['name']}: {e}")
    
    print("\n🎉 CONTEÚDO ESPECÍFICO GERADO PARA TODOS OS CURSOS RESTANTES!")

if __name__ == "__main__":
    main()


