#!/usr/bin/env node

/**
 * Script para limpar o MonacoEditor.tsx removendo código solto após export default
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'components', 'IDE', 'MonacoEditor.tsx');

console.log('🧹 Limpando MonacoEditor.tsx...');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Encontrar a linha do export default
    const lines = content.split('\n');
    let exportLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === 'export default MonacoEditor;') {
            exportLineIndex = i;
            break;
        }
    }

    if (exportLineIndex !== -1) {
        // Manter apenas as linhas até o export default + 1 linha em branco
        const cleanedLines = lines.slice(0, exportLineIndex + 2);
        content = cleanedLines.join('\n');

        // Salvar arquivo limpo
        fs.writeFileSync(filePath, content, 'utf8');

        console.log('✅ MonacoEditor.tsx limpo com sucesso!');
        console.log(`📊 Linhas removidas: ${lines.length - cleanedLines.length}`);
        console.log(`📊 Linhas finais: ${cleanedLines.length}`);
    } else {
        console.log('❌ Export default não encontrado!');
    }

} catch (error) {
    console.error('❌ Erro ao limpar MonacoEditor.tsx:', error.message);
    process.exit(1);
}











