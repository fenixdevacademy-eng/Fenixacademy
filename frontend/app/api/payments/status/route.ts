'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');

    if (!transactionId) {
      return NextResponse.json({
        success: false,
        error: 'Transaction ID é obrigatório'
      }, { status: 400 });
    }

    // Simular verificação de status
    const paymentStatus = {
      transactionId,
      status: 'completed',
      amount: 299.90,
      currency: 'BRL',
      processedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      payment: paymentStatus
    });

  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}