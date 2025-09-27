'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Copy, ThumbsUp, ThumbsDown, Settings, Minimize2, Download, Mic, MicOff, Code, Bookmark, Star } from 'lucide-react';

interface FenixAIChatProps {
    className?: string;
    onMessageSend?: (message: string) => void;
    onMessageReceive?: (message: ChatMessage) => void;
    onSettingsChange?: (settings: ChatSettings) => void;
    onExport?: (messages: ChatMessage[]) => void;
}

interface ChatMessage {
    id: string;
    content: string;
    type: 'user' | 'assistant' | 'system';
    timestamp: string;
    isTyping?: boolean;
    attachments?: Attachment[];
    isBookmarked?: boolean;
    isStarred?: boolean;
    metadata?: {
        model?: string;
        tokens?: number;
        processingTime?: number;
    };
}

interface Attachment {
    id: string;
    type: 'image' | 'file' | 'code' | 'link';
    name: string;
    url: string;
    size?: number;
    content?: string;
}

interface ChatSettings {
    model: string;
    temperature: number;
    maxTokens: number;
    enableVoice: boolean;
    enableImages: boolean;
    enableCode: boolean;
    autoSave: boolean;
    darkMode: boolean;
    fontSize: number;
    showTimestamps: boolean;
    showTyping: boolean;
}

const defaultSettings: ChatSettings = {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    enableVoice: true,
    enableImages: true,
    enableCode: true,
    autoSave: true,
    darkMode: false,
    fontSize: 14,
    showTimestamps: true,
    showTyping: true
};

const mockMessages: ChatMessage[] = [
    {
        id: '1',
        content: 'Olá! Sou o Fenix AI, seu assistente inteligente. Como posso ajudá-lo hoje?',
        type: 'assistant',
        timestamp: '2024-01-20T10:00:00Z',
        metadata: {
            model: 'gpt-4',
            tokens: 25,
            processingTime: 1.2
        }
    },
    {
        id: '2',
        content: 'Preciso de ajuda para criar um componente React com TypeScript',
        type: 'user',
        timestamp: '2024-01-20T10:01:00Z'
    },
    {
        id: '3',
        content: 'Claro! Vou ajudá-lo a criar um componente React com TypeScript. Aqui está um exemplo básico:\n\n```tsx\ninterface ButtonProps {\n  children: React.ReactNode;\n  onClick?: () => void;\n  variant?: \'primary\' | \'secondary\';\n  disabled?: boolean;\n}\n\nexport function Button({ \n  children, \n  onClick, \n  variant = \'primary\', \n  disabled = false \n}: ButtonProps) {\n  return (\n    <button\n      className={`px-4 py-2 rounded ${\n        variant === \'primary\' \n          ? \'bg-blue-500 text-white\' \n          : \'bg-gray-200 text-gray-800\'\n      } ${disabled ? \'opacity-50 cursor-not-allowed\' : \'hover:opacity-80\'}`}\n      onClick={onClick}\n      disabled={disabled}\n    >\n      {children}\n    </button>\n  );\n}\n```\n\nEste componente inclui:\n- Interface TypeScript para props tipadas\n- Props opcionais com valores padrão\n- Estilização condicional\n- Acessibilidade básica\n\nPrecisa de mais alguma funcionalidade específica?',
        type: 'assistant',
        timestamp: '2024-01-20T10:01:30Z',
        attachments: [
            {
                id: '1',
                type: 'code',
                name: 'Button.tsx',
                content: 'interface ButtonProps {\n  children: React.ReactNode;\n  onClick?: () => void;\n  variant?: \'primary\' | \'secondary\';\n  disabled?: boolean;\n}\n\nexport function Button({ \n  children, \n  onClick, \n  variant = \'primary\', \n  disabled = false \n}: ButtonProps) {\n  return (\n    <button\n      className={`px-4 py-2 rounded ${\n        variant === \'primary\' \n          ? \'bg-blue-500 text-white\' \n          : \'bg-gray-200 text-gray-800\'\n      } ${disabled ? \'opacity-50 cursor-not-allowed\' : \'hover:opacity-80\'}`}\n      onClick={onClick}\n      disabled={disabled}\n    >\n      {children}\n    </button>\n  );\n}'
            }
        ],
        metadata: {
            model: 'gpt-4',
            tokens: 450,
            processingTime: 2.8
        }
    }
];

const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Mais avançado e preciso' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Rápido e eficiente' },
    { id: 'claude-3', name: 'Claude 3', description: 'Análise profunda' },
    { id: 'gemini-pro', name: 'Gemini Pro', description: 'Multimodal' }
];

