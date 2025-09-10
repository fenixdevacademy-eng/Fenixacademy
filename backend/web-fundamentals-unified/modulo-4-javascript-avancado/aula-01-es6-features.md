# 🚀 Aula 1: ES6+ Features e Arrow Functions
## Web Fundamentals - Módulo 4: JavaScript Avançado

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar Arrow Functions e suas vantagens
- ✅ Aplicar Template Literals e String Interpolation
- ✅ Implementar Destructuring Assignment
- ✅ Usar Spread e Rest Operators
- ✅ Aplicar Default Parameters
- ✅ Entender Enhanced Object Literals
- ✅ Implementar Promises e Async/Await
- ✅ Aplicar Map, Set e outras estruturas modernas

---

## 📚 Conteúdo Principal

### 1. 🌟 Arrow Functions

#### **Sintaxe e Vantagens**
```javascript
// Função tradicional
function somar(a, b) {
    return a + b;
}

// Arrow function básica
const somar = (a, b) => {
    return a + b;
};

// Arrow function simplificada
const somar = (a, b) => a + b;

// Arrow function com um parâmetro
const quadrado = x => x * x;

// Arrow function sem parâmetros
const saudacao = () => "Olá, mundo!";

// Arrow function com múltiplas linhas
const processarDados = (dados) => {
    const resultado = dados.map(item => item * 2);
    return resultado.filter(item => item > 10);
};
```

#### **Diferenças Importantes**
```javascript
// Contexto 'this' em funções tradicionais
const objeto = {
    nome: "João",
    saudacao: function() {
        console.log(`Olá, eu sou ${this.nome}`);
    }
};

// Contexto 'this' em arrow functions
const objeto2 = {
    nome: "Maria",
    saudacao: () => {
        console.log(`Olá, eu sou ${this.nome}`); // 'this' não funciona como esperado
    }
};

// Solução com arrow function
const objeto3 = {
    nome: "Pedro",
    metodos: {
        saudacao: function() {
            // Arrow function herda 'this' do contexto pai
            const callback = () => {
                console.log(`Olá, eu sou ${this.nome}`);
            };
            setTimeout(callback, 1000);
        }
    }
};
```

#### **Uso com Arrays**
```javascript
const numeros = [1, 2, 3, 4, 5];

// Map com arrow function
const dobrados = numeros.map(n => n * 2);

// Filter com arrow function
const pares = numeros.filter(n => n % 2 === 0);

// Reduce com arrow function
const soma = numeros.reduce((acc, n) => acc + n, 0);

// Find com arrow function
const maiorQue3 = numeros.find(n => n > 3);

// Every e Some com arrow function
const todosPositivos = numeros.every(n => n > 0);
const temNegativo = numeros.some(n => n < 0);
```

### 2. 📝 Template Literals

#### **Sintaxe e Interpolação**
```javascript
// String tradicional
const nome = "João";
const idade = 25;
const mensagem = "Olá, " + nome + "! Você tem " + idade + " anos.";

// Template literal
const mensagem = `Olá, ${nome}! Você tem ${idade} anos.`;

// Expressões complexas
const preco = 99.99;
const desconto = 0.1;
const mensagem = `Preço: R$ ${preco.toFixed(2)}
Desconto: ${(desconto * 100).toFixed(0)}%
Total: R$ ${(preco * (1 - desconto)).toFixed(2)}`;

// Funções dentro de template literals
const usuarios = ["João", "Maria", "Pedro"];
const lista = `
Usuários:
${usuarios.map(usuario => `- ${usuario}`).join('\n')}
Total: ${usuarios.length} usuários
`;
```

#### **Multilinhas e Formatação**
```javascript
// String multilinha tradicional
const html = "<div>\n" +
             "  <h1>Título</h1>\n" +
             "  <p>Conteúdo</p>\n" +
             "</div>";

// Template literal multilinha
const html = `
<div>
  <h1>Título</h1>
  <p>Conteúdo</p>
</div>
`;

// Formatação de código
const codigo = `
function exemplo() {
    const resultado = ${variavel} * 2;
    return resultado;
}
`;

// Template literals aninhados
const usuario = {
    nome: "João",
    endereco: {
        rua: "Rua das Flores",
        numero: 123
    }
};

const mensagem = `
Usuário: ${usuario.nome}
Endereço: ${usuario.endereco.rua}, ${usuario.endereco.numero}
`;
```

