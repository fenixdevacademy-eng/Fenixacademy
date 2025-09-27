'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import PageErrorFallback from './PageErrorFallback';

interface PageWrapperProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface PageWrapperState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class PageWrapper extends Component<PageWrapperProps, PageWrapperState> {
    constructor(props: PageWrapperProps) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): PageWrapperState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('PageWrapper caught an error:', error, errorInfo);

        this.setState({ error, errorInfo });

        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // Log do erro para debugging
        if (typeof window !== 'undefined') {
            console.error('Page error details:', {
                message: error.message,
                stack: error.stack,
                componentStack: errorInfo.componentStack,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    }

    handleReload = () => {
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    handleGoBack = () => {
        if (typeof window !== 'undefined') {
            window.history.back();
        }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <PageErrorFallback
                    error={this.state.error}
                    errorInfo={this.state.errorInfo?.componentStack}
                    onRetry={this.handleRetry}
                    onReload={this.handleReload}
                    onGoBack={this.handleGoBack}
                />
            );
        }

        return this.props.children;
    }
}

// Hook para usar em componentes funcionais
export function usePageErrorHandler() {
    const [hasError, setHasError] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const handleError = React.useCallback((error: Error) => {
        console.error('Page error caught by hook:', error);
        setHasError(true);
        setError(error);
    }, []);

    const clearError = React.useCallback(() => {
        setHasError(false);
        setError(null);
    }, []);

    const retry = React.useCallback(() => {
        clearError();
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }, [clearError]);

    return {
        hasError,
        error,
        handleError,
        clearError,
        retry
    }
}





