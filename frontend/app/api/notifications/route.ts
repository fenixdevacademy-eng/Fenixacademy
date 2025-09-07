import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
    try {
        // Mock notifications data
        const notifications = [
            {
                id: 1,
                type: "course_completed",
                title: "Parabéns! Você completou o curso",
                message: "Você finalizou o curso 'Fundamentos de Desenvolvimento Web' com sucesso!",
                courseId: 1,
                courseTitle: "Fundamentos de Desenvolvimento Web",
                read: false,
                createdAt: "2024-01-20T10:30:00Z",
                actionUrl: "/certificates/1",
                icon: "🎓"
            },
            {
                id: 2,
                type: "new_course",
                title: "Novo curso disponível",
                message: "O curso 'React JS Avançado' está agora disponível para você!",
                courseId: 2,
                courseTitle: "React JS Avançado",
                read: false,
                createdAt: "2024-01-19T15:45:00Z",
                actionUrl: "/courses/react-js-avancado",
                icon: "📚"
            },
            {
                id: 3,
                type: "streak_achievement",
                title: "Nova conquista desbloqueada!",
                message: "Você manteve uma sequência de 7 dias de estudo!",
                read: true,
                createdAt: "2024-01-18T09:15:00Z",
                actionUrl: "/achievements",
                icon: "🔥"
            },
            {
                id: 4,
                type: "payment_success",
                title: "Pagamento confirmado",
                message: "Seu pagamento para o curso 'Node.js APIs REST' foi processado com sucesso.",
                courseId: 3,
                courseTitle: "Node.js APIs REST",
                read: true,
                createdAt: "2024-01-17T14:20:00Z",
                actionUrl: "/my-courses",
                icon: "✅"
            },
            {
                id: 5,
                type: "certificate_ready",
                title: "Certificado disponível",
                message: "Seu certificado do curso 'React JS Avançado' está pronto para download.",
                courseId: 2,
                courseTitle: "React JS Avançado",
                read: false,
                createdAt: "2024-01-16T11:30:00Z",
                actionUrl: "/certificates/2",
                icon: "🏆"
            }
        ];

        const unreadCount = notifications.filter(n => !n.read).length;

        return NextResponse.json({
            success: true,
            data: {
                notifications,
                unreadCount,
                total: notifications.length
            }
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao carregar notificações'
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { notificationId, read } = body;

        // Mock notification update
        const updatedNotification = {
            id: notificationId,
            read,
            updatedAt: new Date().toISOString()
        };

        return NextResponse.json({
            success: true,
            data: updatedNotification,
            message: 'Notificação atualizada com sucesso'
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao atualizar notificação'
            },
            { status: 500 }
        );
    }
}

export async function DELETE(_request: NextRequest) {
    try {
        // Mock notification deletion - no need to extract parameters for this mock
        return NextResponse.json({
            success: true,
            message: 'Notificação excluída com sucesso'
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao excluir notificação'
            },
            { status: 500 }
        );
    }
} 