### 3. 🔄 Destructuring Assignment

#### **Destructuring de Arrays**
```javascript
// Destructuring básico
const numeros = [1, 2, 3, 4, 5];
const [primeiro, segundo, terceiro] = numeros;
console.log(primeiro, segundo, terceiro); // 1 2 3

// Pular elementos
const [primeiro, , terceiro] = numeros;
console.log(primeiro, terceiro); // 1 3

// Rest operator
const [primeiro, segundo, ...resto] = numeros;
console.log(primeiro, segundo, resto); // 1 2 [3, 4, 5]

// Valores padrão
const [a, b, c = 10] = [1, 2];
console.log(a, b, c); // 1 2 10

// Trocar variáveis
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

#### **Destructuring de Objetos**
```javascript
const usuario = {
    nome: "João",
    idade: 25,
    email: "joao@email.com",
    endereco: {
        cidade: "São Paulo",
        estado: "SP"
    }
};

// Destructuring básico
const { nome, idade, email } = usuario;
console.log(nome, idade, email);

// Renomear variáveis
const { nome: nomeUsuario, idade: idadeUsuario } = usuario;
console.log(nomeUsuario, idadeUsuario);

// Valores padrão
const { nome, telefone = "Não informado" } = usuario;
console.log(nome, telefone);

// Destructuring aninhado
const { 
    nome, 
    endereco: { cidade, estado } 
} = usuario;
console.log(nome, cidade, estado);

// Rest operator em objetos
const { nome, ...outrosDados } = usuario;
console.log(nome, outrosDados);
```

#### **Destructuring em Funções**
```javascript
// Parâmetros com destructuring
function exibirUsuario({ nome, idade, email }) {
    console.log(`Nome: ${nome}, Idade: ${idade}, Email: ${email}`);
}

exibirUsuario(usuario);

// Destructuring com valores padrão
function criarUsuario({ 
    nome = "Anônimo", 
    idade = 0, 
    email = "sem@email.com" 
} = {}) {
    return { nome, idade, email };
}

const novoUsuario = criarUsuario({ nome: "Maria" });

// Retorno com destructuring
function obterCoordenadas() {
    return { x: 10, y: 20 };
}

const { x, y } = obterCoordenadas();
console.log(x, y);
```

### 4. 📤 Spread e Rest Operators

#### **Spread Operator (...)**
```javascript
// Spread em arrays
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const arrayCompleto = [...array1, ...array2];
console.log(arrayCompleto); // [1, 2, 3, 4, 5, 6]

// Adicionar elementos
const novoArray = [...array1, 4, 5, 6];

// Copiar array
const copiaArray = [...array1];

// Spread em objetos
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const objCompleto = { ...obj1, ...obj2 };
console.log(objCompleto); // { a: 1, b: 2, c: 3, d: 4 }

// Sobrescrever propriedades
const usuario = { nome: "João", idade: 25 };
const usuarioAtualizado = { ...usuario, idade: 26 };
console.log(usuarioAtualizado); // { nome: "João", idade: 26 }
```

#### **Rest Operator**
```javascript
// Rest em parâmetros de função
function somar(...numeros) {
    return numeros.reduce((total, num) => total + num, 0);
}

console.log(somar(1, 2, 3, 4, 5)); // 15

// Rest com outros parâmetros
function criarUsuario(nome, idade, ...hobbies) {
    return {
        nome,
        idade,
        hobbies
    };
}

const usuario = criarUsuario("João", 25, "leitura", "música", "esporte");

// Rest em destructuring
const [primeiro, segundo, ...resto] = [1, 2, 3, 4, 5];
const { nome, ...outrosDados } = usuario;
```

### 5. ⚙️ Default Parameters

#### **Parâmetros Padrão Básicos**
```javascript
// Função sem parâmetros padrão
function saudacao(nome) {
    if (nome === undefined) {
        nome = "Visitante";
    }
    return `Olá, ${nome}!`;
}

// Função com parâmetros padrão
function saudacao(nome = "Visitante") {
    return `Olá, ${nome}!`;
}

// Múltiplos parâmetros padrão
function criarUsuario(nome = "Anônimo", idade = 0, ativo = true) {
    return { nome, idade, ativo };
}

// Parâmetros padrão com expressões
function calcularArea(largura = 10, altura = largura) {
    return largura * altura;
}

