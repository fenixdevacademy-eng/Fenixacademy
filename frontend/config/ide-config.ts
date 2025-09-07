// Configuração centralizada da Fenix IDE 2.0 - Online
export const ideConfig = {
    // URLs principais
    urls: {
        main: '/ide',
        demo: '/ide/demo',
        desktop: '/fenix-ide-v2/desktop',
        docs: '/fenix-ide-v2/docs',
        features: '/ide/features'
    },

    // Status da IDE
    status: {
        online: true,
        requiresDownload: false,
        instantAccess: true,
        crossPlatform: true
    },

    // Funcionalidades principais
    features: {
        aiAssistant: {
            name: 'AI Assistant',
            description: 'Assistente de IA integrado para análise de código',
            icon: '🤖',
            enabled: true,
            online: true
        },
        hotReload: {
            name: 'Hot Reload',
            description: 'Recarregamento automático em tempo real',
            icon: '⚡',
            enabled: true,
            online: true
        },
        gamification: {
            name: 'Gamificação',
            description: 'Sistema de conquistas e progressão',
            icon: '🏆',
            enabled: true,
            online: true
        },
        brazilianTools: {
            name: 'Ferramentas Brasileiras',
            description: 'CPF/CNPJ, PIX, LGPD e formatações nacionais',
            icon: '🇧🇷',
            enabled: true,
            online: true
        },
        codeExecution: {
            name: 'Execução de Código',
            description: 'Execute código diretamente no navegador',
            icon: '💻',
            enabled: true,
            online: true,
            supportedLanguages: ['html', 'javascript', 'css', 'python', 'csharp']
        },
        fileSystem: {
            name: 'Sistema de Arquivos',
            description: 'Crie, edite e gerencie arquivos online',
            icon: '📁',
            enabled: true,
            online: true
        }
    },

    // Configurações do editor
    editor: {
        theme: 'dark',
        fontSize: 14,
        tabSize: 4,
        autoSave: true,
        wordWrap: true,
        minimap: true,
        lineNumbers: true,
        syntaxHighlighting: true,
        autocomplete: true,
        supportedLanguages: [
            'javascript', 'typescript', 'python', 'csharp', 'java', 'cpp', 'c',
            'html', 'css', 'scss', 'sass', 'php', 'ruby', 'go', 'rust',
            'swift', 'kotlin', 'dart', 'r', 'matlab', 'sql', 'json', 'xml'
        ]
    },

    // Configurações de execução
    execution: {
        html: {
            method: 'browser',
            description: 'Abre em nova aba do navegador'
        },
        javascript: {
            method: 'console',
            description: 'Executa no console do navegador'
        },
        css: {
            method: 'inject',
            description: 'Aplica estilos ao documento atual'
        },
        python: {
            method: 'ai-analysis',
            description: 'Análise inteligente via AI Assistant'
        },
        csharp: {
            method: 'ai-analysis',
            description: 'Análise inteligente via AI Assistant'
        }
    },

    // Configurações de gamificação
    gamification: {
        enabled: true,
        levels: [
            { name: 'Iniciante', minPoints: 0, icon: '🌱' },
            { name: 'Desenvolvedor', minPoints: 100, icon: '💻' },
            { name: 'Programador', minPoints: 300, icon: '🚀' },
            { name: 'Arquiteto', minPoints: 600, icon: '🏗️' },
            { name: 'Mestre', minPoints: 1000, icon: '👑' }
        ],
        achievements: [
            { id: 'first-file', name: 'Primeiro Arquivo', description: 'Criou o primeiro arquivo', points: 10 },
            { id: 'code-execution', name: 'Executor', description: 'Executou código pela primeira vez', points: 20 },
            { id: 'ai-usage', name: 'IA Explorer', description: 'Usou o AI Assistant', points: 15 },
            { id: 'hot-reload', name: 'Hot Reloader', description: 'Ativou o Hot Reload', points: 25 }
        ]
    }
};

// Utilitários da IDE
export const ideUtils = {
    // Verificar se a IDE está online
    isOnline: () => ideConfig.status.online,

    // Verificar se precisa de download
    requiresDownload: () => ideConfig.status.requiresDownload,

    // Obter URL da IDE
    getIDEUrl: (type: 'main' | 'demo' = 'main') => ideConfig.urls[type],

    // Verificar se funcionalidade está disponível
    isFeatureEnabled: (feature: keyof typeof ideConfig.features) =>
        ideConfig.features[feature]?.enabled && ideConfig.features[feature]?.online,

    // Obter linguagens suportadas
    getSupportedLanguages: () => ideConfig.editor.supportedLanguages,

    // Verificar se linguagem é executável no navegador
    isLanguageExecutable: (language: string) =>
        ideConfig.execution[language as keyof typeof ideConfig.execution]?.method !== 'ai-analysis'
};
