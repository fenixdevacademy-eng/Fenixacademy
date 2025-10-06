const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 Testando build incremental...\n');

// Lista de arquivos para testar individualmente
const testFiles = [
    'app/tutorials/page.tsx',
    'app/course/[slug]/exercise/[exerciseId]/page.tsx',
    'components/pages/IntegratedCourseSystem.tsx',
    'components/IDE/MonacoEditor.tsx'
];

async function testBuild() {
    try {
        console.log('📦 Executando build completo...');
        const startTime = Date.now();

        // Executar build com timeout
        const buildProcess = execSync('npm run build', {
            encoding: 'utf8',
            timeout: 60000, // 60 segundos timeout
            stdio: 'pipe'
        });

        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;

        console.log(`✅ Build concluído em ${duration.toFixed(2)}s`);
        return true;

    } catch (error) {
        console.log(`❌ Build falhou: ${error.message}`);

        // Se o build falhar, tentar identificar o problema
        if (error.message.includes('timeout')) {
            console.log('⏰ Build travou - possível problema de memória ou arquivo muito grande');
        } else if (error.message.includes('Module not found')) {
            console.log('📁 Módulo não encontrado - verificar imports');
        } else if (error.message.includes('Type error')) {
            console.log('🔧 Erro de tipo - verificar TypeScript');
        }

        return false;
    }
}

// Função para verificar se há arquivos muito grandes
function checkLargeFiles() {
    console.log('🔍 Verificando arquivos grandes...');

    const largeFiles = [];

    function checkDirectory(dir) {
        const files = fs.readdirSync(dir, { withFileTypes: true });

        for (const file of files) {
            const filePath = `${dir}/${file.name}`;

            if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
                checkDirectory(filePath);
            } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
                const stats = fs.statSync(filePath);
                const sizeInMB = stats.size / (1024 * 1024);

                if (sizeInMB > 0.1) { // Arquivos maiores que 100KB
                    largeFiles.push({
                        path: filePath,
                        size: sizeInMB
                    });
                }
            }
        }
    }

    checkDirectory('.');

    if (largeFiles.length > 0) {
        console.log('\n📊 Arquivos grandes encontrados:');
        largeFiles
            .sort((a, b) => b.size - a.size)
            .slice(0, 10)
            .forEach(file => {
                console.log(`  ${file.path}: ${file.size.toFixed(2)}MB`);
            });
    } else {
        console.log('✅ Nenhum arquivo muito grande encontrado');
    }

    return largeFiles;
}

// Executar verificações
async function main() {
    console.log('🚀 Iniciando diagnóstico de build...\n');

    // Verificar arquivos grandes
    const largeFiles = checkLargeFiles();

    console.log('\n' + '='.repeat(50));

    // Tentar build
    const buildSuccess = await testBuild();

    if (buildSuccess) {
        console.log('\n🎉 Build funcionando perfeitamente!');
    } else {
        console.log('\n💡 Sugestões para resolver:');
        console.log('1. Verificar se há arquivos muito grandes');
        console.log('2. Verificar imports problemáticos');
        console.log('3. Verificar erros de TypeScript');
        console.log('4. Considerar aumentar memória do Node.js');
    }
}

main().catch(console.error);
