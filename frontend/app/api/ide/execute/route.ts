import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json();

    if (!code || !language) {
      return NextResponse.json({
        success: false,
        error: 'Código e linguagem são obrigatórios'
      }, { status: 400 });
    }

    // Mapear linguagens para extensões
    const map: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      html: 'html',
      css: 'css'
    }

    const extension = map[language] || 'txt';

    // Simular execução do código
    const result = {
      output: `Código ${language} executado com sucesso!\n\nCódigo:\n${code}`,
      language,
      extension,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('Erro ao executar código:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}