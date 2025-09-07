const fs = require('fs');

// Lista de arquivos restantes para corrigir
const filesToFix = [
    'frontend/applicenses/page.tsx',
    'frontend/appmission/page.tsx',
    'frontend/appmy-courses/page.tsx'
];

function fixTripleBraces(content) {
    // Corrigir chaves triplas para duplas
    content = content.replace(/initial=\{\{\{([^}]+)\}\}\}/g, 'initial={{$1}}');
    content = content.replace(/animate=\{\{\{([^}]+)\}\}\}/g, 'animate={{$1}}');
    content = content.replace(/transition=\{\{\{([^}]+)\}\}\}/g, 'transition={{$1}}');

    return content;
}

function fixFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const fixedContent = fixTripleBraces(content);

            if (content !== fixedContent) {
                fs.writeFileSync(filePath, fixedContent, 'utf8');
                console.log(`✅ Corrigido: ${filePath}`);
            } else {
                console.log(`ℹ️  Sem alterações: ${filePath}`);
            }
        } else {
            console.log(`❌ Arquivo não encontrado: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Erro ao corrigir ${filePath}:`, error.message);
    }
}

console.log('🔧 Corrigindo chaves triplas restantes...\n');

filesToFix.forEach(fixFile);

console.log('\n✨ Correção concluída!');
