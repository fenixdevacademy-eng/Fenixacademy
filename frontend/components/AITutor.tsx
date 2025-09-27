"use client";

import React, { useState, useEffect } from 'react';
import { Bot, MessageCircle, Send, X, Brain, Lightbulb, Target, TrendingUp } from 'lucide-react';
import ClientOnly from './ClientOnly';

interface AITutorProps {
    courseId?: string;
    lessonId?: string;
    userId?: string;
}

interface TutorMessage {
    id: string;
    type: 'tutor' | 'user';
    content: string;
    timestamp: Date;
    suggestions?: string[];
    difficulty?: 'easy' | 'medium' | 'hard';
}

export default function AITutor({ courseId, lessonId, userId }: AITutorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<TutorMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [tutorPersonality, setTutorPersonality] = useState<'encouraging' | 'technical' | 'casual'>('encouraging');

    // Personalidades do tutor
    const personalities = {
        encouraging: {
            name: "Mentor Fênix",
            avatar: "🌟",
            style: "Sempre encorajador e motivacional"
        },
        technical: {
            name: "Professor IA",
            avatar: "🤖",
            style: "Foco técnico e detalhado"
        },
        casual: {
            name: "Colega Dev",
            avatar: "👨‍💻",
            style: "Conversa descontraída e amigável"
        }
    }

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Mensagem de boas-vindas personalizada
            const welcomeMessage: TutorMessage = {
                id: '1',
                type: 'tutor',
                content: `Olá! Sou o ${personalities[tutorPersonality].name}, seu tutor de IA personalizado. Estou aqui para te ajudar a dominar programação de forma inteligente e adaptada ao seu ritmo. Como posso te ajudar hoje?`,
                timestamp: new Date(),
                suggestions: [
                    "Explique este conceito de forma simples",
                    "Me dê um exercício prático",
                    "Como posso melhorar meu código?",
                    "Me ajude com este erro"
                ]
            }
            setMessages([welcomeMessage]);
        }
    }, [isOpen, tutorPersonality]);

    const sendMessage = async (message: string) => {
        if (!message.trim()) return;

        const userMessage: TutorMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: message,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        try {
            // Simular resposta do tutor IA
            const response = await fetch('/api/ai/tutor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    courseId,
                    lessonId,
                    userId,
                    personality: tutorPersonality,
                    context: messages.slice(-5) // Últimas 5 mensagens para contexto
                })
            });

            const data = await response.json();

            const tutorResponse: TutorMessage = {
                id: (Date.now() + 1).toString(),
                type: 'tutor',
                content: data.response,
                timestamp: new Date(),
                suggestions: data.suggestions,
                difficulty: data.difficulty
            }

            setTimeout(() => {
                setMessages(prev => [...prev, tutorResponse]);
                setIsTyping(false);
            }, 1000 + Math.random() * 2000); // Simular tempo de digitação

        } catch (error) {
            const errorResponse: TutorMessage = {
                id: (Date.now() + 1).toString(),
                type: 'tutor',
                content: "Desculpe, estou com dificuldades técnicas no momento. Tente novamente em alguns segundos!",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorResponse]);
            setIsTyping(false);
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        setInputMessage(suggestion);
    }

    return (
        <ClientOnly>
            {/* Botão flutuante */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 group"
                >
                    <Bot className="w-6 h-6" />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        IA
                    </div>
                </button>
            )}

            {/* Modal do Tutor */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">{personalities[tutorPersonality].avatar}</div>
                                <div>
                                    <h3 className="font-bold text-lg">{personalities[tutorPersonality].name}</h3>
                                    <p className="text-sm opacity-90">{personalities[tutorPersonality].style}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <select
                                    value={tutorPersonality}
                                    onChange={(e) => setTutorPersonality(e.target.value as any)}
                                    className="bg-white/20 text-white text-sm rounded-lg px-2 py-1 border-0"
                                >
                                    <option value="encouraging">🌟 Encorajador</option>
                                    <option value="technical">🤖 Técnico</option>
                                    <option value="casual">👨‍💻 Casual</option>
                                </select>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${message.type === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        {message.suggestions && (
                                            <div className="mt-2 space-y-1">
                                                {message.suggestions.map((suggestion, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-xs opacity-70 mt-1">
                                            {message.timestamp.toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 p-3 rounded-2xl">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                                    placeholder="Digite sua pergunta..."
                                    className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                    onClick={() => sendMessage(inputMessage)}
                                    disabled={!inputMessage.trim() || isTyping}
                                    className="bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ClientOnly>
    );
}
