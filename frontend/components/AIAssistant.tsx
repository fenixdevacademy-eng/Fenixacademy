'use client';

import React, { useState } from 'react';
import { Bot, Send, Settings, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface AIMessage {
    id: string;
    type: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

const AIAssistant: React.FC = () => {
    const [messages, setMessages] = useState<AIMessage[]>([
        {
            id: '1',
            type: 'system',
            content: 'Olá! Sou seu assistente de IA. Como posso ajudar hoje?',
            timestamp: new Date()
        }
    ]);

    const [inputMessage, setInputMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isProcessing) return;

        const userMessage: AIMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date()
    }

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsProcessing(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: AIMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: `Entendi sua pergunta sobre "${inputMessage}". Aqui está minha análise e sugestões para melhorar seu código.`,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, aiResponse]);
            setIsProcessing(false);
        }, 1500);
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <div className="h-full bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Bot className="w-6 h-6 text-blue-500" />
                        <div>
                            <h3 className="text-lg font-semibold">Assistente de IA</h3>
                            <p className="text-xs text-gray-400">GPT-4 • Online</p>
                        </div>
                    </div>

                    <button className="p-2 hover:bg-gray-700 rounded">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                    <div
                        key={message.id}
    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-3xl px-4 py-3 rounded-lg ${message.type === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : message.type === 'system'
                                        ? 'bg-gray-700 text-gray-300'
                                        : 'bg-gray-800 text-white'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    {message.type === 'assistant' && <Bot className="w-4 h-4" />}
                                    <span className="text-xs text-gray-400">
                                        {message.timestamp.toLocaleTimeString()}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <button className="text-gray-400 hover:text-white">
                                        <Copy className="w-3 h-3" />
                                    </button>
                                    {message.type === 'assistant' && (
                                        <>
                                            <button className="text-gray-400 hover:text-green-400">
                                                <ThumbsUp className="w-3 h-3" />
                                            </button>
                                            <button className="text-gray-400 hover:text-red-400">
                                                <ThumbsDown className="w-3 h-3" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                                    </div>
                                ))}
                                
                {isProcessing && (
                    <div className="flex justify-start">
                        <div className="bg-gray-800 px-4 py-3 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                <span className="text-sm text-gray-400">Processando...</span>
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* Input Area */}
            <div className="bg-gray-800 border-t border-gray-700 p-4">
                <div className="flex items-end space-x-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Digite sua pergunta ou comando..."
                            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isProcessing}
                        />
                </div>

                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isProcessing}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        <Send className="w-4 h-4" />
                            </button>
                </div>
            </div>
        </div>
    );
}

export default AIAssistant;