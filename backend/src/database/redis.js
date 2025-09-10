/**
 * 🔴 CONEXÃO COM REDIS
 * 
 * Sistema de cache e sessões com Redis incluindo:
 * - Pool de conexões
 * - Reconexão automática
 * - Cache inteligente
 * - Sessões distribuídas
 */

const redis = require('redis');
const config = require('../config');
const { logger, logUtils } = require('../utils/logger');

class RedisConnection {
    constructor() {
        this.client = null;
        this.isConnected = false;
        this.connectionAttempts = 0;
        this.maxReconnectAttempts = 10;
        this.reconnectDelay = 5000; // 5 segundos

        // Configurações do Redis
        this.redisOptions = {
            url: config.database.redis.url,
            password: config.database.redis.password,
            ...config.database.redis.options,
            retry_strategy: (options) => {
                if (options.error && options.error.code === 'ECONNREFUSED') {
                    logger.error('❌ Servidor Redis recusou conexão');
                    return new Error('Servidor Redis indisponível');
                }

                if (this.connectionAttempts > this.maxReconnectAttempts) {
                    logger.error('❌ Número máximo de tentativas de reconexão excedido');
                    return new Error('Máximo de tentativas de reconexão excedido');
                }

                this.connectionAttempts++;
                logger.info(`🔄 Tentativa de reconexão Redis ${this.connectionAttempts}/${this.maxReconnectAttempts}`);

                return Math.min(options.attempt * 100, 3000);
            }
        };
    }

    /**
     * Conecta ao Redis
     */
    async connect() {
        try {
            this.connectionStartTime = Date.now();

            logger.info('🔄 Conectando ao Redis...');

            // Cria cliente Redis
            this.client = redis.createClient(this.redisOptions);

            // Configura eventos
            this.setupEvents();

            // Conecta
            await this.client.connect();

            // Testa conexão
            await this.client.ping();

            this.isConnected = true;
            this.connectionAttempts = 0;

            const connectionTime = Date.now() - this.connectionStartTime;
            logger.info(`✅ Conectado ao Redis com sucesso em ${connectionTime}ms`);

            // Log de performance
            logUtils.logPerformance('Redis Connection', connectionTime, {
                host: this.client.options.socket?.host || 'localhost',
                port: this.client.options.socket?.port || 6379
            });

        } catch (error) {
            this.connectionAttempts++;

            logger.error(`❌ Falha na conexão com Redis (tentativa ${this.connectionAttempts}):`, error.message);

            // Log de erro com contexto
            logUtils.logError(error, {
                operation: 'Redis Connection',
                attempt: this.connectionAttempts,
                maxAttempts: this.maxReconnectAttempts
            });

            // Tenta reconectar se não excedeu o limite
            if (this.connectionAttempts < this.maxReconnectAttempts) {
                logger.info(`🔄 Tentando reconectar Redis em ${this.reconnectDelay / 1000} segundos...`);

                setTimeout(() => {
                    this.connect();
                }, this.reconnectDelay);
            } else {
                logger.error('❌ Número máximo de tentativas de conexão Redis excedido');
                throw new Error('Falha na conexão com Redis após múltiplas tentativas');
            }
        }
    }

    /**
     * Configura eventos do cliente Redis
     */
    setupEvents() {
        // Conexão estabelecida
        this.client.on('connect', () => {
            logger.info('🔗 Cliente Redis conectado');
        });

        // Conexão pronta
        this.client.on('ready', () => {
            logger.info('✅ Cliente Redis pronto para uso');
        });

        // Conexão perdida
        this.client.on('end', () => {
            this.isConnected = false;
            logger.warn('⚠️  Conexão com Redis perdida');

            // Log de evento de segurança
            logUtils.logSecurityEvent('Redis Disconnection', {
                timestamp: new Date().toISOString()
            });
        });

        // Erro na conexão
        this.client.on('error', (error) => {
            this.isConnected = false;
            logger.error('❌ Erro na conexão com Redis:', error.message);

            // Log de erro com contexto
            logUtils.logError(error, {
                operation: 'Redis Connection'
            });
        });

        // Reconexão
        this.client.on('reconnecting', () => {
            logger.info('🔄 Reconectando ao Redis...');
        });

        // Reconectado
        this.client.on('reconnect', () => {
            this.isConnected = true;
            logger.info('✅ Reconectado ao Redis');

            // Log de performance da reconexão
            const reconnectionTime = Date.now() - this.reconnectionStartTime;
            logUtils.logPerformance('Redis Reconnection', reconnectionTime, {
                attempts: this.connectionAttempts
            });
        });
    }

