/**
 * Script para testar a API de Cursos Processados
 * Execute com: node test_processed_courses_api.js
 */

const BASE_URL = 'http://localhost:3000/api/courses/processed';

async function testAPI() {
    console.log('🧪 Testando API de Cursos Processados...\n');

    try {
        // Teste 1: Listar todos os cursos
        console.log('1️⃣ Testando listagem de cursos...');
        const coursesResponse = await fetch(`${BASE_URL}/`);
        const coursesData = await coursesResponse.json();

        if (coursesData.success) {
            console.log(`✅ ${coursesData.total} cursos encontrados`);
            console.log(`📊 Última atualização: ${coursesData.lastProcessed}`);
            console.log(`📚 Cursos: ${coursesData.courses.map(c => c.name).join(', ')}\n`);
        } else {
            console.log(`❌ Erro: ${coursesData.error}\n`);
            return;
        }

        // Teste 2: Buscar curso específico
        if (coursesData.courses.length > 0) {
            const firstCourse = coursesData.courses[0];
            console.log(`2️⃣ Testando curso específico: ${firstCourse.name}...`);

            const courseResponse = await fetch(`${BASE_URL}/${firstCourse.slug}/`);
            const courseData = await courseResponse.json();

            if (courseData.success) {
                console.log(`✅ Curso carregado: ${courseData.course.name}`);
                console.log(`📚 ${courseData.course.totalModules} módulos, ${courseData.course.totalLessons} aulas`);
                console.log(`💻 ${courseData.examples.totalFiles} exemplos de código\n`);
            } else {
                console.log(`❌ Erro: ${courseData.error}\n`);
            }

            // Teste 3: Buscar módulo específico
            if (courseData.modules && courseData.modules.length > 0) {
                const firstModule = courseData.modules[0];
                console.log(`3️⃣ Testando módulo: ${firstModule.name}...`);

                const moduleResponse = await fetch(`${BASE_URL}/${firstCourse.slug}/${firstModule.id}/examples/`);
                const moduleData = await moduleResponse.json();

                if (moduleData.success) {
                    console.log(`✅ Módulo carregado: ${moduleData.module.name}`);
                    console.log(`💻 ${moduleData.total} exemplos de código`);
                    console.log(`🔤 Linguagens: ${moduleData.languages.join(', ')}\n`);
                } else {
                    console.log(`❌ Erro: ${moduleData.error}\n`);
                }

                // Teste 4: Buscar aula específica
                if (firstModule.lessons && firstModule.lessons.length > 0) {
                    const firstLesson = firstModule.lessons[0];
                    console.log(`4️⃣ Testando aula: ${firstLesson.title}...`);

                    const lessonResponse = await fetch(`${BASE_URL}/${firstCourse.slug}/${firstModule.id}/${firstLesson.id}/`);
                    const lessonData = await lessonResponse.json();

                    if (lessonData.success) {
                        console.log(`✅ Aula carregada: ${lessonData.lesson.title}`);
                        console.log(`📄 Tamanho: ${lessonData.lesson.size} bytes`);
                        console.log(`⏱️ Tempo de leitura: ${lessonData.lesson.metadata.readingTime} min`);
                        console.log(`💻 Tem exemplos: ${lessonData.lesson.hasCodeExamples ? 'Sim' : 'Não'}`);
                        console.log(`🔗 Navegação: ${lessonData.lesson.navigation.previous ? 'Anterior' : 'N/A'} | ${lessonData.lesson.navigation.next ? 'Próxima' : 'N/A'}\n`);
                    } else {
                        console.log(`❌ Erro: ${lessonData.error}\n`);
                    }
                }
            }
        }

        // Teste 5: Testar curso inexistente
        console.log('5️⃣ Testando curso inexistente...');
        const invalidResponse = await fetch(`${BASE_URL}/curso-inexistente/`);
        const invalidData = await invalidResponse.json();

        if (!invalidData.success) {
            console.log(`✅ Erro esperado: ${invalidData.error}\n`);
        } else {
            console.log(`❌ Deveria ter retornado erro\n`);
        }

        console.log('🎉 Todos os testes concluídos!');

    } catch (error) {
        console.error('❌ Erro durante os testes:', error.message);
    }
}

// Executar testes
testAPI();












