// Lesson mapping service for course content
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'video' | 'text' | 'exercise' | 'quiz' | 'project';
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  objectives: string[];
  resources: Resource[];
  exercises: Exercise[];
  completed: boolean;
  progress: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'code';
  url: string;
  description?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'coding' | 'multiple_choice' | 'fill_blank' | 'project';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  solution?: string;
  hints: string[];
  testCases?: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
  completed: boolean;
  progress: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  totalDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  objectives: string[];
  instructor: string;
  language: string;
  price: number;
  currency: string;
  thumbnail: string;
  tags: string[];
  rating: number;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export class LessonMappingService {
  private static courses: Course[] = [];

  static getCourse(courseId: string): Course | null {
    return this.courses.find(course => course.id === courseId) || null;
  }

  static getLesson(courseId: string, lessonId: string): Lesson | null {
    const course = this.getCourse(courseId);
    if (!course) return null;

    for (const module of course.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  }

  static updateLessonProgress(courseId: string, lessonId: string, progress: number): boolean {
    const lesson = this.getLesson(courseId, lessonId);
    if (!lesson) return false;

    lesson.progress = Math.max(0, Math.min(100, progress));
    lesson.completed = lesson.progress === 100;
    return true;
  }

  static getCourseProgress(courseId: string): number {
    const course = this.getCourse(courseId);
    if (!course) return 0;

    const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const totalProgress = course.modules.reduce((sum, module) => {
      return sum + module.lessons.reduce((moduleSum, lesson) => moduleSum + lesson.progress, 0);
    }, 0);

    return totalLessons > 0 ? totalProgress / totalLessons : 0;
  }
}





