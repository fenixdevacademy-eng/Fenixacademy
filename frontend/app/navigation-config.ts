// Configuração de navegação centralizada para o Fenix Academy
export const navigationConfig = {
    // Rotas principais
    home: '/',
    courses: '/courses',
    about: '/about',
    contact: '/contact',

    // Rotas da IDE
    ide: '/ide',
    ideDemo: '/fenix-ide-v2/demo',
    ideDesktop: '/fenix-ide-v2/desktop',

    // Rotas de cursos
    courseBase: '/course',
    courseRedirect: '/courses/redirect',

    // Rotas específicas de cursos - Nova estrutura com [slug]
    courseRoutes: {
        webFundamentals: '/course/web-fundamentals',
        pythonDataScience: '/course/python-data-science',
        reactAdvanced: '/course/react-advanced',
        nodeJsBackend: '/course/nodejs-apis',
        machineLearning: '/course/machine-learning',
        mobileDevelopment: '/course/flutter-mobile',
        cybersecurity: '/course/cybersecurity',
        devops: '/course/devops-docker',
        flutter: '/course/flutter-mobile',
        awsCloud: '/course/aws-cloud',
        blockchain: '/course/blockchain-smart-contracts',
        reactNative: '/course/react-native-mobile',
        dataEngineering: '/course/data-science',
        gameDevelopment: '/course/game-development',
        uiUxDesign: '/course/ui-ux-design',
        backendDevelopment: '/course/backend-development',
        frontendDevelopment: '/course/frontend-development',
        fullStackDevelopment: '/course/full-stack-development',
        productManagement: '/course/product-management',
        softwareArchitecture: '/course/software-architecture',
        gestaoTrafego: '/course/gestao-trafego'
    },

    // Mapeamento de IDs para slugs - Nova estrutura
    courseIdMapping: {
        1: 'web-fundamentals',
        2: 'python-data-science',
        3: 'react-advanced',
        4: 'nodejs-apis',
        5: 'machine-learning',
        6: 'flutter-mobile',
        7: 'cybersecurity',
        8: 'devops-docker',
        9: 'flutter-mobile',
        10: 'aws-cloud',
        11: 'blockchain-smart-contracts',
        12: 'react-native-mobile',
        13: 'data-science',
        14: 'game-development',
        15: 'ui-ux-design',
        16: 'backend-development',
        17: 'frontend-development',
        18: 'full-stack-development',
        19: 'product-management',
        20: 'software-architecture',
        21: 'gestao-trafego'
    },

    // Função para obter URL do curso por ID
    getCourseUrl: (id: number): string => {
        const slug = navigationConfig.courseIdMapping[id as keyof typeof navigationConfig.courseIdMapping];
        return slug ? `/course/${slug}` : '/courses';
    },

    // Função para obter URL de redirecionamento
    getRedirectUrl: (id: number): string => {
        return `/courses/redirect?id=${id}`;
    },

    // Função para validar se um slug é válido
    isValidCourseSlug: (slug: string): boolean => {
        return Object.values(navigationConfig.courseRoutes).some(courseUrl =>
            courseUrl.includes(slug)
        );
    }
};

// Configuração de breadcrumbs
export const breadcrumbConfig = {
    home: { label: 'Início', href: '/' },
    courses: { label: 'Cursos', href: '/courses' },
    course: { label: 'Curso', href: null }, // Será preenchido dinamicamente
    lesson: { label: 'Aula', href: null }, // Será preenchido dinamicamente
    module: { label: 'Módulo', href: null } // Será preenchido dinamicamente
};

// Configuração de metadados
export const metadataConfig = {
    title: 'Fenix Academy - Cursos de Programação e Tecnologia',
    description: 'Aprenda programação, desenvolvimento web, mobile, data science e muito mais com os melhores cursos online.',
    keywords: 'programação, desenvolvimento web, mobile, data science, machine learning, cursos online',
    author: 'Fenix Academy',
    ogImage: '/og-image.jpg',
    favicon: '/favicon.ico'
};

// Configuração de SEO
export const seoConfig = {
    defaultTitle: 'Fenix Academy',
    titleTemplate: '%s | Fenix Academy',
    defaultDescription: 'Cursos de programação e tecnologia para todos os níveis',
    canonical: 'https://fenixacademy.com',
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://fenixacademy.com',
        siteName: 'Fenix Academy'
    },
    twitter: {
        handle: '@fenixacademy',
        site: '@fenixacademy',
        cardType: 'summary_large_image'
    }
};
