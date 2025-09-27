'use client'

import React from 'react'
import {
    X,
    CheckCircle,
    Info,
    AlertTriangle,
    AlertCircle,
    Award,
    Bell,
    BellOff
} from 'lucide-react'
import { useNotifications, Notification } from '@/hooks/useNotifications'

interface NotificationCenterProps {
    className?: string
}

const notificationIcons = {
    success: CheckCircle,
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    achievement: Award
}

const notificationColors = {
    success: 'from-green-500 to-emerald-500',
    info: 'from-blue-500 to-cyan-500',
    warning: 'from-yellow-500 to-orange-500',
    error: 'from-red-500 to-pink-500',
    achievement: 'from-purple-500 to-pink-500'
}

export default function NotificationCenter({ className = '' }: NotificationCenterProps) {
    const {
        notifications,
        removeNotification,
        clearNotifications,
        isEnabled
    } = useNotifications()

    const NotificationItem = ({ notification }: { notification: Notification }) => {
        const Icon = notificationIcons[notification.type]
        const colorClass = notificationColors[notification.type]

        return (
            <div
                className={`relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-3 animate-fade-in-up ${notification.type === 'achievement' ? 'ring-2 ring-yellow-400/50' : ''
                    }`}
            >
                <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm mb-1">
                            {notification.title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {notification.message}
                        </p>

                        {notification.action && (
                            <button
                                onClick={notification.action.onClick}
                                className="mt-2 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
                            >
                                {notification.action.label} →
                            </button>
                        )}

                        <div className="text-xs text-gray-400 mt-2">
                            {notification.timestamp.toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>

                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Progress bar for timed notifications */}
                {notification.duration && notification.duration > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-xl overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progress-bar"
                            style={{ animationDuration: `${notification.duration}ms` }}
                        />
                    </div>
                )}
            </div>
        )
    }

    if (notifications.length === 0) {
        return (
            <div className={`text-center py-8 ${className}`}>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BellOff className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Nenhuma notificação</h3>
                <p className="text-gray-400 text-sm">
                    Você está em dia! Novas notificações aparecerão aqui.
                </p>
            </div>
        )
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-white" />
                    <h3 className="text-white font-semibold">
                        Notificações ({notifications.length})
                    </h3>
                </div>

                {notifications.length > 0 && (
                    <button
                        onClick={clearNotifications}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                        Limpar todas
                    </button>
                )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                    />
                ))}
            </div>

            {/* Status */}
            <div className="text-xs text-gray-400 text-center">
                {isEnabled ? (
                    <span className="text-green-400">Notificações do navegador ativadas</span>
                ) : (
                    <span>Notificações do navegador desativadas</span>
                )}
            </div>
        </div>
    )
}


