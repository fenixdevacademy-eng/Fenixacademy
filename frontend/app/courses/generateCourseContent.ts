// Script para geração automática de aulas e exercícios para cursos

export interface Lesson {
  title: string;
  duration: string;
  exercises?: string[];
}

export interface Module {
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  students: number;
  rating: number;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  lessons: number;
  certificate: boolean;
  modules: Module[];
}

// Função utilitária para gerar exercícios de acordo com o nível
function generateExercises(moduleTitle: string, lessonTitle: string, level: Course['level']): string[] {
  if (level === 'beginner') {
    return [
      `Explique com suas palavras: ${lessonTitle}`,
      `Faça um resumo do módulo: ${moduleTitle}`,
      `Resolva um exercício prático simples sobre: ${lessonTitle}`,
    ];
  } else if (level === 'intermediate') {
    return [
      `Implemente um projeto intermediário relacionado a: ${lessonTitle}`,
      `Responda questões de múltipla escolha sobre: ${moduleTitle}`,
      `Resolva um desafio prático intermediário sobre: ${lessonTitle}`,
    ];
  } else {
    return [
      `Desenvolva um projeto avançado envolvendo: ${lessonTitle}`,
      `Analise um caso real relacionado a: ${moduleTitle}`,
      `Resolva um problema avançado sobre: ${lessonTitle}`,
    ];
  }
}

// Função principal: recebe cursos e retorna cursos com exercícios gerados
export function generateCourseContentWithExercises(courses: Course[]): Course[] {
  return courses.map(course => ({
    ...course,
    modules: course.modules.map(module => ({
      ...module,
      lessons: module.lessons.map(lesson => ({
        ...lesson,
        exercises: generateExercises(module.title, lesson.title, course.level),
      })),
    })),
  }));
}

// Exemplo de uso:
// import { courses } from './page';
// const cursosComExercicios = generateCourseContentWithExercises(courses);
// console.log(cursosComExercicios); 