'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Send, Brain, Code, BookOpen, MessageCircle, Bot, User, Copy, ThumbsUp, Settings } from 'lucide-react';
import PageWrapperFunctional from '@/components/PageWrapperFunctional';

export default function AIPage() {
    const [messages, setMessages] = useState<Array<{
        id: string;
        type: 'user' | 'ai';
        content: string;
        timestamp: Date;
    }>>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
    const [isHydrated, setIsHydrated] = useState(false);
    const [errorDetails, setErrorDetails] = useState<string>('');

    // Inicializar mensagem de boas-vindas e verificar API
    useEffect(() => {
        // Marcar como hidratado
        setIsHydrated(true);

        // Adicionar mensagem de boas-vindas apenas no cliente
        setMessages([
            {
                id: '1',
                type: 'ai',
                content: 'Olá! Sou a IA superinteligente da Fenix Academy. Como posso ajudá-lo hoje?',
                timestamp: new Date()
            }
        ]);

        const checkApiStatus = async () => {
            try {
                // Primeiro verificar o status básico
                const statusResponse = await fetch('/api/ai/status');
                const statusData = await statusResponse.json();

                if (statusData.success && statusData.apiKeyValidFormat) {
                    // Se a API key está válida, testar conectividade
                    const connectivityResponse = await fetch('/api/ai/connectivity');
                    const connectivityData = await connectivityResponse.json();

                    if (connectivityData.success) {
                        setApiStatus('connected');
                        setErrorDetails('');
                    } else {
                        console.error('Erro de conectividade:', connectivityData.error);
                        setApiStatus('error');
                        setErrorDetails(connectivityData.error || 'Erro de conectividade com OpenAI');
                    }
                } else {
                    console.error('API key inválida:', statusData);
                    setApiStatus('error');
                    setErrorDetails('API key inválida ou não configurada');
                }
            } catch (error) {
                console.error('Erro ao verificar API:', error);
                setApiStatus('error');
                setErrorDetails(error instanceof Error ? error.message : 'Erro desconhecido');
            }
        }

        checkApiStatus();
    }, []);

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage as typeof prev[0]]);
        const currentMessage = inputMessage;
        setInputMessage('');
        setIsTyping(true);

        try {
            // Preparar mensagens para a API
            const apiMessages = [
                ...messages.map(msg => ({
                    role: msg.type === 'user' ? 'user' : 'assistant',
                    content: msg.content
                })),
                {
                    role: 'user' as const,
                    content: currentMessage
                }
            ];

            // Chamar API do OpenAI
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    type: 'chat',
                    messages: apiMessages
                })});

            if (!response.ok) {
                throw new Error('Erro ao processar mensagem');
            }

            const data = await response.json();

            if (data.success) {
                const aiMessage = {
                    id: (Date.now() + 1).toString(),
                    type: 'ai',
                    content: data.response,
                    timestamp: new Date()
                }

                setMessages(prev => [...prev, aiMessage as typeof prev[0]]);
            } else {
                throw new Error(data.error || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);

            const errorMessage = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: `Desculpe, ocorreu um erro ao processar sua mensagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}. Tente novamente em alguns instantes.`,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, errorMessage as typeof prev[0]]);
        } finally {
            setIsTyping(false);
        }
    }

    const copyToClipboard = async (text: string, messageId: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMessageId(messageId);
            setTimeout(() => setCopiedMessageId(null), 2000);
        } catch (error) {
            console.error('Erro ao copiar:', error);
        }
    }

    return (
        <PageWrapperFunctional>
            {/* Header */}
            <header className="theme-surface border-b theme-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link href="/" className="flex items-center">
                            <div className="w-8 h-8 theme-gradient-primary rounded-full flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-2xl font-bold">
                                <span className="theme-primary">FENIX</span> AI
                            </span>
                        </Link>
                        <nav className="hidden lg:flex space-x-8">
                            <Link href="/courses" className="theme-text hover:theme-primary transition-all duration-300">Cursos</Link>
                            <Link href="/ide-advanced" className="theme-text hover:theme-primary transition-all duration-300">IDE</Link>
                            <Link href="/ai" className="theme-primary font-semibold">IA</Link>
                            <Link href="/pricing" className="theme-text hover:theme-primary transition-all duration-300">Preços</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Link href="/auth/login" className="theme-text hover:theme-primary transition-all duration-300">Entrar</Link>
                            <Link href="/auth/register" className="theme-text hover:theme-primary transition-all duration-300">Registrar</Link>
                            <Link href="/comecar-agora" className="theme-gradient-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg">
                                Começar Agora
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-80 theme-surface border-r theme-border flex flex-col">
                    <div className="p-4 border-b theme-border">
                        <h3 className="text-lg font-semibold mb-4 theme-text">Capacidades da IA</h3>
                        <div className="space-y-3">
                            {[
                                { name: 'Revisão de Código', icon: <Code className="w-6 h-6" />, color: 'bg-blue-600' },
                                { name: 'Explicar Conceitos', icon: <BookOpen className="w-6 h-6" />, color: 'bg-green-600' },
                                { name: 'Debug de Código', icon: <Code className="w-6 h-6" />, color: 'bg-red-600' },
                                { name: 'Gerar Código', icon: <Code className="w-6 h-6" />, color: 'bg-purple-600' }
                            ].map((capability, index) => (
                                <div key={index} className="p-3 rounded-lg theme-surface hover:opacity-80 cursor-pointer transition-all duration-300 border theme-border">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 ${capability.color} rounded-lg flex items-center justify-center`}>
                                            {capability.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm theme-text">{capability.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 border-b theme-border">
                        <h3 className="text-sm font-semibold theme-text-secondary mb-3">Prompts Rápidos</h3>
                        <div className="space-y-2">
                            {[
                                { text: 'Explique este conceito de programação', type: 'concept' },
                                { text: 'Revise meu código JavaScript', type: 'analyze', language: 'javascript' },
                                { text: 'Ajude-me a debugar este código', type: 'debug', language: 'javascript' },
                                { text: 'Gere código para uma função específica', type: 'generate', language: 'javascript' }
                            ].map((prompt, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (prompt.type === 'concept') {
                                            setInputMessage(prompt.text);
                                        } else {
                                            setInputMessage(`${prompt.text} (${prompt.language}): `);
                                        }
                                    }}
                                    className="w-full text-left p-2 rounded hover:theme-surface text-sm theme-text-secondary hover:theme-text transition-all duration-300"
                                >
                                    {prompt.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 border-t theme-border mt-auto">
                        <button className="w-full flex items-center space-x-2 p-2 rounded hover:theme-surface text-sm theme-text transition-all duration-300">
                            <Settings className="w-4 h-4" />
                            <span>Configurações</span>
                        </button>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col">
                    <div className="theme-surface border-b theme-border p-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                <Brain className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="font-semibold theme-text">IA Superinteligente</h2>
                                <p className="text-sm theme-text-secondary">
                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${apiStatus === 'connected' ? 'bg-green-500' :
                                        apiStatus === 'error' ? 'bg-red-500' :
                                            'bg-yellow-500 animate-pulse'
                                        }`}></span>
                                    {apiStatus === 'connected' ? 'Conectado • Pronto para ajudar' :
                                        apiStatus === 'error' ? 'Erro de conexão • Verifique a API' :
                                            'Verificando conexão...'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {apiStatus === 'error' && (
                            <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 mb-4">
                                <div className="flex items-center">
                                    <div className="w-5 h-5 bg-red-500 rounded-full mr-3"></div>
                                    <div className="flex-1">
                                        <h3 className="text-red-400 font-semibold">Erro de Conexão</h3>
                                        <p className="text-red-300 text-sm mb-2">
                                            Não foi possível conectar com a API da OpenAI.
                                        </p>
                                        {errorDetails && (
                                            <p className="text-red-200 text-xs font-mono bg-red-900/30 p-2 rounded">
                                                {errorDetails}
                                            </p>
                                        )}
                                        <div className="mt-3 text-xs text-red-300">
                                            <p>Possíveis soluções:</p>
                                            <ul className="list-disc list-inside mt-1 space-y-1">
                                                <li>Verifique se a API key está correta</li>
                                                <li>Confirme se há créditos disponíveis na conta OpenAI</li>
                                                <li>Verifique sua conexão com a internet</li>
                                                <li>Tente novamente em alguns instantes</li>
                                            </ul>
                                            {errorDetails.includes('quota') && (
                                                <div className="mt-2 p-2 bg-yellow-900/30 border border-yellow-500/30 rounded">
                                                    <p className="text-yellow-300 font-semibold">⚠️ Cota Excedida</p>
                                                    <p className="text-yellow-200 text-xs">
                                                        A conta OpenAI excedeu a cota de uso. Acesse <a href="https://platform.openai.com/account/billing" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com/account/billing</a> para adicionar créditos.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => {
                                                setApiStatus('checking');
                                                setErrorDetails('');
                                                // Recarregar a página para tentar novamente
                                                window.location.reload();
                                            }}
                                            className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors"
                                        >
                                            Tentar Reconectar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isHydrated ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Brain className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="theme-text-secondary">Inicializando IA...</p>
                                </div>
                            </div>
                        ) : messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                                        }`}>
                                        {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                                        <div className={`inline-block p-4 rounded-lg ${message.type === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'theme-surface text-white border theme-border'
                                            }`}>
                                            <p>{message.content}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className="text-xs theme-text-secondary">
                                                {message.timestamp.toLocaleTimeString()}
                                            </span>
                                            {message.type === 'ai' && (
                                                <div className="flex space-x-1">
                                                    <button
                                                        onClick={() => copyToClipboard(message.content, message.id)}
                                                        className={`transition-all duration-300 ${copiedMessageId === message.id
                                                            ? 'text-green-500'
                                                            : 'theme-text-secondary hover:theme-text'
                                                            }`}
                                                        title={copiedMessageId === message.id ? "Copiado!" : "Copiar mensagem"}
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                    </button>
                                                    <button className="theme-text-secondary hover:theme-text transition-all duration-300">
                                                        <ThumbsUp className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex space-x-3 max-w-3xl">
                                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="theme-surface p-4 rounded-lg border theme-border">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 theme-text-secondary rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 theme-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 theme-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="theme-surface border-t theme-border p-4">
                        <div className="flex space-x-4">
                            <div className="flex-1 relative">
                                <textarea
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage();
                                        }
                                    }}
                                    placeholder={
                                        !isHydrated ? "Inicializando..." :
                                            apiStatus === 'error' ?
                                                "API não disponível. Verifique a configuração." :
                                                "Digite sua pergunta ou cole seu código aqui... (Enter para enviar, Shift+Enter para nova linha)"
                                    }
                                    disabled={apiStatus === 'error' || !isHydrated}
                                    className={`w-full theme-surface border theme-border rounded-lg px-4 py-3 pr-12 theme-text placeholder-theme-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-theme-primary ${apiStatus === 'error' || !isHydrated ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    rows={3}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!inputMessage.trim() || isTyping || apiStatus === 'error' || !isHydrated}
                                    className="absolute right-3 bottom-3 theme-gradient-primary hover:opacity-90 disabled:bg-gray-600 text-white p-2 rounded-lg transition-all duration-300"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                <button className="theme-gradient-primary text-white w-12 h-12 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                </button>
                <button className="bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                </button>
            </div>
        </PageWrapperFunctional>
    );
}