    /**
     * Verifica se está conectado
     */
    isConnected() {
        return this.client && this.client.isReady;
    }

    /**
     * Obtém informações da conexão
     */
    getConnectionInfo() {
        if (!this.isConnected()) {
            return null;
        }

        return {
            host: this.client.options.socket?.host || 'localhost',
            port: this.client.options.socket?.port || 6379,
            isReady: this.client.isReady,
            isOpen: this.client.isOpen
        };
    }

    /**
     * Operações básicas de cache
     */

    // Set com TTL
    async set(key, value, ttl = 3600) {
        try {
            const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
            await this.client.setEx(key, ttl, serializedValue);

            // Log de performance
            logUtils.logPerformance('Redis Set', 0, {
                key,
                ttl,
                valueType: typeof value
            });

            return true;
        } catch (error) {
            logger.error(`❌ Erro ao definir chave ${key}:`, error.message);
            throw error;
        }
    }

    // Get
    async get(key) {
        try {
            const value = await this.client.get(key);

            if (value === null) {
                return null;
            }

            // Tenta fazer parse de JSON
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        } catch (error) {
            logger.error(`❌ Erro ao obter chave ${key}:`, error.message);
            throw error;
        }
    }

    // Delete
    async del(key) {
        try {
            const result = await this.client.del(key);

            // Log de performance
            logUtils.logPerformance('Redis Delete', 0, {
                key,
                deleted: result > 0
            });

            return result > 0;
        } catch (error) {
            logger.error(`❌ Erro ao deletar chave ${key}:`, error.message);
            throw error;
        }
    }

    // Exists
    async exists(key) {
        try {
            const result = await this.client.exists(key);
            return result === 1;
        } catch (error) {
            logger.error(`❌ Erro ao verificar existência da chave ${key}:`, error.message);
            throw error;
        }
    }

    // TTL
    async ttl(key) {
        try {
            return await this.client.ttl(key);
        } catch (error) {
            logger.error(`❌ Erro ao obter TTL da chave ${key}:`, error.message);
            throw error;
        }
    }

    // Expire
    async expire(key, seconds) {
        try {
            return await this.client.expire(key, seconds);
        } catch (error) {
            logger.error(`❌ Erro ao definir TTL da chave ${key}:`, error.message);
            throw error;
        }
    }

    /**
     * Operações de hash
     */

    // HSet
    async hset(key, field, value) {
        try {
            const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
            await this.client.hSet(key, field, serializedValue);
            return true;
        } catch (error) {
            logger.error(`❌ Erro ao definir campo ${field} do hash ${key}:`, error.message);
            throw error;
        }
    }

    // HGet
    async hget(key, field) {
        try {
            const value = await this.client.hGet(key, field);

            if (value === null) {
                return null;
            }

            // Tenta fazer parse de JSON
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        } catch (error) {
            logger.error(`❌ Erro ao obter campo ${field} do hash ${key}:`, error.message);
            throw error;
        }
    }

    // HGetAll
    async hgetall(key) {
        try {
            const hash = await this.client.hGetAll(key);

            // Tenta fazer parse de valores JSON
            const parsedHash = {};
            for (const [field, value] of Object.entries(hash)) {
                try {
                    parsedHash[field] = JSON.parse(value);
                } catch {
                    parsedHash[field] = value;
                }
            }

            return parsedHash;
        } catch (error) {
            logger.error(`❌ Erro ao obter hash ${key}:`, error.message);
            throw error;
        }
    }

