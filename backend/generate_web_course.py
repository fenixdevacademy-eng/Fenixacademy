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
        "web-fundamentals",
        "web-fundamentals/iniciante",
        "web-fundamentals/intermediario", 
        "web-fundamentals/avancado"
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✅ Diretório criado: {directory}")

def get_course_content():
    """Retorna o conteúdo estruturado do curso"""
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
HTML (HyperText Markup Language) é a linguagem de marcação padrão para criar páginas web. É a espinha dorsal de qualquer site.

**Características principais:**
- Linguagem de marcação, não de programação
- Define a estrutura e conteúdo da página
- Trabalha em conjunto com CSS e JavaScript
- Padrão web universal

### 2. 🏗️ Estrutura Básica de uma Página HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Primeira Página</title>
</head>
<body>
    <h1>Olá, Mundo!</h1>
    <p>Esta é minha primeira página web.</p>
</body>
</html>
```

**Elementos essenciais:**
- `<!DOCTYPE html>`: Declaração do tipo de documento
- `<html>`: Elemento raiz da página
- `<head>`: Metadados e configurações
- `<body>`: Conteúdo visível da página

### 3. 🏷️ Tags Fundamentais

#### **Cabeçalhos (Headings)**
```html
<h1>Título Principal</h1>
<h2>Subtítulo</h2>
<h3>Seção</h3>
<h4>Subseção</h4>
<h5>Item</h5>
<h6>Subitem</h6>
```

#### **Parágrafos e Texto**
```html
<p>Este é um parágrafo de texto.</p>
<strong>Texto em negrito</strong>
<em>Texto em itálico</em>
<br>Quebra de linha
<hr>Linha horizontal
```

#### **Listas**
```html
<!-- Lista não ordenada -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>

<!-- Lista ordenada -->
<ol>
    <li>Primeiro passo</li>
    <li>Segundo passo</li>
    <li>Terceiro passo</li>
</ol>
```

### 4. 🔗 Links e Imagens

#### **Links**
```html
<!-- Link externo -->
<a href="https://www.google.com">Ir para Google</a>

<!-- Link interno -->
<a href="#secao">Ir para seção</a>

<!-- Link com atributo target -->
<a href="https://www.exemplo.com" target="_blank">Abrir em nova aba</a>
```

#### **Imagens**
```html
<img src="imagem.jpg" alt="Descrição da imagem" width="300" height="200">
```

**Atributos importantes:**
- `src`: Caminho da imagem
- `alt`: Texto alternativo (acessibilidade)
- `width/height`: Dimensões (opcional)

---

## 🧪 Exercícios Práticos

### **Exercício 1: Página de Apresentação**
Crie uma página HTML com:
- Título principal com seu nome
- Foto de perfil
- Lista de hobbies
- Link para suas redes sociais

### **Exercício 2: Receita de Culinária**
Desenvolva uma página com:
- Título da receita
- Lista de ingredientes
- Passos numerados
- Tempo de preparo

### **Exercício 3: Portfólio Simples**
Construa um portfólio básico com:
- Seção "Sobre mim"
- Seção "Projetos"
- Seção "Contato"
- Links de navegação

---

## 💡 Dicas Importantes

1. **Semântica**: Use tags que fazem sentido para o conteúdo
2. **Acessibilidade**: Sempre inclua atributos `alt` em imagens
3. **Validação**: Verifique se seu HTML está válido
4. **Estrutura**: Mantenha uma hierarquia lógica de cabeçalhos

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Formulários HTML
- Tabelas e dados estruturados
- Meta tags e SEO básico
- Validação de formulários

---

## 📝 Checklist de Conclusão

- [ ] Entendeu a estrutura básica do HTML
- [ ] Criou uma página HTML simples
- [ ] Aplicou tags fundamentais
- [ ] Completou os 3 exercícios
- [ ] Testou a validação HTML

**🎉 Parabéns! Você completou a Aula 1 com sucesso!**

---

*Próxima aula: Formulários HTML e Validação*
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

### 1. 🌟 O que são Formulários HTML?
Formulários são elementos que permitem aos usuários inserir e enviar dados para um servidor. São essenciais para interação em sites.

**Casos de uso comuns:**
- Login e registro
- Contato e feedback
- Pesquisas e enquetes
- E-commerce e pagamentos
- Upload de arquivos

### 2. 🏗️ Estrutura Básica de um Formulário

```html
<form action="/processar" method="POST">
    <!-- Campos do formulário aqui -->
    <button type="submit">Enviar</button>
