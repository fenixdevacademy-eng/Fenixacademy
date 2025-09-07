// Interfaces para elementos interativos
export interface InteractiveSlide {
    id: string;
    title: string;
    elements: SlideElement[];
}

export interface SlideElement {
    type: 'text' | 'code' | 'image' | 'video' | 'interactive';
    content: string;
    language?: string;
    url?: string;
    alt?: string;
    animation?: string;
    action?: string;
}

export interface Quiz {
    id: string;
    title: string;
    questions: QuizQuestion[];
    timeLimit: number;
    passingScore: number;
}

export interface QuizQuestion {
    id: string;
    question: string;
    type: 'multiple_choice' | 'fill_blank' | 'true_false' | 'code_completion';
    options?: string[];
    correct: number | string;
    explanation: string;
}

export interface Simulator {
    id: string;
    title: string;
    type: string;
    config: SimulatorConfig;
    scenarios: SimulatorScenario[];
}

export interface SimulatorConfig {
    language: string;
    environment: string;
    libraries: string[];
}

export interface SimulatorScenario {
    id: string;
    name: string;
    description: string;
    initialCode: string;
    expectedOutput: string;
}

export interface CodePlayground {
    id: string;
    title: string;
    languages: string[];
    examples: CodeExample[];
    challenges: CodeChallenge[];
}

export interface CodeExample {
    id: string;
    title: string;
    description: string;
    code: string;
    language: string;
}

export interface CodeChallenge {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    testCases: Array<{
        input: string;
        expected: any;
    }>;
}

export interface CollaborativeProject {
    id: string;
    title: string;
    description: string;
    phases: ProjectPhase[];
    teamSize: number;
    estimatedDuration: string;
}

export interface ProjectPhase {
    id: string;
    name: string;
    tasks: ProjectTask[];
}

export interface ProjectTask {
    id: string;
    title: string;
    assignedTo: string;
    status: 'pending' | 'in_progress' | 'completed';
}

// Interface para elementos interativos integrados
export interface InteractiveElements {
    slides: InteractiveSlide[];
    quiz: Quiz;
    simulator: Simulator;
    codePlayground: CodePlayground;
    collaborativeProject: CollaborativeProject;
}

export interface CS50Exercise {
    id: string;
    type: 'quick' | 'intermediate' | 'advanced';
    title: string;
    description: string;
    context: string;
    initialCode: string;
    expectedOutput: string;
    language: string;
    timeLimit: number;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    hints: string[];
    testCases: Array<{
        input: string;
        expectedOutput: string;
        description: string;
    }>;
    solution?: string;
}

export interface CS50Lesson {
    id: string;
    title: string;
    description: string;
    duration: number;
    content: string;
    exercises: CS50Exercise[];
    learningObjectives: string[];
    prerequisites: string[];
    interactiveElements?: InteractiveElements; // Elementos interativos integrados
}