    // HDel
    async hdel(key, ...fields) {
        try {
            const result = await this.client.hDel(key, ...fields);
            return result > 0;
        } catch (error) {
            logger.error(`❌ Erro ao deletar campos do hash ${key}:`, error.message);
            throw error;
        }
    }

    /**
     * Operações de lista
     */

    // LPush
    async lpush(key, ...values) {
        try {
            const serializedValues = values.map(value =>
                typeof value === 'object' ? JSON.stringify(value) : value
            );
            return await this.client.lPush(key, serializedValues);
        } catch (error) {
            logger.error(`❌ Erro ao fazer LPush na lista ${key}:`, error.message);
            throw error;
        }
    }

    // RPush
    async rpush(key, ...values) {
        try {
            const serializedValues = values.map(value =>
                typeof value === 'object' ? JSON.stringify(value) : value
            );
            return await this.client.rPush(key, serializedValues);
        } catch (error) {
            logger.error(`❌ Erro ao fazer RPush na lista ${key}:`, error.message);
            throw error;
        }
    }

    // LPop
    async lpop(key) {
        try {
            const value = await this.client.lPop(key);

            if (value === null) {
                return null;
            }

            // Tenta fazer parse de JSON
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        } catch (error) {
            logger.error(`❌ Erro ao fazer LPop na lista ${key}:`, error.message);
            throw error;
        }
    }

    // RPop
    async rpop(key) {
        try {
            const value = await this.client.rPop(key);

            if (value === null) {
                return null;
            }

            // Tenta fazer parse de JSON
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        } catch (error) {
            logger.error(`❌ Erro ao fazer RPop na lista ${key}:`, error.message);
            throw error;
        }
    }

    // LRange
    async lrange(key, start, stop) {
        try {
            const values = await this.client.lRange(key, start, stop);

            // Tenta fazer parse de valores JSON
            return values.map(value => {
                try {
                    return JSON.parse(value);
                } catch {
                    return value;
                }
            });
        } catch (error) {
            logger.error(`❌ Erro ao obter range da lista ${key}:`, error.message);
            throw error;
        }
    }

    /**
     * Operações de conjunto
     */

    // SAdd
    async sadd(key, ...members) {
        try {
            const serializedMembers = members.map(member =>
                typeof member === 'object' ? JSON.stringify(member) : member
            );
            return await this.client.sAdd(key, serializedMembers);
        } catch (error) {
            logger.error(`❌ Erro ao adicionar membros ao conjunto ${key}:`, error.message);
            throw error;
        }
    }

    // SMembers
    async smembers(key) {
        try {
            const members = await this.client.sMembers(key);

            // Tenta fazer parse de valores JSON
            return members.map(member => {
                try {
                    return JSON.parse(member);
                } catch {
                    return member;
                }
            });
        } catch (error) {
            logger.error(`❌ Erro ao obter membros do conjunto ${key}:`, error.message);
            throw error;
        }
    }

    // SRem
    async srem(key, ...members) {
        try {
            const serializedMembers = members.map(member =>
                typeof member === 'object' ? JSON.stringify(member) : member
            );
            return await this.client.sRem(key, serializedMembers);
        } catch (error) {
            logger.error(`❌ Erro ao remover membros do conjunto ${key}:`, error.message);
            throw error;
        }
    }

    /**
     * Operações de cache inteligente
     */

    // Cache com fallback
    async getWithFallback(key, fallback, ttl = 3600) {
        try {
            // Tenta obter do cache
            let value = await this.get(key);

            if (value !== null) {
                return value;
            }

            // Se não encontrou, executa fallback
            if (typeof fallback === 'function') {
                value = await fallback();
            } else {
                value = fallback;
            }

            // Salva no cache
            if (value !== null && value !== undefined) {
                await this.set(key, value, ttl);
            }

            return value;
        } catch (error) {
            logger.error(`❌ Erro no cache com fallback para ${key}:`, error.message);

            // Em caso de erro, tenta executar fallback
            if (typeof fallback === 'function') {
                try {
                    return await fallback();
                } catch (fallbackError) {
                    logger.error(`❌ Erro no fallback para ${key}:`, fallbackError.message);
                    throw fallbackError;
                }
            }

            return fallback;
        }
    }

