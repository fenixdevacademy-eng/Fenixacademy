import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password, confirmPassword } = body;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Todos os campos são obrigatórios'
                },
                { status: 400 }
            );
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'As senhas não coincidem'
                },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'A senha deve ter pelo menos 6 caracteres'
                },
                { status: 400 }
            );
        }

        // Mock email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Email inválido'
                },
                { status: 400 }
            );
        }

        // Mock user creation
        const newUser = {
            id: Math.floor(Math.random() * 1000) + 3, // Generate random ID
            name,
            email,
            role: "user",
            avatar: "/avatars/default.jpg",
            permissions: ["read", "write"],
            createdAt: new Date().toISOString(),
            preferences: {
                notifications: {
                    email: true,
                    push: true,
                    sms: false
                },
                privacy: {
                    profilePublic: true,
                    showEmail: false,
                    showLocation: true
                },
                language: "pt-BR",
                timezone: "America/Sao_Paulo"
            },
            stats: {
                coursesCompleted: 0,
                certificatesEarned: 0,
                totalStudyTime: 0,
                currentStreak: 0,
                totalPoints: 0
            }
        };

        const token = "mock-jwt-token-" + Date.now();

        return NextResponse.json({
            success: true,
            data: {
                user: newUser,
                token,
                expiresIn: 3600
            },
            message: 'Usuário registrado com sucesso'
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
} 