import { CourseContent } from '../types/course-types';

export const webFundamentalsCourse: CourseContent = {
    id: 'web-fundamentals',
    title: 'Web Fundamentals',
    description: 'Curso completo de desenvolvimento web moderno, desde fundamentos até técnicas avançadas',
    category: 'Desenvolvimento Web',
    level: 'Avançado',
    total_modules: 15,
    total_lessons: 74,
    duration_hours: 200,
    price: 0,
    currency: 'BRL',
    instructor: 'Equipe Fenix',
    certificate: true,
    languages: ['pt-BR'],
    tags: ['web', 'javascript', 'react', 'nodejs', 'css', 'html'],
    thumbnail: '/images/courses/web-fundamentals.jpg',
    status: 'active',
    modules: [
        {
            id: 1,
            title: 'Fundamentos Essenciais do Desenvolvimento Web',
            description: 'Aprenda os conceitos fundamentais da web, sua evolução histórica e arquitetura moderna',
            duration_hours: 5,
            lessons: [
                { id: 1, title: 'Introdução ao Desenvolvimento Web Moderno', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 2, title: 'Arquitetura Web e Componentes', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 3, title: 'Setup do Ambiente de Desenvolvimento', type: 'text', duration: '90 min', content: '', completed: false, locked: false },
                { id: 4, title: 'Ferramentas e Recursos Essenciais', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 5, title: 'Projeto: Configuração Completa do Ambiente', type: 'project', duration: '120 min', content: '', completed: false, locked: false }
            ]
        },
        {
            id: 2,
            title: 'HTML5 Semântico e Acessibilidade',
            description: 'Domine HTML5 semântico, acessibilidade web e boas práticas de desenvolvimento',
            duration_hours: 6,
            lessons: [
                { id: 6, title: 'Introdução ao HTML5 e Semântica', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 7, title: 'Estrutura de Documentos HTML5', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 8, title: 'Formulários HTML5 e Validação', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 9, title: 'Multimídia e Conteúdo Interativo', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 10, title: 'Tabelas e Dados Estruturados', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 11, title: 'Projeto: Página Web Semântica', type: 'project', duration: '120 min', content: '', completed: false, locked: false }
            ]
        },
        {
            id: 3,
            title: 'CSS3 Avançado e Layouts Modernos',
            description: 'Explore CSS3 avançado, Flexbox, Grid e técnicas de layout responsivo',
            duration_hours: 7,
            lessons: [
                { id: 12, title: 'CSS3 Avançado e Seletores', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 13, title: 'Layout com Flexbox', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 14, title: 'Grid Layout CSS', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 15, title: 'Animações e Transições', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 16, title: 'Responsividade e Media Queries', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 17, title: 'CSS Custom Properties', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 18, title: 'Projeto: Interface Responsiva', type: 'project', duration: '120 min', content: '', completed: false, locked: false }
            ]
        },
        {
            id: 4,
            title: 'JavaScript Moderno e ES6+',
            description: 'Aprenda JavaScript moderno, ES6+, async/await e padrões de programação',
            duration_hours: 8,
            lessons: [
                { id: 19, title: 'JavaScript ES6+ e Moderno', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 20, title: 'Promises e Async/Await', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 21, title: 'Módulos ES6 e Import/Export', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 22, title: 'Classes e Herança', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 23, title: 'Arrow Functions e Contexto', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 24, title: 'Destructuring e Spread', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 25, title: 'Template Literals', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 26, title: 'Projeto: Aplicação JavaScript', type: 'project', duration: '120 min', content: '', completed: false, locked: false }
            ]
        },
        {
            id: 5,
            title: 'React.js e Componentes',
            description: 'Desenvolva aplicações React modernas com hooks, context e padrões avançados',
            duration_hours: 9,
            lessons: [
                { id: 27, title: 'Introdução ao React', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 28, title: 'Componentes e Props', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 29, title: 'Estado e Ciclo de Vida', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 30, title: 'Hooks: useState e useEffect', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 31, title: 'Context API e Gerenciamento de Estado', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 32, title: 'Roteamento com React Router', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 33, title: 'Formulários Controlados', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 34, title: 'Integração com APIs', type: 'text', duration: '75 min', content: '', completed: false, locked: false },
                { id: 35, title: 'Projeto: App React Completo', type: 'project', duration: '120 min', content: '', completed: false, locked: false }
            ]
        }
    ]
};

export default webFundamentalsCourse;

