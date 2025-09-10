# ⏳ Aula 3: Promises e Async/Await
## Web Fundamentals - Nível Avançado

⏱️ **Duração**: 80 min  
🎯 **Objetivos**: 6  
🧪 **Exercícios**: 5  

---

## 🎯 Objetivos de Aprendizado
- ✅ Dominar Promises
- ✅ Implementar Async/Await
- ✅ Tratar erros assíncronos
- ✅ Criar operações paralelas
- ✅ Implementar retry logic
- ✅ Otimizar performance

---

## 📚 Conteúdo Principal

### 1. 🌟 Promises
```javascript
const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        if (id > 0) {
            resolve({ id, name: 'Usuário' });
        } else {
            reject(new Error('ID inválido'));
        }
    });
};
```

---

## 🧪 Exercícios Práticos
- Sistema de cache
- Upload de múltiplos arquivos
- Operações em lote
- Sistema de filas
- API com retry

---

*Próxima aula: Classes e Herança*
