
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Mapeamentos das aulas do curso Web Fundamentals (74 aulas)
const webFundamentalsMappings = [
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

// Mapeamentos das aulas do curso Python Data Science
const pythonDataScienceMappings = [
    // Módulo 1: Fundamentos Python (5 aulas)
    { globalLessonId: 101, moduleId: 1, lessonTitle: "Introdução ao Python para Data Science", fileName: "aula-01-modulo-01-python-data-science.md" },
    { globalLessonId: 102, moduleId: 1, lessonTitle: "Variáveis e Tipos de Dados", fileName: "aula-02-modulo-01-python-data-science.md" },
    { globalLessonId: 103, moduleId: 1, lessonTitle: "Estruturas de Controle", fileName: "aula-03-modulo-01-python-data-science.md" },
    { globalLessonId: 104, moduleId: 1, lessonTitle: "Funções e Módulos", fileName: "aula-04-modulo-01-python-data-science.md" },
    { globalLessonId: 105, moduleId: 1, lessonTitle: "Projeto: Calculadora de Estatísticas", fileName: "aula-05-modulo-01-python-data-science.md" },

    // Módulo 2: Análise de Dados com Pandas (6 aulas)
    { globalLessonId: 106, moduleId: 2, lessonTitle: "Introdução ao Pandas", fileName: "aula-06-modulo-02-python-data-science.md" },
    { globalLessonId: 107, moduleId: 2, lessonTitle: "DataFrames e Series", fileName: "aula-07-modulo-02-python-data-science.md" },
    { globalLessonId: 108, moduleId: 2, lessonTitle: "Manipulação de Dados", fileName: "aula-08-modulo-02-python-data-science.md" },
    { globalLessonId: 109, moduleId: 2, lessonTitle: "Agregações e Agrupamentos", fileName: "aula-09-modulo-02-python-data-science.md" },
    { globalLessonId: 110, moduleId: 2, lessonTitle: "Limpeza e Tratamento de Dados", fileName: "aula-10-modulo-02-python-data-science.md" },
    { globalLessonId: 111, moduleId: 2, lessonTitle: "Projeto: Análise de Vendas", fileName: "aula-11-modulo-02-python-data-science.md" },

    // Módulo 3: Visualização com Matplotlib/Seaborn (6 aulas)
    { globalLessonId: 112, moduleId: 3, lessonTitle: "Introdução à Visualização", fileName: "aula-12-modulo-03-python-data-science.md" },
    { globalLessonId: 113, moduleId: 3, lessonTitle: "Matplotlib Básico", fileName: "aula-13-modulo-03-python-data-science.md" },
    { globalLessonId: 114, moduleId: 3, lessonTitle: "Seaborn e Estatísticas", fileName: "aula-14-modulo-03-python-data-science.md" },
    { globalLessonId: 115, moduleId: 3, lessonTitle: "Gráficos Avançados", fileName: "aula-15-modulo-03-python-data-science.md" },
    { globalLessonId: 116, moduleId: 3, lessonTitle: "Dashboards Interativos", fileName: "aula-16-modulo-03-python-data-science.md" },
    { globalLessonId: 117, moduleId: 3, lessonTitle: "Projeto: Dashboard de Vendas", fileName: "aula-17-modulo-03-python-data-science.md" },

    // Módulo 4: Machine Learning Básico (7 aulas)
    { globalLessonId: 118, moduleId: 4, lessonTitle: "Introdução ao Machine Learning", fileName: "aula-18-modulo-04-python-data-science.md" },
    { globalLessonId: 119, moduleId: 4, lessonTitle: "Regressão Linear", fileName: "aula-19-modulo-04-python-data-science.md" },
    { globalLessonId: 120, moduleId: 4, lessonTitle: "Classificação", fileName: "aula-20-modulo-04-python-data-science.md" },
    { globalLessonId: 121, moduleId: 4, lessonTitle: "Clustering", fileName: "aula-21-modulo-04-python-data-science.md" },
    { globalLessonId: 122, moduleId: 4, lessonTitle: "Validação e Métricas", fileName: "aula-22-modulo-04-python-data-science.md" },
    { globalLessonId: 123, moduleId: 4, lessonTitle: "Feature Engineering", fileName: "aula-23-modulo-04-python-data-science.md" },
    { globalLessonId: 124, moduleId: 4, lessonTitle: "Projeto: Sistema de Recomendação", fileName: "aula-24-modulo-04-python-data-science.md" },

    // Módulo 5: Deep Learning com TensorFlow (6 aulas)
    { globalLessonId: 125, moduleId: 5, lessonTitle: "Introdução ao Deep Learning", fileName: "aula-25-modulo-05-python-data-science.md" },
    { globalLessonId: 126, moduleId: 5, lessonTitle: "Redes Neurais Básicas", fileName: "aula-26-modulo-05-python-data-science.md" },
    { globalLessonId: 127, moduleId: 5, lessonTitle: "TensorFlow e Keras", fileName: "aula-27-modulo-05-python-data-science.md" },
    { globalLessonId: 128, moduleId: 5, lessonTitle: "CNNs para Imagens", fileName: "aula-28-modulo-05-python-data-science.md" },
    { globalLessonId: 129, moduleId: 5, lessonTitle: "RNNs para Sequências", fileName: "aula-29-modulo-05-python-data-science.md" },
    { globalLessonId: 130, moduleId: 5, lessonTitle: "Projeto: Classificador de Imagens", fileName: "aula-30-modulo-05-python-data-science.md" },

    // Módulo 6: Processamento de Linguagem Natural (5 aulas)
    { globalLessonId: 131, moduleId: 6, lessonTitle: "Introdução ao NLP", fileName: "aula-31-modulo-06-python-data-science.md" },
    { globalLessonId: 132, moduleId: 6, lessonTitle: "Tokenização e Pré-processamento", fileName: "aula-32-modulo-06-python-data-science.md" },
    { globalLessonId: 133, moduleId: 6, lessonTitle: "Word Embeddings", fileName: "aula-33-modulo-06-python-data-science.md" },
    { globalLessonId: 134, moduleId: 6, lessonTitle: "Modelos de Linguagem", fileName: "aula-34-modulo-06-python-data-science.md" },
    { globalLessonId: 135, moduleId: 6, lessonTitle: "Projeto: Chatbot Inteligente", fileName: "aula-35-modulo-06-python-data-science.md" },

    // Módulo 7: Big Data com PySpark (5 aulas)
    { globalLessonId: 136, moduleId: 7, lessonTitle: "Introdução ao Big Data", fileName: "aula-36-modulo-07-python-data-science.md" },
    { globalLessonId: 137, moduleId: 7, lessonTitle: "PySpark e RDDs", fileName: "aula-37-modulo-07-python-data-science.md" },
    { globalLessonId: 138, moduleId: 7, lessonTitle: "DataFrames no Spark", fileName: "aula-38-modulo-07-python-data-science.md" },
    { globalLessonId: 139, moduleId: 7, lessonTitle: "Machine Learning no Spark", fileName: "aula-39-modulo-07-python-data-science.md" },
    { globalLessonId: 140, moduleId: 7, lessonTitle: "Projeto: Análise de Big Data", fileName: "aula-40-modulo-07-python-data-science.md" },

    // Módulo 8: Deploy de Modelos ML (5 aulas)
    { globalLessonId: 141, moduleId: 8, lessonTitle: "Introdução ao Deploy de ML", fileName: "aula-41-modulo-08-python-data-science.md" },
    { globalLessonId: 142, moduleId: 8, lessonTitle: "Serialização de Modelos", fileName: "aula-42-modulo-08-python-data-science.md" },
    { globalLessonId: 143, moduleId: 8, lessonTitle: "APIs para ML", fileName: "aula-43-modulo-08-python-data-science.md" },
    { globalLessonId: 144, moduleId: 8, lessonTitle: "Docker e Containers", fileName: "aula-44-modulo-08-python-data-science.md" },
    { globalLessonId: 145, moduleId: 8, lessonTitle: "Projeto: Sistema ML em Produção", fileName: "aula-45-modulo-08-python-data-science.md" }
];

// Função para obter mapeamentos baseado no curso
function getLessonMappings(courseSlug: string) {
    switch (courseSlug) {
        case 'web-fundamentals':
            return webFundamentalsMappings;
        case 'python-data-science':
            return pythonDataScienceMappings;
        default:
            return [];
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ courseSlug: string; moduleId: string; lessonId: string }> }
) {
    try {
        const { courseSlug, moduleId, lessonId } = await params;

        console.log(`🔄 API: Buscando aula ${lessonId} do módulo ${moduleId} do curso ${courseSlug}`);

        // Converter para números
        const moduleIdNum = parseInt(moduleId, 10);
        const lessonIdNum = parseInt(lessonId, 10);

        if (isNaN(moduleIdNum) || isNaN(lessonIdNum)) {
            console.log(`❌ Parâmetros inválidos: moduleId=${moduleId}, lessonId=${lessonId}`);
            return NextResponse.json(
                { error: 'Parâmetros inválidos' },
                { status: 400 }
            );
        }

        // Obter mapeamentos do curso
        const courseLessonMappings = getLessonMappings(courseSlug);

        if (!courseLessonMappings || courseLessonMappings.length === 0) {
            console.log(`❌ Nenhum mapeamento encontrado para o curso ${courseSlug}`);
            return NextResponse.json(
                { error: `Curso ${courseSlug} não encontrado` },
                { status: 404 }
            );
        }

        // Estratégia 1: Tentar encontrar pelo globalLessonId (se lessonId for um ID global)
        let lessonMapping = courseLessonMappings.find(
            lesson => lesson.globalLessonId === lessonIdNum
        );

        // Estratégia 2: Se não encontrar, tentar pelo moduleId e posição local
        if (!lessonMapping) {
            const moduleLessons = courseLessonMappings
                .filter(lesson => lesson.moduleId === moduleIdNum)
                .sort((a, b) => a.globalLessonId - b.globalLessonId);

            lessonMapping = moduleLessons[lessonIdNum - 1]; // lessonId é 1-based
        }

        if (!lessonMapping) {
            console.log(`❌ Aula ${lessonId} não encontrada no mapeamento do curso ${courseSlug}`);
            return NextResponse.json(
                { error: `Aula ${lessonId} não encontrada no curso ${courseSlug}` },
                { status: 404 }
            );
        }

        console.log(`✅ Aula encontrada: ${lessonMapping.fileName} (Global ID: ${lessonMapping.globalLessonId}, Módulo: ${lessonMapping.moduleId})`);

        // Construir caminho do arquivo baseado no curso
        let subfolder = 'avancado'; // padrão para todos os cursos

        const lessonFilePath = path.join(
            process.cwd(),
            '..',
            'backend',
            'fenix-expanded-content',
            courseSlug,
            subfolder,
            lessonMapping.fileName
        );

        console.log(`📁 Tentando ler arquivo: ${lessonFilePath}`);

        // Verificar se o arquivo existe
        try {
            await fs.access(lessonFilePath);
        } catch (error) {
            console.log(`❌ Arquivo não encontrado: ${lessonFilePath}`);
            return NextResponse.json(
                { error: 'Conteúdo da aula não encontrado' },
                { status: 404 }
            );
        }

        // Ler conteúdo do arquivo
        const lessonContent = await fs.readFile(lessonFilePath, 'utf-8');

        console.log(`✅ Conteúdo carregado com sucesso (${lessonContent.length} caracteres)`);

        return NextResponse.json({
            content: lessonContent,
            lessonInfo: {
                globalLessonId: lessonMapping.globalLessonId,
                moduleId: lessonMapping.moduleId,
                lessonTitle: lessonMapping.lessonTitle,
                fileName: lessonMapping.fileName
            }
        });

    } catch (error) {
        console.error('❌ Erro na API:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}