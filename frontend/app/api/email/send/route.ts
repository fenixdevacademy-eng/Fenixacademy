'use client';

﻿import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email/service';
import { UserEmailData } from '@/lib/email/config';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, userData } = body;

        if (!type || !userData) {
            return NextResponse.json({
                success: false,
                error: 'Tipo de e-mail e dados do usuário são obrigatórios'
            }, { status: 400 });
        }

        let result = false;

        switch (type) {
            case 'welcome':
                result = await emailService.sendWelcomeEmail(userData as UserEmailData);
                break;

            case 'paymentConfirmation':
                result = await emailService.sendPaymentConfirmation(userData as UserEmailData);
                break;

            case 'courseReminder':
                result = await emailService.sendCourseReminder(userData as UserEmailData);
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
                message: 'E-mail enviado com sucesso'
            });
        } else {
            return NextResponse.json({
                success: false,
                error: 'Falha ao enviar e-mail'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Erro na API de e-mail:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}