</form>
```

**Atributos principais:**
- `action`: URL para onde os dados serão enviados
- `method`: Método HTTP (GET ou POST)
- `enctype`: Tipo de codificação dos dados

### 3. 🎯 Tipos de Input

#### **Inputs de Texto**
```html
<!-- Campo de texto simples -->
<input type="text" name="nome" placeholder="Digite seu nome">

<!-- Campo de email -->
<input type="email" name="email" required>

<!-- Campo de senha -->
<input type="password" name="senha" minlength="6">

<!-- Campo de número -->
<input type="number" name="idade" min="18" max="100">

<!-- Campo de telefone -->
<input type="tel" name="telefone" pattern="[0-9]{11}">
```

#### **Inputs de Seleção**
```html
<!-- Checkbox -->
<input type="checkbox" name="termos" id="termos">
<label for="termos">Aceito os termos</label>

<!-- Radio buttons -->
<input type="radio" name="genero" value="masculino" id="masc">
<label for="masc">Masculino</label>
<input type="radio" name="genero" value="feminino" id="fem">
<label for="fem">Feminino</label>

<!-- Select dropdown -->
<select name="cidade">
    <option value="">Selecione uma cidade</option>
    <option value="sp">São Paulo</option>
    <option value="rj">Rio de Janeiro</option>
    <option value="bh">Belo Horizonte</option>
</select>
```

#### **Inputs Especiais**
```html
<!-- Data -->
<input type="date" name="nascimento">

<!-- Hora -->
<input type="time" name="horario">

<!-- Cor -->
<input type="color" name="cor_favorita">

<!-- Arquivo -->
<input type="file" name="documento" accept=".pdf,.doc">

<!-- Range -->
<input type="range" name="satisfacao" min="1" max="10">
```

### 4. 🏷️ Labels e Acessibilidade

```html
<!-- Label associado por ID -->
<label for="nome">Nome completo:</label>
<input type="text" id="nome" name="nome">

<!-- Label envolvendo o input -->
<label>
    <input type="checkbox" name="newsletter">
    Receber newsletter
</label>
```

### 5. ✅ Validação HTML5

```html
<!-- Campos obrigatórios -->
<input type="text" name="nome" required>

<!-- Validação de email -->
<input type="email" name="email" required>

<!-- Comprimento mínimo -->
<input type="password" name="senha" minlength="8" required>

<!-- Padrão regex -->
<input type="text" name="cep" pattern="[0-9]{5}-[0-9]{3}" placeholder="00000-000">
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Formulário de Cadastro**
Crie um formulário de cadastro com:
- Nome completo
- Email
- Senha e confirmação
- Data de nascimento
- Aceite dos termos

### **Exercício 2: Formulário de Contato**
Desenvolva um formulário de contato com:
- Nome
- Email
- Assunto (dropdown)
- Mensagem (textarea)
- Botão de envio

### **Exercício 3: Formulário de Pesquisa**
Construa um formulário de pesquisa com:
- Campo de busca
- Filtros por categoria
- Filtros por preço (range)
- Ordenação por relevância

### **Exercício 4: Formulário de Upload**
Crie um formulário para upload com:
- Seleção de arquivo
- Descrição do arquivo
- Categoria
- Tags relacionadas

---

## 💡 Dicas Importantes

1. **Acessibilidade**: Sempre use labels associados aos inputs
2. **Validação**: Combine validação HTML5 com JavaScript
3. **Responsividade**: Teste em diferentes dispositivos
4. **UX**: Forneça feedback visual claro para o usuário

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- CSS básico e estilização
- Layouts responsivos
- Flexbox e Grid
- Animações CSS

---

## 📝 Checklist de Conclusão

- [ ] Entendeu a estrutura de formulários HTML
- [ ] Implementou diferentes tipos de input
- [ ] Aplicou validação HTML5
- [ ] Criou formulários acessíveis
- [ ] Completou os 4 exercícios

**🎉 Parabéns! Você completou a Aula 2 com sucesso!**

---

*Próxima aula: Introdução ao CSS e Estilização*
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

### 1. 🌟 Flexbox: O que é e por que usar?

Flexbox é um modelo de layout CSS que permite criar layouts flexíveis e responsivos de forma mais eficiente que métodos tradicionais.

