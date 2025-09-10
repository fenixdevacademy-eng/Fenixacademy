# Aula 3: APIs REST Avançadas

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Entender os princípios REST e design de APIs
- Implementar versionamento de APIs
- Criar documentação com Swagger/OpenAPI
- Implementar testes automatizados para APIs
- Otimizar APIs com cache e paginação
- Criar APIs escaláveis e robustas

## 📚 Conteúdo da Aula

### 1. Princípios REST

#### Características de uma API RESTful
- **Stateless**: Cada requisição contém toda informação necessária
- **Client-Server**: Separação clara entre cliente e servidor
- **Cacheable**: Respostas podem ser cacheadas
- **Uniform Interface**: Interface consistente e padronizada
- **Layered System**: Arquitetura em camadas
- **Code on Demand**: Código pode ser enviado ao cliente (opcional)

#### Métodos HTTP e Semântica

```javascript
// GET - Recuperar recursos
app.get('/api/users', (req, res) => {
    // Retorna lista de usuários
});

// POST - Criar novo recurso
app.post('/api/users', (req, res) => {
    // Cria novo usuário
});

// PUT - Atualizar recurso completo
app.put('/api/users/:id', (req, res) => {
    // Atualiza usuário inteiro
});

// PATCH - Atualizar recurso parcialmente
app.patch('/api/users/:id', (req, res) => {
    // Atualiza campos específicos
});

// DELETE - Remover recurso
app.delete('/api/users/:id', (req, res) => {
    // Remove usuário
});
```

### 2. Design de APIs

#### Estrutura de URLs

```javascript
// ✅ Boas práticas
GET    /api/v1/users              // Lista usuários
GET    /api/v1/users/123          // Usuário específico
POST   /api/v1/users              // Criar usuário
PUT    /api/v1/users/123          // Atualizar usuário
DELETE /api/v1/users/123          // Deletar usuário

GET    /api/v1/users/123/posts    // Posts do usuário
GET    /api/v1/users/123/posts/456 // Post específico

// ❌ Evitar
GET    /api/getUsers
POST   /api/createUser
GET    /api/user?id=123
```

#### Códigos de Status HTTP

```javascript
// 2xx - Sucesso
200 OK                    // Requisição bem-sucedida
201 Created              // Recurso criado
204 No Content           // Sucesso sem conteúdo

// 4xx - Erro do cliente
400 Bad Request          // Requisição inválida
401 Unauthorized         // Não autenticado
403 Forbidden            // Não autorizado
404 Not Found            // Recurso não encontrado
422 Unprocessable Entity // Dados inválidos

// 5xx - Erro do servidor
500 Internal Server Error // Erro interno
502 Bad Gateway          // Erro de gateway
503 Service Unavailable  // Serviço indisponível
```

### 3. Versionamento de APIs

#### Estratégias de Versionamento

```javascript
// 1. URL Versioning
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// 2. Header Versioning
app.use((req, res, next) => {
    const version = req.headers['api-version'] || 'v1';
    req.apiVersion = version;
    next();
});

// 3. Query Parameter Versioning
app.use((req, res, next) => {
    const version = req.query.version || 'v1';
    req.apiVersion = version;
    next();
});
```

#### Implementação Prática

```javascript
// routes/v1/users.js
const express = require('express');
const router = express.Router();

// V1 - Estrutura simples
router.get('/users', (req, res) => {
    res.json({
        users: [
            { id: 1, name: 'João', email: 'joao@email.com' }
        ]
    });
});

module.exports = router;

// routes/v2/users.js
const express = require('express');
const router = express.Router();

// V2 - Estrutura melhorada com paginação
router.get('/users', (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    
    res.json({
        data: [
            { 
                id: 1, 
                name: 'João', 
                email: 'joao@email.com',
                createdAt: '2024-01-01T00:00:00Z'
            }
        ],
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: 1,
            pages: 1
        },
        meta: {
            version: 'v2',
            timestamp: new Date().toISOString()
        }
    });
});

module.exports = router;
```

