export interface UserPermissions {
    level: 'free' | 'basic' | 'premium' | 'admin';
    purchasedCourses: number[];
    canAccessContent: boolean;
    canDownloadResources: boolean;
    canTakeQuizzes: boolean;
    canAccessExercises: boolean;
    canViewTranscripts: boolean;
    canAccessAdvancedFeatures: boolean;
}

export interface PermissionLevel {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    restrictions: string[];
}

export const PERMISSION_LEVELS: PermissionLevel[] = [
    {
        id: 'free',
        name: 'Gratuito',
        description: 'Acesso limitado a cursos básicos',
        price: 0,
        features: [
            'Acesso a 3 cursos básicos',
            'Visualização de conteúdo',
            'Suporte comunitário'
        ],
        restrictions: [
            'Sem acesso a exercícios',
            'Sem downloads de recursos',
            'Sem quizzes',
            'Sem certificados'
        ]
    },
    {
        id: 'basic',
        name: 'Básico',
        description: 'Acesso a cursos intermediários',
        price: 29.90,
        features: [
            'Acesso a todos os cursos básicos',
            'Exercícios práticos',
            'Quizzes de avaliação',
            'Certificados de conclusão',
            'Suporte por email'
        ],
        restrictions: [
            'Sem downloads de recursos',
            'Sem acesso a cursos avançados',
            'Sem recursos premium'
        ]
    },
    {
        id: 'premium',
        name: 'Premium',
        description: 'Acesso completo a todos os cursos',
        price: 99.90,
        features: [
            'Acesso a todos os cursos',
            'Downloads de recursos',
            'Exercícios avançados',
            'Quizzes completos',
            'Certificados premium',
            'Suporte prioritário',
            'Recursos exclusivos'
        ],
        restrictions: [
            'Sem acesso a funcionalidades administrativas'
        ]
    },
    {
        id: 'admin',
        name: 'Administrador',
        description: 'Acesso total ao sistema',
        price: 0,
        features: [
            'Acesso total a todos os recursos',
            'Funcionalidades administrativas',
            'Gerenciamento de usuários',
            'Relatórios avançados',
            'Suporte VIP'
        ],
        restrictions: []
    }
];

export const checkPermission = (requiredLevel: string, userLevel: string): boolean => {
    const levels = { 'free': 0, 'basic': 1, 'premium': 2, 'admin': 3 };
    return levels[userLevel as keyof typeof levels] >= levels[requiredLevel as keyof typeof levels];
};

export const canAccessContent = (content: any, userPermissions: UserPermissions): boolean => {
    if (!content.requiresPermission) return true;
    return checkPermission(content.permissionLevel || 'free', userPermissions.level);
};

export const getPermissionColor = (level: string): string => {
    switch (level) {
        case 'free': return 'bg-green-100 text-green-800';
        case 'basic': return 'bg-blue-100 text-blue-800';
        case 'premium': return 'bg-purple-100 text-purple-800';
        case 'admin': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export const getPermissionLabel = (level: string): string => {
    switch (level) {
        case 'free': return 'GRATUITO';
        case 'basic': return 'BÁSICO';
        case 'premium': return 'PREMIUM';
        case 'admin': return 'ADMIN';
        default: return level.toUpperCase();
    }
};

export const getPermissionMessage = (contentType: string, requiredLevel: string): string => {
    return `Você precisa de permissão ${getPermissionLabel(requiredLevel)} para acessar este ${contentType}.`;
};

export const getDefaultUserPermissions = (): UserPermissions => ({
    level: 'free',
    purchasedCourses: [],
    canAccessContent: true,
    canDownloadResources: false,
    canTakeQuizzes: false,
    canAccessExercises: false,
    canViewTranscripts: false,
    canAccessAdvancedFeatures: false
});

export const upgradeUserPermissions = (currentLevel: string): UserPermissions => {
    const newLevel = currentLevel === 'free' ? 'basic' :
        currentLevel === 'basic' ? 'premium' : 'admin';

    return {
        level: newLevel as 'free' | 'basic' | 'premium' | 'admin',
        purchasedCourses: [],
        canAccessContent: true,
        canDownloadResources: newLevel !== 'free',
        canTakeQuizzes: newLevel !== 'free',
        canAccessExercises: newLevel !== 'free',
        canViewTranscripts: newLevel !== 'free',
        canAccessAdvancedFeatures: newLevel === 'admin'
    };
}; 