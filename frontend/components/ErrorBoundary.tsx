'use client';

/**
 * Error Boundary para capturar erros JavaScript em qualquer lugar da árvore de componentes
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
          <div className="text-center max-w-lg mx-auto">
            <div className="text-red-500 text-8xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold mb-4 text-white">Ops! Algo deu errado</h1>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para corrigir.
            </p>

            <div className="space-y-4 mb-8">
              <button
                onClick={this.handleRetry}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
              >
                🔄 Tentar Novamente
              </button>

              <button
                onClick={this.handleReload}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
              >
                🔄 Recarregar Página
              </button>

              <button
                onClick={this.handleGoBack}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
              >
                ← Voltar
              </button>
            </div>

            <div className="text-sm text-gray-400">
              <p>Se o problema persistir, entre em contato conosco:</p>
              <p className="mt-2">
                <a href="mailto:suporte@fenixacademy.com" className="text-blue-400 hover:text-blue-300">
                  suporte@fenixacademy.com
                </a>
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-gray-800 rounded-lg p-4">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
                  🔍 Detalhes do erro (desenvolvimento)
                </summary>
                <div className="mt-4 space-y-2">
                  <div className="text-red-400 font-mono text-xs">
                    <strong>Mensagem:</strong> {this.state.error.message}
                  </div>
                  <div className="text-red-400 font-mono text-xs">
                    <strong>Stack:</strong>
                    <pre className="mt-1 text-xs text-red-300 bg-gray-900 p-3 rounded overflow-auto max-h-40">
                      {this.state.error.stack}
                    </pre>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para usar em componentes funcionais
export function useErrorHandler() {
  return (error: Error, errorInfo?: string) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    // Aqui você pode adicionar lógica para enviar erros para um serviço de monitoramento
  }
}