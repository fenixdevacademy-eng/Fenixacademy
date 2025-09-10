#!/usr/bin/env python3
"""
Script para corrigir o conteúdo markdown do Web Fundamentals
"""

def generate_correct_web_fundamentals_content():
    """Gera o conteúdo correto para Web Fundamentals"""
    
    modules = [
        "JavaScript Avançado (ES6+)",
        "React.js e Componentes", 
        "Node.js e APIs RESTful",
        "Banco de Dados e ORMs",
        "Autenticação e Segurança",
        "Performance e SEO",
        "PWA e Service Workers",
        "Deploy e DevOps para Web",
        "TypeScript",
        "Testing e Debugging",
        "State Management",
        "Routing e Navegação",
        "CSS Grid e Flexbox",
        "Web APIs Modernas",
        "WebAssembly",
        "Progressive Web Apps",
        "Web Security",
        "Performance Optimization",
        "Accessibility",
        "Internationalization"
    ]
    
    content = [
        "# Web Fundamentals - Curso Avançado",
        "",
        "## Visão Geral",
        "Este curso abrange os conceitos mais avançados de desenvolvimento web, preparando você para criar aplicações modernas e responsivas.",
        "",
        "## Objetivos do Curso",
        "- Dominar tecnologias modernas de desenvolvimento web",
        "- Criar aplicações responsivas e performáticas", 
        "- Implementar boas práticas de desenvolvimento",
        "- Deploy e DevOps para web",
        "",
        "---",
        ""
    ]
    
    for i, module in enumerate(modules, 1):
        module_slug = module.lower().replace(' ', '-').replace('(', '').replace(')', '')
        
        content.extend([
            f"## Módulo {i}: {module}",
            "",
            "### Objetivos de Aprendizagem",
            f"- Dominar as tecnologias modernas de {module}",
            f"- Criar aplicações web responsivas e performáticas",
            f"- Implementar boas práticas de desenvolvimento", 
            f"- Resolver problemas complexos de {module}",
            "",
            "### Conceitos Principais",
            f"#### 1. Fundamentos de {module}",
            f"O {module} representa as melhores práticas em desenvolvimento web moderno.",
            "",
            "#### 2. Arquitetura e Padrões",
            "A arquitetura inclui:",
            "- Separação de responsabilidades",
            "- Padrões de design reutilizáveis", 
            "- Sistema de roteamento",
            "- Gerenciamento de estado",
            "",
            "#### 3. Implementação Prática",
            "```javascript",
            f"// Exemplo de implementação {module}",
            f"const {module_slug} = {{",
            "  init() {",
            "    // Implementação",
            "  }",
            "};",
            "```",
            "",
            "### Exercícios Práticos",
            f"- **Exercício Básico**: Crie componentes {module}",
            f"- **Exercício Intermediário**: Implemente funcionalidades avançadas",
            f"- **Exercício Avançado**: Desenvolva uma aplicação completa",
            "",
            "### Projeto Final",
            "Crie uma aplicação web moderna com:",
            "- Interface responsiva e acessível",
            "- Funcionalidades avançadas", 
            "- Performance otimizada",
            "- Código limpo e documentado",
            "",
            "---",
            ""
        ])
    
    return "\n".join(content)

def main():
    """Função principal"""
    print("🚀 Gerando conteúdo correto para Web Fundamentals...")
    
    content = generate_correct_web_fundamentals_content()
    
    # Salvar o conteúdo em um arquivo
    output_file = "web-fundamentals-corrected.md"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Conteúdo gerado e salvo em: {output_file}")
    print(f"📊 Total de módulos: 20")
    print(f"📝 Tamanho do arquivo: {len(content)} caracteres")

if __name__ == "__main__":
    main()






