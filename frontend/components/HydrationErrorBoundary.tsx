"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class HydrationErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        // Verificar se é um erro de hidratação
        const isHydrationError = error.message.includes('hydration') ||
            error.message.includes('Hydration') ||
            error.message.includes('425') ||
            error.message.includes('418') ||
            error.message.includes('423');

        if (isHydrationError) {
            console.warn('Hydration error caught, attempting recovery:', error);
            return { hasError: true, error }
        }

        return { hasError: false }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Hydration Error Boundary caught an error:', error, errorInfo);

        // Se for um erro de hidratação, tentar recuperar após um delay
        if (error.message.includes('hydration') ||
            error.message.includes('Hydration') ||
            error.message.includes('425') ||
            error.message.includes('418') ||
            error.message.includes('423')) {

            setTimeout(() => {
                this.setState({ hasError: false });
            }, 1000);
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Recuperando da hidratação...</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default HydrationErrorBoundary;