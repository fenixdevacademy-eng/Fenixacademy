import { NextRequest, NextResponse } from 'next/server';

// Simulação de banco de dados em memória (em produção, use um banco real)
const events: any[] = [];

export async function POST(request: NextRequest) {
    try {
        const event = await request.json();

        // Validar evento
        if (!event.event || !event.timestamp) {
            return NextResponse.json(
                { error: 'Evento inválido' },
                { status: 400 }
            );
        }

        // Adicionar evento à lista
        events.push({
            ...event,
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            receivedAt: new Date().toISOString(),
        });

        // Em produção, salvar no banco de dados
        // await saveEventToDatabase(event);

        console.log('📊 Evento de analytics recebido:', event.event);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Erro ao processar evento de analytics:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const eventType = searchParams.get('event');
        const timeframe = searchParams.get('timeframe') || '30d';
        const limit = parseInt(searchParams.get('limit') || '100');

        let filteredEvents = events;

        // Filtrar por tipo de evento
        if (eventType) {
            filteredEvents = filteredEvents.filter(e => e.event === eventType);
        }

        // Filtrar por período
        const now = Date.now();
        const timeframeMs = timeframe === '7d' ? 7 * 24 * 60 * 60 * 1000 :
            timeframe === '30d' ? 30 * 24 * 60 * 60 * 1000 :
                timeframe === '90d' ? 90 * 24 * 60 * 60 * 1000 :
                    30 * 24 * 60 * 60 * 1000;

        filteredEvents = filteredEvents.filter(e =>
            (now - e.timestamp) <= timeframeMs
        );

        // Ordenar por timestamp (mais recentes primeiro)
        filteredEvents.sort((a, b) => b.timestamp - a.timestamp);

        // Limitar resultados
        filteredEvents = filteredEvents.slice(0, limit);

        return NextResponse.json({
            events: filteredEvents,
            total: filteredEvents.length,
            timeframe,
        });
    } catch (error) {
        console.error('Erro ao buscar eventos de analytics:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

