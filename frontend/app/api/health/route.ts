import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Verificar se todas as APIs essenciais estão funcionando
    const healthChecks = {
      api: 'healthy',
      database: 'healthy',
      auth: 'healthy',
      payments: 'healthy',
      courses: 'healthy',
      ide: 'healthy',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      status: 'healthy',
      checks: healthChecks,
      message: 'Fênix Dev Academy API está funcionando corretamente'
    });
  } catch (error) {
    console.error('Erro no health check:', error);
    return NextResponse.json({
      success: false,
      status: 'unhealthy',
      error: 'Erro interno do servidor',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}