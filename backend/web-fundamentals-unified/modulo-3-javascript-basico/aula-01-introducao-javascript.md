# ⚡ Aula 1: Introdução ao JavaScript e DOM
## Web Fundamentals - Módulo 3: JavaScript Básico

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Iniciante  

---

## 🎯 Objetivos de Aprendizado

- ✅ Compreender o que é JavaScript e seu papel na web
- ✅ Dominar a sintaxe básica e estrutura do código
- ✅ Entender o DOM e como manipulá-lo
- ✅ Aplicar variáveis e tipos de dados
- ✅ Implementar funções básicas
- ✅ Criar interatividade com eventos
- ✅ Aplicar boas práticas de desenvolvimento
- ✅ Debuggar código JavaScript

---

## 📚 Conteúdo Principal

### 1. 🌟 O que é JavaScript?

JavaScript é uma linguagem de programação de alto nível, interpretada e orientada a objetos. É a linguagem da web, responsável por tornar as páginas interativas e dinâmicas.

**Características principais:**
- Linguagem de programação, não de marcação
- Interpretada pelo navegador
- Orientada a objetos e funcional
- Assíncrona e não-bloqueante
- Ecossistema rico (Node.js, React, Vue, etc.)
- Padrão ECMAScript (ES6+)

**Evolução do JavaScript:**
```javascript
// ES5 (2009)
var nome = "João";
function saudacao() {
    return "Olá, " + nome;
}

// ES6+ (2015+)
const nome = "João";
const saudacao = () => `Olá, ${nome}`;

// ES2020+
const saudacao = async () => {
    const dados = await fetch('/api/usuario');
    return `Olá, ${dados.nome}`;
};
```

### 2. 🏗️ Estrutura Básica e Sintaxe

#### **Sintaxe Fundamental**
```javascript
// Comentários
// Comentário de linha única

/*
Comentário de múltiplas linhas
Útil para documentação
*/

/**
 * Comentário JSDoc
 * @param {string} nome - Nome do usuário
 * @returns {string} Saudação personalizada
 */
function saudacao(nome) {
    return `Olá, ${nome}!`;
}

// Ponto e vírgula (opcional, mas recomendado)
const mensagem = "Hello World";
console.log(mensagem);

// Chaves e indentação
if (condicao) {
    console.log("Condição verdadeira");
} else {
    console.log("Condição falsa");
}
```

#### **Estrutura de um Arquivo JavaScript**
```javascript
// 1. Imports/Requires (se necessário)
// import { funcao } from './modulo.js';

// 2. Variáveis globais
const CONFIGURACAO = {
    apiUrl: 'https://api.exemplo.com',
    timeout: 5000
};

// 3. Funções auxiliares
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// 4. Função principal
function inicializar() {
    console.log('Aplicação iniciada');
    configurarEventos();
    carregarDados();
}

// 5. Event listeners
document.addEventListener('DOMContentLoaded', inicializar);

// 6. Export (se módulo)
// export { inicializar };
```

### 3. 🎯 DOM (Document Object Model)

#### **O que é o DOM?**
O DOM é uma representação em árvore de todos os elementos HTML de uma página. JavaScript pode manipular o DOM para alterar conteúdo, estilo e comportamento.

```html
<!-- HTML -->
<!DOCTYPE html>
<html>
<head>
    <title>Exemplo DOM</title>
</head>
<body>
    <div id="container">
        <h1 id="titulo">Meu Título</h1>
        <p class="paragrafo">Meu parágrafo</p>
        <button id="botao">Clique aqui</button>
    </div>
</body>
</html>
```

```javascript
// JavaScript - Manipulação do DOM
// Selecionar elementos
const titulo = document.getElementById('titulo');
const paragrafo = document.querySelector('.paragrafo');
const botao = document.querySelector('#botao');
const container = document.querySelector('#container');

// Alterar conteúdo
titulo.textContent = 'Novo Título';
paragrafo.innerHTML = '<strong>Parágrafo em negrito</strong>';

// Alterar atributos
titulo.setAttribute('class', 'destaque');
botao.setAttribute('disabled', 'true');

// Alterar estilo
titulo.style.color = 'blue';
titulo.style.fontSize = '2rem';

// Adicionar/remover classes
titulo.classList.add('ativo');
titulo.classList.remove('inativo');
titulo.classList.toggle('visivel');

// Criar elementos
const novoElemento = document.createElement('div');
novoElemento.textContent = 'Novo elemento';
container.appendChild(novoElemento);

// Remover elementos
container.removeChild(novoElemento);
```