### 4. Documentação com Swagger

#### Configuração do Swagger

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
            description: 'API para gerenciamento de usuários',
            contact: {
                name: 'Equipe de Desenvolvimento',
                email: 'dev@empresa.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Servidor de Desenvolvimento'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
```

#### Documentação de Endpoints

```javascript
// routes/users.js
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
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
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                     pages:
 *                       type: integer
 */
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await User.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const total = await User.countDocuments();
        
        res.json({
            data: users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

### 5. Testes de APIs

#### Configuração de Testes

```javascript
// tests/setup.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});
```

#### Testes de Integração

```javascript
// tests/users.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Users API', () => {
    describe('GET /api/v1/users', () => {
        it('should return empty array when no users exist', async () => {
            const response = await request(app)
                .get('/api/v1/users')
                .expect(200);
            
            expect(response.body.data).toEqual([]);
            expect(response.body.pagination.total).toBe(0);
        });

        it('should return users with pagination', async () => {
            // Criar usuários de teste
            await User.create([
                { name: 'João', email: 'joao@email.com' },
                { name: 'Maria', email: 'maria@email.com' }
            ]);

            const response = await request(app)
                .get('/api/v1/users?page=1&limit=1')
                .expect(200);
            
            expect(response.body.data).toHaveLength(1);
            expect(response.body.pagination.total).toBe(2);
            expect(response.body.pagination.pages).toBe(2);
        });
    });

    describe('POST /api/v1/users', () => {
        it('should create a new user', async () => {
            const userData = {
                name: 'João Silva',
                email: 'joao@email.com'
            };

            const response = await request(app)
                .post('/api/v1/users')
                .send(userData)
                .expect(201);
            
            expect(response.body.name).toBe(userData.name);
            expect(response.body.email).toBe(userData.email);
            expect(response.body.id).toBeDefined();
        });

        it('should return 400 for invalid data', async () => {
            const invalidData = {
                name: 'João'
                // email ausente
            };

            await request(app)
                .post('/api/v1/users')
                .send(invalidData)
                .expect(400);
        });
    });

    describe('PUT /api/v1/users/:id', () => {
        it('should update user', async () => {
            const user = await User.create({
                name: 'João',
                email: 'joao@email.com'
            });

            const updateData = {
                name: 'João Silva',
                email: 'joao.silva@email.com'
            };

            const response = await request(app)
                .put(`/api/v1/users/${user.id}`)
                .send(updateData)
                .expect(200);
            
            expect(response.body.name).toBe(updateData.name);
            expect(response.body.email).toBe(updateData.email);
        });

        it('should return 404 for non-existent user', async () => {
            const updateData = {
                name: 'João Silva'
            };

            await request(app)
                .put('/api/v1/users/507f1f77bcf86cd799439011')
                .send(updateData)
                .expect(404);
        });
    });
});
```

### 6. Otimização e Cache

#### Implementação de Cache

```javascript
// middleware/cache.js
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutos

const cacheMiddleware = (duration = 600) => {
    return (req, res, next) => {
        const key = req.originalUrl;
        const cachedResponse = cache.get(key);
        
        if (cachedResponse) {
            return res.json(cachedResponse);
        }
        
        // Interceptar res.json para cachear a resposta
        const originalJson = res.json;
        res.json = function(data) {
            cache.set(key, data, duration);
            return originalJson.call(this, data);
        };
        
        next();
    };
};

module.exports = { cacheMiddleware, cache };
```

#### Paginação Eficiente

```javascript
// utils/pagination.js
const paginate = async (model, query = {}, options = {}) => {
    const {
        page = 1,
        limit = 10,
        sort = { createdAt: -1 },
        select = null
    } = options;

    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
        model.find(query)
            .select(select)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(), // Para melhor performance
        model.countDocuments(query)
    ]);

    return {
        data,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        }
    };
};

module.exports = { paginate };
```

#### Implementação com Cache e Paginação

```javascript
// routes/users.js
const { cacheMiddleware } = require('../middleware/cache');
const { paginate } = require('../utils/pagination');

// Listar usuários com cache
router.get('/users', cacheMiddleware(300), async (req, res) => {
    try {
        const { page, limit, search, sort } = req.query;
        
        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        
        const sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(':');
            sortOptions[field] = order === 'desc' ? -1 : 1;
        }
        
        const result = await paginate(User, query, {
            page,
            limit,
            sort: sortOptions,
            select: 'name email createdAt'
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### 7. Middleware Avançado

#### Validação de Dados

```javascript
// middleware/validation.js
const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Dados inválidos',
            details: errors.array()
        });
    }
    next();
};

