// Configuração de rotas para os cursos da Fenix Academy
export const courseRoutes = {
    // Mapeamento de IDs para slugs
    idToSlug: {
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

    // Mapeamento de slugs para IDs
    slugToId: {
        'web-fundamentals': 1,
        'python-data-science': 2,
        'react-advanced': 3,
        'nodejs-apis': 4,
        'machine-learning': 5,
        'flutter-mobile': 6,
        'cybersecurity': 7,
        'devops-docker': 8,
        'aws-cloud': 10,
        'blockchain-smart-contracts': 11,
        'react-native-mobile': 12,
        'data-science': 13,
        'game-development': 14,
        'ui-ux-design': 15,
        'backend-development': 16,
        'frontend-development': 17,
        'full-stack-development': 18,
        'product-management': 19,
        'software-architecture': 20,
        'gestao-trafego': 21
    },

    // URLs completas dos cursos
    courseUrls: {
        'web-fundamentals': '/course/web-fundamentals',
        'python-data-science': '/course/python-data-science',
        'react-advanced': '/course/react-advanced',
        'nodejs-apis': '/course/nodejs-apis',
        'machine-learning': '/course/machine-learning',
        'flutter-mobile': '/course/flutter-mobile',
        'cybersecurity': '/course/cybersecurity',
        'devops-docker': '/course/devops-docker',
        'aws-cloud': '/course/aws-cloud',
        'blockchain-smart-contracts': '/course/blockchain-smart-contracts',
        'react-native-mobile': '/course/react-native-mobile',
        'data-science': '/course/data-science',
        'game-development': '/course/game-development',
        'ui-ux-design': '/course/ui-ux-design',
        'backend-development': '/course/backend-development',
        'frontend-development': '/course/frontend-development',
        'full-stack-development': '/course/full-stack-development',
        'product-management': '/course/product-management',
        'software-architecture': '/course/software-architecture',
        'gestao-trafego': '/course/gestao-trafego'
    },

    // Metadados dos cursos
    courseMetadata: {
        'web-fundamentals': {
            title: 'Fundamentos de Desenvolvimento Web',
            description: 'Curso completo de fundamentos web com HTML5, CSS3 e JavaScript moderno',
            category: 'Frontend',
            level: 'Iniciante',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'python-data-science': {
            title: 'Python para Data Science',
            description: 'Curso completo de Python aplicado à ciência de dados e análise',
            category: 'Data Science',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'react-advanced': {
            title: 'React Avançado e Moderno',
            description: 'Curso avançado de React com hooks, context e padrões modernos',
            category: 'Frontend',
            level: 'Avançado',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'nodejs-apis': {
            title: 'Node.js e APIs Backend',
            description: 'Desenvolvimento de APIs robustas com Node.js e Express',
            category: 'Backend',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'machine-learning': {
            title: 'Machine Learning',
            description: 'Fundamentos e aplicações práticas de machine learning',
            category: 'AI/ML',
            level: 'Avançado',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'flutter-mobile': {
            title: 'Flutter para Desenvolvimento Mobile',
            description: 'Desenvolvimento de apps mobile cross-platform com Flutter',
            category: 'Mobile',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'cybersecurity': {
            title: 'Cibersegurança',
            description: 'Fundamentos de segurança da informação e proteção de dados',
            category: 'Security',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'devops-docker': {
            title: 'DevOps e Docker',
            description: 'Práticas de DevOps e containerização com Docker',
            category: 'DevOps',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'aws-cloud': {
            title: 'AWS Cloud Computing',
            description: 'Serviços e arquiteturas na nuvem AWS',
            category: 'Cloud',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'blockchain-smart-contracts': {
            title: 'Blockchain e Smart Contracts',
            description: 'Desenvolvimento de aplicações blockchain e contratos inteligentes',
            category: 'Blockchain',
            level: 'Avançado',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'react-native-mobile': {
            title: 'React Native Mobile',
            description: 'Desenvolvimento mobile cross-platform com React Native',
            category: 'Mobile',
            level: 'Avançado',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'data-science': {
            title: 'Data Science',
            description: 'Ciência de dados, análise e visualização',
            category: 'Data Science',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'game-development': {
            title: 'Game Development',
            description: 'Desenvolvimento de jogos com engines modernas',
            category: 'Game Dev',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'ui-ux-design': {
            title: 'UI/UX Design',
            description: 'Design de interfaces e experiência do usuário',
            category: 'Design',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'backend-development': {
            title: 'Backend Development',
            description: 'Desenvolvimento de sistemas backend robustos',
            category: 'Backend',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'frontend-development': {
            title: 'Frontend Development',
            description: 'Desenvolvimento frontend moderno e responsivo',
            category: 'Frontend',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'full-stack-development': {
            title: 'Full Stack Development',
            description: 'Desenvolvimento completo frontend e backend',
            category: 'Full Stack',
            level: 'Avançado',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'product-management': {
            title: 'Product Management',
            description: 'Gestão de produtos digitais e metodologias ágeis',
            category: 'Management',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'software-architecture': {
            title: 'Software Architecture',
            description: 'Arquitetura de software e padrões de design',
            category: 'Architecture',
            level: 'Avançado',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        },
        'gestao-trafego': {
            title: 'Gestão de Tráfego',
            description: 'Marketing digital e gestão de campanhas online',
            category: 'Marketing',
            level: 'Intermediário',
            duration: '130 horas',
            lessons: 160,
            modules: 10
        }
    },

    // Funções utilitárias
    utils: {
        // Obter URL do curso por ID
        getCourseUrlById: (id: number): string => {
            const slug = courseRoutes.idToSlug[id as keyof typeof courseRoutes.idToSlug];
            return slug ? `/course/${slug}` : '/courses';
        },

        // Obter URL do curso por slug
        getCourseUrlBySlug: (slug: string): string => {
            return courseRoutes.courseUrls[slug as keyof typeof courseRoutes.courseUrls] || '/courses';
        },

        // Obter ID do curso por slug
        getCourseIdBySlug: (slug: string): number | null => {
            return courseRoutes.slugToId[slug as keyof typeof courseRoutes.slugToId] || null;
        },

        // Validar se um slug é válido
        isValidSlug: (slug: string): boolean => {
            return slug in courseRoutes.slugToId;
        },

        // Obter metadados do curso por slug
        getCourseMetadata: (slug: string) => {
            return courseRoutes.courseMetadata[slug as keyof typeof courseRoutes.courseMetadata];
        },

        // Listar todos os slugs válidos
        getAllSlugs: (): string[] => {
            return Object.keys(courseRoutes.slugToId);
        },

        // Listar todos os IDs válidos
        getAllIds: (): number[] => {
            return Object.keys(courseRoutes.idToSlug).map(Number);
        }
    }
};

// Exportar configurações individuais para uso direto
export const { idToSlug, slugToId, courseUrls, courseMetadata, utils } = courseRoutes;

// Exportar como padrão para compatibilidade
export default courseRoutes;
