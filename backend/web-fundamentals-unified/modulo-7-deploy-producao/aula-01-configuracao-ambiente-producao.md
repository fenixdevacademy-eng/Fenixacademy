# Aula 1: Configuração de Ambiente de Produção

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Configurar variáveis de ambiente para produção
- Configurar banco de dados para produção
- Implementar segurança em produção
- Configurar logs e monitoramento
- Otimizar aplicações para produção

## 📚 Conteúdo da Aula

### 1. Variáveis de Ambiente

#### Configuração de Ambiente

```javascript
// config/environment.js
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

const config = {
    development: {
        port: process.env.PORT || 3000,
        database: {
            url: process.env.DEV_DATABASE_URL || 'mongodb://localhost:27017/app_dev',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        },
        jwt: {
            secret: process.env.JWT_SECRET || 'dev-secret-key',
            expiresIn: '24h'
        },
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:3001'],
            credentials: true
        },
        logging: {
            level: 'debug',
            format: 'dev'
        }
    },
    
    production: {
        port: process.env.PORT || 3000,
        database: {
            url: process.env.DATABASE_URL,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                ssl: true,
                sslValidate: true,
                authSource: 'admin'
            }
        },
        jwt: {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h'
        },
        cors: {
            origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
            credentials: true
        },
        logging: {
            level: 'info',
            format: 'json'
        }
    },
    
    test: {
        port: process.env.PORT || 3001,
        database: {
            url: process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/app_test',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        },
        jwt: {
            secret: 'test-secret-key',
            expiresIn: '1h'
        },
        cors: {
            origin: ['http://localhost:3000'],
            credentials: true
        },
        logging: {
            level: 'error',
            format: 'simple'
        }
    }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
```

#### Arquivo .env

```bash
# .env.example
# Copie este arquivo para .env e configure as variáveis

# Ambiente
NODE_ENV=development

# Servidor
PORT=3000

# Banco de Dados
DATABASE_URL=mongodb://localhost:27017/app_prod
DEV_DATABASE_URL=mongodb://localhost:27017/app_dev
TEST_DATABASE_URL=mongodb://localhost:27017/app_test

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# APIs Externas
GITHUB_TOKEN=your-github-token
OPENWEATHER_API_KEY=your-openweather-api-key
NEWS_API_KEY=your-news-api-key

# Redis
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=info
LOGTAIL_TOKEN=your-logtail-token

# Webhooks
WEBHOOK_SECRET=your-webhook-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Storage
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket

# Monitoring
SENTRY_DSN=your-sentry-dsn
NEW_RELIC_LICENSE_KEY=your-newrelic-license-key
```

#### Validação de Variáveis

```javascript
// utils/validateEnv.js
const requiredEnvVars = [
    'NODE_ENV',
    'DATABASE_URL',
    'JWT_SECRET'
];

const productionEnvVars = [
    'ALLOWED_ORIGINS',
    'REDIS_URL',
    'SENTRY_DSN'
];

function validateEnvironment() {
    const missing = [];
    
    // Verificar variáveis obrigatórias
    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    });
    
    // Verificar variáveis de produção
    if (process.env.NODE_ENV === 'production') {
        productionEnvVars.forEach(varName => {
            if (!process.env[varName]) {
                missing.push(varName);
            }
        });
    }
    
    if (missing.length > 0) {
        console.error('❌ Variáveis de ambiente obrigatórias não encontradas:');
        missing.forEach(varName => {
            console.error(`   - ${varName}`);
        });
        process.exit(1);
    }
    
    console.log('✅ Variáveis de ambiente validadas com sucesso');
}

module.exports = { validateEnvironment };
```

### 2. Configuração de Banco de Dados

#### Conexão com MongoDB

