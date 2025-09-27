import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token, password, confirmPassword } = body;

        if (!token || !password || !confirmPassword) {
            return NextResponse.json({
                success: false,
                error: 'Token, senha e confirmação de senha são obrigatórios'
            }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({
                success: false,
                error: 'As senhas não coincidem'
            }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({
                success: false,
                error: 'A senha deve ter pelo menos 6 caracteres'
            }, { status: 400 });
        }

        // Buscar token de recuperação
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true }
        });

        if (!resetToken) {
            return NextResponse.json({
                success: false,
                error: 'Token inválido'
            }, { status: 400 });
        }

        // Verificar se o token não expirou
        if (resetToken.expiresAt < new Date()) {
            return NextResponse.json({
                success: false,
                error: 'Token expirado'
            }, { status: 400 });
        }

        // Verificar se o token já foi usado
        if (resetToken.used) {
            return NextResponse.json({
                success: false,
                error: 'Token já foi utilizado'
            }, { status: 400 });
        }

        // Hash da nova senha
        const hashedPassword = await hashPassword(password);

        // Atualizar senha do usuário
        await prisma.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword }
        });

        // Marcar token como usado
        await prisma.passwordResetToken.update({
            where: { id: resetToken.id },
            data: { used: true }
        });

        return NextResponse.json({
            success: true,
            message: 'Senha redefinida com sucesso!'
        });

    } catch (error) {
        console.error('Erro na redefinição de senha:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}
