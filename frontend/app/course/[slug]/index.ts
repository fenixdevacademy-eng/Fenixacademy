import { Course } from './types/course-types';

// Mock course data
const mockCourses: { [key: string]: Course } = {
    'web-fundamentals': {
        id: 1,
        title: 'Fundamentos de Desenvolvimento Web',
        description: 'Aprenda os conceitos básicos de HTML, CSS e JavaScript',
        instructor: 'João Silva',
        level: 'beginner',
        duration: '40 horas',
        price: 199.90,
        category: 'Desenvolvimento Web',
        lessons: 20,
        modules: [],
        progress: 0,
        completed: false,
        enrolled: false,
        certificate: true,
        rating: 4.8,
        students: 1250,
        lastAccessed: null,
        enrolledAt: null
    },
    'python-data-science': {
        id: 2,
        title: 'Python para Data Science',
        description: 'Domine Python e suas bibliotecas para análise de dados',
        instructor: 'Maria Santos',
        level: 'intermediate',
        duration: '60 horas',
        price: 299.90,
        category: 'Data Science',
        lessons: 30,
        modules: [],
        progress: 0,
        completed: false,
        enrolled: false,
        certificate: true,
        rating: 4.9,
        students: 890,
        lastAccessed: null,
        enrolledAt: null
    },
    'react-advanced': {
        id: 3,
        title: 'React Avançado',
        description: 'Aprenda React avançado com hooks, context e performance',
        instructor: 'Pedro Costa',
        level: 'advanced',
        duration: '50 horas',
        price: 399.90,
        category: 'Desenvolvimento Web',
        lessons: 25,
        modules: [],
        progress: 0,
        completed: false,
        enrolled: false,
        certificate: true,
        rating: 4.7,
        students: 650,
        lastAccessed: null,
        enrolledAt: null
    }
};

export function getCourseContent(courseId: string): Course | null {
    return mockCourses[courseId] || null;
}

export function getAllCourses(): Course[] {
    return Object.values(mockCourses);
}

export function getCoursesByCategory(category: string): Course[] {
    return Object.values(mockCourses).filter(course => course.category === category);
}

export function getCoursesByLevel(level: string): Course[] {
    return Object.values(mockCourses).filter(course => course.level === level);
}

export function searchCourses(query: string): Course[] {
    const lowercaseQuery = query.toLowerCase();
    return Object.values(mockCourses).filter(course =>
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.description.toLowerCase().includes(lowercaseQuery) ||
        course.instructor.toLowerCase().includes(lowercaseQuery) ||
        course.category.toLowerCase().includes(lowercaseQuery)
    );
}

export default {
    getCourseContent,
    getAllCourses,
    getCoursesByCategory,
    getCoursesByLevel,
    searchCourses
};