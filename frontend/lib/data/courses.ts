// Dados completos dos 26 cursos da Fênix Dev Academy
export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    instructorAvatar: string;
    duration: string;
    students: number;
    rating: number;
    price: number;
    originalPrice: number;
    level: 'Iniciante' | 'Intermediário' | 'Avançado';
    category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'data' | 'ai' | 'game' | 'blockchain';
    image: string;
    tags: string[];
    features: string[];
    isPopular: boolean;
    isNew: boolean;
    slug: string;
}

export const courses: Course[] = [
    // FRONTEND (8 cursos)
    {
        id: 1,
        title: "React Avançado - Do Zero ao Profissional",
        description: "Domine React com hooks, context, redux e construa aplicações escaláveis",
        instructor: "Carlos Silva",
        instructorAvatar: "👨‍💻",
        duration: "120 horas",
        students: 15420,
        rating: 4.9,
        price: 497,
        originalPrice: 997,
        level: "Avançado",
        category: "frontend",
        image: "⚛️",
        tags: ["React", "JavaScript", "Hooks", "Redux", "Context API"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: true,
        isNew: false,
        slug: "react-avancado"
    },
    {
        id: 2,
        title: "Vue.js Completo - Framework Moderno",
        description: "Aprenda Vue.js 3 com Composition API e construa SPAs profissionais",
        instructor: "Ana Santos",
        instructorAvatar: "👩‍💻",
        duration: "80 horas",
        students: 8750,
        rating: 4.8,
        price: 397,
        originalPrice: 797,
        level: "Intermediário",
        category: "frontend",
        image: "💚",
        tags: ["Vue.js", "JavaScript", "SPA", "Composition API"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: true,
        slug: "vuejs-completo"
    },
    {
        id: 3,
        title: "Angular Profissional - Enterprise",
        description: "Desenvolva aplicações enterprise com Angular e TypeScript",
        instructor: "Pedro Costa",
        instructorAvatar: "👨‍🚀",
        duration: "100 horas",
        students: 12300,
        rating: 4.7,
        price: 597,
        originalPrice: 1197,
        level: "Avançado",
        category: "frontend",
        image: "🔴",
        tags: ["Angular", "TypeScript", "RxJS", "Enterprise"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "angular-profissional"
    },
    {
        id: 4,
        title: "JavaScript Moderno ES6+",
        description: "Domine JavaScript moderno com ES6, ES7, ES8 e recursos avançados",
        instructor: "Maria Oliveira",
        instructorAvatar: "👩‍🎓",
        duration: "60 horas",
        students: 25600,
        rating: 4.9,
        price: 297,
        originalPrice: 597,
        level: "Iniciante",
        category: "frontend",
        image: "🟨",
        tags: ["JavaScript", "ES6", "ES7", "ES8", "Modern JS"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: true,
        isNew: false,
        slug: "javascript-moderno"
    },
    {
        id: 5,
        title: "TypeScript Avançado - Tipagem Forte",
        description: "Aprenda TypeScript do básico ao avançado com projetos reais",
        instructor: "João Silva",
        instructorAvatar: "👨‍🔧",
        duration: "70 horas",
        students: 18900,
        rating: 4.8,
        price: 397,
        originalPrice: 797,
        level: "Intermediário",
        category: "frontend",
        image: "🔷",
        tags: ["TypeScript", "JavaScript", "Tipagem", "Interfaces"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "typescript-avancado"
    },
    {
        id: 6,
        title: "CSS Avançado e SASS/SCSS",
        description: "Domine CSS moderno, Flexbox, Grid, SASS e animações",
        instructor: "Carla Mendes",
        instructorAvatar: "👩‍🎨",
        duration: "50 horas",
        students: 14200,
        rating: 4.7,
        price: 247,
        originalPrice: 497,
        level: "Iniciante",
        category: "frontend",
        image: "🎨",
        tags: ["CSS", "SASS", "SCSS", "Flexbox", "Grid"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "css-avancado-sass"
    },
    {
        id: 7,
        title: "Webpack e Vite - Build Tools",
        description: "Configure e otimize ferramentas de build para projetos modernos",
        instructor: "Rafael Lima",
        instructorAvatar: "👨‍💼",
        duration: "40 horas",
        students: 6800,
        rating: 4.6,
        price: 297,
        originalPrice: 597,
        level: "Intermediário",
        category: "frontend",
        image: "📦",
        tags: ["Webpack", "Vite", "Build Tools", "Bundling"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: true,
        slug: "webpack-vite-build-tools"
    },
    {
        id: 8,
        title: "PWA - Progressive Web Apps",
        description: "Crie aplicações web progressivas com Service Workers e Cache",
        instructor: "Fernanda Rocha",
        instructorAvatar: "👩‍💻",
        duration: "55 horas",
        students: 9200,
        rating: 4.8,
        price: 347,
        originalPrice: 697,
        level: "Intermediário",
        category: "frontend",
        image: "📱",
        tags: ["PWA", "Service Workers", "Cache", "Offline"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "pwa-progressive-web-apps"
    },

    // BACKEND (6 cursos)
    {
        id: 9,
        title: "Node.js Profissional - APIs RESTful",
        description: "Desenvolva APIs robustas com Node.js, Express e MongoDB",
        instructor: "Carlos Silva",
        instructorAvatar: "👨‍💻",
        duration: "90 horas",
        students: 18700,
        rating: 4.9,
        price: 497,
        originalPrice: 997,
        level: "Intermediário",
        category: "backend",
        image: "🟢",
        tags: ["Node.js", "Express", "MongoDB", "APIs", "REST"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: true,
        isNew: false,
        slug: "nodejs-profissional"
    },
    {
        id: 10,
        title: "Python Django - Framework Web",
        description: "Desenvolva aplicações web robustas com Django e Python",
        instructor: "Ana Santos",
        instructorAvatar: "👩‍💻",
        duration: "110 horas",
        students: 15600,
        rating: 4.8,
        price: 597,
        originalPrice: 1197,
        level: "Intermediário",
        category: "backend",
        image: "🐍",
        tags: ["Python", "Django", "Web Framework", "ORM"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "python-django"
    },
    {
        id: 11,
        title: "Java Spring Boot - Microservices",
        description: "Construa microserviços escaláveis com Spring Boot e Java",
        instructor: "Pedro Costa",
        instructorAvatar: "👨‍🚀",
        duration: "120 horas",
        students: 13400,
        rating: 4.7,
        price: 697,
        originalPrice: 1397,
        level: "Avançado",
        category: "backend",
        image: "☕",
        tags: ["Java", "Spring Boot", "Microservices", "JPA"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "java-spring-boot"
    },
    {
        id: 12,
        title: "PHP Laravel - Framework Moderno",
        description: "Desenvolva aplicações web modernas com Laravel e PHP 8",
        instructor: "Maria Oliveira",
        instructorAvatar: "👩‍🎓",
        duration: "85 horas",
        students: 11200,
        rating: 4.6,
        price: 397,
        originalPrice: 797,
        level: "Intermediário",
        category: "backend",
        image: "🐘",
        tags: ["PHP", "Laravel", "Eloquent", "Blade"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "php-laravel"
    },
    {
        id: 13,
        title: "C# .NET Core - APIs e Web Apps",
        description: "Desenvolva aplicações .NET Core com C# e Entity Framework",
        instructor: "João Silva",
        instructorAvatar: "👨‍🔧",
        duration: "95 horas",
        students: 9800,
        rating: 4.8,
        price: 497,
        originalPrice: 997,
        level: "Intermediário",
        category: "backend",
        image: "🔷",
        tags: ["C#", ".NET Core", "Entity Framework", "APIs"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: true,
        slug: "csharp-dotnet-core"
    },
    {
        id: 14,
        title: "Go (Golang) - Performance e Concorrência",
        description: "Aprenda Go para desenvolvimento de APIs de alta performance",
        instructor: "Carla Mendes",
        instructorAvatar: "👩‍🎨",
        duration: "70 horas",
        students: 7600,
        rating: 4.9,
        price: 447,
        originalPrice: 897,
        level: "Intermediário",
        category: "backend",
        image: "🐹",
        tags: ["Go", "Golang", "Concorrência", "Performance"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "go-golang-performance"
    },

    // FULL STACK (4 cursos)
    {
        id: 15,
        title: "JavaScript Full Stack - Completo",
        description: "Curso completo de JavaScript do frontend ao backend",
        instructor: "Carlos Silva",
        instructorAvatar: "👨‍💻",
        duration: "200 horas",
        students: 22150,
        rating: 4.9,
        price: 697,
        originalPrice: 1397,
        level: "Iniciante",
        category: "fullstack",
        image: "💻",
        tags: ["JavaScript", "React", "Node.js", "MongoDB"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: true,
        isNew: false,
        slug: "javascript-fullstack"
    },
    {
        id: 16,
        title: "Python Full Stack - Django + React",
        description: "Desenvolva aplicações completas com Python e React",
        instructor: "Ana Santos",
        instructorAvatar: "👩‍💻",
        duration: "180 horas",
        students: 16800,
        rating: 4.8,
        price: 597,
        originalPrice: 1197,
        level: "Intermediário",
        category: "fullstack",
        image: "🐍",
        tags: ["Python", "Django", "React", "PostgreSQL"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "python-fullstack"
    },
    {
        id: 17,
        title: "Java Full Stack - Spring + Angular",
        description: "Desenvolva aplicações enterprise completas com Java",
        instructor: "Pedro Costa",
        instructorAvatar: "👨‍🚀",
        duration: "220 horas",
        students: 14500,
        rating: 4.7,
        price: 797,
        originalPrice: 1597,
        level: "Avançado",
        category: "fullstack",
        image: "☕",
        tags: ["Java", "Spring Boot", "Angular", "MySQL"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "java-fullstack"
    },
    {
        id: 18,
        title: "PHP Full Stack - Laravel + Vue.js",
        description: "Desenvolva aplicações web completas com PHP e Vue.js",
        instructor: "Maria Oliveira",
        instructorAvatar: "👩‍🎓",
        duration: "160 horas",
        students: 12800,
        rating: 4.6,
        price: 497,
        originalPrice: 997,
        level: "Intermediário",
        category: "fullstack",
        image: "🐘",
        tags: ["PHP", "Laravel", "Vue.js", "MySQL"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: true,
        slug: "php-fullstack"
    },

    // MOBILE (3 cursos)
    {
        id: 19,
        title: "React Native - Apps Nativos",
        description: "Desenvolva aplicações mobile nativas com React Native",
        instructor: "João Silva",
        instructorAvatar: "👨‍🔧",
        duration: "100 horas",
        students: 18900,
        rating: 4.8,
        price: 497,
        originalPrice: 997,
        level: "Intermediário",
        category: "mobile",
        image: "📱",
        tags: ["React Native", "Mobile", "iOS", "Android"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: true,
        isNew: false,
        slug: "react-native-apps"
    },
    {
        id: 20,
        title: "Flutter - Desenvolvimento Cross-Platform",
        description: "Crie apps para iOS e Android com Flutter e Dart",
        instructor: "Carla Mendes",
        instructorAvatar: "👩‍🎨",
        duration: "110 horas",
        students: 15600,
        rating: 4.9,
        price: 597,
        originalPrice: 1197,
        level: "Intermediário",
        category: "mobile",
        image: "🦋",
        tags: ["Flutter", "Dart", "Cross-Platform", "Mobile"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: true,
        slug: "flutter-cross-platform"
    },
    {
        id: 21,
        title: "Swift iOS - Desenvolvimento Nativo",
        description: "Desenvolva apps nativos para iOS com Swift e SwiftUI",
        instructor: "Rafael Lima",
        instructorAvatar: "👨‍💼",
        duration: "120 horas",
        students: 11200,
        rating: 4.7,
        price: 697,
        originalPrice: 1397,
        level: "Avançado",
        category: "mobile",
        image: "🍎",
        tags: ["Swift", "iOS", "SwiftUI", "Xcode"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "swift-ios-nativo"
    },

    // DEVOPS (2 cursos)
    {
        id: 22,
        title: "DevOps & Docker - Deploy Profissional",
        description: "Domine Docker, Kubernetes e CI/CD para deploy profissional",
        instructor: "João Silva",
        instructorAvatar: "👨‍🔧",
        duration: "90 horas",
        students: 5420,
        rating: 4.8,
        price: 397,
        originalPrice: 797,
        level: "Avançado",
        category: "devops",
        image: "🐳",
        tags: ["Docker", "Kubernetes", "CI/CD", "AWS"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "devops-docker"
    },
    {
        id: 23,
        title: "AWS Cloud - Infraestrutura Escalável",
        description: "Domine Amazon Web Services para infraestrutura em nuvem",
        instructor: "Fernanda Rocha",
        instructorAvatar: "👩‍💻",
        duration: "80 horas",
        students: 6800,
        rating: 4.9,
        price: 497,
        originalPrice: 997,
        level: "Intermediário",
        category: "devops",
        image: "☁️",
        tags: ["AWS", "Cloud", "EC2", "S3", "Lambda"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: true,
        slug: "aws-cloud"
    },

    // DATA SCIENCE (1 curso)
    {
        id: 24,
        title: "Python Data Science - Análise de Dados",
        description: "Domine Python para análise de dados, machine learning e visualização",
        instructor: "Pedro Costa",
        instructorAvatar: "👨‍🚀",
        duration: "130 horas",
        students: 18900,
        rating: 4.9,
        price: 597,
        originalPrice: 1197,
        level: "Intermediário",
        category: "data",
        image: "📊",
        tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: true,
        isNew: false,
        slug: "python-data-science"
    },

    // AI (1 curso)
    {
        id: 25,
        title: "Inteligência Artificial - Machine Learning",
        description: "Aprenda IA, machine learning e deep learning com Python",
        instructor: "Maria Oliveira",
        instructorAvatar: "👩‍🎓",
        duration: "150 horas",
        students: 12400,
        rating: 4.8,
        price: 697,
        originalPrice: 1397,
        level: "Avançado",
        category: "ai",
        image: "🤖",
        tags: ["IA", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: true,
        slug: "inteligencia-artificial"
    },

    // GAME (1 curso)
    {
        id: 26,
        title: "Unity C# - Desenvolvimento de Jogos",
        description: "Crie jogos 2D e 3D com Unity e C#",
        instructor: "Carla Mendes",
        instructorAvatar: "👩‍🎨",
        duration: "140 horas",
        students: 9800,
        rating: 4.7,
        price: 497,
        originalPrice: 997,
        level: "Intermediário",
        category: "game",
        image: "🎮",
        tags: ["Unity", "C#", "Jogos", "2D", "3D"],
        features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
        isPopular: false,
        isNew: false,
        slug: "unity-csharp-jogos"
    }
];

// Funções auxiliares
export const getCourseById = (id: number): Course | undefined => {
    return courses.find(course => course.id === id);
};

export const getCourseBySlug = (slug: string): Course | undefined => {
    return courses.find(course => course.slug === slug);
};

export const getCoursesByCategory = (category: string): Course[] => {
    if (category === 'all') return courses;
    return courses.filter(course => course.category === category);
};

export const getPopularCourses = (): Course[] => {
    return courses.filter(course => course.isPopular);
};

export const getNewCourses = (): Course[] => {
    return courses.filter(course => course.isNew);
};

export const searchCourses = (query: string): Course[] => {
    const lowercaseQuery = query.toLowerCase();
    return courses.filter(course =>
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.description.toLowerCase().includes(lowercaseQuery) ||
        course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
};

export default courses;
