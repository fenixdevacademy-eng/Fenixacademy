import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { items, billingAddress, total, currency = 'BRL' } = await request.json();

    const transactionId = `boleto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const boleto = {
      transactionId,
      barcode: '23791' + Math.random().toString().substr(2, 40),
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      amount: total,
      currency,
      status: 'pending',
      instructions: 'Pague até a data de vencimento'
    }

    return NextResponse.json({
      success: true,
      boleto
    });

  } catch (error) {
    console.error('Erro ao criar boleto:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}