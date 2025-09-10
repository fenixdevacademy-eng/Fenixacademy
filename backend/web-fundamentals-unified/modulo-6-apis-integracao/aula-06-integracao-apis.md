# Aula 6: Integração de APIs

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Consumir APIs externas de forma eficiente
- Implementar rate limiting e cache
- Tratar erros e implementar retry logic
- Monitorar e fazer logging de APIs
- Criar um sistema de integração robusto
- Implementar webhooks e callbacks

## 📚 Conteúdo da Aula

### 1. Consumo de APIs Externas

#### Cliente HTTP Robusto

```javascript
// services/httpClient.js
const axios = require('axios');
const rateLimit = require('axios-rate-limit');

class HttpClient {
    constructor(baseURL, options = {}) {
        this.client = rateLimit(axios.create({
            baseURL,
            timeout: options.timeout || 10000,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'FenixApp/1.0',
                ...options.headers
            }
        }), {
            maxRequests: options.maxRequests || 100,
            perMilliseconds: options.perMilliseconds || 60000
        });
        
        this.setupInterceptors();
    }
    
    setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                console.log(`Enviando requisição: ${config.method.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                console.error('Erro na requisição:', error);
                return Promise.reject(error);
            }
        );
        
        // Response interceptor
        this.client.interceptors.response.use(
            (response) => {
                console.log(`Resposta recebida: ${response.status} ${response.config.url}`);
                return response;
            },
            async (error) => {
                const originalRequest = error.config;
                
                // Retry logic para erros 5xx
                if (error.response?.status >= 500 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    await this.delay(1000);
                    return this.client(originalRequest);
                }
                
                // Retry logic para rate limiting
                if (error.response?.status === 429 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const retryAfter = error.response.headers['retry-after'] || 1;
                    await this.delay(retryAfter * 1000);
                    return this.client(originalRequest);
                }
                
                return Promise.reject(error);
            }
        );
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async get(url, config = {}) {
        try {
            const response = await this.client.get(url, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    async post(url, data, config = {}) {
        try {
            const response = await this.client.post(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    async put(url, data, config = {}) {
        try {
            const response = await this.client.put(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    async delete(url, config = {}) {
        try {
            const response = await this.client.delete(url, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    handleError(error) {
        if (error.response) {
            // Erro da API
            return {
                status: error.response.status,
                message: error.response.data?.message || 'Erro da API',
                data: error.response.data
            };
        } else if (error.request) {
            // Erro de rede
            return {
                status: 0,
                message: 'Erro de conexão',
                data: null
            };
        } else {
            // Erro interno
            return {
                status: -1,
                message: error.message,
                data: null
            };
        }
    }
}

module.exports = HttpClient;
```

#### Serviços de Integração

```javascript
// services/externalApis.js
const HttpClient = require('./httpClient');
const cache = require('./cache');

class ExternalApiService {
    constructor() {
        this.githubClient = new HttpClient('https://api.github.com', {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            }
        });
        
        this.weatherClient = new HttpClient('https://api.openweathermap.org/data/2.5');
        this.newsClient = new HttpClient('https://newsapi.org/v2');
    }
    
    // GitHub API
    async getUserRepositories(username) {
        const cacheKey = `github:repos:${username}`;
        const cached = await cache.get(cacheKey);
        
        if (cached) {
            return cached;
        }
        
        try {
            const repos = await this.githubClient.get(`/users/${username}/repos`);
            await cache.set(cacheKey, repos, 300); // Cache por 5 minutos
            return repos;
        } catch (error) {
            console.error('Erro ao buscar repositórios:', error);
            throw error;
        }
    }
    
    async getRepositoryInfo(owner, repo) {
        const cacheKey = `github:repo:${owner}:${repo}`;
        const cached = await cache.get(cacheKey);
        
        if (cached) {
            return cached;
        }
        
        try {
            const repoInfo = await this.githubClient.get(`/repos/${owner}/${repo}`);
            await cache.set(cacheKey, repoInfo, 600); // Cache por 10 minutos
            return repoInfo;
        } catch (error) {
            console.error('Erro ao buscar informações do repositório:', error);
            throw error;
        }
    }
    
    // Weather API
    async getWeatherByCity(city) {
        const cacheKey = `weather:${city}`;
        const cached = await cache.get(cacheKey);
        
        if (cached) {
            return cached;
        }
        
        try {
            const weather = await this.weatherClient.get('/weather', {
                params: {
                    q: city,
                    appid: process.env.OPENWEATHER_API_KEY,
                    units: 'metric',
                    lang: 'pt_br'
                }
            });
            
            await cache.set(cacheKey, weather, 600); // Cache por 10 minutos
            return weather;
        } catch (error) {
            console.error('Erro ao buscar clima:', error);
            throw error;
        }
    }
    
    // News API
    async getNews(category = 'technology', country = 'br') {
        const cacheKey = `news:${category}:${country}`;
        const cached = await cache.get(cacheKey);
        
        if (cached) {
            return cached;
        }
        
        try {
            const news = await this.newsClient.get('/top-headlines', {
                params: {
                    category,
                    country,
                    apiKey: process.env.NEWS_API_KEY
                }
            });
            
            await cache.set(cacheKey, news, 300); // Cache por 5 minutos
            return news;
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
            throw error;
        }
    }
}

module.exports = new ExternalApiService();
```

### 2. Sistema de Cache

#### Cache em Memória

```javascript
// services/cache.js
const NodeCache = require('node-cache');

class CacheService {
    constructor() {
        this.cache = new NodeCache({
            stdTTL: 600, // 10 minutos por padrão
            checkperiod: 120, // Verificar a cada 2 minutos
            useClones: false // Para melhor performance
        });
        
        this.setupEvents();
    }
    
    setupEvents() {
        this.cache.on('set', (key, value) => {
            console.log(`Cache SET: ${key}`);
        });
        
        this.cache.on('del', (key, value) => {
            console.log(`Cache DEL: ${key}`);
        });
        
        this.cache.on('expired', (key, value) => {
            console.log(`Cache EXPIRED: ${key}`);
        });
    }
    
    async get(key) {
        return this.cache.get(key);
    }
    
    async set(key, value, ttl = null) {
        if (ttl) {
            return this.cache.set(key, value, ttl);
        }
        return this.cache.set(key, value);
    }
    
    async del(key) {
        return this.cache.del(key);
    }
    
    async flush() {
        return this.cache.flushAll();
    }
    
    async keys() {
        return this.cache.keys();
    }
    
    async stats() {
        return this.cache.getStats();
    }
    
    // Cache com fallback
    async getOrSet(key, fallbackFn, ttl = null) {
        let value = await this.get(key);
        
        if (value === undefined) {
            value = await fallbackFn();
            await this.set(key, value, ttl);
        }
        
        return value;
    }
    
    // Cache com invalidação por padrão
    async invalidatePattern(pattern) {
        const keys = this.cache.keys();
        const regex = new RegExp(pattern);
        
        keys.forEach(key => {
            if (regex.test(key)) {
                this.cache.del(key);
            }
        });
    }
}

module.exports = new CacheService();
```

#### Cache com Redis

```javascript
// services/redisCache.js
const redis = require('redis');

class RedisCacheService {
    constructor() {
        this.client = redis.createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });
        
        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });
        
        this.client.on('connect', () => {
            console.log('Conectado ao Redis');
        });
    }
    
    async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }
    
    async get(key) {
        try {
            await this.connect();
            const value = await this.client.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Erro ao buscar do Redis:', error);
            return null;
        }
    }
    
    async set(key, value, ttl = 600) {
        try {
            await this.connect();
            const serialized = JSON.stringify(value);
            await this.client.setEx(key, ttl, serialized);
            return true;
        } catch (error) {
            console.error('Erro ao salvar no Redis:', error);
            return false;
        }
    }
    
    async del(key) {
        try {
            await this.connect();
            return await this.client.del(key);
        } catch (error) {
            console.error('Erro ao deletar do Redis:', error);
            return false;
        }
    }
    
    async flush() {
        try {
            await this.connect();
            return await this.client.flushAll();
        } catch (error) {
            console.error('Erro ao limpar Redis:', error);
            return false;
        }
    }
    
    async keys(pattern = '*') {
        try {
            await this.connect();
            return await this.client.keys(pattern);
        } catch (error) {
            console.error('Erro ao buscar chaves do Redis:', error);
            return [];
        }
    }
    
    async invalidatePattern(pattern) {
        try {
            await this.connect();
            const keys = await this.client.keys(pattern);
            if (keys.length > 0) {
                return await this.client.del(keys);
            }
            return 0;
        } catch (error) {
            console.error('Erro ao invalidar padrão do Redis:', error);
            return false;
        }
    }
}

module.exports = new RedisCacheService();
```

### 3. Rate Limiting

#### Rate Limiting Avançado

```javascript
// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Rate limiter geral
const generalLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requisições por IP
    message: {
        error: 'Muitas requisições. Tente novamente em 15 minutos.',
        retryAfter: 15 * 60
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter para APIs externas
const apiLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 60 * 1000, // 1 minuto
    max: 10, // máximo 10 requisições por minuto
    keyGenerator: (req) => {
        return `api:${req.user?.id || req.ip}`;
    },
    message: {
        error: 'Limite de requisições para APIs externas excedido.',
        retryAfter: 60
    }
});

// Rate limiter para autenticação
const authLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 tentativas de login
    keyGenerator: (req) => {
        return `auth:${req.ip}`;
    },
    message: {
        error: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
        retryAfter: 15 * 60
    },
    skipSuccessfulRequests: true
});

module.exports = {
    generalLimiter,
    apiLimiter,
    authLimiter
};
```

### 4. Monitoramento e Logging

#### Sistema de Logging

```javascript
// services/logger.js
const winston = require('winston');
const { Logtail } = require('@logtail/node');

class LoggerService {
    constructor() {
        this.logtail = new Logtail(process.env.LOGTAIL_TOKEN);
        
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.json()
            ),
            transports: [
                new winston.transports.File({ 
                    filename: 'logs/error.log', 
                    level: 'error' 
                }),
                new winston.transports.File({ 
                    filename: 'logs/combined.log' 
                }),
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                })
            ]
        });
        
        // Adicionar transport para Logtail em produção
        if (process.env.NODE_ENV === 'production') {
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
    
    // Log específico para APIs
    apiCall(method, url, status, duration, meta = {}) {
        this.info('API Call', {
            method,
            url,
            status,
            duration,
            ...meta
        });
    }
    
    // Log para erros de API
    apiError(method, url, error, meta = {}) {
        this.error('API Error', error, {
            method,
            url,
            ...meta
        });
    }
}

