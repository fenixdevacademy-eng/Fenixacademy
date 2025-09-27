const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Middleware de autenticação JWT
 */
const authenticate = async (req, res, next) => {
    try {
        let token;

        // Verificar se o token está no header Authorization
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // Verificar se o token está nos cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Acesso negado. Token não fornecido.',
                code: 'TOKEN_MISSING'
            });
        }

        try {
            // Verificar e decodificar o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscar usuário no banco
            const user = await User.findById(decoded.id).select('-senha');

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Token inválido. Usuário não encontrado.',
                    code: 'USER_NOT_FOUND'
                });
            }

            // Verificar se o usuário está ativo
            if (!user.ativo) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuário inativo. Entre em contato com o suporte.',
                    code: 'USER_INACTIVE'
                });
            }

            // Verificar se o usuário está bloqueado
            if (user.bloqueado) {
                return res.status(401).json({
                    success: false,
                    message: `Usuário bloqueado: ${user.motivoBloqueio}`,
                    code: 'USER_BLOCKED'
                });
            }

            // Adicionar usuário ao request
            req.user = user;

            // Log de autenticação bem-sucedida
            logger.info('Usuário autenticado com sucesso', {
                userId: user._id,
                email: user.email,
                ip: req.ip,
                userAgent: req.get('User-Agent')
            });

            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token inválido.',
                    code: 'TOKEN_INVALID'
                });
            }

            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expirado.',
                    code: 'TOKEN_EXPIRED'
                });
            }

            throw error;
        }
    } catch (error) {
        logger.error('Erro na autenticação', {
            error: error.message,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });

        return res.status(500).json({
            success: false,
            message: 'Erro interno na autenticação.',
            code: 'AUTH_ERROR'
        });
    }
};

/**
 * Middleware de autenticação opcional
 * Permite acesso sem token, mas adiciona usuário se fornecido
 */
const authenticateOptional = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.id).select('-senha');

                if (user && user.ativo && !user.bloqueado) {
                    req.user = user;
                }
            } catch (error) {
                // Ignora erros de token inválido/expirado
            }
        }

        next();
    } catch (error) {
        logger.error('Erro na autenticação opcional', {
            error: error.message,
            ip: req.ip
        });
        next();
    }
};

/**
 * Middleware de verificação de permissões
 */
const authorize = (...permissions) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Acesso negado. Usuário não autenticado.',
                code: 'NOT_AUTHENTICATED'
            });
        }

        // Verificar se o usuário tem as permissões necessárias
        const hasPermission = permissions.every(permission => {
            return req.user.verificarPermissao(permission);
        });

        if (!hasPermission) {
            logger.warn('Tentativa de acesso não autorizado', {
                userId: req.user._id,
                email: req.user.email,
                permissions: permissions,
                route: req.originalUrl,
                method: req.method,
                ip: req.ip
            });

            return res.status(403).json({
                success: false,
                message: 'Acesso negado. Permissões insuficientes.',
                code: 'INSUFFICIENT_PERMISSIONS',
                required: permissions,
                current: req.user.planoAtual
            });
        }

        next();
    };
};

/**
 * Middleware de verificação de plano
 */
const requirePlan = (...plans) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Acesso negado. Usuário não autenticado.',
                code: 'NOT_AUTHENTICATED'
            });
        }

        if (!plans.includes(req.user.planoAtual)) {
            logger.warn('Tentativa de acesso com plano inadequado', {
                userId: req.user._id,
                email: req.user.email,
                currentPlan: req.user.planoAtual,
                requiredPlans: plans,
                route: req.originalUrl,
                method: req.method,
                ip: req.ip
            });

            return res.status(403).json({
                success: false,
                message: 'Acesso negado. Plano inadequado para esta funcionalidade.',
                code: 'INSUFFICIENT_PLAN',
                required: plans,
                current: req.user.planoAtual
            });
        }

        next();
    };
};

/**
 * Middleware de verificação de propriedade
 * Verifica se o usuário é dono do recurso
 */
