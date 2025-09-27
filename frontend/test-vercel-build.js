const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 TESTANDO BUILD ESPECÍFICO DO VERCEL');
console.log('=====================================\n');

// 1. Verificar configuração do Vercel
console.log('1. Verificando configuração do Vercel...');
if (fs.existsSync('vercel.json')) {
    console.log('✅ vercel.json encontrado');
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    console.log(`✅ Build Command: ${vercelConfig.buildCommand}`);
    console.log(`✅ Output Directory: ${vercelConfig.outputDirectory}`);
} else {
    console.log('❌ vercel.json não encontrado');
}

// 2. Verificar next.config.js
console.log('\n2. Verificando next.config.js...');
if (fs.existsSync('next.config.js')) {
    console.log('✅ next.config.js encontrado');
} else {
    console.log('❌ next.config.js não encontrado');
}

// 3. Verificar package.json scripts
console.log('\n3. Verificando scripts do package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const scripts = packageJson.scripts;
console.log(`✅ Scripts disponíveis: ${Object.keys(scripts).join(', ')}`);

if (scripts['build:vercel']) {
    console.log(`✅ build:vercel: ${scripts['build:vercel']}`);
} else {
    console.log('❌ build:vercel não encontrado');
}

// 4. Testar build com configurações do Vercel
console.log('\n4. Testando build com configurações do Vercel...');
try {
    // Simular ambiente do Vercel
    process.env.NODE_ENV = 'production';
    process.env.VERCEL = '1';
    process.env.CI = '1';

    console.log('🧹 Limpando cache...');
    if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
    }

    console.log('📦 Instalando dependências...');
    execSync('npm install --production', { stdio: 'pipe' });

    console.log('🔨 Executando build...');
    execSync('npx next build', {
        stdio: 'inherit',
        env: {
            ...process.env,
            NODE_ENV: 'production',
            VERCEL: '1',
            CI: '1'
        }
    });

    console.log('✅ BUILD DO VERCEL CONCLUÍDO COM SUCESSO!');

} catch (error) {
    console.log('❌ ERRO NO BUILD DO VERCEL:');
    console.log('=====================================');
    console.log(error.message);

    // Analisar erros específicos
    if (error.message.includes('Expected')) {
        console.log('\n🔍 ERRO DE SINTAXE DETECTADO:');
        console.log('Verifique os arquivos mencionados no erro');
    }

    if (error.message.includes('Module not found')) {
        console.log('\n🔍 ERRO DE MÓDULO DETECTADO:');
        console.log('Verifique as importações e dependências');
    }

    if (error.message.includes('Type error')) {
        console.log('\n🔍 ERRO DE TIPO DETECTADO:');
        console.log('Verifique as definições de tipos TypeScript');
    }
}

console.log('\n🏁 Teste concluído!');