// Parâmetros padrão com funções
function processarDados(dados, callback = (item) => item) {
    return dados.map(callback);
}
```

#### **Parâmetros Padrão Avançados**
```javascript
// Parâmetros padrão com destructuring
function configurarAPI({ 
    url = "https://api.exemplo.com",
    timeout = 5000,
    retries = 3 
} = {}) {
    return { url, timeout, retries };
}

// Parâmetros padrão com objetos
function criarProduto({
    nome,
    preco = 0,
    categoria = "Geral",
    estoque = 0
} = {}) {
    return { nome, preco, categoria, estoque };
}

// Parâmetros padrão com arrays
function processarLista([primeiro, segundo, ...resto] = []) {
    return { primeiro, segundo, resto };
}
```

### 6. 🎯 Enhanced Object Literals

#### **Shorthand Properties**
```javascript
// Propriedades abreviadas
const nome = "João";
const idade = 25;
const email = "joao@email.com";

// Forma tradicional
const usuario = {
    nome: nome,
    idade: idade,
    email: email
};

// Forma abreviada
const usuario = { nome, idade, email };
```

#### **Shorthand Methods**
```javascript
// Métodos abreviados
const calculadora = {
    // Forma tradicional
    somar: function(a, b) {
        return a + b;
    },
    
    // Forma abreviada
    subtrair(a, b) {
        return a - b;
    },
    
    // Arrow function (cuidado com 'this')
    multiplicar: (a, b) => a * b,
    
    // Método com propriedades computadas
    [`calcular${'Area'}`](largura, altura) {
        return largura * altura;
    }
};
```

#### **Computed Property Names**
```javascript
// Propriedades computadas
const prefixo = "user";
const sufixo = "Name";

const objeto = {
    [`${prefixo}${sufixo}`]: "João",
    [`${prefixo}Age`]: 25,
    [`${prefixo}Email`]: "joao@email.com"
};

// Com símbolos
const simbolo = Symbol('id');
const objetoComSimbolo = {
    [simbolo]: 123,
    nome: "João"
};
```

### 7. 🔄 Promises e Async/Await

#### **Promises Básicas**
```javascript
// Criar uma Promise
const minhaPromise = new Promise((resolve, reject) => {
    const sucesso = true;
    
    if (sucesso) {
        resolve("Operação realizada com sucesso!");
    } else {
        reject("Erro na operação!");
    }
});

// Usar a Promise
minhaPromise
    .then(resultado => console.log(resultado))
    .catch(erro => console.error(erro))
    .finally(() => console.log("Promise finalizada"));
```

#### **Async/Await**
```javascript
// Função assíncrona
async function buscarDados() {
    try {
        const resposta = await fetch('https://api.exemplo.com/dados');
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        throw erro;
    }
}

// Usar a função assíncrona
async function processarDados() {
    try {
        const dados = await buscarDados();
        console.log('Dados recebidos:', dados);
        return dados;
    } catch (erro) {
        console.error('Erro no processamento:', erro);
    }
}
```

#### **Promise.all e Promise.race**
```javascript
// Promise.all - todas as promises devem ser resolvidas
async function buscarMultiplosDados() {
    const urls = [
        'https://api.exemplo.com/usuarios',
        'https://api.exemplo.com/produtos',
        'https://api.exemplo.com/pedidos'
    ];
    
    try {
        const promises = urls.map(url => fetch(url).then(res => res.json()));
        const [usuarios, produtos, pedidos] = await Promise.all(promises);
        
        return { usuarios, produtos, pedidos };
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
    }
}

// Promise.race - primeira promise resolvida
async function buscarComTimeout() {
    const promiseDados = fetch('https://api.exemplo.com/dados');
    const promiseTimeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
    );
    
    try {
        const resultado = await Promise.race([promiseDados, promiseTimeout]);
        return await resultado.json();
    } catch (erro) {
        console.error('Erro ou timeout:', erro);
    }
}
```

### 8. 🗺️ Map, Set e Estruturas Modernas

#### **Map**
```javascript
// Criar e usar Map
const mapa = new Map();

// Adicionar elementos
mapa.set('nome', 'João');
mapa.set('idade', 25);
mapa.set('email', 'joao@email.com');

// Obter valores
console.log(mapa.get('nome')); // João
console.log(mapa.has('idade')); // true
console.log(mapa.size); // 3

// Iterar sobre o Map
for (const [chave, valor] of mapa) {
    console.log(`${chave}: ${valor}`);
}

// Converter para array
const arrayDoMap = Array.from(mapa);
const objetoDoMap = Object.fromEntries(mapa);
```

#### **Set**
```javascript
// Criar e usar Set
const conjunto = new Set();

// Adicionar elementos
conjunto.add('maçã');
conjunto.add('banana');
conjunto.add('laranja');
conjunto.add('maçã'); // Duplicado, não será adicionado

console.log(conjunto.size); // 3
console.log(conjunto.has('banana')); // true

// Remover elementos
conjunto.delete('laranja');

// Iterar sobre o Set
for (const item of conjunto) {
    console.log(item);
}

// Converter para array
const arrayDoSet = Array.from(conjunto);
```

#### **WeakMap e WeakSet**
```javascript
// WeakMap - chaves devem ser objetos
const weakMap = new WeakMap();
const objeto = { id: 1 };

weakMap.set(objeto, 'dados privados');
console.log(weakMap.get(objeto)); // dados privados

// WeakSet - elementos devem ser objetos
const weakSet = new WeakSet();
const obj1 = { nome: 'João' };
const obj2 = { nome: 'Maria' };

weakSet.add(obj1);
weakSet.add(obj2);
console.log(weakSet.has(obj1)); // true
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Calculadora com ES6+**
Crie uma calculadora usando features modernas do JavaScript:
- Arrow functions para operações
- Template literals para exibição
- Destructuring para parâmetros
- Default parameters para configurações
- Classes com métodos abreviados

**Critérios de avaliação:**
- ✅ Arrow functions implementadas
- ✅ Template literals utilizados
- ✅ Destructuring aplicado
- ✅ Código moderno e limpo

### **Exercício 2: Gerenciador de Usuários**
Desenvolva um sistema de gerenciamento de usuários:
- Map para armazenar usuários
- Set para emails únicos
- Async/await para operações assíncronas
- Spread operator para atualizações
- Rest operator para parâmetros variáveis

**Critérios de avaliação:**
- ✅ Estruturas modernas utilizadas
- ✅ Operações assíncronas implementadas
- ✅ Validação de dados
- ✅ Interface funcional

### **Exercício 3: API Client com Promises**
Construa um cliente para consumir APIs:
- Fetch API com async/await
- Promise.all para requisições paralelas
- Promise.race para timeout
- Error handling adequado
- Retry logic com promises

**Critérios de avaliação:**
- ✅ Async/await implementado
- ✅ Tratamento de erros
- ✅ Requisições paralelas
- ✅ Timeout e retry

### **Exercício 4: Sistema de Cache**
Implemente um sistema de cache em memória:
- WeakMap para cache privado
- Map para cache público
- TTL (Time To Live) com promises
- Invalidação automática
- Métricas de performance

**Critérios de avaliação:**
- ✅ Cache implementado
- ✅ TTL funcional
- ✅ Invalidação automática
- ✅ Performance otimizada

---

## 💡 Dicas Importantes

### **1. Arrow Functions**
- Use arrow functions para callbacks e funções curtas
- Evite arrow functions em métodos de objeto (problema com 'this')
- Prefira arrow functions em funções de array (map, filter, etc.)

### **2. Template Literals**
- Use para strings multilinhas
- Aproveite a interpolação para código mais limpo
- Cuidado com performance em loops intensivos

### **3. Destructuring**
- Use para extrair dados de objetos e arrays
- Combine com default parameters
- Aproveite para parâmetros de função

### **4. Async/Await**
- Prefira async/await a promises encadeadas
- Sempre use try/catch para tratamento de erros
- Use Promise.all para operações paralelas

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Módulos ES6 e Import/Export
- Tree shaking e otimização
- Bundlers modernos
- Sistema de módulos

---

## 📝 Checklist de Conclusão

- [ ] Dominou Arrow Functions
- [ ] Aplicou Template Literals
- [ ] Implementou Destructuring
- [ ] Usou Spread e Rest Operators
- [ ] Aplicou Default Parameters
- [ ] Entendeu Enhanced Object Literals
- [ ] Implementou Promises e Async/Await
- [ ] Aplicou Map, Set e estruturas modernas
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes navegadores

**🎉 Parabéns! Você completou a Aula 1 com sucesso!**

---

## 📚 Recursos Adicionais

- [MDN Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [ES6 Features](https://es6-features.org/)
- [JavaScript.info ES6+](https://javascript.info/)
- [Async/Await Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

---

*Próxima aula: Módulos ES6 e Import/Export*
