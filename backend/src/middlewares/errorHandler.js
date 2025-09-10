const logger = require('../utils/logger');

/**
 * Classe de erro customizada para a API
 */
class ApiError extends Error {
    constructor(message, statusCode, code, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Erros comuns da API
 */
const ApiErrors = {
    // Erros de autenticação (4xx)
    UNAUTHORIZED: (message = 'Não autorizado') =>
        new ApiError(message, 401, 'UNAUTHORIZED'),

    FORBIDDEN: (message = 'Acesso negado') =>
        new ApiError(message, 403, 'FORBIDDEN'),

    NOT_FOUND: (message = 'Recurso não encontrado') =>
        new ApiError(message, 404, 'NOT_FOUND'),

    CONFLICT: (message = 'Conflito de dados') =>
        new ApiError(message, 409, 'CONFLICT'),

    VALIDATION_ERROR: (message = 'Dados inválidos', details = null) =>
        new ApiError(message, 400, 'VALIDATION_ERROR', details),

    RATE_LIMIT_EXCEEDED: (message = 'Limite de requisições excedido') =>
        new ApiError(message, 429, 'RATE_LIMIT_EXCEEDED'),

    // Erros de servidor (5xx)
    INTERNAL_ERROR: (message = 'Erro interno do servidor') =>
        new ApiError(message, 500, 'INTERNAL_ERROR'),

    SERVICE_UNAVAILABLE: (message = 'Serviço indisponível') =>
        new ApiError(message, 503, 'SERVICE_UNAVAILABLE'),

    DATABASE_ERROR: (message = 'Erro no banco de dados') =>
        new ApiError(message, 500, 'DATABASE_ERROR'),

    EXTERNAL_SERVICE_ERROR: (message = 'Erro em serviço externo') =>
        new ApiError(message, 502, 'EXTERNAL_SERVICE_ERROR')
};

/**
 * Middleware de tratamento de erros
 */
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log do erro
    logger.error('Erro capturado pelo middleware', {
        error: {
            message: err.message,
            stack: err.stack,
            name: err.name,
            code: err.code,
            statusCode: err.statusCode
        },
        request: {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            userId: req.user?._id,
            body: req.body,
            query: req.query,
            params: req.params
        }
    });

    // Erro de validação do Mongoose
    if (err.name === 'ValidationError') {
        const message = 'Erro de validação';
        const details = Object.values(err.errors).map(val => ({
            field: val.path,
            message: val.message,
            type: val.kind
        }));

        error = ApiErrors.VALIDATION_ERROR(message, details);
    }

    // Erro de cast do Mongoose (ID inválido)
    if (err.name === 'CastError') {
        const message = `ID inválido: ${err.value}`;
        error = ApiErrors.VALIDATION_ERROR(message, [{
            field: err.path,
            message: 'ID deve ser um ObjectId válido',
            type: 'invalid_id'
        }]);
    }

    // Erro de duplicação do Mongoose
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        const message = `${field} já existe: ${value}`;

        error = ApiErrors.CONFLICT(message);
    }

    // Erro JWT
    if (err.name === 'JsonWebTokenError') {
        error = ApiErrors.UNAUTHORIZED('Token inválido');
    }

    if (err.name === 'TokenExpiredError') {
        error = ApiErrors.UNAUTHORIZED('Token expirado');
    }

    // Erro de limite de upload
    if (err.code === 'LIMIT_FILE_SIZE') {
        error = ApiErrors.VALIDATION_ERROR('Arquivo muito grande');
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
        error = ApiErrors.VALIDATION_ERROR('Muitos arquivos');
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        error = ApiErrors.VALIDATION_ERROR('Campo de arquivo inesperado');
    }

    // Erro de rate limiting
    if (err.code === 'RATE_LIMIT_EXCEEDED') {
        error = ApiErrors.RATE_LIMIT_EXCEEDED();
    }

    // Erro de timeout
    if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        error = ApiErrors.SERVICE_UNAVAILABLE('Timeout na requisição');
    }

    // Erro de conexão recusada
    if (err.code === 'ECONNREFUSED') {
        error = ApiErrors.SERVICE_UNAVAILABLE('Conexão recusada');
    }

    // Erro de rede
    if (err.code === 'ENOTFOUND') {
        error = ApiErrors.SERVICE_UNAVAILABLE('Serviço não encontrado');
    }

    // Erro de permissão negada
    if (err.code === 'EACCES') {
        error = ApiErrors.FORBIDDEN('Permissão negada');
    }

    // Erro de arquivo não encontrado
    if (err.code === 'ENOENT') {
        error = ApiErrors.NOT_FOUND('Arquivo não encontrado');
    }

    // Erro de memória insuficiente
    if (err.code === 'ENOMEM') {
        error = ApiErrors.INTERNAL_ERROR('Memória insuficiente');
    }

    // Erro de disco cheio
    if (err.code === 'ENOSPC') {
        error = ApiErrors.INTERNAL_ERROR('Espaço em disco insuficiente');
    }

    // Erro de timeout do banco
    if (err.message && err.message.includes('operation timed out')) {
        error = ApiErrors.DATABASE_ERROR('Timeout na operação do banco');
    }

    // Erro de conexão do banco
    if (err.message && err.message.includes('ECONNREFUSED')) {
        error = ApiErrors.DATABASE_ERROR('Conexão com banco recusada');
    }

    // Erro de autenticação do banco
    if (err.message && err.message.includes('authentication failed')) {
        error = ApiErrors.DATABASE_ERROR('Falha na autenticação do banco');
    }

    // Erro de autorização do banco
    if (err.message && err.message.includes('not authorized')) {
        error = ApiErrors.DATABASE_ERROR('Não autorizado no banco');
    }

    // Erro de índice duplicado
    if (err.message && err.message.includes('duplicate key error')) {
        error = ApiErrors.CONFLICT('Chave duplicada');
    }

    // Erro de validação do banco
    if (err.message && err.message.includes('validation failed')) {
        error = ApiErrors.VALIDATION_ERROR('Falha na validação do banco');
    }

    // Definir status code padrão se não existir
    if (!error.statusCode) {
        error.statusCode = 500;
    }

    // Definir código padrão se não existir
    if (!error.code) {
        error.code = 'INTERNAL_ERROR';
    }

    // Definir mensagem padrão se não existir
    if (!error.message) {
        error.message = 'Erro interno do servidor';
    }

    // Resposta de erro
    const errorResponse = {
        success: false,
        message: error.message,
        code: error.code,
        ...(process.env.NODE_ENV === 'development' && {
            stack: error.stack,
            details: error.details
        })
    };

    // Adicionar headers específicos para certos tipos de erro
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
        res.set({
            'Retry-After': '60',
            'X-RateLimit-Reset': new Date(Date.now() + 60000).toISOString()
        });
    }

    // Log do erro final
    logger.error('Erro processado', {
        statusCode: error.statusCode,
        code: error.code,
        message: error.message,
        url: req.originalUrl,
        method: req.method,
        userId: req.user?._id,
        ip: req.ip
    });

    res.status(error.statusCode).json(errorResponse);
};

