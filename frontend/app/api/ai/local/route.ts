'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

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
  }
  return responses.general;
}

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

    const response = await simulateLocalAIResponse(`${type}: ${prompt}`);
    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Error generating local AI response:', error);
    return NextResponse.json({
      success: false,
      error: 'GENERATION_FAILED',
      message: 'Failed to generate response'
    }, { status: 500 });
  }
}