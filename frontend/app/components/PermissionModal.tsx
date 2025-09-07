'use client';

import { Lock, X, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { PERMISSION_LEVELS, getPermissionLabel, getPermissionColor } from '../utils/permissions';

interface PermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    requiredLevel: string;
    contentType: string;
}

export default function PermissionModal({ isOpen, onClose, message, requiredLevel }: PermissionModalProps) {
    if (!isOpen) return null;

    const currentLevel = PERMISSION_LEVELS.find(level => level.id === requiredLevel);
    const nextLevel = PERMISSION_LEVELS.find(level => level.id === 'basic');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <Lock className="w-8 h-8 text-red-500 mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900">Acesso Restrito</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 mb-4">{message}</p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center mb-2">
                            <Shield className="w-5 h-5 text-blue-500 mr-2" />
                            <span className="font-medium text-gray-900">Nível Requerido</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPermissionColor(requiredLevel)}`}>
                            {getPermissionLabel(requiredLevel)}
                        </span>
                    </div>

                    {currentLevel && (
                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">O que você ganha:</h4>
                            <ul className="space-y-2">
                                {currentLevel.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Fechar
                    </button>
                    <Link
                        href="/pricing"
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                        Ver Planos
                    </Link>
                </div>

                {nextLevel && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center mb-2">
                            <AlertCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="text-sm font-medium text-blue-900">Próximo nível disponível</span>
                        </div>
                        <p className="text-sm text-blue-700">
                            Faça upgrade para {nextLevel.name} por apenas R$ {nextLevel.price.toFixed(2)}/mês
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
} 