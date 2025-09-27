/**
 * 🔍 CONFIGURAÇÃO ESLINT PARA FENIX ACADEMY API
 * 
 * Configuração baseada no padrão Airbnb com regras personalizadas
 * para Node.js e Express
 */

module.exports = {
    // Ambiente
    env: {
        node: true,
        es2021: true,
        jest: true,
    },

    // Extensões
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:node/recommended',
        'plugin:security/recommended',
        'plugin:prettier/recommended',
    ],

    // Parser
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
    },

    // Plugins
    plugins: [
        '@typescript-eslint',
        'node',
        'security',
        'prettier',
        'import',
        'jsdoc',
    ],

    // Regras personalizadas
    rules: {
        // ===== REGRAS GERAIS =====

        // Prettier
        'prettier/prettier': 'error',

        // Imports
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
            },
        ],
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*.test.js',
                    '**/*.test.ts',
                    '**/*.spec.js',
                    '**/*.spec.ts',
                    '**/tests/**/*',
                    '**/jest.config.js',
                    '**/webpack.config.js',
                ],
            },
        ],

        // TypeScript
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',

        // Node.js
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-missing-import': 'off',
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-extraneous-import': 'off',
        'node/no-extraneous-require': 'off',

        // ===== REGRAS DE CÓDIGO =====

        // Funções
        'func-names': 'off',
        'no-console': 'off', // Permitir console.log em desenvolvimento
        'no-debugger': 'error',
        'no-alert': 'error',
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-script-url': 'error',

        // Variáveis
        'no-var': 'error',
        'prefer-const': 'error',
        'no-unused-vars': 'off', // Usar regra do TypeScript
        'no-undef': 'error',

        // Strings
        'prefer-template': 'error',
        'template-curly-spacing': 'error',

        // Objetos
        'object-shorthand': 'error',
        'prefer-object-spread': 'error',

        // Arrays
        'prefer-arrow-callback': 'error',
        'arrow-spacing': 'error',
        'no-array-constructor': 'error',

        // Loops
        'no-await-in-loop': 'warn',
        'no-loop-func': 'error',

        // ===== REGRAS DE SEGURANÇA =====

        // Security plugin
        'security/detect-object-injection': 'warn',
        'security/detect-non-literal-regexp': 'warn',
        'security/detect-unsafe-regex': 'warn',
        'security/detect-buffer-noassert': 'warn',
        'security/detect-child-process': 'warn',
        'security/detect-disable-mustache-escape': 'warn',
        'security/detect-eval-with-expression': 'warn',
        'security/detect-no-csrf-before-method-override': 'warn',
        'security/detect-non-literal-fs-filename': 'warn',
        'security/detect-non-literal-require': 'warn',
        'security/detect-possible-timing-attacks': 'warn',
        'security/detect-pseudoRandomBytes': 'warn',

        // ===== REGRAS DE ESTILO =====

        // Indentação
        indent: ['error', 2],

        // Espaçamento
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'space-before-blocks': 'error',
        'keyword-spacing': 'error',
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'comma-spacing': 'error',
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],

        // Quebras de linha
        'max-len': [
            'error',
            {
                code: 100,
                tabWidth: 2,
                ignoreUrls: true,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'linebreak-style': ['error', 'unix'],
        'no-trailing-spaces': 'error',
        'eol-last': 'error',

        // ===== REGRAS ESPECÍFICAS PARA API =====

        // Express
        'express-rate-limit': 'off', // Plugin não disponível

        // MongoDB
        'no-underscore-dangle': [
            'error',
            {
                allow: ['_id', '__v', '_createdAt', '_updatedAt'],
            },
        ],

        // JWT
        'no-constant-condition': [
            'error',
            {
                checkLoops: false,
            },
        ],

        // ===== REGRAS DE PERFORMANCE =====

        'no-return-await': 'error',
        'prefer-promise-reject-errors': 'error',

        // ===== REGRAS DE TESTES =====

        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',

        // ===== REGRAS DE DOCUMENTAÇÃO =====

        'jsdoc/require-jsdoc': [
            'warn',
            {
                publicOnly: true,
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: true,
                    ClassDeclaration: true,
                },
                contexts: [
                    'ExportNamedDeclaration',
                    'ExportDefaultDeclaration',
                ],
            },
        ],
        'jsdoc/require-param': 'warn',
        'jsdoc/require-returns': 'warn',
        'jsdoc/require-description': 'warn',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/newline-after-description': 'warn',
        'jsdoc/no-undefined-types': 'warn',
    },

    // Configurações específicas para arquivos
    overrides: [
        {
            // Arquivos de teste
            files: ['**/*.test.js', '**/*.test.ts', '**/*.spec.js', '**/*.spec.ts'],
            env: {
                jest: true,
            },
            rules: {
                'no-console': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
        {
            // Arquivos de configuração
            files: ['*.config.js', '*.config.ts', 'webpack.config.js'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
        {
            // Arquivos de migração
            files: ['**/migrations/**/*.js', '**/migrations/**/*.ts'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
            },
        },
        {
            // Arquivos de seed
            files: ['**/seeds/**/*.js', '**/seeds/**/*.ts'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
            },
        },
    ],

    // Configurações globais
    globals: {
        // Jest
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',

        // Node.js
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',

        // Express
        req: 'readonly',
        res: 'readonly',
        next: 'readonly',

        // Socket.IO
        io: 'readonly',
        socket: 'readonly',

        // MongoDB
        db: 'readonly',
        collection: 'readonly',

        // Redis
        redis: 'readonly',
    },

    // Configurações de import
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
    },
};



