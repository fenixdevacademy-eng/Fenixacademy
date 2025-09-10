/**
 * ⚙️ CONFIGURAÇÕES CENTRAIS DA FENIX ACADEMY API
 * 
 * Todas as configurações da aplicação centralizadas em um local
 */

require('dotenv').config();

const config = {
    // ===== SERVIDOR =====
    server: {
        port: process.env.PORT || 5000,
        environment: process.env.NODE_ENV || 'development',
        version: process.env.API_VERSION || 'v1',
        host: process.env.HOST || 'localhost'
    },

    // ===== API =====
    api: {
        prefix: process.env.API_PREFIX || '/api',
        version: process.env.API_VERSION || 'v1',
        cors: {
            origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
            credentials: true
        }
    },

    // ===== BANCO DE DADOS =====
    database: {
        mongodb: {
            uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fenix_academy',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                bufferMaxEntries: 0,
                bufferCommands: false
            }
        },
        redis: {
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            password: process.env.REDIS_PASSWORD || null,
            options: {
                retryDelayOnFailover: 100,
                enableReadyCheck: false,
                maxRetriesPerRequest: 3
            }
        }
    },

    // ===== AUTENTICAÇÃO =====
    auth: {
        jwt: {
            secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
            refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
            refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
        },
        bcrypt: {
            rounds: parseInt(process.env.BCRYPT_ROUNDS) || 12
        },
        session: {
            secret: process.env.SESSION_SECRET || 'your-session-secret',
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        }
    },

    // ===== EMAIL =====
    email: {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER || 'fenix@academy.com',
            pass: process.env.EMAIL_PASS || 'your-app-password'
        },
        from: process.env.EMAIL_FROM || 'Fenix Academy <fenix@academy.com>',
        templates: {
            welcome: 'welcome',
            passwordReset: 'password-reset',
            courseEnrollment: 'course-enrollment',
            courseCompletion: 'course-completion',
            paymentConfirmation: 'payment-confirmation'
        }
    },

    // ===== SMS (TWILIO) =====
    sms: {
        twilio: {
            accountSid: process.env.TWILIO_ACCOUNT_SID,
            authToken: process.env.TWILIO_AUTH_TOKEN,
            phoneNumber: process.env.TWILIO_PHONE_NUMBER
        },
        enabled: !!process.env.TWILIO_ACCOUNT_SID
    },

    // ===== PAGAMENTOS =====
    payments: {
        stripe: {
            secretKey: process.env.STRIPE_SECRET_KEY,
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
            enabled: !!process.env.STRIPE_SECRET_KEY
        },
        paypal: {
            clientId: process.env.PAYPAL_CLIENT_ID,
            clientSecret: process.env.PAYPAL_CLIENT_SECRET,
            mode: process.env.PAYPAL_MODE || 'sandbox',
            enabled: !!process.env.PAYPAL_CLIENT_ID
        }
    },

    // ===== ARMAZENAMENTO =====
    storage: {
        aws: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION || 'us-east-1',
            bucket: process.env.AWS_S3_BUCKET || 'fenix-academy-storage',
            enabled: !!process.env.AWS_ACCESS_KEY_ID
        },
        cloudinary: {
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRET,
            enabled: !!process.env.CLOUDINARY_CLOUD_NAME
        },
        local: {
            path: './uploads',
            maxSize: 10 * 1024 * 1024, // 10MB
            allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'video/mp4']
        }
    },

    // ===== FIREBASE =====
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY ?
            process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : null,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        clientId: process.env.FIREBASE_CLIENT_ID,
        enabled: !!process.env.FIREBASE_PROJECT_ID
    },

    // ===== SEGURANÇA =====
    security: {
        rateLimit: {
            windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
            max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
        },
        cors: {
            origin: process.env.CORS_ORIGIN ?
                process.env.CORS_ORIGIN.split(',') :
                ['http://localhost:3000', 'https://fenixacademy.com'],
            credentials: true
        },
        helmet: {
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
        }
    },

    // ===== LOGS =====
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        filePath: process.env.LOG_FILE_PATH || './logs',
        sentry: {
            dsn: process.env.SENTRY_DSN,
            enabled: !!process.env.SENTRY_DSN
        }
    },

    // ===== MONITORAMENTO =====
    monitoring: {
        newRelic: {
            licenseKey: process.env.NEW_RELIC_LICENSE_KEY,
            enabled: !!process.env.NEW_RELIC_LICENSE_KEY
        },
        datadog: {
            apiKey: process.env.DATADOG_API_KEY,
            enabled: !!process.env.DATADOG_API_KEY
        }
    },

    // ===== INTEGRAÇÕES =====
    integrations: {
        googleAnalytics: {
            id: process.env.GOOGLE_ANALYTICS_ID,
            enabled: !!process.env.GOOGLE_ANALYTICS_ID
        },
        facebookPixel: {
            id: process.env.FACEBOOK_PIXEL_ID,
            enabled: !!process.env.FACEBOOK_PIXEL_ID
        },
        hotjar: {
            id: process.env.HOTJAR_ID,
            enabled: !!process.env.HOTJAR_ID
        }
    },

    // ===== DESENVOLVIMENTO =====
    development: {
        debug: process.env.DEBUG === 'true',
        swagger: {
            enabled: process.env.ENABLE_SWAGGER !== 'false',
            options: {
                definition: {
                    openapi: '3.0.0',
                    info: {
                        title: 'Fenix Academy API',
                        version: '1.0.0',
                        description: 'API completa para o sistema de educação da Fenix Academy'
                    }
                }
            }
        },
        logs: process.env.ENABLE_LOGS !== 'false',
        metrics: process.env.ENABLE_METRICS !== 'false'
    },

    // ===== CURSOS =====
    courses: {
        defaultImage: '/images/course-default.jpg',
        maxFileSize: 50 * 1024 * 1024, // 50MB
        allowedVideoFormats: ['mp4', 'webm', 'ogg'],
        allowedImageFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        maxLessonsPerModule: 20,
        maxModulesPerCourse: 15
    },

    // ===== USUÁRIOS =====
    users: {
        defaultAvatar: '/images/avatar-default.jpg',
        maxAvatarSize: 5 * 1024 * 1024, // 5MB
        allowedAvatarFormats: ['jpg', 'jpeg', 'png', 'gif'],
        passwordMinLength: 8,
        maxLoginAttempts: 5,
        lockoutDuration: 15 * 60 * 1000 // 15 minutos
    },

    // ===== NOTIFICAÇÕES =====
    notifications: {
        email: {
            enabled: true,
            batchSize: 100,
            delay: 1000 // 1 segundo entre envios
        },
        sms: {
            enabled: !!process.env.TWILIO_ACCOUNT_SID,
            batchSize: 50,
            delay: 2000 // 2 segundos entre envios
        },
        push: {
            enabled: !!process.env.FIREBASE_PROJECT_ID,
            batchSize: 1000,
            delay: 500 // 500ms entre envios
        }
    },

    // ===== ANALYTICS =====
    analytics: {
        enabled: true,
        retentionDays: 90,
        batchSize: 1000,
        flushInterval: 5 * 60 * 1000 // 5 minutos
    },

    // ===== CRON JOBS =====
    cron: {
        enabled: true,
        timezone: 'America/Sao_Paulo',
        jobs: {
            cleanupLogs: '0 2 * * *', // 2h da manhã todos os dias
            sendReminders: '0 9 * * *', // 9h da manhã todos os dias
            generateReports: '0 0 * * 0', // Domingo à meia-noite
            backupDatabase: '0 1 * * 0', // Domingo 1h da manhã
            cleanupTempFiles: '0 3 * * *', // 3h da manhã todos os dias
            sendNewsletter: '0 8 * * 1' // Segunda 8h da manhã
        }
    }
};

// Validação das configurações obrigatórias
const validateConfig = () => {
    const required = [
        'auth.jwt.secret',
        'database.mongodb.uri'
    ];

    const missing = required.filter(key => {
        const value = key.split('.').reduce((obj, k) => obj && obj[k], config);
        return !value;
    });

    if (missing.length > 0) {
        throw new Error(`Configurações obrigatórias ausentes: ${missing.join(', ')}`);
    }
};

// Valida as configurações ao carregar
try {
    validateConfig();
} catch (error) {
    console.error('❌ Erro na configuração:', error.message);
    process.exit(1);
}

module.exports = config;



