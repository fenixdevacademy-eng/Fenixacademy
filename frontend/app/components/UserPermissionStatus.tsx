'use client';

import { Shield, Crown, User, CheckCircle, XCircle, Star, ArrowUp, Info } from 'lucide-react';
import { UserPermissions, getPermissionColor, getPermissionLabel, PERMISSION_LEVELS } from '../utils/permissions';

interface UserPermissionStatusProps {
    userPermissions: UserPermissions;
    onUpgrade?: () => void;
    className?: string;
    showUpgradeButton?: boolean;
    compact?: boolean;
}

export default function UserPermissionStatus({
    userPermissions,
    onUpgrade,
    className = '',
    showUpgradeButton = true,
    compact = false
}: UserPermissionStatusProps) {
    const currentLevel = PERMISSION_LEVELS.find(level => level.id === userPermissions.level);
    const nextLevel = PERMISSION_LEVELS.find(level => {
        const levels = { 'free': 0, 'basic': 1, 'premium': 2, 'admin': 3 };
        const currentIndex = levels[userPermissions.level as keyof typeof levels];
        return levels[level.id as keyof typeof levels] === currentIndex + 1;
    });

    const getPermissionIcon = () => {
        switch (userPermissions.level) {
            case 'admin': return Crown;
            case 'premium': return Star;
            case 'basic': return Shield;
            default: return User;
        }
    };

    const getPermissionDescription = () => {
        switch (userPermissions.level) {
            case 'admin':
                return 'Acesso total ao sistema';
            case 'premium':
                return 'Acesso completo a todos os recursos';
            case 'basic':
                return 'Acesso a cursos intermediários';
            default:
                return 'Acesso limitado a conteúdo básico';
        }
    };

    const getUpgradeMessage = () => {
        if (!nextLevel) return null;
        return `Upgrade para ${nextLevel.name} por R$ ${nextLevel.price.toFixed(2)}`;
    };

    const PermissionIcon = getPermissionIcon();

    if (compact) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <div className={`p-2 rounded-full ${getPermissionColor(userPermissions.level)}`}>
                    <PermissionIcon className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-sm font-medium text-gray-900">
                        {getPermissionLabel(userPermissions.level)}
                    </div>
                    <div className="text-xs text-gray-500">
                        {getPermissionDescription()}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${getPermissionColor(userPermissions.level)}`}>
                        <PermissionIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {getPermissionLabel(userPermissions.level)}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {getPermissionDescription()}
                        </p>
                    </div>
                </div>

                {showUpgradeButton && nextLevel && (
                    <button
                        onClick={onUpgrade}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
                    >
                        <ArrowUp className="w-4 h-4" />
                        Upgrade
                    </button>
                )}
            </div>

            {/* Permission Features */}
            <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-gray-900">Recursos Disponíveis:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={userPermissions.canAccessContent ? 'text-gray-900' : 'text-gray-500'}>
                            Acesso ao conteúdo
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={userPermissions.canTakeQuizzes ? 'text-gray-900' : 'text-gray-500'}>
                            Quizzes de avaliação
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={userPermissions.canAccessExercises ? 'text-gray-900' : 'text-gray-500'}>
                            Exercícios práticos
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={userPermissions.canDownloadResources ? 'text-gray-900' : 'text-gray-500'}>
                            Download de recursos
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={userPermissions.canViewTranscripts ? 'text-gray-900' : 'text-gray-500'}>
                            Transcrições de vídeo
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={userPermissions.canAccessAdvancedFeatures ? 'text-gray-900' : 'text-gray-500'}>
                            Recursos avançados
                        </span>
                    </div>
                </div>
            </div>

            {/* Course Progress */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Cursos Comprados:</span>
                    <span className="text-sm text-gray-600">
                        {userPermissions.purchasedCourses.length}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((userPermissions.purchasedCourses.length / 10) * 100, 100)}%` }}
                    />
                </div>
            </div>

            {/* Upgrade Message */}
            {nextLevel && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm text-blue-800 font-medium">
                                {getUpgradeMessage()}
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                                Desbloqueie mais recursos e funcionalidades
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Admin Notice */}
            {userPermissions.level === 'admin' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <Crown className="w-4 h-4 text-red-600 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm text-red-800 font-medium">
                                Acesso Administrativo
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                                Você tem acesso total ao sistema
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}