'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Users,
    MessageCircle,
    Video,
    Mic,
    MicOff,
    VideoOff,
    Phone,
    PhoneOff,
    Settings,
    MoreVertical,
    Send,
    Smile,
    Paperclip,
    ScreenShare,
    ScreenShareOff,
    Hand,
    CheckCircle,
    Clock,
    AlertCircle
} from 'lucide-react';

interface CollaborationProps {
    className?: string;
    onUserJoin?: (user: User) => void;
    onUserLeave?: (userId: string) => void;
    onMessageSend?: (message: Message) => void;
    onScreenShare?: (isSharing: boolean) => void;
}

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isOnline: boolean;
    isMuted: boolean;
    isVideoOn: boolean;
    isScreenSharing: boolean;
    role: 'host' | 'participant' | 'viewer';
    joinedAt: string;
}

interface Message {
    id: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: string;
    type: 'text' | 'system' | 'file';
    isRead: boolean;
}

const mockUsers: User[] = [
    {
        id: '1',
        name: 'João Silva',
        email: 'joao@example.com',
        avatar: '/avatars/joao.jpg',
        isOnline: true,
        isMuted: false,
        isVideoOn: true,
        isScreenSharing: false,
        role: 'host',
        joinedAt: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        name: 'Maria Santos',
        email: 'maria@example.com',
        avatar: '/avatars/maria.jpg',
        isOnline: true,
        isMuted: true,
        isVideoOn: false,
        isScreenSharing: false,
        role: 'participant',
        joinedAt: '2024-01-15T10:05:00Z'
    },
    {
        id: '3',
        name: 'Pedro Costa',
        email: 'pedro@example.com',
        avatar: '/avatars/pedro.jpg',
        isOnline: false,
        isMuted: false,
        isVideoOn: false,
        isScreenSharing: false,
        role: 'participant',
        joinedAt: '2024-01-15T10:10:00Z'
    }
];

const mockMessages: Message[] = [
    {
        id: '1',
        userId: '1',
        userName: 'João Silva',
        content: 'Olá pessoal! Como estão?',
        timestamp: '2024-01-15T10:15:00Z',
        type: 'text',
        isRead: true
    },
    {
        id: '2',
        userId: '2',
        userName: 'Maria Santos',
        content: 'Oi João! Tudo bem, obrigada!',
        timestamp: '2024-01-15T10:16:00Z',
        type: 'text',
        isRead: true
    },
    {
        id: '3',
        userId: 'system',
        userName: 'Sistema',
        content: 'Pedro Costa entrou na reunião',
        timestamp: '2024-01-15T10:20:00Z',
        type: 'system',
        isRead: true
    }
];

