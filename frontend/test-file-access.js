const fs = require('fs');
const path = require('path');

// Testar acesso ao arquivo
const testFileAccess = () => {
    try {
        const filePath = path.join(
            'C:',
            'Users',
            'Micro',
            'Desktop',
            'Fenix',
            'backend',
            'fenix-expanded-content',
            'web-fundamentals',
            'avancado',
            'backend',
            'fenix-expanded-content',
            'web-fundamentals',
            'avancado',
            'aula-01-modulo-01-web-fundamentals.md'
        );

        console.log('📁 Caminho do arquivo:', filePath);

        if (fs.existsSync(filePath)) {
            console.log('✅ Arquivo encontrado!');
            const stats = fs.statSync(filePath);
            console.log('📊 Tamanho:', stats.size, 'bytes');

            const content = fs.readFileSync(filePath, 'utf8');
            console.log('📝 Primeiros 100 caracteres:', content.substring(0, 100));
        } else {
            console.log('❌ Arquivo não encontrado');
        }
    } catch (error) {
        console.log('❌ Erro:', error.message);
    }
};

testFileAccess();





