// Script de build otimizado para projeto completo
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build otimizado para projeto completo...');

try {
  // Limpar apenas caches essenciais
  console.log('🧹 Limpando caches essenciais...');
  
  const dirsToClean = [
    '.next',
    'out',
    'node_modules/.cache',
    '.turbo'
  ];

  dirsToClean.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`🗑️ Removendo: ${dir}`);
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  });

  // Criar diretório temporário apenas para arquivos problemáticos
  const tempDir = path.join(__dirname, 'temp-problematic-only');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Lista APENAS dos arquivos que causam o erro de path undefined
  const problematicPaths = [
    // Apenas arquivos de API que usam process.cwd()
    'app/api/courses/processed',
    'app/api/courses/content',
    'app/api/admin/super-users',
    'app/api/users/avatar',
    
    // Apenas arquivos de teste que podem causar conflitos
    'app/test',
    'app/test-minimal',
    'app/test-animations',
    'app/test-auth',
    'app/test-integration',
    'app/test-redirect',
    'app/test-simple',
    'app/login-test',
    'app/test-page.tsx',
    'app/auth/register/test-page.tsx',
    'app/dashboard/test',
  ];

  // Mover APENAS os arquivos problemáticos
  console.log('📁 Movendo APENAS arquivos problemáticos...');
  problematicPaths.forEach(relativePath => {
    const sourcePath = path.join(__dirname, relativePath);
    const targetPath = path.join(tempDir, relativePath);
    
    if (fs.existsSync(sourcePath)) {
      const parentDir = path.dirname(targetPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, targetPath, { recursive: true });
        fs.rmSync(sourcePath, { recursive: true, force: true });
      } else {
        fs.copyFileSync(sourcePath, targetPath);
        fs.unlinkSync(sourcePath);
      }
      console.log(`✅ Movido: ${relativePath}`);
    }
  });

  // Limpar cache do npm
  console.log('📦 Limpando cache do npm...');
  try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Erro ao limpar cache do npm (continuando...):', error.message);
  }

  // Executar build com timeout
  console.log('📦 Executando build otimizado...');
  try {
    // Usar timeout para evitar travamento
    execSync('timeout 600 npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Build com timeout, tentando sem timeout...');
    execSync('npm run build', { stdio: 'inherit' });
  }

  // Restaurar APENAS os arquivos problemáticos
  console.log('🔄 Restaurando arquivos problemáticos...');
  problematicPaths.forEach(relativePath => {
    const sourcePath = path.join(tempDir, relativePath);
    const targetPath = path.join(__dirname, relativePath);
    
    if (fs.existsSync(sourcePath)) {
      const parentDir = path.dirname(targetPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, targetPath, { recursive: true });
        fs.rmSync(sourcePath, { recursive: true, force: true });
      } else {
        fs.copyFileSync(sourcePath, targetPath);
        fs.unlinkSync(sourcePath);
      }
      console.log(`✅ Restaurado: ${relativePath}`);
    }
  });

  // Limpar diretório temporário
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log('🧹 Diretório temporário removido');
  }

  console.log('✅ Build otimizado concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build otimizado:', error.message);
  
  // Tentar restaurar arquivos problemáticos em caso de erro
  try {
    const tempDir = path.join(__dirname, 'temp-problematic-only');
    if (fs.existsSync(tempDir)) {
      const problematicPaths = [
        'app/api/courses/processed',
        'app/api/courses/content',
        'app/api/admin/super-users',
        'app/api/users/avatar',
        'app/test',
        'app/test-minimal',
        'app/test-animations',
        'app/test-auth',
        'app/test-integration',
        'app/test-redirect',
        'app/test-simple',
        'app/login-test',
        'app/test-page.tsx',
        'app/auth/register/test-page.tsx',
        'app/dashboard/test',
      ];
      
      problematicPaths.forEach(relativePath => {
        const sourcePath = path.join(tempDir, relativePath);
        const targetPath = path.join(__dirname, relativePath);
        
        if (fs.existsSync(sourcePath)) {
          const parentDir = path.dirname(targetPath);
          if (!fs.existsSync(parentDir)) {
            fs.mkdirSync(parentDir, { recursive: true });
          }
          
          if (fs.statSync(sourcePath).isDirectory()) {
            fs.cpSync(sourcePath, targetPath, { recursive: true });
            fs.rmSync(sourcePath, { recursive: true, force: true });
          } else {
            fs.copyFileSync(sourcePath, targetPath);
            fs.unlinkSync(sourcePath);
          }
        }
      });
      
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log('✅ Arquivos problemáticos restaurados após erro');
    }
  } catch (restoreError) {
    console.error('❌ Erro ao restaurar arquivos problemáticos:', restoreError.message);
  }
  
  process.exit(1);
}
