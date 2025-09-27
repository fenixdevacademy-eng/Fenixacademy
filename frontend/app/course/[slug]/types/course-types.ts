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
    lessons: Lesson[];
    completed: boolean;
    progress: number;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    price: number;
    category: string;
    lessons: number;
    modules: Module[];
    progress: number;
    completed: boolean;
    enrolled: boolean;
    certificate: boolean;
    rating: number;
    students: number;
    lastAccessed: string | null;
    enrolledAt: string | null;
    completedAt?: string;
}

export default {
    Lesson,
    Module,
    Course
};