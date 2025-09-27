import { NextResponse } from 'next/server'

export async function GET() {
    try {
        return NextResponse.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'production',
            uptime: process.uptime(),
            message: 'Fênix Dev Academy API está funcionando!',
            rsc: 'enabled'
        })
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: 'Erro interno do servidor',
            timestamp: new Date().toISOString()
        }, { status: 500 })
    }
}