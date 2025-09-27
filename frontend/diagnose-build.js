const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 DIAGNÓSTICO DE BUILD - FENIX ACADEMY');
console.log('=====================================\n');

// 1. Verificar Node.js e npm
console.log('1. Verificando versões...');
try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`✅ Node.js: ${nodeVersion}`);
    console.log(`✅ npm: ${npmVersion}`);
} catch (e) {
    console.log('❌ Erro ao verificar versões:', e.message);
}

// 2. Verificar arquivos de configuração
console.log('\n2. Verificando arquivos de configuração...');
const configFiles = [
    'package.json',
    'next.config.js',
    'tsconfig.json',
    'tailwind.config.js',
    'postcss.config.js'
];

configFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} existe`);
    } else {
        console.log(`❌ ${file} não encontrado`);
    }
});

// 3. Verificar dependências
console.log('\n3. Verificando dependências...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log(`✅ Dependências principais: ${Object.keys(packageJson.dependencies).length}`);
    console.log(`✅ DevDependencies: ${Object.keys(packageJson.devDependencies).length}`);
} catch (e) {
    console.log('❌ Erro ao ler package.json:', e.message);
}

// 4. Verificar node_modules
console.log('\n4. Verificando node_modules...');
if (fs.existsSync('node_modules')) {
    console.log('✅ node_modules existe');
    try {
        const nextExists = fs.existsSync('node_modules/next');
        const reactExists = fs.existsSync('node_modules/react');
        console.log(`✅ Next.js: ${nextExists ? 'instalado' : 'não encontrado'}`);
        console.log(`✅ React: ${reactExists ? 'instalado' : 'não encontrado'}`);
    } catch (e) {
        console.log('❌ Erro ao verificar node_modules:', e.message);
    }
} else {
    console.log('❌ node_modules não encontrado');
}

// 5. Verificar TypeScript
console.log('\n5. Verificando TypeScript...');
try {
    execSync('npx tsc --version', { stdio: 'pipe' });
    console.log('✅ TypeScript disponível');
} catch (e) {
    console.log('❌ TypeScript não disponível');
}

// 6. Verificar erros de sintaxe
console.log('\n6. Verificando erros de sintaxe...');
try {
    execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe' });
    console.log('✅ Sem erros de TypeScript');
} catch (e) {
    console.log('❌ Erros de TypeScript encontrados');
    console.log('Detalhes:', e.stdout?.toString() || e.message);
}

// 7. Verificar ESLint
console.log('\n7. Verificando ESLint...');
try {
    execSync('npx eslint --version', { stdio: 'pipe' });
    console.log('✅ ESLint disponível');
} catch (e) {
    console.log('❌ ESLint não disponível');
}

// 8. Verificar estrutura de pastas
console.log('\n8. Verificando estrutura de pastas...');
const requiredDirs = ['app', 'components', 'lib', 'public'];
requiredDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`✅ ${dir}/ existe`);
    } else {
        console.log(`❌ ${dir}/ não encontrado`);
    }
});

// 9. Verificar arquivos de API
console.log('\n9. Verificando arquivos de API...');
const apiDir = 'app/api';
if (fs.existsSync(apiDir)) {
    const apiFiles = fs.readdirSync(apiDir, { recursive: true });
    console.log(`✅ ${apiFiles.length} arquivos de API encontrados`);
} else {
    console.log('❌ Pasta app/api não encontrada');
}

console.log('\n🏁 Diagnóstico concluído!');
console.log('\nPara tentar o build, execute: npm run build:simple');

