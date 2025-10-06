'use client';

﻿// Dados completos dos 26 cursos da Fenix Academy
export interface Course {
    id: string;
    title: string;
    description: string;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    instructor: string;
    rating: number;
    students: number;
    category: string;
    tags: string[];
    slug: string;
    lessons: Lesson[];
    modules?: Module[];
    projects?: Project[];
    quizzes?: Quiz[];
    exercises?: Exercise[];
    isPopular?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    language: string;
    prerequisites?: string[];
    whatYouWillLearn?: string[];
    certificate?: boolean;
    lifetimeAccess?: boolean;
    mobileFriendly?: boolean;
    support?: string;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;
    type: 'video' | 'text' | 'quiz' | 'exercise' | 'project';
    content: string;
    order: number;
    completed?: boolean;
    isLocked?: boolean;
    videoUrl?: string;
    resources?: Resource[];
}

export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    order: number;
    duration: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedTime: string;
    technologies: string[];
    requirements: string[];
    deliverables: string[];
}

export interface Quiz {
    id: string;
    title: string;
    questions: Question[];
    timeLimit: number;
    passingScore: number;
    attempts: number;
    maxAttempts: number;
}

export interface Question {
    id: string;
    text: string;
    type: 'multiple-choice' | 'true-false' | 'multiple-select';
    options: Option[];
    correctAnswers: string[];
    explanation?: string;
    points: number;
}

export interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface Exercise {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedTime: string;
    instructions: string;
    starterCode?: string;
    solution?: string;
    tests?: Test[];
    hints?: Hint[];
}

export interface Test {
    id: string;
    description: string;
    input: any;
    expectedOutput: any;
}

export interface Hint {
    id: string;
    text: string;
    cost: number;
    isUnlocked?: boolean;
}

export interface Resource {
    id: string;
    title: string;
    type: 'pdf' | 'video' | 'code' | 'link';
    url: string;
    description?: string;
}

