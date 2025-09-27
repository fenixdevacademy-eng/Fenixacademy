import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateRandomToken } from '@/lib/auth/password';
import { emailService } from '@/lib/email/service';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({
                success: false,
                error: 'Email é obrigatório'
            }, { status: 400 });
        }

        // Validação do formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                error: 'Formato de email inválido'
            }, { status: 400 });
        }

        // Buscar usuário
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (!user) {
            // Por segurança, retornar sucesso mesmo se o email não existir
            return NextResponse.json({
                success: true,
                message: 'Se o email existir em nosso sistema, você receberá um link de recuperação.'
            });
        }

        // Gerar token de recuperação
        const resetToken = generateRandomToken();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1); // Válido por 1 hora

        // Salvar token no banco de dados
        await prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                token: resetToken,
                expiresAt: expiresAt
            }
        });

        // Gerar link de recuperação
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;

        // Enviar e-mail de recuperação
        try {
            await emailService.sendPasswordResetEmail({
                name: user.name,
                email: user.email,
                resetLink: resetLink
            });
            console.log('✅ E-mail de recuperação enviado para:', email);
        } catch (emailError) {
            console.error('❌ Erro ao enviar e-mail de recuperação:', emailError);
            return NextResponse.json({
                success: false,
                error: 'Erro ao enviar e-mail de recuperação'
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Se o email existir em nosso sistema, você receberá um link de recuperação.'
        });

    } catch (error) {
        console.error('Erro na recuperação de senha:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}
