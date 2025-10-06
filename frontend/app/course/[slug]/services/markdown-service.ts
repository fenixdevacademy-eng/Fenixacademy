'use client';

import { LessonMappingService } from './lesson-mapping';

export interface MarkdownLesson {
    id: number;
    title: string;
    moduleId: number;
    content: string;
    duration: string;
    type: string;
}

export class MarkdownService {
    private cache = new Map<string, MarkdownLesson>();
    private lessonMappingService: LessonMappingService;

    constructor() {
        this.lessonMappingService = new LessonMappingService();
    }

    async loadLesson(courseId: string, moduleId: string, lessonId: number): Promise<MarkdownLesson | null> {
        const cacheKey = `${courseId}-${moduleId}-${lessonId}`;

        // Verificar cache primeiro
        if (this.cache.has(cacheKey)) {
            console.log(`📦 MarkdownService: Retornando do cache: ${cacheKey}`);
            return this.cache.get(cacheKey) || null;
        }

        console.log(`📡 MarkdownService: Carregando aula da API: ${courseId}/${moduleId}/${lessonId}`);

        try {
            // Construir URL da API
            const apiUrl = `/api/lessons/${courseId}/${moduleId}/${lessonId}`;
            console.log(`🔗 URL da API: ${apiUrl}`);

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.lesson) {
                console.log(`✅ MarkdownService: Aula carregada com sucesso: ${data.lesson.title}`);

                // Armazenar no cache
                this.cache.set(cacheKey, data.lesson);

                return data.lesson;
            } else {
                console.error(`❌ MarkdownService: Resposta da API inválida:`, data);
                return null;
            }
        } catch (error) {
            console.error(`❌ MarkdownService: Erro ao carregar aula:`, error);
            return null;
        }
    }

    async loadModuleLessons(courseId: string, moduleId: string): Promise<MarkdownLesson[]> {
        console.log(`📡 MarkdownService: Carregando aulas do módulo: ${courseId}/${moduleId}`);

        // Obter todas as aulas do módulo usando o LessonMappingService
        const moduleLessons: MarkdownLesson[] = [];
        const totalLessons = this.lessonMappingService.getTotalLessons();

        // Buscar aulas do módulo específico
        for (let lessonId = 1; lessonId <= totalLessons; lessonId++) {
            const lessonMapping = this.lessonMappingService.getLessonByGlobalId(lessonId);
            if (lessonMapping && lessonMapping.moduleId === moduleId) {
                const lesson = await this.loadLesson(courseId, moduleId, lessonId);
                if (lesson) {
                    moduleLessons.push(lesson);
                }
            }
        }

        console.log(`✅ MarkdownService: ${moduleLessons.length} aulas carregadas do módulo ${moduleId}`);
        return moduleLessons;
    }

    async loadCourseLessons(courseId: string): Promise<MarkdownLesson[]> {
        try {
            console.log(`📡 MarkdownService: Carregando todas as aulas do curso: ${courseId}`);

            const allLessons: MarkdownLesson[] = [];
            const totalLessons = this.lessonMappingService.getTotalLessons();

            for (let lessonId = 1; lessonId <= totalLessons; lessonId++) {
                const lessonMapping = this.lessonMappingService.getLessonByGlobalId(lessonId);
                if (lessonMapping) {
                    const lesson = await this.loadLesson(courseId, lessonMapping.moduleId, lessonId);
                    if (lesson) {
                        allLessons.push(lesson);
                    }
                }
            }

            console.log(`✅ MarkdownService: ${allLessons.length} aulas carregadas do curso ${courseId}`);
            return allLessons;
        } catch (error) {
            console.error(`❌ MarkdownService: Erro ao carregar aulas do curso:`, error);
            return [];
        }
    }

    clearCourseCache(courseId: string): void {
        console.log(`🧹 MarkdownService: Limpando cache do curso: ${courseId}`);

        // Remover todas as entradas do cache que pertencem ao curso
        const keysToDelete: string[] = [];
        this.cache.forEach((_, key) => {
            if (key.startsWith(`${courseId}-`)) {
                keysToDelete.push(key);
            }
        });

        keysToDelete.forEach(key => {
            this.cache.delete(key);
            console.log(`🗑️ Removido do cache: ${key}`);
        });
    }

    public getCacheStats(): { total: number; courseKeys: string[] } {
        const courseKeys = new Set<string>();
        this.cache.forEach((_, key) => {
            const courseId = key.split('-')[0];
            courseKeys.add(courseId);
        });

        return {
            total: this.cache.size,
            courseKeys: Array.from(courseKeys)
        };
    }
}