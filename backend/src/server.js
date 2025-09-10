#!/usr/bin/env node

/**
 * 🚀 FENIX ACADEMY API - SERVIDOR PRINCIPAL
 * 
 * Sistema completo de gerenciamento de cursos, usuários e conteúdo
 * com autenticação, pagamentos, notificações e muito mais!
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const http = require('http');
const socketIo = require('socket.io');

// Configurações
const config = require('./config');
const logger = require('./utils/logger');
const database = require('./database/connection');
const redis = require('./database/redis');

// Middlewares
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');
const validationMiddleware = require('./middleware/validation');

// Rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');
const enrollmentRoutes = require('./routes/enrollments');
const paymentRoutes = require('./routes/payments');
const notificationRoutes = require('./routes/notifications');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const webhookRoutes = require('./routes/webhooks');

// Serviços
const notificationService = require('./services/notificationService');
const analyticsService = require('./services/analyticsService');
const cronService = require('./services/cronService');

class FenixAcademyAPI {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server, {
            cors: {
                origin: config.cors.origin,
                methods: ['GET', 'POST']
            }
        });

        this.port = config.server.port;
        this.isProduction = config.server.environment === 'production';

        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeSocketIO();
        this.initializeErrorHandling();
        this.initializeServices();
    }

    /**
     * Inicializa todos os middlewares da aplicação
     */
    initializeMiddleware() {
        // Segurança
        this.app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                    fontSrc: ["'self'", "https://fonts.gstatic.com"],
                    imgSrc: ["'self'", "data:", "https:"],
                    scriptSrc: ["'self'"],
                    connectSrc: ["'self'", "https://api.stripe.com"]
                }
            }
        }));

        // CORS
        this.app.use(cors({
            origin: config.cors.origin,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
        }));

        // Rate Limiting
        const limiter = rateLimit({
            windowMs: config.rateLimit.windowMs,
            max: config.rateLimit.max,
            message: {
                error: 'Muitas requisições. Tente novamente em alguns minutos.',
                retryAfter: Math.ceil(config.rateLimit.windowMs / 1000)
            },
            standardHeaders: true,
            legacyHeaders: false
        });

        // Slow Down para prevenir spam
        const speedLimiter = slowDown({
            windowMs: 15 * 60 * 1000, // 15 minutos
            delayAfter: 100, // permitir 100 requisições por 15 minutos
            delayMs: 500 // adicionar 500ms de delay por requisição após o limite
        });

        this.app.use('/api/', limiter);
        this.app.use('/api/', speedLimiter);

        // Logs
        if (!this.isProduction) {
            this.app.use(morgan('dev'));
        } else {
            this.app.use(morgan('combined', {
                stream: {
                    write: (message) => logger.info(message.trim())
                }
            }));
        }

        // Compressão
        this.app.use(compression());

        // Parsers
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

        // Health Check
        this.app.get('/health', (req, res) => {
            res.status(200).json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                environment: config.server.environment,
                version: config.server.version
            });
        });

        // API Status
        this.app.get('/api/status', (req, res) => {
            res.status(200).json({
                api: 'Fenix Academy API',
                version: config.server.version,
                status: 'Operacional',
                timestamp: new Date().toISOString(),
                endpoints: {
                    auth: '/api/auth',
                    users: '/api/users',
                    courses: '/api/courses',
                    lessons: '/api/lessons',
                    enrollments: '/api/enrollments',
                    payments: '/api/payments',
                    notifications: '/api/notifications',
                    analytics: '/api/analytics',
                    admin: '/api/admin'
                }
            });
        });
    }

    /**
     * Inicializa todas as rotas da API
     */
    initializeRoutes() {
        const apiPrefix = config.api.prefix;

        // Swagger Documentation
        if (config.swagger.enabled) {
            const swaggerOptions = {
                definition: {
                    openapi: '3.0.0',
                    info: {
                        title: 'Fenix Academy API',
                        version: config.server.version,
                        description: 'API completa para o sistema de educação da Fenix Academy',
                        contact: {
                            name: 'Fenix Academy Team',
                            email: 'dev@fenixacademy.com'
                        }
                    },
                    servers: [
                        {
                            url: `http://localhost:${this.port}${apiPrefix}`,
                            description: 'Servidor de Desenvolvimento'
                        },
                        {
                            url: `https://api.fenixacademy.com${apiPrefix}`,
                            description: 'Servidor de Produção'
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
                apis: ['./src/routes/*.js', './src/models/*.js']
            };

            const specs = swaggerJsdoc(swaggerOptions);
            this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
        }

        // Rotas da API
        this.app.use(`${apiPrefix}/auth`, authRoutes);
        this.app.use(`${apiPrefix}/users`, authMiddleware.verifyToken, userRoutes);
        this.app.use(`${apiPrefix}/courses`, courseRoutes);
        this.app.use(`${apiPrefix}/lessons`, lessonRoutes);
        this.app.use(`${apiPrefix}/enrollments`, authMiddleware.verifyToken, enrollmentRoutes);
        this.app.use(`${apiPrefix}/payments`, authMiddleware.verifyToken, paymentRoutes);
        this.app.use(`${apiPrefix}/notifications`, authMiddleware.verifyToken, notificationRoutes);
        this.app.use(`${apiPrefix}/analytics`, authMiddleware.verifyToken, analyticsRoutes);
        this.app.use(`${apiPrefix}/admin`, authMiddleware.verifyToken, authMiddleware.requireRole('admin'), adminRoutes);
        this.app.use(`${apiPrefix}/webhooks`, webhookRoutes);

        // Rota 404 para endpoints não encontrados
        this.app.use('*', (req, res) => {
            res.status(404).json({
                error: 'Endpoint não encontrado',
                message: `A rota ${req.originalUrl} não existe`,
                availableEndpoints: [
                    '/health',
                    '/api/status',
                    '/api-docs',
                    '/api/auth',
                    '/api/users',
                    '/api/courses',
                    '/api/lessons',
                    '/api/enrollments',
                    '/api/payments',
                    '/api/notifications',
                    '/api/analytics',
                    '/api/admin'
                ]
            });
        });
    }

    /**
     * Inicializa o Socket.IO para comunicação em tempo real
     */
    initializeSocketIO() {
        this.io.on('connection', (socket) => {
            logger.info(`Usuário conectado: ${socket.id}`);

            // Autenticação do socket
            socket.on('authenticate', async (token) => {
                try {
                    const decoded = await authMiddleware.verifyTokenSocket(token);
                    socket.userId = decoded.userId;
                    socket.join(`user_${decoded.userId}`);
                    socket.emit('authenticated', { success: true });
                    logger.info(`Socket autenticado para usuário: ${decoded.userId}`);
                } catch (error) {
                    socket.emit('authentication_error', { error: 'Token inválido' });
                    logger.error(`Erro de autenticação do socket: ${error.message}`);
                }
            });

            // Junta-se a um curso específico
            socket.on('join_course', (courseId) => {
                socket.join(`course_${courseId}`);
                logger.info(`Usuário ${socket.userId} entrou no curso ${courseId}`);
            });

            // Sai de um curso
            socket.on('leave_course', (courseId) => {
                socket.leave(`course_${courseId}`);
                logger.info(`Usuário ${socket.userId} saiu do curso ${courseId}`);
            });

            // Desconexão
            socket.on('disconnect', () => {
                logger.info(`Usuário desconectado: ${socket.id}`);
            });
        });

        // Disponibiliza io para uso em outros módulos
        this.app.set('io', this.io);
    }

    /**
     * Inicializa o tratamento de erros
     */
    initializeErrorHandling() {
        this.app.use(errorHandler);
    }

    /**
     * Inicializa serviços em background
     */
    async initializeServices() {
        try {
            // Inicializa serviços
            await notificationService.initialize();
            await analyticsService.initialize();
            await cronService.initialize();

            logger.info('✅ Todos os serviços foram inicializados com sucesso');
        } catch (error) {
            logger.error('❌ Erro ao inicializar serviços:', error);
        }
    }

    /**
     * Inicializa a conexão com o banco de dados
     */
    async connectDatabase() {
        try {
            await database.connect();
            logger.info('✅ Conectado ao MongoDB com sucesso');

            await redis.connect();
            logger.info('✅ Conectado ao Redis com sucesso');
        } catch (error) {
            logger.error('❌ Erro ao conectar ao banco de dados:', error);
            process.exit(1);
        }
    }

    /**
     * Inicia o servidor
     */
    async start() {
        try {
            // Conecta ao banco de dados
            await this.connectDatabase();

            // Inicia o servidor
            this.server.listen(this.port, () => {
                logger.info(`🚀 Fenix Academy API rodando na porta ${this.port}`);
                logger.info(`📚 Ambiente: ${config.server.environment}`);
                logger.info(`🔗 URL: http://localhost:${this.port}`);
                logger.info(`📖 Documentação: http://localhost:${this.port}/api-docs`);
                logger.info(`💚 Health Check: http://localhost:${this.port}/health`);
                logger.info(`📊 Status API: http://localhost:${this.port}/api/status`);

                if (!this.isProduction) {
                    logger.info('🛠️  Modo de desenvolvimento ativo');
                }
            });

            // Graceful shutdown
            process.on('SIGTERM', () => this.gracefulShutdown());
            process.on('SIGINT', () => this.gracefulShutdown());

        } catch (error) {
            logger.error('❌ Erro ao iniciar o servidor:', error);
            process.exit(1);
        }
    }

    /**
     * Desligamento gracioso do servidor
     */
    async gracefulShutdown() {
        logger.info('🔄 Iniciando desligamento gracioso...');

        try {
            // Fecha o servidor HTTP
            this.server.close(() => {
                logger.info('✅ Servidor HTTP fechado');
            });

            // Fecha conexões do Socket.IO
            this.io.close(() => {
                logger.info('✅ Socket.IO fechado');
            });

            // Fecha conexões do banco de dados
            await database.disconnect();
            await redis.disconnect();

            logger.info('✅ Conexões do banco de dados fechadas');
            logger.info('👋 Fenix Academy API encerrada com sucesso');

            process.exit(0);
        } catch (error) {
            logger.error('❌ Erro durante o desligamento:', error);
            process.exit(1);
        }
    }
}

// Inicia a aplicação
const api = new FenixAcademyAPI();
api.start();

module.exports = api;



