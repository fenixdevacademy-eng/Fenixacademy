import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Verificar se há token de autenticação
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Token de autenticação não fornecido'
                },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];

        // Fazer chamada para o backend Django
        const backendResponse = await fetch(`${process.env.BACKEND_URL || 'http://localhost:8000'}/api/users/profile/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!backendResponse.ok) {
            if (backendResponse.status === 401) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Token inválido ou expirado'
                    },
                    { status: 401 }
                );
            }

            const errorData = await backendResponse.json();
            return NextResponse.json(
                {
                    success: false,
                    error: errorData.error || 'Erro ao buscar perfil'
                },
                { status: backendResponse.status }
            );
        }

        const data = await backendResponse.json();

        return NextResponse.json({
            success: true,
            data: data.data || data
        });

    } catch (error) {
        console.error('Erro na API de perfil:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Verificar se há token de autenticação
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Token de autenticação não fornecido'
                },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];
        const body = await request.json();

        // Fazer chamada para o backend Django
        const backendResponse = await fetch(`${process.env.BACKEND_URL || 'http://localhost:8000'}/api/users/profile/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!backendResponse.ok) {
            if (backendResponse.status === 401) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Token inválido ou expirado'
                    },
                    { status: 401 }
                );
            }

            const errorData = await backendResponse.json();
            return NextResponse.json(
                {
                    success: false,
                    error: errorData.error || 'Erro ao atualizar perfil'
                },
                { status: backendResponse.status }
            );
        }

        const data = await backendResponse.json();

        return NextResponse.json({
            success: true,
            message: data.message || 'Perfil atualizado com sucesso',
            data: data.data || data
        });

    } catch (error) {
        console.error('Erro na API de perfil:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
} 