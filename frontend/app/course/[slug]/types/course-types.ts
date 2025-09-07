export interface Lesson {
    id: number;
    title: string;
    type: 'video' | 'exercise' | 'project' | 'text' | 'quiz';
    duration: string;
    content: string;
    completed: boolean;
    locked: boolean;
}

export interface Module {
    id: number;
    title: string;
    description: string;
    duration_hours: number;
    lessons: Lesson[];
}

export interface CourseContent {
    id: string;
    title: string;
    description: string;
    category: string;
    level: 'Iniciante' | 'Intermediário' | 'Avançado';
    duration_hours: number;
    total_modules: number;
    total_lessons: number;
    price: number;
    currency: string;
    instructor: string;
    certificate: boolean;
    languages: string[];
    tags: string[];
    thumbnail: string;
    status: 'active' | 'inactive' | 'draft';
    modules: Module[];
}

export interface CourseSummary {
    id: string;
    title: string;
    description: string;
    category: string;
    level: 'Iniciante' | 'Intermediário' | 'Avançado';
    duration_hours: number;
    modules: number;
    lessons: number;
    price: number;
    currency: string;
    thumbnail: string;
    status: 'active' | 'inactive' | 'draft';
}

export interface CourseProgress {
    courseId: string;
    completedLessons: number;
    totalLessons: number;
    completedModules: number;
    totalModules: number;
    progressPercentage: number;
    lastAccessed: Date;
    timeSpent: number; // em minutos
}

export interface UserProgress {
    userId: string;
    courses: CourseProgress[];
    totalTimeSpent: number;
    certificates: string[];
    achievements: string[];
}











