'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft, Mail } from 'lucide-react';

interface PageErrorFallbackProps {
    error?: Error;
    errorInfo?: string;
    onRetry?: () => void;
    onReload?: () => void;
    onGoBack?: () => void;
    title?: string;
    message?: string;
    showContact?: boolean;
}

export default function PageErrorFallback({
    error,
    errorInfo,
    onRetry,
    onReload,
    onGoBack,
    title = "Ops! Algo deu errado",
    message = "Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para corrigir.",
    showContact = true
}: PageErrorFallbackProps) {
    const handleRetry = () => {
        if (onRetry) {
            onRetry();
        } else if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    const handleReload = () => {
        if (onReload) {
            onReload();
        } else if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    const handleGoBack = () => {
        if (onGoBack) {
            onGoBack();
        } else if (typeof window !== 'undefined') {
            window.history.back();
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
            <div className="text-center max-w-lg mx-auto">
                <div className="text-red-500 text-8xl mb-6">
                    <AlertTriangle className="w-20 h-20 mx-auto" />
                </div>

                <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>

                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    {message}
                </p>

                <div className="space-y-4 mb-8">
                    <button
                        onClick={handleRetry}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Tentar Novamente
                    </button>

                    <button
                        onClick={handleReload}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Recarregar Página
                    </button>

                    <button
                        onClick={handleGoBack}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                    </button>
                </div>

                {showContact && (
                    <div className="text-sm text-gray-400">
                        <p>Se o problema persistir, entre em contato conosco:</p>
                        <p className="mt-2">
                            <a
                                href="mailto:suporte@fenixacademy.com"
                                className="text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                suporte@fenixacademy.com
                            </a>
                        </p>
                    </div>
                )}

                {process.env.NODE_ENV === 'development' && error && (
                    <details className="mt-8 text-left bg-gray-800 rounded-lg p-4">
                        <summary className="cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
                            🔍 Detalhes do erro (desenvolvimento)
                        </summary>
                        <div className="mt-4 space-y-2">
                            <div className="text-red-400 font-mono text-xs">
                                <strong>Mensagem:</strong> {error.message}
                            </div>
                            {errorInfo && (
                                <div className="text-red-400 font-mono text-xs">
                                    <strong>Info:</strong> {errorInfo}
                                </div>
                            )}
                            <div className="text-red-400 font-mono text-xs">
                                <strong>Stack:</strong>
                                <pre className="mt-1 text-xs text-red-300 bg-gray-900 p-3 rounded overflow-auto max-h-40">
                                    {error.stack}
                                </pre>
                            </div>
                        </div>
                    </details>
                )}
            </div>
        </div>
    );
}