/**
 * Middleware para capturar erros assíncronos
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

/**
 * Middleware para capturar erros de rotas não encontradas
 */
const notFound = (req, res, next) => {
    const error = ApiErrors.NOT_FOUND(`Rota não encontrada: ${req.originalUrl}`);
    next(error);
};

/**
 * Middleware para capturar erros de métodos não permitidos
 */
const methodNotAllowed = (req, res, next) => {
    const error = ApiErrors.FORBIDDEN(`Método ${req.method} não permitido para ${req.originalUrl}`);
    next(error);
};

/**
 * Middleware para capturar erros de timeout
 */
const timeout = (timeoutMs = 30000) => {
    return (req, res, next) => {
        const timer = setTimeout(() => {
            const error = ApiErrors.SERVICE_UNAVAILABLE('Timeout na requisição');
            next(error);
        }, timeoutMs);

        res.on('finish', () => {
            clearTimeout(timer);
        });

        next();
    };
};

/**
 * Middleware para capturar erros de tamanho de payload
 */
const payloadTooLarge = (maxSize = '10mb') => {
    return (err, req, res, next) => {
        if (err.code === 'LIMIT_FILE_SIZE' || err.code === 'LIMIT_UNEXPECTED_FILE') {
            const error = ApiErrors.VALIDATION_ERROR(`Payload muito grande. Máximo: ${maxSize}`);
            return next(error);
        }
        next(err);
    };
};

/**
 * Middleware para capturar erros de CORS
 */
const corsError = (err, req, res, next) => {
    if (err.message && err.message.includes('CORS')) {
        const error = ApiErrors.FORBIDDEN('Erro de CORS');
        return next(error);
    }
    next(err);
};

/**
 * Middleware para capturar erros de parsing JSON
 */
const jsonParsingError = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        const error = ApiErrors.VALIDATION_ERROR('JSON inválido');
        return next(error);
    }
    next(err);
};

/**
 * Middleware para capturar erros de upload
 */
const uploadError = (err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        const error = ApiErrors.VALIDATION_ERROR('Arquivo muito grande');
        return next(error);
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
        const error = ApiErrors.VALIDATION_ERROR('Muitos arquivos');
        return next(error);
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        const error = ApiErrors.VALIDATION_ERROR('Campo de arquivo inesperado');
        return next(error);
    }

    if (err.code === 'LIMIT_PART_COUNT') {
        const error = ApiErrors.VALIDATION_ERROR('Muitas partes no upload');
        return next(error);
    }

    if (err.code === 'LIMIT_FIELD_KEY') {
        const error = ApiErrors.VALIDATION_ERROR('Chave de campo muito longa');
        return next(error);
    }

    if (err.code === 'LIMIT_FIELD_VALUE') {
        const error = ApiErrors.VALIDATION_ERROR('Valor de campo muito longo');
        return next(error);
    }

    if (err.code === 'LIMIT_FIELD_COUNT') {
        const error = ApiErrors.VALIDATION_ERROR('Muitos campos');
        return next(error);
    }

    next(err);
};

/**
 * Função para criar erro customizado
 */
const createError = (message, statusCode, code, details = null) => {
    return new ApiError(message, statusCode, code, details);
};

/**
 * Função para verificar se é um erro operacional
 */
const isOperationalError = (error) => {
    if (error instanceof ApiError) {
        return error.isOperational;
    }
    return false;
};

/**
 * Função para converter erro padrão em ApiError
 */
const convertToApiError = (error) => {
    if (error instanceof ApiError) {
        return error;
    }

    return new ApiError(
        error.message || 'Erro interno do servidor',
        error.statusCode || 500,
        error.code || 'INTERNAL_ERROR',
        error.details
    );
};

module.exports = {
    ApiError,
    ApiErrors,
    errorHandler,
    asyncHandler,
    notFound,
    methodNotAllowed,
    timeout,
    payloadTooLarge,
    corsError,
    jsonParsingError,
    uploadError,
    createError,
    isOperationalError,
    convertToApiError
};



