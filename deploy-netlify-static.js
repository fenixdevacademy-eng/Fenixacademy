#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Deploy Estático para Netlify - Fênix Dev Academy...');

// Criar pasta out se não existir
const outDir = 'frontend/out';
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// HTML principal
const indexHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fênix Dev Academy - Educação de Qualidade</title>
    <meta name="description" content="Aprenda programação com padrão internacional de qualidade, focado no mercado brasileiro.">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #000 0%, #7f1d1d 50%, #ea580c 100%);
            min-height: 100vh;
            color: white;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 60px 0; }
        .header h1 { 
            font-size: 3rem; 
            background: linear-gradient(45deg, #ef4444, #f97316, #eab308);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
        }
        .header p { font-size: 1.2rem; opacity: 0.9; margin-bottom: 40px; }
        .courses-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 30px; 
            margin: 40px 0;
        }
        .course-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            border: 1px solid rgba(239, 68, 68, 0.3);
            transition: all 0.3s ease;
        }
        .course-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(249, 115, 22, 0.5);
        }
        .course-icon { font-size: 3rem; text-align: center; margin-bottom: 20px; }
        .course-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 15px; }
        .course-desc { opacity: 0.8; margin-bottom: 20px; line-height: 1.6; }
        .course-price { font-size: 1.8rem; font-weight: bold; color: #f97316; }
        .btn {
            display: inline-block;
            background: linear-gradient(45deg, #ef4444, #f97316);
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
            transition: transform 0.3s ease;
        }
        .btn:hover { transform: scale(1.05); }
        .footer { text-align: center; padding: 40px 0; opacity: 0.7; }
        @media (max-width: 768px) {
            .header h1 { font-size: 2rem; }
            .courses-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>🔥 Fênix Dev Academy</h1>
            <p>Domine as tecnologias mais demandadas do mercado</p>
        </header>

        <main>
            <div class="courses-grid">
                <div class="course-card">
                    <div class="course-icon">⚛️</div>
                    <h3 class="course-title">React Avançado</h3>
                    <p class="course-desc">Domine React com hooks, context, redux e construa aplicações escaláveis</p>
                    <div class="course-price">R$ 497</div>
                    <a href="/course/react-avancado" class="btn">Começar Agora</a>
                </div>

                <div class="course-card">
                    <div class="course-icon">🟢</div>
                    <h3 class="course-title">Node.js Profissional</h3>
                    <p class="course-desc">Desenvolva APIs robustas com Node.js, Express e MongoDB</p>
                    <div class="course-price">R$ 497</div>
                    <a href="/course/nodejs-profissional" class="btn">Começar Agora</a>
                </div>

                <div class="course-card">
                    <div class="course-icon">💻</div>
                    <h3 class="course-title">JavaScript Full Stack</h3>
                    <p class="course-desc">Curso completo de JavaScript do frontend ao backend</p>
                    <div class="course-price">R$ 697</div>
                    <a href="/course/javascript-fullstack" class="btn">Começar Agora</a>
                </div>

                <div class="course-card">
                    <div class="course-icon">📱</div>
                    <h3 class="course-title">React Native</h3>
                    <p class="course-desc">Desenvolva aplicações mobile nativas com React Native</p>
                    <div class="course-price">R$ 497</div>
                    <a href="/course/react-native-apps" class="btn">Começar Agora</a>
                </div>

                <div class="course-card">
                    <div class="course-icon">🐍</div>
                    <h3 class="course-title">Python Data Science</h3>
                    <p class="course-desc">Domine Python para análise de dados, machine learning e visualização</p>
                    <div class="course-price">R$ 597</div>
                    <a href="/course/python-data-science" class="btn">Começar Agora</a>
                </div>

                <div class="course-card">
                    <div class="course-icon">🐳</div>
                    <h3 class="course-title">DevOps & Docker</h3>
                    <p class="course-desc">Domine Docker, Kubernetes e CI/CD para deploy profissional</p>
                    <div class="course-price">R$ 397</div>
                    <a href="/course/devops-docker" class="btn">Começar Agora</a>
                </div>
            </div>
        </main>

        <footer class="footer">
            <p>&copy; 2025 Fênix Dev Academy. Todos os direitos reservados.</p>
        </footer>
    </div>
</body>
</html>`;

// Salvar HTML principal
fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);

// Criar _redirects para SPA
const redirects = `/*    /index.html   200`;
fs.writeFileSync(path.join(outDir, '_redirects'), redirects);

// Criar _headers para segurança
const headers = `/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin`;
fs.writeFileSync(path.join(outDir, '_headers'), headers);

// Criar netlify.toml
const netlifyToml = `[build]
  publish = "frontend/out"
  command = "node deploy-netlify-static.js"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"`;

fs.writeFileSync('netlify.toml', netlifyToml);

console.log('✅ Arquivos estáticos criados!');
console.log('📁 Pasta: frontend/out');
console.log('📄 Arquivos criados:');
console.log('  - index.html (página principal)');
console.log('  - _redirects (redirecionamentos SPA)');
console.log('  - _headers (headers de segurança)');
console.log('  - netlify.toml (configuração do Netlify)');
console.log('');
console.log('🚀 Próximo passo:');
console.log('1. Faça commit dos arquivos');
console.log('2. Conecte seu repositório no Netlify');
console.log('3. Configure:');
console.log('   - Build Command: node deploy-netlify-static.js');
console.log('   - Publish Directory: frontend/out');
console.log('4. Deploy!');
