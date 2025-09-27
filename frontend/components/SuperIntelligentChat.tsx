'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    MessageCircle,
    Send,
    Bot,
    User,
    Settings,
    MoreVertical,
    ThumbsUp,
    ThumbsDown,
    Copy,
    Share2,
    Download,
    Upload,
    RefreshCw,
    Trash2,
    Edit,
    Eye,
    EyeOff,
    Volume2,
    VolumeX,
    Mic,
    MicOff,
    Camera,
    CameraOff,
    FileText,
    Image,
    Video,
    Music,
    Code,
    Database,
    Cloud,
    Shield,
    Lock,
    Unlock,
    Power,
    PowerOff,
    Zap,
    Brain,
    Target,
    Monitor,
    Smartphone,
    Tablet,
    Globe,
    Server,
    Database as DatabaseIcon,
    Cloud as CloudIcon,
    Shield as ShieldIcon,
    Lock as LockIcon,
    Unlock as UnlockIcon,
    Power as PowerIcon,
    PowerOff as PowerOffIcon
} from 'lucide-react';

interface SuperIntelligentChatProps {
    className?: string;
    onMessage?: (message: ChatMessage) => void;
    onSettingsChange?: (settings: ChatSettings) => void;
    onExport?: (data: ChatData) => void;
}

interface ChatMessage {
    id: string;
    type: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
    metadata: {
        tokens: number;
        model: string;
        confidence: number;
        processingTime: number;
        sources: string[];
        citations: string[];
        tags: string[];
        sentiment: 'positive' | 'neutral' | 'negative';
        language: string;
        isEdited: boolean;
        editedAt?: string;
        isBookmarked: boolean;
        isShared: boolean;
        likes: number;
        dislikes: number;
        replies: number;
    };
}

interface ChatSettings {
    enabled: boolean;
    maxMessages: number;
    enableVoice: boolean;
    enableVideo: boolean;
    enableFileUpload: boolean;
    enableCodeExecution: boolean;
    enableWebSearch: boolean;
    enableMemory: boolean;
    enablePersonality: boolean;
    enableEmotions: boolean;
    enableNotifications: boolean;
    enableSound: boolean;
    enableDesktopNotifications: boolean;
    enableLogging: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3' | 'gemini-pro' | 'custom';
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
    systemPrompt: string;
    personality: {
        name: string;
        description: string;
        traits: string[];
        communicationStyle: string;
        expertise: string[];
        limitations: string[];
    };
}

interface ChatData {
    messages: ChatMessage[];
    settings: ChatSettings;
    analytics: {
        totalMessages: number;
        averageResponseTime: number;
        userSatisfaction: number;
        mostUsedFeatures: string[];
        conversationLength: number;
        tokensUsed: number;
        cost: number;
    };
}

const defaultSettings: ChatSettings = {
    enabled: true,
    maxMessages: 100,
    enableVoice: true,
    enableVideo: false,
    enableFileUpload: true,
    enableCodeExecution: true,
    enableWebSearch: true,
    enableMemory: true,
    enablePersonality: true,
    enableEmotions: true,
    enableNotifications: true,
    enableSound: true,
    enableDesktopNotifications: false,
    enableLogging: true,
    logLevel: 'info',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    topP: 0.9,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    systemPrompt: 'You are a helpful AI assistant.',
    personality: {
        name: 'Fenix AI',
        description: 'An intelligent AI assistant specialized in programming and technology.',
        traits: ['helpful', 'knowledgeable', 'patient', 'creative'],
        communicationStyle: 'professional yet friendly',
        expertise: ['programming', 'technology', 'problem-solving', 'learning'],
        limitations: ['real-time data', 'personal information', 'medical advice']
    }
};

const mockMessages: ChatMessage[] = [
    {
        id: '1',
        type: 'assistant',
        content: 'Hello! I\'m Fenix AI, your intelligent programming assistant. How can I help you today?',
        timestamp: '2024-01-20T15:30:00Z',
        metadata: {
            tokens: 25,
            model: 'gpt-4',
            confidence: 0.95,
            processingTime: 1200,
            sources: [],
            citations: [],
            tags: ['greeting', 'introduction'],
            sentiment: 'positive',
            language: 'en',
            isEdited: false,
            isBookmarked: false,
            isShared: false,
            likes: 0,
            dislikes: 0,
            replies: 0
        }
    }
];

