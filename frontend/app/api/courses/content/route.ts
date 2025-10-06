'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

// Simulação de banco de dados de usuários e pagamentos
const USERS_DB = {
  'user-123': {
    id: 'user-123',
    name: 'João Silva',
    email: 'joao@exemplo.com',
    subscription: {
      plan: 'premium',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User ID é obrigatório'
      }, { status: 400 });
    }

    const user = USERS_DB[userId as keyof typeof USERS_DB];

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Usuário não encontrado'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        subscription: user.subscription
      }
    });

  } catch (error) {
    console.error('Erro ao buscar conteúdo do curso:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}