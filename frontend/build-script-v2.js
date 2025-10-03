// Script de build que move TODA a pasta API temporariamente
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build com correções (versão 2)...');

try {
  // Criar diretório temporário para TODA a pasta API
  const tempDir = path.join(__dirname, 'temp-api-backup');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Mover TODA a pasta app/api temporariamente
  const apiPath = path.join(__dirname, 'app/api');
  const tempApiPath = path.join(tempDir, 'api');
  
  if (fs.existsSync(apiPath)) {
    console.log('📁 Movendo TODA a pasta app/api...');
    
    // Copiar pasta API inteira
    fs.cpSync(apiPath, tempApiPath, { recursive: true });
    
    // Remover pasta API original
    fs.rmSync(apiPath, { recursive: true, force: true });
    
    console.log('✅ Pasta app/api movida temporariamente');
  }

  // Executar build
  console.log('📦 Executando build...');
  const { execSync } = require('child_process');
  execSync('npm run build', { stdio: 'inherit' });

  // Restaurar pasta API após o build
  console.log('🔄 Restaurando pasta app/api...');
  if (fs.existsSync(tempApiPath)) {
    // Criar diretório pai se não existir
    const parentDir = path.dirname(apiPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    
    // Copiar pasta API de volta
    fs.cpSync(tempApiPath, apiPath, { recursive: true });
    
    // Remover pasta temporária
    fs.rmSync(tempApiPath, { recursive: true, force: true });
    
    console.log('✅ Pasta app/api restaurada');
  }

  // Limpar diretório temporário
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log('🧹 Diretório temporário removido');
  }

  console.log('✅ Build concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  
  // Tentar restaurar pasta API em caso de erro
  try {
    const tempDir = path.join(__dirname, 'temp-api-backup');
    const apiPath = path.join(__dirname, 'app/api');
    const tempApiPath = path.join(tempDir, 'api');
    
    if (fs.existsSync(tempApiPath)) {
      const parentDir = path.dirname(apiPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      fs.cpSync(tempApiPath, apiPath, { recursive: true });
      fs.rmSync(tempApiPath, { recursive: true, force: true });
      console.log('✅ Pasta app/api restaurada após erro');
    }
    
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  } catch (restoreError) {
    console.error('❌ Erro ao restaurar pasta API:', restoreError.message);
  }
  
  process.exit(1);
}
