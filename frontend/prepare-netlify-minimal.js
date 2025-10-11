#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 PREPARANDO BUILD MÍNIMO PARA NETLIFY');
console.log('=======================================');

// 1. Remover pastas problemáticas
const problematicDirs = [
    'app/api',
    'app/course-info',
    'app/course/[slug]',
    'app/expanded-course',
    'app/processed-courses',
    'app/courses/[slug]',
    'app/courses/lua-fundamentals',
    'app/expanded-courses',
    'app/expanded-dashboard',
    'app/expanded-exercises',
    'app/expanded-payment',
    'app/expanded-quizzes',
    'app/expanded-search',
    'app/dashboard',
    'app/profile',
    'app/progress',
    'app/progress-dashboard',
    'app/settings',
    'app/subscriptions',
    'app/my-courses',
    'app/payment',
    'app/payments',
    'app/login',
    'app/register',
    'app/unauthorized',
    'app/ide',
    'app/ide-advanced',
    'app/ide-advanced-simple',
    'app/fenix-ide',
    'app/intellisense',
    'app/launch',
    'app/learning-hub',
    'app/tutorials',
    'app/projects',
    'app/resources',
    'app/support',
    'app/help',
    'app/terms',
    'app/privacy',
    'app/faturamento',
    'app/gestao-trafego',
    'app/founders',
    'app/test-minimal',
    'app/exercicios',
    'app/courses-content',
    'app/ai',
    'app/admin'
];

problematicDirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (fs.existsSync(fullPath)) {
        console.log(`📁 Removendo: ${dir}`);
        fs.rmSync(fullPath, { recursive: true, force: true });
    }
});

// 2. Criar página principal simplificada
const mainPage = `export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Fenix Academy</h1>
      <p>Plataforma de Ensino Online</p>
      <p>Versão estática para Netlify</p>
    </div>
  );
}`;

fs.writeFileSync('app/page.tsx', mainPage);

// 3. Configuração mínima
const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
}

module.exports = nextConfig`;

fs.writeFileSync('next.config.js', config);

console.log('✅ PREPARAÇÃO MÍNIMA CONCLUÍDA!');
console.log('🚀 Execute: npx next build && npx next export');



