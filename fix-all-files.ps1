# Script para corrigir todos os arquivos TypeScript com vírgulas extras

# Lista de arquivos para corrigir
$files = @(
    "lib/payment-service.ts",
    "lib/stripe.ts", 
    "lib/profileStorage.ts",
    "lib/pixel-tracking.ts",
    "lib/performance-optimizer.ts",
    "lib/coupons/coupon-service.ts",
    "lib/database.ts",
    "lib/i18n/index.ts",
    "lib/i18n/useTranslation.ts"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Corrigindo $file..."
        
        # Ler o conteúdo do arquivo
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Remover vírgulas extras e corrigir sintaxe
        $content = $content -replace ',\s*;', ';'
        $content = $content -replace ';\s*,', ';'
        $content = $content -replace '{\s*,', '{'
        $content = $content -replace ',\s*}', '}'
        $content = $content -replace '\(\s*\)', '()'
        $content = $content -replace 'if\s*\(\s*\)', 'if (true)'
        $content = $content -replace 'catch\s*\(\s*\)', 'catch (error)'
        $content = $content -replace 'return\s*{\s*;', 'return {'
        $content = $content -replace '{\s*;', '{'
        $content = $content -replace '}\s*;', '}'
        
        # Salvar o arquivo corrigido
        $content | Out-File -FilePath $file -Encoding UTF8 -NoNewline
        
        Write-Host "Arquivo $file corrigido!"
    } else {
        Write-Host "Arquivo $file não encontrado"
    }
}

Write-Host "Correção concluída!"









