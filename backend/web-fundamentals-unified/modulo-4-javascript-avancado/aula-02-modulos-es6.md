# 📦 Aula 2: Módulos ES6 e Import/Export
## Web Fundamentals - Módulo 4: JavaScript Avançado

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 7  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Compreender o sistema de módulos ES6
- ✅ Dominar export e import statements
- ✅ Implementar módulos com diferentes padrões
- ✅ Entender tree shaking e otimização
- ✅ Aplicar re-exports e barrel exports
- ✅ Configurar bundlers modernos
- ✅ Organizar código em módulos reutilizáveis

---

## 📚 Conteúdo Principal

### 1. 🌟 Introdução aos Módulos ES6

#### **O que são Módulos?**
```javascript
// Antes dos módulos ES6 - IIFE (Immediately Invoked Function Expression)
(function() {
    'use strict';
    
    // Código privado
    const nome = "João";
    
    // API pública
    window.MeuModulo = {
        getNome: function() {
            return nome;
        }
    };
})();

// Com módulos ES6
// arquivo: usuario.js
export const nome = "João";
export function getNome() {
    return nome;
}

// arquivo: main.js
import { nome, getNome } from './usuario.js';
console.log(nome, getNome());
```

#### **Vantagens dos Módulos ES6**
- **Encapsulamento**: Código privado por padrão
- **Reutilização**: Fácil importação e exportação
- **Tree Shaking**: Remoção de código não utilizado
- **Carregamento Assíncrono**: Módulos carregados sob demanda
- **Resolução Estática**: Análise em tempo de compilação
- **Compatibilidade**: Funciona em navegadores modernos

### 2. 📤 Export Statements

#### **Named Exports**
```javascript
// arquivo: utils.js
export const PI = 3.14159;
export const E = 2.71828;

export function somar(a, b) {
    return a + b;
}

export function subtrair(a, b) {
    return a - b;
}

export class Calculadora {
    constructor() {
        this.historico = [];
    }
    
    calcular(operacao, a, b) {
        const resultado = operacao(a, b);
        this.historico.push({ operacao: operacao.name, a, b, resultado });
        return resultado;
    }
}

// Export de múltiplos itens
const nome = "João";
const idade = 25;
const email = "joao@email.com";

export { nome, idade, email };

// Renomear exports
export { nome as nomeUsuario, idade as idadeUsuario };
```

#### **Default Export**
```javascript
// arquivo: Usuario.js
class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    
    exibirInfo() {
        return `${this.nome} (${this.email})`;
    }
}

// Default export
export default Usuario;

// Ou exportar diretamente
export default class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

// Default export de função
export default function criarUsuario(nome, email) {
    return new Usuario(nome, email);
}

// Default export de objeto
const config = {
    apiUrl: 'https://api.exemplo.com',
    timeout: 5000,
    retries: 3
};

export default config;
```

#### **Mixed Exports**
```javascript
// arquivo: api.js
// Named exports
export const API_URL = 'https://api.exemplo.com';
export const TIMEOUT = 5000;

export function fazerRequisicao(url, options = {}) {
    return fetch(url, {
        timeout: TIMEOUT,
        ...options
    });
}

// Default export
export default class ApiClient {
    constructor(baseUrl = API_URL) {
        this.baseUrl = baseUrl;
    }
    
    async get(endpoint) {
        return fazerRequisicao(`${this.baseUrl}${endpoint}`);
    }
    
    async post(endpoint, data) {
        return fazerRequisicao(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}
```

### 3. 📥 Import Statements

#### **Named Imports**
```javascript
// Import específico
import { somar, subtrair } from './utils.js';

// Import com renomeação
import { somar as adicionar, subtrair as diminuir } from './utils.js';

// Import de múltiplos itens
import { PI, E, somar, subtrair, Calculadora } from './utils.js';

// Import de tudo
import * as utils from './utils.js';
console.log(utils.somar(1, 2));
console.log(utils.PI);

// Import apenas para efeitos colaterais
import './config.js'; // Executa o código do módulo
```

#### **Default Imports**
```javascript
// Import default
import Usuario from './Usuario.js';
import criarUsuario from './Usuario.js';
import config from './config.js';

// Usar o import
const usuario = new Usuario("João", "joao@email.com");
const novoUsuario = criarUsuario("Maria", "maria@email.com");
console.log(config.apiUrl);
```

#### **Mixed Imports**
```javascript
// Combinar named e default imports
import ApiClient, { API_URL, TIMEOUT, fazerRequisicao } from './api.js';

// Ou importar tudo
import ApiClient, * as api from './api.js';

// Usar os imports
const client = new ApiClient();
const dados = await client.get('/usuarios');
```

