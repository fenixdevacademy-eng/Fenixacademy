'use client';

import React, { useState } from 'react';
import { X, Users, UserPlus, Share2, Eye, EyeOff, MessageCircle, Video, Phone, MoreVertical, Crown, Shield, Edit, Trash2 } from 'lucide-react';

interface CollaborationPanelProps {
    onClose: () => void;
    className?: string;
}

interface Participant {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status: 'online' | 'away' | 'offline';
    permissions: ('read' | 'write' | 'admin')[];
    lastSeen: Date;
    isOwner?: boolean;
}

interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: Date;
    type: 'message' | 'system';
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ onClose, className = '' }) => {
    const [participants, setParticipants] = useState<Participant[]>([
        {
            id: '1',
            name: 'João Silva',
            email: 'joao@exemplo.com',
            status: 'online',
            permissions: ['read', 'write', 'admin'],
            lastSeen: new Date(),
            isOwner: true
        },
        {
            id: '2',
            name: 'Maria Santos',
            email: 'maria@exemplo.com',
            status: 'online',
            permissions: ['read', 'write'],
            lastSeen: new Date()
        },
        {
            id: '3',
            name: 'Pedro Costa',
            email: 'pedro@exemplo.com',
            status: 'away',
            permissions: ['read'],
            lastSeen: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
        }
    ]);

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            senderId: '1',
            senderName: 'João Silva',
            content: 'Bem-vindos ao projeto! Vamos começar a trabalhar juntos.',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            type: 'message'
        },
        {
            id: '2',
            senderId: '2',
            senderName: 'Maria Santos',
            content: 'Obrigada! Estou animada para colaborar.',
            timestamp: new Date(Date.now() - 25 * 60 * 1000),
            type: 'message'
        },
        {
            id: '3',
            senderId: 'system',
            senderName: 'Sistema',
            content: 'Pedro Costa entrou na sessão',
            timestamp: new Date(Date.now() - 20 * 60 * 1000),
            type: 'system'
        }
    ]);

    const [newMessage, setNewMessage] = useState('');
    const [activeTab, setActiveTab] = useState<'participants' | 'chat'>('participants');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            case 'offline': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'online': return 'Online';
            case 'away': return 'Ausente';
            case 'offline': return 'Offline';
            default: return 'Desconhecido';
        }
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));

        if (minutes < 1) return 'Agora';
        if (minutes < 60) return `${minutes}m atrás`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h atrás`;
        return date.toLocaleDateString('pt-BR');
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const message: ChatMessage = {
            id: Date.now().toString(),
            senderId: '1', // Current user
            senderName: 'Você',
            content: newMessage.trim(),
            timestamp: new Date(),
            type: 'message'
        };

        setChatMessages(prev => [...prev, message]);
        setNewMessage('');
    };

    const handleInviteUser = () => {
        if (!inviteEmail.trim()) return;

        // Simulate invite
        console.log('Inviting user:', inviteEmail);
        setShowInviteModal(false);
        setInviteEmail('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const updateParticipantPermissions = (participantId: string, permissions: ('read' | 'write' | 'admin')[]) => {
        setParticipants(prev => prev.map(p =>
            p.id === participantId ? { ...p, permissions } : p
        ));
    };

    const removeParticipant = (participantId: string) => {
        setParticipants(prev => prev.filter(p => p.id !== participantId));
    };

    return (
        <div className={`collaboration-panel bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Colaboração</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('participants')}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === 'participants'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Participantes ({participants.length})
                </button>
                <button
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === 'chat'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Chat
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                {activeTab === 'participants' && (
                    <div className="p-4 space-y-4">
                        {/* Invite Button */}
                        <button
                            onClick={() => setShowInviteModal(true)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <UserPlus className="w-4 h-4" />
                            Convidar Participante
                        </button>

                        {/* Participants List */}
                        <div className="space-y-3">
                            {participants.map((participant) => (
                                <div
                                    key={participant.id}
                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {participant.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(participant.status)}`}></div>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-900">{participant.name}</span>
                                                {participant.isOwner && (
                                                    <Crown className="w-4 h-4 text-yellow-500" />
                                                )}
                                                {participant.permissions.includes('admin') && (
                                                    <Shield className="w-4 h-4 text-blue-500" />
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-600">{participant.email}</div>
                                            <div className="text-xs text-gray-500">
                                                {getStatusText(participant.status)} • {formatTime(participant.lastSeen)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <div className="flex gap-1">
                                            {participant.permissions.includes('read') && (
                                                <Eye className="w-4 h-4 text-gray-400" />
                                            )}
                                            {participant.permissions.includes('write') && (
                                                <Edit className="w-4 h-4 text-gray-400" />
                                            )}
                                        </div>

                                        {!participant.isOwner && (
                                            <button
                                                onClick={() => removeParticipant(participant.id)}
                                                className="p-1 hover:bg-red-100 rounded text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'chat' && (
                    <div className="flex flex-col h-64">
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {chatMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-2 ${message.type === 'system' ? 'justify-center' :
                                            message.senderId === '1' ? 'justify-end' : 'justify-start'
                                        }`}
                                >
                                    {message.type === 'system' ? (
                                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                            {message.content}
                                        </div>
                                    ) : (
                                        <>
                                            {message.senderId !== '1' && (
                                                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-medium text-gray-700">
                                                        {message.senderName[0]}
                                                    </span>
                                                </div>
                                            )}

                                            <div
                                                className={`max-w-xs px-3 py-2 rounded-lg ${message.senderId === '1'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-900'
                                                    }`}
                                            >
                                                <div className="text-sm">{message.content}</div>
                                                <div className={`text-xs mt-1 ${message.senderId === '1' ? 'text-blue-100' : 'text-gray-500'
                                                    }`}>
                                                    {formatTime(message.timestamp)}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Digite uma mensagem..."
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Convidar Participante</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="usuario@exemplo.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleInviteUser}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Enviar Convite
                                </button>
                                <button
                                    onClick={() => setShowInviteModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollaborationPanel;