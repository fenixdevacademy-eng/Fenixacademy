/**
 * 🚀 Demonstração do Auto-Complete Inteligente - Fenix IDE 2.0
 * Mostra as funcionalidades avançadas de auto-complete
 */

const FenixIDE2Core = require('./fenix-ide-v2-core');

async function demonstrateAutoComplete() {
    console.log('🚀 Iniciando demonstração do Auto-Complete Inteligente...\n');

    try {
        // 1. Inicializar a IDE
        console.log('📋 Passo 1: Inicializando Fenix IDE 2.0...');
        const ide = new FenixIDE2Core({
            workspacePath: process.cwd(),
            theme: 'dark',
            language: 'pt-BR'
        });

        // Aguardar inicialização
        await new Promise(resolve => {
            ide.once('ide:initialized', resolve);
        });

        console.log('✅ IDE inicializada com sucesso!\n');

        // 2. Iniciar a IDE
        console.log('🚀 Passo 2: Iniciando a IDE...');
        await ide.start();
        console.log('✅ IDE iniciada!\n');

        // 3. Demonstrar auto-complete
        console.log('🎯 Passo 3: Demonstrando Auto-Complete Inteligente...');
        const autoComplete = ide.modules.get('auto-complete')?.instance;

        if (autoComplete) {
            console.log('📋 Status do Auto-Complete:');
            const status = autoComplete.getStatus();
            console.log(`   Nome: ${status.name}`);
            console.log(`   Ativo: ${status.isActive}`);
            console.log(`   Cache: ${status.cacheSize} sugestões`);
            console.log(`   Snippets contextuais: ${status.contextualSnippets}\n`);

            // 4. Demonstrar sugestões para JavaScript
            console.log('💻 Passo 4: Sugestões para JavaScript...');
            const jsContext = {
                language: 'javascript',
                content: `
function calcularImposto(valor, tipo) {
    // Função para calcular impostos brasileiros
    let imposto = 0;
    
    if (tipo === 'ICMS') {
        imposto = valor * 0.18; // 18% ICMS
    } else if (tipo === 'IPI') {
        imposto = valor * 0.05; // 5% IPI
    }
    
    return imposto;
}

// Validação de CPF
function validarCPF(cpf) {
    // Implementação aqui
}

// Geração de PIX
class PIXGenerator {
    // Implementação aqui
}
                `,
                position: { line: 25, character: 10 },
                filePath: '/demo/brazilian-taxes.js'
            };

            const suggestions = await autoComplete.getIntelligentSuggestions(jsContext);

            console.log('📋 Sugestões inteligentes obtidas:');
            console.log(`   Total: ${suggestions.length} sugestões\n`);

            // Mostrar sugestões por categoria
            const brazilianSuggestions = suggestions.filter(s => s.isBrazilian);
            const snippetSuggestions = suggestions.filter(s => s.kind === 'snippet');
            const aiSuggestions = suggestions.filter(s => s.isAI);
            const codeSuggestions = suggestions.filter(s => s.kind === 'variable' || s.kind === 'function' || s.kind === 'class');

            if (brazilianSuggestions.length > 0) {
                console.log('🇧🇷 Sugestões Brasileiras:');
                brazilianSuggestions.forEach(s => {
                    console.log(`   🎯 ${s.label} - ${s.detail}`);
                });
                console.log();
            }

            if (snippetSuggestions.length > 0) {
                console.log('📝 Snippets:');
                snippetSuggestions.forEach(s => {
                    console.log(`   📋 ${s.label} - ${s.detail}`);
                });
                console.log();
            }

            if (aiSuggestions.length > 0) {
                console.log('🧠 Sugestões da IA:');
                aiSuggestions.forEach(s => {
                    console.log(`   💡 ${s.label} - ${s.detail}`);
                });
                console.log();
            }

            if (codeSuggestions.length > 0) {
                console.log('🔍 Código Local:');
                codeSuggestions.forEach(s => {
                    console.log(`   ${s.kind === 'function' ? '⚙️' : s.kind === 'class' ? '🏗️' : '📦'} ${s.label} - ${s.detail}`);
                });
                console.log();
            }

            // 5. Demonstrar cache
            console.log('💾 Passo 5: Sistema de Cache...');
            const cacheStatus = autoComplete.getStatus();
            console.log(`   📦 Tamanho do cache: ${cacheStatus.cacheSize}`);
            console.log(`   ⏱️ Expiração: ${autoComplete.cacheExpiry / 1000}s\n`);

            // 6. Demonstrar snippets contextuais
            console.log('🎨 Passo 6: Snippets Contextuais...');
            const contextualSnippets = autoComplete.contextualSnippets;

            console.log('📋 Categorias disponíveis:');
            for (const [category, snippets] of contextualSnippets) {
                console.log(`   📁 ${category}: ${Object.keys(snippets).length} snippets`);
                for (const [name, snippet] of Object.entries(snippets)) {
                    console.log(`      📝 ${name}: ${snippet.description}`);
                }
            }
            console.log();

            // 7. Demonstrar priorização
            console.log('🎯 Passo 7: Sistema de Priorização...');
            console.log('📊 Ordem de prioridade das sugestões:');
            console.log('   1. 🇧🇷 Snippets brasileiros (máxima prioridade)');
            console.log('   2. 📝 Snippets da linguagem');
            console.log('   3. 🧠 Sugestões da IA');
            console.log('   4. 🔍 Código local (variáveis, funções, classes)\n');

            // 8. Demonstrar eventos
            console.log('🔔 Passo 8: Sistema de Eventos...');
            autoComplete.on('suggestions:generated', (data) => {
                console.log(`   ✅ Evento: ${data.count} sugestões geradas para ${data.language}`);
            });

            autoComplete.on('suggestion:used', (suggestion) => {
                console.log(`   🎯 Evento: Sugestão "${suggestion.label}" utilizada`);
            });

            // Simular uso de sugestão
            if (suggestions.length > 0) {
                const firstSuggestion = suggestions[0];
                autoComplete.emit('suggestion:selected', firstSuggestion);
            }

        } else {
            console.log('❌ Módulo de auto-complete não encontrado');
        }

        // 9. Resumo final
        console.log('🎉 Demonstração do Auto-Complete concluída!');
        console.log('\n📋 Recursos do Auto-Complete Inteligente:');
        console.log('   🚀 Sugestões contextuais inteligentes');
        console.log('   🇧🇷 Snippets brasileiros prioritários');
        console.log('   🧠 Integração com IA');
        console.log('   💾 Sistema de cache otimizado');
        console.log('   🎯 Priorização inteligente');
        console.log('   🔍 Análise de código local');
        console.log('   📝 Snippets por linguagem');
        console.log('   🔔 Sistema de eventos robusto');

        // 10. Parar a IDE
        console.log('\n🛑 Parando a IDE...');
        await ide.stop();
        console.log('✅ IDE parada com sucesso');

        // 11. Limpeza
        console.log('\n🧹 Realizando limpeza...');
        await ide.cleanup();
        console.log('✅ Limpeza concluída');

        console.log('\n🎯 Auto-Complete Inteligente - Fenix IDE 2.0');
        console.log('🚀 Revolucionando a experiência de desenvolvimento!');

    } catch (error) {
        console.error('❌ Erro na demonstração:', error);
        process.exit(1);
    }
}

// Executar demonstração se for o arquivo principal
if (require.main === module) {
    demonstrateAutoComplete().catch(error => {
        console.error('❌ Erro fatal na demonstração:', error);
        process.exit(1);
    });
}

module.exports = { demonstrateAutoComplete };
