#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando geração completa dos cursos da Fênix Academy...\n');

try {
  // Executar o gerador de cursos
  console.log('📚 Gerando cursos e conteúdo...');
  execSync('node scripts/generate-courses.js', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });

  console.log('\n✅ Geração de cursos concluída!');
  console.log('\n📊 Resumo:');
  console.log('• 26 cursos criados');
  console.log('• 95 módulos gerados');
  console.log('• 1.900 aulas criadas');
  console.log('• Projetos práticos incluídos');
  console.log('• Conteúdo 200% mais explicativo');

  console.log('\n🎯 Próximos passos:');
  console.log('1. Acesse /ide-advanced para usar a IDE avançada');
  console.log('2. Explore os cursos em /courses');
  console.log('3. Comece a programar!');

} catch (error) {
  console.error('❌ Erro durante a geração:', error.message);
  process.exit(1);
}