#### **Seletores DOM**
```javascript
// Seletores por ID
const elemento = document.getElementById('meuId');

// Seletores por classe
const elementos = document.getElementsByClassName('minhaClasse');
const elemento = document.querySelector('.minhaClasse');

// Seletores por tag
const elementos = document.getElementsByTagName('div');
const elemento = document.querySelector('div');

// Seletores CSS
const elemento = document.querySelector('#id .classe');
const elementos = document.querySelectorAll('.classe');

// Seletores avançados
const elemento = document.querySelector('div:first-child');
const elementos = document.querySelectorAll('p:nth-child(odd)');
```

### 4. 📊 Variáveis e Tipos de Dados

#### **Declaração de Variáveis**
```javascript
// var (ES5) - escopo de função
var nome = "João";
var idade = 25;

// let (ES6) - escopo de bloco
let sobrenome = "Silva";
let profissao = "Desenvolvedor";

// const (ES6) - constante, escopo de bloco
const PI = 3.14159;
const CONFIGURACAO = {
    apiUrl: 'https://api.exemplo.com',
    timeout: 5000
};

// Hoisting
console.log(variavelVar); // undefined (hoisted)
console.log(variavelLet); // ReferenceError (não hoisted)

var variavelVar = "hoisted";
let variavelLet = "not hoisted";
```

#### **Tipos de Dados**
```javascript
// Tipos primitivos
const string = "Texto";
const number = 42;
const boolean = true;
const undefined = undefined;
const null = null;
const symbol = Symbol('id');

// Tipos de referência
const objeto = {
    nome: "João",
    idade: 25,
    profissao: "Desenvolvedor"
};

const array = [1, 2, 3, 4, 5];
const funcao = function() { return "Olá"; };

// Verificação de tipos
console.log(typeof string); // "string"
console.log(typeof number); // "number"
console.log(typeof boolean); // "boolean"
console.log(typeof objeto); // "object"
console.log(typeof array); // "object"
console.log(typeof funcao); // "function"

// Verificação mais precisa
console.log(Array.isArray(array)); // true
console.log(objeto instanceof Object); // true
```

#### **Operadores**
```javascript
// Operadores aritméticos
const a = 10;
const b = 3;

console.log(a + b); // 13
console.log(a - b); // 7
console.log(a * b); // 30
console.log(a / b); // 3.333...
console.log(a % b); // 1
console.log(a ** b); // 1000

// Operadores de comparação
console.log(a > b); // true
console.log(a < b); // false
console.log(a >= b); // true
console.log(a <= b); // false
console.log(a === b); // false (igualdade estrita)
console.log(a !== b); // true (desigualdade estrita)
console.log(a == b); // false (igualdade solta)
console.log(a != b); // true (desigualdade solta)

// Operadores lógicos
console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false

// Operadores de atribuição
let x = 10;
x += 5; // x = x + 5
x -= 3; // x = x - 3
x *= 2; // x = x * 2
x /= 4; // x = x / 4
x %= 3; // x = x % 3
```

### 5. 🔧 Funções Básicas

#### **Declaração de Funções**
```javascript
// Declaração de função
function saudacao(nome) {
    return `Olá, ${nome}!`;
}

// Expressão de função
const saudacao2 = function(nome) {
    return `Olá, ${nome}!`;
};

// Arrow function (ES6)
const saudacao3 = (nome) => {
    return `Olá, ${nome}!`;
};

// Arrow function simplificada
const saudacao4 = nome => `Olá, ${nome}!`;

// Função com parâmetros padrão
function calcularArea(largura = 10, altura = 5) {
    return largura * altura;
}

// Função com parâmetros rest
function somar(...numeros) {
    return numeros.reduce((total, num) => total + num, 0);
}

// Função com destructuring
function exibirUsuario({ nome, idade, profissao }) {
    console.log(`${nome}, ${idade} anos, ${profissao}`);
}
```

#### **Escopo e Closures**
```javascript
// Escopo global
const global = "Sou global";

function exemploEscopo() {
    // Escopo de função
    const local = "Sou local";
    
    function funcaoInterna() {
        // Escopo de função interna
        const interna = "Sou interna";
        console.log(global); // Acessa escopo global
        console.log(local); // Acessa escopo da função pai
        console.log(interna); // Acessa seu próprio escopo
    }
    
    return funcaoInterna;
}

// Closure
function criarContador() {
    let contador = 0;
    
    return function() {
        contador++;
        return contador;
    };
}

const contador = criarContador();
console.log(contador()); // 1
console.log(contador()); // 2
console.log(contador()); // 3
```

### 6. 🎭 Eventos e Interatividade

