/**
 * 🚀 CONFIGURAÇÃO PM2 PARA FENIX ACADEMY API
 * 
 * Configuração para deploy em produção com:
 * - Cluster mode para múltiplas instâncias
 * - Auto-restart em caso de falha
 * - Logs estruturados
 * - Monitoramento de performance
 */

module.exports = {
    apps: [
        {
            // Configuração principal da API
            name: 'fenix-api',
            script: 'src/server.js',
            instances: 'max', // Usa todas as CPUs disponíveis
            exec_mode: 'cluster',
            watch: false,
            max_memory_restart: '1G',

            // Variáveis de ambiente
            env: {
                NODE_ENV: 'development',
                PORT: 5000
            },

            env_production: {
                NODE_ENV: 'production',
                PORT: 5000,
                MONGODB_URI: 'mongodb://localhost:27017/fenix_academy',
                REDIS_URL: 'redis://localhost:6379',
                JWT_SECRET: 'your-production-jwt-secret',
                JWT_EXPIRES_IN: '7d',
                EMAIL_HOST: 'smtp.gmail.com',
                EMAIL_USER: 'fenix@academy.com',
                EMAIL_PASS: 'your-production-email-password'
            },

            // Configurações de log
            log_file: './logs/combined.log',
            out_file: './logs/out.log',
            error_file: './logs/error.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

            // Configurações de restart
            min_uptime: '10s',
            max_restarts: 10,
            restart_delay: 4000,

            // Configurações de performance
            node_args: '--max-old-space-size=1024',

            // Configurações de monitoramento
            pmx: true,

            // Configurações de cluster
            kill_timeout: 5000,
            wait_ready: true,
            listen_timeout: 8000,

            // Configurações de segurança
            uid: 'nodejs',
            gid: 'nodejs',

            // Scripts de lifecycle
            pre_start: 'npm run build',
            post_start: 'echo "API iniciada com sucesso!"',
            pre_stop: 'echo "Parando API..."',
            post_stop: 'echo "API parada com sucesso!"',

            // Configurações de health check
            health_check_grace_period: 3000,
            health_check_fatal_exceptions: true
        },

        {
            // Worker para processamento de filas
            name: 'fenix-worker',
            script: 'src/workers/queueWorker.js',
            instances: 2,
            exec_mode: 'cluster',
            watch: false,
            max_memory_restart: '512M',

            env_production: {
                NODE_ENV: 'production',
                MONGODB_URI: 'mongodb://localhost:27017/fenix_academy',
                REDIS_URL: 'redis://localhost:6379'
            },

            // Configurações específicas para workers
            log_file: './logs/worker.log',
            out_file: './logs/worker-out.log',
            error_file: './logs/worker-error.log',

            // Workers não precisam de restart automático
            max_restarts: 0,
            autorestart: false
        },

        {
            // Worker para notificações
            name: 'fenix-notifications',
            script: 'src/workers/notificationWorker.js',
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            max_memory_restart: '256M',

            env_production: {
                NODE_ENV: 'production',
                MONGODB_URI: 'mongodb://localhost:27017/fenix_academy',
                REDIS_URL: 'redis://localhost:6379',
                EMAIL_HOST: 'smtp.gmail.com',
                EMAIL_USER: 'fenix@academy.com',
                EMAIL_PASS: 'your-production-email-password'
            },

            log_file: './logs/notifications.log',
            out_file: './logs/notifications-out.log',
            error_file: './logs/notifications-error.log'
        },

        {
            // Worker para analytics
            name: 'fenix-analytics',
            script: 'src/workers/analyticsWorker.js',
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            max_memory_restart: '256M',

            env_production: {
                NODE_ENV: 'production',
                MONGODB_URI: 'mongodb://localhost:27017/fenix_academy',
                REDIS_URL: 'redis://localhost:6379'
            },

            log_file: './logs/analytics.log',
            out_file: './logs/analytics-out.log',
            error_file: './logs/analytics-error.log'
        }
    ],

    // Configurações de deploy
    deploy: {
        production: {
            user: 'fenix',
            host: 'your-production-server.com',
            ref: 'origin/main',
            repo: 'https://github.com/fenix-academy/api.git',
            path: '/var/www/fenix-api',
            'pre-deploy-local': 'echo "Preparando deploy local..."',
            'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
            'pre-setup': 'echo "Configurando servidor..."'
        },

        staging: {
            user: 'fenix',
            host: 'your-staging-server.com',
            ref: 'origin/develop',
            repo: 'https://github.com/fenix-academy/api.git',
            path: '/var/www/fenix-api-staging',
            'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
            env: {
                NODE_ENV: 'staging'
            }
        }
    }
};


