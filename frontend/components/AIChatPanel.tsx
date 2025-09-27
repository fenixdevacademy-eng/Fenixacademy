'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Copy, ThumbsUp, ThumbsDown, Loader2, Sparkles } from 'lucide-react';

interface AIChatPanelProps {
    onClose: () => void;
    className?: string;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isTyping?: boolean;
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({ onClose, className = '' }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Olá! Sou o assistente de IA da Fenix IDE. Como posso ajudá-lo com seu código hoje?',
            timestamp: new Date()
        }
    ]);

    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Focus input on mount
        inputRef.current?.focus();
    }, []);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputMessage.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateAIResponse(inputMessage.trim()),
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1000 + Math.random() * 2000);
    };

    const generateAIResponse = (userInput: string): string => {
        const responses = [
            "Entendo sua pergunta. Vou ajudá-lo com isso. Aqui está uma solução:",
            "Ótima pergunta! Deixe-me explicar como resolver isso:",
            "Posso ajudá-lo com isso. Aqui está o que você precisa saber:",
            "Interessante! Vou mostrar uma abordagem para resolver esse problema:",
            "Perfeito! Aqui está uma solução eficiente para o seu caso:"
        ];

        const codeExamples = [
            "```javascript\nconst solution = () => {\n  // Seu código aqui\n  return result;\n};\n```",
            "```python\ndef solution():\n    # Seu código aqui\n    return result\n```",
            "```typescript\ninterface Solution {\n  // Definições aqui\n}\n\nconst solution: Solution = {\n  // Implementação\n};\n```"
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const randomCode = codeExamples[Math.floor(Math.random() * codeExamples.length)];

        return `${randomResponse}\n\n${randomCode}\n\nPrecisa de mais alguma coisa?`;
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const copyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`ai-chat-panel bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col h-96 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
                        <p className="text-xs text-gray-600">Powered by Fenix AI</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.role === 'assistant' && (
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                        )}

                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                        >
                            <div className="whitespace-pre-wrap text-sm">
                                {message.content}
                            </div>
                            <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                {formatTime(message.timestamp)}
                            </div>
                        </div>

                        {message.role === 'user' && (
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-gray-600" />
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">Pensando...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua pergunta..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </button>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                    Pressione Enter para enviar, Shift+Enter para nova linha
                </div>
            </div>
        </div>
    );
};

export default AIChatPanel;