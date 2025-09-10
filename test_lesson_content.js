// Teste para verificar se a API está retornando o conteúdo correto
const fs = require('fs');
const path = require('path');

async function testLessonContent() {
    console.log('🧪 Testando conteúdo da primeira aula...\n');

    // Caminho do arquivo da primeira aula
    const lessonFilePath = path.join(
        process.cwd(),
        'backend',
        'fenix-expanded-content',
        'web-fundamentals',
        'avancado',
        'aula-01-modulo-01-web-fundamentals.md'
    );

    console.log(`📁 Lendo arquivo: ${lessonFilePath}`);

    try {
        // Verificar se o arquivo existe
        if (!fs.existsSync(lessonFilePath)) {
            console.log('❌ Arquivo não encontrado!');
            return;
        }

        // Ler o conteúdo do arquivo
        const content = fs.readFileSync(lessonFilePath, 'utf-8');

        console.log(`✅ Arquivo encontrado! Tamanho: ${content.length} caracteres\n`);

        // Mostrar as primeiras linhas do conteúdo
        const lines = content.split('\n');
        console.log('📝 Primeiras 20 linhas do conteúdo:');
        console.log('─'.repeat(50));

        for (let i = 0; i < Math.min(20, lines.length); i++) {
            console.log(`${(i + 1).toString().padStart(2, ' ')}: ${lines[i]}`);
        }

        console.log('─'.repeat(50));

        // Verificar se contém o conteúdo esperado
        if (content.includes('História e Evolução da Web') &&
            content.includes('Arquitetura Web Moderna') &&
            content.includes('Nubank: Revolucionando o Setor Bancário')) {
            console.log('✅ Conteúdo correto encontrado!');
        } else {
            console.log('❌ Conteúdo incorreto ou incompleto!');
        }

    } catch (error) {
        console.log(`❌ Erro ao ler arquivo: ${error.message}`);
    }
}

testLessonContent();


