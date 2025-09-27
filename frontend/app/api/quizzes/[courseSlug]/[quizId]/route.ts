import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { courseSlug: string; quizId: string } }
) {
    try {
        const { courseSlug, quizId } = params;

        // Mock data para o quiz
        const quiz = {
            id: quizId,
            title: 'Quiz: Fundamentos do React',
            description: 'Teste seus conhecimentos sobre os conceitos fundamentais do React, incluindo componentes, JSX, props e estado.',
            timeLimit: 15, // 15 minutos
            passingScore: 70, // 70%
            attempts: 0,
            maxAttempts: 3,
            isCompleted: false,
            bestScore: 0,
            questions: [
                {
                    id: 'q1',
                    text: 'O que é React?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'a', text: 'Uma linguagem de programação', isCorrect: false },
                        { id: 'b', text: 'Uma biblioteca JavaScript para construir interfaces de usuário', isCorrect: true },
                        { id: 'c', text: 'Um framework para backend', isCorrect: false },
                        { id: 'd', text: 'Um banco de dados', isCorrect: false }
                    ],
                    correctAnswers: ['b'],
                    explanation: 'React é uma biblioteca JavaScript criada pelo Facebook para construir interfaces de usuário, especialmente para aplicações de página única.',
                    points: 10,
                    difficulty: 'easy'
                },
                {
                    id: 'q2',
                    text: 'JSX é obrigatório para usar React.',
                    type: 'true-false',
                    options: [
                        { id: 'true', text: 'Verdadeiro', isCorrect: false },
                        { id: 'false', text: 'Falso', isCorrect: true }
                    ],
                    correctAnswers: ['false'],
                    explanation: 'JSX não é obrigatório. Você pode usar React sem JSX, mas JSX torna o código mais legível e intuitivo.',
                    points: 10,
                    difficulty: 'easy'
                },
                {
                    id: 'q3',
                    text: 'Quais são as principais características dos componentes React? (Selecione todas as corretas)',
                    type: 'multiple-select',
                    options: [
                        { id: 'a', text: 'Reutilizáveis', isCorrect: true },
                        { id: 'b', text: 'Aceitam props', isCorrect: true },
                        { id: 'c', text: 'Podem ter estado', isCorrect: true },
                        { id: 'd', text: 'São sempre classes', isCorrect: false },
                        { id: 'e', text: 'Retornam elementos React', isCorrect: true }
                    ],
                    correctAnswers: ['a', 'b', 'c', 'e'],
                    explanation: 'Os componentes React são reutilizáveis, aceitam props, podem ter estado e retornam elementos React. Eles podem ser tanto funções quanto classes.',
                    points: 15,
                    difficulty: 'medium'
                },
                {
                    id: 'q4',
                    text: 'O que acontece quando o estado de um componente React muda?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'a', text: 'O componente é destruído', isCorrect: false },
                        { id: 'b', text: 'O componente é re-renderizado', isCorrect: true },
                        { id: 'c', text: 'Nada acontece', isCorrect: false },
                        { id: 'd', text: 'O componente é movido para o final da lista', isCorrect: false }
                    ],
                    correctAnswers: ['b'],
                    explanation: 'Quando o estado de um componente React muda, o componente é automaticamente re-renderizado para refletir as mudanças.',
                    points: 10,
                    difficulty: 'easy'
                },
                {
                    id: 'q5',
                    text: 'Qual hook é usado para gerenciar estado em componentes funcionais?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'a', text: 'useEffect', isCorrect: false },
                        { id: 'b', text: 'useState', isCorrect: true },
                        { id: 'c', text: 'useContext', isCorrect: false },
                        { id: 'd', text: 'useReducer', isCorrect: false }
                    ],
                    correctAnswers: ['b'],
                    explanation: 'O hook useState é usado para gerenciar estado em componentes funcionais. Ele retorna um array com o valor atual do estado e uma função para atualizá-lo.',
                    points: 10,
                    difficulty: 'medium'
                }
            ]
        };

        return NextResponse.json({
            success: true,
            quiz: quiz
        });

    } catch (error) {
        console.error('Erro ao buscar quiz:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { courseSlug: string; quizId: string } }
) {
    try {
        const { courseSlug, quizId } = params;
        const body = await request.json();
        const { answers, timeSpent } = body;

        // Simular processamento do quiz
        const quiz = {
            id: quizId,
            questions: [
                {
                    id: 'q1',
                    correctAnswers: ['b'],
                    points: 10
                },
                {
                    id: 'q2',
                    correctAnswers: ['false'],
                    points: 10
                },
                {
                    id: 'q3',
                    correctAnswers: ['a', 'b', 'c', 'e'],
                    points: 15
                },
                {
                    id: 'q4',
                    correctAnswers: ['b'],
                    points: 10
                },
                {
                    id: 'q5',
                    correctAnswers: ['b'],
                    points: 10
                }
            ]
        };

        let correctAnswers = 0;
        let totalPoints = 0;
        let earnedPoints = 0;

        const attemptAnswers = [];

        quiz.questions.forEach(question => {
            const userAnswers = answers[question.id] || [];
            const isCorrect = question.correctAnswers.every(answer => userAnswers.includes(answer)) &&
                userAnswers.every(answer => question.correctAnswers.includes(answer));

            if (isCorrect) {
                correctAnswers++;
                earnedPoints += question.points;
            }

            totalPoints += question.points;

            attemptAnswers.push({
                questionId: question.id,
                selectedOptions: userAnswers,
                isCorrect,
                timeSpent: 0
            });
        });

        const score = Math.round((correctAnswers / quiz.questions.length) * 100);
        const passed = score >= 70;

        const attempt = {
            id: `attempt-${Date.now()}`,
            score,
            correctAnswers,
            totalQuestions: quiz.questions.length,
            timeSpent: timeSpent || 0,
            completedAt: new Date().toISOString(),
            answers: attemptAnswers
        };

        return NextResponse.json({
            success: true,
            attempt: attempt,
            passed: passed
        });

    } catch (error) {
        console.error('Erro ao processar quiz:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}








