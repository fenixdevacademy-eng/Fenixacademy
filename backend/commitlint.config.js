/**
 * 📝 CONFIGURAÇÃO COMMITLINT PARA FENIX ACADEMY API
 * 
 * Configuração para commits padronizados seguindo Conventional Commits
 */

module.exports = {
    extends: ['@commitlint/config-conventional'],

    rules: {
        // Tipo de commit obrigatório
        'type-enum': [
            2,
            'always',
            [
                'feat',     // Nova funcionalidade
                'fix',      // Correção de bug
                'docs',     // Documentação
                'style',    // Formatação, ponto e vírgula, etc.
                'refactor', // Refatoração de código
                'perf',     // Melhorias de performance
                'test',     // Adicionando testes
                'chore',    // Tarefas de manutenção
                'ci',       // Mudanças em CI/CD
                'build',    // Mudanças no sistema de build
                'revert'    // Reverter commits
            ]
        ],

        // Escopo obrigatório para commits de feature e fix
        'scope-enum': [
            2,
            'always',
            [
                'auth',        // Autenticação
                'users',       // Usuários
                'courses',     // Cursos
                'lessons',     // Aulas
                'enrollments', // Matrículas
                'payments',    // Pagamentos
                'notifications', // Notificações
                'analytics',   // Analytics
                'admin',       // Admin
                'api',         // API geral
                'database',    // Banco de dados
                'security',    // Segurança
                'performance', // Performance
                'testing',     // Testes
                'docs',        // Documentação
                'deps',        // Dependências
                'config',      // Configurações
                'docker',      // Docker
                'nginx',       // Nginx
                'redis',       // Redis
                'mongodb',     // MongoDB
                'email',       // Email
                'sms',         // SMS
                'stripe',      // Stripe
                'firebase',    // Firebase
                'aws',         // AWS
                'cloudinary'   // Cloudinary
            ]
        ],

        // Assunto obrigatório
        'subject-empty': [2, 'never'],

        // Assunto não pode terminar com ponto
        'subject-full-stop': [2, 'never', '.'],

        // Assunto deve começar com minúscula
        'subject-case': [2, 'always', 'lower-case'],

        // Assunto deve ter no máximo 72 caracteres
        'subject-max-length': [2, 'always', 72],

        // Corpo opcional
        'body-leading-blank': [1, 'always'],
        'body-max-line-length': [2, 'always', 100],

        // Footer opcional
        'footer-leading-blank': [1, 'always'],
        'footer-max-line-length': [2, 'always', 100],

        // Tipo deve ser minúsculo
        'type-case': [2, 'always', 'lower-case'],

        // Escopo deve ser minúsculo
        'scope-case': [2, 'always', 'lower-case'],

        // Escopo não pode ser vazio para features e fixes
        'scope-empty': [2, 'never'],

        // Tipo não pode ser vazio
        'type-empty': [2, 'never']
    },

    // Configurações de mensagem
    helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',

    // Exemplos de commits válidos
    examples: {
        valid: [
            'feat(auth): adicionar autenticação JWT com refresh tokens',
            'fix(users): corrigir validação de email no registro',
            'docs(api): atualizar documentação da API de cursos',
            'style(courses): aplicar formatação consistente',
            'refactor(database): otimizar queries do MongoDB',
            'perf(redis): implementar cache inteligente',
            'test(auth): adicionar testes para middleware de autenticação',
            'chore(deps): atualizar dependências para versões mais recentes',
            'ci(docker): configurar pipeline de CI/CD',
            'build(webpack): otimizar configuração de build',
            'revert(auth): reverter mudanças na autenticação'
        ],
        invalid: [
            'feat: nova funcionalidade', // Sem escopo
            'fix(): correção de bug', // Escopo vazio
            'FEAT(auth): autenticação', // Tipo em maiúsculo
            'feat(AUTH): autenticação', // Escopo em maiúsculo
            'feat(auth): Adicionar autenticação', // Assunto em maiúsculo
            'feat(auth): adicionar autenticação.', // Assunto com ponto
            'feat(auth): adicionar autenticação com descrição muito longa que excede o limite de caracteres permitido' // Assunto muito longo
        ]
    }
};



