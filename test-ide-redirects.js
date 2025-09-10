#!/usr/bin/env node

/**
 * Script de teste para verificar redirecionamentos da IDE
 * Executa testes de redirecionamento e funcionalidade
 */

const https = require('https');
const http = require('http');

// Configurações
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const TIMEOUT = 10000;

// Cores para output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// URLs para testar
const testUrls = [
    // Redirecionamentos principais
    { from: '/ide', to: '/ide-advanced', expected: 301 },
    { from: '/ide-simple', to: '/ide-advanced-simple', expected: 301 },
    { from: '/ide-cs50', to: '/ide-advanced', expected: 301 },
    { from: '/editor', to: '/ide-advanced', expected: 301 },
    { from: '/code-editor', to: '/ide-advanced', expected: 301 },
    { from: '/online-ide', to: '/ide-advanced', expected: 301 },
    { from: '/web-ide', to: '/ide-advanced', expected: 301 },
    { from: '/fenix-ide', to: '/ide-advanced', expected: 301 },
    { from: '/advanced-editor', to: '/ide-advanced', expected: 301 },

    // URLs diretas (devem retornar 200)
    { from: '/ide-advanced', to: '/ide-advanced', expected: 200 },
    { from: '/ide-advanced-simple', to: '/ide-advanced-simple', expected: 200 },
    { from: '/ide-advanced/test', to: '/ide-advanced/test', expected: 200 },

    // APIs da IDE
    { from: '/api/ide/status', to: '/api/ide/status', expected: 200 },
    { from: '/api/ide/execute', to: '/api/ide/execute', expected: 405 }, // POST only
    { from: '/api/ide/save', to: '/api/ide/save', expected: 405 } // POST only
];

// Função para fazer requisição HTTP
function makeRequest(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const isHttps = url.startsWith('https');
        const client = isHttps ? https : http;

        const options = {
            method,
            timeout: TIMEOUT,
            headers: {
                'User-Agent': 'IDE-Redirect-Test/1.0',
                'Accept': 'application/json, text/html, */*'
            }
        };

        if (data) {
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(data);
        }

        const req = client.request(url, options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: body,
                    location: res.headers.location
                });
            });
        });

        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        if (data) {
            req.write(data);
        }

        req.end();
    });
}

// Função para testar redirecionamento
async function testRedirect(testCase) {
    const { from, to, expected } = testCase;
    const fullUrl = `${BASE_URL}${from}`;

    try {
        console.log(`${colors.blue}Testing:${colors.reset} ${from} -> ${to}`);

        const response = await makeRequest(fullUrl);

        if (response.statusCode === expected) {
            if (expected === 301 || expected === 302) {
                // Verificar se o redirecionamento está correto
                if (response.location && response.location.includes(to)) {
                    console.log(`${colors.green}✅ PASS${colors.reset} - Redirect ${from} -> ${response.location}`);
                    return { success: true, message: `Redirected to ${response.location}` };
                } else {
                    console.log(`${colors.red}❌ FAIL${colors.reset} - Wrong redirect location: ${response.location}`);
                    return { success: false, message: `Wrong redirect location: ${response.location}` };
                }
            } else if (expected === 200) {
                console.log(`${colors.green}✅ PASS${colors.reset} - Direct access to ${from}`);
                return { success: true, message: `Direct access successful` };
            } else if (expected === 405) {
                console.log(`${colors.green}✅ PASS${colors.reset} - Method not allowed (expected for ${from})`);
                return { success: true, message: `Method not allowed (expected)` };
            }
        } else {
            console.log(`${colors.red}❌ FAIL${colors.reset} - Expected ${expected}, got ${response.statusCode}`);
            return { success: false, message: `Expected ${expected}, got ${response.statusCode}` };
        }
    } catch (error) {
        console.log(`${colors.red}❌ ERROR${colors.reset} - ${error.message}`);
        return { success: false, message: error.message };
    }
}

