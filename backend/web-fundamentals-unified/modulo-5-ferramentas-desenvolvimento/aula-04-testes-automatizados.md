# 🧪 Aula 4: Testes Automatizados
## Web Fundamentals - Módulo 5: Ferramentas de Desenvolvimento

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar Jest para JavaScript
- ✅ Implementar testes unitários
- ✅ Criar testes de integração
- ✅ Aplicar mocks e stubs
- ✅ Configurar coverage e relatórios
- ✅ Implementar TDD e BDD
- ✅ Automatizar testes
- ✅ Integrar testes com CI/CD

---

## 📚 Conteúdo Principal

### 1. 🌟 Fundamentos do Jest

#### **O que é Jest?**
```bash
# Jest é um framework de testes para JavaScript
# Desenvolvido pelo Facebook
# Inclui runner, assertions, mocks e coverage
# Funciona out-of-the-box com projetos Node.js

# Instalação
npm install --save-dev jest

# Instalação com TypeScript
npm install --save-dev jest @types/jest ts-jest

# Executar testes
npm test
# ou
npx jest
```

#### **Configuração Básica**
```javascript
// jest.config.js
module.exports = {
  // Ambiente de teste
  testEnvironment: 'node',
  
  // Padrões de arquivos de teste
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Diretórios a serem ignorados
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  
  // Configuração de coverage
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Thresholds de coverage
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### 2. 🧪 Testes Unitários

#### **Estrutura Básica de Teste**
```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

module.exports = { add, subtract, multiply, divide };

// math.test.js
const { add, subtract, multiply, divide } = require('./math');

describe('Math Functions', () => {
  describe('add', () => {
    test('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    
    test('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });
    
    test('should add positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });
  });
  
  describe('subtract', () => {
    test('should subtract two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });
  });
  
  describe('multiply', () => {
    test('should multiply two numbers', () => {
      expect(multiply(4, 5)).toBe(20);
    });
  });
  
  describe('divide', () => {
    test('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });
    
    test('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });
  });
});
```

#### **Matchers Avançados**
```javascript
// matchers.test.js
describe('Jest Matchers', () => {
  test('equality matchers', () => {
    expect(2 + 2).toBe(4);
    expect({ name: 'John' }).toEqual({ name: 'John' });
    expect('hello').toMatch(/hello/);
  });
  
  test('truthiness matchers', () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    expect(null).toBeNull();
    expect(undefined).toBeUndefined();
    expect('hello').toBeDefined();
  });
  
  test('number matchers', () => {
    expect(2 + 2).toBeGreaterThan(3);
    expect(2 + 2).toBeGreaterThanOrEqual(4);
    expect(2 + 2).toBeLessThan(5);
    expect(2 + 2).toBeLessThanOrEqual(4);
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
  
  test('array matchers', () => {
    expect(['apple', 'banana', 'orange']).toContain('banana');
    expect(['apple', 'banana', 'orange']).toHaveLength(3);
  });
  
  test('exception matchers', () => {
    expect(() => {
      throw new Error('Something went wrong');
    }).toThrow('Something went wrong');
  });
});
```

### 3. 🔗 Testes de Integração

#### **Testando APIs**
```javascript
// api.js
const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST /users
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = app;

// api.test.js
const request = require('supertest');
const app = require('./api');

describe('API Integration Tests', () => {
  describe('GET /users', () => {
    test('should return all users', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200);
      
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');
    });
  });
  
  describe('GET /users/:id', () => {
    test('should return user by id', async () => {
      const response = await request(app)
        .get('/users/1')
        .expect(200);
      
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe('John Doe');
    });
    
    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/users/999')
        .expect(404);
      
      expect(response.body.error).toBe('User not found');
    });
  });
  
  describe('POST /users', () => {
    test('should create new user', async () => {
      const newUser = {
        name: 'Bob Johnson',
        email: 'bob@example.com'
      };
      
      const response = await request(app)
        .post('/users')
        .send(newUser)
        .expect(201);
      
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.id).toBeDefined();
    });
    
    test('should return 400 for invalid data', async () => {
      const invalidUser = {
        name: 'Bob Johnson'
        // missing email
      };
      
      const response = await request(app)
        .post('/users')
        .send(invalidUser)
        .expect(400);
      
      expect(response.body.error).toBe('Name and email are required');
    });
  });
});
```

### 4. 🎭 Mocks e Stubs

#### **Mocking Functions**
```javascript
// userService.js
const axios = require('axios');

class UserService {
  async getUser(id) {
    const response = await axios.get(`https://api.example.com/users/${id}`);
    return response.data;
  }
  
  async createUser(userData) {
    const response = await axios.post('https://api.example.com/users', userData);
    return response.data;
  }
}

module.exports = UserService;

// userService.test.js
const UserService = require('./userService');
const axios = require('axios');

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('UserService', () => {
  let userService;
  
  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });
  
  describe('getUser', () => {
    test('should return user data', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      
      mockedAxios.get.mockResolvedValue({
        data: mockUser
      });
      
      const result = await userService.getUser(1);
      
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.example.com/users/1');
      expect(result).toEqual(mockUser);
    });
    
    test('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API Error'));
      
      await expect(userService.getUser(1)).rejects.toThrow('API Error');
    });
  });
  
  describe('createUser', () => {
    test('should create user successfully', async () => {
      const userData = { name: 'Jane Doe', email: 'jane@example.com' };
      const mockResponse = { id: 2, ...userData };
      
      mockedAxios.post.mockResolvedValue({
        data: mockResponse
      });
      
      const result = await userService.createUser(userData);
      
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.example.com/users',
        userData
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
```

#### **Mocking Modules**
```javascript
// database.js
const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.connection = null;
  }
  
  async connect() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'testdb'
    });
  }
  
  async query(sql, params = []) {
    if (!this.connection) {
      throw new Error('Database not connected');
    }
    const [rows] = await this.connection.execute(sql, params);
    return rows;
  }
}

