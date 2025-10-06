'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    courseId: number | null;
    courseTitle: string;
    read: boolean;
    createdAt: string;
    actionUrl: string;
    icon: string;
}

export async function GET() {
    try {
        const notifications: Notification[] = [
            {
                id: 1,
                type: 'course_completed',
                title: 'Parabéns! Você completou o curso',
                message: "Você finalizou o curso 'Fundamentos de Desenvolvimento Web' com sucesso!",
                courseId: 1,
                courseTitle: 'Fundamentos de Desenvolvimento Web',
                read: false,
                createdAt: '2024-01-20T10:30:00Z',
                actionUrl: '/certificates/1',
                icon: '🎓'
            },
            {
                id: 2,
                type: 'new_course',
                title: 'Novo curso disponível',
                message: "O curso 'React JS Avançado' está agora disponível para você!",
                courseId: 2,
                courseTitle: 'React JS Avançado',
                read: false,
                createdAt: '2024-01-19T15:45:00Z',
                actionUrl: '/courses/react-js-avancado',
                icon: '📚'
            },
            {
                id: 3,
                type: 'reminder',
                title: 'Lembrete de estudo',
                message: "Você tem uma aula pendente no curso 'JavaScript Moderno'.",
                courseId: 3,
                courseTitle: 'JavaScript Moderno',
                read: true,
                createdAt: '2024-01-18T09:15:00Z',
                actionUrl: '/courses/javascript-moderno',
                icon: '⏰'
            },
            {
                id: 4,
                type: 'achievement',
                title: 'Nova conquista desbloqueada!',
                message: "Você completou 10 cursos e desbloqueou o badge 'Estudante Dedicado'!",
                courseId: null,
                courseTitle: '',
                read: false,
                createdAt: '2024-01-17T14:20:00Z',
                actionUrl: '/achievements',
                icon: '🏅'
            },
            {
                id: 5,
                type: 'certificate_ready',
                title: 'Certificado disponível',
                message: "Seu certificado do curso 'React JS Avançado' está pronto para download.",
                courseId: 2,
                courseTitle: 'React JS Avançado',
                read: false,
                createdAt: '2024-01-16T11:30:00Z',
                actionUrl: '/certificates/2',
                icon: '🏆'
            }
        ];

        return NextResponse.json({
            success: true,
            data: notifications,
            total: notifications.length,
            unread: notifications.filter(n => !n.read).length
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao carregar notificações'
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { notificationId, action } = body;

        // Simular ações nas notificações
        if (action === 'markAsRead') {
            // Aqui você implementaria a lógica para marcar como lida
            return NextResponse.json({
                success: true,
                message: 'Notificação marcada como lida'
            });
        }

        if (action === 'markAllAsRead') {
            // Aqui você implementaria a lógica para marcar todas como lidas
            return NextResponse.json({
                success: true,
                message: 'Todas as notificações foram marcadas como lidas'
            });
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Ação não reconhecida'
            },
            { status: 400 }
        );
    } catch (error) {
        console.error('Error processing notification action:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao processar ação'
            },
            { status: 500 }
        );
    }
}