module.exports = new LoggerService();
```

#### Monitoramento de APIs

```javascript
// services/monitoring.js
const logger = require('./logger');

class MonitoringService {
    constructor() {
        this.metrics = {
            apiCalls: 0,
            apiErrors: 0,
            averageResponseTime: 0,
            totalResponseTime: 0
        };
    }
    
    recordApiCall(method, url, status, duration) {
        this.metrics.apiCalls++;
        this.metrics.totalResponseTime += duration;
        this.metrics.averageResponseTime = 
            this.metrics.totalResponseTime / this.metrics.apiCalls;
        
        logger.apiCall(method, url, status, duration);
        
        // Alertas para performance
        if (duration > 5000) {
            logger.warn('API call lenta detectada', {
                method,
                url,
                duration
            });
        }
    }
    
    recordApiError(method, url, error) {
        this.metrics.apiErrors++;
        logger.apiError(method, url, error);
        
        // Alertas para erros
        if (this.metrics.apiErrors > 10) {
            logger.error('Muitos erros de API detectados', {
                totalErrors: this.metrics.apiErrors
            });
        }
    }
    
    getMetrics() {
        return {
            ...this.metrics,
            errorRate: this.metrics.apiCalls > 0 
                ? (this.metrics.apiErrors / this.metrics.apiCalls) * 100 
                : 0
        };
    }
    
