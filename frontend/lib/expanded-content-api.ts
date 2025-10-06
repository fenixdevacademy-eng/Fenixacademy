'use client';

// API for expanded course content
export interface ExpandedContent {
    id: string;
    slug: string;
    title: string;
    description: string;
    modules: Module[];
    totalLessons: number;
    estimatedHours: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    prerequisites: string[];
    learningOutcomes: string[];
    price: number;
    currency: string;
    isPremium: boolean;
    stats?: {
        duration?: number;
        hours?: number;
        projects?: number;
        students?: number;
        rating?: number;
        reviews?: number;
        completionRate?: number;
    };
}

export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    order: number;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    content: string;
    type: 'video' | 'text' | 'interactive' | 'quiz' | 'project';
    duration: number; // in minutes
    order: number;
    isPremium: boolean;
    resources?: Resource[];
}

export interface Resource {
    id: string;
    title: string;
    type: 'pdf' | 'code' | 'video' | 'link';
    url: string;
    description?: string;
}

export type ExpandedCourse = ExpandedContent;

export class ExpandedContentAPI {
    static async getCourseContent(courseId: string): Promise<ExpandedContent | null> {
        try {
            const response = await fetch(`/api/courses/${courseId}/expanded-content`);
            if (!response.ok) {
                throw new Error('Failed to fetch course content');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching course content:', error);
            return null;
        }
    }

    static async getModuleContent(courseId: string, moduleId: string): Promise<Module | null> {
        try {
            const response = await fetch(`/api/courses/${courseId}/modules/${moduleId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch module content');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching module content:', error);
            return null;
        }
    }

    static async getLessonContent(courseId: string, moduleId: string, lessonId: string): Promise<Lesson | null> {
        try {
            const response = await fetch(`/api/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch lesson content');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching lesson content:', error);
            return null;
        }
    }

    static async updateProgress(courseId: string, moduleId: string, lessonId: string, progress: number): Promise<boolean> {
        try {
            const response = await fetch(`/api/courses/${courseId}/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    moduleId,
                    lessonId,
                    progress,
                }),
            });
            return response.ok;
        } catch (error) {
            console.error('Error updating progress:', error);
            return false;
        }
    }

    static async getProgress(courseId: string): Promise<Record<string, number> | null> {
        try {
            const response = await fetch(`/api/courses/${courseId}/progress`);
            if (!response.ok) {
                throw new Error('Failed to fetch progress');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching progress:', error);
            return null;
        }
    }
}
