// Route configuration for course pages
export interface RouteConfig {
  path: string;
  component: string;
  title: string;
  description: string;
  requiresAuth: boolean;
  permissions: string[];
  layout: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

export interface CourseRoute {
  slug: string;
  config: RouteConfig;
  modules: ModuleRoute[];
}

export interface ModuleRoute {
  id: string;
  title: string;
  path: string;
  lessons: LessonRoute[];
}

export interface LessonRoute {
  id: string;
  title: string;
  path: string;
  type: 'video' | 'text' | 'exercise' | 'quiz' | 'project';
  duration: number;
  completed: boolean;
}

export const courseRoutes: CourseRoute[] = [
  {
    slug: 'javascript-fundamentals',
    config: {
      path: '/course/javascript-fundamentals',
      component: 'CoursePage',
      title: 'JavaScript Fundamentals',
      description: 'Aprenda os conceitos fundamentais do JavaScript',
      requiresAuth: true,
      permissions: ['course:read'],
      layout: 'CourseLayout',
      meta: {
        title: 'JavaScript Fundamentals - Fenix Academy',
        description: 'Curso completo de JavaScript para iniciantes',
        keywords: ['javascript', 'programming', 'web development'],
        ogImage: '/images/javascript-course-og.jpg'
      }
    },
    modules: [
      {
        id: 'module-1',
        title: 'Introdução ao JavaScript',
        path: '/course/javascript-fundamentals/module-1',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'O que é JavaScript?',
            path: '/course/javascript-fundamentals/module-1/lesson-1-1',
            type: 'video',
            duration: 15,
            completed: false
          }
        ]
      }
    ]
  }
];

export function getCourseRoute(slug: string): CourseRoute | null {
  return courseRoutes.find(route => route.slug === slug) || null;
}

export function getModuleRoute(courseSlug: string, moduleId: string): ModuleRoute | null {
  const course = getCourseRoute(courseSlug);
  if (!course) return null;
  
  return course.modules.find(module => module.id === moduleId) || null;
}

export function getLessonRoute(courseSlug: string, moduleId: string, lessonId: string): LessonRoute | null {
  const module = getModuleRoute(courseSlug, moduleId);
  if (!module) return null;
  
  return module.lessons.find(lesson => lesson.id === lessonId) || null;
}

export function getAllRoutes(): CourseRoute[] {
  return courseRoutes;
}

export function getCourseProgress(courseSlug: string): number {
  const course = getCourseRoute(courseSlug);
  if (!course) return 0;

  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = course.modules.reduce((sum, module) => 
    sum + module.lessons.filter(lesson => lesson.completed).length, 0
  );

  return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
}




