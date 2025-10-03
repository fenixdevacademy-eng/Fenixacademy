// Script de build NUCLEAR - cria projeto completamente limpo
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build NUCLEAR - projeto completamente limpo...');

try {
  // Limpar TODOS os caches e diretórios
  console.log('🧹 Limpeza NUCLEAR de todos os caches...');

  const dirsToClean = [
    '.next',
    'out',
    'node_modules/.cache',
    '.turbo',
    'dist',
    'build',
    'node_modules'
  ];

  dirsToClean.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`🗑️ Removendo: ${dir}`);
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  });

  // Criar diretório temporário para arquivos essenciais
  const tempDir = path.join(__dirname, 'temp-essential-files');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Lista de arquivos ESSENCIAIS que devem ser mantidos
  const essentialFiles = [
    'package.json',
    'next.config.js',
    'tailwind.config.js',
    'postcss.config.js',
    'tsconfig.json',
    'app/layout.tsx',
    'app/page.tsx',
    'app/globals.css',
    'app/favicon.ico',
    'components',
    'lib',
    'public'
  ];

  // Mover arquivos essenciais para o diretório temporário
  console.log('📁 Movendo arquivos essenciais...');
  essentialFiles.forEach(relativePath => {
    const sourcePath = path.join(__dirname, relativePath);
    const targetPath = path.join(tempDir, relativePath);

    if (fs.existsSync(sourcePath)) {
      const parentDir = path.dirname(targetPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      if (fs.statSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, targetPath, { recursive: true });
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
      console.log(`✅ Movido: ${relativePath}`);
    }
  });

  // Remover TODOS os outros arquivos do app
  console.log('🗑️ Removendo TODOS os arquivos problemáticos...');
  const appDir = path.join(__dirname, 'app');
  if (fs.existsSync(appDir)) {
    const items = fs.readdirSync(appDir);
    items.forEach(item => {
      const itemPath = path.join(appDir, item);
      if (!essentialFiles.includes(`app/${item}`)) {
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`🗑️ Removido: app/${item}`);
      }
    });
  }

  // Restaurar apenas os arquivos essenciais
  console.log('🔄 Restaurando arquivos essenciais...');
  essentialFiles.forEach(relativePath => {
    const sourcePath = path.join(tempDir, relativePath);
    const targetPath = path.join(__dirname, relativePath);

    if (fs.existsSync(sourcePath)) {
      const parentDir = path.dirname(targetPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      if (fs.statSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, targetPath, { recursive: true });
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
      console.log(`✅ Restaurado: ${relativePath}`);
    }
  });

  // Limpar diretório temporário
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log('🧹 Diretório temporário removido');
  }

  // Limpar cache do npm
  console.log('📦 Limpando cache do npm...');
  try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Erro ao limpar cache do npm (continuando...):', error.message);
  }

  // Reinstalar dependências
  console.log('📥 Reinstalando dependências...');
  execSync('npm install', { stdio: 'inherit' });

  // Executar build limpo
  console.log('📦 Executando build NUCLEAR limpo...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build NUCLEAR concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build NUCLEAR:', error.message);

  // Tentar restaurar arquivos essenciais em caso de erro
  try {
    const tempDir = path.join(__dirname, 'temp-essential-files');
    if (fs.existsSync(tempDir)) {
      const essentialFiles = [
        'package.json',
        'next.config.js',
        'tailwind.config.js',
        'postcss.config.js',
        'tsconfig.json',
        'app/layout.tsx',
        'app/page.tsx',
        'app/globals.css',
        'app/favicon.ico',
        'components',
        'lib',
        'public'
      ];

      essentialFiles.forEach(relativePath => {
        const sourcePath = path.join(tempDir, relativePath);
        const targetPath = path.join(__dirname, relativePath);

        if (fs.existsSync(sourcePath)) {
          const parentDir = path.dirname(targetPath);
          if (!fs.existsSync(parentDir)) {
            fs.mkdirSync(parentDir, { recursive: true });
          }

          if (fs.statSync(sourcePath).isDirectory()) {
            fs.cpSync(sourcePath, targetPath, { recursive: true });
          } else {
            fs.copyFileSync(sourcePath, targetPath);
          }
        }
      });

      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log('✅ Arquivos essenciais restaurados após erro');
    }
  } catch (restoreError) {
    console.error('❌ Erro ao restaurar arquivos essenciais:', restoreError.message);
  }

  process.exit(1);
}