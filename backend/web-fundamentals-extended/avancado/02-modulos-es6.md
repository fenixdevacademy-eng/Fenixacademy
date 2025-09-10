# 📦 Aula 2: Módulos ES6
## Web Fundamentals - Nível Avançado

⏱️ **Duração**: 60 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Trabalhar com módulos ES6
- ✅ Organizar código em arquivos
- ✅ Implementar import/export
- ✅ Criar bibliotecas reutilizáveis
- ✅ Otimizar carregamento

---

## 📚 Conteúdo Principal

### 1. 🌟 Export/Import
```javascript
// math.js
export const add = (a, b) => a + b;
export default function divide(a, b) { return a / b; }

// main.js
import { add } from './math.js';
import divide from './math.js';
```

---

## 🧪 Exercícios Práticos
- Sistema de módulos
- Biblioteca de utilitários
- Plugin system
- Lazy loading

---

*Próxima aula: Promises e Async/Await*
