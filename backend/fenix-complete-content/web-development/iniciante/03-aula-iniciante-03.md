
## 🎯 Objetivos de Aprendizado
- ✅ Manipular o DOM dinamicamente
- ✅ Gerenciar eventos de usuário
- ✅ Trabalhar com arrays e objetos
- ✅ Criar funções reutilizáveis

## 📚 Conteúdo Principal

### 1. 🌟 JavaScript Básico
JavaScript é a linguagem de programação que torna as páginas web interativas e dinâmicas.

### 2. 🎯 Manipulação do DOM
```javascript
// Selecionar elementos
const title = document.getElementById('title');
const buttons = document.querySelectorAll('.btn');
const container = document.querySelector('.container');

// Modificar conteúdo
title.textContent = 'Novo Título';
title.innerHTML = '<span>Texto com HTML</span>';

// Adicionar/remover classes
title.classList.add('highlight');
title.classList.remove('old-class');
title.classList.toggle('active');
```

### 3. 🎮 Gerenciamento de Eventos
```javascript
// Event listener básico
const button = document.querySelector('#submit-btn');
button.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Botão clicado!');
    submitForm();
});

// Event delegation
document.addEventListener('click', function(event) {
    if (event.target.matches('.delete-btn')) {
        deleteItem(event.target.dataset.id);
    }
});
```

### 4. 📊 Arrays e Objetos
```javascript
// Arrays
const fruits = ['maçã', 'banana', 'laranja'];
fruits.push('uva');
fruits.pop();
fruits.forEach(fruit => console.log(fruit));

// Objetos
const user = {
    name: 'João',
    email: 'joao@email.com',
    age: 25
};

console.log(user.name);
user.city = 'São Paulo';
```

### 5. 🔧 Funções
```javascript
// Função tradicional
function greet(name) {
    return `Olá, ${name}!`;
}

// Arrow function
const multiply = (a, b) => a * b;

// Função com parâmetros padrão
const createUser = (name, email, age = 18) => {
    return { name, email, age };
};
```

## 🧪 Exercícios Práticos

### Exercício 1: Todo List
Crie uma lista de tarefas com:
- Adicionar tarefas
- Marcar como concluída
- Remover tarefas
- Salvar no localStorage

### Exercício 2: Calculadora
Desenvolva uma calculadora com:
- Operações básicas
- Interface responsiva
- Histórico de operações
- Validação de entrada

### Exercício 3: Quiz Interativo
Crie um quiz com:
- Múltiplas perguntas
- Sistema de pontuação
- Feedback imediato
- Resultado final

## 🚀 Próximos Passos
Na próxima aula, você aprenderá Design Responsivo para criar sites mobile-first.

## 📝 Checklist de Conclusão
- [ ] Manipulou o DOM
- [ ] Gerenciou eventos
- [ ] Trabalhou com arrays/objetos
- [ ] Criou funções
- [ ] Completou todos os exercícios

**🎉 Parabéns! Você dominou o JavaScript Básico!**
