'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Copy, Download, Trash2, Settings, Zap } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isTyping?: boolean;
}

interface RealAIAssistantProps {
    className?: string;
    onMessage?: (message: Message) => void;
    initialMessages?: Message[];
    maxMessages?: number;
}

export function RealAIAssistant({
    className = '',
    onMessage,
    initialMessages = [],
    maxMessages = 50
}: RealAIAssistantProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
        const newMessage: Message = {
            ...message,
            id: Date.now().toString(),
            timestamp: new Date()
        };

        setMessages(prev => {
            const updated = [...prev, newMessage];
            if (updated.length > maxMessages) {
                return updated.slice(-maxMessages);
            }
            return updated;
        });

        onMessage?.(newMessage);
        return newMessage;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);

        // Adicionar mensagem do usuário
        addMessage({
            role: 'user',
            content: userMessage
        });

        // Simular resposta da IA
        setTimeout(() => {
            setIsTyping(true);

            setTimeout(() => {
                const responses = [
                    `Entendi sua pergunta sobre "${userMessage}". Vou te ajudar com isso!`,
                    `Ótima pergunta! Deixe-me explicar sobre "${userMessage}" de forma clara.`,
                    `Interessante! Sobre "${userMessage}", posso te dar algumas dicas importantes.`,
                    `Perfeito! Vou te guiar através de "${userMessage}" passo a passo.`,
                    `Excelente! "${userMessage}" é um tópico muito importante. Vou te ajudar.`
                ];

                const randomResponse = responses[Math.floor(Math.random() * responses.length)];

                addMessage({
                    role: 'assistant',
                    content: randomResponse
                });

                setIsTyping(false);
                setIsLoading(false);
            }, 1000 + Math.random() * 2000);
        }, 500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const copyMessage = (content: string) => {
        navigator.clipboard.writeText(content);
    };

    const downloadChat = () => {
        const chatText = messages.map(msg =>
            `${msg.role === 'user' ? 'Usuário' : 'IA'}: ${msg.content}`
        ).join('\n\n');

        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-96 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <Bot className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Assistente IA
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-green-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Online
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={downloadChat}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        title="Baixar conversa"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    <button
                        onClick={clearChat}
                        className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        title="Limpar conversa"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Olá! Como posso te ajudar hoje?</p>
                        <p className="text-sm mt-2">Digite sua pergunta abaixo para começar.</p>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.role === 'assistant' && (
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                        )}

                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.role === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                }`}
                        >
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs opacity-70">
                                    {message.timestamp.toLocaleTimeString()}
                                </span>
                                {message.role === 'assistant' && (
                                    <button
                                        onClick={() => copyMessage(message.content)}
                                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                                        title="Copiar"
                                    >
                                        <Copy className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {message.role === 'user' && (
                            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua pergunta..."
                        disabled={isLoading}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}