export interface CS50Module {
    id: string;
    name: string;
    description: string;
    lessons: CS50Lesson[];
    totalDuration: number;
    totalPoints: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface CS50Course {
    id: string;
    name: string;
    description: string;
    modules: CS50Module[];
    totalDuration: number;
    totalPoints: number;
    realWorldCases: Array<{
        company: string;
        description: string;
        technology: string;
        impact: string;
    }>;
    prerequisites: string[];
    targetAudience: string;
}

// Função para gerar módulos e aulas automaticamente
function generateWebFundamentalsCourse(): CS50Course {
    const modules: CS50Module[] = [];

    // Módulos de Fundamentos (1-5)
    const fundamentalModules = [
        { name: 'Introdução ao Desenvolvimento Web', difficulty: 'beginner' as const },
        { name: 'HTML5 e Semântica', difficulty: 'beginner' as const },
        { name: 'CSS3 e Layouts', difficulty: 'beginner' as const },
        { name: 'JavaScript Básico', difficulty: 'beginner' as const },
        { name: 'Responsividade e Mobile-First', difficulty: 'beginner' as const }
    ];

    // Módulos Intermediários (6-12)
    const intermediateModules = [
        { name: 'JavaScript Avançado', difficulty: 'intermediate' as const },
        { name: 'DOM Manipulation', difficulty: 'intermediate' as const },
        { name: 'Eventos e Interatividade', difficulty: 'intermediate' as const },
        { name: 'AJAX e APIs', difficulty: 'intermediate' as const },
        { name: 'Local Storage e Session Storage', difficulty: 'intermediate' as const },
        { name: 'Formulários e Validação', difficulty: 'intermediate' as const },
        { name: 'Performance e Otimização', difficulty: 'intermediate' as const }
    ];

    // Módulos Avançados (13-20)
    const advancedModules = [
        { name: 'PWA e Service Workers', difficulty: 'advanced' as const },
        { name: 'Web APIs Modernas', difficulty: 'advanced' as const },
        { name: 'WebSockets e Tempo Real', difficulty: 'advanced' as const },
        { name: 'WebRTC e Comunicação', difficulty: 'advanced' as const },
        { name: 'WebAssembly', difficulty: 'advanced' as const },
        { name: 'Segurança Web', difficulty: 'advanced' as const },
        { name: 'Acessibilidade (A11Y)', difficulty: 'advanced' as const },
        { name: 'SEO e Performance', difficulty: 'advanced' as const }
    ];

    // Combinar todos os módulos
    const allModules = [...fundamentalModules, ...intermediateModules, ...advancedModules];

    allModules.forEach((moduleInfo, moduleIndex) => {
        const moduleId = (moduleIndex + 1).toString();
        const lessons: CS50Lesson[] = [];

        // Gerar 3 aulas por módulo (total de 60 aulas)
        for (let lessonIndex = 1; lessonIndex <= 3; lessonIndex++) {
            const lessonId = `${moduleId}.${lessonIndex}`;
            const lessonNumber = (moduleIndex * 3) + lessonIndex;

            lessons.push({
                id: lessonId,
                title: `Aula ${lessonNumber}: ${generateLessonTitle(moduleInfo.name, lessonIndex)}`,
                description: `Aula ${lessonNumber} do módulo ${moduleInfo.name} - Aprendizado prático e teórico`,
                duration: 25 + (lessonIndex * 5), // 25, 30, 35 minutos
                content: generateLessonContent(moduleInfo.name, lessonIndex),
                learningObjectives: generateLearningObjectives(moduleInfo.name, lessonIndex),
                prerequisites: lessonIndex === 1 ? ['Nenhum'] : [`Aula ${lessonId.split('.')[0]}.${lessonIndex - 1}`],
                exercises: generateExercises(lessonId, moduleInfo.difficulty)
            });
        }

        modules.push({
            id: moduleId,
            name: moduleInfo.name,
            description: `Módulo ${moduleId}: ${moduleInfo.name} - Desenvolvimento de habilidades ${moduleInfo.difficulty}`,
            lessons,
            totalDuration: lessons.reduce((acc, lesson) => acc + lesson.duration, 0),
            totalPoints: lessons.reduce((acc, lesson) => acc + lesson.exercises.reduce((sum, ex) => sum + ex.points, 0), 0),
            difficulty: moduleInfo.difficulty
        });
    });

    return {
        id: '1',
        name: 'Fundamentos de Desenvolvimento Web',
        description: 'Curso completo com padrão CS50 de Harvard - 20 módulos, 60 aulas, 180+ exercícios',
        totalDuration: modules.reduce((acc, module) => acc + module.totalDuration, 0),
        totalPoints: modules.reduce((acc, module) => acc + module.totalPoints, 0),
        prerequisites: ['Conhecimento básico de informática', 'Navegador web atualizado'],
        targetAudience: 'Iniciantes em programação web',
        realWorldCases: [
            {
                company: 'Nubank',
                description: 'Plataforma bancária que revolucionou o UX/UI no Brasil',
                technology: 'React, TypeScript, Design System',
                impact: 'Milhões de usuários, 99.9% uptime'
            },
            {
                company: 'iFood',
                description: 'Plataforma de delivery com alta escalabilidade',
                technology: 'Node.js, AWS, Microserviços',
                impact: 'Milhões de pedidos diários processados'
            },
            {
                company: 'Magazine Luiza',
                description: 'E-commerce com experiência do usuário excepcional',
                technology: 'Vue.js, PWA, Performance',
                impact: 'Líder em e-commerce brasileiro'
            }
        ],
        modules
    };
}

function generateReactAdvancedCourse(): CS50Course {
    const modules: CS50Module[] = [];

    // Módulos de React (1-20)
    const reactModules = [
        { name: 'Hooks Avançados', difficulty: 'intermediate' as const },
        { name: 'Context API e State Management', difficulty: 'intermediate' as const },
        { name: 'useReducer e Redux', difficulty: 'intermediate' as const },
        { name: 'Custom Hooks', difficulty: 'intermediate' as const },
        { name: 'Performance e Memoização', difficulty: 'advanced' as const },
        { name: 'Code Splitting e Lazy Loading', difficulty: 'advanced' as const },
        { name: 'Server-Side Rendering (SSR)', difficulty: 'advanced' as const },
        { name: 'Static Site Generation (SSG)', difficulty: 'advanced' as const },
        { name: 'Testing com Jest e RTL', difficulty: 'intermediate' as const },
        { name: 'TypeScript e React', difficulty: 'intermediate' as const },
        { name: 'Styled Components e CSS-in-JS', difficulty: 'intermediate' as const },
        { name: 'React Router e Navegação', difficulty: 'intermediate' as const },
        { name: 'Formulários e Validação', difficulty: 'intermediate' as const },
        { name: 'Autenticação e Autorização', difficulty: 'advanced' as const },
        { name: 'PWA com React', difficulty: 'advanced' as const },
        { name: 'Micro-Frontends', difficulty: 'advanced' as const },
        { name: 'React Native e Mobile', difficulty: 'advanced' as const },
        { name: 'GraphQL e React', difficulty: 'advanced' as const },
        { name: 'WebSockets e Tempo Real', difficulty: 'advanced' as const },
        { name: 'Deploy e CI/CD', difficulty: 'intermediate' as const },
        { name: 'Arquitetura e Padrões', difficulty: 'advanced' as const }
    ];

    reactModules.forEach((moduleInfo, moduleIndex) => {
        const moduleId = (moduleIndex + 1).toString();
        const lessons: CS50Lesson[] = [];

        // Gerar 3 aulas por módulo (total de 60 aulas)
        for (let lessonIndex = 1; lessonIndex <= 3; lessonIndex++) {
            const lessonId = `${moduleId}.${lessonIndex}`;
            const lessonNumber = (moduleIndex * 3) + lessonIndex;

            lessons.push({
                id: lessonId,
                title: `Aula ${lessonNumber}: ${generateReactLessonTitle(moduleInfo.name, lessonIndex)}`,
                description: `Aula ${lessonNumber} do módulo ${moduleInfo.name} - React avançado e padrões`,
                duration: 30 + (lessonIndex * 5), // 30, 35, 40 minutos
                content: generateReactLessonContent(moduleInfo.name, lessonIndex),
                learningObjectives: generateReactLearningObjectives(moduleInfo.name, lessonIndex),
                prerequisites: lessonIndex === 1 ? ['JavaScript intermediário', 'React básico'] : [`Aula ${lessonId.split('.')[0]}.${lessonIndex - 1}`],
                exercises: generateReactExercises(lessonId, moduleInfo.difficulty)
            });
        }

        modules.push({
            id: moduleId,
            name: moduleInfo.name,
            description: `Módulo ${moduleId}: ${moduleInfo.name} - React avançado e padrões ${moduleInfo.difficulty}`,
            lessons,
            totalDuration: lessons.reduce((acc, lesson) => acc + lesson.duration, 0),
            totalPoints: lessons.reduce((acc, lesson) => acc + lesson.exercises.reduce((sum, ex) => sum + ex.points, 0), 0),
            difficulty: moduleInfo.difficulty
        });
    });

    return {
        id: '2',
        name: 'React.js Avançado',
        description: 'Curso avançado de React com padrão CS50 - 20 módulos, 60 aulas, 180+ exercícios',
        totalDuration: modules.reduce((acc, module) => acc + module.totalDuration, 0),
        totalPoints: modules.reduce((acc, module) => acc + module.totalPoints, 0),
        prerequisites: ['JavaScript intermediário', 'Conhecimento básico de React'],
        targetAudience: 'Desenvolvedores com experiência em React',
        realWorldCases: [
            {
                company: 'Netflix',
                description: 'Plataforma de streaming com interface React complexa',
                technology: 'React, Redux, TypeScript',
                impact: 'Milhões de usuários simultâneos'
            },
            {
                company: 'Instagram',
                description: 'Rede social com funcionalidades avançadas',
                technology: 'React Native, GraphQL',
                impact: 'Bilhões de usuários ativos'
            }
        ],
        modules
    };
}

// Funções auxiliares para gerar conteúdo
function generateLessonTitle(moduleName: string, lessonIndex: number): string {
    const lessonTypes = [
        'Fundamentos e Conceitos',
        'Implementação Prática',
        'Projeto Final e Aplicação'
    ];
    return lessonTypes[lessonIndex - 1];
}

function generateReactLessonTitle(moduleName: string, lessonIndex: number): string {
    const lessonTypes = [
        'Teoria e Conceitos',
        'Implementação e Exemplos',
        'Projeto Real e Deploy'
    ];
    return lessonTypes[lessonIndex - 1];
}

function generateLessonContent(moduleName: string, lessonIndex: number): string {
    return `# ${moduleName} - Aula ${lessonIndex}

## 🎯 Objetivos de Aprendizado
- Compreender os fundamentos de ${moduleName}
- Aplicar conceitos em projetos práticos
- Desenvolver habilidades hands-on

## 📚 Conteúdo Principal

### 1. Introdução ao Tópico
${moduleName} é essencial para o desenvolvimento web moderno.

### 2. Conceitos Fundamentais
- Conceito 1: Descrição detalhada
- Conceito 2: Exemplos práticos
- Conceito 3: Aplicações reais

### 3. Implementação Prática
\`\`\`javascript
// Exemplo de código
console.log("Hello, ${moduleName}!");
\`\`\`

### 4. Exercícios e Projetos
- Exercício 1: Descrição
- Exercício 2: Descrição
- Projeto Final: Descrição completa

## 🚀 Próximos Passos
Continue para a próxima aula para aprofundar seus conhecimentos.`;
}

function generateReactLessonContent(moduleName: string, lessonIndex: number): string {
    return `# ${moduleName} - Aula ${lessonIndex}

## 🎯 Objetivos de Aprendizado
- Dominar ${moduleName} em React
- Implementar padrões avançados
- Criar aplicações escaláveis

## 📚 Conteúdo Principal

### 1. Conceitos Avançados
${moduleName} é crucial para React de nível empresarial.

### 2. Implementação React
\`\`\`jsx
import React from 'react';

function ${moduleName.replace(/\s+/g, '')}Component() {
    // Implementação avançada
    return <div>${moduleName} Component</div>;
}
\`\`\`

### 3. Padrões e Melhores Práticas
- Padrão 1: Descrição
- Padrão 2: Implementação
- Padrão 3: Casos de uso

### 4. Projetos Práticos
- Projeto 1: Descrição
- Projeto 2: Descrição
- Projeto Final: Aplicação completa

## 🚀 Deploy e Produção
Prepare-se para colocar sua aplicação em produção.`;
}

function generateLearningObjectives(moduleName: string, lessonIndex: number): string[] {
    return [
        `Compreender os fundamentos de ${moduleName}`,
        `Implementar soluções práticas`,
        `Aplicar conceitos em projetos reais`,
        `Desenvolver habilidades de debugging`,
        `Otimizar performance e qualidade`
    ];
}

function generateReactLearningObjectives(moduleName: string, lessonIndex: number): string[] {
    return [
        `Dominar ${moduleName} em React`,
        `Implementar padrões avançados`,
        `Criar componentes reutilizáveis`,
        `Otimizar performance e bundle size`,
        `Deploy em produção`
    ];
}

function generateExercises(lessonId: string, difficulty: string): CS50Exercise[] {
    const exercises: CS50Exercise[] = [];

    // Gerar 3 exercícios por aula
    for (let i = 1; i <= 3; i++) {
        const exerciseId = `${lessonId}.${i}`;
        const exerciseType = i === 1 ? 'quick' : i === 2 ? 'intermediate' : 'advanced';
        const exerciseDifficulty = difficulty === 'beginner' ? 'easy' : difficulty === 'intermediate' ? 'medium' : 'hard';

        exercises.push({
            id: exerciseId,
            type: exerciseType,
            title: `Exercício ${i}: ${generateExerciseTitle(exerciseType)}`,
            description: `Exercício ${exerciseType} para praticar ${generateExerciseDescription(exerciseType)}`,
            context: `Como desenvolvedor web, você precisa ${generateExerciseContext(exerciseType)}`,
            initialCode: generateInitialCode(exerciseType, exerciseDifficulty),
            expectedOutput: generateExpectedOutput(exerciseType),
            language: 'javascript',
            timeLimit: exerciseType === 'quick' ? 5 : exerciseType === 'intermediate' ? 10 : 15,
            difficulty: exerciseDifficulty,
            points: exerciseType === 'quick' ? 15 : exerciseType === 'intermediate' ? 25 : 40,
            hints: generateHints(exerciseType),
            testCases: generateTestCases(exerciseType),
            solution: generateSolution(exerciseType)
        });
    }

    return exercises;
}

function generateReactExercises(lessonId: string, difficulty: string): CS50Exercise[] {
    const exercises: CS50Exercise[] = [];

    // Gerar 3 exercícios por aula
    for (let i = 1; i <= 3; i++) {
        const exerciseId = `${lessonId}.${i}`;
        const exerciseType = i === 1 ? 'quick' : i === 2 ? 'intermediate' : 'advanced';
        const exerciseDifficulty = difficulty === 'intermediate' ? 'medium' : 'hard';

        exercises.push({
            id: exerciseId,
            type: exerciseType,
            title: `Exercício React ${i}: ${generateReactExerciseTitle(exerciseType)}`,
            description: `Exercício ${exerciseType} para praticar React avançado`,
            context: `Como desenvolvedor React, você precisa ${generateReactExerciseContext(exerciseType)}`,
            initialCode: generateReactInitialCode(exerciseType, exerciseDifficulty),
            expectedOutput: generateReactExpectedOutput(exerciseType),
            language: 'jsx',
            timeLimit: exerciseType === 'quick' ? 8 : exerciseType === 'intermediate' ? 15 : 20,
            difficulty: exerciseDifficulty,
            points: exerciseType === 'quick' ? 20 : exerciseType === 'intermediate' ? 35 : 50,
            hints: generateReactHints(exerciseType),
            testCases: generateReactTestCases(exerciseType),
            solution: generateReactSolution(exerciseType)
        });
    }

    return exercises;
}

// Funções auxiliares para exercícios
function generateExerciseTitle(type: string): string {
    const titles = {
        quick: 'Implementação Rápida',
        intermediate: 'Solução Intermediária',
        advanced: 'Projeto Avançado'
    };
    return titles[type as keyof typeof titles];
}

function generateExerciseDescription(type: string): string {
    const descriptions = {
        quick: 'conceitos básicos e implementação simples',
        intermediate: 'soluções mais complexas e otimização',
        advanced: 'projetos completos e arquitetura'
    };
    return descriptions[type as keyof typeof descriptions];
}

function generateExerciseContext(type: string): string {
    const contexts = {
        quick: 'implementar funcionalidades básicas rapidamente',
        intermediate: 'criar soluções robustas e escaláveis',
        advanced: 'desenvolver sistemas complexos e profissionais'
    };
    return contexts[type as keyof typeof contexts];
}

function generateInitialCode(type: string, difficulty: string): string {
    if (type === 'quick') {
        return `// Implemente a função aqui
function minhaFuncao() {
    // Seu código aqui
}`;
    } else if (type === 'intermediate') {
        return `// Crie uma solução robusta
class MinhaClasse {
    constructor() {
        // Inicialização
    }
    
    // Implemente os métodos
}`;
    } else {
        return `// Projeto completo
// Implemente toda a arquitetura
// Use padrões de design apropriados`;
    }
}

function generateExpectedOutput(type: string): string {
    const outputs = {
        quick: 'Função funcionando corretamente',
        intermediate: 'Classe com métodos implementados',
        advanced: 'Sistema completo funcionando'
    };
    return outputs[type as keyof typeof outputs];
}

function generateHints(type: string): string[] {
    const hints = {
        quick: [
            'Use funções básicas',
            'Verifique a sintaxe',
            'Teste com diferentes inputs'
        ],
        intermediate: [
            'Pense na estrutura de dados',
            'Implemente tratamento de erros',
            'Otimize a performance'
        ],
        advanced: [
            'Use padrões de design',
            'Implemente testes',
            'Considere a escalabilidade'
        ]
    };
    return hints[type as keyof typeof hints];
}

function generateTestCases(type: string): Array<{ input: string, expectedOutput: string, description: string }> {
    return [
        {
            input: 'Input de teste 1',
            expectedOutput: 'Output esperado 1',
            description: 'Caso de teste básico'
        },
        {
            input: 'Input de teste 2',
            expectedOutput: 'Output esperado 2',
            description: 'Caso de teste intermediário'
        }
    ];
}

function generateSolution(type: string): string {
    if (type === 'quick') {
        return `function minhaFuncao() {
    return "Solução implementada";
}`;
    } else if (type === 'intermediate') {
        return `class MinhaClasse {
    constructor() {
        this.valor = 0;
    }
    
    metodo() {
        return this.valor;
    }
}`;
    } else {
        return `// Solução completa do projeto
// Implementação profissional`;
    }
}

// Funções específicas para React
function generateReactExerciseTitle(type: string): string {
    const titles = {
        quick: 'Componente React',
        intermediate: 'Hook Customizado',
        advanced: 'Aplicação Completa'
    };
    return titles[type as keyof typeof titles];
}

function generateReactExerciseContext(type: string): string {
    const contexts = {
        quick: 'criar componentes React funcionais',
        intermediate: 'implementar hooks customizados',
        advanced: 'construir aplicações React completas'
    };
    return contexts[type as keyof typeof contexts];
}

function generateReactInitialCode(type: string, difficulty: string): string {
    if (type === 'quick') {
        return `import React from 'react';

function MeuComponente() {
    // Implemente o componente aqui
    return (
        <div>
            {/* Seu JSX aqui */}
        </div>
    );
}`;
    } else if (type === 'intermediate') {
        return `import React, { useState, useEffect } from 'react';

function useMeuHook() {
    // Implemente o hook customizado
    return {
        // Retorne os valores necessários
    };
}`;
    } else {
        return `import React from 'react';
// Implemente a aplicação completa
// Use roteamento, estado global, etc.`;
    }
}

function generateReactExpectedOutput(type: string): string {
    const outputs = {
        quick: 'Componente renderizando corretamente',
        intermediate: 'Hook customizado funcionando',
        advanced: 'Aplicação React completa funcionando'
    };
    return outputs[type as keyof typeof outputs];
}

function generateReactHints(type: string): string[] {
    const hints = {
        quick: [
            'Use JSX corretamente',
            'Implemente props se necessário',
            'Teste o componente'
        ],
        intermediate: [
            'Siga as regras dos hooks',
            'Use useState e useEffect',
            'Retorne valores úteis'
        ],
        advanced: [
            'Implemente roteamento',
            'Use gerenciamento de estado',
            'Considere performance'
        ]
    };
    return hints[type as keyof typeof hints];
}

function generateReactTestCases(type: string): Array<{ input: string, expectedOutput: string, description: string }> {
    return [
        {
            input: 'Props do componente',
            expectedOutput: 'Renderização correta',
            description: 'Teste de renderização'
        },
        {
            input: 'Estado do componente',
            expectedOutput: 'Mudanças aplicadas',
            description: 'Teste de interatividade'
        }
    ];
}

function generateReactSolution(type: string): string {
    if (type === 'quick') {
        return `function MeuComponente({ titulo }) {
    return <h1>{titulo}</h1>;
}`;
    } else if (type === 'intermediate') {
        return `function useMeuHook() {
    const [valor, setValor] = useState(0);
    
    useEffect(() => {
        // Lógica do hook
    }, []);
    
    return { valor, setValor };
}`;
    } else {
        return `// Solução completa da aplicação React
// Implementação profissional com todas as funcionalidades`;
    }
}

export const cs50Courses: { [key: string]: CS50Course } = {
    '1': generateWebFundamentalsCourse(),
    '2': generateReactAdvancedCourse()
};

export function getCS50Course(courseId: string): CS50Course | null {
    return cs50Courses[courseId] || null;
}

export function getAllCS50Courses(): CS50Course[] {
    return Object.values(cs50Courses);
}
