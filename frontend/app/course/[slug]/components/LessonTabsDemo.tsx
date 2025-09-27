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
- **Função**: Estrutura e conteúdo das páginas
- **Versões**: HTML5 é a versão atual
- **Características**:
  - Linguagem de marcação
  - Semântica clara
  - Acessibilidade integrada

### CSS (Cascading Style Sheets)
- **Função**: Estilização e layout
- **Recursos modernos**:
  - Flexbox e Grid
  - Animações e transições
  - Responsive design
  - Variáveis CSS

### JavaScript
- **Função**: Interatividade e lógica
- **Características**:
  - Linguagem de programação
  - Executada no navegador
  - Manipulação do DOM
  - Comunicação com servidores

## 🌐 PROTOCOLOS E PADRÕES

### HTTP/HTTPS
- **HTTP**: Protocolo de transferência de hipertexto
- **HTTPS**: Versão segura com criptografia SSL/TLS
- **Métodos**: GET, POST, PUT, DELETE
- **Status codes**: 200, 404, 500, etc.

### DNS (Domain Name System)
- **Função**: Traduzir nomes de domínio em endereços IP
- **Exemplo**: google.com → 142.250.191.14
- **Hierarquia**: .com, .org, .net, .br

## 🚀 EVOLUÇÃO DA WEB

### Web 1.0 (1990-2000)
- Páginas estáticas
- Pouca interatividade
- Foco em conteúdo

### Web 2.0 (2000-2010)
- Páginas dinâmicas
- Interatividade avançada
- Redes sociais
- User-generated content

### Web 3.0 (2010-presente)
- Aplicações web complexas
- Mobile-first
- PWA (Progressive Web Apps)
- Real-time communication

## 💻 AMBIENTE DE DESENVOLVIMENTO

### Ferramentas Essenciais
1. **Editor de código**: VS Code, Sublime Text, Atom
2. **Navegador**: Chrome DevTools, Firefox Developer Tools
3. **Versionamento**: Git, GitHub
4. **Servidor local**: Live Server, http-server

### Extensões Recomendadas
- Live Server
- Prettier
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

## 📝 EXERCÍCIOS PRÁTICOS

### Exercício 1: Estrutura HTML Básica
Crie uma página HTML com:
- DOCTYPE e estrutura básica
- Head com meta tags
- Body com seções semânticas
- Links e imagens

### Exercício 2: Estilização CSS
Adicione CSS para:
- Layout responsivo
- Cores e tipografia
- Espaçamentos
- Efeitos visuais

### Exercício 3: Interatividade JavaScript
Implemente:
- Manipulação do DOM
- Event listeners
- Validação de formulários
- Comunicação com APIs

## 🎯 PRÓXIMOS PASSOS

1. **Prática constante**: Crie projetos pequenos
2. **Documentação**: Leia MDN Web Docs
3. **Comunidade**: Participe de fóruns e grupos
4. **Projetos**: Contribua com open source

## 📚 RECURSOS ADICIONAIS

- [MDN Web Docs](https://developer.mozilla.org)
- [W3Schools](https://www.w3schools.com)
- [FreeCodeCamp](https://www.freecodecamp.org)
- [Codecademy](https://www.codecademy.com)

---

**Lembre-se**: O desenvolvimento web é uma jornada de aprendizado contínuo. Pratique regularmente e não tenha medo de experimentar!`,
    duration: 45,
    difficulty: 'beginner',
    completed: false,
    resources: [
        {
            title: 'MDN Web Docs - HTML',
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
            type: 'documentation'
        },
        {
            title: 'CSS-Tricks',
            url: 'https://css-tricks.com',
            type: 'tutorial'
        },
        {
            title: 'JavaScript.info',
            url: 'https://javascript.info',
            type: 'tutorial'
        }
    ],
    exercises: [
        {
            id: 1,
            title: 'Criar página HTML básica',
            description: 'Crie uma página HTML com estrutura semântica',
            points: 10,
            completed: false
        },
        {
            id: 2,
            title: 'Estilizar com CSS',
            description: 'Adicione estilos responsivos à página',
            points: 15,
            completed: false
        },
        {
            id: 3,
            title: 'Adicionar JavaScript',
            description: 'Implemente interatividade básica',
            points: 20,
            completed: false
        }
    ]
};

const LessonTabsDemo: React.FC = () => {
    return (
        <div className="lesson-tabs-demo">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Demonstração das Abas de Aula</h2>
                <p className="text-gray-600">Veja como funciona o sistema de navegação entre aulas</p>
            </div>
            
            <LessonTabs 
                lesson={demoLesson}
                onComplete={() => console.log('Aula completada!')}
                onExerciseComplete={(exerciseId) => console.log('Exercício completado:', exerciseId)}
            />
        </div>
    );
};

export default LessonTabsDemo;