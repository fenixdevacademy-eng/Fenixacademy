// Script de build NUCLEAR - move TUDO exceto páginas essenciais
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build NUCLEAR - apenas páginas essenciais...');

try {
  // Limpar todos os caches e diretórios de build
  console.log('🧹 Limpando cache e diretórios de build...');
  
  const dirsToClean = [
    '.next',
    'out',
    'node_modules/.cache',
    '.turbo',
    'dist',
    'build'
  ];

  dirsToClean.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`🗑️ Removendo: ${dir}`);
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  });

  // Criar diretório temporário para arquivos problemáticos
  const tempDir = path.join(__dirname, 'temp-nuclear-files');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Lista de arquivos ESSENCIAIS que devem permanecer
  const essentialFiles = [
    'app/layout.tsx',
    'app/page.tsx',
    'app/globals.css',
    'app/favicon.ico',
    'app/loading.tsx',
    'app/not-found.tsx',
    'app/error.tsx',
  ];

  // Mover TUDO da pasta app exceto os essenciais
  console.log('📁 Movendo TUDO exceto páginas essenciais...');
  
  const appDir = path.join(__dirname, 'app');
  if (fs.existsSync(appDir)) {
    const items = fs.readdirSync(appDir);
    
    items.forEach(item => {
      const itemPath = path.join(appDir, item);
      const isEssential = essentialFiles.some(essential => 
        itemPath.includes(essential.replace('app/', ''))
      );
      
      if (!isEssential) {
        const targetPath = path.join(tempDir, 'app', item);
        const parentDir = path.dirname(targetPath);
        
        if (!fs.existsSync(parentDir)) {
          fs.mkdirSync(parentDir, { recursive: true });
        }
        
        if (fs.statSync(itemPath).isDirectory()) {
          fs.cpSync(itemPath, targetPath, { recursive: true });
          fs.rmSync(itemPath, { recursive: true, force: true });
        } else {
          fs.copyFileSync(itemPath, targetPath);
          fs.unlinkSync(itemPath);
        }
        console.log(`✅ Movido: app/${item}`);
      } else {
        console.log(`🔒 Mantido (essencial): app/${item}`);
      }
    });
  }

  // Limpar cache do npm
  console.log('📦 Limpando cache do npm...');
  try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Erro ao limpar cache do npm (continuando...):', error.message);
  }

  // Executar build limpo
  console.log('📦 Executando build limpo...');
  execSync('npm run build', { stdio: 'inherit' });

  // Restaurar TODOS os arquivos após o build
  console.log('🔄 Restaurando TODOS os arquivos...');
  const tempAppDir = path.join(tempDir, 'app');
  if (fs.existsSync(tempAppDir)) {
    const items = fs.readdirSync(tempAppDir);
    
    items.forEach(item => {
      const sourcePath = path.join(tempAppDir, item);
      const targetPath = path.join(appDir, item);
      
      if (fs.existsSync(sourcePath)) {
        if (fs.statSync(sourcePath).isDirectory()) {
          fs.cpSync(sourcePath, targetPath, { recursive: true });
          fs.rmSync(sourcePath, { recursive: true, force: true });
        } else {
          fs.copyFileSync(sourcePath, targetPath);
          fs.unlinkSync(sourcePath);
        }
        console.log(`✅ Restaurado: app/${item}`);
      }
    });
  }

  // Limpar diretório temporário
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log('🧹 Diretório temporário removido');
  }

  console.log('✅ Build NUCLEAR concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  
  // Tentar restaurar arquivos em caso de erro
  try {
    const tempDir = path.join(__dirname, 'temp-nuclear-files');
    if (fs.existsSync(tempDir)) {
      const tempAppDir = path.join(tempDir, 'app');
      const appDir = path.join(__dirname, 'app');
      
      if (fs.existsSync(tempAppDir)) {
        const items = fs.readdirSync(tempAppDir);
        
        items.forEach(item => {
          const sourcePath = path.join(tempAppDir, item);
          const targetPath = path.join(appDir, item);
          
          if (fs.existsSync(sourcePath)) {
            if (fs.statSync(sourcePath).isDirectory()) {
              fs.cpSync(sourcePath, targetPath, { recursive: true });
              fs.rmSync(sourcePath, { recursive: true, force: true });
            } else {
              fs.copyFileSync(sourcePath, targetPath);
              fs.unlinkSync(sourcePath);
            }
          }
        });
      }
      
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log('✅ Arquivos restaurados após erro');
    }
  } catch (restoreError) {
    console.error('❌ Erro ao restaurar arquivos:', restoreError.message);
  }
  
  process.exit(1);
}
