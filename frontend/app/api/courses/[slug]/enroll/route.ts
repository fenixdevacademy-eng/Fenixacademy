import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateToken } from '@/lib/auth/middleware-db'

export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { user, error } = await authenticateToken(request)
        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Não autorizado' },
                { status: 401 }
            )
        }

        const courseSlug = params.slug
        const body = await request.json()
        const { paymentMethod, paymentId, amount } = body

        // Verificar se o curso existe pelo slug
        const course = await prisma.course.findUnique({
            where: { slug: courseSlug },
            select: {
                id: true,
                title: true,
                price: true,
                isActive: true
            }
        })

        if (!course) {
            return NextResponse.json(
                { success: false, error: 'Curso não encontrado' },
                { status: 404 }
            )
        }

        if (!course.isActive) {
            return NextResponse.json(
                { success: false, error: 'Curso não está disponível' },
                { status: 400 }
            )
        }

        // Verificar se o usuário já está matriculado
        const existingEnrollment = await prisma.userCourse.findFirst({
            where: {
                userId: user.id,
                courseId: course.id
            }
        })

        if (existingEnrollment) {
            return NextResponse.json(
                { success: false, error: 'Usuário já está matriculado neste curso' },
                { status: 400 }
            )
        }

        // Criar matrícula
        const enrollment = await prisma.userCourse.create({
            data: {
                userId: user.id,
                courseId: course.id,
                enrolledAt: new Date(),
                progress: 0
            }
        })

        return NextResponse.json({
            success: true,
            enrollment: {
                id: enrollment.id,
                courseId: enrollment.courseId,
                enrolledAt: enrollment.enrolledAt,
                progress: enrollment.progress
            },
            message: 'Matrícula realizada com sucesso!'
        })

    } catch (error) {
        console.error('Erro ao realizar matrícula:', error)
        return NextResponse.json(
            { success: false, error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}


