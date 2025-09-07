export interface InteractiveSlide {
    id: string;
    title: string;
    content: string;
    type: 'concept' | 'example' | 'exercise' | 'summary';
    elements: SlideElement[];
    navigation: {
        previous?: string;
        next?: string;
        progress: number;
    };
}

export interface SlideElement {
    id: string;
    type: 'text' | 'image' | 'code' | 'video' | 'interactive';
    content: string;
    position: { x: number; y: number; width: number; height: number };
    animation?: {
        entrance: 'fade' | 'slide' | 'zoom' | 'bounce';
        duration: number;
        delay: number;
    };
    interactive?: {
        type: 'click' | 'drag' | 'hover' | 'input';
        action: string;
        feedback: string;
    };
}

export interface Infographic {
    id: string;
    title: string;
    description: string;
    type: 'flowchart' | 'timeline' | 'comparison' | 'hierarchy' | 'process';
    elements: InfographicElement[];
    interactive: boolean;
    animations: AnimationConfig[];
}

export interface InfographicElement {
    id: string;
    type: 'node' | 'connection' | 'text' | 'icon';
    content: string;
    position: { x: number; y: number };
    style: {
        color: string;
        size: number;
        shape: 'circle' | 'square' | 'diamond' | 'arrow';
    };
    tooltip?: string;
    clickAction?: string;
}

export interface AnimationConfig {
    type: 'fade' | 'slide' | 'scale' | 'rotate' | 'path';
    duration: number;
    delay: number;
    easing: 'linear' | 'ease-in' | 'ease-out' | 'bounce';
    loop: boolean;
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
    timeLimit?: number;
    passingScore: number;
    attempts: number;
    feedback: boolean;
    certificate?: boolean;
}

export interface QuizQuestion {
    id: string;
    type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'code' | 'matching';
    question: string;
    options?: string[];
    correctAnswer: string | string[];
    explanation: string;
    points: number;
    difficulty: 'easy' | 'medium' | 'hard';
    hints?: string[];
}

export interface Simulator {
    id: string;
    title: string;
    description: string;
    type: 'network' | 'database' | 'algorithm' | 'system' | 'game';
    config: SimulatorConfig;
    scenarios: SimulatorScenario[];
    metrics: string[];
    export: boolean;
}

export interface SimulatorConfig {
    parameters: Array<{
        name: string;
        type: 'number' | 'string' | 'boolean' | 'select';
        value: any;
        min?: number;
        max?: number;
        options?: string[];
        description: string;
    }>;
    visualization: '2d' | '3d' | 'chart' | 'table';
    realTime: boolean;
}

export interface SimulatorScenario {
    id: string;
    name: string;
    description: string;
    presetValues: Record<string, any>;
    expectedOutcome: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface CodePlayground {
    id: string;
    title: string;
    description: string;
    language: string;
    template: string;
    libraries: string[];
    features: {
        syntaxHighlighting: boolean;
        autoComplete: boolean;
        errorChecking: boolean;
        debugging: boolean;
        sharing: boolean;
        collaboration: boolean;
    };
    examples: CodeExample[];
    challenges: CodeChallenge[];
}

export interface CodeExample {
    id: string;
    name: string;
    description: string;
    code: string;
    output: string;
    explanation: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface CodeChallenge {
    id: string;
    title: string;
    description: string;
    starterCode: string;
    requirements: string[];
    testCases: Array<{
        input: string;
        expectedOutput: string;
        description: string;
    }>;
    hints: string[];
    solution: string;
    points: number;
}

export interface CollaborativeProject {
    id: string;
    title: string;
    description: string;
    type: 'web-app' | 'mobile-app' | 'api' | 'data-analysis' | 'game';
    teamSize: {
        min: number;
        max: number;
        current: number;
    };
    technologies: string[];
    phases: ProjectPhase[];
    collaboration: {
        realTime: boolean;
        chat: boolean;
        videoCall: boolean;
        fileSharing: boolean;
        versionControl: boolean;
    };
    status: 'planning' | 'development' | 'testing' | 'deployment' | 'completed';
}

export interface ProjectPhase {
    id: string;
    name: string;
    description: string;
    tasks: ProjectTask[];
    deadline: Date;
    status: 'pending' | 'in-progress' | 'completed' | 'review';
}

export interface ProjectTask {
    id: string;
    title: string;
    description: string;
    assignee?: string;
    status: 'todo' | 'in-progress' | 'review' | 'done';
    priority: 'low' | 'medium' | 'high';
    estimatedHours: number;
    actualHours?: number;
    dependencies?: string[];
}

// Dados de exemplo para demonstração
export const sampleInteractiveElements = {
    slides: [
        {
            id: 'html-fundamentals-1',
            title: 'HTML5 Fundamentos',
            content: 'Aprenda os conceitos básicos do HTML5',
            type: 'concept',
            elements: [
                {
                    id: 'title',
                    type: 'text',
                    content: 'HTML5 Fundamentos',
                    position: { x: 50, y: 20, width: 80, height: 10 },
                    animation: { entrance: 'fade', duration: 1000, delay: 0 }
                },
                {
                    id: 'code-example',
                    type: 'code',
                    content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Minha Página</title>\n</head>\n<body>\n  <h1>Olá Mundo!</h1>\n</body>\n</html>',
                    position: { x: 20, y: 40, width: 60, height: 30 },
                    animation: { entrance: 'slide', duration: 1500, delay: 500 }
                }
            ],
            navigation: { progress: 0 }
        }
    ],

    infographics: [
        {
            id: 'web-development-flow',
            title: 'Fluxo de Desenvolvimento Web',
            description: 'Processo completo do desenvolvimento web moderno',
            type: 'flowchart',
            elements: [
                {
                    id: 'planning',
                    type: 'node',
                    content: 'Planejamento',
                    position: { x: 20, y: 30 },
                    style: { color: '#3b82f6', size: 60, shape: 'circle' },
                    tooltip: 'Defina objetivos e requisitos'
                },
                {
                    id: 'design',
                    type: 'node',
                    content: 'Design',
                    position: { x: 50, y: 30 },
                    style: { color: '#8b5cf6', size: 60, shape: 'circle' },
                    tooltip: 'Crie wireframes e protótipos'
                },
                {
                    id: 'development',
                    type: 'node',
                    content: 'Desenvolvimento',
                    position: { x: 80, y: 30 },
                    style: { color: '#10b981', size: 60, shape: 'circle' },
                    tooltip: 'Implemente o código'
                }
            ],
            interactive: true,
            animations: [
                {
                    type: 'fade',
                    duration: 1000,
                    delay: 0,
                    easing: 'ease-in',
                    loop: false
                }
            ]
        }
    ],

    quizzes: [
        {
            id: 'html-basics-quiz',
            title: 'Quiz HTML Básico',
            description: 'Teste seus conhecimentos sobre HTML',
            questions: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual tag é usada para criar um título principal?',
                    options: ['<h1>', '<title>', '<header>', '<main>'],
                    correctAnswer: '<h1>',
                    explanation: 'A tag <h1> é usada para o título principal da página',
                    points: 10,
                    difficulty: 'easy'
                }
            ],
            timeLimit: 300,
            passingScore: 70,
            attempts: 3,
            feedback: true
        }
    ],

