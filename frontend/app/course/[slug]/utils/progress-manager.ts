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

    private constructor() { }

    static getInstance(): ProgressManager {
        if (!ProgressManager.instance) {
            ProgressManager.instance = new ProgressManager();
        }
        return ProgressManager.instance;
    }

    // Gerenciamento de dados locais
    private loadData(): any {
        if (typeof window === 'undefined') return {};
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : {};
    }

    private saveData(data: any): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // Progresso de Aulas
    markLessonAsStarted(courseId: string, moduleId: number, lessonId: number): void {
        const data = this.loadData();
        const key = `${courseId}-${moduleId}-${lessonId}`;

        if (!data.lessons) data.lessons = {};
        if (!data.lessons[key]) {
            data.lessons[key] = {
                lessonId,
                courseId,
                moduleId,
                status: 'in_progress',
                timeSpent: 0,
                submissions: []
            };
        }

        this.saveData(data);
        this.updateModuleProgress(courseId, moduleId);
        this.updateCourseProgress(courseId);
    }

    markLessonAsCompleted(courseId: string, moduleId: number, lessonId: number, score?: number): void {
        const data = this.loadData();
        const key = `${courseId}-${moduleId}-${lessonId}`;

        if (!data.lessons) data.lessons = {};

        data.lessons[key] = {
            ...data.lessons[key],
            lessonId,
            courseId,
            moduleId,
            status: 'completed',
            completedAt: new Date(),
            score
        };

        this.saveData(data);
        this.updateModuleProgress(courseId, moduleId);
        this.updateCourseProgress(courseId);
        this.checkAchievements(courseId, moduleId, lessonId);
    }

    addStudyTime(courseId: string, moduleId: number, lessonId: number, minutes: number): void {
        const data = this.loadData();
        const key = `${courseId}-${moduleId}-${lessonId}`;

        if (!data.lessons) data.lessons = {};
        if (!data.lessons[key]) return;

        data.lessons[key].timeSpent = (data.lessons[key].timeSpent || 0) + minutes;
        this.saveData(data);
    }

    getLessonProgress(courseId: string, moduleId: number, lessonId: number): LessonProgress | null {
        const data = this.loadData();
        const key = `${courseId}-${moduleId}-${lessonId}`;
        return data.lessons?.[key] || null;
    }

    // Progresso de Módulos
    private updateModuleProgress(courseId: string, moduleId: number): void {
        const data = this.loadData();
        if (!data.modules) data.modules = {};

        const lessons = Object.values(data.lessons || {}) as LessonProgress[];
        const moduleLessons = lessons.filter(l => l.courseId === courseId && l.moduleId === moduleId);
        const completedLessons = moduleLessons.filter(l => l.status === 'completed').length;

        // Assumindo 20 aulas por módulo (pode ser obtido da estrutura do curso)
        const totalLessons = 20;

        const moduleKey = `${courseId}-${moduleId}`;
        data.modules[moduleKey] = {
            moduleId,
            courseId,
            status: completedLessons === 0 ? 'not_started' :
                completedLessons === totalLessons ? 'completed' : 'in_progress',
            completedLessons,
            totalLessons,
            completedAt: completedLessons === totalLessons ? new Date() : undefined
        };

        this.saveData(data);
    }

    getModuleProgress(courseId: string, moduleId: number): ModuleProgress | null {
        const data = this.loadData();
        const key = `${courseId}-${moduleId}`;
        return data.modules?.[key] || null;
    }

    // Progresso de Cursos
    private updateCourseProgress(courseId: string): void {
        const data = this.loadData();
        if (!data.courses) data.courses = {};

        const modules = Object.values(data.modules || {}) as ModuleProgress[];
        const courseModules = modules.filter(m => m.courseId === courseId);
        const completedModules = courseModules.filter(m => m.status === 'completed').length;

        const lessons = Object.values(data.lessons || {}) as LessonProgress[];
        const courseLessons = lessons.filter(l => l.courseId === courseId);
        const completedLessons = courseLessons.filter(l => l.status === 'completed').length;
        const totalTimeSpent = courseLessons.reduce((sum, l) => sum + (l.timeSpent || 0), 0);

        // Valores padrão (podem ser obtidos da estrutura do curso)
        const totalModules = 30;
        const totalLessons = 600;

        if (!data.courses[courseId]) {
            data.courses[courseId] = {
                courseId,
                userId: 'current-user',
                enrolledAt: new Date(),
                status: 'not_started'
            };
        }

        data.courses[courseId] = {
            ...data.courses[courseId],
            status: completedLessons === 0 ? 'not_started' :
                completedModules === totalModules ? 'completed' : 'in_progress',
            completedModules,
            totalModules,
            completedLessons,
            totalLessons,
            totalTimeSpent,
            completedAt: completedModules === totalModules ? new Date() : undefined
        };

        this.saveData(data);
    }

    getCourseProgress(courseId: string): CourseProgress | null {
        const data = this.loadData();
        return data.courses?.[courseId] || null;
    }

    // Sistema de Certificação
    generateCertificate(courseId: string): Certificate | null {
        const courseProgress = this.getCourseProgress(courseId);
        if (!courseProgress || courseProgress.status !== 'completed') {
            return null;
        }

        const certificate: Certificate = {
            id: this.generateId(),
            courseId,
            userId: courseProgress.userId,
            userName: 'Usuário Fenix',
            courseName: this.getCourseTitle(courseId),
            issuedAt: new Date(),
            grade: courseProgress.overallGrade || 85,
            totalHours: Math.round(courseProgress.totalTimeSpent / 60),
            skills: this.getCourseSkills(courseId),
            certificateUrl: `/certificates/${courseId}`,
            verificationCode: this.generateVerificationCode()
        };

        // Salvar certificado
        const data = this.loadData();
        if (!data.certificates) data.certificates = {};
        data.certificates[certificate.id] = certificate;

        // Atualizar progresso do curso
        data.courses[courseId].status = 'certified';
        data.courses[courseId].certifiedAt = new Date();
        data.courses[courseId].certificateId = certificate.id;

        this.saveData(data);
        return certificate;
    }

    getCertificate(certificateId: string): Certificate | null {
        const data = this.loadData();
        return data.certificates?.[certificateId] || null;
    }

    getUserCertificates(): Certificate[] {
        const data = this.loadData();
        return Object.values(data.certificates || {}) as Certificate[];
    }

    // Sistema de Conquistas
    private checkAchievements(courseId: string, moduleId: number, lessonId: number): void {
        const achievements: Achievement[] = [];

        // Primeira aula concluída
        if (lessonId === 1 && moduleId === 1) {
            achievements.push({
                id: 'first-lesson',
                name: 'Primeira Aula',
                title: 'Primeira Aula',
                description: 'Concluiu sua primeira aula',
                icon: '🎯',
                type: 'special',
                criteria: {},
                earnedAt: new Date(),
                unlockedAt: new Date(),
                points: 10
            });
        }

        // Módulo completo
        const moduleProgress = this.getModuleProgress(courseId, moduleId);
        if (moduleProgress?.status === 'completed') {
            achievements.push({
                id: `module-${moduleId}-complete`,
                name: `Módulo ${moduleId} Concluído`,
                title: `Módulo ${moduleId} Concluído`,
                description: `Concluiu o módulo ${moduleId}`,
                icon: '📚',
                type: 'course_completion',
                criteria: { courseId },
                earnedAt: new Date(),
                unlockedAt: new Date(),
                points: 25
            });
        }

        // Curso completo
        const courseProgress = this.getCourseProgress(courseId);
        if (courseProgress?.status === 'completed') {
            achievements.push({
                id: `course-${courseId}-complete`,
                name: 'Curso Concluído',
                title: 'Curso Concluído',
                description: `Concluiu o curso ${this.getCourseTitle(courseId)}`,
                icon: '🏆',
                type: 'course_completion',
                criteria: { courseId },
                earnedAt: new Date(),
                unlockedAt: new Date(),
                points: 100
            });
        }

        // Salvar conquistas
        if (achievements.length > 0) {
            const data = this.loadData();
            if (!data.achievements) data.achievements = [];
            data.achievements.push(...achievements);
            this.saveData(data);
        }
    }

    getUserAchievements(): Achievement[] {
        const data = this.loadData();
        return data.achievements || [];
    }

    // Submissão de Projetos
    submitProject(courseId: string, moduleId: number, lessonId: number, submission: Omit<ProjectSubmission, 'id' | 'submittedAt' | 'status'>): string {
        const data = this.loadData();
        const lessonKey = `${courseId}-${moduleId}-${lessonId}`;

        if (!data.lessons) data.lessons = {};
        if (!data.lessons[lessonKey]) {
            data.lessons[lessonKey] = {
                lessonId,
                courseId,
                moduleId,
                status: 'in_progress',
                timeSpent: 0,
                submissions: []
            };
        }

        const projectSubmission: ProjectSubmission = {
            ...submission,
            id: this.generateId(),
            submittedAt: new Date(),
            status: 'submitted'
        };

        data.lessons[lessonKey].submissions.push(projectSubmission);
        this.saveData(data);

        return projectSubmission.id;
    }

    getProjectSubmissions(courseId: string, moduleId: number, lessonId: number): ProjectSubmission[] {
        const lessonProgress = this.getLessonProgress(courseId, moduleId, lessonId);
        return lessonProgress?.submissions || [];
    }

    // Utilitários
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    private generateVerificationCode(): string {
        return Math.random().toString(36).substr(2, 8).toUpperCase();
    }

    private getCourseTitle(courseId: string): string {
        const titles: { [key: string]: string } = {
            'python-data-science': 'Python Data Science',
            'fundamentos-desenvolvimento-web': 'Fundamentos de Desenvolvimento Web',
            'react-avancado': 'React Avançado',
            'nodejs-backend-development': 'Node.js Backend Development'
        };
        return titles[courseId] || 'Curso Fenix';
    }

    private getCourseSkills(courseId: string): string[] {
        const skills: { [key: string]: string[] } = {
            'python-data-science': ['Python', 'Data Science', 'Machine Learning', 'Statistics', 'Data Visualization'],
            'fundamentos-desenvolvimento-web': ['HTML5', 'CSS3', 'JavaScript', 'Web Development', 'Responsive Design'],
            'react-avancado': ['React', 'JavaScript', 'Frontend Development', 'Component Architecture'],
            'nodejs-backend-development': ['Node.js', 'Backend Development', 'API Development', 'Database Design']
        };
        return skills[courseId] || ['Programming', 'Software Development'];
    }

    // Estatísticas e Dashboard
    getUserStats() {
        const data = this.loadData();
        const courses = Object.values(data.courses || {}) as CourseProgress[];
        const achievements = data.achievements || [];
        const certificates = Object.values(data.certificates || {}) as Certificate[];

        return {
            totalCourses: courses.length,
            completedCourses: courses.filter(c => c.status === 'completed' || c.status === 'certified').length,
            totalStudyTime: courses.reduce((sum, c) => sum + (c.totalTimeSpent || 0), 0),
            totalAchievements: achievements.length,
            totalCertificates: certificates.length,
            averageGrade: certificates.length > 0 ?
                certificates.reduce((sum, c) => sum + c.grade, 0) / certificates.length : 0
        };
    }

    // Reset (para desenvolvimento)
    resetProgress(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.storageKey);
        }
    }
}
