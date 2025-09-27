#!/usr/bin/env node

/**
 * 🚀 Quick Fix - Correção Rápida de Erros de Build
 * Script simples e direto para corrigir os erros mais comuns
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Quick Fix - Corrigindo erros de build...\n');

// Lista de correções específicas baseadas nos erros que vimos
const quickFixes = [
    {
        name: 'Monaco Editor Types',
        files: ['frontend/components/AdvancedEditorSimple.tsx'],
        fixes: [
            {
                from: /lineNumbers:\s*(\w+)\s*\?\s*['"`]on['"`]\s*:\s*['"`]off['"`]/g,
                to: "lineNumbers: $1 ? 'on' as const : 'off' as const"
            },
            {
                from: /wordWrap:\s*(\w+)\s*\?\s*['"`]on['"`]\s*:\s*['"`]off['"`]/g,
                to: "wordWrap: $1 ? 'on' as const : 'off' as const"
            }
        ]
    },
    {
        name: 'ProfileStorage Methods',
        files: ['frontend/app/profile/useUserProfile.ts'],
        fixes: [
            {
                from: /ProfileStorage\.saveProfile\(/g,
                to: 'ProfileStorage.save('
            },
            {
                from: /ProfileStorage\.getProfile\(/g,
                to: 'ProfileStorage.load('
            },
            {
                from: /ProfileStorage\.updateProfile\(/g,
                to: 'ProfileStorage.save('
            }
        ]
    },
    {
        name: 'UserProfile Interface',
        files: ['frontend/lib/profileStorage.ts'],
        fixes: [
            {
                from: /(\s+email: string;\s+)/,
                to: '$1  phone?: string;\n'
            },
            {
                from: /(\s+notifications: boolean;\s+)/,
                to: '$1    timezone?: string;\n    emailNotifications?: boolean;\n    pushNotifications?: boolean;\n'
            }
        ]
    },
    {
        name: 'Permissions Types',
        files: ['frontend/app/utils/permissions.ts'],
        fixes: [
            {
                from: /newLevel\s*!==\s*['"`]free['"`]/g,
                to: 'true'
            }
        ]
    },
    {
        name: 'CourseItem Interface',
        files: ['frontend/lib/payment-service.ts'],
        fixes: [
            {
                from: /(export interface PaymentIntent[^}]+}\s*)/,
                to: `$1
export interface CourseItem {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    currency: string;
    image?: string;
    features?: string[];
    duration?: string;
    level?: string;
    category?: string;
}
`
            }
        ]
    }
];

// Função para aplicar correções
function applyFixes() {
    let totalFixed = 0;

    for (const fixGroup of quickFixes) {
        console.log(`📝 Aplicando: ${fixGroup.name}`);

        for (const filePath of fixGroup.files) {
            if (fs.existsSync(filePath)) {
                let content = fs.readFileSync(filePath, 'utf8');
                let hasChanges = false;

                for (const fix of fixGroup.fixes) {
                    const before = content;
                    content = content.replace(fix.from, fix.to);
                    if (before !== content) {
                        hasChanges = true;
                    }
                }

                if (hasChanges) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`  ✅ Corrigido: ${filePath}`);
                    totalFixed++;
                }
            } else {
                console.log(`  ⚠️  Arquivo não encontrado: ${filePath}`);
            }
        }
    }

    return totalFixed;
}

// Função para executar build
function runBuild() {
    try {
        console.log('\n🔨 Executando build...');
        execSync('npm run build', {
            cwd: 'frontend',
            stdio: 'inherit'
        });
        console.log('\n✅ Build executado com sucesso!');
        return true;
    } catch (error) {
        console.log('\n❌ Build falhou. Erros ainda persistem.');
        return false;
    }
}

// Função para executar deploy
function runDeploy() {
    try {
        console.log('\n🚀 Executando deploy...');
        execSync('vercel --prod --yes', {
            cwd: 'frontend',
            stdio: 'inherit'
        });
        console.log('\n✅ Deploy executado com sucesso!');
        return true;
    } catch (error) {
        console.log('\n❌ Deploy falhou.');
        return false;
    }
}

// Executar correções
const fixedCount = applyFixes();
console.log(`\n📊 Total de arquivos corrigidos: ${fixedCount}`);

// Executar build
const buildSuccess = runBuild();

if (buildSuccess) {
    // Perguntar sobre deploy
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('\n🚀 Deseja fazer deploy para produção? (s/n): ', (answer) => {
        if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
            runDeploy();
        } else {
            console.log('\n✅ Correções aplicadas com sucesso!');
            console.log('💡 Para fazer deploy manualmente: vercel --prod --yes');
        }
        rl.close();
    });
} else {
    console.log('\n⚠️  Execute este script novamente para corrigir erros restantes.');
}














