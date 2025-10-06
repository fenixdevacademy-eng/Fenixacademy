'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

// Simular contador de alunos (em produção, isso viria do banco de dados)
let studentsCount = 0;

export async function GET(request: NextRequest) {
    try {
        // Simular incremento aleatório para demonstração
        studentsCount = Math.floor(Math.random() * 5000) + 2000;

        return NextResponse.json({
            success: true,
            studentsCount,
            discountAvailable: studentsCount < 10000,
            remainingSlots: Math.max(0, 10000 - studentsCount),
            offerType: 'founder', // Tipo de oferta: fundador
            specialPrice: 97, // Preço especial: R$ 97
            description: 'Acesso vitalício a TODOS os 26 cursos da Fênix Academy'
        });
    } catch (error) {
        console.error('Erro ao verificar status do desconto:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor',
                studentsCount: 0,
                discountAvailable: true,
                remainingSlots: 10000
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { increment = 1 } = body;

        // Incrementar contador de alunos
        studentsCount += increment;

        return NextResponse.json({
            success: true,
            studentsCount,
            discountAvailable: studentsCount < 10000,
            remainingSlots: Math.max(0, 10000 - studentsCount),
            offerType: 'founder', // Tipo de oferta: fundador
            specialPrice: 97, // Preço especial: R$ 97
            description: 'Acesso vitalício a TODOS os 26 cursos da Fênix Academy'
        });
    } catch (error) {
        console.error('Erro ao atualizar contador de alunos:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
}
