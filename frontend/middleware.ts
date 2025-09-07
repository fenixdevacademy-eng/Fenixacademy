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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se é uma URL legada de curso
  if (legacyCourseUrls[pathname]) {
    console.log(`Middleware: Redirecting ${pathname} to ${legacyCourseUrls[pathname]}`);
    return NextResponse.redirect(new URL(legacyCourseUrls[pathname], request.url));
  }

  // Verificar se é um curso com slug inválido
  if (pathname.startsWith('/course/')) {
    const slug = pathname.replace('/course/', '');

    // Se o slug não for válido, redirecionar para a página de cursos
    if (!validCourseSlugs.includes(slug)) {
      console.log(`Middleware: Invalid course slug "${slug}", redirecting to /courses`);
      return NextResponse.redirect(new URL('/courses', request.url));
    }
  }

  // Verificar se é uma URL de redirecionamento antiga
  if (pathname === '/courses/redirect') {
    const searchParams = request.nextUrl.searchParams;
    const courseId = searchParams.get('id');

    if (courseId) {
      const numericId = parseInt(courseId);
      const newUrl = legacyCourseUrls[`/course/${numericId}`];

      if (newUrl) {
        console.log(`Middleware: Redirecting course ID ${courseId} to ${newUrl}`);
        return NextResponse.redirect(new URL(newUrl, request.url));
      }
    }
  }

  // Se não for nenhum dos casos acima, continuar normalmente
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Aplicar middleware apenas nas rotas de curso
    '/course/:path*',
    '/courses/redirect'
  ],
}; 