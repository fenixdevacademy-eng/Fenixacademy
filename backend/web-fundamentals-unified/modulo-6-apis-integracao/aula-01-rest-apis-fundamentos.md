# 🌐 Aula 1: REST APIs - Fundamentos
## Web Fundamentals - Módulo 6: APIs e Integração

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar arquitetura REST
- ✅ Implementar métodos HTTP corretos
- ✅ Designar endpoints eficientes
- ✅ Aplicar versionamento de APIs
- ✅ Documentar com OpenAPI
- ✅ Implementar testes de APIs
- ✅ Configurar middleware
- ✅ Aplicar boas práticas

---

## 📚 Conteúdo Principal

### 1. 🌟 Fundamentos da Arquitetura REST

#### **O que é REST?**
```javascript
// REST (Representational State Transfer) é um estilo arquitetural
// Baseado em princípios de simplicidade e escalabilidade
// Usa HTTP como protocolo de comunicação
// Stateless e cacheable

// Princípios REST:
// 1. Stateless - cada requisição é independente
// 2. Client-Server - separação de responsabilidades
// 3. Cacheable - respostas podem ser cacheadas
// 4. Uniform Interface - interface consistente
// 5. Layered System - arquitetura em camadas
// 6. Code on Demand - código opcional

// Exemplo de estrutura REST
const express = require('express');
const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Endpoints RESTful
app.get('/api/users', (req, res) => {
  // GET - Listar usuários
});

app.get('/api/users/:id', (req, res) => {
  // GET - Obter usuário específico
});

app.post('/api/users', (req, res) => {
  // POST - Criar novo usuário
});

app.put('/api/users/:id', (req, res) => {
  // PUT - Atualizar usuário completo
});

app.patch('/api/users/:id', (req, res) => {
  // PATCH - Atualizar usuário parcialmente
});

app.delete('/api/users/:id', (req, res) => {
  // DELETE - Remover usuário
});
```

#### **Estrutura de Projeto**
```bash
# Estrutura de projeto REST API
api-project/
├── src/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── services/
│   │   ├── userService.js
│   │   ├── productService.js
│   │   └── orderService.js
│   ├── utils/
│   │   ├── database.js
│   │   ├── logger.js
│   │   └── helpers.js
│   └── app.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   └── api.md
└── package.json
```

### 2. 🔄 Métodos HTTP e Status Codes

#### **Métodos HTTP**
```javascript
// GET - Recuperar dados
app.get('/api/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// POST - Criar novo recurso
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validação
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nome, email e senha são obrigatórios'
      });
    }
    
    const user = await userService.createUser({ name, email, password });
    
    res.status(201).json({
      success: true,
      data: user,
      message: 'Usuário criado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar usuário',
      error: error.message
    });
  }
});

// PUT - Atualizar recurso completo
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    const user = await userService.updateUser(id, { name, email, password });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user,
      message: 'Usuário atualizado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar usuário',
      error: error.message
    });
  }
});

// PATCH - Atualizar recurso parcialmente
app.patch('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const user = await userService.updateUserPartial(id, updates);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user,
      message: 'Usuário atualizado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar usuário',
      error: error.message
    });
  }
});

// DELETE - Remover recurso
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await userService.deleteUser(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Usuário removido com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao remover usuário',
      error: error.message
    });
  }
});
```

#### **Status Codes**
```javascript
// Status Codes HTTP
const statusCodes = {
  // 2xx - Sucesso
  200: 'OK',                    // Requisição bem-sucedida
  201: 'Created',               // Recurso criado com sucesso
  202: 'Accepted',              // Requisição aceita para processamento
  204: 'No Content',            // Sucesso sem conteúdo de retorno
  
  // 3xx - Redirecionamento
  301: 'Moved Permanently',     // Recurso movido permanentemente
  302: 'Found',                 // Recurso encontrado temporariamente
  304: 'Not Modified',          // Recurso não modificado
  
  // 4xx - Erro do Cliente
  400: 'Bad Request',           // Requisição inválida
  401: 'Unauthorized',          // Não autorizado
  403: 'Forbidden',             // Acesso negado
  404: 'Not Found',             // Recurso não encontrado
  409: 'Conflict',              // Conflito de recursos
  422: 'Unprocessable Entity',  // Entidade não processável
  429: 'Too Many Requests',     // Muitas requisições
  
  // 5xx - Erro do Servidor
  500: 'Internal Server Error', // Erro interno do servidor
  502: 'Bad Gateway',           // Gateway inválido
  503: 'Service Unavailable',   // Serviço indisponível
  504: 'Gateway Timeout'        // Timeout do gateway
};

// Exemplo de uso de status codes
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validação de ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }
    
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});
```

### 3. 🎯 Design de Endpoints

