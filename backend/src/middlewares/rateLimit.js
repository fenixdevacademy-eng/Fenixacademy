const redis = require('../database/redis');
const logger = require('../utils/logger');

/**
 * Rate Limiter básico
 */
class RateLimiter {
    constructor(config = {}) {
        this.windowMs = config.windowMs || 15 * 60 * 1000; // 15 min
        this.maxRequests = config.maxRequests || 100;
        this.message = config.message || 'Rate limit excedido';
        this.keyGenerator = config.keyGenerator || this.defaultKeyGenerator;
    }

    defaultKeyGenerator(req) {
        return `rate_limit:${req.ip || 'unknown'}`;
    }

    async shouldBlock(key) {
        try {
            const data = await redis.hgetall(key);
            const requests = parseInt(data.requests) || 0;
            return requests >= this.maxRequests;
        } catch (error) {
            logger.error('Erro ao verificar rate limit', { error: error.message });
            return false;
        }
    }

    async increment(key) {
        try {
            const pipeline = redis.pipeline();
            pipeline.hincrby(key, 'requests', 1);
            pipeline.expire(key, Math.ceil(this.windowMs / 1000));
            await pipeline.exec();
        } catch (error) {
            logger.error('Erro ao incrementar rate limit', { error: error.message });
        }
    }

    middleware() {
        return async (req, res, next) => {
            try {
                const key = this.keyGenerator(req);

                if (await this.shouldBlock(key)) {
                    logger.warn('Rate limit excedido', { key, ip: req.ip });
                    return res.status(429).json({
                        success: false,
                        message: this.message,
                        code: 'RATE_LIMIT_EXCEEDED'
                    });
                }

                await this.increment(key);
                next();
            } catch (error) {
                logger.error('Erro no rate limiting', { error: error.message });
                next();
            }
        };
    }
}

// Rate limiters predefinidos
const rateLimiters = {
    global: new RateLimiter({ maxRequests: 100 }),
    user: new RateLimiter({
        maxRequests: 50,
        keyGenerator: (req) => `rate_limit:user:${req.user?._id || 'anonymous'}`
    }),
    auth: new RateLimiter({
        maxRequests: 5,
        windowMs: 15 * 60 * 1000,
        keyGenerator: (req) => `rate_limit:auth:${req.ip}`
    }),
    upload: new RateLimiter({
        maxRequests: 10,
        windowMs: 60 * 60 * 1000
    })
};

module.exports = { RateLimiter, rateLimiters };