**Vantagens do Flexbox:**
- Layouts flexíveis e adaptáveis
- Controle preciso sobre alinhamento
- Ordenação de elementos
- Distribuição de espaço automática
- Suporte nativo em todos os navegadores modernos

### 2. 🏗️ Conceitos Fundamentais do Flexbox

#### **Container Flex (Flex Container)**
```css
.flex-container {
    display: flex;
    /* ou display: inline-flex; */
}
```

#### **Itens Flex (Flex Items)**
```css
.flex-item {
    /* Propriedades específicas dos itens */
}
```

### 3. 🎯 Propriedades do Container

#### **Direção do Flex (flex-direction)**
```css
.flex-container {
    flex-direction: row;        /* Padrão: da esquerda para direita */
    flex-direction: row-reverse; /* Da direita para esquerda */
    flex-direction: column;     /* De cima para baixo */
    flex-direction: column-reverse; /* De baixo para cima */
}
```

#### **Quebra de Linha (flex-wrap)**
```css
.flex-container {
    flex-wrap: nowrap;    /* Padrão: não quebra linha */
    flex-wrap: wrap;      /* Quebra para nova linha */
    flex-wrap: wrap-reverse; /* Quebra para linha acima */
}
```

#### **Justificação (justify-content)**
```css
.flex-container {
    justify-content: flex-start;    /* Padrão: início */
    justify-content: flex-end;      /* Fim */
    justify-content: center;        /* Centro */
    justify-content: space-between; /* Espaço entre itens */
    justify-content: space-around;  /* Espaço ao redor */
    justify-content: space-evenly;  /* Espaço igual */
}
```

#### **Alinhamento Vertical (align-items)**
```css
.flex-container {
    align-items: stretch;     /* Padrão: estica */
    align-items: flex-start;  /* Topo */
    align-items: flex-end;    /* Baixo */
    align-items: center;      /* Centro */
    align-items: baseline;    /* Linha base do texto */
}
```

#### **Alinhamento de Múltiplas Linhas (align-content)**
```css
.flex-container {
    align-content: flex-start;
    align-content: flex-end;
    align-content: center;
    align-content: space-between;
    align-content: space-around;
    align-content: stretch; /* Padrão */
}
```

### 4. 🎯 Propriedades dos Itens

#### **Ordem (order)**
```css
.flex-item {
    order: 0; /* Padrão */
    order: 1; /* Move para o final */
    order: -1; /* Move para o início */
}
```

#### **Crescimento (flex-grow)**
```css
.flex-item {
    flex-grow: 0; /* Padrão: não cresce */
    flex-grow: 1; /* Cresce proporcionalmente */
    flex-grow: 2; /* Cresce 2x mais que outros */
}
```

#### **Encolhimento (flex-shrink)**
```css
.flex-item {
    flex-shrink: 1; /* Padrão: encolhe */
    flex-shrink: 0; /* Não encolhe */
    flex-shrink: 2; /* Encolhe 2x mais */
}
```

#### **Base (flex-basis)**
```css
.flex-item {
    flex-basis: auto; /* Padrão: tamanho do conteúdo */
    flex-basis: 200px; /* Largura fixa */
    flex-basis: 50%; /* Percentual */
}
```

#### **Shorthand (flex)**
```css
.flex-item {
    flex: 0 1 auto; /* grow shrink basis */
    flex: 1;        /* 1 1 0% */
    flex: auto;     /* 1 1 auto */
    flex: none;     /* 0 0 auto */
    flex: 2 1 200px; /* grow=2, shrink=1, basis=200px */
}
```

### 5. 🎨 Layouts Práticos com Flexbox

#### **Layout de Navegação**
```css
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #333;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: #007bff;
}
```

#### **Layout de Cards**
```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
}

.card {
    flex: 1 1 300px; /* grow=1, shrink=1, basis=300px */
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 1.5rem;
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}
```

#### **Layout de Formulário**
```css
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.form-row {
    display: flex;
    gap: 1rem;
}

.form-row .form-group {
    flex: 1;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
}
```

### 6. 🚀 Animações CSS Avançadas

#### **Transições Suaves**
```css
.button {
    background: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.button:hover {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,123,255,0.3);
}
```