#### **Nomenclatura e Estrutura**
```javascript
// Boas práticas para design de endpoints

// 1. Use substantivos, não verbos
// ❌ Ruim
app.get('/api/getUsers', ...);
app.post('/api/createUser', ...);

// ✅ Bom
app.get('/api/users', ...);
app.post('/api/users', ...);

// 2. Use plural para recursos
// ❌ Ruim
app.get('/api/user', ...);
app.get('/api/product', ...);

// ✅ Bom
app.get('/api/users', ...);
app.get('/api/products', ...);

// 3. Use hierarquia para relacionamentos
// ✅ Bom
app.get('/api/users/:userId/orders', ...);
app.get('/api/users/:userId/orders/:orderId', ...);
app.get('/api/users/:userId/orders/:orderId/items', ...);

// 4. Use query parameters para filtros e paginação
// ✅ Bom
app.get('/api/users?page=1&limit=10&sort=name&order=asc', ...);
app.get('/api/products?category=electronics&price_min=100&price_max=500', ...);

// 5. Use versionamento na URL
// ✅ Bom
app.get('/api/v1/users', ...);
app.get('/api/v2/users', ...);
```

#### **Implementação de Endpoints**
```javascript
// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validation');

// Middleware de autenticação para todas as rotas
router.use(authMiddleware);

// GET /api/v1/users - Listar usuários com paginação e filtros
router.get('/', 
  validationMiddleware.validateQuery,
  userController.getUsers
);

// GET /api/v1/users/:id - Obter usuário específico
router.get('/:id',
  validationMiddleware.validateId,
  userController.getUserById
);

// POST /api/v1/users - Criar novo usuário
router.post('/',
  validationMiddleware.validateUser,
  userController.createUser
);

// PUT /api/v1/users/:id - Atualizar usuário completo
router.put('/:id',
  validationMiddleware.validateId,
  validationMiddleware.validateUser,
  userController.updateUser
);

// PATCH /api/v1/users/:id - Atualizar usuário parcialmente
router.patch('/:id',
  validationMiddleware.validateId,
  validationMiddleware.validateUserPartial,
  userController.updateUserPartial
);

// DELETE /api/v1/users/:id - Remover usuário
router.delete('/:id',
  validationMiddleware.validateId,
  userController.deleteUser
);

// GET /api/v1/users/:id/orders - Obter pedidos do usuário
router.get('/:id/orders',
  validationMiddleware.validateId,
  userController.getUserOrders
);

module.exports = router;
```

### 4. 📝 Versionamento de APIs

#### **Estratégias de Versionamento**
```javascript
// 1. Versionamento na URL (mais comum)
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// 2. Versionamento no header
app.use((req, res, next) => {
  const version = req.headers['api-version'] || 'v1';
  req.apiVersion = version;
  next();
});

// 3. Versionamento por query parameter
app.use((req, res, next) => {
  const version = req.query.version || 'v1';
  req.apiVersion = version;
  next();
});

// Exemplo de implementação
// routes/v1/userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.json({
    version: 'v1',
    data: users,
    message: 'API v1 - Formato antigo'
  });
});

// routes/v2/userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.json({
    version: 'v2',
    data: users,
    metadata: {
      total: users.length,
      page: 1,
      limit: 10
    },
    message: 'API v2 - Formato melhorado'
  });
});

// app.js
const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
```

#### **Migração de Versões**
```javascript
// Estratégia de migração
class ApiVersionManager {
  constructor() {
    this.versions = {
      v1: {
        supported: true,
        deprecated: false,
        sunsetDate: null
      },
      v2: {
        supported: true,
        deprecated: false,
        sunsetDate: null
      }
    };
  }
  
  // Verificar se versão é suportada
  isVersionSupported(version) {
    return this.versions[version]?.supported || false;
  }
  
  // Verificar se versão está depreciada
  isVersionDeprecated(version) {
    return this.versions[version]?.deprecated || false;
  }
  
  // Obter informações da versão
  getVersionInfo(version) {
    return this.versions[version] || null;
  }
  
  // Depreciar versão
  deprecateVersion(version, sunsetDate) {
    if (this.versions[version]) {
      this.versions[version].deprecated = true;
      this.versions[version].sunsetDate = sunsetDate;
    }
  }
}

// Middleware de versionamento
const versionManager = new ApiVersionManager();

const versionMiddleware = (req, res, next) => {
  const version = req.params.version || req.headers['api-version'] || 'v1';
  
  if (!versionManager.isVersionSupported(version)) {
    return res.status(400).json({
      success: false,
      message: `Versão ${version} não é suportada`,
      supportedVersions: Object.keys(versionManager.versions)
    });
  }
  
  if (versionManager.isVersionDeprecated(version)) {
    const versionInfo = versionManager.getVersionInfo(version);
    res.set('Deprecation', 'true');
    res.set('Sunset', versionInfo.sunsetDate);
    res.set('Warning', `Versão ${version} está depreciada. Use versão mais recente.`);
  }
  
  req.apiVersion = version;
  next();
};
```

