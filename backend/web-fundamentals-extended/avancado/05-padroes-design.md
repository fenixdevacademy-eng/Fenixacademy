# 🎭 Aula 5: Padrões de Design
## Web Fundamentals - Nível Avançado

⏱️ **Duração**: 85 min  
🎯 **Objetivos**: 6  
🧪 **Exercícios**: 5  

---

## 🎯 Objetivos de Aprendizado
- ✅ Implementar Factory Pattern
- ✅ Usar Observer Pattern
- ✅ Aplicar Singleton Pattern
- ✅ Criar Module Pattern
- ✅ Implementar Strategy Pattern
- ✅ Criar sistemas escaláveis

---

## 📚 Conteúdo Principal

### 1. 🌟 Factory Pattern
```javascript
const createUser = (type, data) => {
    switch (type) {
        case 'admin':
            return { ...data, role: 'admin', permissions: ['all'] };
        case 'user':
            return { ...data, role: 'user', permissions: ['read'] };
    }
};
```

---

## 🧪 Exercícios Práticos
- Sistema de plugins
- Event system
- Config manager
- Logger system
- Cache manager

---

*Próxima aula: Testes e Debugging*
