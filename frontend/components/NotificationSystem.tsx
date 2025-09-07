'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, Star, TrendingUp, Clock, BookOpen, Flame } from 'lucide-react';

interface Notification {
    id: string;
    type: 'success' | 'warning' | 'info' | 'achievement';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
    icon?: React.ReactNode;
    priority: 'low' | 'medium' | 'high';
}

interface NotificationSystemProps {
    className?: string;
}

export default function NotificationSystem({ className = '' }: NotificationSystemProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Simula notificações (em produção viria do backend)
    useEffect(() => {
        const mockNotifications: Notification[] = [
            {
                id: '1',
                type: 'achievement',
                title: '🎉 Nova Conquista Desbloqueada!',
                message: 'Você completou 5 lições hoje e desbloqueou a conquista "Aprendiz Consistente"',
                timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
                read: false,
                priority: 'high',
                icon: <Flame className="h-5 w-5 text-yellow-500" />
            },
            {
                id: '2',
                type: 'success',
                title: '✅ Lição Concluída',
                message: 'Parabéns! Você completou "JavaScript Moderno (ES6+)" com 95% de aproveitamento',
                timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
                read: false,
                priority: 'medium',
                icon: <CheckCircle className="h-5 w-5 text-green-500" />
            },
            {
                id: '3',
                type: 'info',
                title: '📚 Novo Módulo Disponível',
                message: 'O módulo "React.js Fundamentos" foi desbloqueado. Continue sua jornada!',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
                read: true,
                priority: 'low',
                icon: <BookOpen className="h-5 w-5 text-blue-500" />
            },
            {
                id: '4',
                type: 'warning',
                title: '⏰ Lembrete de Estudo',
                message: 'Você não estudou hoje. Mantenha sua sequência de 7 dias!',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 horas atrás
                read: true,
                priority: 'medium',
                icon: <Clock className="h-5 w-5 text-orange-500" />
            },
            {
                id: '5',
                type: 'achievement',
                title: '🔥 Sequência de 7 Dias!',
                message: 'Incrível! Você manteve uma sequência de estudos por 7 dias consecutivos',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 horas atrás
                read: true,
                priority: 'high',
                icon: <Flame className="h-5 w-5 text-red-500" />
            }
        ];

        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
    }, []);

    // Fecha notificações quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Marca notificação como lida
    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    // Marca todas como lidas
    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
    };

    // Remove notificação
    const removeNotification = (id: string) => {
        const notification = notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Filtra notificações por prioridade
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'border-l-red-500 bg-red-50';
            case 'medium': return 'border-l-orange-500 bg-orange-50';
            case 'low': return 'border-l-blue-500 bg-blue-50';
            default: return 'border-l-gray-500 bg-gray-50';
        }
    };

    // Formata timestamp
    const formatTimestamp = (timestamp: Date) => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 1) return 'Agora mesmo';
        if (minutes < 60) return `${minutes}m atrás`;
        if (hours < 24) return `${hours}h atrás`;
        return `${days}d atrás`;
    };

    // Agrupa notificações por data
    const groupedNotifications = notifications.reduce((groups, notification) => {
        const date = notification.timestamp.toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(notification);
        return groups;
    }, {} as Record<string, Notification[]>);

    return (
        <div className={`relative ${className}`} ref={notificationRef}>
            {/* Botão de notificações */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <Bell className="h-6 w-6" />

                {/* Badge de notificações não lidas */}
                {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </div>
                )}
            </button>

            {/* Painel de notificações */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Notificações
                        </h3>
                        <div className="flex items-center space-x-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Marcar todas como lidas
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Lista de notificações */}
                    <div className="overflow-y-auto max-h-80">
                        {Object.entries(groupedNotifications).map(([date, dayNotifications]) => (
                            <div key={date}>
                                {/* Data */}
                                <div className="px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    {new Date(date).toLocaleDateString('pt-BR', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long'
                                    })}
                                </div>

                                {/* Notificações do dia */}
                                {dayNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 border-l-4 transition-all duration-200 ${getPriorityColor(notification.priority)
                                            } ${!notification.read ? 'opacity-100' : 'opacity-75'}`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            {/* Ícone */}
                                            <div className="flex-shrink-0 mt-1">
                                                {notification.icon || (
                                                    notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />
                                                )}
                                                {notification.type === 'warning' && <AlertCircle className="h-5 w-5 text-orange-500" />}
                                                {notification.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
                                                {notification.type === 'achievement' && <Star className="h-5 w-5 text-yellow-500" />}
                                            </div>

                                            {/* Conteúdo */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                                                        {notification.title}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeNotification(notification.id)}
                                                        className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>

                                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                    {notification.message}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">
                                                        {formatTimestamp(notification.timestamp)}
                                                    </span>

                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                                        >
                                                            Marcar como lida
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Ação */}
                                                {notification.action && (
                                                    <button
                                                        onClick={notification.action.onClick}
                                                        className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                                                    >
                                                        {notification.action.label}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Estado vazio */}
                        {notifications.length === 0 && (
                            <div className="p-8 text-center">
                                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Nenhuma notificação
                                </h3>
                                <p className="text-gray-500">
                                    Você está em dia com tudo! Continue estudando para receber novas notificações.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
                            <span className="text-xs text-gray-500">
                                {unreadCount} não lida{unreadCount !== 1 ? 's' : ''} de {notifications.length} notificação{notifications.length !== 1 ? 'ões' : ''}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
