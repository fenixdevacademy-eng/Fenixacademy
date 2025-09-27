import { NextRequest, NextResponse } from 'next/server';

// Dados mockados dos quizzes individuais
const QUIZ_DETAILS = {
    'python-data-science': {
        'quiz-1': {
            id: 'quiz-1',
            title: 'Fundamentos do Python',
            description: 'Teste seus conhecimentos sobre os conceitos básicos do Python',
            difficulty: 'easy',
            estimatedTime: '15 minutos',
            points: 20,
            category: 'fundamentos',
            module: 'modulo-1',
            level: 'iniciante',
            questions: [
                {
                    id: 'q1',
                    question: 'Quem criou a linguagem Python?',
                    type: 'multiple-choice',
                    options: [
                        'Guido van Rossum',
                        'Linus Torvalds',
                        'Mark Zuckerberg',
                        'Bill Gates'
                    ],
                    correct: 0,
                    explanation: 'Guido van Rossum criou o Python em 1991.',
                    points: 5
                },
                {
                    id: 'q2',
                    question: 'Python é uma linguagem compilada?',
                    type: 'true-false',
                    options: ['Verdadeiro', 'Falso'],
                    correct: 1,
                    explanation: 'Python é uma linguagem interpretada, não compilada.',
                    points: 5
                },
                {
                    id: 'q3',
                    question: 'Qual é a forma correta de imprimir "Olá, mundo!" em Python?',
                    type: 'multiple-choice',
                    options: [
                        'print("Olá, mundo!")',
                        'echo("Olá, mundo!")',
                        'console.log("Olá, mundo!")',
                        'printf("Olá, mundo!")'
                    ],
                    correct: 0,
                    explanation: 'A função print() é usada para imprimir texto em Python.',
                    points: 5
                },
                {
                    id: 'q4',
                    question: 'Qual das seguintes é uma característica do Python?',
                    type: 'multiple-choice',
                    options: [
                        'Sintaxe complexa',
                        'Indentação obrigatória',
                        'Tipagem estática',
                        'Compilação obrigatória'
                    ],
                    correct: 1,
                    explanation: 'Python usa indentação para definir blocos de código.',
                    points: 5
                }
            ],
            passingScore: 70,
            attempts: 3,
            timeLimit: 900, // 15 minutos em segundos
            instructions: `
# Instruções do Quiz

- Você tem 15 minutos para completar este quiz
- Leia cada pergunta cuidadosamente
- Selecione a resposta que considera correta
- Você pode revisar suas respostas antes de submeter
- Boa sorte!
      `
        },
        'quiz-2': {
            id: 'quiz-2',
            title: 'Estruturas de Dados',
            description: 'Avalie seu conhecimento sobre listas, tuplas e dicionários',
            difficulty: 'medium',
            estimatedTime: '20 minutos',
            points: 30,
            category: 'estruturas-dados',
            module: 'modulo-1',
            level: 'iniciante',
            questions: [
                {
                    id: 'q1',
                    question: 'Qual é a diferença entre uma lista e uma tupla em Python?',
                    type: 'multiple-choice',
                    options: [
                        'Listas são mutáveis, tuplas são imutáveis',
                        'Tuplas são mutáveis, listas são imutáveis',
                        'Não há diferença',
                        'Listas são mais rápidas'
                    ],
                    correct: 0,
                    explanation: 'Listas podem ser modificadas após criação, tuplas não.',
                    points: 10
                },
                {
                    id: 'q2',
                    question: 'Como você acessa o primeiro elemento de uma lista chamada "minha_lista"?',
                    type: 'multiple-choice',
                    options: [
                        'minha_lista[0]',
                        'minha_lista[1]',
                        'minha_lista.first()',
                        'minha_lista.get(0)'
                    ],
                    correct: 0,
                    explanation: 'Em Python, os índices começam em 0.',
                    points: 10
                },
                {
                    id: 'q3',
                    question: 'Qual método é usado para adicionar um elemento ao final de uma lista?',
                    type: 'multiple-choice',
                    options: [
                        'add()',
                        'append()',
                        'insert()',
                        'push()'
                    ],
                    correct: 1,
                    explanation: 'O método append() adiciona um elemento ao final da lista.',
                    points: 10
                }
            ],
            passingScore: 80,
            attempts: 2,
            timeLimit: 1200, // 20 minutos em segundos
            instructions: `
# Instruções do Quiz

- Você tem 20 minutos para completar este quiz
- Leia cada pergunta cuidadosamente
- Selecione a resposta que considera correta
- Você pode revisar suas respostas antes de submeter
- Boa sorte!
      `
        }
    },
    'web-development': {
        'quiz-1': {
            id: 'quiz-1',
            title: 'Fundamentos do React',
            description: 'Teste seus conhecimentos sobre os conceitos básicos do React',
            difficulty: 'easy',
            estimatedTime: '15 minutos',
            points: 20,
            category: 'fundamentos',
            module: 'modulo-1',
            level: 'iniciante',
            questions: [
                {
                    id: 'q1',
                    question: 'React é uma biblioteca ou framework?',
                    type: 'multiple-choice',
                    options: [
                        'Framework',
                        'Biblioteca',
                        'Linguagem de programação',
                        'Banco de dados'
                    ],
                    correct: 1,
                    explanation: 'React é uma biblioteca JavaScript para construir interfaces de usuário.',
                    points: 5
                },
                {
                    id: 'q2',
                    question: 'Qual empresa criou o React?',
                    type: 'multiple-choice',
                    options: [
                        'Google',
                        'Facebook',
                        'Microsoft',
                        'Amazon'
                    ],
                    correct: 1,
                    explanation: 'React foi criado pelo Facebook (agora Meta).',
                    points: 5
                },
                {
                    id: 'q3',
                    question: 'O que é JSX?',
                    type: 'multiple-choice',
                    options: [
                        'Uma linguagem de programação',
                        'Uma extensão de sintaxe do JavaScript',
                        'Um framework CSS',
                        'Uma biblioteca de ícones'
                    ],
                    correct: 1,
                    explanation: 'JSX é uma extensão de sintaxe que permite escrever HTML dentro do JavaScript.',
                    points: 5
                },
                {
                    id: 'q4',
                    question: 'Qual hook é usado para gerenciar estado em componentes funcionais?',
                    type: 'multiple-choice',
                    options: [
                        'useEffect',
                        'useState',
                        'useContext',
                        'useReducer'
                    ],
                    correct: 1,
                    explanation: 'useState é o hook usado para gerenciar estado em componentes funcionais.',
                    points: 5
                }
            ],
            passingScore: 70,
            attempts: 3,
            timeLimit: 900, // 15 minutos em segundos
            instructions: `
# Instruções do Quiz

- Você tem 15 minutos para completar este quiz
- Leia cada pergunta cuidadosamente
- Selecione a resposta que considera correta
- Você pode revisar suas respostas antes de submeter
- Boa sorte!
      `
        }
    }
};