#### **Animações com Keyframes**
```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.slide-in {
    animation: slideIn 0.6s ease-out;
}
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Layout de Dashboard**
Crie um dashboard responsivo com:
- Header fixo com navegação
- Sidebar lateral colapsável
- Grid de cards principais
- Footer com informações

### **Exercício 2: Galeria de Imagens Flexível**
Desenvolva uma galeria que:
- Se adapta a diferentes tamanhos de tela
- Mantém proporções das imagens
- Inclui overlay com informações
- Suporta diferentes layouts

### **Exercício 3: Formulário Multi-step**
Construa um formulário com:
- Múltiplas etapas
- Navegação entre etapas
- Validação em tempo real
- Indicador de progresso

### **Exercício 4: Componente de Card Interativo**
Crie um card que:
- Inclui imagem, título, descrição
- Tem estados hover e active
- Suporta ações (like, compartilhar)
- É totalmente responsivo

---

## 💡 Dicas Avançadas

1. **Performance**: Use `will-change` para otimizar animações
2. **Acessibilidade**: Mantenha contraste e tamanhos adequados
3. **Responsividade**: Teste em diferentes breakpoints
4. **Reutilização**: Crie classes utilitárias para padrões comuns

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- CSS Grid para layouts complexos
- Custom Properties (CSS Variables)
- CSS-in-JS e metodologias modernas
- Otimização e minificação

---

## 📝 Checklist de Conclusão

- [ ] Dominou os conceitos do Flexbox
- [ ] Criou layouts responsivos avançados
- [ ] Implementou animações CSS complexas
- [ ] Otimizou performance CSS
- [ ] Aplicou design patterns modernos
- [ ] Completou os 4 exercícios

**🎉 Parabéns! Você completou a Aula 1 do nível Intermediário!**

---

*Próxima aula: CSS Grid e Layouts Complexos*
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

### 1. 🌟 JavaScript ES6+: Uma Revolução na Linguagem

ES6 (ECMAScript 2015) introduziu recursos que transformaram JavaScript de uma linguagem simples para uma poderosa ferramenta de desenvolvimento moderno.

**Principais melhorias:**
- Sintaxe mais limpa e expressiva
- Melhor gerenciamento de escopo
- Programação funcional aprimorada
- Módulos nativos
- Classes e herança

### 2. 🏗️ Recursos Fundamentais ES6+

#### **Const e Let**
```javascript
// ES5 - var (hoisting e escopo de função)
var x = 10;
if (true) {
    var x = 20; // Sobrescreve x global
}
console.log(x); // 20

// ES6+ - let e const (escopo de bloco)
let y = 10;
const z = 30;
if (true) {
    let y = 20; // y local
    const z = 40; // Erro! const não pode ser reatribuído
}
console.log(y); // 10
console.log(z); // 30
```

#### **Arrow Functions**
```javascript
// ES5 - function tradicional
function multiply(a, b) {
    return a * b;
}

// ES6+ - arrow function
const multiply = (a, b) => a * b;

// Arrow functions com múltiplas linhas
const processUser = (user) => {
    const { name, age, email } = user;
    const isAdult = age >= 18;
    return { ...user, isAdult, processed: true };
};

// Arrow functions em métodos de array
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

#### **Template Literals**
```javascript
// ES5 - concatenação de strings
var name = "João";
var age = 25;
var message = "Olá, meu nome é " + name + " e tenho " + age + " anos.";

// ES6+ - template literals
const name = "João";
const age = 25;
const message = `Olá, meu nome é ${name} e tenho ${age} anos.`;

// Expressões complexas
const user = { name: "Maria", role: "admin" };
const greeting = `
    Bem-vinda, ${user.name}!
    Seu cargo: ${user.role.toUpperCase()}
    Data: ${new Date().toLocaleDateString('pt-BR')}
`;
```

#### **Destructuring**
```javascript
// Destructuring de arrays
const colors = ['red', 'green', 'blue'];
const [primary, secondary] = colors;
const [first, , third] = colors; // Pula o segundo elemento

// Destructuring de objetos
const user = {
    id: 1,
    name: 'Ana',
    email: 'ana@email.com',
    profile: {
        age: 28,
        city: 'São Paulo'
    }
};

const { name, email, profile: { age, city } } = user;

// Destructuring em parâmetros de função
const createUser = ({ name, email, age = 18 }) => {
    return { id: Date.now(), name, email, age };
};

// Destructuring com valores padrão
const { theme = 'light', language = 'pt-BR' } = settings;
```

