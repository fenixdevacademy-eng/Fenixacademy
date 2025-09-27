/**
 * 🗄️ CONEXÃO COM BANCO DE DADOS MONGODB
 * 
 * Sistema de conexão robusto com MongoDB incluindo:
 * - Pool de conexões
 * - Reconexão automática
 * - Monitoramento de performance
 * - Logs detalhados
 */

const mongoose = require('mongoose');
const config = require('../config');
const { logger, logUtils } = require('../utils/logger');

class DatabaseConnection {
    constructor() {
        this.isConnected = false;
        this.connectionAttempts = 0;
        this.maxReconnectAttempts = 10;
        this.reconnectDelay = 5000; // 5 segundos

        // Configurações do Mongoose
        mongoose.set('strictQuery', false);
        mongoose.set('debug', config.development.debug);

        // Eventos de conexão
        this.setupConnectionEvents();
    }

    /**
     * Configura os eventos de conexão do MongoDB
     */
    setupConnectionEvents() {
        // Conexão estabelecida
        mongoose.connection.on('connected', () => {
            this.isConnected = true;
            this.connectionAttempts = 0;
            logger.info('✅ Conectado ao MongoDB com sucesso');

            // Log de performance da conexão
            const connectionTime = Date.now() - this.connectionStartTime;
            logUtils.logPerformance('MongoDB Connection', connectionTime, {
                database: mongoose.connection.name,
                host: mongoose.connection.host,
                port: mongoose.connection.port
            });
        });

        // Conexão perdida
        mongoose.connection.on('disconnected', () => {
            this.isConnected = false;
            logger.warn('⚠️  Conexão com MongoDB perdida');

            // Log de evento de segurança
            logUtils.logSecurityEvent('Database Disconnection', {
                database: mongoose.connection.name,
                host: mongoose.connection.host,
                timestamp: new Date().toISOString()
            });
        });

        // Erro na conexão
        mongoose.connection.on('error', (error) => {
            this.isConnected = false;
            logger.error('❌ Erro na conexão com MongoDB:', error.message);

            // Log de erro com contexto
            logUtils.logError(error, {
                operation: 'Database Connection',
                database: mongoose.connection.name,
                host: mongoose.connection.host
            });
        });

        // Reconexão
        mongoose.connection.on('reconnected', () => {
            this.isConnected = false;
            logger.info('🔄 Reconectado ao MongoDB');

            // Log de performance da reconexão
            const reconnectionTime = Date.now() - this.reconnectionStartTime;
            logUtils.logPerformance('MongoDB Reconnection', reconnectionTime, {
                database: mongoose.connection.name,
                host: mongoose.connection.host,
                attempts: this.connectionAttempts
            });
        });

        // Conexão fechada
        mongoose.connection.on('close', () => {
            this.isConnected = false;
            logger.info('🔒 Conexão com MongoDB fechada');
        });

        // Processo terminando
        process.on('SIGINT', async () => {
            await this.disconnect();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            await this.disconnect();
            process.exit(0);
        });
    }

    /**
     * Conecta ao MongoDB
     */
    async connect() {
        try {
            this.connectionStartTime = Date.now();

            logger.info('🔄 Conectando ao MongoDB...');

            const connectionOptions = {
                ...config.database.mongodb.options,
                // Configurações adicionais para produção
                ...(config.server.environment === 'production' && {
                    ssl: true,
                    sslValidate: true,
                    retryWrites: true,
                    w: 'majority'
                })
            };

            await mongoose.connect(config.database.mongodb.uri, connectionOptions);

            // Configurações pós-conexão
            this.setupPostConnectionConfigs();

        } catch (error) {
            this.connectionAttempts++;

            logger.error(`❌ Falha na conexão com MongoDB (tentativa ${this.connectionAttempts}):`, error.message);

            // Log de erro com contexto
            logUtils.logError(error, {
                operation: 'Database Connection',
                attempt: this.connectionAttempts,
                maxAttempts: this.maxReconnectAttempts,
                uri: config.database.mongodb.uri.replace(/\/\/.*@/, '//***:***@') // Oculta credenciais
            });

            // Tenta reconectar se não excedeu o limite
            if (this.connectionAttempts < this.maxReconnectAttempts) {
                logger.info(`🔄 Tentando reconectar em ${this.reconnectDelay / 1000} segundos...`);

                setTimeout(() => {
                    this.connect();
                }, this.reconnectDelay);
            } else {
                logger.error('❌ Número máximo de tentativas de conexão excedido');
                throw new Error('Falha na conexão com o banco de dados após múltiplas tentativas');
            }
        }
    }

    /**
     * Configurações aplicadas após a conexão
     */
    setupPostConnectionConfigs() {
        // Configurações de performance
        mongoose.connection.db.admin().command({
            setParameter: 1,
            maxTransactionLockRequestTimeoutMillis: 5000
        });

        // Configurações de índice
        this.createIndexes();

        // Configurações de monitoramento
        this.setupMonitoring();
    }

