'use client';

﻿import { useState, useEffect } from 'react'
import { useNotifications } from './useNotifications'

interface ProgressData {
    courseId: number
    moduleId: number
    lessonId: number
    completed: boolean
    progress: number
    timeSpent: number
    lastAccessed: Date
}

interface CourseProgress {
    courseId: number
    totalModules: number
    completedModules: number
    totalLessons: number
    completedLessons: number
    totalTime: number
    progress: number
    lastAccessed: Date
}

export function useProgress(courseId?: number) {
    const [progress, setProgress] = useState<CourseProgress | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { notifyProgress, notifyLessonComplete, notifyModuleComplete, notifyAchievement } = useNotifications()

    // Carregar progresso do localStorage ou API
    useEffect(() => {
        const loadProgress = async () => {
            try {
                setLoading(true)

                if (courseId) {
                    // Carregar progresso específico do curso
                    const savedProgress = localStorage.getItem(`course-progress-${courseId}`)
                    if (savedProgress) {
                        setProgress(JSON.parse(savedProgress))
                    } else {
                        // Simular dados de progresso
                        const mockProgress: CourseProgress = {
                            courseId,
                            totalModules: 4,
                            completedModules: Math.floor(Math.random() * 4),
                            totalLessons: 45,
                            completedLessons: Math.floor(Math.random() * 45),
                            totalTime: Math.floor(Math.random() * 1200), // minutos
                            progress: Math.floor(Math.random() * 100),
                            lastAccessed: new Date()
                        }
                        setProgress(mockProgress)
                        localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(mockProgress))
                    }
                }
            } catch (err) {
                setError('Erro ao carregar progresso')
                console.error('Erro ao carregar progresso:', err)
            } finally {
                setLoading(false)
            }
        }

        loadProgress()
    }, [courseId])

    // Marcar lição como concluída
    const markLessonComplete = async (moduleId: number, lessonId: number, lessonTitle?: string, courseTitle?: string) => {
        if (!progress) return

        try {
            const updatedProgress = {
                ...progress,
                completedLessons: progress.completedLessons + 1,
                progress: Math.min(100, Math.round(((progress.completedLessons + 1) / progress.totalLessons) * 100)),
                lastAccessed: new Date()
            }

            setProgress(updatedProgress)
            localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(updatedProgress))

            // Notificar conclusão da lição
            if (lessonTitle && courseTitle) {
                notifyLessonComplete(lessonTitle, courseTitle)
            }

            // Notificar progresso geral
            notifyProgress(courseTitle || 'Curso', updatedProgress.progress)

            // Verificar conquistas
            if (updatedProgress.completedLessons === 1) {
                notifyAchievement('Primeira Lição', 'Você concluiu sua primeira lição!')
            } else if (updatedProgress.completedLessons === 10) {
                notifyAchievement('10 Lições', 'Você concluiu 10 lições! Continue assim!')
            }

            // Simular chamada para API
            await fetch('/api/progress/lessons/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('fenix-jwt-token') || 'fenix-jwt-token-demo'}`
                },
                body: JSON.stringify({
                    courseId,
                    moduleId,
                    lessonId,
                    completed: true,
                    completedAt: new Date().toISOString()
                })
            })
        } catch (err) {
            console.error('Erro ao marcar lição como concluída:', err)
        }
    }

    // Marcar módulo como concluído
    const markModuleComplete = async (moduleId: number) => {
        if (!progress) return

        try {
            const updatedProgress = {
                ...progress,
                completedModules: progress.completedModules + 1,
                lastAccessed: new Date()
            }

            setProgress(updatedProgress)
            localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(updatedProgress))

            // Simular chamada para API
            await fetch('/api/progress/modules/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('fenix-jwt-token') || 'fenix-jwt-token-demo'}`
                },
                body: JSON.stringify({
                    courseId,
                    moduleId,
                    completed: true,
                    completedAt: new Date().toISOString()
                })
            })
        } catch (err) {
            console.error('Erro ao marcar módulo como concluído:', err)
        }
    }

    // Atualizar tempo gasto
    const updateTimeSpent = (timeSpent: number) => {
        if (!progress) return

        const updatedProgress = {
            ...progress,
            totalTime: progress.totalTime + timeSpent,
            lastAccessed: new Date()
        }

        setProgress(updatedProgress)
        localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(updatedProgress))
    }

    // Obter estatísticas de progresso
    const getProgressStats = () => {
        if (!progress) return null

        return {
            progressPercentage: progress.progress,
            completedModules: progress.completedModules,
            totalModules: progress.totalModules,
            completedLessons: progress.completedLessons,
            totalLessons: progress.totalLessons,
            timeSpent: progress.totalTime,
            timeSpentFormatted: formatTime(progress.totalTime),
            lastAccessed: progress.lastAccessed,
            isCompleted: progress.progress === 100,
            remainingLessons: progress.totalLessons - progress.completedLessons,
            remainingModules: progress.totalModules - progress.completedModules
        }
    }

    // Formatar tempo em formato legível
    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60

        if (hours > 0) {
            return `${hours}h ${mins}min`
        }
        return `${mins}min`
    }

    return {
        progress,
        loading,
        error,
        markLessonComplete,
        markModuleComplete,
        updateTimeSpent,
        getProgressStats
    }
}