const validateUser = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Nome deve ter entre 2 e 50 caracteres'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Senha deve ter pelo menos 6 caracteres'),
    handleValidationErrors
];

const validateObjectId = [
    param('id')
        .isMongoId()
        .withMessage('ID inválido'),
    handleValidationErrors
];

const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Página deve ser um número positivo'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit deve ser entre 1 e 100'),
    handleValidationErrors
];

module.exports = {
    validateUser,
    validateObjectId,
    validatePagination,
    handleValidationErrors
};
```

#### Logging e Monitoramento

```javascript
// middleware/logging.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info({
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
    });
    
    next();
};

const errorLogger = (err, req, res, next) => {
    logger.error({
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip
    });
    
    next(err);
};

module.exports = { logger, requestLogger, errorLogger };
```

### 8. Projeto Prático Completo

#### Estrutura do Projeto

```
api-project/
├── app.js
├── package.json
├── .env
├── middleware/
│   ├── auth.js
│   ├── cache.js
│   ├── logging.js
│   └── validation.js
├── models/
│   └── User.js
├── routes/
│   ├── v1/
│   │   └── users.js
│   └── v2/
│       └── users.js
├── utils/
│   └── pagination.js
├── tests/
│   ├── setup.js
│   └── users.test.js
└── docs/
    └── swagger.js
```

#### Aplicação Principal

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');

const { specs } = require('./docs/swagger');
const { requestLogger, errorLogger } = require('./middleware/logging');
const v1Routes = require('./routes/v1/users');
const v2Routes = require('./routes/v2/users');

const app = express();

// Middleware de segurança
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Muitas requisições. Tente novamente em 15 minutos.'
});
app.use(limiter);

// Logging
app.use(requestLogger);

// Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling
app.use(errorLogger);
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Erro interno do servidor' 
            : err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint não encontrado',
        path: req.originalUrl
    });
});

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});

module.exports = app;
```

## 🎯 Exercícios Práticos

### Exercício 1: API RESTful Completa
Crie uma API RESTful para gerenciar produtos com:
- CRUD completo
- Paginação
- Validação de dados
- Documentação Swagger

### Exercício 2: Versionamento de API
Implemente duas versões de uma API:
- V1: Estrutura simples
- V2: Com paginação e metadados

### Exercício 3: Testes Automatizados
Crie testes completos para uma API:
- Testes de integração
- Testes de validação
- Testes de autenticação

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Princípios REST** e design de APIs
2. **Versionamento** de APIs
3. **Documentação** com Swagger/OpenAPI
4. **Testes automatizados** para APIs
5. **Otimização** com cache e paginação
6. **Middleware avançado** para validação e logging
7. **Implementação completa** de uma API robusta
8. **Boas práticas** de desenvolvimento

## 🚀 Próxima Aula

Na próxima aula, vamos explorar **GraphQL**, incluindo:
- Conceitos fundamentais do GraphQL
- Schema e tipos
- Resolvers e queries
- Mutations e subscriptions
- Integração com banco de dados

## 📚 Recursos Adicionais

- [REST API Tutorial](https://restfulapi.net/) - Guia completo de APIs REST
- [Swagger/OpenAPI](https://swagger.io/) - Documentação de APIs
- [Jest](https://jestjs.io/) - Framework de testes
- [Supertest](https://github.com/visionmedia/supertest) - Testes de APIs
- [Node-Cache](https://github.com/node-cache/node-cache) - Cache em memória







