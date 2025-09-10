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

    // Get comprehensive status
    const healthMetrics = MonitoringSystem.getHealthMetrics();
    const errorStats = MonitoringSystem.getErrorStats();
    const performanceStats = MonitoringSystem.getPerformanceStats();

    // Check for critical issues
    const criticalIssues = [];

    if (errorStats.byLevel.error > 20) {
        criticalIssues.push('High error rate detected');
    }

    if (performanceStats.averageDuration > 10000) {
        criticalIssues.push('Performance degradation detected');
    }

    if (healthMetrics.system.memory.heapUsed > 1000) {
        criticalIssues.push('High memory usage detected');
    }

    const status = {
        success: true,
        data: {
            status: healthMetrics.status,
            timestamp: new Date().toISOString(),
            version: '2.0.0',
            environment: process.env.NODE_ENV || 'development',
            uptime: process.uptime(),
            health: healthMetrics,
            errors: errorStats,
            performance: performanceStats,
            criticalIssues,
            recommendations: [
                criticalIssues.length === 0 ? 'System is running optimally' : 'Review critical issues above',
                'Monitor error rates and performance metrics',
                'Check memory usage regularly',
                'Review logs for patterns'
            ]
        }
    };

    const response = NextResponse.json(status);

    // Add cache headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
}

export const GET = createNextApiHandler(handler);