export function SuperIntelligentChat({
    className = '',
    onMessage,
    onSettingsChange,
    onExport
}: SuperIntelligentChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
    const [settings, setSettings] = useState<ChatSettings>(defaultSettings);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date().toISOString(),
            metadata: {
                tokens: inputMessage.length / 4, // Rough estimate
                model: settings.model,
                confidence: 1.0,
                processingTime: 0,
                sources: [],
                citations: [],
                tags: [],
                sentiment: 'neutral',
                language: 'en',
                isEdited: false,
                isBookmarked: false,
                isShared: false,
                likes: 0,
                dislikes: 0,
                replies: 0
            }
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: `I understand you're asking about: "${inputMessage}". Let me help you with that!`,
                timestamp: new Date().toISOString(),
                metadata: {
                    tokens: 50,
                    model: settings.model,
                    confidence: 0.88,
                    processingTime: 2000,
                    sources: ['knowledge-base', 'web-search'],
                    citations: ['source1', 'source2'],
                    tags: ['response', 'helpful'],
                    sentiment: 'positive',
                    language: 'en',
                    isEdited: false,
                    isBookmarked: false,
                    isShared: false,
                    likes: 0,
                    dislikes: 0,
                    replies: 0
                }
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
            onMessage?.(aiMessage);
        }, 2000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSettingsChange = (newSettings: Partial<ChatSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        onSettingsChange?.(updatedSettings);
    };

    const handleExport = () => {
        const data: ChatData = {
            messages,
            settings,
            analytics: {
                totalMessages: messages.length,
                averageResponseTime: 1500,
                userSatisfaction: 0.85,
                mostUsedFeatures: ['text', 'code', 'search'],
                conversationLength: messages.length,
                tokensUsed: messages.reduce((sum, msg) => sum + msg.metadata.tokens, 0),
                cost: 0.05
            }
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        onExport?.(data);
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderMessage = (message: ChatMessage) => {
        const isUser = message.type === 'user';
        const isAssistant = message.type === 'assistant';

        return (
            <div
                key={message.id}
                className={`flex gap-3 p-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
                {!isUser && (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                )}

                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>{formatTime(message.timestamp)}</span>
                        {isAssistant && (
                            <div className="flex items-center gap-1">
                                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                                    <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                                    <ThumbsDown className="w-3 h-3" />
                                </button>
                                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                                    <Copy className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {isUser && (
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Brain className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Super Intelligent Chat
                        </h3>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Configurações"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleExport}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Exportar"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex h-96">
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map(renderMessage)}
                        {isTyping && (
                            <div className="flex gap-3 p-4">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                                    <div className="flex items-center gap-1">
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
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Digite sua mensagem..."
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                onClick={() => setIsRecording(!isRecording)}
                                className={`p-2 rounded-lg transition-colors ${isRecording
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400'
                                    }`}
                                title="Gravar áudio"
                            >
                                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim()}
                                className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                                title="Enviar mensagem"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Configurações
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enabled}
                                        onChange={(e) => handleSettingsChange({ enabled: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Habilitar Chat
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableVoice}
                                        onChange={(e) => handleSettingsChange({ enableVoice: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Voz
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableFileUpload}
                                        onChange={(e) => handleSettingsChange({ enableFileUpload: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Upload de Arquivos
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableCodeExecution}
                                        onChange={(e) => handleSettingsChange({ enableCodeExecution: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Execução de Código
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableWebSearch}
                                        onChange={(e) => handleSettingsChange({ enableWebSearch: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Busca na Web
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Modelo: {settings.model}
                                </label>
                                <select
                                    value={settings.model}
                                    onChange={(e) => handleSettingsChange({ model: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="gpt-4">GPT-4</option>
                                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                    <option value="claude-3">Claude 3</option>
                                    <option value="gemini-pro">Gemini Pro</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Temperatura: {settings.temperature}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.1"
                                    value={settings.temperature}
                                    onChange={(e) => handleSettingsChange({ temperature: parseFloat(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Máximo de Tokens: {settings.maxTokens}
                                </label>
                                <input
                                    type="range"
                                    min="100"
                                    max="4000"
                                    step="100"
                                    value={settings.maxTokens}
                                    onChange={(e) => handleSettingsChange({ maxTokens: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

