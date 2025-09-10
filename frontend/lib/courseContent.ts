// Conteúdo dos cursos da Fenix Academy
export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  image: string;
  lessons: Lesson[];
  instructor: string;
  rating: number;
  students: number;
  category: string;
  tags: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  content: string;
  order: number;
  completed?: boolean;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Fundamentos de Programação',
    description: 'Aprenda os conceitos básicos de programação com Python',
    duration: '40 horas',
    level: 'beginner',
    price: 199.90,
    image: '/images/course-1.jpg',
    instructor: 'Dr. João Silva',
    rating: 4.8,
    students: 1250,
    category: 'Programação',
    tags: ['Python', 'Básico', 'Lógica'],
    lessons: [
      {
        id: '1-1',
        title: 'Introdução à Programação',
        description: 'Conceitos fundamentais',
        duration: '2 horas',
        type: 'video',
        content: 'Conteúdo da aula...',
        order: 1
      }
    ]
  },
  {
    id: '2',
    title: 'Desenvolvimento Web Moderno',
    description: 'Crie aplicações web com React e Next.js',
    duration: '60 horas',
    level: 'intermediate',
    price: 399.90,
    image: '/images/course-2.jpg',
    instructor: 'Maria Santos',
    rating: 4.9,
    students: 890,
    category: 'Desenvolvimento Web',
    tags: ['React', 'Next.js', 'JavaScript'],
    lessons: [
      {
        id: '2-1',
        title: 'Introdução ao React',
        description: 'Componentes e JSX',
        duration: '3 horas',
        type: 'video',
        content: 'Conteúdo da aula...',
        order: 1
      }
    ]
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return courses.filter(course => course.category === category);
};

export const getCoursesByLevel = (level: string): Course[] => {
  return courses.filter(course => course.level === level);
};
