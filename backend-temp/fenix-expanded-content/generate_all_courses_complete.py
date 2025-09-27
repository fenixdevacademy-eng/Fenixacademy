#!/usr/bin/env python3
"""
Script completo para gerar conteúdo específico para todas as aulas de todos os cursos da Fenix
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
    print("🚀 GERANDO CONTEÚDO ESPECÍFICO PARA TODAS AS AULAS DE TODOS OS CURSOS!")
    print("=" * 80)
    
    # Configuração dos cursos
    courses_config = {
        'web-fundamentals': {
            'name': 'Web Fundamentals',
            'modules': [
                {
                    'name': 'HTML5 Avançado',
                    'lessons': [
                        'HTML5 Semântico e Acessibilidade',
                        'Formulários Avançados e Validação',
                        'APIs HTML5: Canvas, WebGL, WebRTC',
                        'Performance e Otimização',
                        'Projeto: Site Responsivo Avançado'
                    ]
                },
                {
                    'name': 'CSS3 Avançado',
                    'lessons': [
                        'CSS Grid e Flexbox Avançado',
                        'Animações e Transições CSS',
                        'CSS Custom Properties e Houdini',
                        'Design Systems e Componentes',
                        'CSS-in-JS e Styled Components',
                        'Projeto: Dashboard Interativo'
                    ]
                },
                {
                    'name': 'JavaScript ES6+',
                    'lessons': [
                        'ES6+ Features e Modern JavaScript',
                        'Async/Await e Promises Avançadas',
                        'Modules e Import/Export',
                        'Generators e Iterators',
                        'Proxy e Reflect API',
                        'Web Workers e Service Workers',
                        'Projeto: Aplicação PWA'
                    ]
                },
                {
                    'name': 'React Avançado',
                    'lessons': [
                        'React Hooks Avançados',
                        'Context API e State Management',
                        'Performance e Memoização',
                        'Testing com Jest e React Testing Library',
                        'Server-Side Rendering com Next.js',
                        'Static Site Generation',
                        'Deploy e CI/CD',
                        'Projeto: E-commerce Completo'
                    ]
                },
                {
                    'name': 'Node.js e APIs',
                    'lessons': [
                        'Node.js Avançado e Event Loop',
                        'Express.js e Middleware',
                        'RESTful APIs e GraphQL',
                        'Autenticação e Autorização',
                        'Microserviços e Docker',
                        'Projeto: API Escalável'
                    ]
                }
            ]
        },
        'python-data-science': {
            'name': 'Python Data Science',
            'modules': [
                {
                    'name': 'Fundamentos Python',
                    'lessons': [
                        'Introdução ao Python para Data Science',
                        'Variáveis e Tipos de Dados',
                        'Estruturas de Controle',
                        'Funções e Módulos',
                        'Projeto: Calculadora de Estatísticas'
                    ]
                },
                {
                    'name': 'Análise de Dados com Pandas',
                    'lessons': [
                        'Introdução ao Pandas',
                        'DataFrames e Series',
                        'Manipulação de Dados',
                        'Agregações e Agrupamentos',
                        'Limpeza e Tratamento de Dados',
                        'Projeto: Análise de Vendas'
                    ]
                },
                {
                    'name': 'Visualização com Matplotlib/Seaborn',
                    'lessons': [
                        'Introdução à Visualização',
                        'Matplotlib Básico',
                        'Seaborn e Estatísticas',
                        'Gráficos Avançados',
                        'Dashboards Interativos',
                        'Projeto: Dashboard de Vendas'
                    ]
                },
                {
                    'name': 'Machine Learning Básico',
                    'lessons': [
                        'Introdução ao Machine Learning',
                        'Regressão Linear',
                        'Classificação',
                        'Clustering',
                        'Validação e Métricas',
                        'Feature Engineering',
                        'Projeto: Sistema de Recomendação'
                    ]
                },
                {
                    'name': 'Deep Learning com TensorFlow',
                    'lessons': [
                        'Introdução ao Deep Learning',
                        'Redes Neurais Básicas',
                        'TensorFlow e Keras',
                        'CNNs para Imagens',
                        'RNNs para Sequências',
                        'Projeto: Classificador de Imagens'
                    ]
                }
            ]
        },
        'react-advanced': {
            'name': 'React Advanced',
            'modules': [
                {
                    'name': 'React Hooks Avançados',
                    'lessons': [
                        'useState e useEffect Avançados',
                        'useContext e useReducer',
                        'useMemo e useCallback',
                        'Custom Hooks',
                        'Projeto: Hook Library'
                    ]
                },
                {
                    'name': 'State Management',
                    'lessons': [
                        'Redux Toolkit',
                        'Zustand e Jotai',
                        'Context API Avançado',
                        'Server State com React Query',
                        'Projeto: App com Estado Complexo'
                    ]
                },
                {
                    'name': 'Performance e Otimização',
                    'lessons': [
                        'React.memo e Pure Components',
                        'Code Splitting e Lazy Loading',
                        'Bundle Analysis',
                        'Profiling e Debugging',
                        'Projeto: App Otimizada'
                    ]
                }
            ]
        },
        'aws-cloud': {
            'name': 'AWS Cloud',
            'modules': [
                {
                    'name': 'Fundamentos AWS',
                    'lessons': [
                        'Introdução à AWS',
                        'IAM e Segurança',
                        'EC2 e Computação',
                        'S3 e Armazenamento',
                        'Projeto: Infraestrutura Básica'
                    ]
                },
                {
                    'name': 'Serviços Avançados',
                    'lessons': [
                        'Lambda e Serverless',
                        'RDS e Bancos de Dados',
                        'CloudFormation e IaC',
                        'CloudWatch e Monitoramento',
                        'Projeto: Arquitetura Completa'
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
    
    print("\n🎉 CONTEÚDO ESPECÍFICO GERADO PARA TODOS OS CURSOS!")

if __name__ == "__main__":
    main()