```javascript
// database/mongodb.js
const mongoose = require('mongoose');
const config = require('../config/environment');
const logger = require('../services/logger');

class MongoDBConnection {
    constructor() {
        this.connection = null;
    }
    
    async connect() {
        try {
            const options = {
                ...config.database.options,
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                bufferCommands: false,
                bufferMaxEntries: 0
            };
            
            this.connection = await mongoose.connect(config.database.url, options);
            
            logger.info('Conectado ao MongoDB', {
                host: this.connection.connection.host,
                port: this.connection.connection.port,
                name: this.connection.connection.name
            });
            
            // Event listeners
            mongoose.connection.on('error', (error) => {
                logger.error('Erro na conexão MongoDB', error);
            });
            
            mongoose.connection.on('disconnected', () => {
                logger.warn('Desconectado do MongoDB');
            });
            
            mongoose.connection.on('reconnected', () => {
                logger.info('Reconectado ao MongoDB');
            });
            
            return this.connection;
        } catch (error) {
            logger.error('Erro ao conectar ao MongoDB', error);
            throw error;
        }
    }
    
    async disconnect() {
        try {
            if (this.connection) {
                await mongoose.disconnect();
                logger.info('Desconectado do MongoDB');
            }
        } catch (error) {
            logger.error('Erro ao desconectar do MongoDB', error);
            throw error;
        }
    }
    
    async healthCheck() {
        try {
            const state = mongoose.connection.readyState;
            const states = {
                0: 'disconnected',
                1: 'connected',
                2: 'connecting',
                3: 'disconnecting'
            };
            
            return {
                status: state === 1 ? 'healthy' : 'unhealthy',
                state: states[state],
                host: mongoose.connection.host,
                port: mongoose.connection.port,
                name: mongoose.connection.name
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                error: error.message
            };
        }
    }
}

module.exports = new MongoDBConnection();
```

#### Configuração de Redis

```javascript
// database/redis.js
const redis = require('redis');
const config = require('../config/environment');
const logger = require('../services/logger');

class RedisConnection {
    constructor() {
        this.client = null;
    }
    
    async connect() {
        try {
            this.client = redis.createClient({
                url: config.redis?.url || 'redis://localhost:6379',
                retry_strategy: (options) => {
                    if (options.error && options.error.code === 'ECONNREFUSED') {
                        logger.error('Redis server connection refused');
                        return new Error('Redis server connection refused');
                    }
                    if (options.total_retry_time > 1000 * 60 * 60) {
                        logger.error('Redis retry time exhausted');
                        return new Error('Retry time exhausted');
                    }
                    if (options.attempt > 10) {
                        logger.error('Redis max retry attempts reached');
                        return undefined;
                    }
                    return Math.min(options.attempt * 100, 3000);
                }
            });
            
            this.client.on('error', (error) => {
                logger.error('Erro na conexão Redis', error);
            });
            
            this.client.on('connect', () => {
                logger.info('Conectado ao Redis');
            });
            
            this.client.on('ready', () => {
                logger.info('Redis pronto para uso');
            });
            
            this.client.on('end', () => {
                logger.warn('Conexão Redis encerrada');
            });
            
            await this.client.connect();
            return this.client;
        } catch (error) {
            logger.error('Erro ao conectar ao Redis', error);
            throw error;
        }
    }
    
    async disconnect() {
        try {
            if (this.client) {
                await this.client.quit();
                logger.info('Desconectado do Redis');
            }
        } catch (error) {
            logger.error('Erro ao desconectar do Redis', error);
            throw error;
        }
    }
    
    async healthCheck() {
        try {
            if (!this.client) {
                return { status: 'unhealthy', error: 'Not connected' };
            }
            
            const pong = await this.client.ping();
            return {
                status: pong === 'PONG' ? 'healthy' : 'unhealthy',
                response: pong
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                error: error.message
            };
        }
    }
}

module.exports = new RedisConnection();
```

### 3. Segurança em Produção

#### Middleware de Segurança

```javascript
// middleware/security.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Configuração do Helmet
const helmetConfig = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"]
        }
    },
    crossOriginEmbedderPolicy: false
};

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requisições por IP
    message: {
        error: 'Muitas requisições. Tente novamente em 15 minutos.',
        retryAfter: 15 * 60
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            error: 'Muitas requisições. Tente novamente em 15 minutos.',
            retryAfter: 15 * 60
        });
    }
});

// Slow down
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutos
    delayAfter: 50, // permitir 50 requisições por 15 minutos
    delayMs: 500 // adicionar 500ms de delay após o limite
});

// Sanitização de dados
const sanitizeConfig = {
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
        console.warn(`Campo sanitizado: ${key}`);
    }
};

module.exports = {
    helmet: helmet(helmetConfig),
    limiter,
    speedLimiter,
    mongoSanitize: mongoSanitize(sanitizeConfig),
    xss: xss(),
    hpp: hpp()
};
```

