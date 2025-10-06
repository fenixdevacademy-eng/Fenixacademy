'use client';

﻿import { useState, useEffect, useCallback } from 'react'

export interface Notification {
    id: string
    type: 'success' | 'info' | 'warning' | 'error' | 'achievement'
    title: string
    message: string
    duration?: number
    action?: {
        label: string
        onClick: () => void
    }
    timestamp: Date
}

export interface NotificationOptions {
    duration?: number
    persistent?: boolean
    action?: {
        label: string
        onClick: () => void
    }
}

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isEnabled, setIsEnabled] = useState(true)

    // Verificar permissões de notificação
    useEffect(() => {
        if ('Notification' in window) {
            if (Notification.permission === 'default') {
                Notification.requestPermission()
            }
            setIsEnabled(Notification.permission === 'granted')
        }
    }, [])

    // Adicionar notificação
    const addNotification = useCallback((
        type: Notification['type'],
        title: string,
        message: string,
        options: NotificationOptions = {}
    ) => {
        const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const duration = options.duration || (type === 'achievement' ? 0 : 5000)

        const notification: Notification = {
            id,
            type,
            title,
            message,
            duration: options.persistent ? 0 : duration,
            action: options.action,
            timestamp: new Date()
        }

        setNotifications(prev => [...prev, notification])

        // Notificação do navegador
        if (isEnabled && 'Notification' in window) {
            const browserNotification = new Notification(title, {
                body: message,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: id,
                requireInteraction: type === 'achievement'
            })

            browserNotification.onclick = () => {
                window.focus()
                if (options.action) {
                    options.action.onClick()
                }
                browserNotification.close()
            }

            if (duration > 0) {
                setTimeout(() => browserNotification.close(), duration)
            }
        }

        // Auto-remover notificação
        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id)
            }, duration)
        }

        return id
    }, [isEnabled])

    // Remover notificação
    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id))
    }, [])

    // Limpar todas as notificações
    const clearNotifications = useCallback(() => {
        setNotifications([])
    }, [])

    // Notificações específicas de progresso
    const notifyProgress = useCallback((
        courseTitle: string,
        progress: number,
        milestone?: string
    ) => {
        if (progress === 100) {
            addNotification('success', '🎉 Curso Concluído!',
                `Parabéns! Você concluiu o curso "${courseTitle}"!`, {
                duration: 0,
                persistent: true,
                action: {
                    label: 'Ver Certificado',
                    onClick: () => {
                        // Implementar navegação para certificado
                        console.log('Navegar para certificado')
                    }
                }
            })
        } else if (progress === 50) {
            addNotification('info', '📚 Metade do Caminho!',
                `Você já completou 50% do curso "${courseTitle}". Continue assim!`)
        } else if (milestone) {
            addNotification('info', '🎯 Marco Alcançado!',
                `Você alcançou: ${milestone} no curso "${courseTitle}"`)
        }
    }, [addNotification])

    // Notificações de conquistas
    const notifyAchievement = useCallback((
        achievement: string,
        description: string
    ) => {
        addNotification('achievement', '🏆 Nova Conquista!',
            `${achievement}: ${description}`, {
            duration: 0,
            persistent: true,
            action: {
                label: 'Ver Conquistas',
                onClick: () => {
                    // Implementar navegação para conquistas
                    console.log('Navegar para conquistas')
                }
            }
        })
    }, [addNotification])

    // Notificações de lição concluída
    const notifyLessonComplete = useCallback((
        lessonTitle: string,
        courseTitle: string
    ) => {
        addNotification('success', '✅ Lição Concluída!',
            `Você concluiu a lição "${lessonTitle}" do curso "${courseTitle}"`)
    }, [addNotification])

    // Notificações de módulo concluído
    const notifyModuleComplete = useCallback((
        moduleTitle: string,
        courseTitle: string
    ) => {
        addNotification('success', '📖 Módulo Concluído!',
            `Você concluiu o módulo "${moduleTitle}" do curso "${courseTitle}"`)
    }, [addNotification])

    // Notificações de tempo de estudo
    const notifyStudyTime = useCallback((
        timeSpent: number,
        courseTitle: string
    ) => {
        const hours = Math.floor(timeSpent / 60)
        const minutes = timeSpent % 60

        if (hours >= 1) {
            addNotification('info', '⏰ Tempo de Estudo',
                `Você estudou ${hours}h ${minutes}min do curso "${courseTitle}" hoje!`)
        }
    }, [addNotification])

    // Notificações de streak
    const notifyStreak = useCallback((
        days: number
    ) => {
        if (days === 7) {
            addNotification('achievement', '🔥 Streak de 7 Dias!',
                `Parabéns! Você manteve uma sequência de ${days} dias estudando!`)
        } else if (days === 30) {
            addNotification('achievement', '🔥 Streak de 30 Dias!',
                `Incrível! Você manteve uma sequência de ${days} dias estudando!`)
        } else if (days % 10 === 0 && days > 0) {
            addNotification('info', '🔥 Streak Mantida!',
                `Você manteve uma sequência de ${days} dias estudando!`)
        }
    }, [addNotification])

    return {
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        notifyProgress,
        notifyAchievement,
        notifyLessonComplete,
        notifyModuleComplete,
        notifyStudyTime,
        notifyStreak,
        isEnabled
    }
}


