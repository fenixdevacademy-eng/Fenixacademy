const fs = require('fs');
const path = require('path');

// Função para corrigir erros de sintaxe comuns
function fixSyntaxErrors(content) {
    // Corrigir imports com ponto e vírgula
    content = content.replace(/,\s*;\s*$/gm, '');
    content = content.replace(/;\s*$/gm, '');

    // Corrigir vírgulas extras
    content = content.replace(/,\s*$/gm, '');

    // Corrigir interfaces malformadas
    content = content.replace(/interface\s+(\w+)\s*\{([^}]*)\}\s*;/g, (match, name, body) => {
        const cleanBody = body
            .replace(/,\s*$/gm, '')
            .replace(/;\s*$/gm, '')
            .replace(/:\s*string\[\]\s*;/g, ': string[];')
            .replace(/:\s*number\[\]\s*;/g, ': number[];');
        return `interface ${name} {\n${cleanBody}\n}`;
    });

    // Corrigir objetos malformados
    content = content.replace(/const\s+(\w+):\s*(\w+)\s*=\s*\{([^}]*)\}\s*;/g, (match, name, type, body) => {
        const cleanBody = body
            .replace(/,\s*$/gm, '')
            .replace(/;\s*$/gm, '')
            .replace(/\n\s*(\w+):/g, ',\n    $1:');
        return `const ${name}: ${type} = {\n${cleanBody}\n};`;
    });

    // Corrigir arrays de objetos malformados
    content = content.replace(/const\s+(\w+):\s*(\w+)\[\]\s*=\s*\[([^\]]*)\]\s*;/g, (match, name, type, body) => {
        const cleanBody = body
            .replace(/,\s*$/gm, '')
            .replace(/;\s*$/gm, '')
            .replace(/\{\s*(\w+):/g, '{\n        $1:')
            .replace(/\n\s*(\w+):/g, ',\n        $1:');
        return `const ${name}: ${type}[] = [\n${cleanBody}\n];`;
    });

    // Corrigir tipos de array
    content = content.replace(/resourcestring\[\]/g, 'resources: string[]');
    content = content.replace(/exercisestring\[\]/g, 'exercises: string[]');

    // Corrigir vírgulas em objetos
    content = content.replace(/(\w+)\s*\n\s*(\w+):/g, '$1,\n    $2:');

    return content;
}

// Lista de arquivos para corrigir
const filesToFix = [
    'app/components/StripePayment.tsx',
    'app/courses-content/page.tsx',
    'app/courses/aws-cloud/page.tsx',
    'app/courses/blockchain-smart-contracts/page.tsx',
    'app/courses/ciberseguranca/page.tsx'
];

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

console.log('🎉 All syntax fixes completed!');