### 5. 📚 Documentação com OpenAPI

#### **Configuração do Swagger**
```bash
# Instalação
npm install swagger-jsdoc swagger-ui-express

# Configuração
```

```javascript
// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'API REST para gerenciamento de usuários',
      contact: {
        name: 'Equipe de Desenvolvimento',
        email: 'dev@exemplo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor de desenvolvimento'
      },
      {
        url: 'https://api.exemplo.com/v1',
        description: 'Servidor de produção'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do usuário'
            },
            name: {
              type: 'string',
              description: 'Nome do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            error: {
              type: 'string',
              description: 'Detalhes do erro'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
```

#### **Documentação de Endpoints**
```javascript
// userController.js
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar usuários
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limite de itens por página
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await userService.getUsers(page, limit);
    
    res.status(200).json({
      success: true,
      data: users.data,
      pagination: users.pagination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Senha do usuário
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password });
    
    res.status(201).json({
      success: true,
      data: user,
      message: 'Usuário criado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar usuário',
      error: error.message
    });
  }
};
```

### 6. 🧪 Testes de APIs

#### **Testes com Supertest**
```bash
# Instalação
npm install --save-dev supertest jest

# Configuração
```

```javascript
// tests/integration/user.test.js
const request = require('supertest');
const app = require('../../src/app');
const userService = require('../../src/services/userService');

// Mock do serviço
jest.mock('../../src/services/userService');

describe('User API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('GET /api/v1/users', () => {
    test('should return list of users', async () => {
      const mockUsers = [
        { id: 1, name: 'João', email: 'joao@exemplo.com' },
        { id: 2, name: 'Maria', email: 'maria@exemplo.com' }
      ];
      
      userService.getUsers.mockResolvedValue({
        data: mockUsers,
        pagination: { page: 1, limit: 10, total: 2 }
      });
      
      const response = await request(app)
        .get('/api/v1/users')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination).toBeDefined();
    });
    
    test('should handle pagination', async () => {
      userService.getUsers.mockResolvedValue({
        data: [],
        pagination: { page: 2, limit: 5, total: 0 }
      });
      
      const response = await request(app)
        .get('/api/v1/users?page=2&limit=5')
        .expect(200);
      
      expect(response.body.pagination.page).toBe(2);
      expect(response.body.pagination.limit).toBe(5);
    });
  });
  
  describe('POST /api/v1/users', () => {
    test('should create new user', async () => {
      const newUser = {
        name: 'João',
        email: 'joao@exemplo.com',
        password: 'senha123'
      };
      
      const createdUser = { id: 1, ...newUser };
      userService.createUser.mockResolvedValue(createdUser);
      
      const response = await request(app)
        .post('/api/v1/users')
        .send(newUser)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(newUser.name);
      expect(response.body.message).toBe('Usuário criado com sucesso');
    });
    
    test('should return 400 for invalid data', async () => {
      const invalidUser = {
        name: 'João'
        // missing email and password
      };
      
      const response = await request(app)
        .post('/api/v1/users')
        .send(invalidUser)
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('obrigatórios');
    });
  });
  
  describe('GET /api/v1/users/:id', () => {
    test('should return user by id', async () => {
      const mockUser = { id: 1, name: 'João', email: 'joao@exemplo.com' };
      userService.getUserById.mockResolvedValue(mockUser);
      
      const response = await request(app)
        .get('/api/v1/users/1')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
    });
    
    test('should return 404 for non-existent user', async () => {
      userService.getUserById.mockResolvedValue(null);
      
      const response = await request(app)
        .get('/api/v1/users/999')
        .expect(404);
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Usuário não encontrado');
    });
  });
});
```

### 7. 🔧 Middleware e Validação

#### **Middleware de Validação**
```javascript
// middleware/validation.js
const Joi = require('joi');

// Schema de validação para usuário
const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Schema de validação para ID
const idSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});

// Schema de validação para query parameters
const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sort: Joi.string().valid('name', 'email', 'createdAt').default('name'),
  order: Joi.string().valid('asc', 'desc').default('asc')
});

// Middleware de validação
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

const validateId = (req, res, next) => {
  const { error } = idSchema.validate({ id: req.params.id });
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'ID inválido',
      errors: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

const validateQuery = (req, res, next) => {
  const { error } = querySchema.validate(req.query);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Parâmetros de query inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

module.exports = {
  validateUser,
  validateId,
  validateQuery
};
```

