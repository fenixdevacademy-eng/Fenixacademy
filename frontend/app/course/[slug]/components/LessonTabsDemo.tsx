'use client';

import React from 'react';
import LessonTabs from './LessonTabs';

// Dados de exemplo para demonstração
const demoLesson = {
    id: 1,
    title: 'Aula 1: Introdução ao Desenvolvimento Web e Internet',
    content: `# 🌐 INTRODUÇÃO AO DESENVOLVIMENTO WEB E INTERNET

## 🎯 OBJETIVOS DA AULA
- Compreender os fundamentos da internet e world wide web
- Entender o modelo cliente-servidor
- Conhecer as tecnologias fundamentais do desenvolvimento web
- Configurar ambiente de desenvolvimento profissional

## 📚 FUNDAMENTOS DA INTERNET

### O que é a Internet?
A internet é uma rede global de computadores interconectados que permite a troca de informações através de protocolos padronizados.

### Como funciona a Internet?
\`\`\`
Usuário → ISP → Backbone → ISP → Usuário
   ↓         ↓        ↓       ↓      ↓
Cliente → Roteador → Internet → Roteador → Servidor
\`\`\`

## 🌐 WORLD WIDE WEB (WWW)

### O que é a Web?
A World Wide Web é um sistema de documentos interligados acessíveis via internet. Foi criada por Tim Berners-Lee em 1989 no CERN.

### Arquitetura da Web
\`\`\`
┌─────────────┐    HTTP Request     ┌─────────────┐
│  Cliente    │ ──────────────────→ │   Servidor  │
│ (Navegador) │                     │    Web      │
└─────────────┘    HTTP Response    └─────────────┘
       ↑                                    ↑
       │                                    │
       └─────────── HTML / CSS / JS ────────────┘
\`\`\`

## 🏗️ MODELO CLIENTE-SERVIDOR

### Cliente (Frontend)
- **Navegador web**: Chrome, Firefox, Safari, Edge
- **Responsabilidades**: 
  - Enviar requisições HTTP
  - Interpretar HTML, CSS e JavaScript
  - Renderizar páginas web
  - Gerenciar estado da aplicação

### Servidor (Backend)
- **Servidor web**: Apache, Nginx, IIS
- **Responsabilidades**:
  - Processar requisições HTTP
  - Executar lógica de negócio
  - Gerenciar banco de dados
  - Retornar respostas ao cliente

## 🛠️ TECNOLOGIAS FUNDAMENTAIS

### HTML (HyperText Markup Language)
- Linguagem de marcação para estruturar conteúdo
- Define a estrutura semântica da página
- Versão atual: HTML5

### CSS (Cascading Style Sheets)
- Linguagem de estilização
- Controla aparência e layout
- Versão atual: CSS3

### JavaScript
- Linguagem de programação
- Adiciona interatividade
- Versão atual: ES2022+

## 🌍 HISTÓRIA E EVOLUÇÃO

### Linha do Tempo
- **1989**: Criação da WWW por Tim Berners-Lee
- **1991**: Primeira página web
- **1993**: Navegador Mosaic
- **1995**: JavaScript criado por Brendan Eich
- **2008**: HTML5 iniciado
- **2014**: HTML5 finalizado
- **2020**: Web APIs modernas

### Padrões Web
- **W3C**: World Wide Web Consortium
- **WHATWG**: Web Hypertext Application Technology Working Group
- **ECMAScript**: Padrão JavaScript

## 🎯 PRÓXIMOS PASSOS

Na próxima aula, vamos:
- Configurar ambiente de desenvolvimento
- Criar primeira página HTML
- Entender estrutura de documentos web
- Explorar ferramentas de desenvolvedor

### 💡 Dicas de Estudo
1. **Pratique regularmente** - Código todos os dias
2. **Experimente** - Não tenha medo de testar
3. **Documente** - Mantenha um caderno de anotações
4. **Colabore** - Participe de comunidades online
5. **Mantenha-se atualizado** - Web evolui constantemente

Agora você tem uma base sólida sobre o que é desenvolvimento web! 🚀`,

    exercises: [
        {
            id: 1,
            title: "Quiz de Fundamentos HTML",
            type: "quiz" as const,
            description: "Teste seus conhecimentos sobre HTML básico",
            questions: [
                {
                    question: "Qual tag HTML é usada para criar um link?",
                    options: ["<link>", "<a>", "<href>", "<url>"],
                    correct: 1,
                    explanation: "A tag <a> é usada para criar links em HTML. O atributo href especifica o destino do link."
                },
                {
                    question: "Qual é a estrutura básica de um documento HTML?",
                    options: ["<html><head><body>", "<doctype><html><head><body>", "<html><body>", "<head><body>"],
                    correct: 1,
                    explanation: "A estrutura básica inclui <!DOCTYPE html>, <html>, <head> e <body>."
                }
            ]
        },
        {
            id: 2,
            title: "Criar Página HTML Semântica",
            type: "practical" as const,
            description: "Implemente uma página HTML usando tags semânticas",
            instructions: [
                "Crie um arquivo HTML com estrutura básica",
                "Use tags semânticas como <header>, <nav>, <main>, <section>",
                "Adicione conteúdo relevante em cada seção",
                "Teste a validação HTML"
            ],
            expectedOutcome: "Uma página HTML válida com estrutura semântica adequada",
            requirements: ["HTML5 válido", "Tags semânticas", "Conteúdo estruturado"],
            difficulty: "iniciante",
            estimatedTime: "30 minutos"
        },
        {
            id: 3,
            title: "Desafio de Layout Responsivo",
            type: "challenge" as const,
            description: "Crie um layout que se adapte a diferentes tamanhos de tela",
            instructions: [
                "Implemente um design responsivo",
                "Use media queries para diferentes breakpoints",
                "Teste em dispositivos móveis e desktop"
            ],
            expectedOutcome: "Layout que funciona perfeitamente em todos os dispositivos",
            requirements: ["Design responsivo", "Media queries", "Testes cross-device"],
            difficulty: "intermediário",
            estimatedTime: "45 minutos",
            bonusPoints: 50
        }
    ],

    projects: [
        {
            id: 1,
            title: "Portfolio Pessoal - Primeira Versão",
            type: "individual" as const,
            description: "Crie seu primeiro portfolio web básico",
            objectives: [
                "Aplicar conceitos de HTML semântico",
                "Criar estrutura básica de página",
                "Implementar navegação simples",
                "Adicionar informações pessoais e projetos"
            ],
            deliverables: [
                "Página HTML válida",
                "Estrutura semântica correta",
                "Navegação funcional",
                "Conteúdo organizado"
            ],
            technologies: ["HTML5", "CSS básico"],
            estimatedTime: "4 horas",
            difficulty: "iniciante",
            submissionDate: "2024-12-20",
            maxScore: 100
        },
        {
            id: 2,
            title: "Blog de Tecnologia",
            type: "individual" as const,
            description: "Desenvolva um blog sobre desenvolvimento web",
            objectives: [
                "Criar múltiplas páginas HTML",
                "Implementar sistema de navegação",
                "Estruturar conteúdo de artigos",
                "Adicionar formulário de contato"
            ],
            deliverables: [
                "Página inicial do blog",
                "Página de artigo de exemplo",
                "Página sobre",
                "Formulário de contato",
                "Navegação entre páginas"
            ],
            technologies: ["HTML5", "CSS básico", "Formulários"],
            estimatedTime: "6 horas",
            difficulty: "iniciante",
            submissionDate: "2024-12-25",
            maxScore: 150
        }
    ],

    fenixIDE: {
        enabled: true,
        defaultCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Primeira Página Web</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        header {
            background: #f4f4f4;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
        }
        nav {
            background: #333;
            padding: 10px;
            border-radius: 5px;
            margin: 20px 0;
        }
        nav a {
            color: white;
            text-decoration: none;
            margin: 0 10px;
        }
        nav a:hover {
            color: #ddd;
        }
        .content {
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
        }
    </style>
</head>
<body>
    <header>
        <h1>🌐 Bem-vindo ao Mundo Web!</h1>
        <p>Sua primeira página HTML criada com sucesso!</p>
    </header>
    
    <nav>
        <a href="#inicio">Início</a>
        <a href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>
    </nav>
    
    <div class="content">
        <h2 id="inicio">🎯 O que é Desenvolvimento Web?</h2>
        <p>Desenvolvimento web é o processo de criar sites e aplicações web. Envolve:</p>
        <ul>
            <li><strong>HTML:</strong> Estrutura e conteúdo</li>
            <li><strong>CSS:</strong> Estilo e apresentação</li>
            <li><strong>JavaScript:</strong> Interatividade e funcionalidade</li>
        </ul>
        
        <h2 id="sobre">🚀 Por que Aprender Web?</h2>
        <p>O desenvolvimento web oferece:</p>
        <ul>
            <li>Oportunidades de carreira</li>
            <li>Criatividade e inovação</li>
            <li>Impacto global</li>
            <li>Aprendizado contínuo</li>
        </ul>
        
        <h2 id="contato">📧 Vamos Conversar!</h2>
        <p>Quer saber mais sobre desenvolvimento web? Entre em contato!</p>
        <form>
            <label for="nome">Nome:</label><br>
            <input type="text" id="nome" name="nome"><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email"><br>
            <label for="mensagem">Mensagem:</label><br>
            <textarea id="mensagem" name="mensagem" rows="4"></textarea><br>
            <button type="submit">Enviar</button>
        </form>
    </div>
    
    <footer>
        <p>&copy; 2024 - Seu Nome - Desenvolvedor Web</p>
    </footer>
</body>
</html>`,
        challenges: [
            {
                title: "Desafio 1: Personalizar o Tema",
                description: "Mude as cores e estilos da página para refletir sua personalidade",
                hints: [
                    "Modifique as propriedades CSS de cor",
                    "Experimente com diferentes fontes",
                    "Adicione gradientes ou sombras"
                ],
                difficulty: "fácil",
                estimatedTime: "15 minutos"
            },
            {
                title: "Desafio 2: Adicionar Seções",
                description: "Crie novas seções como 'Habilidades' e 'Projetos'",
                hints: [
                    "Use tags semânticas como <section>",
                    "Mantenha a estrutura HTML consistente",
                    "Aplique estilos CSS apropriados"
                ],
                difficulty: "médio",
                estimatedTime: "30 minutos"
            },
            {
                title: "Desafio 3: Responsividade",
                description: "Torne a página responsiva para dispositivos móveis",
                hints: [
                    "Use media queries CSS",
                    "Ajuste tamanhos de fonte e espaçamentos",
                    "Teste em diferentes resoluções"
                ],
                difficulty: "intermediário",
                estimatedTime: "45 minutos"
            }
        ],
        features: {
            livePreview: true,
            autoSave: true,
            collaboration: false,
            syntaxHighlighting: true,
            codeCompletion: true,
            errorChecking: true,
            themes: ["light", "dark", "monokai"],
            fontSize: "14px"
        },
        templates: [
            {
                name: "Página Básica",
                description: "Estrutura HTML5 básica com CSS",
                code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Olá, Mundo!</h1>
        <p>Esta é minha primeira página web.</p>
    </div>
</body>
</html>`
            },
            {
                name: "Formulário de Contato",
                description: "Formulário HTML com validação básica",
                code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário de Contato</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .form-container { max-width: 500px; margin: 0 auto; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; }
        input, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>Entre em Contato</h2>
        <form>
            <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="mensagem">Mensagem:</label>
                <textarea id="mensagem" name="mensagem" rows="4" required></textarea>
            </div>
            <button type="submit">Enviar</button>
        </form>
    </div>
</body>
</html>`
            }
        ]
    },

    resources: [
        {
            title: "MDN Web Docs - HTML",
            url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML",
            description: "Documentação oficial do HTML no MDN",
            type: "documentation" as const,
            difficulty: "iniciante" as const,
            language: "pt-BR" as const
        },
        {
            title: "W3Schools - HTML Tutorial",
            url: "https://www.w3schools.com/html/",
            description: "Tutorial interativo de HTML para iniciantes",
            type: "tutorial" as const,
            difficulty: "iniciante" as const,
            language: "en" as const
        },
        {
            title: "HTML5 Doctor",
            url: "http://html5doctor.com/",
            description: "Blog com artigos sobre HTML5 e semântica",
            type: "blog" as const,
            difficulty: "intermediário" as const,
            language: "en" as const
        },
        {
            title: "Can I Use",
            url: "https://caniuse.com/",
            description: "Verificar suporte de recursos HTML5 nos navegadores",
            type: "tool" as const,
            difficulty: "todos" as const,
            language: "en" as const
        },
        {
            title: "HTML Validator",
            url: "https://validator.w3.org/",
            description: "Validador oficial de HTML do W3C",
            type: "tool" as const,
            difficulty: "todos" as const,
            language: "en" as const
        },
        {
            title: "FreeCodeCamp - HTML",
            url: "https://www.freecodecamp.org/learn/responsive-web-design/",
            description: "Curso gratuito de HTML e CSS responsivo",
            type: "curso" as const,
            difficulty: "iniciante" as const,
            language: "en" as const
        },
        {
            title: "YouTube - Curso HTML Completo",
            url: "https://www.youtube.com/watch?v=Ejkb_YpuHWs",
            description: "Curso completo de HTML em português",
            type: "vídeo" as const,
            difficulty: "iniciante" as const,
            language: "pt-BR" as const
        }
    ],

    progress: {
        contentCompleted: false,
        exercisesCompleted: 0,
        projectsCompleted: 0,
        challengesCompleted: 0,
        totalScore: 0,
        maxScore: 300,
        timeSpent: 0,
        lastAccessed: null
    },

    achievements: [
        {
            id: "first_lesson",
            title: "Primeira Aula",
            description: "Completou sua primeira aula de desenvolvimento web",
            icon: "🎯",
            unlocked: false
        },
        {
            id: "html_master",
            title: "Mestre HTML",
            description: "Completou todos os exercícios de HTML",
            icon: "🏆",
            unlocked: false
        },
        {
            id: "project_complete",
            title: "Projetista",
            description: "Completou seu primeiro projeto web",
            icon: "🚀",
            unlocked: false
        }
    ]
};

export default function LessonTabsDemo() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {demoLesson.title}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Demonstração das abas de funcionalidades integradas
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <LessonTabs lesson={demoLesson} />
            </div>
        </div>
    );
}

