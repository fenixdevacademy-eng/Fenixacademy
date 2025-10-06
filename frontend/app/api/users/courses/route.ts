'use client';

﻿import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateToken } from '@/lib/auth/middleware-db';

export async function GET(request: NextRequest) {
    try {
        // Autenticar usuário
        const { user, error } = await authenticateToken(request);
        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Não autorizado' },
                { status: 401 }
            );
        }

        // Buscar cursos do usuário
        const userCourses = await prisma.userCourse.findMany({
            where: { userId: user.id },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        slug: true,
                        price: true,
                        duration: true,
                        level: true,
                        category: true
                    }
                }
            },
            orderBy: { enrolledAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            courses: userCourses,
            total: userCourses.length
        });

    } catch (error) {
        console.error('Erro na API de cursos do usuário:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        // Autenticar usuário
        const { user, error } = await authenticateToken(request);
        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Não autorizado' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { courseId, progress = 0 } = body;

        if (!courseId) {
            return NextResponse.json({
                success: false,
                error: 'ID do curso é obrigatório'
            }, { status: 400 });
        }

        // Verificar se o curso existe
        const course = await prisma.course.findUnique({
            where: { id: courseId }
        });

        if (!course) {
            return NextResponse.json({
                success: false,
                error: 'Curso não encontrado'
            }, { status: 404 });
        }

        // Verificar se o usuário já está inscrito no curso
        const existingEnrollment = await prisma.userCourse.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: courseId
                }
            }
        });

        if (existingEnrollment) {
            // Atualizar progresso do curso existente
            const updatedEnrollment = await prisma.userCourse.update({
                where: {
                    userId_courseId: {
                        userId: user.id,
                        courseId: courseId
                    }
                },
                data: {
                    progress: Math.min(100, Math.max(0, progress)),
                    updatedAt: new Date()
                },
                include: {
                    course: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            slug: true,
                            price: true,
                            duration: true,
                            level: true,
                            category: true
                        }
                    }
                }
            });

            return NextResponse.json({
                success: true,
                message: 'Progresso do curso atualizado com sucesso',
                course: updatedEnrollment
            });
        } else {
            // Criar nova inscrição no curso
            const newEnrollment = await prisma.userCourse.create({
                data: {
                    userId: user.id,
                    courseId: courseId,
                    progress: Math.min(100, Math.max(0, progress))
                },
                include: {
                    course: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            slug: true,
                            price: true,
                            duration: true,
                            level: true,
                            category: true
                        }
                    }
                }
            });

            return NextResponse.json({
                success: true,
                message: 'Curso adicionado com sucesso',
                course: newEnrollment
            });
        }

    } catch (error) {
        console.error('Erro ao adicionar/atualizar curso:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}