#### Validação de Entrada

```javascript
// middleware/validation.js
const { body, param, query, validationResult } = require('express-validator');
const validator = require('validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Dados inválidos',
            details: errors.array().map(err => ({
                field: err.path,
                message: err.msg,
                value: err.value
            }))
        });
    }
    next();
};

// Validações comuns
const validateObjectId = [
    param('id')
        .isMongoId()
        .withMessage('ID inválido'),
    handleValidationErrors
];

const validateEmail = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),
    handleValidationErrors
];

const validatePassword = [
    body('password')
        .isLength({ min: 8 })
        .withMessage('Senha deve ter pelo menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial'),
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

// Validação customizada
const validateNoSQLInjection = (req, res, next) => {
    const suspiciousPatterns = [
        /\$where/i,
        /\$ne/i,
        /\$gt/i,
        /\$lt/i,
        /\$regex/i,
        /\$exists/i,
        /\$in/i,
        /\$nin/i
    ];
    
    const checkObject = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                checkObject(obj[key]);
            } else if (typeof obj[key] === 'string') {
                for (const pattern of suspiciousPatterns) {
                    if (pattern.test(obj[key])) {
                        return res.status(400).json({
                            error: 'Dados suspeitos detectados'
                        });
                    }
                }
            }
        }
    };
    
    checkObject(req.body);
    checkObject(req.query);
    checkObject(req.params);
    
    next();
};

module.exports = {
    handleValidationErrors,
    validateObjectId,
    validateEmail,
    validatePassword,
    validatePagination,
    validateNoSQLInjection
};
```

### 4. Logs e Monitoramento

#### Sistema de Logging Avançado

```javascript
// services/logger.js
const winston = require('winston');
const { Logtail } = require('@logtail/node');
const config = require('../config/environment');

class LoggerService {
    constructor() {
        this.logtail = process.env.LOGTAIL_TOKEN ? new Logtail(process.env.LOGTAIL_TOKEN) : null;
        
        this.logger = winston.createLogger({
            level: config.logging.level,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.json()
            ),
            defaultMeta: {
                service: 'web-fundamentals-api',
                environment: process.env.NODE_ENV
            },
            transports: [
                new winston.transports.File({ 
                    filename: 'logs/error.log', 
                    level: 'error',
                    maxsize: 5242880, // 5MB
                    maxFiles: 5
                }),
                new winston.transports.File({ 
                    filename: 'logs/combined.log',
                    maxsize: 5242880, // 5MB
                    maxFiles: 5
                })
            ]
        });
        
        // Adicionar console transport em desenvolvimento
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            }));
        }
        
        // Adicionar Logtail em produção
        if (this.logtail && process.env.NODE_ENV === 'production') {
            this.logger.add(new winston.transports.Stream({
                stream: this.logtail.stream
            }));
        }
    }
    
    info(message, meta = {}) {
        this.logger.info(message, meta);
    }
    
    error(message, error = null, meta = {}) {
        if (error) {
            meta.error = {
                message: error.message,
                stack: error.stack,
                name: error.name
            };
        }
        this.logger.error(message, meta);
    }
    
    warn(message, meta = {}) {
        this.logger.warn(message, meta);
    }
    
    debug(message, meta = {}) {
        this.logger.debug(message, meta);
    }
    
    // Log específico para requisições HTTP
    httpRequest(req, res, duration) {
        this.info('HTTP Request', {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            userId: req.user?.id
        });
    }
    
    // Log específico para erros de API
    apiError(method, url, error, meta = {}) {
        this.error('API Error', error, {
            method,
            url,
            ...meta
        });
    }
    
    // Log para eventos de negócio
    businessEvent(event, data, userId = null) {
        this.info('Business Event', {
            event,
            data,
            userId,
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = new LoggerService();
```

#### Monitoramento de Performance

