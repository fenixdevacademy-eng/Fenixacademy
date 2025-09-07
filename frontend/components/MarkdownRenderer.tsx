'use client';

import React, { useState, useEffect } from 'react';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Função para converter Markdown para HTML de forma robusta
    const convertMarkdownToHTML = (markdown: string): string => {
        if (!markdown) return '';

        let html = markdown;

        // Debug: ver o conteúdo recebido
        console.log('🔍 Conteúdo recebido:', markdown.substring(0, 200));

        // 1. Processar blocos de código primeiro (para não interferir)
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code class="bg-transparent text-gray-100 p-0">$2</code></pre>');

        // 2. Processar headers (usando regex mais específico)
        html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8 border-b-2 border-blue-200 pb-2">$1</h1>');
        html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-semibold text-blue-700 mb-4 mt-6">$1</h2>');
        html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-medium text-gray-800 mb-3 mt-5">$1</h3>');
        html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-lg font-medium text-gray-800 mb-3 mt-4">$1</h4>');

        // 3. Processar listas não ordenadas
        html = html.replace(/^-\s+(.+)$/gm, '<li class="text-gray-700 leading-6">$1</li>');
        html = html.replace(/(<li.*?<\/li>)/g, '<ul class="mb-4 pl-6 space-y-2">$1</ul>');

        // 4. Processar listas ordenadas
        html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="text-gray-700 leading-6">$1</li>');
        html = html.replace(/(<li.*?<\/li>)/g, '<ol class="mb-4 pl-6 space-y-2">$1</ol>');

        // 5. Processar bold e italic (após headers e listas)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>');

        // 6. Processar código inline
        html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>');

        // 7. Processar parágrafos (linhas que não são headers, listas ou blocos de código)
        const lines = html.split('\n');
        const processedLines: string[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmedLine = line.trim();

            // Se a linha já foi processada (tem tags HTML), pular
            if (trimmedLine.startsWith('<h') || trimmedLine.startsWith('<ul') || trimmedLine.startsWith('<ol') ||
                trimmedLine.startsWith('<li') || trimmedLine.startsWith('<pre') || trimmedLine.startsWith('<p')) {
                processedLines.push(line);
                continue;
            }

            // Se é uma linha vazia, pular
            if (!trimmedLine) {
                processedLines.push(line);
                continue;
            }

            // Se chegou aqui, é uma linha de texto que precisa ser convertida para parágrafo
            processedLines.push(`<p class="mb-4 text-gray-700 leading-7">${trimmedLine}</p>`);
        }

        html = processedLines.join('\n');

        // Debug: ver o HTML gerado
        console.log('🔍 HTML gerado:', html.substring(0, 200));

        return html;
    };

    const htmlContent = convertMarkdownToHTML(content);

    // Renderizar apenas no cliente para evitar problemas de hidratação
    if (!isClient) {
        return (
            <div className="markdown-content prose max-w-none">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="markdown-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}
