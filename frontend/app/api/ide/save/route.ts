import { NextRequest, NextResponse } from 'next/server';
import { createApiHandler } from '@/lib/error-handler';

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

    const { filename, content, language, workspace } = body;

    // Validate required fields
    if (!filename || !content) {
        return NextResponse.json(
            {
                success: false,
                error: 'MISSING_REQUIRED_FIELDS',
                message: 'Missing required fields: filename, content',
                code: 'MISSING_REQUIRED_FIELDS'
            },
            { status: 400 }
        );
    }

    // Validate filename
    if (filename.length > 255) {
        return NextResponse.json(
            {
                success: false,
                error: 'INVALID_FILENAME',
                message: 'Filename too long (max 255 characters)',
                code: 'INVALID_FILENAME'
            },
            { status: 400 }
        );
    }

    // Validate content size
    if (content.length > 1000000) { // 1MB limit
        return NextResponse.json(
            {
                success: false,
                error: 'CONTENT_TOO_LARGE',
                message: 'Content too large (max 1MB)',
                code: 'CONTENT_TOO_LARGE'
            },
            { status: 413 }
        );
    }

    // Simulate file saving
    const fileInfo = {
        id: `file-${Date.now()}`,
        filename,
        content,
        language: language || detectLanguage(filename),
        workspace: workspace || '/workspace',
        size: content.length,
        lastModified: new Date().toISOString(),
        isDirty: false,
        encoding: 'utf-8'
    };

    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 100));

    const response = NextResponse.json({
        success: true,
        data: {
            message: 'File saved successfully',
            file: fileInfo,
            timestamp: new Date().toISOString()
        }
    });

    // Add cache headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
}

function detectLanguage(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
        'js': 'javascript',
        'jsx': 'javascript',
        'ts': 'typescript',
        'tsx': 'typescript',
        'py': 'python',
        'html': 'html',
        'htm': 'html',
        'css': 'css',
        'scss': 'scss',
        'sass': 'scss',
        'json': 'json',
        'md': 'markdown',
        'xml': 'xml',
        'yaml': 'yaml',
        'yml': 'yaml',
        'sql': 'sql',
        'php': 'php',
        'java': 'java',
        'cpp': 'cpp',
        'c': 'c',
        'cs': 'csharp',
        'go': 'go',
        'rs': 'rust',
        'rb': 'ruby',
        'swift': 'swift',
        'kt': 'kotlin',
        'dart': 'dart',
        'vue': 'vue',
        'svelte': 'svelte'
    };

    return languageMap[extension || ''] || 'plaintext';
}

export const POST = createApiHandler(handler);