export const courses: Course[] = [
    // 1. Fundamentos de Programação
    {
        id: '1',
        title: 'Fundamentos de Programação',
        description: 'Aprenda os conceitos básicos de programação com Python, incluindo variáveis, estruturas de controle, funções e orientação a objetos.',
        duration: '40 horas',
        level: 'beginner',
        price: 199.90,
        originalPrice: 399.90,
        discount: 50,
        image: '/images/courses/fundamentos-programacao.jpg',
        instructor: 'Dr. João Silva',
        rating: 4.8,
        students: 1250,
        category: 'Programação',
        tags: ['Python', 'Básico', 'Lógica', 'Algoritmos'],
        slug: 'fundamentos-programacao',
        language: 'Português',
        prerequisites: ['Nenhum pré-requisito'],
        whatYouWillLearn: [
            'Conceitos fundamentais de programação',
            'Sintaxe e estrutura do Python',
            'Estruturas de controle (if, for, while)',
            'Funções e módulos',
            'Orientação a objetos básica',
            'Tratamento de erros'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat e fórum',
        isPopular: true,
        lessons: [
            {
                id: '1-1',
                title: 'Introdução à Programação',
                description: 'Conceitos fundamentais e primeiro programa',
                duration: '2 horas',
                type: 'video',
                content: 'Nesta aula você aprenderá os conceitos básicos de programação...',
                order: 1,
                videoUrl: '/videos/fundamentos-1.mp4'
            }
        ]
    },

    // 2. Desenvolvimento Web Moderno
    {
        id: '2',
        title: 'Desenvolvimento Web Moderno',
        description: 'Crie aplicações web modernas com React, Next.js, TypeScript e as melhores práticas da indústria.',
        duration: '80 horas',
        level: 'intermediate',
        price: 599.90,
        originalPrice: 999.90,
        discount: 40,
        image: '/images/courses/desenvolvimento-web-moderno.jpg',
        instructor: 'Maria Santos',
        rating: 4.9,
        students: 890,
        category: 'Desenvolvimento Web',
        tags: ['React', 'Next.js', 'TypeScript', 'JavaScript'],
        slug: 'desenvolvimento-web-moderno',
        language: 'Português',
        prerequisites: ['Conhecimento básico de JavaScript', 'HTML e CSS'],
        whatYouWillLearn: [
            'React e componentes funcionais',
            'Next.js e SSR/SSG',
            'TypeScript para JavaScript tipado',
            'Gerenciamento de estado com Redux',
            'Testes com Jest e React Testing Library',
            'Deploy e otimização'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte prioritário',
        isFeatured: true,
        lessons: [
            {
                id: '2-1',
                title: 'Introdução ao React',
                description: 'Componentes, JSX e hooks básicos',
                duration: '3 horas',
                type: 'video',
                content: 'Aprenda os fundamentos do React...',
                order: 1,
                videoUrl: '/videos/react-1.mp4'
            }
        ]
    },

    // 3. Python para Data Science
    {
        id: '3',
        title: 'Python para Data Science',
        description: 'Domine Python para análise de dados, machine learning e visualização com pandas, numpy e scikit-learn.',
        duration: '60 horas',
        level: 'intermediate',
        price: 499.90,
        originalPrice: 799.90,
        discount: 37,
        image: '/images/courses/python-data-science.jpg',
        instructor: 'Dr. Ana Costa',
        rating: 4.7,
        students: 1100,
        category: 'Data Science',
        tags: ['Python', 'Pandas', 'NumPy', 'Machine Learning'],
        slug: 'python-data-science',
        language: 'Português',
        prerequisites: ['Conhecimento básico de Python', 'Matemática básica'],
        whatYouWillLearn: [
            'Manipulação de dados com Pandas',
            'Análise estatística com NumPy',
            'Visualização com Matplotlib e Seaborn',
            'Machine Learning com Scikit-learn',
            'Análise exploratória de dados',
            'Projetos práticos de data science'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        isPopular: true,
        lessons: []
    },

    // 4. JavaScript Avançado
    {
        id: '4',
        title: 'JavaScript Avançado',
        description: 'Aprofunde seus conhecimentos em JavaScript com ES6+, async/await, design patterns e performance.',
        duration: '50 horas',
        level: 'advanced',
        price: 449.90,
        originalPrice: 699.90,
        discount: 36,
        image: '/images/courses/javascript-avancado.jpg',
        instructor: 'Carlos Oliveira',
        rating: 4.8,
        students: 750,
        category: 'Programação',
        tags: ['JavaScript', 'ES6+', 'Async/Await', 'Design Patterns'],
        slug: 'javascript-avancado',
        language: 'Português',
        prerequisites: ['Conhecimento intermediário de JavaScript'],
        whatYouWillLearn: [
            'ES6+ e recursos modernos',
            'Async/await e Promises',
            'Design patterns em JavaScript',
            'Otimização de performance',
            'Testes unitários e integração',
            'Arquitetura de aplicações'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 5. React Native - Apps Mobile
    {
        id: '5',
        title: 'React Native - Apps Mobile',
        description: 'Desenvolva aplicativos mobile nativos para iOS e Android usando React Native e as melhores práticas.',
        duration: '70 horas',
        level: 'intermediate',
        price: 549.90,
        originalPrice: 899.90,
        discount: 39,
        image: '/images/courses/react-native.jpg',
        instructor: 'Fernanda Lima',
        rating: 4.6,
        students: 650,
        category: 'Mobile',
        tags: ['React Native', 'Mobile', 'iOS', 'Android'],
        slug: 'react-native-apps-mobile',
        language: 'Português',
        prerequisites: ['Conhecimento de React', 'JavaScript ES6+'],
        whatYouWillLearn: [
            'Fundamentos do React Native',
            'Navegação entre telas',
            'Integração com APIs',
            'Notificações push',
            'Publicação nas stores',
            'Performance e otimização'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 6. Node.js e APIs REST
    {
        id: '6',
        title: 'Node.js e APIs REST',
        description: 'Construa APIs robustas e escaláveis com Node.js, Express, MongoDB e as melhores práticas de backend.',
        duration: '65 horas',
        level: 'intermediate',
        price: 479.90,
        originalPrice: 749.90,
        discount: 36,
        image: '/images/courses/nodejs-apis.jpg',
        instructor: 'Roberto Silva',
        rating: 4.7,
        students: 820,
        category: 'Backend',
        tags: ['Node.js', 'Express', 'MongoDB', 'APIs'],
        slug: 'nodejs-apis-rest',
        language: 'Português',
        prerequisites: ['Conhecimento de JavaScript', 'Conceitos básicos de HTTP'],
        whatYouWillLearn: [
            'Fundamentos do Node.js',
            'Express.js e middleware',
            'Banco de dados MongoDB',
            'Autenticação e autorização',
            'Testes de API',
            'Deploy e monitoramento'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        isPopular: true,
        lessons: []
    },

    // 7. Vue.js Completo
    {
        id: '7',
        title: 'Vue.js Completo',
        description: 'Aprenda Vue.js do zero ao avançado, incluindo Vuex, Vue Router e composição de componentes.',
        duration: '55 horas',
        level: 'intermediate',
        price: 429.90,
        originalPrice: 699.90,
        discount: 39,
        image: '/images/courses/vuejs-completo.jpg',
        instructor: 'Patricia Santos',
        rating: 4.5,
        students: 580,
        category: 'Desenvolvimento Web',
        tags: ['Vue.js', 'Vuex', 'Vue Router', 'JavaScript'],
        slug: 'vuejs-completo',
        language: 'Português',
        prerequisites: ['Conhecimento de JavaScript', 'HTML e CSS'],
        whatYouWillLearn: [
            'Fundamentos do Vue.js',
            'Componentes e props',
            'Gerenciamento de estado com Vuex',
            'Roteamento com Vue Router',
            'Composição API',
            'Testes e deploy'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 8. Angular Avançado
    {
        id: '8',
        title: 'Angular Avançado',
        description: 'Domine Angular com TypeScript, incluindo serviços, pipes, guards e as melhores práticas enterprise.',
        duration: '75 horas',
        level: 'advanced',
        price: 579.90,
        originalPrice: 949.90,
        discount: 39,
        image: '/images/courses/angular-avancado.jpg',
        instructor: 'Marcos Pereira',
        rating: 4.6,
        students: 420,
        category: 'Desenvolvimento Web',
        tags: ['Angular', 'TypeScript', 'RxJS', 'Enterprise'],
        slug: 'angular-avancado',
        language: 'Português',
        prerequisites: ['Conhecimento de TypeScript', 'Conceitos de SPA'],
        whatYouWillLearn: [
            'Arquitetura do Angular',
            'Serviços e injeção de dependência',
            'RxJS e programação reativa',
            'Guards e interceptors',
            'Testes unitários e e2e',
            'Deploy e otimização'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte prioritário',
        lessons: []
    },

    // 9. Flutter - Apps Mobile
    {
        id: '9',
        title: 'Flutter - Apps Mobile',
        description: 'Desenvolva aplicativos mobile nativos com Flutter e Dart, para iOS e Android com uma única base de código.',
        duration: '80 horas',
        level: 'intermediate',
        price: 599.90,
        originalPrice: 999.90,
        discount: 40,
        image: '/images/courses/flutter-apps.jpg',
        instructor: 'Lucas Ferreira',
        rating: 4.8,
        students: 720,
        category: 'Mobile',
        tags: ['Flutter', 'Dart', 'Mobile', 'Cross-platform'],
        slug: 'flutter-apps-mobile',
        language: 'Português',
        prerequisites: ['Conhecimento básico de programação'],
        whatYouWillLearn: [
            'Fundamentos do Flutter e Dart',
            'Widgets e layout',
            'Navegação e roteamento',
            'Integração com APIs',
            'Estado e gerenciamento de dados',
            'Publicação nas stores'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        isFeatured: true,
        lessons: []
    },

    // 10. Java Spring Boot
    {
        id: '10',
        title: 'Java Spring Boot',
        description: 'Desenvolva aplicações enterprise com Java Spring Boot, incluindo microserviços e integração com bancos de dados.',
        duration: '70 horas',
        level: 'intermediate',
        price: 529.90,
        originalPrice: 849.90,
        discount: 38,
        image: '/images/courses/java-spring-boot.jpg',
        instructor: 'Dr. Rafael Almeida',
        rating: 4.7,
        students: 680,
        category: 'Backend',
        tags: ['Java', 'Spring Boot', 'Microserviços', 'Enterprise'],
        slug: 'java-spring-boot',
        language: 'Português',
        prerequisites: ['Conhecimento de Java', 'Conceitos de OOP'],
        whatYouWillLearn: [
            'Fundamentos do Spring Boot',
            'Spring Data JPA',
            'Spring Security',
            'Microserviços',
            'Testes e documentação',
            'Deploy e monitoramento'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 11. C# e .NET Core
    {
        id: '11',
        title: 'C# e .NET Core',
        description: 'Desenvolva aplicações modernas com C# e .NET Core, incluindo APIs, web apps e aplicações desktop.',
        duration: '60 horas',
        level: 'intermediate',
        price: 489.90,
        originalPrice: 799.90,
        discount: 39,
        image: '/images/courses/csharp-dotnet.jpg',
        instructor: 'Sandra Costa',
        rating: 4.6,
        students: 540,
        category: 'Backend',
        tags: ['C#', '.NET Core', 'ASP.NET', 'Entity Framework'],
        slug: 'csharp-dotnet-core',
        language: 'Português',
        prerequisites: ['Conhecimento básico de programação'],
        whatYouWillLearn: [
            'Fundamentos do C#',
            'ASP.NET Core',
            'Entity Framework Core',
            'APIs REST',
            'Autenticação e autorização',
            'Deploy e cloud'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 12. PHP Laravel
    {
        id: '12',
        title: 'PHP Laravel',
        description: 'Desenvolva aplicações web robustas com PHP Laravel, incluindo APIs, autenticação e as melhores práticas.',
        duration: '55 horas',
        level: 'intermediate',
        price: 419.90,
        originalPrice: 699.90,
        discount: 40,
        image: '/images/courses/php-laravel.jpg',
        instructor: 'Diego Santos',
        rating: 4.5,
        students: 620,
        category: 'Backend',
        tags: ['PHP', 'Laravel', 'MySQL', 'APIs'],
        slug: 'php-laravel',
        language: 'Português',
        prerequisites: ['Conhecimento de PHP', 'HTML e CSS'],
        whatYouWillLearn: [
            'Fundamentos do Laravel',
            'Eloquent ORM',
            'Autenticação e autorização',
            'APIs REST',
            'Testes automatizados',
            'Deploy e otimização'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 13. Python Django
    {
        id: '13',
        title: 'Python Django',
        description: 'Construa aplicações web completas com Python Django, incluindo admin, ORM e deploy em produção.',
        duration: '65 horas',
        level: 'intermediate',
        price: 459.90,
        originalPrice: 749.90,
        discount: 39,
        image: '/images/courses/python-django.jpg',
        instructor: 'Camila Oliveira',
        rating: 4.7,
        students: 580,
        category: 'Backend',
        tags: ['Python', 'Django', 'PostgreSQL', 'Web Development'],
        slug: 'python-django',
        language: 'Português',
        prerequisites: ['Conhecimento de Python', 'HTML e CSS'],
        whatYouWillLearn: [
            'Fundamentos do Django',
            'Models e ORM',
            'Views e templates',
            'Sistema de autenticação',
            'APIs REST com DRF',
            'Deploy e produção'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 14. SQL e Bancos de Dados
    {
        id: '14',
        title: 'SQL e Bancos de Dados',
        description: 'Domine SQL e bancos de dados relacionais, incluindo MySQL, PostgreSQL e otimização de consultas.',
        duration: '45 horas',
        level: 'beginner',
        price: 299.90,
        originalPrice: 499.90,
        discount: 40,
        image: '/images/courses/sql-bancos-dados.jpg',
        instructor: 'Bruno Lima',
        rating: 4.8,
        students: 950,
        category: 'Banco de Dados',
        tags: ['SQL', 'MySQL', 'PostgreSQL', 'Database'],
        slug: 'sql-bancos-dados',
        language: 'Português',
        prerequisites: ['Nenhum pré-requisito'],
        whatYouWillLearn: [
            'Fundamentos de SQL',
            'Consultas complexas',
            'Joins e relacionamentos',
            'Índices e performance',
            'Stored procedures',
            'Administração de banco'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        isPopular: true,
        lessons: []
    },

    // 15. MongoDB e NoSQL
    {
        id: '15',
        title: 'MongoDB e NoSQL',
        description: 'Aprenda bancos de dados NoSQL com MongoDB, incluindo agregações, índices e integração com aplicações.',
        duration: '40 horas',
        level: 'intermediate',
        price: 349.90,
        originalPrice: 599.90,
        discount: 42,
        image: '/images/courses/mongodb-nosql.jpg',
        instructor: 'André Silva',
        rating: 4.6,
        students: 480,
        category: 'Banco de Dados',
        tags: ['MongoDB', 'NoSQL', 'JSON', 'Database'],
        slug: 'mongodb-nosql',
        language: 'Português',
        prerequisites: ['Conhecimento básico de programação'],
        whatYouWillLearn: [
            'Fundamentos do MongoDB',
            'Consultas e agregações',
            'Índices e performance',
            'Replicação e sharding',
            'Integração com aplicações',
            'Administração e backup'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 16. Docker e DevOps
    {
        id: '16',
        title: 'Docker e DevOps',
        description: 'Aprenda containerização com Docker, orquestração com Kubernetes e práticas de DevOps modernas.',
        duration: '50 horas',
        level: 'intermediate',
        price: 479.90,
        originalPrice: 799.90,
        discount: 40,
        image: '/images/courses/docker-devops.jpg',
        instructor: 'Eduardo Costa',
        rating: 4.7,
        students: 520,
        category: 'DevOps',
        tags: ['Docker', 'Kubernetes', 'DevOps', 'CI/CD'],
        slug: 'docker-devops',
        language: 'Português',
        prerequisites: ['Conhecimento básico de Linux', 'Conceitos de desenvolvimento'],
        whatYouWillLearn: [
            'Fundamentos do Docker',
            'Criação de containers',
            'Docker Compose',
            'Kubernetes básico',
            'CI/CD com GitHub Actions',
            'Monitoramento e logs'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        isFeatured: true,
        lessons: []
    },

    // 17. AWS Cloud Computing
    {
        id: '17',
        title: 'AWS Cloud Computing',
        description: 'Domine a Amazon Web Services, incluindo EC2, S3, Lambda, RDS e arquiteturas cloud escaláveis.',
        duration: '70 horas',
        level: 'advanced',
        price: 649.90,
        originalPrice: 1099.90,
        discount: 41,
        image: '/images/courses/aws-cloud.jpg',
        instructor: 'Dr. Mariana Santos',
        rating: 4.8,
        students: 380,
        category: 'Cloud Computing',
        tags: ['AWS', 'Cloud', 'EC2', 'S3', 'Lambda'],
        slug: 'aws-cloud-computing',
        language: 'Português',
        prerequisites: ['Conhecimento de Linux', 'Conceitos de rede'],
        whatYouWillLearn: [
            'Fundamentos da AWS',
            'EC2 e computação',
            'S3 e armazenamento',
            'Lambda e serverless',
            'RDS e bancos de dados',
            'Arquiteturas cloud'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte prioritário',
        lessons: []
    },

    // 18. Machine Learning com Python
    {
        id: '18',
        title: 'Machine Learning com Python',
        description: 'Aprenda machine learning do zero com Python, incluindo algoritmos, deep learning e projetos práticos.',
        duration: '80 horas',
        level: 'advanced',
        price: 699.90,
        originalPrice: 1199.90,
        discount: 42,
        image: '/images/courses/machine-learning-python.jpg',
        instructor: 'Dr. Carlos Mendes',
        rating: 4.9,
        students: 420,
        category: 'Machine Learning',
        tags: ['Python', 'Machine Learning', 'TensorFlow', 'Scikit-learn'],
        slug: 'machine-learning-python',
        language: 'Português',
        prerequisites: ['Conhecimento de Python', 'Matemática básica', 'Estatística'],
        whatYouWillLearn: [
            'Fundamentos de ML',
            'Algoritmos supervisionados',
            'Algoritmos não-supervisionados',
            'Deep Learning com TensorFlow',
            'Processamento de dados',
            'Projetos práticos'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte prioritário',
        isFeatured: true,
        lessons: []
    },

    // 19. Deep Learning e Neural Networks
    {
        id: '19',
        title: 'Deep Learning e Neural Networks',
        description: 'Aprofunde-se em deep learning com TensorFlow e PyTorch, incluindo CNNs, RNNs e GANs.',
        duration: '90 horas',
        level: 'advanced',
        price: 799.90,
        originalPrice: 1399.90,
        discount: 43,
        image: '/images/courses/deep-learning.jpg',
        instructor: 'Dr. Ana Beatriz',
        rating: 4.8,
        students: 280,
        category: 'Machine Learning',
        tags: ['Deep Learning', 'TensorFlow', 'PyTorch', 'Neural Networks'],
        slug: 'deep-learning-neural-networks',
        language: 'Português',
        prerequisites: ['Machine Learning com Python', 'Matemática avançada'],
        whatYouWillLearn: [
            'Fundamentos de deep learning',
            'Redes neurais convolucionais',
            'Redes neurais recorrentes',
            'TensorFlow e PyTorch',
            'Transfer learning',
            'Projetos avançados'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte prioritário',
        lessons: []
    },

    // 20. Cybersecurity Essentials
    {
        id: '20',
        title: 'Cybersecurity Essentials',
        description: 'Aprenda os fundamentos de segurança cibernética, incluindo vulnerabilidades, ataques e proteção.',
        duration: '60 horas',
        level: 'intermediate',
        price: 549.90,
        originalPrice: 899.90,
        discount: 39,
        image: '/images/courses/cybersecurity.jpg',
        instructor: 'Dr. Paulo Security',
        rating: 4.7,
        students: 350,
        category: 'Cybersecurity',
        tags: ['Security', 'Ethical Hacking', 'Penetration Testing', 'Network Security'],
        slug: 'cybersecurity-essentials',
        language: 'Português',
        prerequisites: ['Conhecimento de redes', 'Linux básico'],
        whatYouWillLearn: [
            'Fundamentos de segurança',
            'Análise de vulnerabilidades',
            'Testes de penetração',
            'Segurança de redes',
            'Criptografia',
            'Compliance e auditoria'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 21. Blockchain e Criptomoedas
    {
        id: '21',
        title: 'Blockchain e Criptomoedas',
        description: 'Aprenda blockchain, smart contracts com Solidity e desenvolvimento de aplicações descentralizadas.',
        duration: '70 horas',
        level: 'advanced',
        price: 679.90,
        originalPrice: 1149.90,
        discount: 41,
        image: '/images/courses/blockchain-cripto.jpg',
        instructor: 'Dr. Blockchain Expert',
        rating: 4.6,
        students: 320,
        category: 'Blockchain',
        tags: ['Blockchain', 'Ethereum', 'Solidity', 'Smart Contracts'],
        slug: 'blockchain-criptomoedas',
        language: 'Português',
        prerequisites: ['Conhecimento de programação', 'Conceitos de criptografia'],
        whatYouWillLearn: [
            'Fundamentos de blockchain',
            'Ethereum e smart contracts',
            'Solidity e desenvolvimento',
            'DeFi e NFTs',
            'Segurança em blockchain',
            'Projetos práticos'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte prioritário',
        lessons: []
    },

    // 22. UI/UX Design
    {
        id: '22',
        title: 'UI/UX Design',
        description: 'Aprenda design de interfaces e experiência do usuário, incluindo Figma, prototipagem e design thinking.',
        duration: '55 horas',
        level: 'beginner',
        price: 399.90,
        originalPrice: 699.90,
        discount: 43,
        image: '/images/courses/ui-ux-design.jpg',
        instructor: 'Designer Pro',
        rating: 4.8,
        students: 680,
        category: 'Design',
        tags: ['UI Design', 'UX Design', 'Figma', 'Prototipagem'],
        slug: 'ui-ux-design',
        language: 'Português',
        prerequisites: ['Nenhum pré-requisito'],
        whatYouWillLearn: [
            'Fundamentos de UI/UX',
            'Design thinking',
            'Figma e ferramentas',
            'Prototipagem interativa',
            'Pesquisa de usuários',
            'Design system'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        isPopular: true,
        lessons: []
    },

    // 23. WordPress Avançado
    {
        id: '23',
        title: 'WordPress Avançado',
        description: 'Desenvolva temas e plugins customizados para WordPress, incluindo WooCommerce e otimização.',
        duration: '50 horas',
        level: 'intermediate',
        price: 379.90,
        originalPrice: 649.90,
        discount: 42,
        image: '/images/courses/wordpress-avancado.jpg',
        instructor: 'WordPress Expert',
        rating: 4.5,
        students: 520,
        category: 'Desenvolvimento Web',
        tags: ['WordPress', 'PHP', 'Themes', 'Plugins'],
        slug: 'wordpress-avancado',
        language: 'Português',
        prerequisites: ['Conhecimento de PHP', 'HTML e CSS'],
        whatYouWillLearn: [
            'Desenvolvimento de temas',
            'Criação de plugins',
            'WooCommerce',
            'Otimização de performance',
            'Segurança',
            'Deploy e manutenção'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 24. Git e GitHub
    {
        id: '24',
        title: 'Git e GitHub',
        description: 'Domine controle de versão com Git e GitHub, incluindo workflows, branches e colaboração em equipe.',
        duration: '30 horas',
        level: 'beginner',
        price: 199.90,
        originalPrice: 399.90,
        discount: 50,
        image: '/images/courses/git-github.jpg',
        instructor: 'Git Master',
        rating: 4.9,
        students: 1200,
        category: 'Ferramentas',
        tags: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
        slug: 'git-github',
        language: 'Português',
        prerequisites: ['Nenhum pré-requisito'],
        whatYouWillLearn: [
            'Fundamentos do Git',
            'Comandos essenciais',
            'Branches e merge',
            'GitHub e colaboração',
            'Pull requests',
            'Workflows avançados'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        isPopular: true,
        lessons: []
    },

    // 25. Testes Automatizados
    {
        id: '25',
        title: 'Testes Automatizados',
        description: 'Aprenda testes unitários, integração e e2e com Jest, Cypress e as melhores práticas de QA.',
        duration: '45 horas',
        level: 'intermediate',
        price: 429.90,
        originalPrice: 749.90,
        discount: 43,
        image: '/images/courses/testes-automatizados.jpg',
        instructor: 'QA Expert',
        rating: 4.7,
        students: 480,
        category: 'Qualidade',
        tags: ['Testing', 'Jest', 'Cypress', 'QA'],
        slug: 'testes-automatizados',
        language: 'Português',
        prerequisites: ['Conhecimento de JavaScript', 'Conceitos de desenvolvimento'],
        whatYouWillLearn: [
            'Fundamentos de testes',
            'Testes unitários com Jest',
            'Testes e2e com Cypress',
            'TDD e BDD',
            'CI/CD e testes',
            'Estratégias de teste'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        lessons: []
    },

    // 26. Carreira em Tech
    {
        id: '26',
        title: 'Carreira em Tech',
        description: 'Prepare-se para o mercado de trabalho em tecnologia, incluindo soft skills, entrevistas e networking.',
        duration: '35 horas',
        level: 'beginner',
        price: 299.90,
        originalPrice: 599.90,
        discount: 50,
        image: '/images/courses/carreira-tech.jpg',
        instructor: 'Career Coach',
        rating: 4.8,
        students: 850,
        category: 'Carreira',
        tags: ['Carreira', 'Soft Skills', 'Entrevistas', 'Networking'],
        slug: 'carreira-tech',
        language: 'Português',
        prerequisites: ['Nenhum pré-requisito'],
        whatYouWillLearn: [
            'Planejamento de carreira',
            'Soft skills essenciais',
            'Preparação para entrevistas',
            'Networking e LinkedIn',
            'Portfolio e projetos',
            'Negociação salarial'
        ],
        certificate: true,
        lifetimeAccess: true,
        mobileFriendly: true,
        support: 'Suporte via chat',
        isPopular: true,
        lessons: []
    }
];

// Funções utilitárias
export const getCourseById = (id: string): Course | undefined => {
    return courses.find(course => course.id === id);
}

export const getCourseBySlug = (slug: string): Course | undefined => {
    return courses.find(course => course.slug === slug);
}

export const getCoursesByCategory = (category: string): Course[] => {
    return courses.filter(course => course.category === category);
}

export const getCoursesByLevel = (level: string): Course[] => {
    return courses.filter(course => course.level === level);
}

export const getPopularCourses = (): Course[] => {
    return courses.filter(course => course.isPopular);
}

export const getFeaturedCourses = (): Course[] => {
    return courses.filter(course => course.isFeatured);
}

export const getNewCourses = (): Course[] => {
    return courses.filter(course => course.isNew);
}

export const searchCourses = (query: string): Course[] => {
    const lowercaseQuery = query.toLowerCase();
    return courses.filter(course =>
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.description.toLowerCase().includes(lowercaseQuery) ||
        course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
        course.category.toLowerCase().includes(lowercaseQuery)
    );
}

export const getCourseList = (): Course[] => {
    return courses;
}

export const getCourseContent = (courseId: string): Course | undefined => {
    return getCourseById(courseId);
}

// Estatísticas dos cursos
export const getCourseStats = () => {
    const totalCourses = courses.length;
    const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
    const averageRating = courses.reduce((sum, course) => sum + course.rating, 0) / totalCourses;
    const categories = [...new Set(courses.map(course => course.category))];

    return {
        totalCourses,
        totalStudents,
        averageRating: Math.round(averageRating * 10) / 10,
        categories: categories.length,
        popularCourses: getPopularCourses().length,
        featuredCourses: getFeaturedCourses().length
    }
}