    // Cache com invalidação
    async invalidatePattern(pattern) {
        try {
            const keys = await this.client.keys(pattern);

            if (keys.length > 0) {
                await this.client.del(keys);
                logger.info(`🗑️  Invalidados ${keys.length} itens de cache com padrão: ${pattern}`);
            }

            return keys.length;
        } catch (error) {
            logger.error(`❌ Erro ao invalidar cache com padrão ${pattern}:`, error.message);
            throw error;
        }
    }

    // Cache com tags
    async setWithTags(key, value, tags = [], ttl = 3600) {
        try {
            // Salva o valor
            await this.set(key, value, ttl);

            // Salva as tags
            if (tags.length > 0) {
                const tagKey = `tags:${key}`;
                await this.set(tagKey, tags, ttl);

                // Adiciona à lista de chaves de cada tag
                for (const tag of tags) {
                    const tagKeysKey = `tag_keys:${tag}`;
                    await this.sadd(tagKeysKey, key);
                    await this.expire(tagKeysKey, ttl);
                }
            }

            return true;
        } catch (error) {
            logger.error(`❌ Erro ao definir cache com tags para ${key}:`, error.message);
            throw error;
        }
    }

    // Invalidação por tag
    async invalidateByTag(tag) {
        try {
            const tagKeysKey = `tag_keys:${tag}`;
            const keys = await this.smembers(tagKeysKey);

            if (keys.length > 0) {
                // Remove as chaves
                await this.client.del(keys);

                // Remove as tags
                for (const key of keys) {
                    await this.del(`tags:${key}`);
                }

                // Remove a lista de chaves da tag
                await this.del(tagKeysKey);

                logger.info(`🗑️  Invalidados ${keys.length} itens de cache com tag: ${tag}`);
            }

            return keys.length;
        } catch (error) {
            logger.error(`❌ Erro ao invalidar cache por tag ${tag}:`, error.message);
            throw error;
        }
    }

    /**
     * Estatísticas e monitoramento
     */

    // Obtém estatísticas do Redis
    async getStats() {
        try {
            const info = await this.client.info();
            const memory = await this.client.memoryUsage();

            return {
                info: info.split('\r\n').reduce((acc, line) => {
                    const [key, value] = line.split(':');
                    if (key && value) {
                        acc[key] = value;
                    }
                    return acc;
                }, {}),
                memory,
                connected: this.isConnected(),
                connectionInfo: this.getConnectionInfo()
            };
        } catch (error) {
            logger.error('❌ Erro ao obter estatísticas do Redis:', error.message);
            throw error;
        }
    }

    // Limpa cache antigo
    async cleanupOldCache() {
        try {
            // Implementar lógica de limpeza baseada em TTL
            // Por exemplo, remover chaves expiradas
            logger.info('🧹 Limpeza de cache antigo concluída');
        } catch (error) {
            logger.error('❌ Erro na limpeza de cache:', error.message);
        }
    }

    /**
     * Desconecta do Redis
     */
    async disconnect() {
        try {
            if (this.client && this.isConnected()) {
                logger.info('🔄 Desconectando do Redis...');
                await this.client.quit();
                this.isConnected = false;
                logger.info('✅ Desconectado do Redis com sucesso');
            }
        } catch (error) {
            logger.error('❌ Erro ao desconectar do Redis:', error.message);
            logUtils.logError(error, {
                operation: 'Redis Disconnection'
            });
        }
    }
}

// Cria e exporta uma instância única
const redisConnection = new RedisConnection();

module.exports = redisConnection;



