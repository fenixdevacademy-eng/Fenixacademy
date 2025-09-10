#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando migração dos cursos da Fenix Academy...');

// Lista de cursos para migrar
const courses = [
    {
        old: 'course_content/web-fundamentals-complete.json',
        new: 'course_content/web-fundamentals-improved.json'
    },
    {
        old: 'course_content/react-advanced-complete.json',
        new: 'course_content/react-advanced-improved.json'
    },
    {
        old: 'course_content/python-data-science-complete.json',
        new: 'course_content/python-data-science-improved.json'
    },
    {
        old: 'course_content/nodejs-apis-complete.json',
        new: 'course_content/nodejs-apis-improved.json'
    },
    {
        old: 'course_content/devops-docker-complete.json',
        new: 'course_content/devops-docker-improved.json'
    }
];

// Função para migrar um curso
function migrateCourse(oldPath, newPath) {
    try {
        // Verificar se o arquivo novo existe
        if (!fs.existsSync(newPath)) {
            console.log(`❌ Arquivo não encontrado: ${newPath}`);
            return false;
        }

        // Ler o conteúdo do arquivo novo
        const newContent = fs.readFileSync(newPath, 'utf8');

        // Escrever o conteúdo no arquivo antigo
        fs.writeFileSync(oldPath, newContent);

        console.log(`✅ Migrado: ${oldPath}`);
        return true;
    } catch (error) {
        console.log(`❌ Erro ao migrar ${oldPath}:`, error.message);
        return false;
    }
}

// Executar migração
let successCount = 0;
let totalCount = courses.length;

courses.forEach(course => {
    if (migrateCourse(course.old, course.new)) {
        successCount++;
    }
});

console.log(`\n📊 Resultado da migração:`);
console.log(`✅ Sucessos: ${successCount}/${totalCount}`);
console.log(`❌ Falhas: ${totalCount - successCount}/${totalCount}`);

if (successCount === totalCount) {
    console.log('\n🎉 Migração concluída com sucesso!');
    console.log('📚 Todos os cursos foram atualizados com o novo conteúdo melhorado.');
} else {
    console.log('\n⚠️  Migração concluída com alguns erros.');
    console.log('🔍 Verifique os arquivos que falharam e tente novamente.');
}

console.log('\n🚀 Próximos passos:');
console.log('1. Testar funcionalidades em ambiente de desenvolvimento');
console.log('2. Atualizar banco de dados com novo conteúdo');
console.log('3. Treinar equipe sobre as melhorias implementadas');
console.log('4. Lançar campanha de marketing sobre as melhorias');

