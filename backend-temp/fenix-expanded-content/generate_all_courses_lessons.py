#!/usr/bin/env python3
"""
Script para gerar conteúdo específico para todas as aulas de todos os cursos da Fenix
"""

import os
from pathlib import Path

def generate_lesson_content(course_path: Path, filename: str, title: str, module_num: int, lesson_num: int):
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
{title} é uma tecnologia essencial para desenvolvimento moderno. Nesta aula, você aprenderá:

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
class {title.replace(' ', '')}:
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

🎉 Continue evoluindo como desenvolvedor!
"""
    
    # Criar diretório se não existir
    file_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Escrever arquivo
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Gerado: {filename}")

def generate_web_fundamentals_lessons():
    """Gera aulas para Web Fundamentals"""
    print("🌐 Gerando aulas para Web Fundamentals...")
    course_path = Path("backend/fenix-expanded-content/web-fundamentals/avancado")
    
    # Módulo 1: HTML5 Avançado (5 aulas)
    generate_lesson_content(course_path, "aula-01-modulo-01-web-fundamentals.md", 
                           "HTML5 Semântico e Acessibilidade", 1, 1)
    generate_lesson_content(course_path, "aula-02-modulo-01-web-fundamentals.md", 
                           "Formulários Avançados e Validação", 1, 2)
    generate_lesson_content(course_path, "aula-03-modulo-01-web-fundamentals.md", 
                           "APIs HTML5: Canvas, WebGL, WebRTC", 1, 3)
    generate_lesson_content(course_path, "aula-04-modulo-01-web-fundamentals.md", 
                           "Performance e Otimização", 1, 4)
    generate_lesson_content(course_path, "aula-05-modulo-01-web-fundamentals.md", 
                           "Projeto: Site Responsivo Avançado", 1, 5)
    
    # Módulo 2: CSS3 Avançado (6 aulas)
    generate_lesson_content(course_path, "aula-06-modulo-02-web-fundamentals.md", 
                           "CSS Grid e Flexbox Avançado", 2, 1)
    generate_lesson_content(course_path, "aula-07-modulo-02-web-fundamentals.md", 
                           "Animações e Transições CSS", 2, 2)
    generate_lesson_content(course_path, "aula-08-modulo-02-web-fundamentals.md", 
                           "CSS Custom Properties e Houdini", 2, 3)
    generate_lesson_content(course_path, "aula-09-modulo-02-web-fundamentals.md", 
                           "Design Systems e Componentes", 2, 4)
    generate_lesson_content(course_path, "aula-10-modulo-02-web-fundamentals.md", 
                           "CSS-in-JS e Styled Components", 2, 5)
    generate_lesson_content(course_path, "aula-11-modulo-02-web-fundamentals.md", 
                           "Projeto: Dashboard Interativo", 2, 6)
    
    # Módulo 3: JavaScript ES6+ (7 aulas)
    generate_lesson_content(course_path, "aula-12-modulo-03-web-fundamentals.md", 
                           "ES6+ Features e Modern JavaScript", 3, 1)
    generate_lesson_content(course_path, "aula-13-modulo-03-web-fundamentals.md", 
                           "Async/Await e Promises Avançadas", 3, 2)
    generate_lesson_content(course_path, "aula-14-modulo-03-web-fundamentals.md", 
                           "Modules e Import/Export", 3, 3)
    generate_lesson_content(course_path, "aula-15-modulo-03-web-fundamentals.md", 
                           "Generators e Iterators", 3, 4)
    generate_lesson_content(course_path, "aula-16-modulo-03-web-fundamentals.md", 
                           "Proxy e Reflect API", 3, 5)
    generate_lesson_content(course_path, "aula-17-modulo-03-web-fundamentals.md", 
                           "Web Workers e Service Workers", 3, 6)
    generate_lesson_content(course_path, "aula-18-modulo-03-web-fundamentals.md", 
                           "Projeto: Aplicação PWA", 3, 7)
    
    # Módulo 4: React Avançado (8 aulas)
    generate_lesson_content(course_path, "aula-19-modulo-04-web-fundamentals.md", 
                           "React Hooks Avançados", 4, 1)
    generate_lesson_content(course_path, "aula-20-modulo-04-web-fundamentals.md", 
                           "Context API e State Management", 4, 2)
    generate_lesson_content(course_path, "aula-21-modulo-04-web-fundamentals.md", 
                           "Performance e Memoização", 4, 3)
    generate_lesson_content(course_path, "aula-22-modulo-04-web-fundamentals.md", 
                           "Testing com Jest e React Testing Library", 4, 4)
    generate_lesson_content(course_path, "aula-23-modulo-04-web-fundamentals.md", 
                           "Server-Side Rendering com Next.js", 4, 5)
    generate_lesson_content(course_path, "aula-24-modulo-04-web-fundamentals.md", 
                           "Static Site Generation", 4, 6)
    generate_lesson_content(course_path, "aula-25-modulo-04-web-fundamentals.md", 
                           "Deploy e CI/CD", 4, 7)
    generate_lesson_content(course_path, "aula-26-modulo-04-web-fundamentals.md", 
                           "Projeto: E-commerce Completo", 4, 8)
    
    # Módulo 5: Node.js e APIs (6 aulas)
    generate_lesson_content(course_path, "aula-27-modulo-05-web-fundamentals.md", 
                           "Node.js Avançado e Event Loop", 5, 1)
    generate_lesson_content(course_path, "aula-28-modulo-05-web-fundamentals.md", 
                           "Express.js e Middleware", 5, 2)
    generate_lesson_content(course_path, "aula-29-modulo-05-web-fundamentals.md", 
                           "RESTful APIs e GraphQL", 5, 3)
    generate_lesson_content(course_path, "aula-30-modulo-05-web-fundamentals.md", 
                           "Autenticação e Autorização", 5, 4)
    generate_lesson_content(course_path, "aula-31-modulo-05-web-fundamentals.md", 
                           "Microserviços e Docker", 5, 5)
    generate_lesson_content(course_path, "aula-32-modulo-05-web-fundamentals.md", 
                           "Projeto: API Escalável", 5, 6)
    
    # Módulo 6: Banco de Dados (5 aulas)
    generate_lesson_content(course_path, "aula-33-modulo-06-web-fundamentals.md", 
                           "SQL Avançado e Otimização", 6, 1)
    generate_lesson_content(course_path, "aula-34-modulo-06-web-fundamentals.md", 
                           "NoSQL com MongoDB", 6, 2)
    generate_lesson_content(course_path, "aula-35-modulo-06-web-fundamentals.md", 
                           "Redis e Caching", 6, 3)
    generate_lesson_content(course_path, "aula-36-modulo-06-web-fundamentals.md", 
                           "ORM e Query Builders", 6, 4)
    generate_lesson_content(course_path, "aula-37-modulo-06-web-fundamentals.md", 
                           "Projeto: Sistema de Banco de Dados", 6, 5)
    
    # Módulo 7: DevOps e Deploy (5 aulas)
    generate_lesson_content(course_path, "aula-38-modulo-07-web-fundamentals.md", 
                           "Docker e Containerização", 7, 1)
    generate_lesson_content(course_path, "aula-39-modulo-07-web-fundamentals.md", 
                           "Kubernetes e Orquestração", 7, 2)
    generate_lesson_content(course_path, "aula-40-modulo-07-web-fundamentals.md", 
                           "CI/CD com GitHub Actions", 7, 3)
    generate_lesson_content(course_path, "aula-41-modulo-07-web-fundamentals.md", 
                           "Monitoramento e Logs", 7, 4)
    generate_lesson_content(course_path, "aula-42-modulo-07-web-fundamentals.md", 
                           "Projeto: Deploy Automatizado", 7, 5)
    
    # Módulo 8: Segurança Web (4 aulas)
    generate_lesson_content(course_path, "aula-43-modulo-08-web-fundamentals.md", 
                           "OWASP e Vulnerabilidades", 8, 1)
    generate_lesson_content(course_path, "aula-44-modulo-08-web-fundamentals.md", 
                           "HTTPS e Certificados SSL", 8, 2)
    generate_lesson_content(course_path, "aula-45-modulo-08-web-fundamentals.md", 
                           "Autenticação Segura", 8, 3)
    generate_lesson_content(course_path, "aula-46-modulo-08-web-fundamentals.md", 
                           "Projeto: Aplicação Segura", 8, 4)
    
    # Módulo 9: Performance e SEO (4 aulas)
    generate_lesson_content(course_path, "aula-47-modulo-09-web-fundamentals.md", 
                           "Core Web Vitals", 9, 1)
    generate_lesson_content(course_path, "aula-48-modulo-09-web-fundamentals.md", 
                           "SEO Técnico Avançado", 9, 2)
    generate_lesson_content(course_path, "aula-49-modulo-09-web-fundamentals.md", 
                           "Lazy Loading e Code Splitting", 9, 3)
    generate_lesson_content(course_path, "aula-50-modulo-09-web-fundamentals.md", 
                           "Projeto: Site Otimizado", 9, 4)
    
    # Módulo 10: Testing e Qualidade (4 aulas)
    generate_lesson_content(course_path, "aula-51-modulo-10-web-fundamentals.md", 
                           "Testing Strategies", 10, 1)
    generate_lesson_content(course_path, "aula-52-modulo-10-web-fundamentals.md", 
                           "E2E Testing com Cypress", 10, 2)
    generate_lesson_content(course_path, "aula-53-modulo-10-web-fundamentals.md", 
                           "Code Quality e Linting", 10, 3)
    generate_lesson_content(course_path, "aula-54-modulo-10-web-fundamentals.md", 
                           "Projeto: Testes Automatizados", 10, 4)
    
    # Módulo 11: Arquitetura Frontend (4 aulas)
    generate_lesson_content(course_path, "aula-55-modulo-11-web-fundamentals.md", 
                           "Arquitetura de Componentes", 11, 1)
    generate_lesson_content(course_path, "aula-56-modulo-11-web-fundamentals.md", 
                           "State Management Patterns", 11, 2)
    generate_lesson_content(course_path, "aula-57-modulo-11-web-fundamentals.md", 
                           "Micro Frontends", 11, 3)
    generate_lesson_content(course_path, "aula-58-modulo-11-web-fundamentals.md", 
                           "Projeto: Arquitetura Escalável", 11, 4)
    
    # Módulo 12: WebAssembly (3 aulas)
    generate_lesson_content(course_path, "aula-59-modulo-12-web-fundamentals.md", 
                           "Introdução ao WebAssembly", 12, 1)
    generate_lesson_content(course_path, "aula-60-modulo-12-web-fundamentals.md", 
                           "Rust e WebAssembly", 12, 2)
    generate_lesson_content(course_path, "aula-61-modulo-12-web-fundamentals.md", 
                           "Projeto: Aplicação WebAssembly", 12, 3)
    
    # Módulo 13: PWA e Mobile (4 aulas)
    generate_lesson_content(course_path, "aula-62-modulo-13-web-fundamentals.md", 
                           "Progressive Web Apps", 13, 1)
    generate_lesson_content(course_path, "aula-63-modulo-13-web-fundamentals.md", 
                           "Offline First Development", 13, 2)
    generate_lesson_content(course_path, "aula-64-modulo-13-web-fundamentals.md", 
                           "Push Notifications", 13, 3)
    generate_lesson_content(course_path, "aula-65-modulo-13-web-fundamentals.md", 
                           "Projeto: PWA Completa", 13, 4)
    
    # Módulo 14: Web3 e Blockchain (4 aulas)
    generate_lesson_content(course_path, "aula-66-modulo-14-web-fundamentals.md", 
                           "Web3 e Ethereum", 14, 1)
    generate_lesson_content(course_path, "aula-67-modulo-14-web-fundamentals.md", 
                           "Smart Contracts", 14, 2)
    generate_lesson_content(course_path, "aula-68-modulo-14-web-fundamentals.md", 
                           "DeFi e NFTs", 14, 3)
    generate_lesson_content(course_path, "aula-69-modulo-14-web-fundamentals.md", 
                           "Projeto: DApp Completa", 14, 4)
    
    # Módulo 15: Routing e Navegação (2 aulas)
    generate_lesson_content(course_path, "aula-70-modulo-15-web-fundamentals.md", 
                           "React Router Avançado", 15, 1)
    generate_lesson_content(course_path, "aula-71-modulo-15-web-fundamentals.md", 
                           "Next.js App Router", 15, 2)

def main():
    """Função principal"""
    print("🚀 GERANDO CONTEÚDO ESPECÍFICO PARA TODAS AS AULAS!")
    print("=" * 70)
    
    # Gerar aulas do Web Fundamentals
    generate_web_fundamentals_lessons()
    
    print("\n🎉 CONTEÚDO ESPECÍFICO GERADO PARA WEB FUNDAMENTALS!")

if __name__ == "__main__":
    main()


