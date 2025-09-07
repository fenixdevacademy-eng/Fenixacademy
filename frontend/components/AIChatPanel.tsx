'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface AIChatPanelProps {
    onClose: () => void;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isTyping?: boolean;
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Olá! Sou o assistente de IA da Fenix IDE. Como posso ajudá-lo com seu código hoje?',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simular resposta da IA
        setTimeout(() => {
            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateAIResponse(inputMessage),
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const generateAIResponse = (userInput: string): string => {
        const input = userInput.toLowerCase();

        if (input.includes('erro') || input.includes('bug')) {
            return 'Vou ajudá-lo a debugar esse código. Pode compartilhar o erro específico que está enfrentando?';
        }

        if (input.includes('otimizar') || input.includes('performance')) {
            return 'Posso analisar seu código e sugerir otimizações. Que tipo de performance você gostaria de melhorar?';
        }

        if (input.includes('refatorar') || input.includes('refactor')) {
            return 'Vou ajudá-lo a refatorar o código. Qual parte específica você gostaria de melhorar?';
        }

        if (input.includes('explicar') || input.includes('como funciona')) {
            return 'Posso explicar como o código funciona. Qual parte você gostaria que eu explique?';
        }

        if (input.includes('teste') || input.includes('test')) {
            return 'Posso ajudá-lo a criar testes para seu código. Que tipo de testes você precisa?';
        }

        return 'Entendi sua pergunta. Posso ajudá-lo com análise de código, debugging, otimização, refatoração ou explicações. O que você gostaria de fazer?';
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="ai-chat-panel">
            <div className="ai-chat-header">
                <div className="ai-chat-title">
                    <Bot className="w-5 h-5" />
                    <span>Fenix AI Assistant</span>
                </div>
                <button
                    className="ai-chat-close"
                    onClick={onClose}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="ai-chat-messages">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`ai-message ${message.role}`}
                    >
                        <div className="ai-message-avatar">
                            {message.role === 'user' ? (
                                <User className="w-4 h-4" />
                            ) : (
                                <Bot className="w-4 h-4" />
                            )}
                        </div>
                        <div className="ai-message-content">
                            <div className="ai-message-text">
                                {message.content}
                            </div>
                            <div className="ai-message-meta">
                                <span className="ai-message-time">
                                    {formatTime(message.timestamp)}
                                </span>
                                {message.role === 'assistant' && (
                                    <div className="ai-message-actions">
                                        <button
                                            className="ai-message-action"
                                            onClick={() => copyToClipboard(message.content)}
                                            title="Copiar"
                                        >
                                            <Copy className="w-3 h-3" />
                                        </button>
                                        <button
                                            className="ai-message-action"
                                            title="Útil"
                                        >
                                            <ThumbsUp className="w-3 h-3" />
                                        </button>
                                        <button
                                            className="ai-message-action"
                                            title="Não útil"
                                        >
                                            <ThumbsDown className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="ai-message assistant">
                        <div className="ai-message-avatar">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="ai-message-content">
                            <div className="ai-typing-indicator">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="ai-chat-input">
                <div className="ai-input-container">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua pergunta sobre o código..."
                        className="ai-input-field"
                        disabled={isTyping}
                    />
                    <button
                        className="ai-send-button"
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>

                <div className="ai-suggestions">
                    <span className="ai-suggestion-label">Sugestões:</span>
                    <button
                        className="ai-suggestion"
                        onClick={() => setInputMessage('Explique este código')}
                    >
                        Explique este código
                    </button>
                    <button
                        className="ai-suggestion"
                        onClick={() => setInputMessage('Otimize este código')}
                    >
                        Otimize este código
                    </button>
                    <button
                        className="ai-suggestion"
                        onClick={() => setInputMessage('Refatore este código')}
                    >
                        Refatore este código
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatPanel;

