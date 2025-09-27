'use client';

import React, { useEffect, useState } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/lib/utils';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export interface ConditionalRedirectProps {
    condition: boolean;
    redirectTo: string;
    delay?: number;
    fallback?: React.ReactNode;
    loadingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    onRedirect?: () => void;
    onError?: (error: Error) => void;
    className?: string;
}

const ConditionalRedirect = React.forwardRef<HTMLDivElement, ConditionalRedirectProps>(
    ({
        condition,
        redirectTo,
        delay = 1000,
        fallback,
        loadingMessage = "Redirecionando...",
        successMessage = "Redirecionamento realizado com sucesso!",
        errorMessage = "Erro ao redirecionar",
        onRedirect,
        onError,
        className,
        ...props
    }, ref) => {
        const { navigate } = useNavigation();
        const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
        const [error, setError] = useState<Error | null>(null);

        useEffect(() => {
            if (condition && status === 'idle') {
                setStatus('loading');

                const timer = setTimeout(() => {
                    try {
                        navigate(redirectTo);
                        setStatus('success');
                        onRedirect?.();
                    } catch (err) {
                        const error = err instanceof Error ? err : new Error('Unknown error');
                        setError(error);
                        setStatus('error');
                        onError?.(error);
                    }
                }, delay);

                return () => clearTimeout(timer);
            }
        }, [condition, redirectTo, delay, navigate, onRedirect, onError, status]);

        if (!condition) {
            return fallback ? <>{fallback}</> : null;
        }

        const renderContent = () => {
            switch (status) {
                case 'loading':
                    return (
                        <div className="flex items-center justify-center space-x-3">
                            <Loader2 className="h-6 w-6 animate-spin text-theme-primary" />
                            <span className="text-theme-text">{loadingMessage}</span>
                        </div>
                    );

                case 'success':
                    return (
                        <div className="flex items-center justify-center space-x-3">
                            <CheckCircle className="h-6 w-6 text-green-500" />
                            <span className="text-theme-text">{successMessage}</span>
                        </div>
                    );

                case 'error':
                    return (
                        <div className="flex items-center justify-center space-x-3">
                            <AlertCircle className="h-6 w-6 text-red-500" />
                            <span className="text-theme-text">{errorMessage}</span>
                            {error && (
                                <details className="mt-2">
                                    <summary className="cursor-pointer text-sm text-theme-text-secondary">
                                        Detalhes do erro
                                    </summary>
                                    <p className="mt-1 text-sm text-red-500">{error.message}</p>
                                </details>
                            )}
                        </div>
                    );

                default:
                    return null;
            }
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "flex items-center justify-center p-6 theme-surface rounded-lg border theme-border",
                    className
                )}
                {...props}
            >
                {renderContent()}
            </div>
        );
    }
);

ConditionalRedirect.displayName = "ConditionalRedirect";

export default ConditionalRedirect;