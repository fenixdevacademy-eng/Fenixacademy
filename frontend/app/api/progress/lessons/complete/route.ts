import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateToken } from '@/lib/auth/middleware'

export async function POST(request: NextRequest) {
    try {
        const { user, error } = await authenticateToken(request)
        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Não autorizado' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { courseId, moduleId, lessonId, completed, completedAt } = body

        // Verificar se o usuário está matriculado no curso
        const enrollment = await prisma.userCourse.findFirst({
            where: {
                userId: user.id,
                courseId: parseInt(courseId)
            }
        })

        if (!enrollment) {
            return NextResponse.json(
                { success: false, error: 'Usuário não está matriculado neste curso' },
                { status: 404 }
            )
        }

        // Criar ou atualizar progresso da lição
        const lessonProgress = await prisma.lessonProgress.upsert({
            where: {
                userId_courseId_moduleId_lessonId: {
                    userId: user.id,
                    courseId: parseInt(courseId),
                    moduleId: parseInt(moduleId),
                    lessonId: parseInt(lessonId)
                }
            },
            update: {
                completed: completed,
                completedAt: completed ? new Date(completedAt) : null,
                lastAccessed: new Date()
            },
            create: {
                userId: user.id,
                courseId: parseInt(courseId),
                moduleId: parseInt(moduleId),
                lessonId: parseInt(lessonId),
                completed: completed,
                completedAt: completed ? new Date(completedAt) : null,
                lastAccessed: new Date()
            }
        })

        // Calcular progresso geral do curso
        const totalLessons = await prisma.lesson.count({
            where: { courseId: parseInt(courseId) }
        })

        const completedLessons = await prisma.lessonProgress.count({
            where: {
                userId: user.id,
                courseId: parseInt(courseId),
                completed: true
            }
        })

        const courseProgress = Math.round((completedLessons / totalLessons) * 100)

        // Atualizar progresso do curso
        await prisma.userCourse.update({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: parseInt(courseId)
                }
            },
            data: {
                progress: courseProgress,
                updatedAt: new Date()
            }
        })

        // Verificar se o curso foi concluído
        if (courseProgress === 100) {
            await prisma.userCourse.update({
                where: {
                    userId_courseId: {
                        userId: user.id,
                        courseId: parseInt(courseId)
                    }
                },
                data: {
                    status: 'completed',
                    completedAt: new Date()
                }
            })

            // Adicionar certificado
            await prisma.certificate.create({
                data: {
                    userId: user.id,
                    courseId: parseInt(courseId),
                    issuedAt: new Date(),
                    certificateId: `cert_${user.id}_${courseId}_${Date.now()}`
                }
            })

            // Atualizar estatísticas do usuário
            await prisma.userProfile.update({
                where: { userId: user.id },
                data: {
                    certificates: {
                        increment: 1
                    },
                    completedCourses: {
                        increment: 1
                    }
                }
            })
        }

        return NextResponse.json({
            success: true,
            progress: {
                courseProgress,
                completedLessons,
                totalLessons,
                isCompleted: courseProgress === 100
            },
            lessonProgress: {
                completed: lessonProgress.completed,
                completedAt: lessonProgress.completedAt
            },
            message: completed ? 'Lição marcada como concluída!' : 'Progresso atualizado!'
        })

    } catch (error) {
        console.error('Erro ao atualizar progresso da lição:', error)
        return NextResponse.json(
            { success: false, error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}