module.exports = Database;

// database.test.js
const Database = require('./database');

// Mock mysql2/promise
jest.mock('mysql2/promise', () => ({
  createConnection: jest.fn()
}));

const mysql = require('mysql2/promise');

describe('Database', () => {
  let database;
  let mockConnection;
  
  beforeEach(() => {
    database = new Database();
    mockConnection = {
      execute: jest.fn()
    };
    mysql.createConnection.mockResolvedValue(mockConnection);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('connect', () => {
    test('should establish database connection', async () => {
      await database.connect();
      
      expect(mysql.createConnection).toHaveBeenCalledWith({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'testdb'
      });
    });
  });
  
  describe('query', () => {
    test('should execute query successfully', async () => {
      const mockRows = [{ id: 1, name: 'John' }];
      mockConnection.execute.mockResolvedValue([mockRows]);
      
      await database.connect();
      const result = await database.query('SELECT * FROM users WHERE id = ?', [1]);
      
      expect(mockConnection.execute).toHaveBeenCalledWith('SELECT * FROM users WHERE id = ?', [1]);
      expect(result).toEqual(mockRows);
    });
    
    test('should throw error when not connected', async () => {
      await expect(database.query('SELECT * FROM users')).rejects.toThrow('Database not connected');
    });
  });
});
```

### 5. 📊 Coverage e Relatórios

#### **Configuração de Coverage**
```javascript
// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  
  // Arquivos a serem incluídos no coverage
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js',
    '!src/index.js'
  ],
  
  // Thresholds de coverage
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    // Thresholds específicos por arquivo
    './src/utils/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
```

#### **Scripts de Coverage**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:coverage:watch": "jest --coverage --watch",
    "test:ci": "jest --coverage --watchAll=false --ci"
  }
}
```

### 6. 🔄 TDD e BDD

#### **Test-Driven Development (TDD)**
```javascript
// 1. RED - Escrever teste que falha
// calculator.test.js
const { Calculator } = require('./calculator');

describe('Calculator', () => {
  test('should add two numbers', () => {
    const calc = new Calculator();
    expect(calc.add(2, 3)).toBe(5);
  });
});

// 2. GREEN - Escrever código mínimo para passar
// calculator.js
class Calculator {
  add(a, b) {
    return a + b;
  }
}

module.exports = { Calculator };

// 3. REFACTOR - Melhorar código mantendo testes passando
// calculator.js
class Calculator {
  add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Arguments must be numbers');
    }
    return a + b;
  }
}

module.exports = { Calculator };
```

#### **Behavior-Driven Development (BDD)**
```javascript
// user.test.js
describe('User Management', () => {
  describe('Given a user wants to register', () => {
    describe('When they provide valid information', () => {
      test('Then they should be able to create an account', () => {
        const userData = {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'securePassword123'
        };
        
        const result = createUser(userData);
        
        expect(result.success).toBe(true);
        expect(result.user.email).toBe(userData.email);
      });
    });
    
    describe('When they provide invalid email', () => {
      test('Then they should receive an error message', () => {
        const userData = {
          name: 'John Doe',
          email: 'invalid-email',
          password: 'securePassword123'
        };
        
        expect(() => createUser(userData)).toThrow('Invalid email format');
      });
    });
  });
});
```

### 7. 🤖 Automação de Testes

#### **Hooks de Teste**
```javascript
// hooks.test.js
describe('Test Hooks', () => {
  beforeAll(() => {
    console.log('Before all tests');
    // Setup global
  });
  
  afterAll(() => {
    console.log('After all tests');
    // Cleanup global
  });
  
  beforeEach(() => {
    console.log('Before each test');
    // Setup for each test
  });
  
  afterEach(() => {
    console.log('After each test');
    // Cleanup after each test
  });
  
  test('first test', () => {
    expect(true).toBe(true);
  });
  
  test('second test', () => {
    expect(false).toBe(false);
  });
});
```

#### **Testes Assíncronos**
```javascript
// async.test.js
describe('Async Tests', () => {
  test('should handle promises', async () => {
    const result = await Promise.resolve('success');
    expect(result).toBe('success');
  });
  
  test('should handle async/await', async () => {
    const fetchData = async () => {
      return new Promise(resolve => {
        setTimeout(() => resolve('data'), 100);
      });
    };
    
    const result = await fetchData();
    expect(result).toBe('data');
  });
  
  test('should handle timeouts', async () => {
    const slowFunction = () => {
      return new Promise(resolve => {
        setTimeout(() => resolve('done'), 2000);
      });
    };
    
    const result = await slowFunction();
    expect(result).toBe('done');
  }, 3000); // Timeout de 3 segundos
});
```

### 8. 🔄 Integração com CI/CD

#### **GitHub Actions**
```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
```

#### **Scripts de CI**
```json
{
  "scripts": {
    "test:ci": "jest --coverage --watchAll=false --ci",
    "test:ci:verbose": "jest --coverage --watchAll=false --ci --verbose",
    "test:ci:silent": "jest --coverage --watchAll=false --ci --silent"
  }
}
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Testes Unitários Básicos**
Implemente testes unitários completos:
- Criar funções utilitárias
- Escrever testes para cada função
- Implementar diferentes cenários
- Verificar coverage

**Critérios de avaliação:**
- ✅ Funções criadas
- ✅ Testes implementados
- ✅ Cenários cobertos
- ✅ Coverage adequado

### **Exercício 2: Testes de Integração**
Desenvolva testes de integração:
- Criar API simples
- Testar endpoints
- Verificar respostas
- Testar erros

**Critérios de avaliação:**
- ✅ API criada
- ✅ Endpoints testados
- ✅ Respostas verificadas
- ✅ Erros testados

### **Exercício 3: Mocks e Stubs**
Implemente mocks avançados:
- Mockar dependências externas
- Criar stubs para funções
- Testar comportamentos
- Verificar chamadas

**Critérios de avaliação:**
- ✅ Mocks implementados
- ✅ Stubs criados
- ✅ Comportamentos testados
- ✅ Chamadas verificadas

### **Exercício 4: TDD Completo**
Aplique TDD em projeto:
- Escrever testes primeiro
- Implementar código mínimo
- Refatorar mantendo testes
- Documentar processo

**Critérios de avaliação:**
- ✅ Testes escritos primeiro
- ✅ Código implementado
- ✅ Refatoração realizada
- ✅ Processo documentado

---

## 💡 Dicas Importantes

### **1. Jest**
- Use describe para organizar testes
- Use test ou it para casos individuais
- Use beforeEach/afterEach para setup
- Use mocks para dependências externas

### **2. Testes**
- Escreva testes descritivos
- Teste casos de sucesso e erro
- Mantenha testes independentes
- Use dados de teste realistas

### **3. Coverage**
- Configure thresholds adequados
- Exclua arquivos desnecessários
- Monitore coverage regularmente
- Use relatórios visuais

### **4. CI/CD**
- Execute testes em cada commit
- Configure coverage reports
- Use diferentes ambientes
- Automatize deploy após testes

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Linting e Code Quality
- ESLint configuração
- Prettier para formatação
- Git hooks

---

## 📝 Checklist de Conclusão

- [ ] Dominou Jest para JavaScript
- [ ] Implementou testes unitários
- [ ] Criou testes de integração
- [ ] Aplicou mocks e stubs
- [ ] Configurou coverage e relatórios
- [ ] Implementou TDD e BDD
- [ ] Automatizou testes
- [ ] Integrou testes com CI/CD
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes cenários

**🎉 Parabéns! Você completou a Aula 4 com sucesso!**

---

## 📚 Recursos Adicionais

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/)
- [Supertest](https://github.com/visionmedia/supertest)
- [Jest Matchers](https://jestjs.io/docs/expect)

---

*Próxima aula: Linting e Code Quality*