#### **Spread e Rest Operators**
```javascript
// Spread operator (...)
const fruits = ['apple', 'banana'];
const moreFruits = [...fruits, 'orange', 'grape'];

const user = { name: 'João', age: 25 };
const userWithEmail = { ...user, email: 'joao@email.com' };

// Rest operator em parâmetros
const sum = (...numbers) => {
    return numbers.reduce((acc, n) => acc + n, 0);
};

// Rest operator em destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
const { name, ...otherProps } = user;
```

### 3. 🔄 Promises e Async/Await

#### **Promises**
```javascript
// Criando uma Promise
const fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: 'Usuário', email: 'user@email.com' });
            } else {
                reject(new Error('ID inválido'));
            }
        }, 1000);
    });
};

// Usando Promises
fetchUserData(1)
    .then(user => {
        console.log('Usuário encontrado:', user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log('Posts do usuário:', posts);
    })
    .catch(error => {
        console.error('Erro:', error.message);
    });
```

#### **Async/Await**
```javascript
// Função assíncrona
const getUserWithPosts = async (userId) => {
    try {
        const user = await fetchUserData(userId);
        const posts = await fetchUserPosts(user.id);
        
        return {
            ...user,
            posts,
            totalPosts: posts.length
        };
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
};

// Usando async/await
const main = async () => {
    try {
        const userData = await getUserWithPosts(1);
        console.log('Dados completos:', userData);
    } catch (error) {
        console.error('Erro na aplicação:', error);
    }
};

main();
```

### 4. 🏗️ Módulos ES6

#### **Exportando Módulos**
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

// Função padrão
export default function divide(a, b) {
    if (b === 0) throw new Error('Divisão por zero');
    return a / b;
}

// Classe
export class Calculator {
    constructor() {
        this.history = [];
    }
    
    calculate(operation, a, b) {
        const result = operation(a, b);
        this.history.push({ operation: operation.name, a, b, result });
        return result;
    }
}
```

#### **Importando Módulos**
```javascript
// main.js
import { add, subtract, Calculator } from './math.js';
import divide from './math.js';

// Import com alias
import { add as sum } from './math.js';

// Import de tudo
import * as MathUtils from './math.js';

// Import dinâmico
const loadModule = async () => {
    const module = await import('./dynamic-module.js');
    module.default();
};
```

### 5. 🎯 Classes e Herança

```javascript
// Classe base
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    speak() {
        return `${this.name} faz algum som`;
    }
    
    get info() {
        return `${this.name} é um ${this.species}`;
    }
    
    set age(value) {
        if (value < 0) throw new Error('Idade não pode ser negativa');
        this._age = value;
    }
}

// Herança
class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'cachorro');
        this.breed = breed;
    }
    
    speak() {
        return `${this.name} late: Au au!`;
    }
    
    fetch() {
        return `${this.name} busca a bola`;
    }
}

