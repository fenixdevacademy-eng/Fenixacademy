'use client';

﻿import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email/service';

export async function GET(request: NextRequest) {
    try {
        const isConnected = await emailService.verifyConnection();

        return NextResponse.json({
            success: isConnected,
            message: isConnected ? 'Conexão SMTP verificada com sucesso' : 'Falha na conexão SMTP',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Erro ao verificar conexão SMTP:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}
