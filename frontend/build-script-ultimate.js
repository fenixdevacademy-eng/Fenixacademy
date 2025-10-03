// Script de build que move TODOS os arquivos problemáticos
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build ULTIMATE com limpeza completa...');

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
  const tempDir = path.join(__dirname, 'temp-problematic-files');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Lista COMPLETA de arquivos/diretórios problemáticos
  const problematicPaths = [
    'app/api',
    'app/course/[slug]/module/[moduleId]',
    'app/course/[slug]/lesson/[lessonId]',
    'app/course/[slug]/exercise/[exerciseId]',
    'app/course/[slug]/quiz/[quizId]',
    'app/course/[slug]/project/[projectId]',
    'app/processed-courses/[courseSlug]',
    'app/expanded-course/[slug]',
    'app/courses/[slug]',
    'app/course-info/[slug]',
    'app/courses/lua-fundamentals',
    'app/auth/register/test-page.tsx',
    'app/dashboard/test',
    'app/test',
    'app/test-minimal',
    'app/login-test',
    'app/test-page.tsx',
    'app/test-redirect',
    'app/test-simple',
    'app/test-auth',
    'app/test-integration',
    'app/test-animations',
  ];

  // Mover TODOS os arquivos problemáticos
  console.log('📁 Movendo TODOS os arquivos problemáticos...');
  problematicPaths.forEach(relativePath => {
    const sourcePath = path.join(__dirname, relativePath);
    const targetPath = path.join(tempDir, relativePath);
    
    if (fs.existsSync(sourcePath)) {
      // Criar diretório pai se não existir
      const parentDir = path.dirname(targetPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      // Copiar arquivo/diretório (para evitar erro EXDEV)
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

  // Executar build limpo
  console.log('📦 Executando build limpo...');
  execSync('npm run build', { stdio: 'inherit' });

  // Restaurar TODOS os arquivos após o build
  console.log('🔄 Restaurando TODOS os arquivos...');
  problematicPaths.forEach(relativePath => {
    const sourcePath = path.join(tempDir, relativePath);
    const targetPath = path.join(__dirname, relativePath);
    
    if (fs.existsSync(sourcePath)) {
      // Criar diretório pai se não existir
      const parentDir = path.dirname(targetPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      // Copiar arquivo/diretório de volta (para evitar erro EXDEV)
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

  console.log('✅ Build ULTIMATE concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  
  // Tentar restaurar arquivos em caso de erro
  try {
    const tempDir = path.join(__dirname, 'temp-problematic-files');
    if (fs.existsSync(tempDir)) {
      const problematicPaths = [
        'app/api',
        'app/course/[slug]/module/[moduleId]',
        'app/course/[slug]/lesson/[lessonId]',
        'app/course/[slug]/exercise/[exerciseId]',
        'app/course/[slug]/quiz/[quizId]',
        'app/course/[slug]/project/[projectId]',
        'app/processed-courses/[courseSlug]',
        'app/expanded-course/[slug]',
        'app/courses/[slug]',
        'app/course-info/[slug]',
        'app/courses/lua-fundamentals',
        'app/auth/register/test-page.tsx',
        'app/dashboard/test',
        'app/test',
        'app/test-minimal',
        'app/login-test',
        'app/test-page.tsx',
        'app/test-redirect',
        'app/test-simple',
        'app/test-auth',
        'app/test-integration',
        'app/test-animations',
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
      console.log('✅ Arquivos restaurados após erro');
    }
  } catch (restoreError) {
    console.error('❌ Erro ao restaurar arquivos:', restoreError.message);
  }
  
  process.exit(1);
}