```javascript
// services/monitoring.js
const logger = require('./logger');

class MonitoringService {
    constructor() {
        this.metrics = {
            requests: {
                total: 0,
                successful: 0,
                failed: 0,
                averageResponseTime: 0,
                totalResponseTime: 0
            },
            errors: {
                total: 0,
                byType: {},
                byEndpoint: {}
            },
            performance: {
                memoryUsage: 0,
                cpuUsage: 0,
                uptime: 0
            }
        };
        
        this.startTime = Date.now();
        this.setupPerformanceMonitoring();
    }
    
    setupPerformanceMonitoring() {
        // Monitorar uso de memória
        setInterval(() => {
            const memUsage = process.memoryUsage();
            this.metrics.performance.memoryUsage = {
                rss: Math.round(memUsage.rss / 1024 / 1024), // MB
                heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
                heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
                external: Math.round(memUsage.external / 1024 / 1024) // MB
            };
            
            this.metrics.performance.uptime = Math.round((Date.now() - this.startTime) / 1000);
        }, 30000); // A cada 30 segundos
    }
    
    recordRequest(method, url, status, duration) {
        this.metrics.requests.total++;
        this.metrics.requests.totalResponseTime += duration;
        this.metrics.requests.averageResponseTime = 
            this.metrics.requests.totalResponseTime / this.metrics.requests.total;
        
        if (status >= 200 && status < 400) {
            this.metrics.requests.successful++;
        } else {
            this.metrics.requests.failed++;
        }
        
        // Log para requisições lentas
        if (duration > 5000) {
            logger.warn('Requisição lenta detectada', {
                method,
                url,
                duration,
                status
            });
        }
    }
    
    recordError(error, endpoint = null) {
        this.metrics.errors.total++;
        
        const errorType = error.name || 'UnknownError';
        this.metrics.errors.byType[errorType] = 
            (this.metrics.errors.byType[errorType] || 0) + 1;
        
        if (endpoint) {
            this.metrics.errors.byEndpoint[endpoint] = 
                (this.metrics.errors.byEndpoint[endpoint] || 0) + 1;
        }
        
        // Alertas para muitos erros
        if (this.metrics.errors.total > 50) {
            logger.error('Muitos erros detectados', {
                totalErrors: this.metrics.errors.total,
                errorTypes: this.metrics.errors.byType
            });
        }
    }
    
    getMetrics() {
        return {
            ...this.metrics,
            health: {
                status: this.getHealthStatus(),
                timestamp: new Date().toISOString()
            }
        };
    }
    
    getHealthStatus() {
        const errorRate = this.metrics.requests.total > 0 
            ? (this.metrics.requests.failed / this.metrics.requests.total) * 100 
            : 0;
        
        if (errorRate > 10) return 'unhealthy';
        if (errorRate > 5) return 'degraded';
        return 'healthy';
    }
    
    resetMetrics() {
        this.metrics = {
            requests: {
                total: 0,
                successful: 0,
                failed: 0,
                averageResponseTime: 0,
                totalResponseTime: 0
            },
            errors: {
                total: 0,
                byType: {},
                byEndpoint: {}
            },
            performance: {
                memoryUsage: 0,
                cpuUsage: 0,
                uptime: 0
            }
        };
    }
}

module.exports = new MonitoringService();
```

### 5. Aplicação de Produção

#### Estrutura da Aplicação

