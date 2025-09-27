// Teste do sistema de pagamento com múltiplas moedas
const testPaymentSystem = async () => {
    console.log('🧪 Testando sistema de pagamento...\n');

    try {
        // 1. Testar listagem de moedas
        console.log('1. Testando listagem de moedas...');
        const currenciesResponse = await fetch('http://localhost:3000/api/currency/list');
        const currenciesData = await currenciesResponse.json();

        if (currenciesData.success) {
            console.log('✅ Moedas carregadas:', currenciesData.data.currencies.length);
            console.log('   Moedas disponíveis:', currenciesData.data.currencies.map(c => c.code).join(', '));
        } else {
            console.log('❌ Erro ao carregar moedas:', currenciesData.error);
        }

        // 2. Testar conversão de moeda
        console.log('\n2. Testando conversão de moeda...');
        const conversionResponse = await fetch('http://localhost:3000/api/currency/convert?from=BRL&to=USD&amount=97');
        const conversionData = await conversionResponse.json();

        if (conversionData.success) {
            console.log('✅ Conversão BRL → USD:');
            console.log(`   R$ ${conversionData.data.originalAmount} = $${conversionData.data.convertedAmount}`);
            console.log(`   Taxa: ${conversionData.data.rate}`);
        } else {
            console.log('❌ Erro na conversão:', conversionData.error);
        }

        // 3. Testar processamento de pagamento
        console.log('\n3. Testando processamento de pagamento...');
        const paymentResponse = await fetch('http://localhost:3000/api/payments/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: 'all-courses',
                paymentMethod: 'credit_card',
                amount: 18.65, // $18.65 USD
                currency: 'USD',
                cardData: {
                    number: '4111111111111111',
                    name: 'Test User',
                    expiry: '12/25',
                    cvv: '123',
                    installments: 1
                },
                userEmail: 'test@example.com',
                userName: 'Test User'
            }),
        });

        const paymentData = await paymentResponse.json();

        if (paymentData.success) {
            console.log('✅ Pagamento processado:');
            console.log(`   ID: ${paymentData.data.payment.id}`);
            console.log(`   Status: ${paymentData.data.payment.status}`);
            console.log(`   Valor: ${paymentData.data.payment.originalAmount} ${paymentData.data.payment.originalCurrency}`);
            console.log(`   Valor USD: $${paymentData.data.payment.usdAmount}`);
            console.log(`   Taxa: $${paymentData.data.payment.processingFee}`);
        } else {
            console.log('❌ Erro no pagamento:', paymentData.error);
        }

        // 4. Testar pagamento PIX
        console.log('\n4. Testando pagamento PIX...');
        const pixResponse = await fetch('http://localhost:3000/api/payments/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: 'all-courses',
                paymentMethod: 'pix',
                amount: 97, // R$ 97 BRL
                currency: 'BRL',
                pixData: {
                    key: '21986289597'
                },
                userEmail: 'test@example.com',
                userName: 'Test User'
            }),
        });

        const pixData = await pixResponse.json();

        if (pixData.success) {
            console.log('✅ PIX processado:');
            console.log(`   ID: ${pixData.data.payment.id}`);
            console.log(`   Status: ${pixData.data.payment.status}`);
            console.log(`   Chave PIX: ${pixData.data.payment.pixKey}`);
            console.log(`   Expira em: ${pixData.data.payment.pixExpiresAt}`);
        } else {
            console.log('❌ Erro no PIX:', pixData.error);
        }

        console.log('\n🎉 Teste do sistema de pagamento concluído!');

    } catch (error) {
        console.error('❌ Erro durante o teste:', error.message);
    }
};

// Executar teste se estiver no Node.js
if (typeof window === 'undefined') {
    testPaymentSystem();
}

module.exports = testPaymentSystem;
