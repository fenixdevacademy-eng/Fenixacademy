import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Basic health check
        const healthData = {
            status: 'healthy',
            service: 'fenix-academy-frontend',
            version: '2.0.0',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            uptime: process.uptime(),
            memory: process.memoryUsage(),
        }

        // Check if critical environment variables are set
        const criticalEnvVars = [
            'NEXT_PUBLIC_APP_URL',
            'NEXT_PUBLIC_API_URL',
            'NEXTAUTH_URL',
            'NEXTAUTH_SECRET'
        ]

        const missingEnvVars = criticalEnvVars.filter(envVar => !process.env[envVar])

        if (missingEnvVars.length > 0) {
            healthData.status = 'degraded'
            healthData.warnings = {
                missingEnvironmentVariables: missingEnvVars
            }
        }

        return NextResponse.json(healthData, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            status: 'unhealthy',
            service: 'fenix-academy-frontend',
            version: '2.0.0',
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: 500 })
    }
}

export async function HEAD() {
    // Simple health check for load balancers
    return new NextResponse(null, { status: 200 })
}