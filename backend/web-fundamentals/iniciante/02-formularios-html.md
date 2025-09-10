# 📝 Aula 2: Formulários HTML
## Web Fundamentals - Nível Iniciante

⏱️ **Duração**: 50 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Criar formulários HTML funcionais
- ✅ Implementar diferentes tipos de input
- ✅ Aplicar validação básica
- ✅ Entender métodos de envio
- ✅ Criar formulários responsivos

---

## 📚 Conteúdo Principal

### 1. 🌟 O que são Formulários HTML?
Formulários são elementos que permitem aos usuários inserir e enviar dados para um servidor. São essenciais para interação em sites.

**Casos de uso comuns:**
- Login e registro
- Contato e feedback
- Pesquisas e enquetes
- E-commerce e pagamentos
- Upload de arquivos

### 2. 🏗️ Estrutura Básica de um Formulário

```html
<form action="/processar" method="POST">
    <!-- Campos do formulário aqui -->
    <button type="submit">Enviar</button>
</form>
```

**Atributos principais:**
- `action`: URL para onde os dados serão enviados
- `method`: Método HTTP (GET ou POST)
- `enctype`: Tipo de codificação dos dados

### 3. 🎯 Tipos de Input

#### **Inputs de Texto**
```html
<!-- Campo de texto simples -->
<input type="text" name="nome" placeholder="Digite seu nome">

<!-- Campo de email -->
<input type="email" name="email" required>

<!-- Campo de senha -->
<input type="password" name="senha" minlength="6">

<!-- Campo de número -->
<input type="number" name="idade" min="18" max="100">

<!-- Campo de telefone -->
<input type="tel" name="telefone" pattern="[0-9]{11}">
```

#### **Inputs de Seleção**
```html
<!-- Checkbox -->
<input type="checkbox" name="termos" id="termos">
<label for="termos">Aceito os termos</label>

<!-- Radio buttons -->
<input type="radio" name="genero" value="masculino" id="masc">
<label for="masc">Masculino</label>
<input type="radio" name="genero" value="feminino" id="fem">
<label for="fem">Feminino</label>

<!-- Select dropdown -->
<select name="cidade">
    <option value="">Selecione uma cidade</option>
    <option value="sp">São Paulo</option>
    <option value="rj">Rio de Janeiro</option>
    <option value="bh">Belo Horizonte</option>
</select>
```

#### **Inputs Especiais**
```html
<!-- Data -->
<input type="date" name="nascimento">

<!-- Hora -->
<input type="time" name="horario">

<!-- Cor -->
<input type="color" name="cor_favorita">

<!-- Arquivo -->
<input type="file" name="documento" accept=".pdf,.doc">

<!-- Range -->
<input type="range" name="satisfacao" min="1" max="10">
```

### 4. 🏷️ Labels e Acessibilidade

```html
<!-- Label associado por ID -->
<label for="nome">Nome completo:</label>
<input type="text" id="nome" name="nome">

<!-- Label envolvendo o input -->
<label>
    <input type="checkbox" name="newsletter">
    Receber newsletter
</label>
```

### 5. ✅ Validação HTML5

```html
<!-- Campos obrigatórios -->
<input type="text" name="nome" required>

<!-- Validação de email -->
<input type="email" name="email" required>

<!-- Comprimento mínimo -->
<input type="password" name="senha" minlength="8" required>

<!-- Padrão regex -->
<input type="text" name="cep" pattern="[0-9]{5}-[0-9]{3}" placeholder="00000-000">
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Formulário de Cadastro**
Crie um formulário de cadastro com:
- Nome completo
- Email
- Senha e confirmação
- Data de nascimento
- Aceite dos termos

### **Exercício 2: Formulário de Contato**
Desenvolva um formulário de contato com:
- Nome
- Email
- Assunto (dropdown)
- Mensagem (textarea)
- Botão de envio

### **Exercício 3: Formulário de Pesquisa**
Construa um formulário de pesquisa com:
- Campo de busca
- Filtros por categoria
- Filtros por preço (range)
- Ordenação por relevância

### **Exercício 4: Formulário de Upload**
Crie um formulário para upload com:
- Seleção de arquivo
- Descrição do arquivo
- Categoria
- Tags relacionadas

---

## 💡 Dicas Importantes

1. **Acessibilidade**: Sempre use labels associados aos inputs
2. **Validação**: Combine validação HTML5 com JavaScript
3. **Responsividade**: Teste em diferentes dispositivos
4. **UX**: Forneça feedback visual claro para o usuário

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- CSS básico e estilização
- Layouts responsivos
- Flexbox e Grid
- Animações CSS

---

## 📝 Checklist de Conclusão

- [ ] Entendeu a estrutura de formulários HTML
- [ ] Implementou diferentes tipos de input
- [ ] Aplicou validação HTML5
- [ ] Criou formulários acessíveis
- [ ] Completou os 4 exercícios

**🎉 Parabéns! Você completou a Aula 2 com sucesso!**

---

*Próxima aula: Introdução ao CSS e Estilização*
