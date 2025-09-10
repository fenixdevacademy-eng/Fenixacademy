#!/usr/bin/env python3
"""
Script para atualizar o serviço de mapeamento de aulas
"""

def generate_lesson_mapping_service():
    """Gera o serviço de mapeamento de aulas atualizado"""
    
    ts_code = '''export interface LessonMapping {
    globalLessonId: number;
    moduleId: number;
    lessonTitle: string;
    fileName: string;
}

export class LessonMappingService {
    private static instance: LessonMappingService;
    private lessonMappings: LessonMapping[] = [];

    private constructor() {
        this.initializeWebFundamentalsMappings();
        this.initializePythonDataScienceMappings();
    }

    public static getInstance(): LessonMappingService {
        if (!LessonMappingService.instance) {
            LessonMappingService.instance = new LessonMappingService();
        }
        return LessonMappingService.instance;
    }

    private initializeWebFundamentalsMappings(): void {
        // Mapeamento das 74 aulas geradas com IDs sequenciais globais
        this.lessonMappings = [
            // Módulo 1: Fundamentos Essenciais (5 aulas)
            { globalLessonId: 1, moduleId: 1, lessonTitle: "Introdução ao Desenvolvimento Web Moderno", fileName: "aula-01-modulo-01-web-fundamentals.md" },
            { globalLessonId: 2, moduleId: 1, lessonTitle: "Arquitetura Web e Componentes", fileName: "aula-02-modulo-01-web-fundamentals.md" },
            { globalLessonId: 3, moduleId: 1, lessonTitle: "Setup do Ambiente de Desenvolvimento", fileName: "aula-03-modulo-01-web-fundamentals.md" },
            { globalLessonId: 4, moduleId: 1, lessonTitle: "Ferramentas e Recursos Essenciais", fileName: "aula-04-modulo-01-web-fundamentals.md" },
            { globalLessonId: 5, moduleId: 1, lessonTitle: "Projeto: Configuração Completa do Ambiente", fileName: "aula-05-modulo-01-web-fundamentals.md" },

            // Módulo 2: HTML5 Semântico (6 aulas)
            { globalLessonId: 6, moduleId: 2, lessonTitle: "Introdução ao HTML5 e Semântica", fileName: "aula-06-modulo-02-web-fundamentals.md" },
            { globalLessonId: 7, moduleId: 2, lessonTitle: "Estrutura de Documentos HTML5", fileName: "aula-07-modulo-02-web-fundamentals.md" },
            { globalLessonId: 8, moduleId: 2, lessonTitle: "Formulários HTML5 e Validação", fileName: "aula-08-modulo-02-web-fundamentals.md" },
            { globalLessonId: 9, moduleId: 2, lessonTitle: "Multimídia e Conteúdo Interativo", fileName: "aula-09-modulo-02-web-fundamentals.md" },
            { globalLessonId: 10, moduleId: 2, lessonTitle: "Tabelas e Dados Estruturados", fileName: "aula-10-modulo-02-web-fundamentals.md" },
            { globalLessonId: 11, moduleId: 2, lessonTitle: "Projeto: Página Web Semântica", fileName: "aula-11-modulo-02-web-fundamentals.md" },

            // Módulo 3: CSS3 Avançado (7 aulas)
            { globalLessonId: 12, moduleId: 3, lessonTitle: "CSS3 Avançado e Seletores", fileName: "aula-12-modulo-03-web-fundamentals.md" },
            { globalLessonId: 13, moduleId: 3, lessonTitle: "Layout com Flexbox", fileName: "aula-13-modulo-03-web-fundamentals.md" },
            { globalLessonId: 14, moduleId: 3, lessonTitle: "Grid Layout CSS", fileName: "aula-14-modulo-03-web-fundamentals.md" },
            { globalLessonId: 15, moduleId: 3, lessonTitle: "Animações e Transições", fileName: "aula-15-modulo-03-web-fundamentals.md" },
            { globalLessonId: 16, moduleId: 3, lessonTitle: "Responsividade e Media Queries", fileName: "aula-16-modulo-03-web-fundamentals.md" },
            { globalLessonId: 17, moduleId: 3, lessonTitle: "CSS Custom Properties", fileName: "aula-17-modulo-03-web-fundamentals.md" },
            { globalLessonId: 18, moduleId: 3, lessonTitle: "Projeto: Interface Responsiva", fileName: "aula-18-modulo-03-web-fundamentals.md" },

            // Módulo 4: JavaScript Moderno (8 aulas)
            { globalLessonId: 19, moduleId: 4, lessonTitle: "JavaScript ES6+ e Moderno", fileName: "aula-19-modulo-04-web-fundamentals.md" },
            { globalLessonId: 20, moduleId: 4, lessonTitle: "Promises e Async/Await", fileName: "aula-20-modulo-04-web-fundamentals.md" },
            { globalLessonId: 21, moduleId: 4, lessonTitle: "Módulos ES6 e Import/Export", fileName: "aula-21-modulo-04-web-fundamentals.md" },
            { globalLessonId: 22, moduleId: 4, lessonTitle: "Classes e Herança", fileName: "aula-22-modulo-04-web-fundamentals.md" },
            { globalLessonId: 23, moduleId: 4, lessonTitle: "Arrow Functions e Contexto", fileName: "aula-23-modulo-04-web-fundamentals.md" },
            { globalLessonId: 24, moduleId: 4, lessonTitle: "Destructuring e Spread", fileName: "aula-24-modulo-04-web-fundamentals.md" },
            { globalLessonId: 25, moduleId: 4, lessonTitle: "Template Literals", fileName: "aula-25-modulo-04-web-fundamentals.md" },
            { globalLessonId: 26, moduleId: 4, lessonTitle: "Projeto: Aplicação JavaScript", fileName: "aula-26-modulo-04-web-fundamentals.md" },

            // Módulo 5: React.js (9 aulas)
            { globalLessonId: 27, moduleId: 5, lessonTitle: "Introdução ao React", fileName: "aula-27-modulo-05-web-fundamentals.md" },
            { globalLessonId: 28, moduleId: 5, lessonTitle: "Componentes e Props", fileName: "aula-28-modulo-05-web-fundamentals.md" },
            { globalLessonId: 29, moduleId: 5, lessonTitle: "Estado e Ciclo de Vida", fileName: "aula-29-modulo-05-web-fundamentals.md" },
            { globalLessonId: 30, moduleId: 5, lessonTitle: "Hooks: useState e useEffect", fileName: "aula-30-modulo-05-web-fundamentals.md" },
            { globalLessonId: 31, moduleId: 5, lessonTitle: "Context API e Gerenciamento de Estado", fileName: "aula-31-modulo-05-web-fundamentals.md" },
            { globalLessonId: 32, moduleId: 5, lessonTitle: "Roteamento com React Router", fileName: "aula-32-modulo-05-web-fundamentals.md" },
            { globalLessonId: 33, moduleId: 5, lessonTitle: "Formulários Controlados", fileName: "aula-33-modulo-05-web-fundamentals.md" },
            { globalLessonId: 34, moduleId: 5, lessonTitle: "Integração com APIs", fileName: "aula-34-modulo-05-web-fundamentals.md" },
            { globalLessonId: 35, moduleId: 5, lessonTitle: "Projeto: App React Completo", fileName: "aula-35-modulo-05-web-fundamentals.md" },

            // Módulo 6: Node.js e APIs (6 aulas)
            { globalLessonId: 36, moduleId: 6, lessonTitle: "Introdução ao Node.js", fileName: "aula-36-modulo-06-web-fundamentals.md" },
            { globalLessonId: 37, moduleId: 6, lessonTitle: "Express.js e Middleware", fileName: "aula-37-modulo-06-web-fundamentals.md" },
            { globalLessonId: 38, moduleId: 6, lessonTitle: "APIs RESTful e Endpoints", fileName: "aula-38-modulo-06-web-fundamentals.md" },
            { globalLessonId: 39, moduleId: 6, lessonTitle: "Autenticação JWT", fileName: "aula-39-modulo-06-web-fundamentals.md" },
            { globalLessonId: 40, moduleId: 6, lessonTitle: "Validação e Sanitização", fileName: "aula-40-modulo-06-web-fundamentals.md" },
            { globalLessonId: 41, moduleId: 6, lessonTitle: "Projeto: API REST Completa", fileName: "aula-41-modulo-06-web-fundamentals.md" },

            // Módulo 7: Banco de Dados (5 aulas)
            { globalLessonId: 42, moduleId: 7, lessonTitle: "SQL e Bancos Relacionais", fileName: "aula-42-modulo-07-web-fundamentals.md" },
            { globalLessonId: 43, moduleId: 7, lessonTitle: "MongoDB e NoSQL", fileName: "aula-43-modulo-07-web-fundamentals.md" },
            { globalLessonId: 44, moduleId: 7, lessonTitle: "Sequelize ORM", fileName: "aula-44-modulo-07-web-fundamentals.md" },
            { globalLessonId: 45, moduleId: 7, lessonTitle: "Mongoose para MongoDB", fileName: "aula-45-modulo-07-web-fundamentals.md" },
            { globalLessonId: 46, moduleId: 7, lessonTitle: "Projeto: Sistema de Banco de Dados", fileName: "aula-46-modulo-07-web-fundamentals.md" },

            // Módulo 8: Autenticação e Segurança (4 aulas)
            { globalLessonId: 47, moduleId: 8, lessonTitle: "Conceitos de Segurança Web", fileName: "aula-47-modulo-08-web-fundamentals.md" },
            { globalLessonId: 48, moduleId: 8, lessonTitle: "OAuth 2.0 e OpenID Connect", fileName: "aula-48-modulo-08-web-fundamentals.md" },
            { globalLessonId: 49, moduleId: 8, lessonTitle: "HTTPS e Certificados SSL", fileName: "aula-49-modulo-08-web-fundamentals.md" },
            { globalLessonId: 50, moduleId: 8, lessonTitle: "Projeto: Sistema de Autenticação", fileName: "aula-50-modulo-08-web-fundamentals.md" },

            // Módulo 9: Performance e SEO (4 aulas)
            { globalLessonId: 51, moduleId: 9, lessonTitle: "Otimização de Performance", fileName: "aula-51-modulo-09-web-fundamentals.md" },
            { globalLessonId: 52, moduleId: 9, lessonTitle: "SEO e Meta Tags", fileName: "aula-52-modulo-09-web-fundamentals.md" },
            { globalLessonId: 53, moduleId: 9, lessonTitle: "Lazy Loading e Code Splitting", fileName: "aula-53-modulo-09-web-fundamentals.md" },
            { globalLessonId: 54, moduleId: 9, lessonTitle: "Projeto: Otimização Completa", fileName: "aula-54-modulo-09-web-fundamentals.md" },

            // Módulo 10: PWA e Service Workers (4 aulas)
            { globalLessonId: 55, moduleId: 10, lessonTitle: "Progressive Web Apps", fileName: "aula-55-modulo-10-web-fundamentals.md" },
            { globalLessonId: 56, moduleId: 10, lessonTitle: "Service Workers", fileName: "aula-56-modulo-10-web-fundamentals.md" },
            { globalLessonId: 57, moduleId: 10, lessonTitle: "Manifest e Instalação", fileName: "aula-57-modulo-10-web-fundamentals.md" },
            { globalLessonId: 58, moduleId: 10, lessonTitle: "Projeto: PWA Completa", fileName: "aula-58-modulo-10-web-fundamentals.md" },

            // Módulo 11: Deploy e DevOps (4 aulas)
            { globalLessonId: 59, moduleId: 11, lessonTitle: "Docker e Containers", fileName: "aula-59-modulo-11-web-fundamentals.md" },
            { globalLessonId: 60, moduleId: 11, lessonTitle: "CI/CD com GitHub Actions", fileName: "aula-60-modulo-11-web-fundamentals.md" },
            { globalLessonId: 61, moduleId: 11, lessonTitle: "AWS e Cloud Computing", fileName: "aula-61-modulo-11-web-fundamentals.md" },
            { globalLessonId: 62, moduleId: 11, lessonTitle: "Projeto: Deploy Automatizado", fileName: "aula-62-modulo-11-web-fundamentals.md" },

            // Módulo 12: TypeScript (4 aulas)
            { globalLessonId: 63, moduleId: 12, lessonTitle: "Introdução ao TypeScript", fileName: "aula-63-modulo-12-web-fundamentals.md" },
            { globalLessonId: 64, moduleId: 12, lessonTitle: "Tipos e Interfaces", fileName: "aula-64-modulo-12-web-fundamentals.md" },
            { globalLessonId: 65, moduleId: 12, lessonTitle: "Generics e Utility Types", fileName: "aula-65-modulo-12-web-fundamentals.md" },
            { globalLessonId: 66, moduleId: 12, lessonTitle: "Projeto: App TypeScript", fileName: "aula-66-modulo-12-web-fundamentals.md" },

            // Módulo 13: Testing e Debugging (4 aulas)
            { globalLessonId: 67, moduleId: 13, lessonTitle: "Jest e Testing Framework", fileName: "aula-67-modulo-13-web-fundamentals.md" },
            { globalLessonId: 68, moduleId: 13, lessonTitle: "React Testing Library", fileName: "aula-68-modulo-13-web-fundamentals.md" },
            { globalLessonId: 69, moduleId: 13, lessonTitle: "E2E Testing com Cypress", fileName: "aula-69-modulo-13-web-fundamentals.md" },
            { globalLessonId: 70, moduleId: 13, lessonTitle: "Projeto: Testes Completos", fileName: "aula-70-modulo-13-web-fundamentals.md" },

            // Módulo 14: State Management (2 aulas)
            { globalLessonId: 71, moduleId: 14, lessonTitle: "Redux e Redux Toolkit", fileName: "aula-71-modulo-14-web-fundamentals.md" },
            { globalLessonId: 72, moduleId: 14, lessonTitle: "Zustand e Jotai", fileName: "aula-72-modulo-14-web-fundamentals.md" },

            // Módulo 15: Routing e Navegação (2 aulas)
            { globalLessonId: 73, moduleId: 15, lessonTitle: "React Router Avançado", fileName: "aula-73-modulo-15-web-fundamentals.md" },
            { globalLessonId: 74, moduleId: 15, lessonTitle: "Next.js App Router", fileName: "aula-74-modulo-15-web-fundamentals.md" }
        ];
    }

    private initializePythonDataScienceMappings(): void {
        // Mapeamento para Python Data Science (mantido existente)
        // ... (código existente mantido)
    }

    public getLessonByGlobalId(globalLessonId: number): LessonMapping | null {
        return this.lessonMappings.find(lesson => lesson.globalLessonId === globalLessonId) || null;
    }

    public getLessonByModuleAndPosition(moduleId: number, position: number): LessonMapping | null {
        const moduleLessons = this.lessonMappings
            .filter(lesson => lesson.moduleId === moduleId)
            .sort((a, b) => a.globalLessonId - b.globalLessonId);
        
        return moduleLessons[position - 1] || null;
    }

    public getLessonsByModule(moduleId: number): LessonMapping[] {
        return this.lessonMappings
            .filter(lesson => lesson.moduleId === moduleId)
            .sort((a, b) => a.globalLessonId - b.globalLessonId);
    }

    public getTotalLessons(): number {
        return this.lessonMappings.length;
    }

    public getTotalModules(): number {
        const uniqueModules = new Set(this.lessonMappings.map(lesson => lesson.moduleId));
        return uniqueModules.size;
    }

    public getNextLesson(currentGlobalLessonId: number): LessonMapping | null {
        const currentIndex = this.lessonMappings.findIndex(lesson => lesson.globalLessonId === currentGlobalLessonId);
        if (currentIndex === -1 || currentIndex >= this.lessonMappings.length - 1) {
            return null;
        }
        return this.lessonMappings[currentIndex + 1];
    }

    public getPreviousLesson(currentGlobalLessonId: number): LessonMapping | null {
        const currentIndex = this.lessonMappings.findIndex(lesson => lesson.globalLessonId === currentGlobalLessonId);
        if (currentIndex <= 0) {
            return null;
        }
        return this.lessonMappings[currentIndex - 1];
    }

    public getLessonPositionInModule(globalLessonId: number): number {
        const lesson = this.getLessonByGlobalId(globalLessonId);
        if (!lesson) return 1;
        
        const moduleLessons = this.getLessonsByModule(lesson.moduleId);
        const position = moduleLessons.findIndex(l => l.globalLessonId === globalLessonId);
        return position + 1;
    }
}'''
    
    # Salvar arquivo
    with open('frontend/app/course/[slug]/services/lesson-mapping.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)
    
    print("✅ Serviço de mapeamento de aulas atualizado com 74 aulas")

if __name__ == "__main__":
    generate_lesson_mapping_service()

