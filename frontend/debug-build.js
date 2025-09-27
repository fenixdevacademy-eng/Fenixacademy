const { execSync, spawn } = require('child_process');
const fs = require('fs');

console.log('🔍 DEBUGGING BUILD TRAVADO');
console.log('==========================\n');

// 1. Verificar processos Node.js
console.log('1. Verificando processos Node.js...');
try {
    const processes = execSync('tasklist | findstr node', { encoding: 'utf8' });
    console.log('Processos Node.js ativos:');
    console.log(processes);
} catch (e) {
    console.log('Nenhum processo Node.js encontrado');
}

// 2. Verificar uso de memória
console.log('\n2. Verificando uso de memória...');
try {
    const memory = execSync('wmic process where name="node.exe" get ProcessId,PageFileUsage', { encoding: 'utf8' });
    console.log('Uso de memória dos processos Node.js:');
    console.log(memory);
} catch (e) {
    console.log('Erro ao verificar memória:', e.message);
}

// 3. Verificar arquivos de cache
console.log('\n3. Verificando arquivos de cache...');
const cacheFiles = ['.next', 'node_modules/.cache', 'tsconfig.tsbuildinfo'];
cacheFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        console.log(`✅ ${file} - ${stats.size} bytes - ${stats.mtime}`);
    } else {
        console.log(`❌ ${file} não encontrado`);
    }
});

// 4. Verificar arquivos de lock
console.log('\n4. Verificando arquivos de lock...');
const lockFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
lockFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} encontrado`);
    } else {
        console.log(`❌ ${file} não encontrado`);
    }
});

// 5. Testar build com timeout
console.log('\n5. Testando build com timeout...');
const buildProcess = spawn('npm', ['run', 'build:vercel'], {
    stdio: 'pipe',
    shell: true
});

let output = '';
let errorOutput = '';

buildProcess.stdout.on('data', (data) => {
    const text = data.toString();
    output += text;
    console.log('STDOUT:', text);
});

buildProcess.stderr.on('data', (data) => {
    const text = data.toString();
    errorOutput += text;
    console.log('STDERR:', text);
});

// Timeout de 2 minutos
const timeout = setTimeout(() => {
    console.log('\n⏰ TIMEOUT - Build travado há mais de 2 minutos');
    console.log('Matando processo...');
    buildProcess.kill('SIGTERM');

    // Tentar matar todos os processos Node.js
    try {
        execSync('taskkill /F /IM node.exe', { stdio: 'pipe' });
        console.log('✅ Processos Node.js finalizados');
    } catch (e) {
        console.log('⚠️ Erro ao finalizar processos:', e.message);
    }

    process.exit(1);
}, 120000); // 2 minutos

buildProcess.on('close', (code) => {
    clearTimeout(timeout);
    console.log(`\n🏁 Build finalizado com código: ${code}`);

    if (code === 0) {
        console.log('✅ Build concluído com sucesso!');
    } else {
        console.log('❌ Build falhou');
        console.log('Output:', output);
        console.log('Erro:', errorOutput);
    }
});

buildProcess.on('error', (error) => {
    clearTimeout(timeout);
    console.log('❌ Erro no processo de build:', error.message);
});

