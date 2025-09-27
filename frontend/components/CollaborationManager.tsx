'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Users,
    UserPlus,
    MessageCircle,
    Video,
    Mic,
    MicOff,
    VideoOff,
    Share2,
    Copy,
    Settings,
    Crown,
    Shield,
    Eye,
    Edit,
    Trash2,
    Send,
    Smile,
    Paperclip,
    Phone,
    PhoneOff,
    Volume2,
    VolumeX
} from 'lucide-react';

interface Collaborator {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status: 'online' | 'away' | 'busy' | 'offline';
    role: 'owner' | 'admin' | 'editor' | 'viewer';
    cursor: {
        line: number;
        column: number;
        file: string;
    }
    lastSeen: Date;
    isTyping: boolean;
    isSpeaking: boolean;
    permissions: {
        canEdit: boolean;
        canComment: boolean;
        canInvite: boolean;
        canDelete: boolean;
    }
}

interface ChatMessage {
    id: string;
    sender: Collaborator;
    content: string;
    timestamp: Date;
    type: 'text' | 'file' | 'code' | 'system';
    replyTo?: string;
    reactions: { emoji: string; users: string[] }[];
    isEdited: boolean;
}

interface VoiceCall {
    id: string;
    participants: string[];
    isActive: boolean;
    isMuted: boolean;
    isVideoEnabled: boolean;
    startTime: Date;
}

interface ScreenShare {
    id: string;
    sharer: string;
    isActive: boolean;
    startTime: Date;
}