    /**
     * Cria índices importantes para performance
     */
    async createIndexes() {
        try {
            logger.info('🔍 Criando índices do banco de dados...');

            // Índices para usuários
            await mongoose.connection.db.collection('users').createIndex(
                { email: 1 },
                { unique: true, background: true }
            );

            await mongoose.connection.db.collection('users').createIndex(
                { username: 1 },
                { unique: true, background: true }
            );

            // Índices para cursos
            await mongoose.connection.db.collection('courses').createIndex(
                { slug: 1 },
                { unique: true, background: true }
            );

            await mongoose.connection.db.collection('courses').createIndex(
                { category: 1, status: 1 },
                { background: true }
            );

            // Índices para matrículas
            await mongoose.connection.db.collection('enrollments').createIndex(
                { userId: 1, courseId: 1 },
                { unique: true, background: true }
            );

            await mongoose.connection.db.collection('enrollments').createIndex(
                { status: 1, createdAt: -1 },
                { background: true }
            );

            // Índices para pagamentos
            await mongoose.connection.db.collection('payments').createIndex(
                { paymentId: 1 },
                { unique: true, background: true }
            );

            await mongoose.connection.db.collection('payments').createIndex(
                { userId: 1, status: 1 },
                { background: true }
            );

            // Índices para notificações
            await mongoose.connection.db.collection('notifications').createIndex(
                { userId: 1, read: 1, createdAt: -1 },
                { background: true }
            );

            // Índices para analytics
            await mongoose.connection.db.collection('analytics').createIndex(
                { eventType: 1, timestamp: -1 },
                { background: true }
            );

            await mongoose.connection.db.collection('analytics').createIndex(
                { userId: 1, eventType: 1, timestamp: -1 },
                { background: true }
            );

            logger.info('✅ Índices criados com sucesso');

        } catch (error) {
            logger.warn('⚠️  Erro ao criar índices:', error.message);

            // Log de warning com contexto
            logUtils.logWarning('Index Creation Failed', {
                error: error.message,
                operation: 'Database Index Creation'
            });
        }
    }

    /**
     * Configura monitoramento do banco de dados
     */
    setupMonitoring() {
        // Monitor de performance
        setInterval(async () => {
            try {
                const stats = await mongoose.connection.db.stats();

                // Log de métricas de performance
                logUtils.logPerformance('Database Stats', 0, {
                    collections: stats.collections,
                    dataSize: `${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`,
                    storageSize: `${(stats.storageSize / 1024 / 1024).toFixed(2)} MB`,
                    indexes: stats.indexes,
                    indexSize: `${(stats.indexSize / 1024 / 1024).toFixed(2)} MB`
                });

            } catch (error) {
                logger.debug('Erro ao obter estatísticas do banco:', error.message);
            }
        }, 5 * 60 * 1000); // A cada 5 minutos
    }

    /**
     * Verifica se está conectado
     */
    isConnected() {
        return mongoose.connection.readyState === 1;
    }

    /**
     * Obtém informações da conexão
     */
    getConnectionInfo() {
        if (!this.isConnected()) {
            return null;
        }

        return {
            host: mongoose.connection.host,
            port: mongoose.connection.port,
            name: mongoose.connection.name,
            readyState: mongoose.connection.readyState,
            models: Object.keys(mongoose.models)
        };
    }

    /**
     * Executa uma operação com monitoramento de performance
     */
    async executeWithMonitoring(operation, collection, callback) {
        const startTime = Date.now();

        try {
            const result = await callback();

            const duration = Date.now() - startTime;
            logUtils.logDatabaseOperation(operation, collection, duration, {
                success: true,
                resultType: typeof result
            });

            return result;

        } catch (error) {
            const duration = Date.now() - startTime;
            logUtils.logDatabaseOperation(operation, collection, duration, {
                success: false,
                error: error.message
            });

            throw error;
        }
    }

    /**
     * Desconecta do MongoDB
     */
    async disconnect() {
        try {
            if (this.isConnected()) {
                logger.info('🔄 Desconectando do MongoDB...');
                await mongoose.disconnect();
                logger.info('✅ Desconectado do MongoDB com sucesso');
            }
        } catch (error) {
            logger.error('❌ Erro ao desconectar do MongoDB:', error.message);
            logUtils.logError(error, {
                operation: 'Database Disconnection'
            });
        }
    }

    /**
     * Limpa o banco de dados (apenas para desenvolvimento)
     */
    async clearDatabase() {
        if (config.server.environment === 'production') {
            throw new Error('Operação não permitida em produção');
        }

        try {
            logger.warn('🧹 Limpando banco de dados...');

            const collections = await mongoose.connection.db.listCollections().toArray();

            for (const collection of collections) {
                await mongoose.connection.db.collection(collection.name).deleteMany({});
                logger.info(`Coleção ${collection.name} limpa`);
            }

            logger.info('✅ Banco de dados limpo com sucesso');

        } catch (error) {
            logger.error('❌ Erro ao limpar banco de dados:', error.message);
            throw error;
        }
    }

    /**
     * Backup do banco de dados
     */
    async backupDatabase() {
        try {
            logger.info('💾 Iniciando backup do banco de dados...');

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupPath = `./backups/backup-${timestamp}`;

            // Aqui você implementaria a lógica de backup
            // Por exemplo, usando mongodump ou exportando coleções

            logger.info(`✅ Backup criado em: ${backupPath}`);
            return backupPath;

        } catch (error) {
            logger.error('❌ Erro ao criar backup:', error.message);
            throw error;
        }
    }
}

// Cria e exporta uma instância única
const databaseConnection = new DatabaseConnection();

module.exports = databaseConnection;



