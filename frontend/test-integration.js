#!/usr/bin/env node

/**
 * Script de Teste de Integração - Fenix Academy
 * Verifica se todas as APIs e funcionalidades estão funcionando
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';
const TESTS = [
    {
        name: 'API de Teste',
        path: '/api/test',
        expected: { status: 200, message: 'API funcionando corretamente!' }
    },
    {
        name: 'API de Módulos (Web Fundamentals)',
        path: '/api/lessons/web-fundamentals/1',
        expected: { status: 200, hasLessons: true }
    },
    {
        name: 'API de Aula Individual',
        path: '/api/lessons/web-fundamentals/1/1',
        expected: { status: 200, hasContent: true }
    }
];

function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve({
                        status: res.statusCode,
                        data: jsonData,
                        headers: res.headers
                    });
                } catch (error) {
                    resolve({
                        status: res.statusCode,
                        data: data,
                        headers: res.headers
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Timeout'));
        });

        req.end();
    });
}

async function runTests() {
    console.log('🚀 Iniciando Testes de Integração - Fenix Academy\n');
    
    let passedTests = 0;
    let totalTests = TESTS.length;

    for (const test of TESTS) {
        console.log(`📋 Testando: ${test.name}`);
        console.log(`   URL: ${BASE_URL}${test.path}`);
        
        try {
            const response = await makeRequest(test.path);
            
            if (response.status === test.expected.status) {
                if (test.expected.message && response.data.message === test.expected.message) {
                    console.log(`   ✅ Status: ${response.status} - Mensagem correta`);
                    passedTests++;
                } else if (test.expected.hasLessons && Array.isArray(response.data) && response.data.length > 0) {
                    console.log(`   ✅ Status: ${response.status} - ${response.data.length} aulas encontradas`);
                    passedTests++;
                } else if (test.expected.hasContent && response.data.content) {
                    console.log(`   ✅ Status: ${response.status} - Conteúdo da aula carregado`);
                    passedTests++;
                } else {
                    console.log(`   ⚠️  Status: ${response.status} - Resposta inesperada`);
                }
            } else {
                console.log(`   ❌ Status: ${response.status} (esperado: ${test.expected.status})`);
            }
            
            console.log(`   Tempo de resposta: ${response.headers['x-response-time'] || 'N/A'}\n`);
            
        } catch (error) {
            console.log(`   ❌ Erro: ${error.message}\n`);
        }
    }

    // Resultado final
    console.log('📊 Resultado dos Testes');
    console.log('='.repeat(40));
    console.log(`✅ Testes aprovados: ${passedTests}/${totalTests}`);
    console.log(`❌ Testes falharam: ${totalTests - passedTests}/${totalTests}`);
    
    const successRate = (passedTests / totalTests) * 100;
    console.log(`📈 Taxa de sucesso: ${successRate.toFixed(1)}%`);
    
    if (successRate === 100) {
        console.log('\n🎉 TODOS OS TESTES PASSARAM! A integração está funcionando perfeitamente!');
        process.exit(0);
    } else {
        console.log('\n⚠️  Alguns testes falharam. Verifique os logs acima.');
        process.exit(1);
    }
}

// Verificar se o servidor está rodando
async function checkServer() {
    try {
        await makeRequest('/api/test');
        console.log('✅ Servidor detectado e respondendo');
        return true;
    } catch (error) {
        console.log('❌ Servidor não está rodando ou não está acessível');
        console.log('   Execute: npm run dev');
        return false;
    }
}

// Executar testes
async function main() {
    const serverRunning = await checkServer();
    
    if (serverRunning) {
        await runTests();
    } else {
        process.exit(1);
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { runTests, makeRequest };












