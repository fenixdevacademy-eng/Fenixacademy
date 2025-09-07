'use client';

import { Shield, Crown, User, CheckCircle, XCircle } from 'lucide-react';
import { UserPermissions, getPermissionColor, getPermissionLabel, PERMISSION_LEVELS } from '../utils/permissions';

interface UserPermissionStatusProps {
    userPermissions: UserPermissions;
    onUpgrade?: () => void;
}

export default function UserPermissionStatus({ userPermissions, onUpgrade }: UserPermissionStatusProps) {
    const currentLevel = PERMISSION_LEVELS.find(level => level.id === userPermissions.level);
    const nextLevel = PERMISSION_LEVELS.find(level => {
        const levels = { 'free': 0, 'basic': 1, 'premium': 2, 'admin': 3 };
        const currentIndex = levels[userPermissions.level as keyof typeof levels];
        return levels[level.id as keyof typeof levels] === currentIndex + 1;
    });

    const getPermissionIcon = (level: string) => {
        switch (level) {
            case 'admin': return Crown;
            case 'premium': return Crown;
            case 'basic': return Shield;
            default: return User;
        }
    };

    const PermissionIcon = getPermissionIcon(userPermissions.level);

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getPermissionColor(userPermissions.level)}`}>
                        <PermissionIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Seu Plano</h3>
                        <p className="text-sm text-gray-600">{currentLevel?.name}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPermissionColor(userPermissions.level)}`}>
                    {getPermissionLabel(userPermissions.level)}
                </span>
            </div>

            <div className="space-y-3 mb-4">
                <h4 className="font-medium text-gray-900 text-sm">Permissões Ativas:</h4>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Acesso ao conteúdo</span>
                        {userPermissions.canAccessContent ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                        )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Downloads de recursos</span>
                        {userPermissions.canDownloadResources ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                        )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Exercícios práticos</span>
                        {userPermissions.canAccessExercises ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                        )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Quizzes de avaliação</span>
                        {userPermissions.canTakeQuizzes ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                        )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Transcrições</span>
                        {userPermissions.canViewTranscripts ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                        )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Recursos avançados</span>
                        {userPermissions.canAccessAdvancedFeatures ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                        )}
                    </div>
                </div>
            </div>

            {nextLevel && userPermissions.level !== 'admin' && (
                <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Próximo nível:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPermissionColor(nextLevel.id)}`}>
                            {getPermissionLabel(nextLevel.id)}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                        {nextLevel.description}
                    </p>
                    <button
                        onClick={onUpgrade}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Fazer Upgrade
                    </button>
                </div>
            )}

            {userPermissions.level === 'admin' && (
                <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span>Você tem acesso total ao sistema</span>
                    </div>
                </div>
            )}
        </div>
    );
} 