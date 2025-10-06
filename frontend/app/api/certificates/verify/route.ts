'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

interface Certificate {
    id: string;
    title: string;
    course: string;
    instructor: string;
    issuedDate: string;
    expiryDate?: string;
    grade: number;
    status: 'completed' | 'in-progress' | 'expired';
    verificationCode: string;
    imageUrl: string;
    description: string;
    skills: string[];
    hours: number;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    userId: string;
}

const mockCertificates: Certificate[] = [
    {
        id: '1',
        title: 'React Avançado',
        course: 'React e Next.js Avançado',
        instructor: 'Prof. João Silva',
        issuedDate: '2024-01-15',
        grade: 95,
        status: 'completed',
        verificationCode: 'FENIX-REACT-2024-001',
        imageUrl: '/certificates/react-avancado.jpg',
        description: 'Certificado de conclusão do curso React e Next.js Avançado',
        skills: ['React', 'Next.js', 'TypeScript', 'Hooks', 'Context API'],
        hours: 40,
        level: 'advanced',
        userId: 'user-123'
    }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');

        if (!code) {
            return NextResponse.json({
                success: false,
                error: 'Código de verificação é obrigatório'
            }, { status: 400 });
        }

        const certificate = mockCertificates.find(cert => cert.verificationCode === code);

        if (!certificate) {
            return NextResponse.json({
                success: false,
                error: 'Certificado não encontrado ou código inválido'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            certificate
        });

    } catch (error) {
        console.error('Erro ao verificar certificado:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}