// Uso
const dog = new Dog('Rex', 'Golden Retriever');
console.log(dog.speak()); // "Rex late: Au au!"
console.log(dog.info); // "Rex é um cachorro"
dog.age = 5;
```

### 6. 🚀 Padrões Modernos

#### **Factory Pattern**
```javascript
const createUser = (type, userData) => {
    const baseUser = {
        id: Date.now(),
        createdAt: new Date(),
        ...userData
    };
    
    switch (type) {
        case 'admin':
            return {
                ...baseUser,
                role: 'admin',
                permissions: ['read', 'write', 'delete'],
                canDeleteUsers: true
            };
        case 'moderator':
            return {
                ...baseUser,
                role: 'moderator',
                permissions: ['read', 'write'],
                canModerate: true
            };
        default:
            return {
                ...baseUser,
                role: 'user',
                permissions: ['read']
            };
    }
};
```

#### **Observer Pattern**
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

// Uso
const emitter = new EventEmitter();
emitter.on('userLogin', (user) => {
    console.log(`Usuário ${user.name} fez login`);
});
emitter.emit('userLogin', { name: 'João', id: 1 });
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Sistema de Gerenciamento de Usuários**
Crie um sistema com:
- Classe User com herança
- CRUD completo com Promises
- Validação de dados
- Sistema de permissões

### **Exercício 2: API REST com Fetch**
Desenvolva uma API que:
- Consome dados de uma API externa
- Implementa cache local
- Trata erros adequadamente
- Usa async/await

### **Exercício 3: Sistema de Eventos**
Construa um sistema que:
- Emite eventos customizados
- Implementa pub/sub pattern
- Suporta múltiplos listeners
- Tem sistema de prioridades

### **Exercício 4: Módulo de Utilitários**
Crie um módulo com:
- Funções de validação
- Helpers de formatação
- Funções de manipulação de dados
- Sistema de logging

### **Exercício 5: Aplicação SPA Completa**
Desenvolva uma SPA que:
- Usa roteamento client-side
- Implementa state management
- Tem sistema de templates
- Suporta lazy loading

---

## 💡 Dicas Avançadas

1. **Performance**: Use `requestAnimationFrame` para animações
2. **Memória**: Evite closures desnecessários e memory leaks
3. **Debugging**: Use source maps e ferramentas de profiling
4. **Testing**: Implemente testes unitários e de integração

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Frameworks modernos (React, Vue, Angular)
- Build tools e bundlers
- PWA e Service Workers
- Deploy e CI/CD

---

## 📝 Checklist de Conclusão

- [ ] Dominou recursos ES6+ do JavaScript
- [ ] Implementou Promises e Async/Await
- [ ] Criou aplicações modulares
- [ ] Aplicou padrões de design modernos
- [ ] Otimizou performance e memória
- [ ] Implementou testes automatizados
- [ ] Criou APIs RESTful
- [ ] Completou os 5 exercícios

**🎉 Parabéns! Você completou a Aula 1 do nível Avançado!**

---

*Próxima aula: Frameworks Modernos e Arquitetura*
"""
            }
        ]
    }

def generate_markdown_files():
    """Gera todos os arquivos .md do curso"""
    course_content = get_course_content()
    
    for level, lessons in course_content.items():
        print(f"\n📁 Gerando arquivos para nível: {level.upper()}")
        
        for lesson in lessons:
            filename = f"web-fundamentals/{level}/{lesson['filename']}"
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(lesson['content'])
            
            print(f"✅ Arquivo criado: {filename}")
    
    print(f"\n🎉 Total de {sum(len(lessons) for lessons in course_content.values())} arquivos criados!")

def create_readme():
    """Cria um README principal para o curso"""
    readme_content = """# 🌐 Web Fundamentals - Curso Completo
## Estrutura Organizada por Níveis

Este curso foi gerado automaticamente com conteúdo estilo CS50, organizado em três níveis de dificuldade.

---

## 📚 Estrutura do Curso

### 🟢 **NÍVEL INICIANTE** (2 aulas)
- **Aula 1**: Introdução ao HTML
- **Aula 2**: Formulários HTML

### 🟡 **NÍVEL INTERMEDIÁRIO** (1 aula)
- **Aula 1**: CSS Avançado e Flexbox

### 🔴 **NÍVEL AVANÇADO** (1 aula)
- **Aula 1**: JavaScript Moderno ES6+

---

## 🎯 Características do Curso

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
web-fundamentals/
├── iniciante/
│   ├── 01-introducao-html.md
│   └── 02-formularios-html.md
├── intermediario/
│   └── 01-css-avancado-flexbox.md
└── avancado/
    └── 01-javascript-moderno-es6.md
```

---

## 🎓 Pré-requisitos

- **Iniciante**: Nenhum conhecimento prévio necessário
- **Intermediário**: Conhecimento básico de HTML e CSS
- **Avançado**: Domínio de HTML, CSS e JavaScript básico

---

## 🔧 Tecnologias Abordadas

- **HTML5**: Semântica e estrutura
- **CSS3**: Flexbox, Grid, Animações
- **JavaScript ES6+**: Módulos, Promises, Classes
- **Responsividade**: Mobile-first design
- **Performance**: Otimização e boas práticas

---

## 📝 Licença

Este curso é livre para uso educacional e pessoal.

---

*Gerado automaticamente em {datetime.now().strftime('%d/%m/%Y às %H:%M')}*
"""
    
    with open("web-fundamentals/README.md", 'w', encoding='utf-8') as f:
        f.write(readme_content)
    
    print("✅ README.md criado com sucesso!")

def main():
    """Função principal do script"""
    print("🚀 Iniciando geração do curso Web Fundamentals...")
    print("=" * 50)
    
    # Criar estrutura de diretórios
    create_directory_structure()
    
    # Gerar arquivos .md
    generate_markdown_files()
    
    # Criar README
    create_readme()
    
    print("\n" + "=" * 50)
    print("🎉 Curso Web Fundamentals gerado com sucesso!")
    print("📁 Verifique a pasta 'web-fundamentals' para ver todos os arquivos.")
    print("🌐 Abra o README.md para começar sua jornada de aprendizado!")

if __name__ == "__main__":
    main()

