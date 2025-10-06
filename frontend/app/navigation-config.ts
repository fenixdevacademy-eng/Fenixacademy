'use client';

﻿// Configuração de navegação centralizada para o Fenix Academy
export const navigationConfig = {
    // Rotas principais
    home: '/',
    courses: '/courses',
    about: '/about',
    contact: '/contact',
    pricing: '/pricing',
    help: '/help',
    certificates: '/certificates',
    profile: '/profile',
    settings: '/settings',
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',

    // Rotas da IDE
    ide: '/ide-advanced',
    ideDemo: '/fenix-ide-v2/demo',
    ideDesktop: '/fenix-ide-v2/desktop',
    ideTemplates: '/ide-templates',
    ideProjects: '/ide-projects',
    ideCollaboration: '/ide-collaboration',

    // Rotas de cursos
    courseBase: '/course',
    courseRedirect: '/courses/redirect',
    coursePurchase: '/course/[slug]/purchase',
    courseProgress: '/course/[slug]/progress',
    courseCertificate: '/course/[slug]/certificate',

    // Rotas de conteúdo expandido
    expandedCourses: '/expanded-courses',
    expandedCourse: '/expanded-course',
    expandedDashboard: '/expanded-dashboard',
    expandedSearch: '/expanded-search',
    expandedExercises: '/expanded-exercises',
    expandedQuizzes: '/expanded-quizzes',
    expandedPayment: '/expanded-payment',
    expandedPaymentSuccess: '/expanded-payment/success',

    // Rotas específicas de cursos
    courseRoutes: {
        webFundamentals: '/course/web-fundamentals',
        javascriptBasics: '/course/javascript-basics',
        reactAdvanced: '/course/react-advanced',
        nodejsBackend: '/course/nodejs-backend',
        pythonDataScience: '/course/python-data-science',
        machineLearning: '/course/machine-learning',
        cloudComputing: '/course/cloud-computing',
        mobileDevelopment: '/course/mobile-development',
        blockchain: '/course/blockchain',
        cybersecurity: '/course/cybersecurity',
        devops: '/course/devops',
        uiUxDesign: '/course/ui-ux-design',
        projectManagement: '/course/project-management',
        entrepreneurship: '/course/entrepreneurship',
        freelancing: '/course/freelancing',
        consulting: '/course/consulting',
        teaching: '/course/teaching',
        research: '/course/research',
        openSource: '/course/open-source',
        technicalWriting: '/course/technical-writing'
    },

    // Rotas de API
    api: {
        base: '/api',
        auth: '/api/auth',
        courses: '/api/courses',
        users: '/api/users',
        payments: '/api/payments',
        progress: '/api/progress',
        certificates: '/api/certificates',
        analytics: '/api/analytics',
        feedback: '/api/feedback',
        notifications: '/api/notifications',
        collaboration: '/api/collaboration',
        ai: '/api/ai',
        performance: '/api/performance',
        search: '/api/search',
        upload: '/api/upload',
        download: '/api/download'
    },

    // Rotas de administração
    admin: {
        base: '/admin',
        dashboard: '/admin/dashboard',
        users: '/admin/users',
        courses: '/admin/courses',
        analytics: '/admin/analytics',
        settings: '/admin/settings',
        reports: '/admin/reports',
        logs: '/admin/logs'
    },

    // Rotas de CEO
    ceo: {
        base: '/ceo',
        dashboard: '/ceo/dashboard',
        revenue: '/ceo/revenue',
        analytics: '/ceo/analytics',
        reports: '/ceo/reports',
        settings: '/ceo/settings',
        team: '/ceo/team',
        projects: '/ceo/projects'
    },

    // Rotas de funcionalidades
    features: {
        aiChat: '/ai-chat',
        collaboration: '/collaboration',
        performance: '/performance',
        analytics: '/analytics',
        feedback: '/feedback',
        notifications: '/notifications',
        search: '/search',
        settings: '/settings',
        profile: '/profile',
        support: '/support',
        help: '/help',
        documentation: '/documentation',
        tutorials: '/tutorials',
        guides: '/guides',
        examples: '/examples',
        templates: '/templates',
        tools: '/tools',
        utilities: '/utilities'
    }
};

// Função helper para gerar rotas dinâmicas
export function generateRoute(route: string, params: Record<string, string> = {}): string {
    let generatedRoute = route;

    Object.entries(params).forEach(([key, value]) => {
        generatedRoute = generatedRoute.replace(`[${key}]`, value);
    });

    return generatedRoute;
}

// Função helper para verificar se uma rota é ativa
export function isActiveRoute(currentPath: string, targetRoute: string): boolean {
    if (targetRoute === '/') {
        return currentPath === '/';
    }

    return currentPath.startsWith(targetRoute);
}

// Função helper para obter breadcrumbs
export function getBreadcrumbs(pathname: string): Array<{ label: string; href: string }> {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
}

// Função helper para obter rotas de navegação
export function getNavigationRoutes(): Array<{ label: string; href: string; children?: Array<{ label: string; href: string }> }> {
    return [
        {
            label: 'Home',
            href: navigationConfig.home
        },
        {
            label: 'Cursos',
            href: navigationConfig.courses,
            children: [
                { label: 'Todos os Cursos', href: navigationConfig.courses },
                { label: 'Fundamentos Web', href: navigationConfig.courseRoutes.webFundamentals },
                { label: 'JavaScript', href: navigationConfig.courseRoutes.javascriptBasics },
                { label: 'React', href: navigationConfig.courseRoutes.reactAdvanced },
                { label: 'Node.js', href: navigationConfig.courseRoutes.nodejsBackend },
                { label: 'Python', href: navigationConfig.courseRoutes.pythonDataScience },
                { label: 'Machine Learning', href: navigationConfig.courseRoutes.machineLearning }
            ]
        },
        {
            label: 'IDE',
            href: navigationConfig.ide,
            children: [
                { label: 'IDE Avançado', href: navigationConfig.ide },
                { label: 'Demo', href: navigationConfig.ideDemo },
                { label: 'Desktop', href: navigationConfig.ideDesktop },
                { label: 'Templates', href: navigationConfig.ideTemplates },
                { label: 'Projetos', href: navigationConfig.ideProjects },
                { label: 'Colaboração', href: navigationConfig.ideCollaboration }
            ]
        },
        {
            label: 'Recursos',
            href: navigationConfig.features.aiChat,
            children: [
                { label: 'AI Chat', href: navigationConfig.features.aiChat },
                { label: 'Colaboração', href: navigationConfig.features.collaboration },
                { label: 'Performance', href: navigationConfig.features.performance },
                { label: 'Analytics', href: navigationConfig.features.analytics },
                { label: 'Feedback', href: navigationConfig.features.feedback },
                { label: 'Notificações', href: navigationConfig.features.notifications }
            ]
        },
        {
            label: 'Sobre',
            href: navigationConfig.about
        },
        {
            label: 'Contato',
            href: navigationConfig.contact
        }
    ];
}

export default navigationConfig;