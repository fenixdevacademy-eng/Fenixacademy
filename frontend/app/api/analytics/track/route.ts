import { NextRequest, NextResponse } from 'next/server';

// Simulação de banco de dados em memória (em produção, use um banco real)
const events: any[] = [];

export async function POST(request: NextRequest) {
    try {
        const event = await request.json();
        // Validar evento
        if (!event.event || !event.timestamp) {
            return NextResponse.json({
                error: 'Evento inválido'
            }, { status: 400 });
        }

        // Adicionar evento à lista
        events.push({
            ...event,
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            receivedAt: new Date().toISOString()
        });

        // Em produção, salvar no banco de dados
        // await saveEventToDatabase(event);

        console.log('📊 Evento de analytics recebido:', event.event);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Erro ao processar evento de analytics:', error);
        return NextResponse.json({
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}