'use client';

// Sistema de gerenciamento de progresso e certificação
import {
    LessonProgress,
    ModuleProgress,
    CourseProgress,
    Certificate,
    Achievement,
    UserProfile,
    StudySession,
    ProjectSubmission
} from '../types/progress-types';

export class ProgressManager {
    private static instance: ProgressManager;
    private storageKey = 'fenix-progress';

    private constructor() {
        // Private constructor for singleton pattern
    }

    public static getInstance(): ProgressManager {
        if (!ProgressManager.instance) {
            ProgressManager.instance = new ProgressManager();
        }
        return ProgressManager.instance;
    }

    // Gerenciamento de dados locais
    private getStoredData(): any {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return {};
        }
    }

    private setStoredData(data: any): void {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }

    // Progresso de Aulas
    updateLessonProgress(courseId: string, moduleId: string, lessonId: string, progress: Partial<LessonProgress>): void {
        const data = this.getStoredData();

        if (!data.courses) data.courses = {};
        if (!data.courses[courseId]) data.courses[courseId] = {};
        if (!data.courses[courseId].modules) data.courses[courseId].modules = {};
        if (!data.courses[courseId].modules[moduleId]) data.courses[courseId].modules[moduleId] = {};
        if (!data.courses[courseId].modules[moduleId].lessons) data.courses[courseId].modules[moduleId].lessons = {};

        const existingProgress = data.courses[courseId].modules[moduleId].lessons[lessonId] || {};
        data.courses[courseId].modules[moduleId].lessons[lessonId] = {
            ...existingProgress,
            ...progress,
            lastUpdated: new Date().toISOString()
        };

        this.setStoredData(data);
    }

    getLessonProgress(courseId: string, moduleId: string, lessonId: string): LessonProgress | null {
        const data = this.getStoredData();
        return data.courses?.[courseId]?.modules?.[moduleId]?.lessons?.[lessonId] || null;
    }

    // Progresso de Módulos
    updateModuleProgress(courseId: string, moduleId: string, progress: Partial<ModuleProgress>): void {
        const data = this.getStoredData();

        if (!data.courses) data.courses = {};
        if (!data.courses[courseId]) data.courses[courseId] = {};
        if (!data.courses[courseId].modules) data.courses[courseId].modules = {};

        const existingProgress = data.courses[courseId].modules[moduleId] || {};
        data.courses[courseId].modules[moduleId] = {
            ...existingProgress,
            ...progress,
            lastUpdated: new Date().toISOString()
        };

        this.setStoredData(data);
    }

    getModuleProgress(courseId: string, moduleId: string): ModuleProgress | null {
        const data = this.getStoredData();
        return data.courses?.[courseId]?.modules?.[moduleId] || null;
    }

    // Progresso de Cursos
    updateCourseProgress(courseId: string, progress: Partial<CourseProgress>): void {
        const data = this.getStoredData();

        if (!data.courses) data.courses = {};

        const existingProgress = data.courses[courseId] || {};
        data.courses[courseId] = {
            ...existingProgress,
            ...progress,
            lastUpdated: new Date().toISOString()
        };

        this.setStoredData(data);
    }

    getCourseProgress(courseId: string): CourseProgress | null {
        const data = this.getStoredData();
        return data.courses?.[courseId] || null;
    }

    // Sessões de Estudo
    startStudySession(courseId: string, moduleId?: string, lessonId?: string): StudySession {
        const session: StudySession = {
            id: `session_${Date.now()}`,
            courseId,
            moduleId,
            lessonId,
            startTime: new Date().toISOString(),
            endTime: null,
            duration: 0,
            activities: []
        };

        const data = this.getStoredData();
        if (!data.studySessions) data.studySessions = [];
        data.studySessions.push(session);
        this.setStoredData(data);

        return session;
    }

    endStudySession(sessionId: string): StudySession | null {
        const data = this.getStoredData();
        const sessions = data.studySessions || [];
        const sessionIndex = sessions.findIndex((s: StudySession) => s.id === sessionId);

        if (sessionIndex === -1) return null;

        const endTime = new Date();
        const startTime = new Date(sessions[sessionIndex].startTime);
        const duration = endTime.getTime() - startTime.getTime();

        sessions[sessionIndex] = {
            ...sessions[sessionIndex],
            endTime: endTime.toISOString(),
            duration: Math.floor(duration / 1000) // Duration in seconds
        };

        data.studySessions = sessions;
        this.setStoredData(data);

        return sessions[sessionIndex];
    }

    getStudySessions(courseId?: string): StudySession[] {
        const data = this.getStoredData();
        const sessions = data.studySessions || [];

        if (courseId) {
            return sessions.filter((s: StudySession) => s.courseId === courseId);
        }

        return sessions;
    }

    // Conquistas
    addAchievement(achievement: Achievement): void {
        const data = this.getStoredData();
        if (!data.achievements) data.achievements = [];

        const existingIndex = data.achievements.findIndex((a: Achievement) => a.id === achievement.id);
        if (existingIndex === -1) {
            data.achievements.push({
                ...achievement,
                earnedAt: new Date().toISOString()
            });
            this.setStoredData(data);
        }
    }

    getUserAchievements(): Achievement[] {
        const data = this.getStoredData();
        return data.achievements || [];
    }

    // Certificados
    generateCertificate(courseId: string): Certificate | null {
        const courseProgress = this.getCourseProgress(courseId);
        if (!courseProgress || courseProgress.overallProgress < 80) {
            return null;
        }

        const certificate: Certificate = {
            id: `cert_${courseId}_${Date.now()}`,
            courseId,
            courseName: courseProgress.courseName || 'Curso',
            studentName: this.getUserProfile()?.name || 'Estudante',
            issuedAt: new Date().toISOString(),
            grade: courseProgress.overallProgress,
            verificationCode: this.generateVerificationCode()
        };

        const data = this.getStoredData();
        if (!data.certificates) data.certificates = [];
        data.certificates.push(certificate);
        this.setStoredData(data);

        return certificate;
    }

    getUserCertificates(): Certificate[] {
        const data = this.getStoredData();
        return data.certificates || [];
    }

    // Perfil do Usuário
    updateUserProfile(profile: Partial<UserProfile>): void {
        const data = this.getStoredData();
        data.userProfile = {
            ...data.userProfile,
            ...profile,
            lastUpdated: new Date().toISOString()
        };
        this.setStoredData(data);
    }

    getUserProfile(): UserProfile | null {
        const data = this.getStoredData();
        return data.userProfile || null;
    }

    // Estatísticas
    getUserStats(): any {
        const data = this.getStoredData();
        const courses = data.courses || {};
        const achievements = data.achievements || [];
        const certificates = data.certificates || [];
        const sessions = data.studySessions || [];

        const totalCourses = Object.keys(courses).length;
        const completedCourses = Object.values(courses).filter((c: any) => c.overallProgress >= 100).length;
        const totalHours = sessions.reduce((total: number, session: StudySession) => {
            return total + (session.duration || 0);
        }, 0) / 3600; // Convert seconds to hours

        return {
            totalCourses,
            completedCourses,
            totalHours: Math.round(totalHours),
            achievements: achievements.length,
            certificates: certificates.length
        };
    }

    // Submissões de Projetos
    submitProject(submission: ProjectSubmission): void {
        const data = this.getStoredData();
        if (!data.projectSubmissions) data.projectSubmissions = [];

        data.projectSubmissions.push({
            ...submission,
            submittedAt: new Date().toISOString()
        });

        this.setStoredData(data);
    }

    getProjectSubmissions(courseId?: string): ProjectSubmission[] {
        const data = this.getStoredData();
        const submissions = data.projectSubmissions || [];

        if (courseId) {
            return submissions.filter((s: ProjectSubmission) => s.courseId === courseId);
        }

        return submissions;
    }

    // Utilitários
    private generateVerificationCode(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Limpeza de dados
    clearAllData(): void {
        localStorage.removeItem(this.storageKey);
    }

    clearCourseData(courseId: string): void {
        const data = this.getStoredData();
        if (data.courses && data.courses[courseId]) {
            delete data.courses[courseId];
            this.setStoredData(data);
        }
    }

    // Exportar dados
    exportData(): string {
        const data = this.getStoredData();
        return JSON.stringify(data, null, 2);
    }

    // Importar dados
    importData(jsonData: string): boolean {
        try {
            const data = JSON.parse(jsonData);
            this.setStoredData(data);
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
}