export function RealTimeCollaboration({
    className = '',
    onUserJoin,
    onUserLeave,
    onMessageSend,
    onScreenShare
}: CollaborationProps) {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'participants' | 'files'>('chat');
    const [showSettings, setShowSettings] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const message: Message = {
            id: Date.now().toString(),
            userId: 'current-user',
            userName: 'Você',
            content: newMessage,
            timestamp: new Date().toISOString(),
            type: 'text',
            isRead: false
        };

        setMessages(prev => [...prev, message]);
        onMessageSend?.(message);
        setNewMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleVideo = () => {
        setIsVideoOn(!isVideoOn);
    };

    const toggleScreenShare = () => {
        const newScreenShare = !isScreenSharing;
        setIsScreenSharing(newScreenShare);
        onScreenShare?.(newScreenShare);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const message: Message = {
            id: Date.now().toString(),
            userId: 'current-user',
            userName: 'Você',
            content: `Arquivo: ${file.name}`,
            timestamp: new Date().toISOString(),
            type: 'file',
            isRead: false
        };

        setMessages(prev => [...prev, message]);
        onMessageSend?.(message);
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const onlineUsers = users.filter(user => user.isOnline);
    const unreadMessages = messages.filter(msg => !msg.isRead && msg.userId !== 'current-user').length;

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Colaboração em Tempo Real
                            </h3>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{onlineUsers.length} online</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleMute}
                            className={`p-2 rounded-lg transition-colors ${isMuted
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            title={isMuted ? 'Desmutar' : 'Mutar'}
                        >
                            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={toggleVideo}
                            className={`p-2 rounded-lg transition-colors ${!isVideoOn
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            title={isVideoOn ? 'Desligar câmera' : 'Ligar câmera'}
                        >
                            {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={toggleScreenShare}
                            className={`p-2 rounded-lg transition-colors ${isScreenSharing
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            title={isScreenSharing ? 'Parar compartilhamento' : 'Compartilhar tela'}
                        >
                            {isScreenSharing ? <ScreenShareOff className="w-4 h-4" /> : <ScreenShare className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title="Configurações"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex h-96">
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Video Grid */}
                    <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
                        <div className="grid grid-cols-2 gap-4 h-full">
                            {onlineUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="bg-gray-200 dark:bg-gray-800 rounded-lg relative overflow-hidden"
                                >
                                    {user.isVideoOn ? (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                            <span className="text-white text-2xl font-bold">
                                                {user.name.charAt(0)}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                                    <span className="text-white text-xl font-bold">
                                                        {user.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {user.name}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute bottom-2 left-2 right-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                                                {user.name}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                {user.isMuted && (
                                                    <MicOff className="w-3 h-3 text-red-400" />
                                                )}
                                                {!user.isVideoOn && (
                                                    <VideoOff className="w-3 h-3 text-red-400" />
                                                )}
                                                {user.isScreenSharing && (
                                                    <ScreenShare className="w-3 h-3 text-blue-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 dark:border-gray-700">
                        {[
                            { id: 'chat', label: 'Chat', icon: MessageCircle, count: unreadMessages },
                            { id: 'participants', label: 'Participantes', icon: Users },
                            { id: 'files', label: 'Arquivos', icon: Paperclip }
                        ].map(({ id, label, icon: Icon, count }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id as any)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors relative ${activeTab === id
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                                {count && count > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 p-4">
                        {activeTab === 'chat' && (
                            <div className="flex flex-col h-full">
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex gap-3 ${message.userId === 'current-user' ? 'justify-end' : 'justify-start'
                                                }`}
                                        >
                                            {message.userId !== 'current-user' && message.userId !== 'system' && (
                                                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                        {message.userName.charAt(0)}
                                                    </span>
                                                </div>
                                            )}

                                            <div
                                                className={`max-w-xs px-3 py-2 rounded-lg ${message.type === 'system'
                                                        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-center'
                                                        : message.userId === 'current-user'
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                    }`}
                                            >
                                                {message.type === 'system' ? (
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-3 h-3" />
                                                        <span className="text-xs">{message.content}</span>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <p className="text-sm">{message.content}</p>
                                                        <p className="text-xs opacity-70 mt-1">
                                                            {formatTime(message.timestamp)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {message.userId === 'current-user' && (
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-medium text-white">
                                                        Você
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Message Input */}
                                <div className="flex gap-2">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        accept="*/*"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                        title="Anexar arquivo"
                                    >
                                        <Paperclip className="w-4 h-4" />
                                    </button>
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Digite uma mensagem..."
                                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim()}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'participants' && (
                            <div className="space-y-3">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                                    >
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                    {user.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                                }`}></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                    {user.name}
                                                </h4>
                                                {user.role === 'host' && (
                                                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                                                        Host
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {user.isOnline ? 'Online' : 'Offline'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {user.isMuted && <MicOff className="w-4 h-4 text-red-500" />}
                                            {!user.isVideoOn && <VideoOff className="w-4 h-4 text-red-500" />}
                                            {user.isScreenSharing && <ScreenShare className="w-4 h-4 text-blue-500" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'files' && (
                            <div className="text-center py-8">
                                <Paperclip className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    Arquivos Compartilhados
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Nenhum arquivo compartilhado ainda
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}