import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const paymentStatus = params.get('payment_status');
    const transactionId = params.get('txn_id');
    const receiverEmail = params.get('receiver_email');

    console.log('PayPal Webhook recebido:', {
      paymentStatus,
      transactionId,
      receiverEmail
    });

    // Processar webhook do PayPal
    if (paymentStatus === 'Completed') {
      // Atualizar status do pagamento no banco de dados
      console.log('Pagamento confirmado:', transactionId);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erro no webhook do PayPal:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}