// Função para testar API da IDE
async function testIDEAPI() {
    console.log(`\n${colors.cyan}Testing IDE API endpoints...${colors.reset}`);

    try {
        // Testar status da IDE
        const statusResponse = await makeRequest(`${BASE_URL}/api/ide/status`);
        if (statusResponse.statusCode === 200) {
            const data = JSON.parse(statusResponse.body);
            console.log(`${colors.green}✅ IDE Status API${colors.reset} - ${data.data.status}`);
            console.log(`   Supported languages: ${data.data.supportedLanguages.length}`);
            console.log(`   Components: ${Object.keys(data.data.components).length}`);
        } else {
            console.log(`${colors.red}❌ IDE Status API${colors.reset} - Status: ${statusResponse.statusCode}`);
        }

        // Testar execução de código
        const executeData = JSON.stringify({
            code: 'console.log("Hello from IDE test!");',
            language: 'javascript',
            filename: 'test.js'
        });

        const executeResponse = await makeRequest(`${BASE_URL}/api/ide/execute`, 'POST', executeData);
        if (executeResponse.statusCode === 200) {
            const data = JSON.parse(executeResponse.body);
            console.log(`${colors.green}✅ IDE Execute API${colors.reset} - Execution ID: ${data.data.executionId}`);
        } else {
            console.log(`${colors.red}❌ IDE Execute API${colors.reset} - Status: ${executeResponse.statusCode}`);
        }

        // Testar salvamento de arquivo
        const saveData = JSON.stringify({
            filename: 'test.js',
            content: 'console.log("Hello World!");',
            language: 'javascript',
            workspace: '/workspace'
        });

        const saveResponse = await makeRequest(`${BASE_URL}/api/ide/save`, 'POST', saveData);
        if (saveResponse.statusCode === 200) {
            const data = JSON.parse(saveResponse.body);
            console.log(`${colors.green}✅ IDE Save API${colors.reset} - File ID: ${data.data.file.id}`);
        } else {
            console.log(`${colors.red}❌ IDE Save API${colors.reset} - Status: ${saveResponse.statusCode}`);
        }

    } catch (error) {
        console.log(`${colors.red}❌ API Test Error${colors.reset} - ${error.message}`);
    }
}

// Função principal
async function runTests() {
    console.log(`${colors.bright}${colors.cyan}🚀 IDE Redirect Test Suite${colors.reset}`);
    console.log(`${colors.blue}Testing against:${colors.reset} ${BASE_URL}`);
    console.log(`${colors.blue}Total tests:${colors.reset} ${testUrls.length}\n`);

    const results = [];

    // Testar redirecionamentos
    for (const testCase of testUrls) {
        const result = await testRedirect(testCase);
        results.push({
            ...testCase,
            result
        });

        // Pequena pausa entre testes
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Testar APIs da IDE
    await testIDEAPI();

    // Resumo dos resultados
    console.log(`\n${colors.bright}${colors.cyan}📊 Test Results Summary${colors.reset}`);
    const passed = results.filter(r => r.result.success).length;
    const failed = results.filter(r => !r.result.success).length;

    console.log(`${colors.green}✅ Passed:${colors.reset} ${passed}`);
    console.log(`${colors.red}❌ Failed:${colors.reset} ${failed}`);
    console.log(`${colors.blue}📈 Success Rate:${colors.reset} ${((passed / results.length) * 100).toFixed(1)}%`);

    if (failed > 0) {
        console.log(`\n${colors.red}Failed tests:${colors.reset}`);
        results.filter(r => !r.result.success).forEach(r => {
            console.log(`  - ${r.from}: ${r.result.message}`);
        });
    }

    console.log(`\n${colors.bright}${colors.green}🎉 Test completed!${colors.reset}`);

    // Exit code baseado nos resultados
    process.exit(failed > 0 ? 1 : 0);
}

// Executar testes
runTests().catch(error => {
    console.error(`${colors.red}❌ Test suite error:${colors.reset}`, error);
    process.exit(1);
});




