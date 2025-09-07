import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Email e senha são obrigatórios'
                },
                { status: 400 }
            );
        }

        // Fazer chamada para o backend Django
        const backendResponse = await fetch(`${process.env.BACKEND_URL || 'http://localhost:8000'}/api/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json();
            return NextResponse.json(
                {
                    success: false,
                    error: errorData.error || 'Credenciais inválidas'
                },
                { status: backendResponse.status }
            );
        }

        const data = await backendResponse.json();

        return NextResponse.json({
            success: true,
            data: {
                user: data.user,
                access_token: data.access_token,
                refresh_token: data.refresh_token,
            },
            message: data.message || 'Login realizado com sucesso'
        });

    } catch (error) {
        console.error('Erro na API de login:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
} 