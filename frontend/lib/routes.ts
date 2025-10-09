// Routes configuration
export const routes = {
    // Main pages
    home: '/',
    about: '/about',
    contact: '/contact',
    blog: '/blog',
    careers: '/careers',
    pricing: '/pricing',

    // Authentication
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',

    // User pages
    dashboard: '/dashboard',
    profile: '/profile',
    settings: '/settings',

    // Learning
    courses: '/courses',
    coursesContent: '/courses-content',
    myCourses: '/my-courses',
    progress: '/progress',
    certificates: '/certificates',
    exercicios: '/exercicios',

    // Tools
    ide: '/ide-advanced', // Updated to point to ide-advanced
    ideAdvanced: '/ide-advanced',
    ai: '/ai',

    // Community
    community: '/community',

    // Business
    becomeStudent: '/become-student',
    checkout: '/checkout',
    payment: '/payment',
    subscriptions: '/subscriptions',
    assinaturas: '/assinaturas',

    // Legal
    terms: '/terms',
    privacy: '/privacy',
    cookies: '/cookies',

    // Support
    help: '/help',
    support: '/support',

    // Admin
    admin: '/admin',
    ceoDashboard: '/ceo-dashboard',
    ceoCourseContent: '/ceo-dashboard/course-content',

    // Special pages
    founders: '/founders',
    comecarAgora: '/comecar-agora',
    testMinimal: '/test-minimal',

    // Legacy routes (for backward compatibility)
    tutorials: '/courses',
    projects: '/courses',
    resources: '/courses',
    unauthorized: '/auth/login',
    faturamento: '/assinaturas',
    gestaoTrafego: '/courses',
};

// Export ROUTES for backward compatibility
export const ROUTES = routes;

export const getRoute = (key: keyof typeof routes) => routes[key];

export const isProtectedRoute = (pathname: string): boolean => {
    const protectedRoutes = [
        '/dashboard',
        '/profile',
        '/my-courses',
        '/progress',
        '/settings',
        '/subscriptions',
        '/admin',
        '/ceo-dashboard',
        '/certificates'
    ];

    return protectedRoutes.some(route => pathname.startsWith(route));
};

// Helper functions for common navigation patterns
export const navigationHelpers = {
    // Course-related navigation
    getCourseUrl: (courseSlug: string) => `/courses/${courseSlug}`,
    getLessonUrl: (courseSlug: string, lessonId: string) => `/courses/${courseSlug}/lesson/${lessonId}`,
    getModuleUrl: (courseSlug: string, moduleId: string) => `/courses/${courseSlug}/module/${moduleId}`,

    // User-related navigation
    getUserProfileUrl: (userId: string) => `/profile/${userId}`,

    // Admin navigation
    getAdminUrl: (section: string) => `/admin/${section}`,

    // External links
    external: {
        github: 'https://github.com/fenixdevacademy',
        linkedin: 'https://linkedin.com/company/fenixdevacademy',
        twitter: 'https://twitter.com/fenixdevacademy',
        youtube: 'https://youtube.com/@fenixdevacademy',
        discord: 'https://discord.gg/fenixdevacademy',
    }
};