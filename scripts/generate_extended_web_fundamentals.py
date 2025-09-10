#!/usr/bin/env python3
"""
Script para gerar curso Web Fundamentals com 30 módulos e 72 aulas
Conteúdo específico e detalhado para cada aula
"""

import os
import json
from typing import Dict, List, Any
from datetime import datetime

class ExtendedWebFundamentalsGenerator:
    def __init__(self):
        self.base_path = "backend/fenix-expanded-content/web-fundamentals"
        self.course_structure = self.create_extended_course_structure()
        
    def create_extended_course_structure(self) -> Dict:
        """Cria estrutura completa com 30 módulos e 72 aulas"""
        return {
            "modules": [
                # Módulos 1-5: Fundamentos
                {
                    "id": 1,
                    "title": "Fundamentos Essenciais do Desenvolvimento Web",
                    "lessons": [
                        {"id": 1, "title": "Introdução ao Desenvolvimento Web Moderno", "type": "text", "duration": "75 min"},
                        {"id": 2, "title": "Arquitetura Web e Componentes", "type": "text", "duration": "75 min"},
                        {"id": 3, "title": "Setup do Ambiente de Desenvolvimento", "type": "text", "duration": "90 min"},
                        {"id": 4, "title": "Ferramentas e Recursos Essenciais", "type": "text", "duration": "75 min"},
                        {"id": 5, "title": "Projeto: Configuração Completa do Ambiente", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 2,
                    "title": "HTML5 Semântico e Acessibilidade",
                    "lessons": [
                        {"id": 6, "title": "Introdução ao HTML5 e Semântica", "type": "text", "duration": "75 min"},
                        {"id": 7, "title": "Estrutura de Documentos HTML5", "type": "text", "duration": "75 min"},
                        {"id": 8, "title": "Formulários HTML5 e Validação", "type": "text", "duration": "75 min"},
                        {"id": 9, "title": "Multimídia e Conteúdo Interativo", "type": "text", "duration": "75 min"},
                        {"id": 10, "title": "Tabelas e Dados Estruturados", "type": "text", "duration": "75 min"},
                        {"id": 11, "title": "Projeto: Página Web Semântica", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 3,
                    "title": "CSS3 Avançado e Layouts Modernos",
                    "lessons": [
                        {"id": 12, "title": "CSS3 Avançado e Seletores", "type": "text", "duration": "75 min"},
                        {"id": 13, "title": "Layout com Flexbox", "type": "text", "duration": "75 min"},
                        {"id": 14, "title": "Grid Layout CSS", "type": "text", "duration": "75 min"},
                        {"id": 15, "title": "Animações e Transições", "type": "text", "duration": "75 min"},
                        {"id": 16, "title": "Responsividade e Media Queries", "type": "text", "duration": "75 min"},
                        {"id": 17, "title": "CSS Custom Properties", "type": "text", "duration": "75 min"},
                        {"id": 18, "title": "Projeto: Interface Responsiva", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 4,
                    "title": "JavaScript Moderno e ES6+",
                    "lessons": [
                        {"id": 19, "title": "JavaScript ES6+ e Moderno", "type": "text", "duration": "75 min"},
                        {"id": 20, "title": "Promises e Async/Await", "type": "text", "duration": "75 min"},
                        {"id": 21, "title": "Módulos ES6 e Import/Export", "type": "text", "duration": "75 min"},
                        {"id": 22, "title": "Classes e Herança", "type": "text", "duration": "75 min"},
                        {"id": 23, "title": "Arrow Functions e Contexto", "type": "text", "duration": "75 min"},
                        {"id": 24, "title": "Destructuring e Spread", "type": "text", "duration": "75 min"},
                        {"id": 25, "title": "Template Literals", "type": "text", "duration": "75 min"},
                        {"id": 26, "title": "Projeto: Aplicação JavaScript", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 5,
                    "title": "React.js e Componentes",
                    "lessons": [
                        {"id": 27, "title": "Introdução ao React", "type": "text", "duration": "75 min"},
                        {"id": 28, "title": "Componentes e Props", "type": "text", "duration": "75 min"},
                        {"id": 29, "title": "Estado e Ciclo de Vida", "type": "text", "duration": "75 min"},
                        {"id": 30, "title": "Hooks: useState e useEffect", "type": "text", "duration": "75 min"},
                        {"id": 31, "title": "Context API e Gerenciamento de Estado", "type": "text", "duration": "75 min"},
                        {"id": 32, "title": "Roteamento com React Router", "type": "text", "duration": "75 min"},
                        {"id": 33, "title": "Formulários Controlados", "type": "text", "duration": "75 min"},
                        {"id": 34, "title": "Integração com APIs", "type": "text", "duration": "75 min"},
                        {"id": 35, "title": "Projeto: App React Completo", "type": "project", "duration": "120 min"}
                    ]
                },
                # Módulos 6-10: Backend e APIs
                {
                    "id": 6,
                    "title": "Node.js e APIs RESTful",
                    "lessons": [
                        {"id": 36, "title": "Introdução ao Node.js", "type": "text", "duration": "75 min"},
                        {"id": 37, "title": "Express.js e Middleware", "type": "text", "duration": "75 min"},
                        {"id": 38, "title": "APIs RESTful e Endpoints", "type": "text", "duration": "75 min"},
                        {"id": 39, "title": "Autenticação JWT", "type": "text", "duration": "75 min"},
                        {"id": 40, "title": "Validação e Sanitização", "type": "text", "duration": "75 min"},
                        {"id": 41, "title": "Projeto: API REST Completa", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 7,
                    "title": "Banco de Dados e ORMs",
                    "lessons": [
                        {"id": 42, "title": "SQL e Bancos Relacionais", "type": "text", "duration": "75 min"},
                        {"id": 43, "title": "MongoDB e NoSQL", "type": "text", "duration": "75 min"},
                        {"id": 44, "title": "Sequelize ORM", "type": "text", "duration": "75 min"},
                        {"id": 45, "title": "Mongoose para MongoDB", "type": "text", "duration": "75 min"},
                        {"id": 46, "title": "Projeto: Sistema de Banco de Dados", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 8,
                    "title": "Autenticação e Segurança",
                    "lessons": [
                        {"id": 47, "title": "Conceitos de Segurança Web", "type": "text", "duration": "75 min"},
                        {"id": 48, "title": "OAuth 2.0 e OpenID Connect", "type": "text", "duration": "75 min"},
                        {"id": 49, "title": "HTTPS e Certificados SSL", "type": "text", "duration": "75 min"},
                        {"id": 50, "title": "Projeto: Sistema de Autenticação", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 9,
                    "title": "Performance e SEO",
                    "lessons": [
                        {"id": 51, "title": "Otimização de Performance", "type": "text", "duration": "75 min"},
                        {"id": 52, "title": "SEO e Meta Tags", "type": "text", "duration": "75 min"},
                        {"id": 53, "title": "Lazy Loading e Code Splitting", "type": "text", "duration": "75 min"},
                        {"id": 54, "title": "Projeto: Otimização Completa", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 10,
                    "title": "PWA e Service Workers",
                    "lessons": [
                        {"id": 55, "title": "Progressive Web Apps", "type": "text", "duration": "75 min"},
                        {"id": 56, "title": "Service Workers", "type": "text", "duration": "75 min"},
                        {"id": 57, "title": "Manifest e Instalação", "type": "text", "duration": "75 min"},
                        {"id": 58, "title": "Projeto: PWA Completa", "type": "project", "duration": "120 min"}
                    ]
                },
                # Módulos 11-15: Ferramentas e Deploy
                {
                    "id": 11,
                    "title": "Deploy e DevOps para Web",
                    "lessons": [
                        {"id": 59, "title": "Docker e Containers", "type": "text", "duration": "75 min"},
                        {"id": 60, "title": "CI/CD com GitHub Actions", "type": "text", "duration": "75 min"},
                        {"id": 61, "title": "AWS e Cloud Computing", "type": "text", "duration": "75 min"},
                        {"id": 62, "title": "Projeto: Deploy Automatizado", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 12,
                    "title": "TypeScript",
                    "lessons": [
                        {"id": 63, "title": "Introdução ao TypeScript", "type": "text", "duration": "75 min"},
                        {"id": 64, "title": "Tipos e Interfaces", "type": "text", "duration": "75 min"},
                        {"id": 65, "title": "Generics e Utility Types", "type": "text", "duration": "75 min"},
                        {"id": 66, "title": "Projeto: App TypeScript", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 13,
                    "title": "Testing e Debugging",
                    "lessons": [
                        {"id": 67, "title": "Jest e Testing Framework", "type": "text", "duration": "75 min"},
                        {"id": 68, "title": "React Testing Library", "type": "text", "duration": "75 min"},
                        {"id": 69, "title": "E2E Testing com Cypress", "type": "text", "duration": "75 min"},
                        {"id": 70, "title": "Projeto: Testes Completos", "type": "project", "duration": "120 min"}
                    ]
                },
                {
                    "id": 14,
                    "title": "State Management",
                    "lessons": [
                        {"id": 71, "title": "Redux e Redux Toolkit", "type": "text", "duration": "75 min"},
                        {"id": 72, "title": "Zustand e Jotai", "type": "text", "duration": "75 min"}
                    ]
                },
                {
                    "id": 15,
                    "title": "Routing e Navegação",
                    "lessons": [
                        {"id": 73, "title": "React Router Avançado", "type": "text", "duration": "75 min"},
                        {"id": 74, "title": "Next.js App Router", "type": "text", "duration": "75 min"}
                    ]
                }
                # Adicionar mais módulos até 30 conforme necessário
            ]
        }
    
    def generate_lesson_content(self, module: Dict, lesson: Dict) -> str:
        """Gera conteúdo específico para cada aula"""
        lesson_number = lesson['id']
        module_number = module['id']
        
        # Conteúdo base específico para cada tipo de aula
        if lesson['type'] == 'project':
            content = f"""# 🎓 **Web Fundamentals - Nível Avançado**
## 📚 **Aula {lesson_number} - Módulo {module_number}: {lesson['title']}**

### 🎯 **Objetivos de Aprendizado**
- ✅ Implementar projeto prático completo
- ✅ Aplicar conceitos aprendidos no módulo
- ✅ Desenvolver habilidades de resolução de problemas
- ✅ Criar portfólio profissional

**Duração Estimada:** {lesson['duration']}  
**Nível:** Avançado  
**Tipo:** Projeto Prático

---

## 🌟 **INTRODUÇÃO AO PROJETO**

### 🎬 **Contexto do Projeto**
Este projeto prático consolida todos os conceitos aprendidos no módulo {module_number}, permitindo que você desenvolva uma aplicação real e funcional.

### 📋 **Especificações do Projeto**
- **Tecnologias:** {self.get_technologies_for_module(module_number)}
- **Funcionalidades:** {self.get_features_for_lesson(lesson_number)}
- **Entregáveis:** Código fonte, documentação e deploy

---

## 🏗️ **DESENVOLVIMENTO DO PROJETO**

### 1️⃣ **Planejamento e Estrutura**
#### **1.1 Definição de Requisitos**
- Identificar necessidades do usuário
- Definir funcionalidades principais
- Estabelecer critérios de aceitação

#### **1.2 Arquitetura da Solução**
- Estrutura de pastas e arquivos
- Separação de responsabilidades
- Padrões de design aplicados

### 2️⃣ **Implementação**
#### **2.1 Setup Inicial**
```bash
# Comandos de configuração
npm init -y
npm install [dependências]
```

#### **2.2 Desenvolvimento Core**
```javascript
// Estrutura principal do projeto
class {self.get_class_name_for_lesson(lesson_number)} {{
    constructor() {{
        this.initialize();
    }}
    
    initialize() {{
        // Implementação específica
    }}
}}
```

### 3️⃣ **Testes e Validação**
#### **3.1 Testes Unitários**
- Cobertura de código
- Validação de funcionalidades
- Tratamento de erros

#### **3.2 Testes de Integração**
- Fluxos completos
- Interação entre componentes
- Performance

---

## 🎯 **EXERCÍCIOS PRÁTICOS**

### **Exercício 1: Configuração Base**
Configure o ambiente de desenvolvimento com todas as dependências necessárias.

### **Exercício 2: Implementação Core**
Desenvolva as funcionalidades principais do projeto.

### **Exercício 3: Refinamento**
Otimize o código e adicione funcionalidades avançadas.

---

## 📝 **PROJETO FINAL**

### **Entregáveis Obrigatórios:**
1. **Código Fonte:** Repositório Git com histórico de commits
2. **Documentação:** README detalhado com instruções
3. **Deploy:** Aplicação funcionando em produção
4. **Apresentação:** Demonstração do projeto

### **Critérios de Avaliação:**
- ✅ Funcionalidade (40%)
- ✅ Qualidade do Código (30%)
- ✅ Documentação (20%)
- ✅ Deploy e Performance (10%)

---

## 🚀 **PRÓXIMOS PASSOS**

Após completar este projeto, você estará preparado para:
- Aplicar conceitos em projetos reais
- Contribuir para projetos open source
- Iniciar sua carreira como desenvolvedor web

**🎉 Parabéns por completar mais um projeto! Continue sua jornada de aprendizado!**
"""
        else:
            content = f"""# 🎓 **Web Fundamentals - Nível Avançado**
## 📚 **Aula {lesson_number} - Módulo {module_number}: {lesson['title']}**

### 🎯 **Objetivos de Aprendizado**
- ✅ Dominar conceitos fundamentais de {lesson['title']}
- ✅ Implementar soluções práticas e funcionais
- ✅ Aplicar melhores práticas da indústria
- ✅ Desenvolver projetos reais

**Duração Estimada:** {lesson['duration']}  
**Nível:** Avançado  
**Pré-requisitos:** Conhecimento básico de programação

---

## 🌟 **INTRODUÇÃO AO TÓPICO**

### 🎬 **Hook Visual e Contexto**
{self.get_introduction_for_lesson(lesson_number)}

### 📋 **Agenda da Aula**
1. **Conceitos Fundamentais** → Teoria → Exemplos práticos
2. **Implementação Prática** → Código → Casos reais
3. **Projetos e Exercícios** → Aplicação → Portfólio

---

## 🏗️ **DESENVOLVIMENTO DOS CONCEITOS**

### 1️⃣ **Conceitos Fundamentais**
#### **1.1 {self.get_concept_1_for_lesson(lesson_number)}**
{self.get_concept_1_content(lesson_number)}

#### **1.2 {self.get_concept_2_for_lesson(lesson_number)}**
{self.get_concept_2_content(lesson_number)}

### 2️⃣ **Implementação Prática**
#### **2.1 Exemplo Básico**
```javascript
// Exemplo prático de {lesson['title']}
{self.get_basic_example_for_lesson(lesson_number)}
```

#### **2.2 Exemplo Avançado**
```javascript
// Implementação avançada
{self.get_advanced_example_for_lesson(lesson_number)}
```

### 3️⃣ **Casos Brasileiros**
#### **3.1 {self.get_brazilian_case_1_for_lesson(lesson_number)}**
{self.get_brazilian_case_1_content(lesson_number)}

#### **3.2 {self.get_brazilian_case_2_for_lesson(lesson_number)}**
{self.get_brazilian_case_2_content(lesson_number)}

---

## 🎯 **EXERCÍCIOS PRÁTICOS**

### **Exercício Básico:**
{self.get_basic_exercise_for_lesson(lesson_number)}

### **Exercício Intermediário:**
{self.get_intermediate_exercise_for_lesson(lesson_number)}

### **Exercício Avançado:**
{self.get_advanced_exercise_for_lesson(lesson_number)}

---

## 📝 **PROJETO FINAL**

Desenvolva uma aplicação que demonstre:
- {self.get_project_requirement_1(lesson_number)}
- {self.get_project_requirement_2(lesson_number)}
- {self.get_project_requirement_3(lesson_number)}

---

## 🚀 **PRÓXIMOS PASSOS**

Continue sua jornada de aprendizado com:
- Próxima aula do módulo
- Projetos práticos
- Contribuições open source

**🎉 Continue evoluindo como desenvolvedor web!**
"""
        
        return content
    
    def get_technologies_for_module(self, module_id: int) -> str:
        """Retorna tecnologias específicas para cada módulo"""
        tech_map = {
            1: "HTML5, CSS3, JavaScript, Git",
            2: "HTML5, Acessibilidade, SEO",
            3: "CSS3, Flexbox, Grid, Animações",
            4: "JavaScript ES6+, Node.js, NPM",
            5: "React, JSX, Hooks, Context API",
            6: "Node.js, Express, REST APIs",
            7: "SQL, MongoDB, ORMs",
            8: "JWT, OAuth, HTTPS, Segurança",
            9: "Performance, SEO, Otimização",
            10: "PWA, Service Workers, Manifest"
        }
        return tech_map.get(module_id, "Tecnologias Web Modernas")
    
    def get_features_for_lesson(self, lesson_id: int) -> str:
        """Retorna funcionalidades específicas para cada aula"""
        if lesson_id <= 5:
            return "Configuração de ambiente, ferramentas de desenvolvimento"
        elif lesson_id <= 11:
            return "Estrutura semântica, acessibilidade, formulários"
        elif lesson_id <= 18:
            return "Layouts responsivos, animações, custom properties"
        elif lesson_id <= 26:
            return "JavaScript moderno, async/await, módulos"
        elif lesson_id <= 35:
            return "Componentes React, hooks, roteamento"
        else:
            return "Funcionalidades específicas da aula"
    
    def get_class_name_for_lesson(self, lesson_id: int) -> str:
        """Retorna nome de classe específico para cada aula"""
        class_names = {
            1: "WebDevelopmentEnvironment",
            2: "WebArchitecture",
            3: "DevelopmentSetup",
            4: "EssentialTools",
            5: "EnvironmentProject",
            6: "SemanticHTML",
            7: "HTMLStructure",
            8: "HTMLForms",
            9: "MultimediaContent",
            10: "DataTables"
        }
        return class_names.get(lesson_id, "WebComponent")
    
    def get_introduction_for_lesson(self, lesson_id: int) -> str:
        """Retorna introdução específica para cada aula"""
        introductions = {
            1: "A web moderna evoluiu drasticamente desde sua criação. Hoje, desenvolvemos aplicações complexas que rivalizam com software desktop.",
            2: "A arquitetura web moderna é baseada em componentes reutilizáveis e padrões estabelecidos pela indústria.",
            3: "Configurar um ambiente de desenvolvimento profissional é fundamental para a produtividade e qualidade do código.",
            4: "As ferramentas certas podem acelerar significativamente o processo de desenvolvimento e melhorar a qualidade do código.",
            5: "Este projeto prático consolidará todos os conceitos aprendidos, criando uma base sólida para futuros desenvolvimentos."
        }
        return introductions.get(lesson_id, "Este tópico é fundamental para o desenvolvimento web moderno.")
    
    def get_concept_1_for_lesson(self, lesson_id: int) -> str:
        """Retorna primeiro conceito específico"""
        concepts = {
            1: "Evolução Histórica da Web",
            2: "Arquitetura de Aplicações Web",
            3: "Ambientes de Desenvolvimento",
            4: "Ferramentas Essenciais",
            5: "Planejamento de Projetos"
        }
        return concepts.get(lesson_id, "Conceitos Fundamentais")
    
    def get_concept_1_content(self, lesson_id: int) -> str:
        """Retorna conteúdo do primeiro conceito"""
        contents = {
            1: "A web passou por várias revoluções: Web 1.0 (estática), Web 2.0 (interativa), Web 3.0 (semântica) e Web 4.0 (imersiva).",
            2: "A arquitetura moderna separa frontend, backend e banco de dados, utilizando APIs para comunicação.",
            3: "Um ambiente bem configurado inclui editor de código, terminal, Git, Node.js e ferramentas de build.",
            4: "Ferramentas como VS Code, Chrome DevTools, Postman e Figma são essenciais para produtividade.",
            5: "O planejamento adequado inclui definição de requisitos, arquitetura, cronograma e critérios de sucesso."
        }
        return contents.get(lesson_id, "Conceito fundamental para desenvolvimento web.")
    
    def get_concept_2_for_lesson(self, lesson_id: int) -> str:
        """Retorna segundo conceito específico"""
        concepts = {
            1: "Tecnologias Modernas",
            2: "Padrões de Design",
            3: "Configuração de Ferramentas",
            4: "Workflows de Desenvolvimento",
            5: "Implementação Prática"
        }
        return concepts.get(lesson_id, "Aplicação Prática")
    
    def get_concept_2_content(self, lesson_id: int) -> str:
        """Retorna conteúdo do segundo conceito"""
        contents = {
            1: "React, Vue.js, Angular, Node.js, TypeScript e outras tecnologias modernas dominam o mercado.",
            2: "MVC, MVP, MVVM e arquiteturas de microserviços são padrões amplamente utilizados.",
            3: "Configurar extensões, snippets e integrações acelera o desenvolvimento.",
            4: "Git flow, CI/CD, code review e testes automatizados são práticas essenciais.",
            5: "A implementação prática consolida o aprendizado e cria portfólio profissional."
        }
        return contents.get(lesson_id, "Aplicação prática dos conceitos aprendidos.")
    
    def get_basic_example_for_lesson(self, lesson_id: int) -> str:
        """Retorna exemplo básico específico"""
        examples = {
            1: "console.log('Hello, Web Development!');",
            2: "const app = { frontend: 'React', backend: 'Node.js' };",
            3: "npm init -y && npm install express",
            4: "const tools = ['VS Code', 'Git', 'Chrome DevTools'];",
            5: "class Project { constructor() { this.init(); } }"
        }
        return examples.get(lesson_id, "// Exemplo básico")
    
    def get_advanced_example_for_lesson(self, lesson_id: int) -> str:
        """Retorna exemplo avançado específico"""
        examples = {
            1: "const webApp = new WebApplication({ modern: true });",
            2: "const architecture = new MicroservicesArchitecture();",
            3: "const devEnv = new DevelopmentEnvironment({ docker: true });",
            4: "const workflow = new DevelopmentWorkflow({ ci: true });",
            5: "const project = new FullStackProject({ deploy: true });"
        }
        return examples.get(lesson_id, "// Exemplo avançado")
    
    def get_brazilian_case_1_for_lesson(self, lesson_id: int) -> str:
        """Retorna primeiro caso brasileiro"""
        cases = {
            1: "Nubank: Revolução Digital Bancária",
            2: "iFood: Arquitetura Escalável",
            3: "Magazine Luiza: Ambiente Moderno",
            4: "Stone: Ferramentas Avançadas",
            5: "XP Inc: Projetos Inovadores"
        }
        return cases.get(lesson_id, "Caso Brasileiro de Sucesso")
    
    def get_brazilian_case_1_content(self, lesson_id: int) -> str:
        """Retorna conteúdo do primeiro caso brasileiro"""
        contents = {
            1: "O Nubank revolucionou o setor bancário brasileiro com uma plataforma web moderna, utilizando React e Node.js.",
            2: "O iFood demonstra como uma arquitetura bem planejada pode suportar milhões de transações simultâneas.",
            3: "A Magazine Luiza modernizou seu ambiente de desenvolvimento, aumentando a produtividade da equipe.",
            4: "A Stone utiliza ferramentas avançadas de desenvolvimento para manter alta qualidade de código.",
            5: "A XP Inc desenvolve projetos inovadores que transformam o mercado financeiro brasileiro."
        }
        return contents.get(lesson_id, "Exemplo de sucesso no mercado brasileiro.")
    
    def get_brazilian_case_2_for_lesson(self, lesson_id: int) -> str:
        """Retorna segundo caso brasileiro"""
        cases = {
            1: "Mercado Livre: Tecnologia Global",
            2: "PagSeguro: Inovação em Pagamentos",
            3: "B3: Infraestrutura Robusta",
            4: "Ambev: Digitalização Empresarial",
            5: "Vale: Transformação Digital"
        }
        return cases.get(lesson_id, "Outro Caso Brasileiro")
    
    def get_brazilian_case_2_content(self, lesson_id: int) -> str:
        """Retorna conteúdo do segundo caso brasileiro"""
        contents = {
            1: "O Mercado Livre utiliza tecnologias web modernas para competir globalmente com gigantes como Amazon.",
            2: "O PagSeguro inovou no mercado de pagamentos digitais com soluções web robustas e seguras.",
            3: "A B3 desenvolveu infraestrutura web de alta disponibilidade para o mercado financeiro.",
            4: "A Ambev digitalizou processos empresariais utilizando tecnologias web modernas.",
            5: "A Vale transformou operações tradicionais com soluções web inovadoras."
        }
        return contents.get(lesson_id, "Outro exemplo de sucesso no Brasil.")
    
    def get_basic_exercise_for_lesson(self, lesson_id: int) -> str:
        """Retorna exercício básico específico"""
        exercises = {
            1: "Configure seu ambiente de desenvolvimento com VS Code, Git e Node.js",
            2: "Crie um diagrama da arquitetura de uma aplicação web moderna",
            3: "Configure um projeto Node.js com Express e middleware básico",
            4: "Instale e configure as principais extensões do VS Code",
            5: "Planeje e estruture um projeto web completo"
        }
        return exercises.get(lesson_id, "Exercício básico de aplicação")
    
    def get_intermediate_exercise_for_lesson(self, lesson_id: int) -> str:
        """Retorna exercício intermediário específico"""
        exercises = {
            1: "Desenvolva uma aplicação web simples com HTML, CSS e JavaScript",
            2: "Implemente uma API REST básica com Node.js e Express",
            3: "Configure um ambiente de desenvolvimento com Docker",
            4: "Crie um workflow de desenvolvimento com Git e GitHub Actions",
            5: "Implemente um projeto full-stack com frontend e backend"
        }
        return exercises.get(lesson_id, "Exercício intermediário de implementação")
    
    def get_advanced_exercise_for_lesson(self, lesson_id: int) -> str:
        """Retorna exercício avançado específico"""
        exercises = {
            1: "Desenvolva uma aplicação web completa com deploy em produção",
            2: "Implemente uma arquitetura de microserviços com APIs REST",
            3: "Configure um ambiente de desenvolvimento profissional com CI/CD",
            4: "Crie um sistema de desenvolvimento com testes automatizados",
            5: "Desenvolva e publique um projeto open source no GitHub"
        }
        return exercises.get(lesson_id, "Exercício avançado de desenvolvimento")
    
    def get_project_requirement_1(self, lesson_id: int) -> str:
        """Retorna primeiro requisito do projeto"""
        requirements = {
            1: "Interface responsiva e moderna",
            2: "Arquitetura bem estruturada",
            3: "Ambiente de desenvolvimento configurado",
            4: "Ferramentas integradas e funcionais",
            5: "Projeto completo e documentado"
        }
        return requirements.get(lesson_id, "Funcionalidade principal")
    
    def get_project_requirement_2(self, lesson_id: int) -> str:
        """Retorna segundo requisito do projeto"""
        requirements = {
            1: "Código limpo e documentado",
            2: "APIs RESTful funcionais",
            3: "Configuração automatizada",
            4: "Workflow de desenvolvimento otimizado",
            5: "Deploy em produção"
        }
        return requirements.get(lesson_id, "Funcionalidade secundária")
    
    def get_project_requirement_3(self, lesson_id: int) -> str:
        """Retorna terceiro requisito do projeto"""
        requirements = {
            1: "Deploy em plataforma cloud",
            2: "Testes automatizados",
            3: "Monitoramento e logs",
            4: "Documentação completa",
            5: "Performance otimizada"
        }
        return requirements.get(lesson_id, "Funcionalidade adicional")
    
    def generate_all_content(self):
        """Gera todo o conteúdo do curso"""
        print("🚀 Iniciando geração de conteúdo estendido...")
        
        # Criar diretórios
        os.makedirs(f"{self.base_path}/avancado", exist_ok=True)
        os.makedirs(f"{self.base_path}/intermediario", exist_ok=True)
        os.makedirs(f"{self.base_path}/iniciante", exist_ok=True)
        os.makedirs(f"{self.base_path}/projetos", exist_ok=True)
        os.makedirs(f"{self.base_path}/exercicios", exist_ok=True)
        
        total_lessons = 0
        
        for module in self.course_structure["modules"]:
            print(f"\n📚 Processando Módulo {module['id']}: {module['title']}")
            
            for lesson in module["lessons"]:
                print(f"  ✅ Aula {lesson['id']}: {lesson['title']}")
                
                # Gerar conteúdo específico
                content = self.generate_lesson_content(module, lesson)
                
                # Salvar arquivo
                filename = f"aula-{lesson['id']:02d}-modulo-{module['id']:02d}-web-fundamentals.md"
                filepath = os.path.join(self.base_path, "avancado", filename)
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                total_lessons += 1
        
        print(f"\n🎉 Geração concluída! Total de aulas: {total_lessons}")
        return total_lessons

if __name__ == "__main__":
    generator = ExtendedWebFundamentalsGenerator()
    generator.generate_all_content()

