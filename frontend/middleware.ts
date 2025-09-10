import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mapeamento de URLs legadas para novas URLs
const legacyCourseUrls: { [key: string]: string } = {
  // URLs antigas para novas
  '/course/fundamentos-desenvolvimento-web': '/course/web-fundamentals',
  '/course/react-avancado': '/course/react-advanced',
  '/course/nodejs-backend-development': '/course/nodejs-apis',
  '/course/machine-learning-python': '/course/machine-learning',
  '/course/desenvolvimento-mobile': '/course/flutter-mobile',
  '/course/cybersecurity-ethical-hacking': '/course/cybersecurity',
  '/course/devops-cicd': '/course/devops-docker',
  '/course/data-engineering': '/course/data-science',

  // Mapeamento de IDs para slugs
  '/course/1': '/course/web-fundamentals',
  '/course/2': '/course/python-data-science',
  '/course/3': '/course/react-advanced',
  '/course/4': '/course/nodejs-apis',
  '/course/5': '/course/machine-learning',
  '/course/6': '/course/flutter-mobile',
  '/course/7': '/course/cybersecurity',
  '/course/8': '/course/devops-docker',
  '/course/9': '/course/flutter-mobile',
  '/course/10': '/course/aws-cloud',
  '/course/11': '/course/blockchain-smart-contracts',
  '/course/12': '/course/react-native-mobile',
  '/course/13': '/course/data-science',
  '/course/14': '/course/game-development',
  '/course/15': '/course/ui-ux-design',
  '/course/16': '/course/backend-development',
  '/course/17': '/course/frontend-development',
  '/course/18': '/course/full-stack-development',
  '/course/19': '/course/product-management',
  '/course/20': '/course/software-architecture',
  '/course/21': '/course/gestao-trafego'
};

// Mapeamento de URLs da IDE
const ideUrls: { [key: string]: string } = {
  // URLs legadas da IDE para IDE avançada
  '/ide': '/ide-advanced',
  '/ide-simple': '/ide-advanced-simple',
  '/ide-cs50': '/ide-advanced',
  '/ide/test': '/ide-advanced',
  '/ide/demo': '/ide-advanced',

  // Redirecionamentos específicos para IDE avançada
  '/editor': '/ide-advanced',
  '/code-editor': '/ide-advanced',
  '/online-ide': '/ide-advanced',
  '/web-ide': '/ide-advanced',
  '/fenix-ide': '/ide-advanced',
  '/advanced-editor': '/ide-advanced',

  // URLs de funcionalidades específicas
  '/ide/run': '/ide-advanced',
  '/ide/debug': '/ide-advanced',
  '/ide/terminal': '/ide-advanced',
  '/ide/ai': '/ai',
  '/ide/collaborate': '/ide-advanced',

  // URLs da IA
  '/ai-chat': '/ai',
  '/chat-ai': '/ai',
  '/assistente': '/ai',
  '/assistant': '/ai',
  '/fenix-ai': '/ai',
  '/inteligencia-artificial': '/ai'
};

// Slugs válidos para os novos cursos
const validCourseSlugs = [
  'web-fundamentals',
  'python-data-science',
  'react-advanced',
  'nodejs-apis',
  'machine-learning',
  'flutter-mobile',
  'cybersecurity',
  'devops-docker',
  'aws-cloud',
  'blockchain-smart-contracts',
  'react-native-mobile',
  'data-science',
  'game-development',
  'ui-ux-design',
  'backend-development',
  'frontend-development',
  'full-stack-development',
  'product-management',
  'software-architecture',
  'gestao-trafego'
];

// Slugs válidos para IDE
const validIdeSlugs = [
  'ide-advanced',
  'ide-advanced-simple',
  'ide-simple',
  'ide-cs50'
];