    resetMetrics() {
        this.metrics = {
            apiCalls: 0,
            apiErrors: 0,
            averageResponseTime: 0,
            totalResponseTime: 0
        };
    }
}

module.exports = new MonitoringService();
```

### 5. Webhooks e Callbacks

#### Sistema de Webhooks

```javascript
// services/webhookService.js
const crypto = require('crypto');
const axios = require('axios');
const logger = require('./logger');

class WebhookService {
    constructor() {
        this.webhooks = new Map();
    }
    
    // Registrar webhook
    registerWebhook(event, url, secret) {
        if (!this.webhooks.has(event)) {
            this.webhooks.set(event, []);
        }
        
        this.webhooks.get(event).push({
            url,
            secret,
            id: crypto.randomUUID()
        });
        
        logger.info('Webhook registrado', { event, url });
    }
    
    // Remover webhook
    unregisterWebhook(event, webhookId) {
        if (this.webhooks.has(event)) {
            const webhooks = this.webhooks.get(event);
            const index = webhooks.findIndex(w => w.id === webhookId);
            
            if (index !== -1) {
                webhooks.splice(index, 1);
                logger.info('Webhook removido', { event, webhookId });
            }
        }
    }
    
    // Disparar webhook
    async triggerWebhook(event, data) {
        const webhooks = this.webhooks.get(event) || [];
        
        const promises = webhooks.map(webhook => 
            this.sendWebhook(webhook, event, data)
        );
        
        await Promise.allSettled(promises);
    }
    
