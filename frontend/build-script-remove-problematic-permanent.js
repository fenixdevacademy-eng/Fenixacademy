// Script que remove permanentemente arquivos problemáticos
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Removendo arquivos problemáticos permanentemente...');

try {
    // Limpeza básica
    console.log('🧹 Limpeza básica...');

    const dirsToClean = ['.next', 'out', 'node_modules/.cache'];

    dirsToClean.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        if (fs.existsSync(dirPath)) {
            console.log(`🗑️ Removendo: ${dir}`);
            fs.rmSync(dirPath, { recursive: true, force: true });
        }
    });

    // Lista de arquivos/diretórios problemáticos para remover permanentemente
    const problematicPaths = [
        'app/api',
        'app/course',
        'app/courses',
        'app/processed-courses',
        'app/expanded-course',
        'app/course-info',
        'app/test',
        'app/test-minimal',
        'app/test-animations',
        'app/test-auth',
        'app/test-integration',
        'app/test-redirect',
        'app/test-simple',
        'app/login-test',
        'app/test-page.tsx',
        'app/auth/register/test-page.tsx',
        'app/dashboard/test',
        'app/manifest.webmanifest',
        'app/robots.ts',
        'app/sitemap.ts',
        'app/manifest.ts',
    ];

    // Remover arquivos problemáticos permanentemente
    console.log('🗑️ Removendo arquivos problemáticos permanentemente...');
    problematicPaths.forEach(relativePath => {
        const fullPath = path.join(__dirname, relativePath);
        if (fs.existsSync(fullPath)) {
            console.log(`🗑️ Removendo: ${relativePath}`);
            fs.rmSync(fullPath, { recursive: true, force: true });
        }
    });

    // Executar build
    console.log('📦 Executando build...');
    execSync('npm run build', { stdio: 'inherit', timeout: 300000 });

    console.log('✅ Build concluído com sucesso!');
} catch (error) {
    console.error('❌ Erro durante o build:', error.message);
    process.exit(1);
}
