import { NextRequest, NextResponse } from 'next/server';
import { createNextApiHandler } from '@/lib/error-handler';

async function handler(request: NextRequest) {
    // Validate request method
    if (request.method !== 'GET') {
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

    // Simulate some processing time to test timeout handling
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
        success: true,
        message: 'API funcionando corretamente!',
        timestamp: new Date().toISOString(),
        status: 'success',
        version: '2.0.0',
        environment: process.env.NODE_ENV || 'development'
    });
}

export const GET = createNextApiHandler(handler);