export function middleware(request: NextRequest) {
  try {
    const { pathname, searchParams } = request.nextUrl;

    // Validate request URL length
    if (request.url.length > 2048) {
      console.error('URL_TOO_LONG:', request.url);
      return NextResponse.json(
        {
          success: false,
          error: 'URL_TOO_LONG',
          message: 'URL is too long',
          code: 'URL_TOO_LONG'
        },
        { status: 414 }
      );
    }

    // Validate request headers
    const userAgent = request.headers.get('user-agent');
    if (!userAgent || userAgent.length > 1024) {
      console.error('MALFORMED_REQUEST_HEADER:', { userAgent });
      return NextResponse.json(
        {
          success: false,
          error: 'MALFORMED_REQUEST_HEADER',
          message: 'Invalid or missing User-Agent header',
          code: 'MALFORMED_REQUEST_HEADER'
        },
        { status: 400 }
      );
    }

    // Handle API routes with proper CORS
    if (pathname.startsWith('/api/')) {
      const response = NextResponse.next();

      // Add CORS headers
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
      response.headers.set('Access-Control-Max-Age', '86400');

      // Handle preflight requests
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: response.headers });
      }

      return response;
    }

    // Verificar se é uma URL legada de curso
    if (legacyCourseUrls[pathname]) {
      console.log(`Middleware: Redirecting ${pathname} to ${legacyCourseUrls[pathname]}`);
      return NextResponse.redirect(new URL(legacyCourseUrls[pathname], request.url), 301);
    }

    // Verificar se é uma URL legada da IDE
    if (ideUrls[pathname]) {
      console.log(`Middleware: Redirecting IDE ${pathname} to ${ideUrls[pathname]}`);
      return NextResponse.redirect(new URL(ideUrls[pathname], request.url), 301);
    }

    // Verificar se é um curso com slug inválido
    if (pathname.startsWith('/course/')) {
      const slug = pathname.replace('/course/', '');

      // Se o slug não for válido, redirecionar para a página de cursos
      if (!validCourseSlugs.includes(slug)) {
        console.log(`Middleware: Invalid course slug "${slug}", redirecting to /courses`);
        return NextResponse.redirect(new URL('/courses', request.url), 301);
      }
    }

    // Verificar se é uma IDE com slug inválido
    if (pathname.startsWith('/ide')) {
      const slug = pathname.replace('/ide', '').replace(/^\/+/, '') || 'advanced';
      const fullSlug = slug ? `ide-${slug}` : 'ide-advanced';

      // Se o slug não for válido, redirecionar para a IDE avançada
      if (!validIdeSlugs.includes(fullSlug)) {
        console.log(`Middleware: Invalid IDE slug "${slug}", redirecting to /ide-advanced`);
        return NextResponse.redirect(new URL('/ide-advanced', request.url), 301);
      }
    }

    // Verificar se é uma URL de redirecionamento antiga
    if (pathname === '/courses/redirect') {
      const courseId = searchParams.get('id');

      if (courseId) {
        const numericId = parseInt(courseId);
        const newUrl = legacyCourseUrls[`/course/${numericId}`];

        if (newUrl) {
          console.log(`Middleware: Redirecting course ID ${courseId} to ${newUrl}`);
          return NextResponse.redirect(new URL(newUrl, request.url), 301);
        }
      }
    }

    // Handle range requests
    const range = request.headers.get('range');
    if (range) {
      const rangeMatch = range.match(/bytes=(\d+)-(\d*)/);
      if (rangeMatch) {
        const start = parseInt(rangeMatch[1]);
        const end = rangeMatch[2] ? parseInt(rangeMatch[2]) : undefined;

        if (isNaN(start) || (end && (isNaN(end) || end < start))) {
          return NextResponse.json(
            {
              success: false,
              error: 'RANGE_START_NOT_VALID',
              message: 'Invalid range header',
              code: 'RANGE_START_NOT_VALID'
            },
            { status: 416 }
          );
        }
      }
    }

    // Se não for nenhum dos casos acima, continuar normalmente
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'MIDDLEWARE_INVOCATION_FAILED',
        message: 'Middleware execution failed',
        code: 'MIDDLEWARE_INVOCATION_FAILED'
      },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: [
    // Aplicar middleware nas rotas de curso e IDE
    '/course/:path*',
    '/courses/redirect',
    '/ide/:path*',
    '/editor',
    '/code-editor',
    '/online-ide',
    '/web-ide',
    '/fenix-ide',
    '/advanced-editor'
  ],
}; 