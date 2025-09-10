/**
 * 📝 SISTEMA DE LOGS AVANÇADO DA FENIX ACADEMY API
 * 
 * Sistema completo de logging com diferentes níveis, formatação,
 * rotação de arquivos e integração com serviços externos
 */

const winston = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('../config');

// Cria diretório de logs se não existir
const logDir = path.join(process.cwd(), config.logging.filePath);
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Formatação personalizada para logs
const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
        let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;

        if (Object.keys(meta).length > 0) {
            log += ` ${JSON.stringify(meta)}`;
        }

        if (stack) {
            log += `\n${stack}`;
        }

        return log;
    })
);

// Formatação para console (desenvolvimento)
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
        format: 'HH:mm:ss'
    }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        let log = `${timestamp} [${level}]: ${message}`;

        if (Object.keys(meta).length > 0) {
            log += ` ${JSON.stringify(meta)}`;
        }

        return log;
    })
);

// Configuração dos transportes
const transports = [];

// Console (sempre ativo)
transports.push(
    new winston.transports.Console({
        format: consoleFormat,
        level: config.logging.level
    })
);

// Arquivo de logs gerais
transports.push(
    new winston.transports.File({
        filename: path.join(logDir, 'combined.log'),
        format: logFormat,
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
        tailable: true
    })
);

// Arquivo de logs de erro
transports.push(
    new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
        format: logFormat,
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
        tailable: true
    })
);

// Arquivo de logs de acesso (HTTP)
transports.push(
    new winston.transports.File({
        filename: path.join(logDir, 'access.log'),
        format: logFormat,
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
        tailable: true
    })
);

// Arquivo de logs de segurança
transports.push(
    new winston.transports.File({
        filename: path.join(logDir, 'security.log'),
        format: logFormat,
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 3,
        tailable: true
    })
);

// Arquivo de logs de performance
transports.push(
    new winston.transports.File({
        filename: path.join(logDir, 'performance.log'),
        format: logFormat,
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 3,
        tailable: true
    })
);

// Cria o logger principal
const logger = winston.createLogger({
    level: config.logging.level,
    format: logFormat,
    transports,
    exitOnError: false
});

// Adiciona tratamento de erros não capturados
logger.exceptions.handle(
    new winston.transports.File({
        filename: path.join(logDir, 'exceptions.log'),
        format: logFormat
    })
);

logger.rejections.handle(
    new winston.transports.File({
        filename: path.join(logDir, 'rejections.log'),
        format: logFormat
    })
);

// Funções de logging especializadas
const specializedLoggers = {
    // Logger para requisições HTTP
    access: winston.createLogger({
        level: 'info',
        format: logFormat,
        transports: [
            new winston.transports.File({
                filename: path.join(logDir, 'access.log'),
                format: logFormat
            })
        ]
    }),

    // Logger para eventos de segurança
    security: winston.createLogger({
        level: 'warn',
        format: logFormat,
        transports: [
            new winston.transports.File({
                filename: path.join(logDir, 'security.log'),
                format: logFormat
            }),
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.printf(({ timestamp, level, message, ...meta }) => {
                        return `🔒 ${timestamp} [${level}]: ${message} ${JSON.stringify(meta)}`;
                    })
                )
            })
        ]
    }),

    // Logger para métricas de performance
    performance: winston.createLogger({
        level: 'info',
        format: logFormat,
        transports: [
            new winston.transports.File({
                filename: path.join(logDir, 'performance.log'),
                format: logFormat
            })
        ]
    }),

    // Logger para operações de banco de dados
    database: winston.createLogger({
        level: 'info',
        format: logFormat,
        transports: [
            new winston.transports.File({
                filename: path.join(logDir, 'database.log'),
                format: logFormat
            })
        ]
    }),

    // Logger para pagamentos
    payments: winston.createLogger({
        level: 'info',
        format: logFormat,
        transports: [
            new winston.transports.File({
                filename: path.join(logDir, 'payments.log'),
                format: logFormat
            })
        ]
    }),

    // Logger para notificações
    notifications: winston.createLogger({
        level: 'info',
        format: logFormat,
        transports: [
            new winston.transports.File({
                filename: path.join(logDir, 'notifications.log'),
                format: logFormat
            })
        ]
    })
};

