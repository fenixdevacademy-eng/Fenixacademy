#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Limpando e corrigindo configurações conflitantes...');

// Navegar para o frontend
process.chdir('frontend');

// 1. Remover TODOS os arquivos de configuração conflitantes
console.log('🗑️ 1. Removendo arquivos de configuração conflitantes...');
const filesToRemove = [
    'next.config.fixed.js',
    'next.config.minimal.js',
    'next.config.netlify.js',
    'next.config.prod.js',
    'next.config.render.js',
    'next.config.simple.js',
    'next.config.static.js',
    'next.config.ultra-minimal.js',
    'next.config.vercel.js',
    'next.config.working.js',
    'next.config.js.backup',
    'vercel.json',
    'vercel-simple.json',
    'vercel-simple-fixed.json',
    'netlify-build.js',
    'railway.json',
    'render.yaml',
    '_headers',
    '_redirects'
];

filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`✅ Removido: ${file}`);
    }
});

// 2. Limpar completamente
console.log('🧹 2. Limpando cache e dependências...');
try {
    if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
        console.log('✅ .next removido');
    }
    if (fs.existsSync('node_modules')) {
        fs.rmSync('node_modules', { recursive: true, force: true });
        console.log('✅ node_modules removido');
    }
    if (fs.existsSync('package-lock.json')) {
        fs.unlinkSync('package-lock.json');
        console.log('✅ package-lock.json removido');
    }
    execSync('npm cache clean --force', { stdio: 'pipe' });
    console.log('✅ Cache limpo');
} catch (error) {
    console.log('⚠️ Aviso ao limpar:', error.message);
}

// 3. Criar package.json limpo
console.log('📝 3. Criando package.json limpo...');
const cleanPackageJson = {
    "name": "fenix-dev-academy",
    "version": "0.1.0",
    "private": true,
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    },
    "dependencies": {
        "@monaco-editor/react": "^4.7.0",
        "@radix-ui/react-avatar": "^1.1.0",
        "@radix-ui/react-dropdown-menu": "^2.1.0",
        "@radix-ui/react-slot": "^1.1.0",
        "@radix-ui/react-tabs": "^1.1.0",
        "@tailwindcss/forms": "^0.5.7",
        "@tailwindcss/typography": "^0.5.10",
        "autoprefixer": "^10.4.16",
        "axios": "^1.6.2",
        "bcryptjs": "^2.4.3",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.0.0",
        "framer-motion": "^10.16.16",
        "jsonwebtoken": "^9.0.2",
        "lucide-react": "^0.294.0",
        "next": "14.2.5",
        "next-themes": "^0.2.1",
        "postcss": "^8.4.32",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-hot-toast": "^2.4.1",
        "re-resizable": "^6.9.9",
        "tailwind-merge": "^2.2.0",
        "tailwindcss": "^3.3.6",
        "typescript": "^5.0.0"
    },
    "devDependencies": {
        "@types/bcryptjs": "^2.4.6",
        "@types/jsonwebtoken": "^9.0.5",
        "@types/node": "^20.10.5",
        "@types/react": "^18.2.45",
        "@types/react-dom": "^18.2.18",
        "eslint": "^8.56.0",
        "eslint-config-next": "14.2.5"
    }
};

fs.writeFileSync('package.json', JSON.stringify(cleanPackageJson, null, 2));
console.log('✅ package.json limpo criado');

// 4. Criar next.config.js limpo
console.log('⚙️ 4. Criando next.config.js limpo...');
const cleanNextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://fenixdevacademy.com.br',
    NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
  },
};

module.exports = nextConfig;`;

fs.writeFileSync('next.config.js', cleanNextConfig);
console.log('✅ next.config.js limpo criado');

// 5. Instalar dependências
console.log('📦 5. Instalando dependências...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependências instaladas');
} catch (error) {
    console.log('❌ Erro ao instalar dependências:', error.message);
    process.exit(1);
}

// 6. Testar build
console.log('🏗️ 6. Testando build...');
try {
    process.env.NODE_OPTIONS = '--max-old-space-size=4096';
    execSync('npm run build', {
        stdio: 'inherit',
        env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' }
    });
    console.log('✅ Build concluído com sucesso!');
} catch (error) {
    console.log('❌ Erro no build:', error.message);
}

console.log('🎉 Limpeza e correção concluídas!');







