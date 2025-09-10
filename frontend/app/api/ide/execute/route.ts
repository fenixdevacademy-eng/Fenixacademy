import { NextRequest, NextResponse } from 'next/server';
import { createNextApiHandler } from '@/lib/error-handler';

async function handler(request: NextRequest) {
    // Validate request method
    if (request.method !== 'POST') {
        return NextResponse.json(
            {
                success: false,
                error: 'INVALID_REQUEST_METHOD',
                message: `Method ${request.method} not allowed`,
                code: 'INVALID_REQUEST_METHOD'
            },
            { status: 405 }
        );
    }

    // Parse request body
    let body;
    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'INVALID_JSON',
                message: 'Invalid JSON in request body',
                code: 'INVALID_JSON'
            },
            { status: 400 }
        );
    }

    const { code, language, filename } = body;

    // Validate required fields
    if (!code || !language) {
        return NextResponse.json(
            {
                success: false,
                error: 'MISSING_REQUIRED_FIELDS',
                message: 'Missing required fields: code, language',
                code: 'MISSING_REQUIRED_FIELDS'
            },
            { status: 400 }
        );
    }

    // Simulate code execution based on language
    const executionResult = simulateCodeExecution(code, language, filename);

    const response = NextResponse.json({
        success: true,
        data: {
            executionId: `exec-${Date.now()}`,
            language,
            filename: filename || `code.${getFileExtension(language)}`,
            result: executionResult,
            timestamp: new Date().toISOString(),
            executionTime: Math.random() * 1000 + 100, // Simulate execution time
            memoryUsage: Math.random() * 50 + 10, // Simulate memory usage
            status: 'completed'
        }
    });

    // Add cache headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
}

function simulateCodeExecution(code: string, language: string, filename?: string): any {
    const lines = code.split('\n').length;
    const characters = code.length;

    // Simulate different execution results based on language
    switch (language.toLowerCase()) {
        case 'javascript':
        case 'typescript':
            return {
                output: `Executed JavaScript/TypeScript code\nLines: ${lines}\nCharacters: ${characters}\n\nOutput:\n${code.includes('console.log') ? 'Hello from JavaScript!' : 'Code executed successfully'}`,
                errors: [],
                warnings: []
            };

        case 'python':
            return {
                output: `Executed Python code\nLines: ${lines}\nCharacters: ${characters}\n\nOutput:\n${code.includes('print') ? 'Hello from Python!' : 'Code executed successfully'}`,
                errors: [],
                warnings: []
            };

        case 'html':
            return {
                output: `HTML rendered successfully\nLines: ${lines}\nCharacters: ${characters}\n\nPreview available in browser`,
                errors: [],
                warnings: []
            };

        case 'css':
            return {
                output: `CSS compiled successfully\nLines: ${lines}\nCharacters: ${characters}\n\nStyles applied`,
                errors: [],
                warnings: []
            };

        default:
            return {
                output: `Executed ${language} code\nLines: ${lines}\nCharacters: ${characters}\n\nCode executed successfully`,
                errors: [],
                warnings: []
            };
    }
}

function getFileExtension(language: string): string {
    const extensionMap: Record<string, string> = {
        'javascript': 'js',
        'typescript': 'ts',
        'python': 'py',
        'html': 'html',
        'css': 'css',
        'scss': 'scss',
        'json': 'json',
        'markdown': 'md',
        'xml': 'xml',
        'yaml': 'yml',
        'sql': 'sql',
        'php': 'php',
        'java': 'java',
        'cpp': 'cpp',
        'c': 'c',
        'csharp': 'cs',
        'go': 'go',
        'rust': 'rs',
        'ruby': 'rb',
        'swift': 'swift',
        'kotlin': 'kt',
        'dart': 'dart',
        'vue': 'vue',
        'svelte': 'svelte'
    };

    return extensionMap[language.toLowerCase()] || 'txt';
}

export const POST = createNextApiHandler(handler);




