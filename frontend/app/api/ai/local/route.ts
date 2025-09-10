import { NextRequest, NextResponse } from 'next/server';

// Simulação de resposta da IA local (em produção, isso seria integrado com o modelo real)
const simulateLocalAIResponse = async (prompt: string): Promise<string> => {
  // Simular tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Respostas simuladas baseadas no tipo de prompt
  const responses = {
    general: `Aqui está uma resposta simulada para: "${prompt}". Esta é uma simulação da IA local da Fenix Academy.`,
    code: `Código sugerido para: "${prompt}". Esta é uma simulação da IA local da Fenix Academy.`,
    explanation: `Explicação para: "${prompt}". Esta é uma simulação da IA local da Fenix Academy.`,
    learning: `Caminho de aprendizado para: "${prompt}". Esta é uma simulação da IA local da Fenix Academy.`
  };

  return responses.general;
};

// POST /api/ai/local - Gerar resposta com IA local
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, type = 'general' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'INVALID_PROMPT',
        message: 'Prompt is required and must be a string'
      }, { status: 400 });
    }

    const response = await simulateLocalAIResponse(prompt);

    return NextResponse.json({
      success: true,
      data: {
        response,
        type,
        timestamp: new Date().toISOString(),
        model: 'gpt4all-local'
      }
    });
  } catch (error) {
    console.error('Error generating local AI response:', error);
    return NextResponse.json({
      success: false,
      error: 'GENERATION_FAILED',
      message: 'Failed to generate response'
    }, { status: 500 });
  }
}

// GET /api/ai/local - Status da IA local
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: {
        status: 'available',
        model: 'gpt4all-local',
        version: '1.0.0',
        capabilities: ['text-generation', 'code-explanation', 'learning-path'],
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error getting AI status:', error);
    return NextResponse.json({
      success: false,
      error: 'STATUS_CHECK_FAILED',
      message: 'Failed to get AI status'
    }, { status: 500 });
  }
}