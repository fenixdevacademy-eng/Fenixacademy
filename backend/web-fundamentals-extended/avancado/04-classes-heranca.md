# 🏗️ Aula 4: Classes e Herança
## Web Fundamentals - Nível Avançado

⏱️ **Duração**: 70 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Criar classes ES6
- ✅ Implementar herança
- ✅ Usar getters e setters
- ✅ Aplicar polimorfismo
- ✅ Criar classes abstratas

---

## 📚 Conteúdo Principal

### 1. 🌟 Classes ES6
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} faz som`;
    }
}

class Dog extends Animal {
    speak() {
        return `${this.name} late: Au au!`;
    }
}
```

---

## 🧪 Exercícios Práticos
- Sistema de formas geométricas
- Gerenciador de usuários
- Sistema de pagamentos
- Biblioteca de componentes

---

*Próxima aula: Padrões de Design*
