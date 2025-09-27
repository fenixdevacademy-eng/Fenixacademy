'use client';

import { Lock, X, Shield, CheckCircle, AlertCircle, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { PERMISSION_LEVELS, getPermissionLabel, getPermissionColor } from '../utils/permissions';

interface PermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    requiredLevel: string;
    contentType: string;
    className?: string;
}

export default function PermissionModal({
    isOpen,
    onClose,
    message,
    requiredLevel,
    contentType,
    className = ''
}: PermissionModalProps) {
    if (!isOpen) return null;

    const currentLevel = PERMISSION_LEVELS.find(level => level.id === requiredLevel);
    const nextLevel = PERMISSION_LEVELS.find(level => level.id === 'basic');

    const getLevelIcon = (level: string) => {
        switch (level) {
            case 'free': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'basic': return <Shield className="w-5 h-5 text-blue-500" />;
            case 'premium': return <Star className="w-5 h-5 text-yellow-500" />;
            case 'pro': return <Lock className="w-5 h-5 text-purple-500" />;
            default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    const getLevelDescription = (level: string) => {
        switch (level) {
            case 'free': return 'Acesso gratuito limitado';
            case 'basic': return 'Acesso básico com recursos essenciais';
            case 'premium': return 'Acesso premium com recursos avançados';
            case 'pro': return 'Acesso profissional completo';
            default: return 'Nível de acesso desconhecido';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {getLevelIcon(requiredLevel)}
                        <h2 className="text-lg font-semibold text-gray-900">
                            Acesso Restrito
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 mb-4">{message}</p>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                Nível necessário:
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getPermissionColor(requiredLevel)}`}>
                                {getPermissionLabel(requiredLevel)}
                            </span>
                        </div>
                        <p className="text-xs text-gray-600">
                            {getLevelDescription(requiredLevel)}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link
                        href="/pricing"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                        <Star className="w-4 h-4" />
                        Ver Planos
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Fechar
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Já tem acesso? Entre em contato com o suporte.
                    </p>
                </div>
            </div>
        </div>
    );
}