export function FenixAIChat({
    className = '',
    onMessageSend,
    onMessageReceive,
    onSettingsChange,
    onExport
}: FenixAIChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState<ChatSettings>(defaultSettings);
    const [isRecording, setIsRecording] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            content: inputMessage,
            type: 'user',
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        onMessageSend?.(inputMessage);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                content: 'Esta é uma resposta simulada do Fenix AI. Em uma implementação real, aqui seria feita uma chamada para a API do modelo de IA selecionado.',
                type: 'assistant',
                timestamp: new Date().toISOString(),
                metadata: {
                    model: settings.model,
                    tokens: 150,
                    processingTime: 1.5
                }
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
            onMessageReceive?.(aiMessage);
        }, 2000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleCopyMessage = (messageId: string) => {
        const message = messages.find(m => m.id === messageId);
        if (message) {
            navigator.clipboard.writeText(message.content);
        }
    };

    const handleBookmarkToggle = (messageId: string) => {
        setMessages(prev => prev.map(message =>
            message.id === messageId
                ? { ...message, isBookmarked: !message.isBookmarked }
                : message
        ));
    };

    const handleStarToggle = (messageId: string) => {
        setMessages(prev => prev.map(message =>
            message.id === messageId
                ? { ...message, isStarred: !message.isStarred }
                : message
        ));
    };

    const handleSettingsChange = (newSettings: Partial<ChatSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        onSettingsChange?.(updatedSettings);
    };

    const handleExport = () => {
        const data = {
            messages,
            settings,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fenix-ai-chat-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        onExport?.(messages);
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
                className={`flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${isUser ? 'flex-row-reverse' : ''
                    }`}
            >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser
                        ? 'bg-blue-500 text-white'
                        : isAssistant
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-500 text-white'
                    }`}>
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Content */}
                <div className={`flex-1 min-w-0 ${isUser ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">
                            {isUser ? 'Você' : isAssistant ? 'Fenix AI' : 'Sistema'}
                        </span>
                        {settings.showTimestamps && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(message.timestamp)}
                            </span>
                        )}
                    </div>

                    <div className={`inline-block max-w-3xl ${isUser
                            ? 'bg-blue-500 text-white rounded-lg px-4 py-2'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2'
                        }`}>
                        <div className="whitespace-pre-wrap break-words">
                            {message.content}
                        </div>

                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {message.attachments.map((attachment) => (
                                    <div key={attachment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                                        {attachment.type === 'code' && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Code className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {attachment.name}
                                                    </span>
                                                </div>
                                                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                                                    <code>{attachment.content}</code>
                                                </pre>
                                            </div>
                                        )}
                                        {attachment.type === 'image' && (
                                            <div>
                                                <img
                                                    src={attachment.url}
                                                    alt={attachment.name}
                                                    className="max-w-full h-auto rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Metadata */}
                        {message.metadata && (
                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                {message.metadata.model && (
                                    <span>Modelo: {message.metadata.model}</span>
                                )}
                                {message.metadata.tokens && (
                                    <span className="ml-2">Tokens: {message.metadata.tokens}</span>
                                )}
                                {message.metadata.processingTime && (
                                    <span className="ml-2">Tempo: {message.metadata.processingTime}s</span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Message Actions */}
                    <div className={`flex items-center gap-1 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <button
                            onClick={() => handleCopyMessage(message.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Copiar"
                        >
                            <Copy className="w-3 h-3" />
                        </button>
                        <button
                            onClick={() => handleBookmarkToggle(message.id)}
                            className={`p-1 transition-colors ${message.isBookmarked
                                    ? 'text-yellow-500'
                                    : 'text-gray-400 hover:text-yellow-500'
                                }`}
                            title="Favoritar"
                        >
                            <Bookmark className={`w-3 h-3 ${message.isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                        <button
                            onClick={() => handleStarToggle(message.id)}
                            className={`p-1 transition-colors ${message.isStarred
                                    ? 'text-yellow-500'
                                    : 'text-gray-400 hover:text-yellow-500'
                                }`}
                            title="Destacar"
                        >
                            <Star className={`w-3 h-3 ${message.isStarred ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (isMinimized) {
        return (
            <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
                <button
                    onClick={() => setIsMinimized(false)}
                    className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
                >
                    <Bot className="w-6 h-6" />
                </button>
            </div>
        );
    }

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Fenix AI Chat
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {settings.model} • {messages.length} mensagens
                            </p>
                        </div>
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
                        <button
                            onClick={() => setIsMinimized(true)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Minimizar"
                        >
                            <Minimize2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex h-96">
                {/* Chat Messages */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        {messages.map(renderMessage)}
                        {isTyping && (
                            <div className="flex gap-3 p-4">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
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

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-end gap-2">
                            <div className="flex-1">
                                <textarea
                                    ref={inputRef}
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Digite sua mensagem..."
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    rows={3}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsRecording(!isRecording)}
                                    className={`p-2 rounded-lg transition-colors ${isRecording
                                            ? 'bg-red-500 text-white'
                                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                                        }`}
                                    title="Gravar áudio"
                                >
                                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim()}
                                    className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                                    title="Enviar mensagem"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Modelo
                                </label>
                                <select
                                    value={settings.model}
                                    onChange={(e) => handleSettingsChange({ model: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {models.map((model) => (
                                        <option key={model.id} value={model.id}>
                                            {model.name} - {model.description}
                                        </option>
                                    ))}
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

                            <div className="space-y-2">
                                {Object.entries(settings).filter(([key]) =>
                                    typeof settings[key as keyof ChatSettings] === 'boolean'
                                ).map(([key, value]) => (
                                    <label key={key} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={value as boolean}
                                            onChange={(e) => handleSettingsChange({ [key]: e.target.checked })}
                                            className="rounded"
                                        />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