    // Enviar webhook individual
    async sendWebhook(webhook, event, data) {
        try {
            const payload = JSON.stringify({
                event,
                data,
                timestamp: new Date().toISOString()
            });
            
            const signature = this.generateSignature(payload, webhook.secret);
            
            const response = await axios.post(webhook.url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Webhook-Signature': signature,
                    'X-Webhook-Event': event
                },
                timeout: 10000
            });
            
            logger.info('Webhook enviado com sucesso', {
                event,
                url: webhook.url,
                status: response.status
            });
            
        } catch (error) {
            logger.error('Erro ao enviar webhook', error, {
                event,
                url: webhook.url
            });
        }
    }
    
    // Gerar assinatura
    generateSignature(payload, secret) {
        return crypto
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');
    }
    
    // Verificar assinatura
    verifySignature(payload, signature, secret) {
        const expectedSignature = this.generateSignature(payload, secret);
        return crypto.timingSafeEqual(
            Buffer.from(signature, 'hex'),
            Buffer.from(expectedSignature, 'hex')
        );
    }
    
    // Listar webhooks
    getWebhooks(event = null) {
        if (event) {
            return this.webhooks.get(event) || [];
        }
        
        const allWebhooks = {};
        for (const [eventName, webhooks] of this.webhooks) {
            allWebhooks[eventName] = webhooks;
        }
        return allWebhooks;
    }
}

module.exports = new WebhookService();
```

#### Endpoint para Webhooks

```javascript
// routes/webhooks.js
const express = require('express');
const router = express.Router();
const webhookService = require('../services/webhookService');
const logger = require('../services/logger');

