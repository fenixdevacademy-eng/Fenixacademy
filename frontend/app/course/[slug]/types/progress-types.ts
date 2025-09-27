export interface CourseProgress {
    courseId: string;
    userId: string;
    completedLessons: number;
    totalLessons: number;
    completedModules: number;
    totalModules: number;
    progressPercentage: number;
    lastAccessed: Date;
    timeSpent: number; // em minutos
    status: 'not_started' | 'in_progress' | 'completed' | 'certified';
    overallGrade?: number;
    totalTimeSpent: number; // em minutos
}

export default {
    CourseProgress
};