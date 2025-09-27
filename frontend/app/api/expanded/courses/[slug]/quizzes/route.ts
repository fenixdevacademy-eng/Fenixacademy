import { NextRequest, NextResponse } from 'next/server';

// Dados mockados dos quizzes
const COURSE_QUIZZES = {
    'python-data-science': [
        {
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
            timeLimit: 900 // 15 minutos em segundos
        },
        {
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
            timeLimit: 1200 // 20 minutos em segundos
        },
        {
            id: 'quiz-3',
            title: 'Pandas e NumPy',
            description: 'Teste seus conhecimentos sobre bibliotecas de análise de dados',
            difficulty: 'hard',
            estimatedTime: '25 minutos',
            points: 40,
            category: 'bibliotecas',
            module: 'modulo-2',
            level: 'intermediario',
            questions: [
                {
                    id: 'q1',
                    question: 'Qual biblioteca é usada para manipulação de dados tabulares?',
                    type: 'multiple-choice',
                    options: [
                        'NumPy',
                        'Pandas',
                        'Matplotlib',
                        'Scikit-learn'
                    ],
                    correct: 1,
                    explanation: 'Pandas é especializada em manipulação de dados tabulares.',
                    points: 10
                },
                {
                    id: 'q2',
                    question: 'Como você carrega um arquivo CSV em um DataFrame do Pandas?',
                    type: 'multiple-choice',
                    options: [
                        'pd.load_csv()',
                        'pd.read_csv()',
                        'pd.import_csv()',
                        'pd.open_csv()'
                    ],
                    correct: 1,
                    explanation: 'pd.read_csv() é o método correto para carregar arquivos CSV.',
                    points: 10
                },
                {
                    id: 'q3',
                    question: 'Qual é a principal estrutura de dados do NumPy?',
                    type: 'multiple-choice',
                    options: [
                        'List',
                        'Array',
                        'DataFrame',
                        'Series'
                    ],
                    correct: 1,
                    explanation: 'NumPy trabalha principalmente com arrays n-dimensionais.',
                    points: 10
                },
                {
                    id: 'q4',
                    question: 'Como você agrupa dados em um DataFrame por uma coluna específica?',
                    type: 'multiple-choice',
                    options: [
                        'df.group()',
                        'df.groupby()',
                        'df.aggregate()',
                        'df.summarize()'
                    ],
                    correct: 1,
                    explanation: 'groupby() é usado para agrupar dados por uma ou mais colunas.',
                    points: 10
                }
            ],
            passingScore: 75,
            attempts: 2,
            timeLimit: 1500 // 25 minutos em segundos
        }
    ],
    'web-development': [
        {
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
            timeLimit: 900 // 15 minutos em segundos
        }
    ]
};

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        const { searchParams } = new URL(request.url);
        const level = searchParams.get('level');
        const module = searchParams.get('module');
        const category = searchParams.get('category');
        const difficulty = searchParams.get('difficulty');

        const quizzes = COURSE_QUIZZES[slug as keyof typeof COURSE_QUIZZES] || [];

        let filteredQuizzes = quizzes;

        // Filtrar por nível se especificado
        if (level) {
            filteredQuizzes = filteredQuizzes.filter(quiz =>
                quiz.level.toLowerCase() === level.toLowerCase()
            );
        }

        // Filtrar por módulo se especificado
        if (module) {
            filteredQuizzes = filteredQuizzes.filter(quiz =>
                quiz.module === module
            );
        }

        // Filtrar por categoria se especificado
        if (category) {
            filteredQuizzes = filteredQuizzes.filter(quiz =>
                quiz.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filtrar por dificuldade se especificado
        if (difficulty) {
            filteredQuizzes = filteredQuizzes.filter(quiz =>
                quiz.difficulty.toLowerCase() === difficulty.toLowerCase()
            );
        }

        return NextResponse.json({
            success: true,
            quizzes: filteredQuizzes,
            total: filteredQuizzes.length
        });

    } catch (error) {
        console.error('Erro ao buscar quizzes do curso:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





