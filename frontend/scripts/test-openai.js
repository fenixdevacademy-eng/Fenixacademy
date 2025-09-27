// Script para testar a conectividade com a API da OpenAI
const apiKey = process.env.OPENAI_API_KEY || '';

async function testOpenAI() {
    console.log('🔍 Testando conectividade com OpenAI...');
    console.log('API Key:', apiKey.substring(0, 10) + '...');

    try {
        // Teste 1: Listar modelos
        console.log('\n📋 Testando listagem de modelos...');
        const modelsResponse = await fetch('https://api.openai.com/v1/models', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        if (modelsResponse.ok) {
            const modelsData = await modelsResponse.json();
            console.log('✅ Modelos disponíveis:', modelsData.data?.length || 0);
        } else {
            console.log('❌ Erro ao listar modelos:', modelsResponse.status);
            const errorData = await modelsResponse.json();
            console.log('Detalhes do erro:', errorData);
        }

        // Teste 2: Chat simples
        console.log('\n💬 Testando chat...');
        const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: 'Responda apenas "Teste de conectividade bem-sucedido!"'
                    }
                ],
                max_tokens: 50
            }),
        });

        if (chatResponse.ok) {
            const chatData = await chatResponse.json();
            console.log('✅ Chat funcionando:', chatData.choices[0]?.message?.content);
            console.log('Tokens usados:', chatData.usage);
        } else {
            console.log('❌ Erro no chat:', chatResponse.status);
            const errorData = await chatResponse.json();
            console.log('Detalhes do erro:', errorData);
        }

    } catch (error) {
        console.log('❌ Erro de conectividade:', error.message);
    }
}

testOpenAI();
