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

export interface ModuleProgress {
    moduleId: number;
    courseId: string;
    completedLessons: number;
    totalLessons: number;
    progressPercentage: number;
    lastAccessed: Date;
    timeSpent: number; // em minutos
    status: 'not_started' | 'in_progress' | 'completed';
}

export interface LessonProgress {
    lessonId: number;
    moduleId: number;
    courseId: string;
    status: 'not_started' | 'in_progress' | 'completed';
    timeSpent: number; // em minutos
    lastAccessed: Date;
    completedAt?: Date;
    submissions?: any[];
}

export interface Achievement {
    id: string;
    name: string;
    title: string;
    description: string;
    icon: string;
    type: string;
    criteria: any;
    earnedAt: Date;
    unlockedAt: Date;
    points: number;
}

export interface Certificate {
    id: string;
    courseId: string;
    userId: string;
    userName: string;
    courseName: string;
    certificateUrl: string;
    verificationCode: string;
    issuedAt: Date;
    grade: number;
    totalHours: number;
    skills: string[];
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    level: string;
    points: number;
    joinDate: Date;
}

export interface StudySession {
    id: string;
    courseId: string;
    startTime: Date;
    endTime?: Date;
    duration: number;
    lessonsCompleted: number;
}

export interface ProjectSubmission {
    id: string;
    projectId: string;
    userId: string;
    submittedAt: Date;
    files: string[];
    grade?: number;
    feedback?: string;
    status: string;
}
