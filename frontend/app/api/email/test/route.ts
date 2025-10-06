'use client';

﻿import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email/service';
import { UserEmailData } from '@/lib/email/config';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, type = 'welcome' } = body;

        if (!email) {
            return NextResponse.json({
                success: false,
                error: 'E-mail é obrigatório'
            }, { status: 400 });
        }

        // Dados de teste
        const testUserData: UserEmailData = {
            name: 'Usuário Teste',
            email,
            firstName: 'Teste',
            courseName: 'React Avançado',
            paymentAmount: 97
        }

        let result = false;

        switch (type) {
            case 'welcome':
                result = await emailService.sendWelcomeEmail(testUserData);
                break;

            case 'paymentConfirmation':
                result = await emailService.sendPaymentConfirmation(testUserData);
                break;

            case 'courseReminder':
                result = await emailService.sendCourseReminder(testUserData);
                break;

            default:
                return NextResponse.json({
                    success: false,
                    error: 'Tipo de e-mail não suportado'
                }, { status: 400 });
        }

        if (result) {
            return NextResponse.json({
                success: true,
                message: `E-mail de teste (${type}) enviado com sucesso para ${email}`,
                type,
                email
            });
        } else {
            return NextResponse.json({
                success: false,
                error: 'Falha ao enviar e-mail de teste'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Erro no teste de e-mail:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        // Verificar conexão SMTP
        const isConnected = await emailService.verifyConnection();

        return NextResponse.json({
            success: isConnected,
            message: isConnected ? 'Sistema de e-mail funcionando' : 'Sistema de e-mail com problemas',
            smtp: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false
            },
            from: {
                name: 'Fênix Dev Academy',
                email: 'contato@fenixdevacademy.com'
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Erro ao verificar sistema de e-mail:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}
