const fs = require('fs');
const path = require('path');

console.log('🚀 CRIANDO SUPER USUÁRIOS FENIX...');
console.log('===================================');

// Dados dos super usuários
const superUsers = [
    {
        id: 'ceo-fenix-001',
        name: 'CEO Fenix Dev Academy',
        email: 'fenixdevacademy@gmail.com',
        password: '159753lk',
        role: 'super_admin',
        position: 'CEO',
        permissions: ['all'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'gestor-trafego-001',
        name: 'Gestor de Tráfego',
        email: 'cezarcamaralins@gmail.com',
        password: '456789',
        role: 'super_admin',
        position: 'Gestor de Tráfego',
        permissions: ['all'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// Criar arquivo de dados dos super usuários
const superUsersPath = path.join(__dirname, 'frontend', 'lib', 'auth', 'super-users.json');
fs.writeFileSync(superUsersPath, JSON.stringify(superUsers, null, 2));

console.log('✅ Super usuários criados:');
superUsers.forEach(user => {
    console.log(`   👤 ${user.name} (${user.email}) - ${user.position}`);
});

console.log('\n📁 Arquivo salvo em:', superUsersPath);
console.log('\n🔐 Credenciais dos Super Usuários:');
console.log('===================================');
console.log('CEO:');
console.log('   Email: fenixdevacademy@gmail.com');
console.log('   Senha: 159753lk');
console.log('');
console.log('Gestor de Tráfego:');
console.log('   Email: cezarcamaralins@gmail.com');
console.log('   Senha: 456789');
console.log('\n🎉 Super usuários criados com sucesso!');







