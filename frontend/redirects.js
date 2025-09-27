/**
 * Redirects configuration for Fênix Dev Academy
 * Handles URL redirects and aliases for better SEO and user experience
 */

const redirects = [
    // Legacy redirects
    { from: '/home', to: '/', permanent: true },
    { from: '/index', to: '/', permanent: true },
    { from: '/inicio', to: '/', permanent: true },

    // Course redirects
    { from: '/curso/:slug', to: '/course/:slug', permanent: true },
    { from: '/cursos/:slug', to: '/course/:slug', permanent: true },
    { from: '/course-detail/:slug', to: '/course/:slug', permanent: true },

    // Expanded content redirects
    { from: '/curso-expandido/:slug', to: '/expanded-course/:slug', permanent: true },
    { from: '/conteudo-expandido/:slug', to: '/expanded-course/:slug', permanent: true },

    // IDE redirects
    { from: '/editor', to: '/ide-advanced', permanent: true },
    { from: '/code-editor', to: '/ide-advanced', permanent: true },
    { from: '/playground', to: '/ide-advanced', permanent: true },
    { from: '/ide', to: '/ide-advanced', permanent: true },

    // Auth redirects
    { from: '/login', to: '/auth/login', permanent: true },
    { from: '/signin', to: '/auth/login', permanent: true },
    { from: '/register', to: '/auth/register', permanent: true },
    { from: '/signup', to: '/auth/register', permanent: true },
    { from: '/cadastro', to: '/auth/register', permanent: true },
    { from: '/entrar', to: '/auth/login', permanent: true },

    // Dashboard redirects
    { from: '/painel', to: '/dashboard', permanent: true },
    { from: '/perfil', to: '/profile', permanent: true },
    { from: '/configuracoes', to: '/settings', permanent: true },

    // Payment redirects
    { from: '/pagamento', to: '/payment', permanent: true },
    { from: '/comprar', to: '/payment', permanent: true },
    { from: '/checkout', to: '/payment', permanent: true },
    { from: '/pagar', to: '/payment', permanent: true },

    // Content redirects
    { from: '/conteudo', to: '/expanded-courses', permanent: true },
    { from: '/materiais', to: '/expanded-courses', permanent: true },
    { from: '/exercicios', to: '/expanded-exercises', permanent: true },
    { from: '/quizzes', to: '/expanded-quizzes', permanent: true },
    { from: '/certificados', to: '/certificates', permanent: true },

    // Support redirects
    { from: '/ajuda', to: '/support', permanent: true },
    { from: '/faq', to: '/help', permanent: true },
    { from: '/suporte', to: '/support', permanent: true },

    // Community redirects
    { from: '/comunidade', to: '/community', permanent: true },
    { from: '/forum', to: '/community', permanent: true },
    { from: '/discussao', to: '/community', permanent: true },

    // About redirects
    { from: '/sobre', to: '/about', permanent: true },
    { from: '/quem-somos', to: '/about', permanent: true },
    { from: '/empresa', to: '/about', permanent: true },

    // Contact redirects
    { from: '/contato', to: '/contact', permanent: true },
    { from: '/fale-conosco', to: '/contact', permanent: true },

    // Careers redirects
    { from: '/carreiras', to: '/careers', permanent: true },
    { from: '/trabalhe-conosco', to: '/careers', permanent: true },
    { from: '/vagas', to: '/careers', permanent: true },

    // Blog redirects
    { from: '/artigos', to: '/blog', permanent: true },
    { from: '/noticias', to: '/blog', permanent: true },

    // Pricing redirects
    { from: '/precos', to: '/pricing', permanent: true },
    { from: '/planos', to: '/pricing', permanent: true },
    { from: '/valores', to: '/pricing', permanent: true },

    // Legal redirects
    { from: '/termos', to: '/terms', permanent: true },
    { from: '/privacidade', to: '/privacy', permanent: true },
    { from: '/politica-privacidade', to: '/privacy', permanent: true },
    { from: '/termos-uso', to: '/terms', permanent: true },

    // Special pages redirects
    { from: '/comecar', to: '/comecar-agora', permanent: true },
    { from: '/iniciar', to: '/comecar-agora', permanent: true },
    { from: '/start', to: '/comecar-agora', permanent: true },
    { from: '/get-started', to: '/comecar-agora', permanent: true },

    // API redirects
    { from: '/api/v1/:path*', to: '/api/:path*', permanent: true },
    { from: '/api/legacy/:path*', to: '/api/:path*', permanent: true },
];

module.exports = redirects;
