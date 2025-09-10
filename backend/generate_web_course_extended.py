#!/usr/bin/env python3
"""
Script para gerar automaticamente 20 arquivos .md para o curso de Web Fundamentals
Organizado por níveis: Iniciante, Intermediário, Avançado
Estilo CS50 com conteúdo prático e teórico
"""

import os
import json
from datetime import datetime

def create_directory_structure():
    """Cria a estrutura de diretórios para o curso"""
    directories = [
        "web-fundamentals-extended",
        "web-fundamentals-extended/iniciante",
        "web-fundamentals-extended/intermediario", 
        "web-fundamentals-extended/avancado"
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✅ Diretório criado: {directory}")

def get_extended_course_content():
    """Retorna o conteúdo expandido do curso com 20 aulas"""
    return {
        "iniciante": [
            {
                "title": "Aula 1: Introdução ao HTML",
                "filename": "01-introducao-html.md",
                "content": """# 🌐 Aula 1: Introdução ao HTML
## Web Fundamentals - Nível Iniciante

⏱️ **Duração**: 45 min  
🎯 **Objetivos**: 4  
🧪 **Exercícios**: 3  

---

## 🎯 Objetivos de Aprendizado
- ✅ Compreender a estrutura básica do HTML
- ✅ Criar páginas web simples
- ✅ Entender tags e elementos fundamentais
- ✅ Aplicar boas práticas de semântica

---

## 📚 Conteúdo Principal

### 1. 🌟 O que é HTML?
HTML (HyperText Markup Language) é a linguagem de marcação padrão para criar páginas web.

### 2. 🏗️ Estrutura Básica
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha Primeira Página</title>
</head>
<body>
    <h1>Olá, Mundo!</h1>
</body>
</html>
```

---

## 🧪 Exercícios Práticos
- Criar página de apresentação
- Desenvolver receita de culinária
- Construir portfólio simples

---

*Próxima aula: Formulários HTML*
"""
            },
            {
                "title": "Aula 2: Formulários HTML",
                "filename": "02-formularios-html.md",
                "content": """# 📝 Aula 2: Formulários HTML
## Web Fundamentals - Nível Iniciante

⏱️ **Duração**: 50 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Criar formulários HTML funcionais
- ✅ Implementar diferentes tipos de input
- ✅ Aplicar validação básica
- ✅ Entender métodos de envio
- ✅ Criar formulários responsivos

---

## 📚 Conteúdo Principal

### 1. 🌟 Tipos de Input
- Text, email, password
- Checkbox, radio, select
- Date, file, range

### 2. 🏗️ Estrutura de Formulário
```html
<form action="/processar" method="POST">
    <input type="text" name="nome" required>
    <button type="submit">Enviar</button>
</form>
```

---

## 🧪 Exercícios Práticos
- Formulário de cadastro
- Formulário de contato
- Formulário de pesquisa
- Formulário de upload

---

*Próxima aula: Tabelas HTML*
"""
            },
            {
                "title": "Aula 3: Tabelas HTML",
                "filename": "03-tabelas-html.md",
                "content": """# 📊 Aula 3: Tabelas HTML
## Web Fundamentals - Nível Iniciante

⏱️ **Duração**: 40 min  
🎯 **Objetivos**: 4  
🧪 **Exercícios**: 3  

---

## 🎯 Objetivos de Aprendizado
- ✅ Criar tabelas HTML estruturadas
- ✅ Aplicar cabeçalhos e células
- ✅ Mesclar células quando necessário
- ✅ Estilizar tabelas com CSS

---

## 📚 Conteúdo Principal

### 1. 🌟 Estrutura de Tabela
```html
<table>
    <thead>
        <tr>
            <th>Nome</th>
            <th>Idade</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>João</td>
            <td>25</td>
        </tr>
    </tbody>
</table>
```

---

## 🧪 Exercícios Práticos
- Tabela de produtos
- Calendário mensal
- Lista de preços

---

*Próxima aula: Meta Tags e SEO*
"""
            },
            {
                "title": "Aula 4: Meta Tags e SEO",
                "filename": "04-meta-tags-seo.md",
                "content": """# 🔍 Aula 4: Meta Tags e SEO
## Web Fundamentals - Nível Iniciante

⏱️ **Duração**: 35 min  
🎯 **Objetivos**: 3  
🧪 **Exercícios**: 2  

---

## 🎯 Objetivos de Aprendizado
- ✅ Entender o que são meta tags
- ✅ Implementar SEO básico
- ✅ Otimizar para motores de busca

---

## 📚 Conteúdo Principal

### 1. 🌟 Meta Tags Essenciais
```html
<meta name="description" content="Descrição da página">
<meta name="keywords" content="palavras-chave">
<meta name="author" content="Seu Nome">
```

---

## 🧪 Exercícios Práticos
- Otimizar página existente
- Criar meta tags para blog

---

*Próxima aula: Introdução ao CSS*
"""
            },
            {
                "title": "Aula 5: Introdução ao CSS",
                "filename": "05-introducao-css.md",
                "content": """# 🎨 Aula 5: Introdução ao CSS
## Web Fundamentals - Nível Iniciante

⏱️ **Duração**: 55 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Compreender seletores CSS
- ✅ Aplicar propriedades básicas
- ✅ Entender o modelo de caixa
- ✅ Criar layouts simples
- ✅ Aplicar cores e tipografia

---

## 📚 Conteúdo Principal

### 1. 🌟 Seletores CSS
```css
/* Seletor de elemento */
h1 { color: blue; }

/* Seletor de classe */
.destaque { background: yellow; }

/* Seletor de ID */
#header { font-size: 24px; }
```

---

## 🧪 Exercícios Práticos
- Estilizar página HTML
- Criar tema de cores
- Layout de blog
- Galeria de imagens

---

*Próxima aula: Layouts com CSS*
"""
            },
            {
                "title": "Aula 6: Layouts com CSS",
                "filename": "06-layouts-css.md",
                "content": """# 🏗️ Aula 6: Layouts com CSS
## Web Fundamentals - Nível Iniciante

⏱️ **Duração**: 60 min  
🎯 **Objetivos**: 4  
🧪 **Exercícios**: 3  

---

## 🎯 Objetivos de Aprendizado
- ✅ Criar layouts com float
- ✅ Aplicar posicionamento CSS
- ✅ Entender z-index
- ✅ Criar layouts responsivos básicos

---

## 📚 Conteúdo Principal

### 1. 🌟 Float e Clear
```css
.left { float: left; width: 50%; }
.right { float: right; width: 50%; }
.clear { clear: both; }
```

---

## 🧪 Exercícios Práticos
- Layout de duas colunas
- Header fixo
- Sidebar lateral

---

*Próxima aula: Responsividade Básica*
"""
            },
            {
                "title": "Aula 7: Responsividade Básica",
                "filename": "07-responsividade-basica.md",
                "content": """# 📱 Aula 7: Responsividade Básica
## Web Fundamentals - Nível Iniciante

⏱️ **Duração**: 45 min  
🎯 **Objetivos**: 3  
🧪 **Exercícios**: 3  

---

## 🎯 Objetivos de Aprendizado
- ✅ Entender media queries
- ✅ Criar layouts mobile-first
- ✅ Adaptar conteúdo para diferentes telas

---

## 📚 Conteúdo Principal

### 1. 🌟 Media Queries
```css
@media (max-width: 768px) {
    .container { width: 100%; }
    .sidebar { display: none; }
}
```

---

## 🧪 Exercícios Práticos
- Layout responsivo
- Menu mobile
- Imagens adaptativas

---

*Próxima aula: JavaScript Básico*
"""
            },
            {
                "title": "Aula 8: JavaScript Básico",
                "filename": "08-javascript-basico.md",
                "content": """# 💻 Aula 8: JavaScript Básico
## Web Fundamentals - Nível Iniciante

⏱️ **Duração**: 65 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Compreender sintaxe JavaScript
- ✅ Trabalhar com variáveis e tipos
- ✅ Criar funções básicas
- ✅ Manipular DOM
- ✅ Tratar eventos

---

## 📚 Conteúdo Principal

### 1. 🌟 Sintaxe Básica
```javascript
let nome = "João";
let idade = 25;

function saudar() {
    alert("Olá, " + nome + "!");
}
```

---

## 🧪 Exercícios Práticos
- Calculadora simples
- Validação de formulário
- Galeria interativa
- Jogo da velha

---

*Próxima aula: Arrays e Objetos*
"""
            }
        ],
        "intermediario": [
            {
                "title": "Aula 1: CSS Avançado e Flexbox",
                "filename": "01-css-avancado-flexbox.md",
                "content": """# 🎨 Aula 1: CSS Avançado e Flexbox
## Web Fundamentals - Nível Intermediário

⏱️ **Duração**: 60 min  
🎯 **Objetivos**: 6  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Dominar Flexbox para layouts flexíveis
- ✅ Criar layouts responsivos avançados
- ✅ Implementar animações CSS complexas
- ✅ Otimizar performance CSS
- ✅ Aplicar design patterns modernos
- ✅ Criar componentes reutilizáveis

---

## 📚 Conteúdo Principal

### 1. 🌟 Flexbox Container
```css
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
```

---

## 🧪 Exercícios Práticos
- Layout de dashboard
- Galeria de imagens flexível
- Formulário multi-step
- Componente de card interativo

---

*Próxima aula: CSS Grid*
"""
            },
            {
                "title": "Aula 2: CSS Grid",
                "filename": "02-css-grid.md",
                "content": """# 🔲 Aula 2: CSS Grid
## Web Fundamentals - Nível Intermediário

⏱️ **Duração**: 70 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Dominar CSS Grid para layouts complexos
- ✅ Criar grids responsivos
- ✅ Trabalhar com áreas nomeadas
- ✅ Implementar layouts magazine
- ✅ Otimizar para diferentes dispositivos

---

## 📚 Conteúdo Principal

### 1. 🌟 Grid Container
```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
}
```

---

## 🧪 Exercícios Práticos
- Layout de revista
- Dashboard administrativo
- Galeria de produtos
- Portfolio criativo

---

*Próxima aula: Animações CSS*
"""
            },
            {
                "title": "Aula 3: Animações CSS",
                "filename": "03-animacoes-css.md",
                "content": """# ✨ Aula 3: Animações CSS
## Web Fundamentals - Nível Intermediário

⏱️ **Duração**: 65 min  
🎯 **Objetivos**: 4  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Criar transições suaves
- ✅ Implementar keyframes
- ✅ Otimizar performance
- ✅ Criar micro-interações

---

## 📚 Conteúdo Principal

### 1. 🌟 Transições
```css
.button {
    transition: all 0.3s ease;
}

.button:hover {
    transform: scale(1.1);
}
```

---

## 🧪 Exercícios Práticos
- Menu animado
- Loading spinner
- Cards interativos
- Navegação fluida

---

*Próxima aula: Sass e Pré-processadores*
"""
            },
            {
                "title": "Aula 4: Sass e Pré-processadores",
                "filename": "04-sass-pre-processadores.md",
                "content": """# 🎯 Aula 4: Sass e Pré-processadores
## Web Fundamentals - Nível Intermediário

⏱️ **Duração**: 55 min  
🎯 **Objetivos**: 4  
🧪 **Exercícios**: 3  

---

## 🎯 Objetivos de Aprendizado
- ✅ Entender vantagens do Sass
- ✅ Trabalhar com variáveis e mixins
- ✅ Organizar código com partials
- ✅ Compilar Sass para CSS

---

## 📚 Conteúdo Principal

### 1. 🌟 Variáveis Sass
```scss
$primary-color: #007bff;
$font-family: 'Arial', sans-serif;

.button {
    background: $primary-color;
    font-family: $font-family;
}
```

---

## 🧪 Exercícios Práticos
- Sistema de design
- Componentes reutilizáveis
- Tema escuro/claro

---

*Próxima aula: JavaScript Intermediário*
"""
            },
            {
                "title": "Aula 5: JavaScript Intermediário",
                "filename": "05-javascript-intermediario.md",
                "content": """# 🚀 Aula 5: JavaScript Intermediário
## Web Fundamentals - Nível Intermediário

⏱️ **Duração**: 75 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Trabalhar com arrays e métodos
- ✅ Implementar funções avançadas
- ✅ Entender closures e escopo
- ✅ Manipular objetos complexos
- ✅ Trabalhar com JSON

---

## 📚 Conteúdo Principal

### 1. 🌟 Métodos de Array
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

---

## 🧪 Exercícios Práticos
- Sistema de carrinho de compras
- Filtros de produtos
- Validação avançada
- Local storage

---

*Próxima aula: APIs e Fetch*
"""
            },
            {
                "title": "Aula 6: APIs e Fetch",
                "filename": "06-apis-fetch.md",
                "content": """# 🌐 Aula 6: APIs e Fetch
## Web Fundamentals - Nível Intermediário

⏱️ **Duração**: 70 min  
🎯 **Objetivos**: 4  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Consumir APIs REST
- ✅ Trabalhar com Fetch API
- ✅ Tratar respostas e erros
- ✅ Implementar cache básico

---

## 📚 Conteúdo Principal

### 1. 🌟 Fetch API
```javascript
fetch('https://api.exemplo.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

---

## 🧪 Exercícios Práticos
- Cliente de API
- Sistema de busca
- Dashboard com dados externos
- App de clima

---

*Próxima aula: Local Storage e Session Storage*
"""
            }
        ],
        "avancado": [
            {
                "title": "Aula 1: JavaScript Moderno ES6+",
                "filename": "01-javascript-moderno-es6.md",
                "content": """# 🚀 Aula 1: JavaScript Moderno ES6+
## Web Fundamentals - Nível Avançado

⏱️ **Duração**: 75 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 5  

---

## 🎯 Objetivos de Aprendizado
- ✅ Dominar recursos ES6+ do JavaScript
- ✅ Implementar Promises e Async/Await
- ✅ Criar aplicações modulares
- ✅ Aplicar padrões de design modernos
- ✅ Otimizar performance e memória
- ✅ Implementar testes automatizados
- ✅ Criar APIs RESTful
- ✅ Deploy em produção

---

## 📚 Conteúdo Principal

### 1. 🌟 Arrow Functions
```javascript
const multiply = (a, b) => a * b;
const processUser = (user) => {
    const { name, age } = user;
    return { ...user, isAdult: age >= 18 };
};
```

---

## 🧪 Exercícios Práticos
- Sistema de gerenciamento de usuários
- API REST com Fetch
- Sistema de eventos
- Módulo de utilitários
- Aplicação SPA completa

---

*Próxima aula: Módulos ES6*
"""
            },
            {
                "title": "Aula 2: Módulos ES6",
                "filename": "02-modulos-es6.md",
                "content": """# 📦 Aula 2: Módulos ES6
## Web Fundamentals - Nível Avançado

⏱️ **Duração**: 60 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Trabalhar com módulos ES6
- ✅ Organizar código em arquivos
- ✅ Implementar import/export
- ✅ Criar bibliotecas reutilizáveis
- ✅ Otimizar carregamento

---

## 📚 Conteúdo Principal

### 1. 🌟 Export/Import
```javascript
// math.js
export const add = (a, b) => a + b;
export default function divide(a, b) { return a / b; }

// main.js
import { add } from './math.js';
import divide from './math.js';
```

---

## 🧪 Exercícios Práticos
- Sistema de módulos
- Biblioteca de utilitários
- Plugin system
- Lazy loading

---

*Próxima aula: Promises e Async/Await*
"""
            },
            {
                "title": "Aula 3: Promises e Async/Await",
                "filename": "03-promises-async-await.md",
                "content": """# ⏳ Aula 3: Promises e Async/Await
## Web Fundamentals - Nível Avançado

⏱️ **Duração**: 80 min  
🎯 **Objetivos**: 6  
🧪 **Exercícios**: 5  

---

## 🎯 Objetivos de Aprendizado
- ✅ Dominar Promises
- ✅ Implementar Async/Await
- ✅ Tratar erros assíncronos
- ✅ Criar operações paralelas
- ✅ Implementar retry logic
- ✅ Otimizar performance

---

## 📚 Conteúdo Principal

### 1. 🌟 Promises
```javascript
const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        if (id > 0) {
            resolve({ id, name: 'Usuário' });
        } else {
            reject(new Error('ID inválido'));
        }
    });
};
```

---

## 🧪 Exercícios Práticos
- Sistema de cache
- Upload de múltiplos arquivos
- Operações em lote
- Sistema de filas
- API com retry

---

*Próxima aula: Classes e Herança*
"""
            },
            {
                "title": "Aula 4: Classes e Herança",
                "filename": "04-classes-heranca.md",
                "content": """# 🏗️ Aula 4: Classes e Herança
## Web Fundamentals - Nível Avançado

⏱️ **Duração**: 70 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Criar classes ES6
- ✅ Implementar herança
- ✅ Usar getters e setters
- ✅ Aplicar polimorfismo
- ✅ Criar classes abstratas

---

## 📚 Conteúdo Principal

### 1. 🌟 Classes ES6
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} faz som`;
    }
}

class Dog extends Animal {
    speak() {
        return `${this.name} late: Au au!`;
    }
}
```

---

## 🧪 Exercícios Práticos
- Sistema de formas geométricas
- Gerenciador de usuários
- Sistema de pagamentos
- Biblioteca de componentes

---

*Próxima aula: Padrões de Design*
"""
            },
            {
                "title": "Aula 5: Padrões de Design",
                "filename": "05-padroes-design.md",
                "content": """# 🎭 Aula 5: Padrões de Design
## Web Fundamentals - Nível Avançado

⏱️ **Duração**: 85 min  
🎯 **Objetivos**: 6  
🧪 **Exercícios**: 5  

---

## 🎯 Objetivos de Aprendizado
- ✅ Implementar Factory Pattern
- ✅ Usar Observer Pattern
- ✅ Aplicar Singleton Pattern
- ✅ Criar Module Pattern
- ✅ Implementar Strategy Pattern
- ✅ Criar sistemas escaláveis

---

## 📚 Conteúdo Principal

### 1. 🌟 Factory Pattern
```javascript
const createUser = (type, data) => {
    switch (type) {
        case 'admin':
            return { ...data, role: 'admin', permissions: ['all'] };
        case 'user':
            return { ...data, role: 'user', permissions: ['read'] };
    }
};
```

---

## 🧪 Exercícios Práticos
- Sistema de plugins
- Event system
- Config manager
- Logger system
- Cache manager

---

*Próxima aula: Testes e Debugging*
"""
            },
            {
                "title": "Aula 6: Testes e Debugging",
                "filename": "06-testes-debugging.md",
                "content": """# 🧪 Aula 6: Testes e Debugging
## Web Fundamentals - Nível Avançado

⏱️ **Duração**: 75 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Escrever testes unitários
- ✅ Implementar testes de integração
- ✅ Usar ferramentas de debugging
- ✅ Profiling de performance
- ✅ Debugging em produção

---

## 📚 Conteúdo Principal

### 1. 🌟 Jest Testing
```javascript
describe('Calculator', () => {
    test('adds two numbers', () => {
        expect(add(2, 3)).toBe(5);
    });
    
    test('handles negative numbers', () => {
        expect(add(-1, 1)).toBe(0);
    });
});
```

---

## 🧪 Exercícios Práticos
- Suite de testes completa
- Testes de API
- Performance testing
- Debugging complexo

---

*Próxima aula: Build Tools e Bundlers*
"""
            }
        ]
    }

def generate_extended_markdown_files():
    """Gera todos os arquivos .md do curso expandido"""
    course_content = get_extended_course_content()
    
    total_files = 0
    for level, lessons in course_content.items():
        print(f"\n📁 Gerando arquivos para nível: {level.upper()}")
        
        for lesson in lessons:
            filename = f"web-fundamentals-extended/{level}/{lesson['filename']}"
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(lesson['content'])
            
            print(f"✅ Arquivo criado: {filename}")
            total_files += 1
    
    print(f"\n🎉 Total de {total_files} arquivos criados!")

def create_extended_readme():
    """Cria um README principal para o curso expandido"""
    readme_content = """# 🌐 Web Fundamentals - Curso Completo Expandido
## 20 Aulas Organizadas por Níveis

Este curso foi gerado automaticamente com conteúdo estilo CS50, organizado em três níveis de dificuldade.

---

## 📚 Estrutura do Curso

### 🟢 **NÍVEL INICIANTE** (8 aulas)
- **Aula 1**: Introdução ao HTML
- **Aula 2**: Formulários HTML
- **Aula 3**: Tabelas HTML
- **Aula 4**: Meta Tags e SEO
- **Aula 5**: Introdução ao CSS
- **Aula 6**: Layouts com CSS
- **Aula 7**: Responsividade Básica
- **Aula 8**: JavaScript Básico

### 🟡 **NÍVEL INTERMEDIÁRIO** (6 aulas)
- **Aula 1**: CSS Avançado e Flexbox
- **Aula 2**: CSS Grid
- **Aula 3**: Animações CSS
- **Aula 4**: Sass e Pré-processadores
- **Aula 5**: JavaScript Intermediário
- **Aula 6**: APIs e Fetch

### 🔴 **NÍVEL AVANÇADO** (6 aulas)
- **Aula 1**: JavaScript Moderno ES6+
- **Aula 2**: Módulos ES6
- **Aula 3**: Promises e Async/Await
- **Aula 4**: Classes e Herança
- **Aula 5**: Padrões de Design
- **Aula 6**: Testes e Debugging

---

## 🎯 Características do Curso

- **20 Aulas Completas**: Conteúdo abrangente e progressivo
- **Conteúdo Prático**: Exemplos de código funcionais
- **Exercícios Desafiadores**: Projetos para aplicar o conhecimento
- **Progressão Lógica**: Do básico ao avançado
- **Estilo CS50**: Metodologia comprovada de Harvard
- **Responsivo**: Funciona em qualquer dispositivo

---

## 🚀 Como Usar

1. **Navegue pelos níveis** de acordo com seu conhecimento
2. **Complete as aulas** em ordem sequencial
3. **Implemente os exercícios** para fixar o aprendizado
4. **Teste os projetos** em diferentes dispositivos
5. **Avance para o próximo nível** quando estiver confiante

---

## 📁 Estrutura de Arquivos

```
web-fundamentals-extended/
├── iniciante/ (8 aulas)
├── intermediario/ (6 aulas)
└── avancado/ (6 aulas)
```

---

## 🎓 Pré-requisitos

- **Iniciante**: Nenhum conhecimento prévio necessário
- **Intermediário**: Conhecimento básico de HTML e CSS
- **Avançado**: Domínio de HTML, CSS e JavaScript básico

---

## 🔧 Tecnologias Abordadas

- **HTML5**: Semântica, formulários, tabelas, SEO
- **CSS3**: Flexbox, Grid, Animações, Sass
- **JavaScript ES6+**: Módulos, Promises, Classes, Padrões
- **Responsividade**: Mobile-first design
- **Performance**: Otimização e boas práticas
- **Testes**: Jest, debugging, profiling

---

## 📝 Licença

Este curso é livre para uso educacional e pessoal.

---

*Gerado automaticamente em {datetime.now().strftime('%d/%m/%Y às %H:%M')}*
"""
    
    with open("web-fundamentals-extended/README.md", 'w', encoding='utf-8') as f:
        f.write(readme_content)
    
    print("✅ README.md expandido criado com sucesso!")

def main():
    """Função principal do script"""
    print("🚀 Iniciando geração do curso Web Fundamentals Expandido...")
    print("=" * 60)
    
    # Criar estrutura de diretórios
    create_directory_structure()
    
    # Gerar arquivos .md expandidos
    generate_extended_markdown_files()
    
    # Criar README expandido
    create_extended_readme()
    
    print("\n" + "=" * 60)
    print("🎉 Curso Web Fundamentals Expandido gerado com sucesso!")
    print("📁 Verifique a pasta 'web-fundamentals-extended' para ver todos os 20 arquivos.")
    print("🌐 Abra o README.md para começar sua jornada de aprendizado!")

if __name__ == "__main__":
    main()

