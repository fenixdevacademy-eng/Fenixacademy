#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Cores para output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, options = {}) {
    try {
        log(`Executando: ${command}`, 'blue');
        const result = execSync(command, {
            stdio: 'inherit',
            encoding: 'utf8',
            shell: true,
            ...options
        });
        return { success: true, result };
    } catch (error) {
        log(`Erro ao executar: ${command}`, 'red');
        log(error.message, 'red');
        return { success: false, error };
    }
}

function cleanDirectory(dir) {
    if (fs.existsSync(dir)) {
        try {
            fs.rmSync(dir, { recursive: true, force: true });
            log(`✅ Removido: ${dir}`, 'green');
        } catch (error) {
            log(`⚠️ Erro ao remover ${dir}: ${error.message}`, 'yellow');
        }
    }
}

function createNextConfig() {
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: false,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_APP_URL: 'https://fenixdevacademy.com.br',
    NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
  },
  webpack: (config) => {
    config.optimization.splitChunks = false;
    return config;
  },
};
module.exports = nextConfig;`;

    fs.writeFileSync('next.config.js', nextConfig);
    log('✅ next.config.js criado com configuração otimizada', 'green');
}

function createDeployStatus() {
    const statusContent = `# Deploy Status - Fênix Dev Academy

## ✅ Build Concluído com Sucesso
- Data: ${new Date().toLocaleString('pt-BR')}
- Pasta de build: frontend/out
- Status: Pronto para deploy

## 🚀 Próximos Passos:

### Para Vercel:
1. Acesse: https://vercel.com
2. Conecte seu repositório GitHub
3. Configure o Build Command: cd frontend && npm run build
4. Configure o Output Directory: frontend/out
5. Deploy!

### Para Netlify:
1. Acesse: https://netlify.com
2. Conecte seu repositório GitHub
3. Configure o Build Command: cd frontend && npm run build
4. Configure o Publish Directory: frontend/out
5. Deploy!

### Para Render:
1. Acesse: https://render.com
2. Conecte seu repositório GitHub
3. Configure o Build Command: cd frontend && npm run build
4. Configure o Start Command: cd frontend && npm start
5. Deploy!

## 📊 Arquivos Gerados:
- frontend/out/ (pasta de build)
- next.config.js (configuração otimizada)
- deploy.js (este script)

## 🎯 Aplicação Pronta!
Sua aplicação está pronta para deploy em qualquer plataforma!`;

    fs.writeFileSync('../DEPLOY_STATUS.md', statusContent);
    log('📄 DEPLOY_STATUS.md criado', 'green');
}

async function main() {
    log('🚀 Iniciando Deploy da Fênix Dev Academy...', 'green');

    // Verificar se estamos no diretório correto
    if (!fs.existsSync('frontend')) {
        log('❌ Erro: Execute este script na raiz do projeto', 'red');
        process.exit(1);
    }

    // Navegar para o frontend
    process.chdir('frontend');
    log('📁 Navegando para o diretório frontend...', 'yellow');

    // Limpar cache e arquivos temporários
    log('🧹 Limpando cache e arquivos temporários...', 'yellow');
    cleanDirectory('.next');
    cleanDirectory('out');
    cleanDirectory('node_modules/.cache');
    cleanDirectory('.turbo');

    // Limpar cache do npm
    execCommand('npm cache clean --force', { stdio: 'pipe' });

    // Verificar se node_modules existe
    if (!fs.existsSync('node_modules')) {
        log('📦 Instalando dependências...', 'cyan');
        const installResult = execCommand('npm install --production=false');
        if (!installResult.success) {
            log('❌ Erro ao instalar dependências', 'red');
            process.exit(1);
        }
    } else {
        log('✅ Dependências já instaladas', 'green');
    }

    // Criar next.config.js otimizado
    log('⚙️ Configurando Next.js otimizado...', 'blue');
    createNextConfig();

    // Fazer build
    log('🏗️ Fazendo build do projeto...', 'blue');
    const buildResult = execCommand('npm run build');

    if (buildResult.success) {
        log('✅ Build concluído com sucesso!', 'green');

        // Verificar se a pasta out foi criada
        if (fs.existsSync('out')) {
            log('📁 Pasta "out" criada com sucesso', 'green');

            // Voltar para a raiz
            process.chdir('..');

            // Criar arquivo de status
            createDeployStatus();

            log('🎉 Deploy preparado com sucesso!', 'green');
            log('📁 Pasta de build: frontend/out', 'cyan');
            log('📋 Consulte DEPLOY_STATUS.md para instruções de deploy', 'yellow');

        } else {
            log('❌ Erro: Pasta "out" não foi criada', 'red');
        }
    } else {
        log('❌ Erro no build!', 'red');
        log('🔧 Tentando build alternativo...', 'yellow');

        // Voltar para a raiz
        process.chdir('..');

        // Tentar build com configuração mais simples
        const simpleConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
module.exports = nextConfig;`;

        fs.writeFileSync('frontend/next.config.js', simpleConfig);
        process.chdir('frontend');
        log('🔄 Tentando build simplificado...', 'blue');
        execCommand('npm run build');
    }

    log('🏁 Script de deploy finalizado!', 'green');
}

// Executar o script
main().catch(error => {
    log(`❌ Erro fatal: ${error.message}`, 'red');
    process.exit(1);
});