```javascript
// app.js
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const mongoose = require('mongoose');

const config = require('./config/environment');
const { validateEnvironment } = require('./utils/validateEnv');
const { helmet, limiter, speedLimiter, mongoSanitize, xss, hpp } = require('./middleware/security');
const logger = require('./services/logger');
const monitoring = require('./services/monitoring');
const mongodb = require('./database/mongodb');
const redis = require('./database/redis');

// Validar variáveis de ambiente
validateEnvironment();

const app = express();

// Middleware de segurança
app.use(helmet);
app.use(limiter);
app.use(speedLimiter);
app.use(mongoSanitize);
app.use(xss);
app.use(hpp);

// Middleware básico
app.use(compression());
app.use(cors(config.cors));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging de requisições
app.use((req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        monitoring.recordRequest(req.method, req.url, res.statusCode, duration);
        logger.httpRequest(req, res, duration);
    });
    
    next();
});

// Health check
app.get('/health', async (req, res) => {
    try {
        const [mongodbHealth, redisHealth] = await Promise.all([
            mongodb.healthCheck(),
            redis.healthCheck()
        ]);
        
        const health = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: process.env.npm_package_version || '1.0.0',
            environment: process.env.NODE_ENV,
            services: {
                mongodb: mongodbHealth,
                redis: redisHealth
            },
            metrics: monitoring.getMetrics()
        };
        
        // Verificar se todos os serviços estão saudáveis
        if (mongodbHealth.status !== 'healthy' || redisHealth.status !== 'healthy') {
            health.status = 'unhealthy';
            return res.status(503).json(health);
        }
        
        res.json(health);
    } catch (error) {
        logger.error('Erro no health check', error);
        res.status(503).json({
            status: 'unhealthy',
            error: error.message
        });
    }
});

// Rotas da aplicação
app.use('/api', require('./routes'));

// Error handling
app.use((err, req, res, next) => {
    monitoring.recordError(err, req.url);
    logger.error('Erro não tratado', err, {
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Erro interno do servidor' 
            : err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint não encontrado',
        path: req.originalUrl
    });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM recebido, iniciando shutdown graceful');
    
    try {
        await mongodb.disconnect();
        await redis.disconnect();
        logger.info('Shutdown graceful concluído');
        process.exit(0);
    } catch (error) {
        logger.error('Erro durante shutdown graceful', error);
        process.exit(1);
    }
});

process.on('SIGINT', async () => {
    logger.info('SIGINT recebido, iniciando shutdown graceful');
    
    try {
        await mongodb.disconnect();
        await redis.disconnect();
        logger.info('Shutdown graceful concluído');
        process.exit(0);
    } catch (error) {
        logger.error('Erro durante shutdown graceful', error);
        process.exit(1);
    }
});

module.exports = app;
```

#### Servidor Principal

```javascript
// server.js
const app = require('./app');
const config = require('./config/environment');
const logger = require('./services/logger');
const mongodb = require('./database/mongodb');
const redis = require('./database/redis');

async function startServer() {
    try {
        // Conectar ao MongoDB
        await mongodb.connect();
        
        // Conectar ao Redis
        await redis.connect();
        
        // Iniciar servidor
        const server = app.listen(config.port, () => {
            logger.info(`Servidor rodando na porta ${config.port}`, {
                environment: process.env.NODE_ENV,
                port: config.port
            });
        });
        
        // Configurar timeout do servidor
        server.timeout = 30000; // 30 segundos
        
        // Configurar keep-alive
        server.keepAliveTimeout = 65000; // 65 segundos
        server.headersTimeout = 66000; // 66 segundos
        
    } catch (error) {
        logger.error('Erro ao iniciar servidor', error);
        process.exit(1);
    }
}

startServer();
```

## 🎯 Exercícios Práticos

### Exercício 1: Configuração de Ambiente
Configure um ambiente de produção com:
- Variáveis de ambiente
- Validação de configuração
- Conexão com banco de dados
- Sistema de logging

### Exercício 2: Segurança
Implemente medidas de segurança:
- Middleware de segurança
- Validação de entrada
- Rate limiting
- Sanitização de dados

### Exercício 3: Monitoramento
Configure monitoramento com:
- Logs estruturados
- Métricas de performance
- Health checks
- Alertas de erro

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Configuração de ambiente** de produção
2. **Variáveis de ambiente** e validação
3. **Conexão com banco de dados** MongoDB e Redis
4. **Segurança em produção** com middleware
5. **Sistema de logging** avançado
6. **Monitoramento de performance**
7. **Health checks** e graceful shutdown
8. **Boas práticas** de produção

## 🚀 Próxima Aula

Na próxima aula, vamos explorar **Docker e Containerização**, incluindo:
- Conceitos de Docker
- Dockerfile e Docker Compose
- Imagens e containers
- Deploy com Docker

## 📚 Recursos Adicionais

- [Node.js Production Best Practices](https://github.com/goldbergyoni/nodebestpractices) - Boas práticas
- [Winston](https://github.com/winstonjs/winston) - Sistema de logging
- [Helmet](https://helmetjs.github.io/) - Middleware de segurança
- [Express Rate Limit](https://github.com/nfriedly/express-rate-limit) - Rate limiting
- [MongoDB Connection Options](https://mongoosejs.com/docs/connections.html) - Opções de conexão







