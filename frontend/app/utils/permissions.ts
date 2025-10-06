'use client';

﻿export interface UserPermissions {
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
        description: 'Acesso limitado a conteúdo básico',
        price: 0,
        features: [
            'Acesso a cursos gratuitos',
            'Visualização de conteúdo básico',
            'Participação em fóruns'
        ],
        restrictions: [
            'Sem downloads de recursos',
            'Sem acesso a cursos premium',
            'Sem certificados',
            'Sem suporte prioritário'
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
        description: 'Acesso completo a todos os recursos',
        price: 99.90,
        features: [
            'Acesso a todos os cursos',
            'Downloads de recursos',
            'Exercícios avançados',
            'Projetos práticos',
            'Certificados premium',
            'Suporte prioritário',
            'Acesso a comunidade exclusiva'
        ],
        restrictions: [
            'Sem acesso a recursos administrativos',
            'Sem personalização avançada'
        ]
    },
    {
        id: 'admin',
        name: 'Administrador',
        description: 'Acesso total ao sistema',
        price: 0,
        features: [
            'Acesso total ao sistema',
            'Gerenciamento de usuários',
            'Criação de cursos',
            'Analytics avançados',
            'Suporte 24/7',
            'Recursos de personalização'
        ],
        restrictions: []
    }
];

export function getPermissionLevel(levelId: string): PermissionLevel | undefined {
    return PERMISSION_LEVELS.find(level => level.id === levelId);
}

export function getPermissionLabel(levelId: string): string {
    const level = getPermissionLevel(levelId);
    return level ? level.name : 'Desconhecido';
}

export function getPermissionColor(levelId: string): string {
    switch (levelId) {
        case 'free': return 'text-gray-600 bg-gray-100';
        case 'basic': return 'text-blue-600 bg-blue-100';
        case 'premium': return 'text-purple-600 bg-purple-100';
        case 'admin': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
    }
}

export function hasPermission(userPermissions: UserPermissions, permission: keyof UserPermissions): boolean {
    return userPermissions[permission] === true;
}

export function canAccessCourse(userPermissions: UserPermissions, courseId: number): boolean {
    if (userPermissions.level === 'admin') return true;
    if (userPermissions.level === 'premium') return true;
    if (userPermissions.level === 'basic' && userPermissions.purchasedCourses.includes(courseId)) return true;
    return false;
}

export function canDownloadResources(userPermissions: UserPermissions): boolean {
    return userPermissions.level === 'premium' || userPermissions.level === 'admin';
}

export function canAccessAdvancedFeatures(userPermissions: UserPermissions): boolean {
    return userPermissions.level === 'premium' || userPermissions.level === 'admin';
}

export function canTakeQuizzes(userPermissions: UserPermissions): boolean {
    return userPermissions.level !== 'free';
}

export function canAccessExercises(userPermissions: UserPermissions): boolean {
    return userPermissions.level !== 'free';
}

export function canViewTranscripts(userPermissions: UserPermissions): boolean {
    return userPermissions.level === 'premium' || userPermissions.level === 'admin';
}

export function getUpgradeMessage(currentLevel: string, targetLevel: string): string {
    const current = getPermissionLevel(currentLevel);
    const target = getPermissionLevel(targetLevel);

    if (!current || !target) return 'Nível de permissão inválido';

    return `Upgrade de ${current.name} para ${target.name} por R$ ${target.price.toFixed(2)}`;
}

export function getFeatureComparison(): Array<{
    feature: string;
    free: boolean;
    basic: boolean;
    premium: boolean;
    admin: boolean;
}> {
    return [
        {
            feature: 'Acesso a cursos básicos',
            free: true,
            basic: true,
            premium: true,
            admin: true
        },
        {
            feature: 'Acesso a cursos intermediários',
            free: false,
            basic: true,
            premium: true,
            admin: true
        },
        {
            feature: 'Acesso a cursos avançados',
            free: false,
            basic: false,
            premium: true,
            admin: true
        },
        {
            feature: 'Downloads de recursos',
            free: false,
            basic: false,
            premium: true,
            admin: true
        },
        {
            feature: 'Exercícios práticos',
            free: false,
            basic: true,
            premium: true,
            admin: true
        },
        {
            feature: 'Quizzes de avaliação',
            free: false,
            basic: true,
            premium: true,
            admin: true
        },
        {
            feature: 'Certificados de conclusão',
            free: false,
            basic: true,
            premium: true,
            admin: true
        },
        {
            feature: 'Suporte prioritário',
            free: false,
            basic: false,
            premium: true,
            admin: true
        },
        {
            feature: 'Acesso a comunidade exclusiva',
            free: false,
            basic: false,
            premium: true,
            admin: true
        },
        {
            feature: 'Recursos administrativos',
            free: false,
            basic: false,
            premium: false,
            admin: true
        }
    ];
}

