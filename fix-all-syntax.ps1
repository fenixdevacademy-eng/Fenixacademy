# Script para corrigir todos os arquivos TypeScript com vírgulas extras
Write-Host "Iniciando correção de arquivos TypeScript..."

# Função para corrigir um arquivo
function Fix-File {
    param($FilePath)
    
    if (Test-Path $FilePath) {
        Write-Host "Corrigindo $FilePath..."
        
        # Ler o conteúdo do arquivo
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        
        # Aplicar correções
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
        $content = $content -replace '=\s*==', '==='
        $content = $content -replace ',\s*$', ''
        $content = $content -replace ';\s*$', ';'
        
        # Salvar o arquivo corrigido
        $content | Out-File -FilePath $FilePath -Encoding UTF8 -NoNewline
        
        Write-Host "Arquivo $FilePath corrigido!"
    }
}

# Encontrar todos os arquivos TypeScript
$tsFiles = Get-ChildItem -Recurse -Include "*.ts", "*.tsx" | Where-Object { $_.FullName -notlike "*node_modules*" -and $_.FullName -notlike "*.next*" }

Write-Host "Encontrados $($tsFiles.Count) arquivos TypeScript"

# Corrigir cada arquivo
foreach ($file in $tsFiles) {
    Fix-File -FilePath $file.FullName
}

Write-Host "Correção concluída!"











