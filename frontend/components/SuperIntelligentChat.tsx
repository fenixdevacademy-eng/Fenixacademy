'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Code, Lightbulb, Target, BookOpen, Zap, Brain, Star, Clock, CheckCircle, AlertCircle, TrendingUp, Users, Award, Rocket } from 'lucide-react';
import { enhancedAIService, AIResponse, LearningPath, PersonalizedRecommendation, CodeAnalysis } from '@/lib/ai/enhanced-ai-service';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    type: 'text' | 'code' | 'explanation' | 'solution' | 'debug' | 'optimization';
    confidence?: number;
    suggestions?: string[];
    nextSteps?: string[];
    relatedTopics?: string[];
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime?: string;
    prerequisites?: string[];
    timestamp: Date;
}

interface SuperIntelligentChatProps {
    className?: string;
    onLearningPathGenerated?: (paths: LearningPath[]) => void;
    onRecommendationsGenerated?: (recommendations: PersonalizedRecommendation[]) => void;
    onCodeAnalyzed?: (analysis: CodeAnalysis) => void;
}

export function SuperIntelligentChat({
    className = '',
    onLearningPathGenerated,
    onRecommendationsGenerated,
    onCodeAnalyzed
}: SuperIntelligentChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [userProfile, setUserProfile] = useState({
        skillLevel: 'beginner',
        interests: [] as string[],
        goals: [] as string[],
        learningStyle: 'visual',
        timeAvailable: '1-2 hours',
        preferredLanguages: ['pt']
    });
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [quickActions, setQuickActions] = useState([
        { id: 'explain', label: 'Explicar conceito', icon: BookOpen, prompt: 'Explique o conceito de ' },
        { id: 'code', label: 'Analisar código', icon: Code, prompt: 'Analise este código: ' },
        { id: 'debug', label: 'Debugar problema', icon: AlertCircle, prompt: 'Ajude-me a debugar: ' },
        { id: 'optimize', label: 'Otimizar código', icon: TrendingUp, prompt: 'Como otimizar: ' },
        { id: 'learn', label: 'Roteiro de aprendizado', icon: Target, prompt: 'Crie um roteiro para aprender ' },
        { id: 'project', label: 'Ideia de projeto', icon: Rocket, prompt: 'Sugira um projeto sobre ' }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        initializeAI();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const initializeAI = async () => {
        try {
            const success = await enhancedAIService.initialize();
            setIsInitialized(success);

            if (success) {
                addMessage({
                    role: 'assistant',
                    content: '🤖 Olá! Sou a IA superinteligente da Fenix Academy! Estou aqui para te ajudar com programação, ciência de dados, e muito mais. Como posso te ajudar hoje?',
                    type: 'text',
                    confidence: 1
                });
            }
        } catch (error) {
            console.error('Failed to initialize AI:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
        const newMessage: Message = {
            ...message,
            id: Date.now().toString(),
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading || !isInitialized) return;

        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);

        // Add user message
        addMessage({
            role: 'user',
            content: userMessage,
            type: 'text'
        });

        try {
            // Get AI response
            const response = await enhancedAIService.generateResponse(userMessage, {
                userProfile,
                conversationHistory: messages
            });

            // Add AI response
            addMessage({
                role: 'assistant',
                content: response.content,
                type: response.type,
                confidence: response.confidence,
                suggestions: response.suggestions,
                nextSteps: response.nextSteps,
                relatedTopics: response.relatedTopics,
                difficulty: response.difficulty,
                estimatedTime: response.estimatedTime,
                prerequisites: response.prerequisites
            });

            // Handle special responses
            if (response.type === 'code' && userMessage.toLowerCase().includes('analisar')) {
                try {
                    const codeAnalysis = await enhancedAIService.analyzeCode(
                        extractCodeFromMessage(userMessage),
                        'javascript'
                    );
                    onCodeAnalyzed?.(codeAnalysis);
                } catch (error) {
                    console.error('Code analysis failed:', error);
                }
            }

            if (userMessage.toLowerCase().includes('roteiro') || userMessage.toLowerCase().includes('aprender')) {
                try {
                    const learningPaths = await enhancedAIService.generatePersonalizedLearningPath(
                        userProfile.goals,
                        userProfile.interests
                    );
                    onLearningPathGenerated?.(learningPaths);
                } catch (error) {
                    console.error('Learning path generation failed:', error);
                }
            }

            if (userMessage.toLowerCase().includes('recomendação') || userMessage.toLowerCase().includes('sugestão')) {
                try {
                    const recommendations = await enhancedAIService.getPersonalizedRecommendations({
                        completedCourses: [],
                        currentSkills: userProfile.interests,
                        timeSpent: 0
                    });
                    onRecommendationsGenerated?.(recommendations);
                } catch (error) {
                    console.error('Recommendations generation failed:', error);
                }
            }

        } catch (error) {
            console.error('Error generating response:', error);
            addMessage({
                role: 'assistant',
                content: 'Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente.',
                type: 'text',
                confidence: 0
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickAction = (action: typeof quickActions[0]) => {
        setInput(action.prompt);
        setShowSuggestions(false);
    };

    const extractCodeFromMessage = (message: string): string => {
        const codeMatch = message.match(/```[\s\S]*?```/);
        return codeMatch ? codeMatch[0].replace(/```/g, '') : message;
    };

    const getMessageIcon = (type: string) => {
        switch (type) {
            case 'code': return <Code className="w-4 h-4" />;
            case 'explanation': return <BookOpen className="w-4 h-4" />;
            case 'solution': return <CheckCircle className="w-4 h-4" />;
            case 'debug': return <AlertCircle className="w-4 h-4" />;
            case 'optimization': return <TrendingUp className="w-4 h-4" />;
            default: return <Bot className="w-4 h-4" />;
        }
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.8) return 'text-green-500';
        if (confidence >= 0.6) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className={`flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 text-white rounded-full">
                        <Brain className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">IA Superinteligente</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {isInitialized ? 'Online' : 'Inicializando...'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="text-xs text-gray-500">
                        {isInitialized ? 'Conectado' : 'Conectando...'}
                    </span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.role === 'assistant' && (
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                {getMessageIcon(message.type)}
                            </div>
                        )}

                        <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                            <div
                                className={`p-3 rounded-lg ${message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                    }`}
                            >
                                <div className="whitespace-pre-wrap">{message.content}</div>

                                {/* Message metadata */}
                                {message.role === 'assistant' && (
                                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                        {message.confidence && (
                                            <span className={`flex items-center gap-1 ${getConfidenceColor(message.confidence)}`}>
                                                <Star className="w-3 h-3" />
                                                {Math.round(message.confidence * 100)}%
                                            </span>
                                        )}
                                        {message.difficulty && (
                                            <span className={`px-2 py-1 rounded ${getDifficultyColor(message.difficulty)}`}>
                                                {message.difficulty}
                                            </span>
                                        )}
                                        {message.estimatedTime && (
                                            <span className="flex items-center gap-1 text-gray-500">
                                                <Clock className="w-3 h-3" />
                                                {message.estimatedTime}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Suggestions */}
                            {message.suggestions && message.suggestions.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Sugestões:</p>
                                    {message.suggestions.map((suggestion, index) => (
                                        <div key={index} className="text-xs text-blue-600 dark:text-blue-400">
                                            • {suggestion}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Next Steps */}
                            {message.nextSteps && message.nextSteps.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Próximos passos:</p>
                                    {message.nextSteps.map((step, index) => (
                                        <div key={index} className="text-xs text-green-600 dark:text-green-400">
                                            {index + 1}. {step}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Related Topics */}
                            {message.relatedTopics && message.relatedTopics.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tópicos relacionados:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {message.relatedTopics.map((topic, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Prerequisites */}
                            {message.prerequisites && message.prerequisites.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Pré-requisitos:</p>
                                    {message.prerequisites.map((prereq, index) => (
                                        <div key={index} className="text-xs text-orange-600 dark:text-orange-400">
                                            • {prereq}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {message.role === 'user' && (
                            <div className="flex-shrink-0 w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center order-2">
                                <User className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {showSuggestions && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Ações rápidas:</p>
                    <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action) => (
                            <button
                                key={action.id}
                                onClick={() => handleQuickAction(action)}
                                className="flex items-center gap-2 p-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <action.icon className="w-4 h-4" />
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        <Zap className="w-5 h-5" />
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Digite sua pergunta ou comando..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        disabled={isLoading || !isInitialized}
                    />

                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading || !isInitialized}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SuperIntelligentChat;


