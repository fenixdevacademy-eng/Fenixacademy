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

export interface SlideElement {
    id: string;
    type: 'text' | 'image' | 'video' | 'button' | 'input' | 'code' | 'diagram';
    content: string;
    position: { x: number; y: number };
    style: {
        color: string;
        size: number;
        shape: 'circle' | 'square' | 'diamond' | 'arrow';
    };
    tooltip?: string;
    clickAction?: string;
    animation?: {
        entrance: 'fade' | 'slide' | 'zoom' | 'bounce';
        duration: number;
        delay: number;
    };
}

export interface InteractiveCourse {
    id: string;
    title: string;
    description: string;
    slides: InteractiveSlide[];
    metadata: {
        author: string;
        version: string;
        lastUpdated: string;
        difficulty: 'beginner' | 'intermediate' | 'advanced';
        duration: number;
        tags: string[];
    };
}

export interface InteractiveElement {
    id: string;
    type: 'button' | 'input' | 'slider' | 'dropdown' | 'checkbox' | 'radio' | 'toggle';
    label: string;
    value: any;
    options?: Array<{ label: string; value: any }>;
    validation?: {
        required: boolean;
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
    style: {
        color: string;
        size: 'small' | 'medium' | 'large';
        variant: 'primary' | 'secondary' | 'outline' | 'ghost';
    };
    position: { x: number; y: number };
    animation?: {
        entrance: 'fade' | 'slide' | 'zoom' | 'bounce';
        duration: number;
        delay: number;
    };
    tooltip?: string;
    clickAction?: string;
}

export interface InteractiveQuiz {
    id: string;
    title: string;
    questions: QuizQuestion[];
    settings: {
        timeLimit?: number;
        attempts: number;
        shuffleQuestions: boolean;
        showCorrectAnswers: boolean;
        passingScore: number;
    };
    results: {
        score: number;
        totalQuestions: number;
        correctAnswers: number;
        timeSpent: number;
        passed: boolean;
    };
}

export interface QuizQuestion {
    id: string;
    question: string;
    type: 'multiple-choice' | 'true-false' | 'fill-in-blank' | 'drag-drop' | 'code';
    options?: string[];
    correctAnswer: any;
    explanation?: string;
    points: number;
    timeLimit?: number;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface InteractiveSimulation {
    id: string;
    title: string;
    description: string;
    steps: SimulationStep[];
    variables: SimulationVariable[];
    controls: SimulationControl[];
    state: Record<string, any>;
    history: SimulationState[];
}

export interface SimulationStep {
    id: string;
    title: string;
    description: string;
    action: string;
    parameters: Record<string, any>;
    expectedResult: string;
    validation: (state: Record<string, any>) => boolean;
}

export interface SimulationVariable {
    id: string;
    name: string;
    type: 'number' | 'string' | 'boolean' | 'array' | 'object';
    value: any;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
}

export interface SimulationControl {
    id: string;
    type: 'slider' | 'input' | 'button' | 'dropdown';
    label: string;
    variable: string;
    options?: Array<{ label: string; value: any }>;
}

export interface SimulationState {
    timestamp: number;
    variables: Record<string, any>;
    step: string;
    completed: boolean;
}

export interface InteractiveTutorial {
    id: string;
    title: string;
    description: string;
    steps: TutorialStep[];
    settings: {
        autoAdvance: boolean;
        showProgress: boolean;
        allowSkip: boolean;
        highlightElements: boolean;
    };
    progress: {
        currentStep: number;
        completedSteps: string[];
        totalSteps: number;
        timeSpent: number;
    };
}

export interface TutorialStep {
    id: string;
    title: string;
    content: string;
    target?: string;
    position: 'top' | 'bottom' | 'left' | 'right' | 'center';
    action: 'click' | 'type' | 'scroll' | 'wait' | 'highlight';
    validation?: (element: HTMLElement) => boolean;
    nextStep?: string;
    previousStep?: string;
}

export interface InteractiveCodeEditor {
    id: string;
    language: string;
    theme: 'light' | 'dark';
    code: string;
    settings: {
        lineNumbers: boolean;
        autoComplete: boolean;
        syntaxHighlighting: boolean;
        wordWrap: boolean;
        tabSize: number;
    };
    features: {
        run: boolean;
        debug: boolean;
        format: boolean;
        save: boolean;
        share: boolean;
    };
    output?: {
        result: string;
        errors: string[];
        warnings: string[];
    };
}

export interface InteractiveDiagram {
    id: string;
    type: 'flowchart' | 'sequence' | 'class' | 'state' | 'network';
    nodes: DiagramNode[];
    edges: DiagramEdge[];
    settings: {
        layout: 'hierarchical' | 'force' | 'circular' | 'grid';
        direction: 'up' | 'down' | 'left' | 'right';
        spacing: number;
        colors: {
            primary: string;
            secondary: string;
            accent: string;
        };
    };
}

export interface DiagramNode {
    id: string;
    label: string;
    type: 'start' | 'end' | 'process' | 'decision' | 'input' | 'output';
    position: { x: number; y: number };
    style: {
        color: string;
        shape: 'rectangle' | 'circle' | 'diamond' | 'hexagon';
        size: { width: number; height: number };
    };
    data?: Record<string, any>;
}

export interface DiagramEdge {
    id: string;
    source: string;
    target: string;
    label?: string;
    style: {
        color: string;
        width: number;
        style: 'solid' | 'dashed' | 'dotted';
        arrow: 'none' | 'forward' | 'backward' | 'both';
    };
    data?: Record<string, any>;
}

export interface InteractiveMedia {
    id: string;
    type: 'image' | 'video' | 'audio' | '3d' | 'ar' | 'vr';
    source: string;
    thumbnail?: string;
    settings: {
        autoplay: boolean;
        loop: boolean;
        muted: boolean;
        controls: boolean;
        fullscreen: boolean;
    };
    annotations: MediaAnnotation[];
    interactions: MediaInteraction[];
}

export interface MediaAnnotation {
    id: string;
    type: 'text' | 'highlight' | 'arrow' | 'circle' | 'rectangle';
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    style: {
        color: string;
        opacity: number;
        fontSize: number;
    };
    timestamp?: number;
}

export interface MediaInteraction {
    id: string;
    type: 'click' | 'hover' | 'drag' | 'pinch' | 'rotate';
    target: string;
    action: string;
    feedback: string;
    position: { x: number; y: number };
    area: { width: number; height: number };
}

export interface InteractiveGame {
    id: string;
    title: string;
    description: string;
    type: 'puzzle' | 'quiz' | 'simulation' | 'adventure' | 'arcade';
    levels: GameLevel[];
    settings: {
        difficulty: 'easy' | 'medium' | 'hard';
        timeLimit?: number;
        lives: number;
        scoring: 'points' | 'time' | 'accuracy';
    };
    progress: {
        currentLevel: number;
        completedLevels: string[];
        score: number;
        achievements: string[];
    };
}

export interface GameLevel {
    id: string;
    title: string;
    description: string;
    objectives: string[];
    rules: string[];
    rewards: {
        points: number;
        badges: string[];
        unlocks: string[];
    };
    state: Record<string, any>;
    validation: (state: Record<string, any>) => boolean;
}

export interface InteractiveAssessment {
    id: string;
    title: string;
    description: string;
    type: 'formative' | 'summative' | 'diagnostic' | 'peer';
    questions: AssessmentQuestion[];
    settings: {
        timeLimit?: number;
        attempts: number;
        shuffleQuestions: boolean;
        showCorrectAnswers: boolean;
        passingScore: number;
        feedback: 'immediate' | 'delayed' | 'none';
    };
    results: {
        score: number;
        totalQuestions: number;
        correctAnswers: number;
        timeSpent: number;
        passed: boolean;
        feedback: string;
    };
}

export interface AssessmentQuestion {
    id: string;
    question: string;
    type: 'multiple-choice' | 'true-false' | 'fill-in-blank' | 'essay' | 'code';
    options?: string[];
    correctAnswer: any;
    explanation?: string;
    points: number;
    timeLimit?: number;
    difficulty: 'easy' | 'medium' | 'hard';
    rubric?: {
        criteria: string[];
        levels: string[];
        scores: number[];
    };
}

export interface InteractiveCollaboration {
    id: string;
    title: string;
    description: string;
    participants: CollaborationParticipant[];
    tools: CollaborationTool[];
    settings: {
        maxParticipants: number;
        allowGuest: boolean;
        requireApproval: boolean;
        recording: boolean;
        chat: boolean;
        screenShare: boolean;
    };
    session: {
        startTime: number;
        endTime?: number;
        status: 'scheduled' | 'active' | 'paused' | 'ended';
        recording?: string;
    };
}

export interface CollaborationParticipant {
    id: string;
    name: string;
    email: string;
    role: 'host' | 'presenter' | 'participant' | 'observer';
    permissions: {
        canEdit: boolean;
        canComment: boolean;
        canShare: boolean;
        canRecord: boolean;
    };
    status: 'online' | 'offline' | 'away' | 'busy';
    lastSeen: number;
}

export interface CollaborationTool {
    id: string;
    type: 'whiteboard' | 'document' | 'code' | 'presentation' | 'chat' | 'video';
    name: string;
    description: string;
    settings: Record<string, any>;
    data: Record<string, any>;
    permissions: {
        canEdit: boolean;
        canView: boolean;
        canComment: boolean;
    };
}

export interface InteractiveAnalytics {
    id: string;
    type: 'engagement' | 'performance' | 'completion' | 'interaction';
    metrics: {
        views: number;
        interactions: number;
        completions: number;
        timeSpent: number;
        dropoffRate: number;
        satisfaction: number;
    };
    data: {
        timestamp: number;
        value: number;
        context: Record<string, any>;
    }[];
    insights: {
        title: string;
        description: string;
        recommendation: string;
        priority: 'low' | 'medium' | 'high';
    }[];
}

export interface InteractiveFeedback {
    id: string;
    type: 'rating' | 'comment' | 'suggestion' | 'bug' | 'feature';
    content: string;
    rating?: number;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    author: {
        id: string;
        name: string;
        email: string;
    };
    timestamp: number;
    responses: {
        id: string;
        content: string;
        author: {
            id: string;
            name: string;
            email: string;
        };
        timestamp: number;
    }[];
}

export interface InteractiveNotification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error' | 'achievement';
    title: string;
    message: string;
    icon?: string;
    action?: {
        label: string;
        url: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    };
    settings: {
        persistent: boolean;
        dismissible: boolean;
        autoHide: boolean;
        duration: number;
    };
    timestamp: number;
    read: boolean;
}

export interface InteractiveSettings {
    id: string;
    theme: 'light' | 'dark' | 'auto';
    language: string;
    accessibility: {
        highContrast: boolean;
        largeText: boolean;
        screenReader: boolean;
        keyboardNavigation: boolean;
    };
    notifications: {
        email: boolean;
        push: boolean;
        inApp: boolean;
        frequency: 'immediate' | 'daily' | 'weekly' | 'never';
    };
    privacy: {
        dataCollection: boolean;
        analytics: boolean;
        personalization: boolean;
        sharing: boolean;
    };
    performance: {
        quality: 'low' | 'medium' | 'high' | 'ultra';
        caching: boolean;
        compression: boolean;
        lazyLoading: boolean;
    };
}

export interface InteractiveElementData {
    slides: InteractiveSlide[];
    courses: InteractiveCourse[];
    quizzes: InteractiveQuiz[];
    simulations: InteractiveSimulation[];
    tutorials: InteractiveTutorial[];
    codeEditors: InteractiveCodeEditor[];
    diagrams: InteractiveDiagram[];
    media: InteractiveMedia[];
    games: InteractiveGame[];
    assessments: InteractiveAssessment[];
    collaborations: InteractiveCollaboration[];
    analytics: InteractiveAnalytics[];
    feedback: InteractiveFeedback[];
    notifications: InteractiveNotification[];
    settings: InteractiveSettings;
}

export const defaultInteractiveElements: InteractiveElementData = {
    slides: [],
    courses: [],
    quizzes: [],
    simulations: [],
    tutorials: [],
    codeEditors: [],
    diagrams: [],
    media: [],
    games: [],
    assessments: [],
    collaborations: [],
    analytics: [],
    feedback: [],
    notifications: [],
    settings: {
        id: 'default-settings',
        theme: 'light',
        language: 'pt-BR',
        accessibility: {
            highContrast: false,
            largeText: false,
            screenReader: false,
            keyboardNavigation: true
        },
        notifications: {
            email: true,
            push: true,
            inApp: true,
            frequency: 'immediate'
        },
        privacy: {
            dataCollection: true,
            analytics: true,
            personalization: true,
            sharing: false
        },
        performance: {
            quality: 'medium',
            caching: true,
            compression: true,
            lazyLoading: true
        }
    }
};