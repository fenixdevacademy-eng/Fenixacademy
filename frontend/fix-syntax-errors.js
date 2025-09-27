const fs = require('fs');
const path = require('path');

// Lista de arquivos com erros de sintaxe
const filesToFix = [
    'app/course/[slug]/purchase/page.tsx',
    'app/courses-content/page.tsx',
    'app/courses/aws-cloud/page.tsx',
    'app/courses/blockchain-smart-contracts/page.tsx'
];

// Função para corrigir erros de sintaxe comuns
function fixSyntaxErrors(content) {
    // Corrigir vírgulas extras e pontos e vírgulas
    content = content.replace(/,\s*;/g, ';');
    content = content.replace(/,\s*$/gm, '');
    content = content.replace(/;\s*$/gm, '');

    // Corrigir interfaces malformadas
    content = content.replace(/interface\s+(\w+)\s*\{([^}]*)\}\s*;/g, (match, name, body) => {
        const cleanBody = body.replace(/,\s*$/gm, '').replace(/;\s*$/gm, '');
        return `interface ${name} {\n${cleanBody}\n}`;
    });

    // Corrigir objetos malformados
    content = content.replace(/const\s+(\w+):\s*(\w+)\s*=\s*\{([^}]*)\}\s*;/g, (match, name, type, body) => {
        const cleanBody = body.replace(/,\s*$/gm, '').replace(/;\s*$/gm, '');
        return `const ${name}: ${type} = {\n${cleanBody}\n};`;
    });

    // Corrigir arrays malformados
    content = content.replace(/:\s*string\[\]\s*;/g, ': string[];');
    content = content.replace(/:\s*number\[\]\s*;/g, ': number[];');

    // Corrigir funções malformadas
    content = content.replace(/const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{([^}]*)\}\s*;/g, (match, name, body) => {
        const cleanBody = body.replace(/,\s*$/gm, '').replace(/;\s*$/gm, '');
        return `const ${name} = () => {\n${cleanBody}\n};`;
    });

    return content;
}

// Corrigir cada arquivo
filesToFix.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);

    if (fs.existsSync(fullPath)) {
        try {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = fixSyntaxErrors(content);
            fs.writeFileSync(fullPath, content);
            console.log(`✅ Fixed: ${filePath}`);
        } catch (error) {
            console.error(`❌ Error fixing ${filePath}:`, error.message);
        }
    } else {
        console.log(`⚠️  File not found: ${filePath}`);
    }
});

console.log('🎉 Syntax fixes completed!');