export async function GET(
    request: NextRequest,
    { params }: { params: { courseSlug: string; quizId: string } }
) {
    try {
        const { courseSlug, quizId } = params;

        const courseQuizzes = QUIZ_DETAILS[courseSlug as keyof typeof QUIZ_DETAILS];

        if (!courseQuizzes) {
            return NextResponse.json({
                success: false,
                error: 'Curso não encontrado'
            }, { status: 404 });
        }

        const quiz = courseQuizzes[quizId as keyof typeof courseQuizzes];

        if (!quiz) {
            return NextResponse.json({
                success: false,
                error: 'Quiz não encontrado'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            quiz: quiz
        });

    } catch (error) {
        console.error('Erro ao buscar detalhes do quiz:', error);
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
        const quiz = QUIZ_DETAILS[courseSlug as keyof typeof QUIZ_DETAILS]?.[quizId as keyof typeof QUIZ_DETAILS['python-data-science']];

        if (!quiz) {
            return NextResponse.json({
                success: false,
                error: 'Quiz não encontrado'
            }, { status: 404 });
        }

        let correctAnswers = 0;
        let totalPoints = 0;
        let earnedPoints = 0;

        const attemptAnswers = [];

        quiz.questions.forEach(question => {
            const userAnswers = answers[question.id] || [];
            const isCorrect = question.correct === userAnswers[0];

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
        const passed = score >= quiz.passingScore;

        return NextResponse.json({
            success: true,
            score: score,
            correctAnswers: correctAnswers,
            totalQuestions: quiz.questions.length,
            earnedPoints: earnedPoints,
            totalPoints: totalPoints,
            passed: passed,
            attemptAnswers: attemptAnswers,
            timeSpent: timeSpent || 0
        });

    } catch (error) {
        console.error('Erro ao processar quiz:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





