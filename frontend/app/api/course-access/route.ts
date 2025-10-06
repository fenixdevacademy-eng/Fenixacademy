'use client';

﻿import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email/service';
import { UserEmailData } from '@/lib/email/config';

// Simular banco de dados de acessos (em produção, isso seria um banco real)
const courseAccess: Record<string, string[]> = {}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { courseId, paymentData, userId } = body;

        if (!courseId || !userId) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'ID do curso e usuário são obrigatórios'
                },
                { status: 400 }
            );
        }

        // Simular processamento do pagamento
        const paymentStatus = await processPayment(paymentData);

        if (!paymentStatus.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Falha no processamento do pagamento'
                },
                { status: 400 }
            );
        }

        // Liberar acesso ao curso
        if (!courseAccess[userId]) {
            courseAccess[userId] = [];
        }

        // Se for oferta especial (acesso a todos os cursos)
        if (courseId === 'all-courses') {
            // Adicionar acesso a todos os cursos
            const allCourses = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'];
            allCourses.forEach(course => {
                if (!courseAccess[userId].includes(course)) {
                    courseAccess[userId].push(course);
                }
            });
        } else {
            // Acesso a curso específico
            if (!courseAccess[userId].includes(courseId)) {
                courseAccess[userId].push(courseId);
            }
        }

        // Atualizar contador de alunos para o desconto (simulação)
        // Em produção, isso seria feito diretamente no banco de dados
        console.log('Incrementando contador de alunos para desconto');

        // Gerar fatura se o pagamento foi aprovado (simulação)
        let invoiceData = null;
        if (paymentStatus.success) {
            // Simular geração de fatura
            invoiceData = {
                id: `invoice_${Date.now()}`,
                courseTitle: courseId === 'all-courses' ? 'Acesso Completo Fênix Academy' : `Curso ${courseId}`,
                amount: paymentData.originalPrice,
                discount: paymentData.discount,
                finalAmount: paymentData.amount,
                paymentMethod: paymentData.method,
                installments: paymentData.cardData?.installments || 1,
                pixKey: paymentData.pixKey,
                cardData: paymentData.cardData,
                issueDate: new Date().toISOString(),
                dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias
            }
        }

        // Enviar e-mail de confirmação de pagamento
        try {
            const emailData: UserEmailData = {
                name: 'Usuário Fênix', // Em produção, buscar nome do usuário
                email: 'usuario@fenixdevacademy.com', // Em produção, buscar email do usuário
                courseName: courseId === 'all-courses' ? 'Acesso Completo Fênix Academy' : `Curso ${courseId}`,
                paymentAmount: paymentData.amount / 100 // Converter de centavos para reais
            }

            await emailService.sendEmail(
                emailData.email,
                'Pagamento Confirmado - Fênix Academy',
                `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Pagamento Confirmado!</h1>
                        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Fênix Academy</p>
                    </div>
                    
                    <div style="padding: 40px; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="color: #333; margin-bottom: 20px;">Olá, ${emailData.name}!</h2>
                        
                        <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                            Seu pagamento foi processado com sucesso! Você agora tem acesso ao curso.
                        </p>
                        
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #333; margin-top: 0;">Detalhes do Pagamento:</h3>
                            <p><strong>Curso:</strong> ${emailData.courseName}</p>
                            <p><strong>Valor:</strong> R$ ${(emailData.paymentAmount || 0).toFixed(2)}</p>
                            <p><strong>Status:</strong> <span style="color: green;">Confirmado</span></p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/courses" 
                               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                                Acessar Curso
                            </a>
                        </div>
                    </div>
                </div>
                `
            );
            console.log('✅ E-mail de confirmação de pagamento enviado');
        } catch (emailError) {
            console.error('❌ Erro ao enviar e-mail de confirmação:', emailError);
            // Não falhar o pagamento se o e-mail não for enviado
        }

        return NextResponse.json({
            success: true,
            message: 'Acesso ao curso liberado com sucesso. Verifique seu e-mail para a confirmação!',
            courseId,
            userId,
            accessGranted: true,
            paymentId: paymentStatus.paymentId,
            invoice: invoiceData
        });

    } catch (error) {
        console.error('Erro ao liberar acesso ao curso:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const courseId = searchParams.get('courseId');
        const userId = searchParams.get('userId');

        if (!courseId || !userId) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'ID do curso e usuário são obrigatórios'
                },
                { status: 400 }
            );
        }

        // Verificar se tem acesso a todos os cursos ou ao curso específico
        const hasAccess = courseAccess[userId]?.includes(courseId) ||
            (courseId !== 'all-courses' && courseAccess[userId]?.includes('all-courses')) ||
            false;

        return NextResponse.json({
            success: true,
            hasAccess,
            courseId,
            userId
        });

    } catch (error) {
        console.error('Erro ao verificar acesso ao curso:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
}

// Função para simular processamento de pagamento
async function processPayment(paymentData: any): Promise<{ success: boolean; paymentId?: string }> {
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular diferentes cenários de pagamento
    const successRate = 0.95; // 95% de sucesso

    if (Math.random() < successRate) {
        return {
            success: true,
            paymentId: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }
    } else {
        return {
            success: false
        }
    }
}
