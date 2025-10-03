// Script que corrige TODOS os arquivos problemáticos de uma vez
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando correção de TODOS os arquivos problemáticos...');

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

  // Função para corrigir um arquivo
  function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return false;
    
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      let modified = false;
      
      // Substituir process.cwd() por '/app'
      if (content.includes('process.cwd()')) {
        content = content.replace(/process\.cwd\(\)/g, "'/app'");
        modified = true;
      }
      
      // Substituir join(process.cwd(), por join('/app',
      if (content.includes('join(process.cwd(),')) {
        content = content.replace(/join\(process\.cwd\(\),/g, "join('/app',");
        modified = true;
      }
      
      // Substituir path.join(process.cwd(), por path.join('/app',
      if (content.includes('path.join(process.cwd(),')) {
        content = content.replace(/path\.join\(process\.cwd\(\),/g, "path.join('/app',");
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✅ Corrigido: ${filePath}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.log(`❌ Erro ao corrigir ${filePath}:`, error.message);
      return false;
    }
  }

  // Lista de TODOS os arquivos que podem ter problemas
  const filesToCheck = [
    // Arquivos de API
    'app/api/courses/processed/route.ts',
    'app/api/courses/processed/[courseSlug]/route.ts',
    'app/api/courses/processed/[courseSlug]/[moduleId]/examples/route.ts',
    'app/api/courses/processed/[courseSlug]/[moduleId]/[lessonId]/route.ts',
    'app/api/courses/content/[courseId]/route.ts',
    'app/api/courses/[slug]/content/route.ts',
    'app/api/admin/super-users/route.ts',
    'app/api/users/avatar/route.ts',
    
    // Scripts
    'build-force.js',
    'scripts/run-course-generator.js',
    'setup-real-database.js',
    'scripts/generate-courses.js',
    'scripts/clean-monaco-editor.js',
    'scripts/fix-monaco-editor.js',
    'fix-syntax-errors.js',
    'fix-all-syntax.js',
    
    // Outros arquivos
    'next.config.js',
    'next.config.working.js',
    'next.config.fixed.js',
  ];

  // Corrigir todos os arquivos
  console.log('🔧 Corrigindo TODOS os arquivos...');
  let fixedCount = 0;
  
  filesToCheck.forEach(relativePath => {
    const filePath = path.join(__dirname, relativePath);
    if (fixFile(filePath)) {
      fixedCount++;
    }
  });

  // Buscar e corrigir outros arquivos automaticamente
  console.log('🔍 Buscando outros arquivos com problemas...');
  function findAndFixFiles(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && !item.includes('node_modules')) {
        findAndFixFiles(itemPath);
      } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.js') || item.endsWith('.tsx') || item.endsWith('.jsx'))) {
        if (fixFile(itemPath)) {
          fixedCount++;
        }
      }
    });
  }

  // Buscar em todo o diretório app
  findAndFixFiles(path.join(__dirname, 'app'));

  console.log(`✅ Total de arquivos corrigidos: ${fixedCount}`);

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

  console.log('✅ Correção de TODOS os arquivos concluída com sucesso!');
} catch (error) {
  console.error('❌ Erro durante a correção:', error.message);
  process.exit(1);
}
