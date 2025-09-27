#!/usr/bin/env node

/**
 * Script para corrigir erros de TypeScript no MonacoEditor.tsx
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'components', 'IDE', 'MonacoEditor.tsx');

console.log('🔧 Corrigindo erros do MonacoEditor.tsx...');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Corrigir cursorSmoothCaretAnimation
    content = content.replace(
        /cursorSmoothCaretAnimation:\s*true/g,
        "cursorSmoothCaretAnimation: 'on'"
    );

    // 2. Corrigir completion providers - adicionar parâmetros corretos e range
    const completionProviderRegex = /provideCompletionItems:\s*\(model,\s*position\)\s*=>\s*{/g;
    content = content.replace(completionProviderRegex, 'provideCompletionItems: (model, position, context, token) => {');

    // 3. Adicionar range para todos os itens de sugestão
    const suggestionItemRegex = /(\s+{\s+label:\s*'[^']+',\s*kind:\s*[^,]+,\s*insertText:\s*'[^']+',\s*insertTextRules:\s*[^,]+,\s*documentation:\s*'[^']+'\s+})/g;
    content = content.replace(suggestionItemRegex, (match) => {
        return match.replace(/(\s+})/, ',\n                        range: {\n                            startLineNumber: position.lineNumber,\n                            endLineNumber: position.lineNumber,\n                            startColumn: position.column,\n                            endColumn: position.column\n                        }\n                    }');
    });

    // 4. Remover propriedades inválidas
    content = content.replace(/formatOnSave:\s*true,?\s*/g, '');

    // 5. Corrigir onChange handler
    content = content.replace(
        /onChange=\{(value:\s*string)\s*=>\s*onChange\(value\)\}/g,
        'onChange={(value) => onChange(value || "")}'
    );

    // 6. Remover exports duplicados e código malformado
    // Encontrar e remover código duplicado/malformado
    const lines = content.split('\n');
    const cleanedLines = [];
    let inBadSection = false;
    let braceCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Detectar início de seção problemática
        if (line.includes('export default function MonacoEditor') && i > 1000) {
            inBadSection = true;
            continue;
        }

        // Detectar fim de seção problemática
        if (inBadSection && line.includes('export default MonacoEditor')) {
            inBadSection = false;
            continue;
        }

        // Pular linhas problemáticas
        if (inBadSection) {
            continue;
        }

        // Pular linhas com código malformado
        if (line.includes('insertTextRules,') ||
            line.includes('documentation,') ||
            line.includes('Cannot find name') ||
            line.includes('Declaration or statement expected')) {
            continue;
        }

        cleanedLines.push(line);
    }

    content = cleanedLines.join('\n');

    // 7. Garantir que há apenas um export default
    const exportDefaultMatches = content.match(/export default/g);
    if (exportDefaultMatches && exportDefaultMatches.length > 1) {
        // Manter apenas o primeiro export default
        let firstExport = true;
        content = content.replace(/export default/g, (match) => {
            if (firstExport) {
                firstExport = false;
                return match;
            }
            return '// export default'; // Comentar os outros
        });
    }

    // 8. Corrigir problemas de sintaxe específicos
    content = content.replace(/,\s*insertTextRules,\s*/g, ', ');
    content = content.replace(/,\s*documentation,\s*/g, ', ');

    // 9. Adicionar import necessário para CompletionContext
    if (!content.includes('CompletionContext')) {
        content = content.replace(
            "import * as monaco from 'monaco-editor';",
            "import * as monaco from 'monaco-editor';\nimport { CompletionContext } from 'monaco-editor';"
        );
    }

    // 10. Corrigir problema com language
    content = content.replace(/language\s*:\s*language/g, 'language: language');

    // Salvar arquivo corrigido
    fs.writeFileSync(filePath, content, 'utf8');

    console.log('✅ MonacoEditor.tsx corrigido com sucesso!');
    console.log('📋 Correções aplicadas:');
    console.log('  - cursorSmoothCaretAnimation corrigido');
    console.log('  - Completion providers corrigidos');
    console.log('  - Range adicionado aos itens de sugestão');
    console.log('  - Propriedades inválidas removidas');
    console.log('  - Exports duplicados removidos');
    console.log('  - Sintaxe corrigida');

} catch (error) {
    console.error('❌ Erro ao corrigir MonacoEditor.tsx:', error.message);
    process.exit(1);
}











