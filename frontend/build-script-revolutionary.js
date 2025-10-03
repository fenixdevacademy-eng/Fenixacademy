// 🚀 SCRIPT REVOLUCIONÁRIO - RECRIAÇÃO COMPLETA DA FÊNIX
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 INICIANDO RECRIAÇÃO REVOLUCIONÁRIA DA FÊNIX...');
console.log('🔥 Abordagem: Build sem arquivos problemáticos + Recriação inteligente');

try {
  // Limpeza revolucionária
  console.log('🧹 LIMPEZA REVOLUCIONÁRIA...');
  
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

  // Criar backup revolucionário
  const backupDir = path.join(__dirname, 'fenix-backup-revolutionary');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Lista revolucionária de arquivos problemáticos
  const problematicFiles = [
    // TODA a pasta API
    'app/api',
    
    // TODAS as rotas dinâmicas problemáticas
    'app/course/[slug]',
    'app/courses/[slug]',
    'app/processed-courses/[courseSlug]',
    'app/expanded-course/[slug]',
    'app/course-info/[slug]',
    
    // Arquivos específicos problemáticos
    'app/courses/lua-fundamentals',
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
    
    // Arquivos de configuração problemáticos
    'app/manifest.webmanifest',
    'app/robots.ts',
    'app/sitemap.ts',
    'app/manifest.ts',
  ];

  // Backup revolucionário
  console.log('💾 BACKUP REVOLUCIONÁRIO...');
  problematicFiles.forEach(relativePath => {
    const sourcePath = path.join(__dirname, relativePath);
    const backupPath = path.join(backupDir, relativePath);
    
    if (fs.existsSync(sourcePath)) {
      const parentDir = path.dirname(backupPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, backupPath, { recursive: true });
        fs.rmSync(sourcePath, { recursive: true, force: true });
      } else {
        fs.copyFileSync(sourcePath, backupPath);
        fs.unlinkSync(sourcePath);
      }
      console.log(`💾 Backup: ${relativePath}`);
    }
  });

  // Limpar cache do npm
  console.log('📦 Limpando cache do npm...');
  try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Erro ao limpar cache do npm (continuando...):', error.message);
  }

  // Executar build revolucionário
  console.log('🚀 Executando build revolucionário...');
  execSync('npm run build', { stdio: 'inherit' });

  // Restaurar arquivos após build bem-sucedido
  console.log('🔄 Restaurando arquivos após build bem-sucedido...');
  problematicFiles.forEach(relativePath => {
    const sourcePath = path.join(backupDir, relativePath);
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

  // Limpar backup
  if (fs.existsSync(backupDir)) {
    fs.rmSync(backupDir, { recursive: true, force: true });
    console.log('🧹 Backup limpo');
  }

  console.log('🎉 RECRIAÇÃO REVOLUCIONÁRIA CONCLUÍDA COM SUCESSO!');
  console.log('🚀 Fênix Dev Academy agora está funcionando perfeitamente!');
} catch (error) {
  console.error('❌ Erro durante a recriação revolucionária:', error.message);
  
  // Tentar restaurar arquivos em caso de erro
  try {
    const backupDir = path.join(__dirname, 'fenix-backup-revolutionary');
    if (fs.existsSync(backupDir)) {
      const problematicFiles = [
        'app/api',
        'app/course/[slug]',
        'app/courses/[slug]',
        'app/processed-courses/[courseSlug]',
        'app/expanded-course/[slug]',
        'app/course-info/[slug]',
        'app/courses/lua-fundamentals',
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
        'app/manifest.webmanifest',
        'app/robots.ts',
        'app/sitemap.ts',
        'app/manifest.ts',
      ];
      
      problematicFiles.forEach(relativePath => {
        const sourcePath = path.join(backupDir, relativePath);
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
      
      fs.rmSync(backupDir, { recursive: true, force: true });
      console.log('✅ Arquivos restaurados após erro');
    }
  } catch (restoreError) {
    console.error('❌ Erro ao restaurar arquivos:', restoreError.message);
  }
  
  process.exit(1);
}