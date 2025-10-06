'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

interface TranslateRequest {
  text: string;
  from: string;
  to: string;
}

interface TranslateResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export async function POST(request: NextRequest) {
  try {
    const { text, from, to }: TranslateRequest = await request.json();

    if (!text || !from || !to) {
      return NextResponse.json({
        success: false,
        error: 'Texto, idioma de origem e destino são obrigatórios'
      }, { status: 400 });
    }

    // Simular tradução
    const translatedText = `[Traduzido de ${from} para ${to}]: ${text}`;

    const response: TranslateResponse = {
      translatedText,
      sourceLanguage: from,
      targetLanguage: to
    }

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error('Erro na tradução:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}