### 4. 🔄 Re-exports e Barrel Exports

#### **Re-exports**
```javascript
// arquivo: math.js
export { somar, subtrair } from './operacoes.js';
export { multiplicar, dividir } from './operacoes.js';
export { PI, E } from './constantes.js';

// Re-export com renomeação
export { somar as add, subtrair as sub } from './operacoes.js';

// Re-export de default
export { default as Calculadora } from './Calculadora.js';

// Re-export de tudo
export * from './operacoes.js';
export * from './constantes.js';
```

#### **Barrel Exports**
```javascript
// arquivo: index.js (barrel export)
// Re-exportar todos os módulos de uma pasta
export * from './usuarios.js';
export * from './produtos.js';
export * from './pedidos.js';
export * from './api.js';

// Exportar com namespace
export * as usuarios from './usuarios.js';
export * as produtos from './produtos.js';
export * as pedidos from './pedidos.js';

// Importar do barrel
import { criarUsuario, buscarProdutos } from './index.js';
// ou
import { usuarios, produtos } from './index.js';
```

### 5. 🌳 Tree Shaking e Otimização

#### **Como Funciona o Tree Shaking**
```javascript
// arquivo: utils.js
export function funcaoUsada() {
    return "Esta função será incluída";
}

export function funcaoNaoUsada() {
    return "Esta função será removida";
}

export const constanteUsada = "Esta constante será incluída";
export const constanteNaoUsada = "Esta constante será removida";

// arquivo: main.js
import { funcaoUsada, constanteUsada } from './utils.js';

console.log(funcaoUsada(), constanteUsada);
// Apenas funcaoUsada e constanteUsada serão incluídas no bundle final
```

#### **Boas Práticas para Tree Shaking**
```javascript
// ❌ Evitar - export de objeto
export const utils = {
    somar: (a, b) => a + b,
    subtrair: (a, b) => a - b
};

// ✅ Preferir - exports nomeados
export const somar = (a, b) => a + b;
export const subtrair = (a, b) => a - b;

// ❌ Evitar - side effects
export const config = {
    apiUrl: process.env.API_URL // Side effect
};

// ✅ Preferir - sem side effects
export const config = {
    apiUrl: 'https://api.exemplo.com'
};

// ❌ Evitar - import de tudo
import * as utils from './utils.js';

// ✅ Preferir - import específico
import { somar, subtrair } from './utils.js';
```

### 6. 🔧 Configuração de Bundlers

#### **Webpack Configuration**
```javascript
// webpack.config.js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    optimization: {
        usedExports: true, // Habilita tree shaking
        sideEffects: false // Marca módulos como sem side effects
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
};
```

#### **Vite Configuration**
```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    utils: ['./src/utils/index.js']
                }
            }
        }
    },
    optimizeDeps: {
        include: ['lodash-es']
    }
});
```

#### **Package.json Configuration**
```json
{
    "name": "meu-projeto",
    "type": "module",
    "main": "src/index.js",
    "sideEffects": false,
    "exports": {
        ".": "./src/index.js",
        "./utils": "./src/utils/index.js",
        "./components": "./src/components/index.js"
    }
}
```

### 7. 🏗️ Organização de Módulos

#### **Estrutura de Pastas**
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.js
│   │   ├── Button.css
│   │   └── index.js
│   ├── Modal/
│   │   ├── Modal.js
│   │   ├── Modal.css
│   │   └── index.js
│   └── index.js
├── utils/
│   ├── api.js
│   ├── validation.js
│   ├── formatting.js
│   └── index.js
├── services/
│   ├── userService.js
│   ├── productService.js
│   └── index.js
├── constants/
│   ├── api.js
│   ├── routes.js
│   └── index.js
└── index.js
```

#### **Módulos de Componentes**
```javascript
// arquivo: components/Button/Button.js
import React from 'react';
import './Button.css';

