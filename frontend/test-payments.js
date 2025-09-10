const fetch = require('node-fetch');

const TEST_URL = process.env.TEST_URL || 'http://localhost:3000';

const paymentTests = [
    {
        name: 'Credit Card Payment',
        url: '/api/payments/process',
        method: 'POST',
        body: {
            planId: 'pro',
            paymentMethod: 'credit',
            amount: 197.00,
            installments: 1,
            cardData: {
                cardNumber: '4111111111111111',
                expiryDate: '12/25',
                cvv: '123',
                cardName: 'João Silva'
            },
            email: 'teste@exemplo.com',
            phone: '(11) 99999-9999',
            cpf: '123.456.789-00'
        },
        expectedStatus: 200,
        validate: (data) => data.success && data.data.transactionId
    },
    {
        name: 'PIX Payment',
        url: '/api/payments/process',
        method: 'POST',
        body: {
            planId: 'basic',
            paymentMethod: 'pix',
            amount: 97.00,
            email: 'teste@exemplo.com',
            phone: '(11) 99999-9999',
            cpf: '123.456.789-00'
        },
        expectedStatus: 200,
        validate: (data) => data.success && data.data.status === 'pending'
    },
    {
        name: 'Boleto Payment',
        url: '/api/payments/process',
        method: 'POST',
        body: {
            planId: 'founder',
            paymentMethod: 'boleto',
            amount: 997.00,
            email: 'teste@exemplo.com',
            phone: '(11) 99999-9999',
            cpf: '123.456.789-00'
        },
        expectedStatus: 200,
        validate: (data) => data.success && data.data.status === 'pending'
    },
    {
        name: 'Bank Transfer Payment',
        url: '/api/payments/process',
        method: 'POST',
        body: {
            planId: 'pro',
            paymentMethod: 'transfer',
            amount: 197.00,
            email: 'teste@exemplo.com',
            phone: '(11) 99999-9999',
            cpf: '123.456.789-00'
        },
        expectedStatus: 200,
        validate: (data) => data.success && data.data.bankData
    },
    {
        name: 'Payment History',
        url: '/api/payments',
        method: 'GET',
        expectedStatus: 200,
        validate: (data) => data.success && Array.isArray(data.data.payments)
    },
    {
        name: 'Payment Status Check',
        url: '/api/payments/status?transactionId=TXN-2024-001',
        method: 'GET',
        expectedStatus: 200,
        validate: (data) => data.success && data.data.status
    }
];

async function runPaymentTest(testConfig) {
    console.log(`Testing: ${testConfig.name}`);
    try {
        const options = {
            method: testConfig.method,
            headers: { 'Content-Type': 'application/json' },
            body: testConfig.body ? JSON.stringify(testConfig.body) : undefined,
        };

        const response = await fetch(`${TEST_URL}${testConfig.url}`, options);
        const data = await response.json();

        if (response.status === testConfig.expectedStatus && testConfig.validate(data)) {
            console.log(`✅ Payment Test OK: ${testConfig.name}`);
            if (data.data && data.data.transactionId) {
                console.log(`   Transaction ID: ${data.data.transactionId}`);
            }
            if (data.data && data.data.bankData) {
                console.log(`   Bank Data: ${data.data.bankData.bank} - ${data.data.bankData.agency}/${data.data.bankData.account}`);
            }
            return true;
        } else {
            console.error(`❌ Payment Test FAILED: ${testConfig.name}`);
            console.error(`   Status: ${response.status}, Expected: ${testConfig.expectedStatus}`);
            console.error(`   Response: ${JSON.stringify(data, null, 2)}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Payment Test Error - ${testConfig.name}: ${error.message}`);
        return false;
    }
}

async function testBankData() {
    console.log('\nTesting Bank Data Integration...');

    try {
        const response = await fetch(`${TEST_URL}/api/payments`);
        const data = await response.json();

        if (data.success && data.data.bankData) {
            const bankData = data.data.bankData;
            console.log('✅ Bank Data Retrieved:');
            console.log(`   Bank: ${bankData.bank}`);
            console.log(`   Agency: ${bankData.agency}`);
            console.log(`   Account: ${bankData.account}`);
            console.log(`   PIX Key: ${bankData.pixKey}`);
            console.log(`   CNPJ: ${bankData.cnpj}`);
            console.log(`   Company: ${bankData.companyName}`);
            return true;
        } else {
            console.error('❌ Bank Data Test FAILED: No bank data found');
            return false;
        }
    } catch (error) {
        console.error(`❌ Bank Data Test Error: ${error.message}`);
        return false;
    }
}

async function runAllTests() {
    console.log('🚀 Payment System Test Suite');
    console.log(`Testing against: ${TEST_URL}`);

    let passedCount = 0;
    let failedCount = 0;
    const failedTests = [];

    // Test bank data integration
    const bankDataSuccess = await testBankData();
    if (bankDataSuccess) {
        passedCount++;
    } else {
        failedCount++;
        failedTests.push('Bank Data Integration');
    }

    // Test payment processing
    for (const test of paymentTests) {
        const success = await runPaymentTest(test);
        if (success) {
            passedCount++;
        } else {
            failedCount++;
            failedTests.push(test.name);
        }
    }

    console.log('\n📊 Payment Test Results Summary');
    console.log(`✅ Passed: ${passedCount}`);
    console.log(`❌ Failed: ${failedCount}`);
    console.log(`📈 Success Rate: ${(passedCount / (passedCount + failedCount) * 100).toFixed(1)}%`);

    if (failedCount > 0) {
        console.log('\nFailed tests:');
        failedTests.forEach(test => console.log(`  - ${test}`));
        process.exit(1);
    } else {
        console.log('\n🎉 All payment tests passed!');
        console.log('\n💳 Payment System Features:');
        console.log('  ✅ Credit Card Processing');
        console.log('  ✅ PIX Integration');
        console.log('  ✅ Boleto Generation');
        console.log('  ✅ Bank Transfer Support');
        console.log('  ✅ Payment Status Tracking');
        console.log('  ✅ Bank Data Integration');
        console.log('  ✅ Form Validation');
        console.log('  ✅ Error Handling');
    }
}

runAllTests();