#### **Event Listeners**
```javascript
// Event listener básico
const botao = document.querySelector('#meuBotao');

botao.addEventListener('click', function(evento) {
    console.log('Botão clicado!');
    console.log(evento.target); // Elemento que disparou o evento
});

// Event listener com arrow function
botao.addEventListener('click', (evento) => {
    evento.preventDefault(); // Previne comportamento padrão
    console.log('Botão clicado com arrow function!');
});

// Múltiplos event listeners
botao.addEventListener('mouseenter', () => {
    botao.style.backgroundColor = 'blue';
});

botao.addEventListener('mouseleave', () => {
    botao.style.backgroundColor = 'white';
});

// Event delegation
document.addEventListener('click', (evento) => {
    if (evento.target.matches('.botao-dinamico')) {
        console.log('Botão dinâmico clicado!');
    }
});
```

#### **Tipos de Eventos**
```javascript
// Eventos de mouse
elemento.addEventListener('click', handler);
elemento.addEventListener('dblclick', handler);
elemento.addEventListener('mousedown', handler);
elemento.addEventListener('mouseup', handler);
elemento.addEventListener('mouseenter', handler);
elemento.addEventListener('mouseleave', handler);
elemento.addEventListener('mousemove', handler);

// Eventos de teclado
elemento.addEventListener('keydown', handler);
elemento.addEventListener('keyup', handler);
elemento.addEventListener('keypress', handler);

// Eventos de formulário
elemento.addEventListener('submit', handler);
elemento.addEventListener('change', handler);
elemento.addEventListener('input', handler);
elemento.addEventListener('focus', handler);
elemento.addEventListener('blur', handler);

// Eventos de janela
window.addEventListener('load', handler);
window.addEventListener('resize', handler);
window.addEventListener('scroll', handler);
```

### 7. 🐛 Debugging e Boas Práticas

#### **Debugging**
```javascript
// Console.log para debugging
console.log('Valor da variável:', variavel);
console.log('Objeto completo:', objeto);
console.table(array); // Exibe array em formato de tabela
console.group('Grupo de logs');
console.log('Log 1');
console.log('Log 2');
console.groupEnd();

// Console com níveis
console.info('Informação');
console.warn('Aviso');
console.error('Erro');

// Debugger
function funcaoComBug() {
    debugger; // Pausa a execução no DevTools
    // código aqui
}

// Try-catch para tratamento de erros
try {
    // Código que pode gerar erro
    const resultado = operacaoRiscosa();
    console.log('Sucesso:', resultado);
} catch (erro) {
    console.error('Erro capturado:', erro.message);
} finally {
    console.log('Sempre executa');
}
```

#### **Boas Práticas**
```javascript
// 1. Use const por padrão, let quando necessário
const nome = "João";
let idade = 25;

// 2. Use nomes descritivos
const usuarioAtivo = true;
const quantidadeItens = 10;

// 3. Evite variáveis globais
(function() {
    'use strict';
    // Código aqui
})();

// 4. Use funções puras quando possível
function somar(a, b) {
    return a + b; // Função pura
}

// 5. Trate erros adequadamente
async function buscarDados() {
    try {
        const resposta = await fetch('/api/dados');
        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }
        return await resposta.json();
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        return null;
    }
}

// 6. Use template literals
const mensagem = `Olá, ${nome}! Você tem ${idade} anos.`;

// 7. Use destructuring
const { nome, idade } = usuario;
const [primeiro, segundo] = array;
```

### 8. 🚀 Exemplo Prático Completo

#### **Aplicação de Lista de Tarefas**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tarefas</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .tarefa { display: flex; align-items: center; margin: 10px 0; }
        .tarefa input[type="checkbox"] { margin-right: 10px; }
        .tarefa.concluida { text-decoration: line-through; opacity: 0.6; }
        .nova-tarefa { display: flex; margin: 20px 0; }
        .nova-tarefa input { flex: 1; padding: 10px; margin-right: 10px; }
        .nova-tarefa button { padding: 10px 20px; }
    </style>