export const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'medium',
    onClick,
    disabled = false 
}) => {
    return (
        <button 
            className={`btn btn-${variant} btn-${size}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// arquivo: components/Button/index.js
export { Button } from './Button.js';
export { default } from './Button.js';
```

#### **Módulos de Utilitários**
```javascript
// arquivo: utils/validation.js
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password) => {
    return password.length >= 8;
};

export const validateForm = (formData) => {
    const errors = {};
    
    if (!isValidEmail(formData.email)) {
        errors.email = 'Email inválido';
    }
    
    if (!isValidPassword(formData.password)) {
        errors.password = 'Senha deve ter pelo menos 8 caracteres';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// arquivo: utils/index.js
export * from './validation.js';
export * from './formatting.js';
export * from './api.js';
```

### 8. 🔄 Dynamic Imports

#### **Import Dinâmico**
```javascript
// Import dinâmico básico
async function carregarModulo() {
    const modulo = await import('./modulo.js');
    return modulo;
}

// Import dinâmico com destructuring
async function carregarUtilitarios() {
    const { somar, subtrair } = await import('./utils.js');
    return { somar, subtrair };
}

// Import dinâmico condicional
async function carregarModuloCondicional(condicao) {
    if (condicao) {
        const modulo = await import('./moduloA.js');
        return modulo;
    } else {
        const modulo = await import('./moduloB.js');
        return modulo;
    }
}
```

#### **Code Splitting**
```javascript
// Lazy loading de componentes
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent.js'));

function App() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <LazyComponent />
        </Suspense>
    );
}

// Lazy loading de rotas
const routes = [
    {
        path: '/',
        component: () => import('./pages/Home.js')
    },
    {
        path: '/about',
        component: () => import('./pages/About.js')
    },
    {
        path: '/contact',
        component: () => import('./pages/Contact.js')
    }
];
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Sistema de Módulos para E-commerce**
Crie um sistema modular para e-commerce:
- Módulo de produtos com CRUD
- Módulo de carrinho de compras
- Módulo de usuários e autenticação
- Módulo de pagamentos
- Barrel exports para organização

**Critérios de avaliação:**
- ✅ Módulos bem organizados
- ✅ Exports e imports corretos
- ✅ Barrel exports implementados
- ✅ Código reutilizável

### **Exercício 2: Biblioteca de Utilitários**
Desenvolva uma biblioteca de utilitários:
- Módulos separados por funcionalidade
- Tree shaking otimizado
- Default e named exports
- Re-exports organizados
- Documentação JSDoc

**Critérios de avaliação:**
- ✅ Módulos otimizados
- ✅ Tree shaking funcional
- ✅ Documentação completa
- ✅ Exports bem estruturados

### **Exercício 3: Sistema de Componentes**
Construa um sistema de componentes modulares:
- Componentes reutilizáveis
- Estilos CSS modulares
- Props e eventos
- Lazy loading de componentes
- Bundle otimizado

**Critérios de avaliação:**
- ✅ Componentes modulares
- ✅ Lazy loading implementado
- ✅ Bundle otimizado
- ✅ Reutilização máxima

### **Exercício 4: API Client Modular**
Implemente um cliente de API modular:
- Módulos por endpoint
- Interceptors e middleware
- Error handling centralizado
- Cache e retry logic
- TypeScript definitions

**Critérios de avaliação:**
- ✅ Módulos bem estruturados
- ✅ Error handling robusto
- ✅ Cache implementado
- ✅ TypeScript support

---

## 💡 Dicas Importantes

### **1. Organização**
- Use barrel exports para simplificar imports
- Organize módulos por funcionalidade
- Mantenha módulos pequenos e focados
- Use nomes descritivos para arquivos

### **2. Performance**
- Habilite tree shaking no bundler
- Evite side effects desnecessários
- Use dynamic imports para code splitting
- Otimize imports específicos

### **3. Manutenibilidade**
- Documente exports com JSDoc
- Use TypeScript para type safety
- Mantenha consistência nos padrões
- Teste módulos isoladamente

### **4. Compatibilidade**
- Configure bundlers adequadamente
- Use polyfills quando necessário
- Teste em diferentes navegadores
- Mantenha fallbacks para módulos

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Promises avançadas e Async/Await
- Fetch API e requisições HTTP
- Error handling e retry logic
- Interceptors e middleware

---

## 📝 Checklist de Conclusão

- [ ] Compreendeu o sistema de módulos ES6
- [ ] Dominou export e import statements
- [ ] Implementou módulos com diferentes padrões
- [ ] Entendeu tree shaking e otimização
- [ ] Aplicou re-exports e barrel exports
- [ ] Configurou bundlers modernos
- [ ] Organizou código em módulos reutilizáveis
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes ambientes

**🎉 Parabéns! Você completou a Aula 2 com sucesso!**

---

## 📚 Recursos Adicionais

- [MDN Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [ES6 Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)
- [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Vite Guide](https://vitejs.dev/guide/)

---

*Próxima aula: Promises, Async/Await e Fetch API*
