import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
    try {
        // Mock logout logic
        // In a real application, you would invalidate the token here

        return NextResponse.json({
            success: true,
            message: 'Logout realizado com sucesso'
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao realizar logout'
            },
            { status: 500 }
        );
    }
} 