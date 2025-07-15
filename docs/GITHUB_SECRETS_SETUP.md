# Configuração dos Secrets do GitHub Actions

Este documento explica como configurar os secrets necessários no GitHub Actions para o pipeline de CI/CD.

## Secrets Necessários

### 1. DigitalOcean Access Token
- **Nome**: `DIGITALOCEAN_ACCESS_TOKEN`
- **Descrição**: Token de acesso da API do DigitalOcean
- **Como obter**:
  1. Acesse [DigitalOcean API](https://cloud.digitalocean.com/account/api/tokens)
  2. Clique em "Generate New Token"
  3. Dê um nome ao token (ex: "GitHub Actions")
  4. Selecione "Write" para permissões
  5. Copie o token gerado

### 2. DigitalOcean Registry Name
- **Nome**: `DIGITALOCEAN_REGISTRY_NAME`
- **Descrição**: Nome do registro de containers do DigitalOcean
- **Como obter**:
  1. Acesse [DigitalOcean Container Registry](https://cloud.digitalocean.com/registry)
  2. Crie um novo registro ou use um existente
  3. O nome será algo como "meu-registro" ou "fenix-academy-registry"

### 3. Droplet Host
- **Nome**: `DROPLET_HOST`
- **Descrição**: IP ou domínio do droplet do DigitalOcean
- **Exemplo**: `123.456.789.012` ou `app.fenixacademy.com`

### 4. Droplet Username
- **Nome**: `DROPLET_USERNAME`
- **Descrição**: Usuário SSH do droplet
- **Exemplo**: `root` ou `ubuntu`

### 5. Droplet SSH Key
- **Nome**: `DROPLET_SSH_KEY`
- **Descrição**: Chave SSH privada para acessar o droplet
- **Como obter**:
  1. Gere uma chave SSH: `ssh-keygen -t rsa -b 4096 -C "github-actions"`
  2. Adicione a chave pública ao droplet: `ssh-copy-id usuario@ip-do-droplet`
  3. Copie a chave privada (conteúdo do arquivo `~/.ssh/id_rsa`)

## Como Configurar no GitHub

1. Acesse seu repositório no GitHub
2. Vá para **Settings** > **Secrets and variables** > **Actions**
3. Clique em **New repository secret**
4. Adicione cada secret com o nome e valor correspondentes

## Estrutura dos Secrets

```yaml
# Exemplo de configuração
DIGITALOCEAN_ACCESS_TOKEN: dop_v1_1234567890abcdef...
DIGITALOCEAN_REGISTRY_NAME: fenix-academy-registry
DROPLET_HOST: 123.456.789.012
DROPLET_USERNAME: root
DROPLET_SSH_KEY: |
  -----BEGIN OPENSSH PRIVATE KEY-----
  b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
  ...
  -----END OPENSSH PRIVATE KEY-----
```

## Verificação

Após configurar todos os secrets:

1. Faça um push para a branch `main`
2. Vá para **Actions** no GitHub
3. Verifique se o workflow está executando sem erros
4. Confirme se as imagens estão sendo enviadas para o registry
5. Verifique se o deploy está funcionando no droplet

## Troubleshooting

### Erro de Autenticação no DigitalOcean
- Verifique se o `DIGITALOCEAN_ACCESS_TOKEN` está correto
- Confirme se o token tem permissões de escrita

### Erro de SSH
- Verifique se a chave SSH está no formato correto
- Confirme se a chave pública está adicionada ao droplet
- Teste a conexão SSH manualmente

### Erro de Registry
- Verifique se o `DIGITALOCEAN_REGISTRY_NAME` está correto
- Confirme se o registry existe no DigitalOcean
- Verifique se o token tem acesso ao registry

## Segurança

- Nunca commite secrets no código
- Use tokens com permissões mínimas necessárias
- Rotacione tokens regularmente
- Monitore logs de acesso 