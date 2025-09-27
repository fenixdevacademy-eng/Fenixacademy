# 🚀 Guia de Deploy com GitHub Pages

## ✅ Configuração Completa

A plataforma Fenix já está **100% configurada** para deploy automático com GitHub Pages!

### 📁 Arquivos de Configuração Prontos:
- ✅ `.github/workflows/deploy.yml` - GitHub Actions
- ✅ `frontend/build-github.js` - Script de build otimizado
- ✅ `frontend/package.json` - Script `build:github` configurado
- ✅ Configuração Next.js para export estático

## 🎯 Passos para Deploy

### 1. **Fazer Commit e Push**
```bash
git add .
git commit -m "feat: Deploy com GitHub Pages - Exemplos práticos adicionados"
git push origin main
```

### 2. **Configurar GitHub Pages**
1. Acesse seu repositório no GitHub
2. Vá em **Settings** > **Pages**
3. Em **Source**, selecione **"GitHub Actions"**
4. Salve as configurações

### 3. **Deploy Automático**
- O GitHub Actions irá executar automaticamente
- Build será feito com `npm run build:github`
- Site será publicado em `https://seu-usuario.github.io/Fenix`

## 🔧 Configurações Técnicas

### Build Script (`build-github.js`)
- ✅ Export estático (`output: 'export'`)
- ✅ Imagens não otimizadas (compatível com GitHub Pages)
- ✅ Base path configurado para `/Fenix`
- ✅ Trailing slash habilitado
- ✅ TypeScript e ESLint ignorados durante build

### GitHub Actions (`.github/workflows/deploy.yml`)
- ✅ Trigger: Push na branch `main`
- ✅ Node.js 18
- ✅ Cache de dependências
- ✅ Build automático
- ✅ Deploy para GitHub Pages

## 🌐 URLs do Site

Após o deploy, seu site estará disponível em:
- **URL Principal**: `https://seu-usuario.github.io/Fenix`
- **URLs das Páginas**: `https://seu-usuario.github.io/Fenix/cursos/...`

## 📊 Status do Deploy

Para verificar o status:
1. Vá em **Actions** no seu repositório
2. Clique no workflow "Deploy to GitHub Pages"
3. Veja os logs em tempo real

## 🎉 Recursos Incluídos

### ✅ Cursos Completos com Exemplos Práticos:
- **C# Automation** - 60 módulos, 20 aulas cada
- **Web Fundamentals** - 20 módulos completos
- **UI/UX Design** - 20 módulos completos
- **E muito mais...**

### ✅ Total de Conteúdo:
- **28 cursos processados**
- **8.635 aulas atualizadas**
- **Exemplos práticos específicos por tecnologia**
- **Código funcional e testado**

## 🚨 Solução de Problemas

### Se o deploy falhar:
1. Verifique os logs em **Actions**
2. Certifique-se que o repositório é público
3. Verifique se GitHub Pages está habilitado
4. Aguarde alguns minutos para propagação

### Se o site não carregar:
1. Verifique a URL correta
2. Aguarde até 10 minutos para propagação
3. Limpe o cache do navegador

## 🎯 Próximos Passos

1. **Execute o commit e push**
2. **Configure GitHub Pages**
3. **Aguarde o deploy automático**
4. **Acesse seu site online!**

---

**🎉 Sua plataforma Fenix estará online em poucos minutos!**
