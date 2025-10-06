'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

function detectLanguage(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
        js: 'javascript',
        ts: 'typescript',
        py: 'python',
        html: 'html',
        css: 'css',
        json: 'json'
    }

    return languageMap[extension || ''] || 'text';
}

export async function POST(request: NextRequest) {
    try {
        const { filename, content } = await request.json();

        if (!filename || !content) {
            return NextResponse.json({
                success: false,
                error: 'Nome do arquivo e conteúdo são obrigatórios'
            }, { status: 400 });
        }

        const language = detectLanguage(filename);
        const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Simular salvamento do arquivo
        const savedFile = {
            id: fileId,
            filename,
            content,
            language,
            size: content.length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        return NextResponse.json({
            success: true,
            file: savedFile
        });

    } catch (error) {
        console.error('Erro ao salvar arquivo:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}