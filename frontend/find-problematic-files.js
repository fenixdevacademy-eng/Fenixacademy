const fs = require('fs');
const path = require('path');

// Função para verificar se um arquivo pode estar causando problemas
function checkFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const stats = fs.statSync(filePath);

        // Verificar tamanho do arquivo (muito grande pode causar problemas)
        const sizeInMB = stats.size / (1024 * 1024);

        // Verificar se há imports problemáticos
        const problematicImports = [
            'AdvancedParticles',
            'VisualEffects',
            'ScrollAnimatedSection',
            'MobileOptimizedCard'
        ];

        const hasProblematicImports = problematicImports.some(importName =>
            content.includes(importName) && !content.includes(`// ${importName}`)
        );

        // Verificar se há código duplicado
        const lines = content.split('\n');
        const duplicateLines = lines.filter((line, index) =>
            lines.indexOf(line) !== index && line.trim() !== ''
        );

        // Verificar se há muitos imports
        const importCount = (content.match(/^import\s/gm) || []).length;

        return {
            filePath,
            sizeInMB,
            hasProblematicImports,
            duplicateLines: duplicateLines.length,
            importCount,
            isProblematic: sizeInMB > 0.5 || hasProblematicImports || duplicateLines.length > 10 || importCount > 50
        };
    } catch (error) {
        return {
            filePath,
            error: error.message,
            isProblematic: true
        };
    }
}

// Função para processar todos os arquivos
function processAllFiles(dir) {
    const results = [];
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(dir, file.name);

        if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
            results.push(...processAllFiles(filePath));
        } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
            const result = checkFile(filePath);
            if (result.isProblematic) {
                results.push(result);
            }
        }
    }

    return results;
}

console.log('🔍 Procurando arquivos problemáticos...');
const problematicFiles = processAllFiles('.');

console.log(`\n📊 Encontrados ${problematicFiles.length} arquivos problemáticos:\n`);

problematicFiles.forEach(file => {
    console.log(`📁 ${file.filePath}`);
    if (file.error) {
        console.log(`   ❌ Erro: ${file.error}`);
    } else {
        console.log(`   📏 Tamanho: ${file.sizeInMB.toFixed(2)}MB`);
        console.log(`   📦 Imports: ${file.importCount}`);
        console.log(`   🔄 Linhas duplicadas: ${file.duplicateLines}`);
        console.log(`   ⚠️  Imports problemáticos: ${file.hasProblematicImports ? 'Sim' : 'Não'}`);
    }
    console.log('');
});

// Sugerir ações
console.log('💡 Sugestões:');
console.log('1. Arquivos muito grandes (>0.5MB) podem causar travamentos');
console.log('2. Muitos imports podem sobrecarregar o bundler');
console.log('3. Imports problemáticos devem ser comentados ou removidos');
console.log('4. Linhas duplicadas indicam código duplicado');