</head>
<body>
    <h1>Lista de Tarefas</h1>
    
    <div class="nova-tarefa">
        <input type="text" id="novaTarefa" placeholder="Nova tarefa...">
        <button id="adicionarTarefa">Adicionar</button>
    </div>
    
    <div id="listaTarefas"></div>
    
    <script>
        // Estado da aplicação
        let tarefas = [];
        
        // Elementos DOM
        const inputNovaTarefa = document.getElementById('novaTarefa');
        const botaoAdicionar = document.getElementById('adicionarTarefa');
        const listaTarefas = document.getElementById('listaTarefas');
        
        // Funções
        function adicionarTarefa(texto) {
            if (texto.trim() === '') return;
            
            const tarefa = {
                id: Date.now(),
                texto: texto.trim(),
                concluida: false
            };
            
            tarefas.push(tarefa);
            renderizarTarefas();
            inputNovaTarefa.value = '';
        }
        
        function toggleTarefa(id) {
            const tarefa = tarefas.find(t => t.id === id);
            if (tarefa) {
                tarefa.concluida = !tarefa.concluida;
                renderizarTarefas();
            }
        }
        
        function removerTarefa(id) {
            tarefas = tarefas.filter(t => t.id !== id);
            renderizarTarefas();
        }
        
        function renderizarTarefas() {
            listaTarefas.innerHTML = '';
            
            tarefas.forEach(tarefa => {
                const div = document.createElement('div');
                div.className = `tarefa ${tarefa.concluida ? 'concluida' : ''}`;
                
                div.innerHTML = `
                    <input type="checkbox" ${tarefa.concluida ? 'checked' : ''} 
                           onchange="toggleTarefa(${tarefa.id})">
                    <span>${tarefa.texto}</span>
                    <button onclick="removerTarefa(${tarefa.id})" style="margin-left: auto;">Remover</button>
                `;
                
                listaTarefas.appendChild(div);
            });
        }
        
        // Event listeners
        botaoAdicionar.addEventListener('click', () => {
            adicionarTarefa(inputNovaTarefa.value);
        });
        
        inputNovaTarefa.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                adicionarTarefa(inputNovaTarefa.value);
            }
        });
        
        // Inicialização
        renderizarTarefas();
    </script>
</body>
</html>
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Calculadora Interativa**
Crie uma calculadora com:
- Interface HTML com botões
- JavaScript para operações matemáticas
- Validação de entrada
- Histórico de operações
- Design responsivo

**Critérios de avaliação:**
- ✅ Interface funcional
- ✅ Operações matemáticas corretas
- ✅ Validação de entrada
- ✅ Código bem estruturado

### **Exercício 2: Formulário Dinâmico**
Desenvolva um formulário com:
- Validação em tempo real
- Mensagens de erro personalizadas
- Campos condicionais
- Envio assíncrono
- Feedback visual

**Critérios de avaliação:**
- ✅ Validação funcional
- ✅ UX/UI adequada
- ✅ Tratamento de erros
- ✅ Código limpo

### **Exercício 3: Galeria de Imagens**
Construa uma galeria com:
- Carregamento de imagens
- Navegação entre imagens
- Zoom e fullscreen
- Lazy loading
- Controles de teclado

**Critérios de avaliação:**
- ✅ Navegação funcional
- ✅ Performance otimizada
- ✅ Acessibilidade
- ✅ Código modular

### **Exercício 4: Jogo da Velha**
Crie um jogo da velha com:
- Interface de jogo
- Lógica de vitória
- Jogador vs computador
- Contador de vitórias
- Reiniciar jogo

**Critérios de avaliação:**
- ✅ Lógica de jogo correta
- ✅ Interface intuitiva
- ✅ IA básica
- ✅ Código bem organizado

---

## 💡 Dicas Importantes

### **1. Performance**
- Use event delegation para elementos dinâmicos
- Evite manipulação excessiva do DOM
- Use requestAnimationFrame para animações
- Otimize loops e operações custosas

### **2. Acessibilidade**
- Use semantic HTML
- Implemente navegação por teclado
- Forneça feedback visual
- Teste com screen readers

### **3. Manutenibilidade**
- Use nomes descritivos
- Organize código em funções
- Comente código complexo
- Use padrões consistentes

### **4. Debugging**
- Use console.log estrategicamente
- Aprenda a usar DevTools
- Implemente tratamento de erros
- Teste em diferentes navegadores

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Variáveis e tipos de dados
- Operadores e expressões
- Estruturas de controle
- Funções avançadas

---

## 📝 Checklist de Conclusão

- [ ] Compreendeu o que é JavaScript
- [ ] Dominou sintaxe básica
- [ ] Entendeu o DOM e manipulação
- [ ] Aplicou variáveis e tipos
- [ ] Implementou funções básicas
- [ ] Criou interatividade com eventos
- [ ] Aplicou boas práticas
- [ ] Debugou código JavaScript
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes navegadores

**🎉 Parabéns! Você completou a Aula 1 com sucesso!**

---

## 📚 Recursos Adicionais

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)
- [Eloquent JavaScript](https://eloquentjavascript.net/)
- [JavaScript DevTools](https://developer.chrome.com/docs/devtools/)

---

*Próxima aula: Variáveis, Tipos e Operadores*







