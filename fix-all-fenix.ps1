# Script para corrigir TODOS os arquivos da Fenix
Write-Host "=== CORREÇÃO COMPLETA DA FENIX ===" -ForegroundColor Green
Write-Host "Iniciando correção de todos os arquivos TypeScript/TSX..." -ForegroundColor Yellow

# Função para corrigir um arquivo
function Fix-File {
    param($FilePath)
    
    try {
        if (Test-Path $FilePath) {
            Write-Host "Corrigindo: $FilePath" -ForegroundColor Cyan
            
            # Ler o conteúdo do arquivo
            $content = Get-Content $FilePath -Raw -Encoding UTF8
            
            # Aplicar todas as correções necessárias
            $content = $content -replace ',\s*;', ';'                    # ,; -> ;
            $content = $content -replace ';\s*,', ';'                    # ;, -> ;
            $content = $content -replace '{\s*,', '{'                    # {, -> {
            $content = $content -replace ',\s*}', '}'                    # ,} -> }
            $content = $content -replace '\(\s*\)', '()'                 # () -> ()
            $content = $content -replace 'if\s*\(\s*\)', 'if (true)'     # if() -> if (true)
            $content = $content -replace 'catch\s*\(\s*\)', 'catch (error)' # catch() -> catch (error)
            $content = $content -replace 'return\s*{\s*;', 'return {'   # return {; -> return {
            $content = $content -replace '{\s*;', '{'                    # {; -> {
            $content = $content -replace '}\s*;', '}'                    # }; -> }
            $content = $content -replace '=\s*==', '==='                 # = == -> ===
            $content = $content -replace ',\s*$', ''                     # , no final da linha
            $content = $content -replace ';\s*$', ';'                    # ; no final da linha
            $content = $content -replace ',\s*;', ';'                    # ,; -> ;
            $content = $content -replace ';\s*,', ';'                    # ;, -> ;
            $content = $content -replace '{\s*,', '{'                    # {, -> {
            $content = $content -replace ',\s*}', '}'                    # ,} -> }
            $content = $content -replace '\(\s*\)', '()'                 # () -> ()
            $content = $content -replace 'if\s*\(\s*\)', 'if (true)'     # if() -> if (true)
            $content = $content -replace 'catch\s*\(\s*\)', 'catch (error)' # catch() -> catch (error)
            $content = $content -replace 'return\s*{\s*;', 'return {'   # return {; -> return {
            $content = $content -replace '{\s*;', '{'                    # {; -> {
            $content = $content -replace '}\s*;', '}'                    # }; -> }
            $content = $content -replace '=\s*==', '==='                 # = == -> ===
            
            # Salvar o arquivo corrigido
            $content | Out-File -FilePath $FilePath -Encoding UTF8 -NoNewline
            
            Write-Host "✓ Corrigido: $FilePath" -ForegroundColor Green
            return $true
        } else {
            Write-Host "✗ Arquivo não encontrado: $FilePath" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "✗ Erro ao corrigir $FilePath : $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Encontrar todos os arquivos TypeScript/TSX
Write-Host "Procurando arquivos TypeScript/TSX..." -ForegroundColor Yellow
$tsFiles = Get-ChildItem -Recurse -Include "*.ts", "*.tsx" | Where-Object { 
    $_.FullName -notlike "*node_modules*" -and 
    $_.FullName -notlike "*.next*" -and
    $_.FullName -notlike "*dist*" -and
    $_.FullName -notlike "*build*"
}

Write-Host "Encontrados $($tsFiles.Count) arquivos para corrigir" -ForegroundColor Yellow

# Contadores
$totalFiles = $tsFiles.Count
$fixedFiles = 0
$errorFiles = 0

# Corrigir cada arquivo
foreach ($file in $tsFiles) {
    if (Fix-File -FilePath $file.FullName) {
        $fixedFiles++
    } else {
        $errorFiles++
    }
    
    # Mostrar progresso
    $progress = [math]::Round(($fixedFiles + $errorFiles) / $totalFiles * 100, 2)
    Write-Progress -Activity "Corrigindo arquivos" -Status "Progresso: $progress%" -PercentComplete $progress
}

Write-Host "`n=== CORREÇÃO CONCLUÍDA ===" -ForegroundColor Green
Write-Host "Total de arquivos: $totalFiles" -ForegroundColor White
Write-Host "Arquivos corrigidos: $fixedFiles" -ForegroundColor Green
Write-Host "Arquivos com erro: $errorFiles" -ForegroundColor Red

if ($errorFiles -eq 0) {
    Write-Host "`n🎉 TODOS OS ARQUIVOS FORAM CORRIGIDOS COM SUCESSO!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Alguns arquivos tiveram problemas. Verifique os erros acima." -ForegroundColor Yellow
}

Write-Host "`nPróximos passos:" -ForegroundColor Cyan
Write-Host "1. Execute: npm run build" -ForegroundColor White
Write-Host "2. Execute: npm run dev" -ForegroundColor White
Write-Host "3. Teste o projeto" -ForegroundColor White