#### **Middleware de Erro**
```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log do erro
  console.error(err);
  
  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = {
      message: 'Dados inválidos',
      errors: message
    };
    return res.status(400).json({
      success: false,
      ...error
    });
  }
  
  // Erro de duplicação
  if (err.code === 11000) {
    const message = 'Recurso já existe';
    error = { message };
    return res.status(409).json({
      success: false,
      message
    });
  }
  
  // Erro de cast
  if (err.name === 'CastError') {
    const message = 'ID inválido';
    error = { message };
    return res.status(400).json({
      success: false,
      message
    });
  }
  
  // Erro padrão
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Erro interno do servidor'
  });
};

module.exports = errorHandler;
```

### 8. 🚀 Boas Práticas

#### **Estrutura de Resposta**
```javascript
// utils/response.js
class ApiResponse {
  static success(data, message = 'Sucesso', statusCode = 200) {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    };
  }
  
  static error(message = 'Erro', statusCode = 500, errors = null) {
    return {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString()
    };
  }
  
  static paginated(data, pagination, message = 'Sucesso') {
    return {
      success: true,
      data,
      pagination,
      message,
      timestamp: new Date().toISOString()
    };
  }
}

// Uso nos controllers
const getUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await userService.getUsers(page, limit);
    
    res.status(200).json(
      ApiResponse.paginated(result.data, result.pagination)
    );
  } catch (error) {
    res.status(500).json(
      ApiResponse.error('Erro interno do servidor', 500, error.message)
    );
  }
};
```

#### **Rate Limiting**
```javascript
// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

// Rate limiter geral
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requisições por IP
  message: {
    success: false,
    message: 'Muitas requisições, tente novamente em 15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter para autenticação
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas de login
  message: {
    success: false,
    message: 'Muitas tentativas de login, tente novamente em 15 minutos'
  },
  skipSuccessfulRequests: true
});

// Rate limiter para criação de recursos
const createLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // máximo 10 criações por minuto
  message: {
    success: false,
    message: 'Muitas criações, tente novamente em 1 minuto'
  }
});

module.exports = {
  generalLimiter,
  authLimiter,
  createLimiter
};
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: API REST Básica**
Implemente API REST completa:
- Criar estrutura de projeto
- Implementar CRUD de usuários
- Configurar rotas e middleware
- Implementar validação

**Critérios de avaliação:**
- ✅ Estrutura criada
- ✅ CRUD implementado
- ✅ Rotas configuradas
- ✅ Validação implementada

### **Exercício 2: Documentação OpenAPI**
Documente API com Swagger:
- Configurar Swagger
- Documentar endpoints
- Configurar schemas
- Testar documentação

**Critérios de avaliação:**
- ✅ Swagger configurado
- ✅ Endpoints documentados
- ✅ Schemas configurados
- ✅ Documentação testada

### **Exercício 3: Testes de API**
Implemente testes completos:
- Configurar Supertest
- Implementar testes unitários
- Implementar testes de integração
- Configurar coverage

**Critérios de avaliação:**
- ✅ Supertest configurado
- ✅ Testes unitários
- ✅ Testes de integração
- ✅ Coverage configurado

### **Exercício 4: Middleware e Segurança**
Implemente middleware avançado:
- Configurar validação
- Implementar rate limiting
- Configurar error handling
- Implementar logging

**Critérios de avaliação:**
- ✅ Validação configurada
- ✅ Rate limiting implementado
- ✅ Error handling configurado
- ✅ Logging implementado

---

## 💡 Dicas Importantes

### **1. Design de APIs**
- Use substantivos para recursos
- Implemente versionamento
- Documente tudo
- Mantenha consistência

### **2. Status Codes**
- Use códigos apropriados
- Seja consistente
- Documente códigos de erro
- Implemente tratamento adequado

### **3. Validação**
- Valide entrada sempre
- Use schemas consistentes
- Retorne erros claros
- Implemente sanitização

### **4. Testes**
- Teste casos de sucesso e erro
- Use mocks adequadamente
- Implemente testes de integração
- Mantenha coverage alto

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Autenticação e Autorização
- JWT e tokens
- OAuth 2.0
- Middleware de segurança

---

## 📝 Checklist de Conclusão

- [ ] Dominou arquitetura REST
- [ ] Implementou métodos HTTP corretos
- [ ] Designou endpoints eficientes
- [ ] Aplicou versionamento de APIs
- [ ] Documentou com OpenAPI
- [ ] Implementou testes de APIs
- [ ] Configurou middleware
- [ ] Aplicou boas práticas
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes cenários

**🎉 Parabéns! Você completou a Aula 1 com sucesso!**

---

## 📚 Recursos Adicionais

- [REST API Design](https://restfulapi.net/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [API Design Best Practices](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)

---

*Próxima aula: Autenticação e Autorização*







