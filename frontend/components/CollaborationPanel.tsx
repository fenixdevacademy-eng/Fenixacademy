'use client';

import React, { useState } from 'react';
import { X, Users, UserPlus, Share2, Eye, EyeOff, MessageCircle, Video, Phone } from 'lucide-react';

interface CollaborationPanelProps {
    onClose: () => void;
}

interface Participant {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status: 'online' | 'away' | 'offline';
    permissions: string[];
    lastSeen: Date;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ onClose }) => {
    const [participants, setParticipants] = useState<Participant[]>([
        {
            id: '1',
            name: 'João Silva',
            email: 'joao@exemplo.com',
            status: 'online',
            permissions: ['read', 'write'],
            lastSeen: new Date()
        },
        {
            id: '2',
            name: 'Maria Santos',
            email: 'maria@exemplo.com',
            status: 'away',
            permissions: ['read'],
            lastSeen: new Date(Date.now() - 300000)
        }
    ]);

    const [sessionId, setSessionId] = useState('fenix-session-123');
    const [isSharing, setIsSharing] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');

    const handleInviteUser = () => {
        if (inviteEmail.trim()) {
            // Simular convite
            console.log(`Convidando ${inviteEmail} para a sessão`);
            setInviteEmail('');
            setShowInviteModal(false);
        }
    };

    const handleShareSession = () => {
        setIsSharing(!isSharing);
        if (!isSharing) {
            navigator.clipboard.writeText(sessionId);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return '#4ade80';
            case 'away': return '#fbbf24';
            case 'offline': return '#6b7280';
            default: return '#6b7280';
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

    return (
        <div className="collaboration-panel">
            <div className="collaboration-header">
                <div className="collaboration-title">
                    <Users className="w-5 h-5" />
                    <span>Colaboração em Tempo Real</span>
                </div>
                <button
                    className="collaboration-close"
                    onClick={onClose}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="collaboration-content">
                {/* Session Info */}
                <div className="collaboration-section">
                    <h3>Sessão Atual</h3>
                    <div className="session-info">
                        <div className="session-id">
                            <span className="session-label">ID da Sessão:</span>
                            <span className="session-value">{sessionId}</span>
                            <button
                                className="copy-button"
                                onClick={() => navigator.clipboard.writeText(sessionId)}
                                title="Copiar ID"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="session-actions">
                            <button
                                className={`action-button ${isSharing ? 'active' : ''}`}
                                onClick={handleShareSession}
                            >
                                <Share2 className="w-4 h-4" />
                                {isSharing ? 'Compartilhando' : 'Compartilhar'}
                            </button>
                            <button
                                className="action-button"
                                onClick={() => setShowInviteModal(true)}
                            >
                                <UserPlus className="w-4 h-4" />
                                Convidar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Participants */}
                <div className="collaboration-section">
                    <h3>Participantes ({participants.length})</h3>
                    <div className="participants-list">
                        {participants.map((participant) => (
                            <div key={participant.id} className="participant-item">
                                <div className="participant-avatar">
                                    <div
                                        className="avatar-circle"
                                        style={{ backgroundColor: getStatusColor(participant.status) }}
                                    >
                                        {participant.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div
                                        className="status-indicator"
                                        style={{ backgroundColor: getStatusColor(participant.status) }}
                                    />
                                </div>
                                <div className="participant-info">
                                    <div className="participant-name">{participant.name}</div>
                                    <div className="participant-status">
                                        {getStatusText(participant.status)}
                                    </div>
                                    <div className="participant-permissions">
                                        {participant.permissions.includes('write') ? 'Edição' : 'Somente leitura'}
                                    </div>
                                </div>
                                <div className="participant-actions">
                                    <button
                                        className="participant-action"
                                        title="Seguir usuário"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="participant-action"
                                        title="Chat"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="participant-action"
                                        title="Chamada de vídeo"
                                    >
                                        <Video className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="collaboration-section">
                    <h3>Ações Rápidas</h3>
                    <div className="quick-actions">
                        <button className="quick-action">
                            <MessageCircle className="w-5 h-5" />
                            <span>Chat do Grupo</span>
                        </button>
                        <button className="quick-action">
                            <Video className="w-5 h-5" />
                            <span>Chamada de Vídeo</span>
                        </button>
                        <button className="quick-action">
                            <Phone className="w-5 h-5" />
                            <span>Chamada de Voz</span>
                        </button>
                        <button className="quick-action">
                            <Share2 className="w-5 h-5" />
                            <span>Compartilhar Tela</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="invite-modal-overlay">
                    <div className="invite-modal">
                        <div className="invite-modal-header">
                            <h3>Convidar Participante</h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowInviteModal(false)}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="invite-modal-content">
                            <div className="input-group">
                                <label htmlFor="invite-email">E-mail do participante:</label>
                                <input
                                    id="invite-email"
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="usuario@exemplo.com"
                                    className="invite-input"
                                />
                            </div>
                            <div className="input-group">
                                <label>Permissões:</label>
                                <div className="permissions-options">
                                    <label className="permission-option">
                                        <input type="radio" name="permissions" value="read" defaultChecked />
                                        <span>Somente leitura</span>
                                    </label>
                                    <label className="permission-option">
                                        <input type="radio" name="permissions" value="write" />
                                        <span>Edição completa</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="invite-modal-actions">
                            <button
                                className="button secondary"
                                onClick={() => setShowInviteModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="button primary"
                                onClick={handleInviteUser}
                                disabled={!inviteEmail.trim()}
                            >
                                Enviar Convite
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollaborationPanel;

