
## 🎯 Objetivos de Aprendizado
- ✅ Dominar Flexbox para layouts flexíveis
- ✅ Implementar CSS Grid para layouts complexos
- ✅ Criar animações e transições suaves
- ✅ Desenvolver design responsivo

## 📚 Conteúdo Principal

### 1. 🌟 CSS3 Moderno
CSS3 traz recursos avançados que revolucionaram o desenvolvimento frontend, incluindo Flexbox, Grid e animações.

### 2. 🎯 Flexbox (Flexible Box Layout)
```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}

.item {
    flex: 1;
    min-width: 200px;
    padding: 20px;
    background: #f0f0f0;
    border-radius: 8px;
}
```

### 3. 🏗️ CSS Grid
```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: auto;
    gap: 20px;
    padding: 20px;
}

.grid-item {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
```

### 4. ✨ Animações e Transições
```css
.button {
    background: #007bff;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.button:hover {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate {
    animation: fadeIn 0.6s ease-out;
}
```

## 🧪 Exercícios Práticos

### Exercício 1: Layout Flexbox
Crie um layout de blog usando Flexbox com:
- Header fixo
- Sidebar lateral
- Conteúdo principal
- Footer responsivo

### Exercício 2: Grid Gallery
Desenvolva uma galeria de imagens usando CSS Grid com:
- Layout responsivo
- Diferentes tamanhos de imagem
- Hover effects
- Animações de entrada

### Exercício 3: Dashboard Responsivo
Crie um dashboard usando Flexbox e Grid com:
- Cards de estatísticas
- Gráficos responsivos
- Menu lateral colapsável
- Animações de transição

## 🚀 Próximos Passos
Na próxima aula, você aprenderá JavaScript Básico para adicionar interatividade.

## 📝 Checklist de Conclusão
- [ ] Dominou Flexbox
- [ ] Implementou CSS Grid
- [ ] Criou animações
- [ ] Desenvolveu responsividade
- [ ] Completou todos os exercícios

**🎉 Parabéns! Você dominou o CSS3 Moderno!**
