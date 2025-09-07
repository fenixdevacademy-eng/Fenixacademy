const fs = require('fs');
const path = require('path');

// Lista de arquivos para corrigir
const filesToFix = [
    'frontend/applicenses/page.tsx',
    'frontend/apphelp/page.tsx',
    'frontend/appmission/page.tsx',
    'frontend/appmy-courses/page.tsx',
    'frontend/apppaths/page.tsx',
    'frontend/apppress/page.tsx',
    'frontend/appsettings/page.tsx',
    'frontend/appstatus/page.tsx',
    'frontend/appterms/page.tsx',
    'frontend/appabout/page.tsx',
    'frontend/appachievements/page.tsx',
    'frontend/appauth/forgot-password/page.tsx',
    'frontend/appcertificates/page.tsx',
    'frontend/appcontact/page.tsx',
    'frontend/appcookies/page.tsx',
    'frontend/appdocs/page.tsx'
];

function fixJsxSyntax(content) {
    // Corrigir 'use client' sem aspas
    content = content.replace(/^use client';/m, "'use client';");

    // Corrigir sintaxe JSX das props do motion.div - remover chaves duplas
    content = content.replace(/initial=\{\{\{([^}]+)\}\}\}/g, 'initial={{$1}}');
    content = content.replace(/animate=\{\{\{([^}]+)\}\}\}/g, 'animate={{$1}}');
    content = content.replace(/transition=\{\{\{([^}]+)\}\}\}/g, 'transition={{$1}}');

    // Corrigir sintaxe JSX das props do motion.div - casos normais
    content = content.replace(/initial=\{([^}]+)\}/g, 'initial={{$1}}');
    content = content.replace(/animate=\{([^}]+)\}/g, 'animate={{$1}}');
    content = content.replace(/transition=\{([^}]+)\}/g, 'transition={{$1}}');

    return content;
}

function fixFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const fixedContent = fixJsxSyntax(content);

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

console.log('🔧 Iniciando correção automática dos erros JSX (versão 2)...\n');

filesToFix.forEach(fixFile);

console.log('\n✨ Correção automática concluída!');