// Funções utilitárias para logging
const logUtils = {
    // Log de requisição HTTP
    logRequest: (req, res, responseTime) => {
        const logData = {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            userId: req.user?.id || 'anonymous',
            responseTime: `${responseTime}ms`,
            statusCode: res.statusCode,
            contentLength: res.get('Content-Length') || 0,
            timestamp: new Date().toISOString()
        };

        specializedLoggers.access.info('HTTP Request', logData);
    },

    // Log de erro de segurança
    logSecurityEvent: (event, details) => {
        specializedLoggers.security.warn(`Security Event: ${event}`, {
            ...details,
            timestamp: new Date().toISOString(),
            ip: details.ip || 'unknown',
            userId: details.userId || 'anonymous'
        });
    },

    // Log de performance
    logPerformance: (operation, duration, metadata = {}) => {
        specializedLoggers.performance.info(`Performance: ${operation}`, {
            duration: `${duration}ms`,
            ...metadata,
            timestamp: new Date().toISOString()
        });
    },

    // Log de operação de banco de dados
    logDatabaseOperation: (operation, collection, duration, metadata = {}) => {
        specializedLoggers.database.info(`Database: ${operation}`, {
            collection,
            duration: `${duration}ms`,
            ...metadata,
            timestamp: new Date().toISOString()
        });
    },

    // Log de pagamento
    logPayment: (event, paymentId, amount, metadata = {}) => {
        specializedLoggers.payments.info(`Payment: ${event}`, {
            paymentId,
            amount: amount ? `R$ ${amount.toFixed(2)}` : 'N/A',
            ...metadata,
            timestamp: new Date().toISOString()
        });
    },

    // Log de notificação
    logNotification: (type, recipient, status, metadata = {}) => {
        specializedLoggers.notifications.info(`Notification: ${type}`, {
            recipient,
            status,
            ...metadata,
            timestamp: new Date().toISOString()
        });
    },

    // Log de erro com contexto
    logError: (error, context = {}) => {
        logger.error(error.message, {
            stack: error.stack,
            name: error.name,
            ...context,
            timestamp: new Date().toISOString()
        });
    },

    // Log de warning com contexto
    logWarning: (message, context = {}) => {
        logger.warn(message, {
            ...context,
            timestamp: new Date().toISOString()
        });
    },

    // Log de informação com contexto
    logInfo: (message, context = {}) => {
        logger.info(message, {
            ...context,
            timestamp: new Date().toISOString()
        });
    },

    // Log de debug com contexto
    logDebug: (message, context = {}) => {
        logger.debug(message, {
            ...context,
            timestamp: new Date().toISOString()
        });
    }
};

// Middleware para logging automático de requisições
const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logUtils.logRequest(req, res, duration);
    });

    next();
};

// Middleware para logging de erros
const errorLogger = (error, req, res, next) => {
    logUtils.logError(error, {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userId: req.user?.id || 'anonymous',
        userAgent: req.get('User-Agent')
    });

    next(error);
};

// Função para limpeza de logs antigos
const cleanupOldLogs = () => {
    const retentionDays = config.analytics.retentionDays;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    const logFiles = fs.readdirSync(logDir);

    logFiles.forEach(file => {
        const filePath = path.join(logDir, file);
        const stats = fs.statSync(filePath);

        if (stats.mtime < cutoffDate) {
            fs.unlinkSync(filePath);
            logger.info(`Log antigo removido: ${file}`);
        }
    });
};

// Exporta o logger principal e utilitários
module.exports = {
    logger,
    specializedLoggers,
    logUtils,
    requestLogger,
    errorLogger,
    cleanupOldLogs
};