const checkOwnership = (model, paramName = 'id') => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Acesso negado. Usuário não autenticado.',
                    code: 'NOT_AUTHENTICATED'
                });
            }

            const resourceId = req.params[paramName];

            if (!resourceId) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do recurso não fornecido.',
                    code: 'RESOURCE_ID_MISSING'
                });
            }

            // Buscar o recurso
            const resource = await model.findById(resourceId);

            if (!resource) {
                return res.status(404).json({
                    success: false,
                    message: 'Recurso não encontrado.',
                    code: 'RESOURCE_NOT_FOUND'
                });
            }

            // Verificar se o usuário é dono do recurso
            if (resource.usuario && resource.usuario.toString() !== req.user._id.toString()) {
                logger.warn('Tentativa de acesso a recurso de outro usuário', {
                    userId: req.user._id,
                    email: req.user.email,
                    resourceId: resourceId,
                    resourceOwner: resource.usuario,
                    route: req.originalUrl,
                    method: req.method,
                    ip: req.ip
                });

                return res.status(403).json({
                    success: false,
                    message: 'Acesso negado. Você não é dono deste recurso.',
                    code: 'NOT_OWNER'
                });
            }

            // Adicionar o recurso ao request para uso posterior
            req.resource = resource;
            next();
        } catch (error) {
            logger.error('Erro na verificação de propriedade', {
                error: error.message,
                userId: req.user?._id,
                resourceId: req.params[paramName],
                route: req.originalUrl
            });

            return res.status(500).json({
                success: false,
                message: 'Erro interno na verificação de propriedade.',
                code: 'OWNERSHIP_CHECK_ERROR'
            });
        }
    };
};

/**
 * Middleware de verificação de admin
 */
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Acesso negado. Usuário não autenticado.',
            code: 'NOT_AUTHENTICATED'
        });
    }

    if (req.user.planoAtual !== 'enterprise') {
        logger.warn('Tentativa de acesso administrativo sem permissão', {
            userId: req.user._id,
            email: req.user.email,
            currentPlan: req.user.planoAtual,
            route: req.originalUrl,
            method: req.method,
            ip: req.ip
        });

        return res.status(403).json({
            success: false,
            message: 'Acesso negado. Apenas administradores podem acessar esta funcionalidade.',
            code: 'ADMIN_REQUIRED'
        });
    }

    next();
};

/**
 * Middleware de verificação de instrutor
 */
const requireInstructor = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Acesso negado. Usuário não autenticado.',
            code: 'NOT_AUTHENTICATED'
        });
    }

    // Verificar se o usuário é instrutor (implementar lógica específica)
    const isInstructor = req.user.planoAtual === 'enterprise' ||
        req.user.verificarPermissao('instrutor');

    if (!isInstructor) {
        logger.warn('Tentativa de acesso de instrutor sem permissão', {
            userId: req.user._id,
            email: req.user.email,
            currentPlan: req.user.planoAtual,
            route: req.originalUrl,
            method: req.method,
            ip: req.ip
        });

        return res.status(403).json({
            success: false,
            message: 'Acesso negado. Apenas instrutores podem acessar esta funcionalidade.',
            code: 'INSTRUCTOR_REQUIRED'
        });
    }

    next();
};

/**
 * Middleware de rate limiting por usuário
 */
const rateLimitByUser = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
    const requests = new Map();

    return (req, res, next) => {
        if (!req.user) {
            return next();
        }

        const userId = req.user._id.toString();
        const now = Date.now();
        const windowStart = now - windowMs;

        // Limpar requisições antigas
        if (requests.has(userId)) {
            requests.set(userId, requests.get(userId).filter(timestamp => timestamp > windowStart));
        }

        const userRequests = requests.get(userId) || [];

        if (userRequests.length >= maxRequests) {
            logger.warn('Rate limit excedido para usuário', {
                userId: userId,
                email: req.user.email,
                requests: userRequests.length,
                limit: maxRequests,
                ip: req.ip
            });

            return res.status(429).json({
                success: false,
                message: 'Muitas requisições. Tente novamente mais tarde.',
                code: 'RATE_LIMIT_EXCEEDED',
                retryAfter: Math.ceil(windowMs / 1000)
            });
        }

        userRequests.push(now);
        requests.set(userId, userRequests);

        // Adicionar headers de rate limit
        res.set({
            'X-RateLimit-Limit': maxRequests,
            'X-RateLimit-Remaining': maxRequests - userRequests.length,
            'X-RateLimit-Reset': new Date(now + windowMs).toISOString()
        });

        next();
    };
};

module.exports = {
    authenticate,
    authenticateOptional,
    authorize,
    requirePlan,
    checkOwnership,
    requireAdmin,
    requireInstructor,
    rateLimitByUser
};



