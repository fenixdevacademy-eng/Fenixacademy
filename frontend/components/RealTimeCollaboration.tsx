'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Users,
    MessageCircle,
    Video,
    Phone,
    Send,
    Mic,
    MicOff,
    VideoOff,
    VideoIcon,
    MoreVertical,
    UserPlus,
    Settings,
    Bell,
    BellOff,
    Share,
    Link,
    Copy,
    Download,
    Upload
} from 'lucide-react';

interface User {
    id: string;
    name: string;
    avatar: string;
    role: string;
    isOnline: boolean;
    isTyping: boolean;
    lastSeen: Date;
    currentFile?: string;
    cursorPosition?: { line: number; column: number };
}

interface Message {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    timestamp: Date;
    type: 'text' | 'file' | 'system';
    fileUrl?: string;
    fileName?: string;
}

interface CollaborationProps {
    theme: 'dark' | 'light';
    projectId: string;
    onClose: () => void;
}

export default function RealTimeCollaboration({
    theme,
    projectId,
    onClose
}: CollaborationProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showUsers, setShowUsers] = useState(true);
    const [showChat, setShowChat] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isCallActive, setIsCallActive] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('developer');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLTextAreaElement>(null);

    // Usuários de exemplo
    useEffect(() => {
        const sampleUsers: User[] = [
            {
                id: '1',
                name: 'João Silva',
                avatar: '👨‍💻',
                role: 'Owner',
                isOnline: true,
                isTyping: false,
                lastSeen: new Date(),
                currentFile: 'index.tsx',
                cursorPosition: { line: 15, column: 8 }
            },
            {
                id: '2',
                name: 'Maria Santos',
                avatar: '👩‍💻',
                role: 'Developer',
                isOnline: true,
                isTyping: true,
                lastSeen: new Date(),
                currentFile: 'styles.css',
                cursorPosition: { line: 42, column: 12 }
            },
            {
                id: '3',
                name: 'Pedro Costa',
                avatar: '👨‍💻',
                role: 'Developer',
                isOnline: false,
                isTyping: false,
                lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 min atrás
                currentFile: 'utils.ts'
            }
        ];
        setUsers(sampleUsers);
    }, []);

    // Mensagens de exemplo
    useEffect(() => {
        const sampleMessages: Message[] = [
            {
                id: '1',
                userId: '1',
                userName: 'João Silva',
                userAvatar: '👨‍💻',
                content: 'Olá pessoal! Como está indo o desenvolvimento?',
                timestamp: new Date(Date.now() - 10 * 60 * 1000),
                type: 'text'
            },
            {
                id: '2',
                userId: '2',
                userName: 'Maria Santos',
                userAvatar: '👩‍💻',
                content: 'Oi João! Estou trabalhando no CSS responsivo. Quase terminando!',
                timestamp: new Date(Date.now() - 8 * 60 * 1000),
                type: 'text'
            },
            {
                id: '3',
                userId: '1',
                userName: 'João Silva',
                userAvatar: '👨‍💻',
                content: 'Perfeito! Vou revisar o código do componente principal.',
                timestamp: new Date(Date.now() - 5 * 60 * 1000),
                type: 'text'
            },
            {
                id: '4',
                userId: 'system',
                userName: 'Sistema',
                userAvatar: '🤖',
                content: 'Maria Santos está editando styles.css',
                timestamp: new Date(Date.now() - 2 * 60 * 1000),
                type: 'system'
            }
        ];
        setMessages(sampleMessages);
    }, []);

    // Scroll para o final das mensagens
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Simular digitação
    useEffect(() => {
        if (isTyping) {
            const timer = setTimeout(() => {
                setIsTyping(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isTyping]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const message: Message = {
            id: Date.now().toString(),
            userId: '1', // Usuário atual
            userName: 'João Silva',
            userAvatar: '👨‍💻',
            content: newMessage,
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, message]);
        setNewMessage('');
        setIsTyping(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleVideo = () => {
        setIsVideoOff(!isVideoOff);
    };

    const startCall = () => {
        setIsCallActive(true);
        // Simular chamada
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                userId: 'system',
                userName: 'Sistema',
                userAvatar: '🤖',
                content: 'Chamada iniciada',
                timestamp: new Date(),
                type: 'system'
            }]);
        }, 1000);
    };

    const endCall = () => {
        setIsCallActive(false);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            userId: 'system',
            userName: 'Sistema',
            userAvatar: '🤖',
            content: 'Chamada finalizada',
            timestamp: new Date(),
            type: 'system'
        }]);
    };

    const inviteUser = () => {
        if (!inviteEmail.trim()) return;

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            userId: 'system',
            userName: 'Sistema',
            userAvatar: '🤖',
            content: `Convite enviado para ${inviteEmail} como ${inviteRole}`,
            timestamp: new Date(),
            type: 'system'
        }]);

        setInviteEmail('');
        setShowInviteModal(false);
    };

    const copyInviteLink = () => {
        const inviteLink = `${window.location.origin}/invite/${projectId}`;
        navigator.clipboard.writeText(inviteLink);

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            userId: 'system',
            userName: 'Sistema',
            userAvatar: '🤖',
            content: 'Link de convite copiado para a área de transferência!',
            timestamp: new Date(),
            type: 'system'
        }]);
    };

    const getStatusColor = (isOnline: boolean) => {
        return isOnline ? 'bg-green-500' : 'bg-gray-400';
    };

    const getRoleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'owner': return 'text-red-600 bg-red-100';
            case 'admin': return 'text-purple-600 bg-purple-100';
            case 'developer': return 'text-blue-600 bg-blue-100';
            case 'viewer': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
                }`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Colaboração em Tempo Real</h2>
                            <p className="text-sm text-gray-500">Projeto: Fenix IDE 2.0</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Controles de chamada */}
                        {!isCallActive ? (
                            <button
                                onClick={startCall}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                            >
                                <Video className="w-4 h-4 mr-2" />
                                Iniciar Chamada
                            </button>
                        ) : (
                            <button
                                onClick={endCall}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                            >
                                <Phone className="w-4 h-4 mr-2" />
                                Finalizar
                            </button>
                        )}

                        <button
                            onClick={() => setShowInviteModal(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Convidar
                        </button>

                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            title="Fechar"
                        >
                            ×
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                <div className="flex">
                    <button
                        onClick={() => setShowUsers(true)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${showUsers
                                ? theme === 'dark'
                                    ? 'text-blue-400 border-b-2 border-blue-400'
                                    : 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        👥 Usuários ({users.length})
                    </button>

                    <button
                        onClick={() => setShowChat(true)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${showChat
                                ? theme === 'dark'
                                    ? 'text-blue-400 border-b-2 border-blue-400'
                                    : 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        💬 Chat ({messages.length})
                    </button>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 flex">
                {/* Lista de Usuários */}
                {showUsers && (
                    <div className={`w-80 border-r ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
                        }`}>
                        <div className="p-4">
                            <h3 className="font-semibold mb-4">Colaboradores Online</h3>
                            <div className="space-y-3">
                                {users.map(user => (
                                    <div
                                        key={user.id}
                                        className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg">
                                                    {user.avatar}
                                                </div>
                                                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${theme === 'dark' ? 'border-gray-800' : 'border-white'
                                                    } ${getStatusColor(user.isOnline)}`} />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="font-medium">{user.name}</h4>
                                                    {user.isTyping && (
                                                        <span className="text-xs text-blue-500">digitando...</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                                        {user.role}
                                                    </span>
                                                    {user.currentFile && (
                                                        <span className="text-xs">
                                                            📁 {user.currentFile}
                                                        </span>
                                                    )}
                                                </div>
                                                {user.cursorPosition && (
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        📍 Linha {user.cursorPosition.line}, Col {user.cursorPosition.column}
                                                    </div>
                                                )}
                                            </div>

                                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Chat */}
                {showChat && (
                    <div className="flex-1 flex flex-col">
                        {/* Histórico de Mensagens */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map(message => (
                                <div key={message.id} className={`flex ${message.userId === '1' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${message.type === 'system'
                                            ? theme === 'dark'
                                                ? 'bg-gray-600 text-gray-200'
                                                : 'bg-gray-100 text-gray-700'
                                            : message.userId === '1'
                                                ? theme === 'dark'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-500 text-white'
                                                : theme === 'dark'
                                                    ? 'bg-gray-700 text-gray-200'
                                                    : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {message.type !== 'system' && (
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="text-lg">{message.userAvatar}</span>
                                                <span className="font-medium text-sm">{message.userName}</span>
                                            </div>
                                        )}
                                        <div className="text-sm">{message.content}</div>
                                        <div className={`text-xs mt-2 ${message.type === 'system'
                                                ? 'text-gray-400'
                                                : message.userId === '1'
                                                    ? 'text-blue-100'
                                                    : 'text-gray-500'
                                            }`}>
                                            {message.timestamp.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg">👩‍💻</span>
                                            <span className="text-sm">Maria Santos está digitando...</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input de Mensagem */}
                        <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
                            }`}>
                            <div className="flex space-x-2">
                                <textarea
                                    ref={messageInputRef}
                                    value={newMessage}
                                    onChange={(e) => {
                                        setNewMessage(e.target.value);
                                        if (e.target.value && !isTyping) {
                                            setIsTyping(true);
                                        }
                                    }}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Digite sua mensagem..."
                                    className={`flex-1 p-2 rounded-lg border resize-none ${theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                    rows={2}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim()}
                                    className={`px-4 py-2 rounded-lg transition-colors ${newMessage.trim()
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Convite */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`p-6 rounded-lg max-w-md w-full mx-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        }`}>
                        <h3 className="text-lg font-semibold mb-4">Convidar Usuário</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="usuario@exemplo.com"
                                    className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Função</label>
                                <select
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                    className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                >
                                    <option value="viewer">Visualizador</option>
                                    <option value="developer">Desenvolvedor</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-6">
                            <button
                                onClick={inviteUser}
                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Enviar Convite
                            </button>

                            <button
                                onClick={copyInviteLink}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                title="Copiar link de convite"
                            >
                                <Link className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



