# 🚀 Aula 1: JavaScript Moderno ES6+
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
