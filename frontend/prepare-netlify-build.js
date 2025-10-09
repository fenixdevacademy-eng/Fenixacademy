#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 PREPARANDO BUILD PARA NETLIFY');
console.log('=================================');

// 1. Remover pasta de APIs que causam problemas com export
const apiDir = path.join(__dirname, 'app', 'api');
if (fs.existsSync(apiDir)) {
    console.log('📁 Removendo pasta de APIs...');
    fs.rmSync(apiDir, { recursive: true, force: true });
    console.log('✅ Pasta de APIs removida');
}

// 2. Criar pasta de APIs vazia para evitar erros
fs.mkdirSync(apiDir, { recursive: true });

// 3. Criar um arquivo de placeholder para APIs
const placeholderApi = path.join(apiDir, 'placeholder.js');
fs.writeFileSync(placeholderApi, `
// Placeholder para APIs removidas para build estático
export default function handler(req, res) {
  res.status(404).json({ message: 'API não disponível em build estático' });
}
`);

// 4. Copiar configuração simplificada
console.log('📋 Copiando configuração simplificada...');
const sourceConfig = path.join(__dirname, 'next.config.netlify-simple.js');
const targetConfig = path.join(__dirname, 'next.config.js');
fs.copyFileSync(sourceConfig, targetConfig);
console.log('✅ Configuração copiada');

// 5. Criar arquivo de build info
const buildInfo = {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    buildType: 'netlify-static'
};
fs.writeFileSync('build-info.json', JSON.stringify(buildInfo, null, 2));

console.log('✅ PREPARAÇÃO CONCLUÍDA!');
console.log('🚀 Execute: npm run build:netlify-simple');


