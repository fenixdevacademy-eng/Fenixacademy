import { NextRequest, NextResponse } from 'next/server';
import { createNextApiHandler } from '@/lib/error-handler';
import { MonitoringSystem } from '@/lib/monitoring';

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

    // Get monitoring data
    const healthMetrics = MonitoringSystem.getHealthMetrics();
    const errorStats = MonitoringSystem.getErrorStats();
    const performanceStats = MonitoringSystem.getPerformanceStats();

    const response = NextResponse.json({
        success: true,
        data: {
            health: healthMetrics,
            errors: errorStats,
            performance: performanceStats,
            timestamp: new Date().toISOString()
        }
    });

    // Add cache headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
}

export const GET = createNextApiHandler(handler);




