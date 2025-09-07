// Script de teste para verificar se a API está funcionando
const testAPI = async () => {
    try {
        console.log('🧪 Testando API de aulas...');

        // Testar carregamento da primeira aula
        const response = await fetch('/api/lessons/web-fundamentals/1/1');

        if (response.ok) {
            const data = await response.json();
            console.log('✅ API funcionando!');
            console.log('📚 Aula carregada:', data.data.title);
            console.log('📝 Conteúdo:', data.data.content.substring(0, 100) + '...');
        } else {
            console.log('❌ Erro na API:', response.status, response.statusText);
            const error = await response.text();
            console.log('📄 Detalhes:', error);
        }
    } catch (error) {
        console.log('❌ Erro ao testar API:', error.message);
    }
};

// Executar teste
testAPI();