// Registrar webhook
router.post('/register', async (req, res) => {
    try {
        const { event, url, secret } = req.body;
        
        if (!event || !url || !secret) {
            return res.status(400).json({
                error: 'Event, url e secret são obrigatórios'
            });
        }
        
        webhookService.registerWebhook(event, url, secret);
        
        res.json({
            message: 'Webhook registrado com sucesso',
            event,
            url
        });
    } catch (error) {
        logger.error('Erro ao registrar webhook', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Remover webhook
router.delete('/unregister', async (req, res) => {
    try {
        const { event, webhookId } = req.body;
        
        webhookService.unregisterWebhook(event, webhookId);
        
        res.json({
            message: 'Webhook removido com sucesso'
        });
    } catch (error) {
        logger.error('Erro ao remover webhook', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Listar webhooks
router.get('/list', async (req, res) => {
    try {
        const { event } = req.query;
        const webhooks = webhookService.getWebhooks(event);
        
        res.json(webhooks);
    } catch (error) {
        logger.error('Erro ao listar webhooks', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Endpoint para receber webhooks
router.post('/receive/:event', async (req, res) => {
    try {
        const { event } = req.params;
        const signature = req.headers['x-webhook-signature'];
        const payload = JSON.stringify(req.body);
        
        // Verificar assinatura (se necessário)
        if (signature) {
            const secret = process.env.WEBHOOK_SECRET;
            if (!webhookService.verifySignature(payload, signature, secret)) {
                return res.status(401).json({ error: 'Assinatura inválida' });
            }
        }
        
        logger.info('Webhook recebido', {
            event,
            data: req.body
        });
        
        // Processar webhook
        await processWebhook(event, req.body);
        
        res.json({ message: 'Webhook processado com sucesso' });
    } catch (error) {
        logger.error('Erro ao processar webhook', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Função para processar webhooks
async function processWebhook(event, data) {
    switch (event) {
        case 'user.created':
            // Processar criação de usuário
            break;
        case 'payment.completed':
            // Processar pagamento
            break;
        default:
            logger.warn('Evento de webhook não reconhecido', { event });
    }
}

module.exports = router;
```

### 6. Projeto Prático Completo

#### Estrutura do Projeto

```
api-integration/
├── server.js
├── package.json
├── .env
├── services/
│   ├── httpClient.js
│   ├── externalApis.js
│   ├── cache.js
│   ├── redisCache.js
│   ├── logger.js
│   ├── monitoring.js
│   └── webhookService.js
├── middleware/
│   └── rateLimiter.js
├── routes/
│   ├── api.js
│   └── webhooks.js
├── models/
│   └── ApiLog.js
└── logs/
    ├── error.log
    └── combined.log
```

#### Aplicação Principal

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const { generalLimiter, apiLimiter } = require('./middleware/rateLimiter');
const apiRoutes = require('./routes/api');
const webhookRoutes = require('./routes/webhooks');
const logger = require('./services/logger');
const monitoring = require('./services/monitoring');

const app = express();

// Middleware de segurança
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
app.use(generalLimiter);

// Logging de requisições
app.use((req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info('Requisição HTTP', {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
    });
    
    next();
});

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Rotas
app.use('/api', apiLimiter, apiRoutes);
app.use('/webhooks', webhookRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        metrics: monitoring.getMetrics()
    });
});

// Error handling
app.use((err, req, res, next) => {
    logger.error('Erro não tratado', err, {
        url: req.url,
        method: req.method,
        ip: req.ip
    });
    
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Servidor rodando na porta ${PORT}`);
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
```

#### Rotas de API

```javascript
// routes/api.js
const express = require('express');
const router = express.Router();
const externalApiService = require('../services/externalApis');
const logger = require('../services/logger');
const monitoring = require('../services/monitoring');

// GitHub API
router.get('/github/user/:username/repos', async (req, res) => {
    const start = Date.now();
    
    try {
        const { username } = req.params;
        const repos = await externalApiService.getUserRepositories(username);
        
        const duration = Date.now() - start;
        monitoring.recordApiCall('GET', `/github/user/${username}/repos`, 200, duration);
        
        res.json(repos);
    } catch (error) {
        const duration = Date.now() - start;
        monitoring.recordApiError('GET', `/github/user/${username}/repos`, error);
        
        res.status(error.status || 500).json({
            error: error.message
        });
    }
});

// Weather API
router.get('/weather/:city', async (req, res) => {
    const start = Date.now();
    
    try {
        const { city } = req.params;
        const weather = await externalApiService.getWeatherByCity(city);
        
        const duration = Date.now() - start;
        monitoring.recordApiCall('GET', `/weather/${city}`, 200, duration);
        
        res.json(weather);
    } catch (error) {
        const duration = Date.now() - start;
        monitoring.recordApiError('GET', `/weather/${city}`, error);
        
        res.status(error.status || 500).json({
            error: error.message
        });
    }
});

// News API
router.get('/news', async (req, res) => {
    const start = Date.now();
    
    try {
        const { category = 'technology', country = 'br' } = req.query;
        const news = await externalApiService.getNews(category, country);
        
        const duration = Date.now() - start;
        monitoring.recordApiCall('GET', '/news', 200, duration);
        
        res.json(news);
    } catch (error) {
        const duration = Date.now() - start;
        monitoring.recordApiError('GET', '/news', error);
        
        res.status(error.status || 500).json({
            error: error.message
        });
    }
});

// Métricas
router.get('/metrics', (req, res) => {
    res.json(monitoring.getMetrics());
});

module.exports = router;
```

## 🎯 Exercícios Práticos

### Exercício 1: Cliente HTTP Robusto
Implemente um cliente HTTP com:
- Rate limiting
- Retry logic
- Cache automático
- Tratamento de erros

### Exercício 2: Sistema de Cache
Crie um sistema de cache com:
- Cache em memória
- Cache com Redis
- Invalidação por padrão
- Métricas de cache

### Exercício 3: Webhooks
Implemente um sistema de webhooks com:
- Registro de webhooks
- Assinatura de segurança
- Retry automático
- Logging completo

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Consumo de APIs externas** com cliente HTTP robusto
2. **Sistema de cache** em memória e Redis
3. **Rate limiting** avançado
4. **Monitoramento e logging** de APIs
5. **Webhooks e callbacks** para integração
6. **Tratamento de erros** e retry logic
7. **Projeto prático completo** de integração
8. **Boas práticas** de desenvolvimento

## 🚀 Próxima Aula

Na próxima aula, vamos explorar **Deploy e Produção**, incluindo:
- Configuração de ambiente de produção
- Docker e containerização
- CI/CD com GitHub Actions
- Monitoramento em produção
- Otimização de performance

## 📚 Recursos Adicionais

- [Axios](https://axios-http.com/) - Cliente HTTP
- [Redis](https://redis.io/) - Banco de dados em memória
- [Winston](https://github.com/winstonjs/winston) - Sistema de logging
- [Rate Limiting](https://github.com/nfriedly/express-rate-limit) - Rate limiting
- [Webhooks](https://webhooks.fyi/) - Guia de webhooks







