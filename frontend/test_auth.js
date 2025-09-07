// Script para testar autenticação
console.log('🔐 Testando sistema de autenticação...');

// Função para simular login
function simulateLogin() {
    console.log('1. Simulando login...');

    // Adicionar cookie de autenticação
    document.cookie = 'auth_token=user_logged_in; path=/; max-age=86400';

    console.log('✅ Cookie de autenticação adicionado');
    console.log('🍪 Cookies atuais:', document.cookie);

    // Redirecionar para cursos
    setTimeout(() => {
        console.log('2. Redirecionando para /courses...');
        window.location.href = '/courses';
    }, 1000);
}

// Função para verificar autenticação
function checkAuth() {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie =>
        cookie.trim().startsWith('auth_token=')
    );

    console.log('🔍 Verificando autenticação...');
    console.log('Cookie encontrado:', !!authCookie);

    return !!authCookie;
}

// Função para fazer logout
function logout() {
    console.log('🚪 Fazendo logout...');

    // Remover cookie
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    console.log('✅ Cookie removido');
    console.log('🍪 Cookies atuais:', document.cookie);

    // Redirecionar para login
    setTimeout(() => {
        window.location.href = '/auth/login';
    }, 500);
}

// Função para testar redirecionamento
function testRedirect() {
    console.log('3. Testando redirecionamento...');

    if (checkAuth()) {
        console.log('✅ Usuário autenticado, redirecionando para /courses');
        window.location.href = '/courses';
    } else {
        console.log('❌ Usuário não autenticado, redirecionando para /auth/login');
        window.location.href = '/auth/login';
    }
}

// Executar testes
console.log('🚀 Iniciando testes de autenticação...');
console.log('💡 Use no console:');
console.log('  - simulateLogin() - Simular login');
console.log('  - checkAuth() - Verificar autenticação');
console.log('  - logout() - Fazer logout');
console.log('  - testRedirect() - Testar redirecionamento');

// Exportar funções
window.simulateLogin = simulateLogin;
window.checkAuth = checkAuth;
window.logout = logout;
window.testRedirect = testRedirect; 