// Script que corrige diretamente os arquivos problemáticos no código fonte
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando correção direta dos arquivos problemáticos...');

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

  // Lista de arquivos que precisam ser corrigidos
  const filesToFix = [
    'app/api/courses/processed/[courseSlug]/route.ts',
    'app/api/courses/processed/[courseSlug]/[moduleId]/examples/route.ts',
    'app/api/courses/processed/[courseSlug]/[moduleId]/[lessonId]/route.ts',
    'app/api/courses/content/[courseId]/route.ts',
    'app/api/admin/super-users/route.ts',
    'app/api/users/avatar/route.ts',
  ];

  // Corrigir arquivos específicos
  console.log('🔧 Corrigindo arquivos problemáticos...');
  filesToFix.forEach(relativePath => {
    const filePath = path.join(__dirname, relativePath);
    if (fs.existsSync(filePath)) {
      console.log(`🔧 Corrigindo: ${relativePath}`);
      
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Substituir process.cwd() por '/app'
      content = content.replace(/process\.cwd\(\)/g, "'/app'");
      
      // Substituir join(process.cwd(), por join('/app',
      content = content.replace(/join\(process\.cwd\(\),/g, "join('/app',");
      
      // Substituir path.join(process.cwd(), por path.join('/app',
      content = content.replace(/path\.join\(process\.cwd\(\),/g, "path.join('/app',");
      
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Corrigido: ${relativePath}`);
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

  console.log('✅ Correção direta concluída com sucesso!');
} catch (error) {
  console.error('❌ Erro durante a correção:', error.message);
  process.exit(1);
}
