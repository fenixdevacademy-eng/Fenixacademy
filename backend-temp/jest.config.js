/**
 * 🧪 CONFIGURAÇÃO JEST PARA FENIX ACADEMY API
 * 
 * Configuração completa para testes unitários, integração e e2e
 */

module.exports = {
    // Ambiente de teste
    testEnvironment: 'node',

    // Diretórios de teste
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,ts}',
        '<rootDir>/src/**/*.{test,spec}.{js,ts}',
        '<rootDir>/tests/**/*.{test,spec}.{js,ts}'
    ],

    // Diretórios a serem ignorados
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/',
        '<rootDir>/build/',
        '<rootDir>/coverage/',
        '<rootDir>/.next/',
        '<rootDir>/logs/',
        '<rootDir>/uploads/'
    ],

    // Extensões de arquivo
    moduleFileExtensions: ['js', 'ts', 'json'],

    // Transformações
    transform: {
        '^.+\\.(js|ts)$': ['babel-jest', {
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        node: 'current'
                    }
                }],
                '@babel/preset-typescript'
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread'
            ]
        }]
    },

    // Módulos
    moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
        '^@routes/(.*)$': '<rootDir>/src/routes/$1',
        '^@validations/(.*)$': '<rootDir>/src/validations/$1'
    },

    // Setup e teardown
    setupFilesAfterEnv: [
        '<rootDir>/tests/setup.js',
        '<rootDir>/tests/jest.setup.js'
    ],

    // Variáveis de ambiente para testes
    setupFiles: [
        '<rootDir>/tests/env.setup.js'
    ],

    // Timeout para testes
    testTimeout: 30000,

    // Coverage
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!src/**/*.d.ts',
        '!src/**/__tests__/**',
        '!src/**/*.{test,spec}.{js,ts}',
        '!src/server.js',
        '!src/config/index.js'
    ],

    coverageDirectory: 'coverage',
    coverageReporters: [
        'text',
        'lcov',
        'html',
        'json',
        'json-summary'
    ],

    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },

    // Configurações específicas para diferentes tipos de teste
    projects: [
        {
            // Testes unitários
            displayName: 'unit',
            testMatch: [
                '<rootDir>/src/**/__tests__/**/*.{js,ts}',
                '<rootDir>/src/**/*.unit.{test,spec}.{js,ts}'
            ],
            testEnvironment: 'node',
            setupFilesAfterEnv: ['<rootDir>/tests/unit.setup.js']
        },
        {
            // Testes de integração
            displayName: 'integration',
            testMatch: [
                '<rootDir>/tests/integration/**/*.{test,spec}.{js,ts}'
            ],
            testEnvironment: 'node',
            setupFilesAfterEnv: ['<rootDir>/tests/integration.setup.js']
        },
        {
            // Testes e2e
            displayName: 'e2e',
            testMatch: [
                '<rootDir>/tests/e2e/**/*.{test,spec}.{js,ts}'
            ],
            testEnvironment: 'node',
            setupFilesAfterEnv: ['<rootDir>/tests/e2e.setup.js']
        }
    ],

    // Configurações de watch
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname'
    ],

    // Configurações de verbose
    verbose: true,

    // Configurações de bail
    bail: false,

    // Configurações de forceExit
    forceExit: true,

    // Configurações de clearMocks
    clearMocks: true,

    // Configurações de restoreMocks
    restoreMocks: true,

    // Configurações de resetMocks
    resetMocks: true,

    // Configurações de testSequencer
    testSequencer: '<rootDir>/tests/testSequencer.js',

    // Configurações de globals
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json'
        }
    },

    // Configurações de reporters
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: 'coverage',
                outputName: 'junit.xml',
                classNameTemplate: '{classname}',
                titleTemplate: '{title}',
                ancestorSeparator: ' › ',
                usePathForSuiteName: true
            }
        ]
    ],

    // Configurações de notify
    notify: true,

    // Configurações de notifyMode
    notifyMode: 'failure-change',

    // Configurações de errorOnDeprecated
    errorOnDeprecated: true,

    // Configurações de maxWorkers
    maxWorkers: '50%',

    // Configurações de workerIdleMemoryLimit
    workerIdleMemoryLimit: '512MB',

    // Configurações de injectGlobals
    injectGlobals: false
};