export function validatePermissionLevel(level: string): boolean {
    return PERMISSION_LEVELS.some(permissionLevel => permissionLevel.id === level);
}

export function getPermissionFeatures(levelId: string): string[] {
    const level = getPermissionLevel(levelId);
    return level ? level.features : [];
}

export function getPermissionRestrictions(levelId: string): string[] {
    const level = getPermissionLevel(levelId);
    return level ? level.restrictions : [];
}

export function comparePermissionLevels(level1: string, level2: string): number {
    const levels = ['free', 'basic', 'premium', 'admin'];
    const index1 = levels.indexOf(level1);
    const index2 = levels.indexOf(level2);

    if (index1 === -1 || index2 === -1) return 0;

    return index1 - index2;
}

export function isHigherLevel(level1: string, level2: string): boolean {
    return comparePermissionLevels(level1, level2) > 0;
}

export function isLowerLevel(level1: string, level2: string): boolean {
    return comparePermissionLevels(level1, level2) < 0;
}

export function getNextLevel(currentLevel: string): PermissionLevel | null {
    const levels = ['free', 'basic', 'premium', 'admin'];
    const currentIndex = levels.indexOf(currentLevel);

    if (currentIndex === -1 || currentIndex === levels.length - 1) return null;

    const nextLevelId = levels[currentIndex + 1];
    return getPermissionLevel(nextLevelId) || null;
}

export function getPreviousLevel(currentLevel: string): PermissionLevel | null {
    const levels = ['free', 'basic', 'premium', 'admin'];
    const currentIndex = levels.indexOf(currentLevel);

    if (currentIndex === -1 || currentIndex === 0) return null;

    const previousLevelId = levels[currentIndex - 1];
    return getPermissionLevel(previousLevelId) || null;
}

export function getUpgradePath(currentLevel: string): PermissionLevel[] {
    const levels = ['free', 'basic', 'premium', 'admin'];
    const currentIndex = levels.indexOf(currentLevel);

    if (currentIndex === -1) return [];

    return levels
        .slice(currentIndex + 1)
        .map(levelId => getPermissionLevel(levelId))
        .filter((level): level is PermissionLevel => level !== undefined);
}

export function getDowngradePath(currentLevel: string): PermissionLevel[] {
    const levels = ['free', 'basic', 'premium', 'admin'];
    const currentIndex = levels.indexOf(currentLevel);

    if (currentIndex === -1) return [];

    return levels
        .slice(0, currentIndex)
        .map(levelId => getPermissionLevel(levelId))
        .filter((level): level is PermissionLevel => level !== undefined);
}

export function calculateUpgradeCost(currentLevel: string, targetLevel: string): number {
    const current = getPermissionLevel(currentLevel);
    const target = getPermissionLevel(targetLevel);

    if (!current || !target) return 0;

    return Math.max(0, target.price - current.price);
}

export function getPermissionSummary(levelId: string): {
    level: PermissionLevel;
    features: string[];
    restrictions: string[];
    price: number;
    color: string;
    label: string;
} {
    const level = getPermissionLevel(levelId);

    if (!level) {
        throw new Error(`Nível de permissão inválido: ${levelId}`);
    }

    return {
        level,
        features: level.features,
        restrictions: level.restrictions,
        price: level.price,
        color: getPermissionColor(levelId),
        label: getPermissionLabel(levelId)
    };
}

export default {
    PERMISSION_LEVELS,
    getPermissionLevel,
    getPermissionLabel,
    getPermissionColor,
    hasPermission,
    canAccessCourse,
    canDownloadResources,
    canAccessAdvancedFeatures,
    canTakeQuizzes,
    canAccessExercises,
    canViewTranscripts,
    getUpgradeMessage,
    getFeatureComparison,
    validatePermissionLevel,
    getPermissionFeatures,
    getPermissionRestrictions,
    comparePermissionLevels,
    isHigherLevel,
    isLowerLevel,
    getNextLevel,
    getPreviousLevel,
    getUpgradePath,
    getDowngradePath,
    calculateUpgradeCost,
    getPermissionSummary
};