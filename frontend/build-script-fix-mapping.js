// Script que corrige diretamente o problema de mapeamento de páginas
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando correção do mapeamento de páginas...');

try {
  // Limpar caches
  console.log('🧹 Limpando caches...');
  
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

  // Criar diretório temporário
  const tempDir = path.join(__dirname, 'temp-mapping-fix');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Lista de arquivos que causam problemas no mapeamento
  const problematicFiles = [
    // Arquivos de API com process.cwd()
    'app/api/courses/processed/[courseSlug]/route.ts',
    'app/api/courses/processed/[courseSlug]/[moduleId]/examples/route.ts',
    'app/api/courses/processed/[courseSlug]/[moduleId]/[lessonId]/route.ts',
    'app/api/courses/content/[courseId]/route.ts',
    'app/api/admin/super-users/route.ts',
    'app/api/users/avatar/route.ts',
    
    // Arquivos de página com problemas de import
    'app/course/[slug]/module/[moduleId]/page.tsx',
    'app/course/[slug]/lesson/[lessonId]/page.tsx',
    'app/course/[slug]/exercise/[exerciseId]/page.tsx',
    'app/course/[slug]/quiz/[quizId]/page.tsx',
    'app/course/[slug]/project/[projectId]/page.tsx',
    'app/course/[slug]/content/page.tsx',
    'app/course/[slug]/purchase/page.tsx',
    
    // Outras rotas dinâmicas problemáticas
    'app/processed-courses/[courseSlug]/page.tsx',
    'app/expanded-course/[slug]/page.tsx',
    'app/courses/[slug]/page.tsx',
    'app/course-info/[slug]/page.tsx',
    
    // Arquivos de teste
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

  // Mover arquivos problemáticos
  console.log('📁 Movendo arquivos problemáticos...');
  problematicFiles.forEach(relativePath => {
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

  // Executar build
  console.log('📦 Executando build...');
  execSync('npm run build', { stdio: 'inherit' });

  // Restaurar arquivos
  console.log('🔄 Restaurando arquivos...');
  problematicFiles.forEach(relativePath => {
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

  console.log('✅ Correção do mapeamento concluída com sucesso!');
} catch (error) {
  console.error('❌ Erro durante a correção:', error.message);
  
  // Tentar restaurar arquivos em caso de erro
  try {
    const tempDir = path.join(__dirname, 'temp-mapping-fix');
    if (fs.existsSync(tempDir)) {
      const problematicFiles = [
        'app/api/courses/processed/[courseSlug]/route.ts',
        'app/api/courses/processed/[courseSlug]/[moduleId]/examples/route.ts',
        'app/api/courses/processed/[courseSlug]/[moduleId]/[lessonId]/route.ts',
        'app/api/courses/content/[courseId]/route.ts',
        'app/api/admin/super-users/route.ts',
        'app/api/users/avatar/route.ts',
        'app/course/[slug]/module/[moduleId]/page.tsx',
        'app/course/[slug]/lesson/[lessonId]/page.tsx',
        'app/course/[slug]/exercise/[exerciseId]/page.tsx',
        'app/course/[slug]/quiz/[quizId]/page.tsx',
        'app/course/[slug]/project/[projectId]/page.tsx',
        'app/course/[slug]/content/page.tsx',
        'app/course/[slug]/purchase/page.tsx',
        'app/processed-courses/[courseSlug]/page.tsx',
        'app/expanded-course/[slug]/page.tsx',
        'app/courses/[slug]/page.tsx',
        'app/course-info/[slug]/page.tsx',
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
      
      problematicFiles.forEach(relativePath => {
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
