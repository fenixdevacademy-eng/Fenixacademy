# Solução para Problemas de Cache - fenixdevacademy.com.br

## Problema
O frontend não está atualizando na URL fenixdevacademy.com.br devido a problemas de cache.

## Soluções Implementadas

### 1. Configuração de Headers de Cache
- Adicionado headers `Cache-Control: no-cache, no-store, must-revalidate`
- Configurado `Pragma: no-cache` e `Expires: 0`
- Meta tags no HTML para prevenir cache do browser

### 2. Scripts de Build
```bash
# Build normal
npm run build

# Build com força de atualização
npm run build:production

# Build forçado (limpa tudo)
npm run build:force
```

### 3. Configurações de Next.js
- `next.config.production.js` com configurações específicas para produção
- Headers de cache configurados para forçar atualização
- Configuração de `generateEtags: false`

## Como Resolver o Problema

### Opção 1: Deploy Forçado
```bash
# No diretório frontend
npm run build:production
# Faça o deploy com a nova versão
```

### Opção 2: Limpeza Completa
```bash
# No diretório frontend
npm run build:force
# Faça o deploy com a nova versão
```

### Opção 3: Configuração Manual
1. Acesse o painel do seu provedor de hosting
2. Limpe o cache do CDN/proxy
3. Force o redeploy da aplicação
4. Verifique se as configurações de cache estão corretas

## Verificação

### 1. Verificar Headers
```bash
curl -I https://fenixdevacademy.com.br
```
Deve retornar:
```
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

### 2. Verificar Build Info
Acesse: `https://fenixdevacademy.com.br/build-info.json`
Deve mostrar a versão mais recente.

### 3. Teste de Cache
1. Abra o DevTools (F12)
2. Vá para Network
3. Marque "Disable cache"
4. Recarregue a página
5. Verifique se os arquivos estão sendo carregados do servidor

## Configurações Adicionais

### CDN/Proxy
Se estiver usando Cloudflare, Vercel, ou outro CDN:
1. Limpe o cache do CDN
2. Configure regras de cache específicas
3. Desabilite cache para arquivos HTML

### Browser
Para usuários finais:
1. Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac)
2. Limpar cache do browser
3. Modo incógnito

## Monitoramento

### Logs de Deploy
Verifique se o deploy foi realizado com sucesso:
- Build sem erros
- Deploy completo
- Serviço funcionando

### Verificação de Versão
O arquivo `build-info.json` contém:
- Timestamp do build
- Versão da aplicação
- Data do build
- Commit hash

## Troubleshooting

### Se ainda não funcionar:
1. Verifique se o domínio está apontando para o servidor correto
2. Confirme se o DNS está propagado
3. Verifique se há redirecionamentos
4. Teste em diferentes browsers/dispositivos

### Comandos de Debug:
```bash
# Verificar versão atual
curl https://fenixdevacademy.com.br/build-info.json

# Verificar headers
curl -I https://fenixdevacademy.com.br

# Teste de conectividade
ping fenixdevacademy.com.br
```