    simulators: [
        {
            id: 'network-simulator',
            title: 'Simulador de Rede',
            description: 'Simule diferentes configurações de rede',
            type: 'network',
            config: {
                parameters: [
                    {
                        name: 'bandwidth',
                        type: 'number',
                        value: 100,
                        min: 1,
                        max: 1000,
                        description: 'Largura de banda em Mbps'
                    }
                ],
                visualization: '2d',
                realTime: true
            },
            scenarios: [
                {
                    id: 'scenario1',
                    name: 'Conexão Básica',
                    description: 'Configuração simples de rede doméstica',
                    presetValues: { bandwidth: 100 },
                    expectedOutcome: 'Latência baixa, alta velocidade',
                    difficulty: 'easy'
                }
            ],
            metrics: ['latency', 'throughput', 'packet-loss'],
            export: true
        }
    ],

    codePlaygrounds: [
        {
            id: 'javascript-playground',
            title: 'JavaScript Playground',
            description: 'Experimente JavaScript em tempo real',
            language: 'javascript',
            template: 'console.log("Olá Mundo!");',
            libraries: ['lodash', 'moment', 'axios'],
            features: {
                syntaxHighlighting: true,
                autoComplete: true,
                errorChecking: true,
                debugging: true,
                sharing: true,
                collaboration: false
            },
            examples: [
                {
                    id: 'ex1',
                    name: 'Funções Básicas',
                    description: 'Exemplo de função simples',
                    code: 'function greet(name) {\n  return `Olá, ${name}!`;\n}\n\ngreet("Mundo");',
                    output: 'Olá, Mundo!',
                    explanation: 'Função que retorna uma saudação personalizada',
                    difficulty: 'beginner'
                }
            ],
            challenges: [
                {
                    id: 'challenge1',
                    title: 'Array Methods',
                    description: 'Implemente uma função que filtra e mapeia um array',
                    starterCode: 'function processArray(arr) {\n  // Seu código aqui\n}',
                    requirements: ['Filtrar números pares', 'Multiplicar por 2', 'Retornar array'],
                    testCases: [
                        {
                            input: '[1, 2, 3, 4, 5]',
                            expectedOutput: '[4, 8]',
                            description: 'Array com números de 1 a 5'
                        }
                    ],
                    hints: ['Use filter() para números pares', 'Use map() para multiplicar'],
                    solution: 'return arr.filter(n => n % 2 === 0).map(n => n * 2);',
                    points: 50
                }
            ]
        }
    ],

    collaborativeProjects: [
        {
            id: 'web-app-project',
            title: 'Aplicação Web Colaborativa',
            description: 'Desenvolva uma aplicação web em equipe',
            type: 'web-app',
            teamSize: { min: 2, max: 5, current: 0 },
            technologies: ['React', 'Node.js', 'MongoDB'],
            phases: [
                {
                    id: 'phase1',
                    name: 'Planejamento',
                    description: 'Definir requisitos e arquitetura',
                    tasks: [
                        {
                            id: 'task1',
                            title: 'Análise de Requisitos',
                            description: 'Documentar funcionalidades necessárias',
                            status: 'todo',
                            priority: 'high',
                            estimatedHours: 8,
                            dependencies: []
                        }
                    ],
                    deadline: new Date('2024-12-31'),
                    status: 'pending'
                }
            ],
            collaboration: {
                realTime: true,
                chat: true,
                videoCall: true,
                fileSharing: true,
                versionControl: true
            },
            status: 'planning'
        }
    ]
};