const CollaborationManager: React.FC = () => {
    const [collaborators, setCollaborators] = useState<Collaborator[]>([
        {
            id: '1',
            name: 'João Silva',
            email: 'joao@example.com',
            status: 'online',
            role: 'owner',
            cursor: { line: 10, column: 5, file: 'script.js' },
            lastSeen: new Date(),
            isTyping: false,
            isSpeaking: false,
            permissions: { canEdit: true, canComment: true, canInvite: true, canDelete: true }
        },
        {
            id: '2',
            name: 'Maria Santos',
            email: 'maria@example.com',
            status: 'online',
            role: 'editor',
            cursor: { line: 25, column: 12, file: 'style.css' },
            lastSeen: new Date(),
            isTyping: true,
            isSpeaking: false,
            permissions: { canEdit: true, canComment: true, canInvite: false, canDelete: false }
        },
        {
            id: '3',
            name: 'Pedro Costa',
            email: 'pedro@example.com',
            status: 'away',
            role: 'viewer',
            cursor: { line: 0, column: 0, file: '' },
            lastSeen: new Date(Date.now() - 300000),
            isTyping: false,
            isSpeaking: false,
            permissions: { canEdit: false, canComment: true, canInvite: false, canDelete: false }
        }
    ]);

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            sender: collaborators[0],
            content: 'Vamos implementar essa funcionalidade?',
            timestamp: new Date(Date.now() - 300000),
            type: 'text',
            reactions: [],
            isEdited: false
        },
        {
            id: '2',
            sender: collaborators[1],
            content: 'Sim! Vou começar pelo backend',
            timestamp: new Date(Date.now() - 240000),
            type: 'text',
            reactions: [{ emoji: '👍', users: ['1'] }],
            isEdited: false
        },
        {
            id: '3',
            sender: collaborators[2],
            content: 'Eu fico com o frontend',
            timestamp: new Date(Date.now() - 180000),
            type: 'text',
            reactions: [],
            isEdited: false
        }
    ]);

    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [selectedTab, setSelectedTab] = useState<'chat' | 'collaborators' | 'calls' | 'settings'>('chat');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('editor');
    const [voiceCall, setVoiceCall] = useState<VoiceCall | null>(null);
    const [screenShare, setScreenShare] = useState<ScreenShare | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout>();

    // Scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    // Simulate typing indicators
    useEffect(() => {
        if (isTyping) {
            setTypingUsers(prev => {
                if (!prev.includes('current-user')) {
                    return [...prev, 'current-user'];
                }
                return prev;
            });

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            typingTimeoutRef.current = setTimeout(() => {
                setIsTyping(false);
                setTypingUsers(prev => prev.filter(id => id !== 'current-user'));
            }, 2000);
        }
    }, [isTyping]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message: ChatMessage = {
                id: Date.now().toString(),
                sender: {
                    id: 'current-user',
                    name: 'Você',
                    email: 'you@example.com',
                    status: 'online',
                    role: 'owner',
                    cursor: { line: 0, column: 0, file: '' },
                    lastSeen: new Date(),
                    isTyping: false,
                    isSpeaking: false,
                    permissions: { canEdit: true, canComment: true, canInvite: true, canDelete: true }
                },
                content: newMessage,
                timestamp: new Date(),
                type: 'text',
                reactions: [],
                isEdited: false
            }

            setChatMessages(prev => [...prev, message]);
            setNewMessage('');
            setIsTyping(false);
        }
    }

    const handleTyping = (value: string) => {
        setNewMessage(value);
        if (value.trim() && !isTyping) {
            setIsTyping(true);
        }
    }

    const handleInviteUser = () => {
        if (inviteEmail.trim()) {
            const newCollaborator: Collaborator = {
                id: Date.now().toString(),
                name: inviteEmail.split('@')[0],
                email: inviteEmail,
                status: 'offline',
                role: inviteRole,
                cursor: { line: 0, column: 0, file: '' },
                lastSeen: new Date(),
                isTyping: false,
                isSpeaking: false,
                permissions: {
                    canEdit: inviteRole === 'editor',
                    canComment: true,
                    canInvite: false,
                    canDelete: false
                }
            }

            setCollaborators(prev => [...prev, newCollaborator]);
            setInviteEmail('');
            setShowInviteModal(false);

            // Add system message
            const systemMessage: ChatMessage = {
                id: Date.now().toString(),
                sender: {
                    id: 'system',
                    name: 'Sistema',
                    email: 'system@example.com',
                    status: 'online',
                    role: 'owner',
                    cursor: { line: 0, column: 0, file: '' },
                    lastSeen: new Date(),
                    isTyping: false,
                    isSpeaking: false,
                    permissions: { canEdit: false, canComment: false, canInvite: false, canDelete: false }
                },
                content: `${inviteEmail} foi convidado para colaborar`,
                timestamp: new Date(),
                type: 'system',
                reactions: [],
                isEdited: false
            }

            setChatMessages(prev => [...prev, systemMessage]);
        }
    }

    const handleRemoveCollaborator = (id: string) => {
        setCollaborators(prev => prev.filter(collab => collab.id !== id));
    }

    const handleStartVoiceCall = () => {
        const call: VoiceCall = {
            id: Date.now().toString(),
            participants: ['current-user', ...collaborators.filter(c => c.status === 'online').map(c => c.id)],
            isActive: true,
            isMuted: false,
            isVideoEnabled: false,
            startTime: new Date()
        }
        setVoiceCall(call);
    }

    const handleEndVoiceCall = () => {
        setVoiceCall(null);
        setIsMuted(false);
        setIsVideoEnabled(false);
    }

    const handleStartScreenShare = () => {
        const share: ScreenShare = {
            id: Date.now().toString(),
            sharer: 'current-user',
            isActive: true,
            startTime: new Date()
        }
        setScreenShare(share);
        setIsScreenSharing(true);
    }

    const handleStopScreenShare = () => {
        setScreenShare(null);
        setIsScreenSharing(false);
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            case 'busy': return 'bg-red-500';
            case 'offline': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    }

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'owner': return <Crown className="w-3 h-3 text-yellow-500" />;
            case 'admin': return <Shield className="w-3 h-3 text-blue-500" />;
            case 'editor': return <Edit className="w-3 h-3 text-green-500" />;
            case 'viewer': return <Eye className="w-3 h-3 text-gray-500" />;
            default: return null;
        }
    }

    return (
        <div className="h-full bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold">Colaboração</h3>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-400">
                                {collaborators.filter(c => c.status === 'online').length} online
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {voiceCall ? (
                            <button
                                onClick={handleEndVoiceCall}
                                className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                            >
                                <PhoneOff className="w-4 h-4" />
                                <span>Encerrar</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleStartVoiceCall}
                                className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                            >
                                <Phone className="w-4 h-4" />
                                <span>Chamada</span>
                            </button>
                        )}

                        {isScreenSharing ? (
                            <button
                                onClick={handleStopScreenShare}
                                className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                            >
                                <VideoOff className="w-4 h-4" />
                                <span>Parar</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleStartScreenShare}
                                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                            >
                                <Video className="w-4 h-4" />
                                <span>Compartilhar</span>
                            </button>
                        )}

                        <button
                            onClick={() => setShowInviteModal(true)}
                            className="flex items-center space-x-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
                        >
                            <UserPlus className="w-4 h-4" />
                            <span>Convidar</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-gray-800 border-b border-gray-700 flex">
                {[
                    { id: 'chat', label: 'Chat', icon: MessageCircle },
                    { id: 'collaborators', label: 'Colaboradores', icon: Users },
                    { id: 'calls', label: 'Chamadas', icon: Phone },
                    { id: 'settings', label: 'Configurações', icon: Settings }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id as any)}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm border-b-2 transition-colors ${selectedTab === tab.id
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {selectedTab === 'chat' && (
                    <div className="h-full flex flex-col">
                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {chatMessages.map(message => (
                                <div key={message.id} className={`flex ${message.sender.id === 'current-user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender.id === 'current-user'
                                            ? 'bg-blue-600 text-white'
                                            : message.type === 'system'
                                                ? 'bg-gray-700 text-gray-300 text-center'
                                                : 'bg-gray-800 text-white'
                                        }`}>
                                        {message.type !== 'system' && (
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="text-xs font-semibold">{message.sender.name}</span>
                                                <span className="text-xs text-gray-400">
                                                    {message.timestamp.toLocaleTimeString()}
                                                </span>
                                            </div>
                                        )}
                                        <p className="text-sm">{message.content}</p>
                                        {message.reactions.length > 0 && (
                                            <div className="flex items-center space-x-1 mt-2">
                                                {message.reactions.map((reaction, index) => (
                                                    <span key={index} className="text-xs">
                                                        {reaction.emoji} {reaction.users.length}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {typingUsers.length > 0 && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800 px-4 py-2 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {typingUsers.length === 1 ? 'Alguém está digitando...' : `${typingUsers.length} pessoas estão digitando...`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="border-t border-gray-700 p-4">
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:text-white">
                                    <Paperclip className="w-4 h-4" />
                                </button>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => handleTyping(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Digite uma mensagem..."
                                    className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="p-2 text-gray-400 hover:text-white">
                                    <Smile className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'collaborators' && (
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-semibold text-gray-300">Colaboradores</h4>
                            <button
                                onClick={() => setShowInviteModal(true)}
                                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>Convidar</span>
                            </button>
                        </div>

                        <div className="space-y-3">
                            {collaborators.map(collaborator => (
                                <div key={collaborator.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">
                                                    {collaborator.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusColor(collaborator.status)}`}></div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-semibold text-white">{collaborator.name}</span>
                                                {getRoleIcon(collaborator.role)}
                                            </div>
                                            <div className="text-xs text-gray-400">{collaborator.email}</div>
                                            <div className="text-xs text-gray-500">
                                                {collaborator.cursor.file && `${collaborator.cursor.file}:${collaborator.cursor.line}`}
                                                {collaborator.isTyping && ' • Digitando...'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {collaborator.isSpeaking && (
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        )}
                                        <button
                                            onClick={() => handleRemoveCollaborator(collaborator.id)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTab === 'calls' && (
                    <div className="p-4">
                        <h4 className="text-sm font-semibold text-gray-300 mb-4">Chamadas</h4>

                        {voiceCall ? (
                            <div className="bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h5 className="text-lg font-semibold text-white">Chamada Ativa</h5>
                                    <div className="text-sm text-gray-400">
                                        {Math.floor((Date.now() - voiceCall.startTime.getTime()) / 1000)}s
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {voiceCall.participants.map(participantId => {
                                        const participant = collaborators.find(c => c.id === participantId) ||
                                            { name: 'Você', email: 'you@example.com' }
                                        return (
                                            <div key={participantId} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">
                                                            {participant.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-white">{participant.name}</div>
                                                        <div className="text-xs text-gray-400">{participant.email}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {isMuted && <VolumeX className="w-4 h-4 text-red-400" />}
                                                    {isVideoEnabled && <Video className="w-4 h-4 text-green-400" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex items-center justify-center space-x-4 mt-6">
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className={`p-3 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-600'} hover:bg-opacity-80`}
                                    >
                                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                    </button>

                                    <button
                                        onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                                        className={`p-3 rounded-full ${isVideoEnabled ? 'bg-green-600' : 'bg-gray-600'} hover:bg-opacity-80`}
                                    >
                                        {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                                    </button>

                                    <button
                                        onClick={handleEndVoiceCall}
                                        className="p-3 rounded-full bg-red-600 hover:bg-red-700"
                                    >
                                        <PhoneOff className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Phone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400 mb-4">Nenhuma chamada ativa</p>
                                <button
                                    onClick={handleStartVoiceCall}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                                >
                                    Iniciar Chamada
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {selectedTab === 'settings' && (
                    <div className="p-4">
                        <h4 className="text-sm font-semibold text-gray-300 mb-4">Configurações de Colaboração</h4>

                        <div className="space-y-4">
                            <div className="bg-gray-800 rounded-lg p-4">
                                <h5 className="text-sm font-semibold text-white mb-3">Notificações</h5>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-sm text-gray-300">Mensagens de chat</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-sm text-gray-300">Mudanças de cursor</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span className="text-sm text-gray-300">Digitação em tempo real</span>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-4">
                                <h5 className="text-sm font-semibold text-white mb-3">Privacidade</h5>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-sm text-gray-300">Mostrar status online</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                                        <span className="text-sm text-gray-300">Mostrar posição do cursor</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span className="text-sm text-gray-300">Permitir convites automáticos</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg p-6 w-96">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Convidar Colaborador</h3>
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="usuario@exemplo.com"
                                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Função
                                </label>
                                <select
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value as 'editor' | 'viewer')}
                                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="editor">Editor</option>
                                    <option value="viewer">Visualizador</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end space-x-3">
                                <button
                                    onClick={() => setShowInviteModal(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleInviteUser}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                >
                                    Convidar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CollaborationManager;








