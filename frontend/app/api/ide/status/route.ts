'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const ideStatus = {
      success: true,
      data: {
        status: 'operational',
        services: {
          editor: 'online',
          compiler: 'online',
          debugger: 'online',
          fileSystem: 'online'
        },
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      }
    }

    return NextResponse.json(ideStatus);

  } catch (error) {
    console.error('Erro no status da IDE:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}