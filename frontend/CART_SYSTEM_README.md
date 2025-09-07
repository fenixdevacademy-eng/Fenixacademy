# 🛒 Sistema de Carrinho de Compras - Fenix Academy

## 📋 Visão Geral

Sistema completo de carrinho de compras para a Fenix Academy, permitindo que usuários adicionem múltiplos cursos ao carrinho, visualizem resumos, apliquem descontos e finalizem compras.

## 🚀 Funcionalidades

### ✅ **Funcionalidades Principais**
- **Adicionar cursos** ao carrinho (sem duplicatas)
- **Remover cursos** individualmente
- **Limpar carrinho** completamente
- **Persistência local** (localStorage)
- **Cálculo automático** de totais
- **Sistema de descontos** progressivos
- **Interface responsiva** e moderna

### 🎯 **Sistema de Descontos**
- **1 curso**: Preço normal
- **2 cursos**: 10% de desconto
- **3+ cursos**: 20% de desconto

### 💾 **Persistência de Dados**
- Carrinho salvo automaticamente no localStorage
- Recuperação automática ao recarregar a página
- Sincronização em tempo real

## 🏗️ Arquitetura

### 📁 **Estrutura de Arquivos**
```
frontend/
├── contexts/
│   └── CartContext.tsx          # Contexto React do carrinho
├── components/
│   ├── Cart.tsx                 # Componente principal do carrinho
│   ├── CartButton.tsx           # Botão do carrinho no header
│   ├── AddToCartButton.tsx      # Botão para adicionar ao carrinho
│   └── CourseCard.tsx           # Card de curso com botão de compra
└── app/
    └── cart-demo/
        └── page.tsx             # Página de demonstração
```

### 🔧 **Tecnologias Utilizadas**
- **React 18** com hooks modernos
- **TypeScript** para tipagem segura
- **useReducer** para gerenciamento de estado complexo
- **Context API** para compartilhamento global
- **Tailwind CSS** para estilização
- **Lucide React** para ícones

## 📱 Componentes

### 1. **CartContext** (`contexts/CartContext.tsx`)
**Responsabilidade**: Gerenciamento global do estado do carrinho

**Funcionalidades**:
- Estado centralizado do carrinho
- Funções para manipular itens
- Cálculo automático de descontos
- Persistência no localStorage

**Hook**: `useCart()`

### 2. **Cart** (`components/Cart.tsx`)
**Responsabilidade**: Interface principal do carrinho

**Funcionalidades**:
- Modal lateral responsivo
- Lista de itens com thumbnails
- Resumo de preços e descontos
- Botões de ação (finalizar, limpar)

### 3. **CartButton** (`components/CartButton.tsx`)
**Responsabilidade**: Botão do carrinho no header

**Funcionalidades**:
- Badge com quantidade de itens
- Abertura do carrinho
- Design responsivo

### 4. **AddToCartButton** (`components/AddToCartButton.tsx`)
**Responsabilidade**: Botão para adicionar cursos ao carrinho

**Funcionalidades**:
- Estado visual (adicionar/adicionado)
- Prevenção de duplicatas
- Feedback visual imediato

### 5. **CourseCard** (`components/CourseCard.tsx`)
**Responsabilidade**: Card completo de curso

**Funcionalidades**:
- Informações detalhadas do curso
- Botão integrado de adicionar ao carrinho
- Design atrativo e responsivo

## 🎮 Como Usar

### 1. **Configuração Básica**
```tsx
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      {/* Seu app aqui */}
    </CartProvider>
  );
}
```

### 2. **Adicionar Botão do Carrinho no Header**
```tsx
import CartButton from './components/CartButton';

function Header() {
  return (
    <header>
      <CartButton />
    </header>
  );
}
```

### 3. **Usar Botão de Adicionar ao Carrinho**
```tsx
import AddToCartButton from './components/AddToCartButton';

function CourseComponent({ course }) {
  return (
    <AddToCartButton course={course} />
  );
}
```

### 4. **Exibir o Carrinho**
```tsx
import Cart from './components/Cart';

function Layout() {
  return (
    <div>
      {/* Seu conteúdo */}
      <Cart />
    </div>
  );
}
```

## 🔌 API do Contexto

### **Estado** (`state`)
```typescript
interface CartState {
  items: CartItem[];        // Lista de cursos no carrinho
  total: number;            // Soma total dos preços
  itemCount: number;        // Quantidade de cursos
  isOpen: boolean;          // Se o carrinho está aberto
}
```

### **Funções** (`actions`)
```typescript
interface CartContextType {
  addItem: (item: CartItem) => void;           // Adiciona curso
  removeItem: (id: string) => void;            // Remove curso
  clearCart: () => void;                       // Limpa carrinho
  toggleCart: () => void;                      // Abre/fecha carrinho
  closeCart: () => void;                       // Fecha carrinho
  isInCart: (id: string) => boolean;           // Verifica se está no carrinho
  getDiscount: () => DiscountInfo;             // Calcula desconto
}
```

### **Hook Personalizado**
```typescript
const { 
  state, 
  addItem, 
  removeItem, 
  clearCart, 
  toggleCart 
} = useCart();
```

## 🎨 Personalização

### **Cores e Estilos**
- Edite as classes Tailwind nos componentes
- Personalize o tema no `tailwind.config.js`
- Modifique as variáveis CSS para cores personalizadas

### **Layout e Posicionamento**
- Ajuste o posicionamento do carrinho no `Cart.tsx`
- Modifique o tamanho máximo no `max-w-md`
- Personalize a animação de entrada/saída

### **Funcionalidades**
- Adicione novos tipos de desconto no `getDiscount()`
- Implemente cupons de desconto
- Adicione validações personalizadas

## 🚀 Integração com Gateway de Pagamento

### **Implementação do Checkout**
```typescript
// Em Cart.tsx, função handleCheckout
const handleCheckout = async () => {
  try {
    // 1. Validar carrinho
    if (state.items.length === 0) return;
    
    // 2. Preparar dados para pagamento
    const checkoutData = {
      items: state.items,
      total: finalTotal,
      discount: amount,
      customer: getCurrentCustomer(), // Implementar
    };
    
    // 3. Redirecionar para gateway
    const response = await createCheckoutSession(checkoutData);
    window.location.href = response.checkoutUrl;
    
  } catch (error) {
    console.error('Erro no checkout:', error);
  }
};
```

### **Gateways Recomendados**
- **Stripe**: Para pagamentos internacionais
- **Mercado Pago**: Para mercado brasileiro
- **PagSeguro**: Alternativa brasileira
- **PayPal**: Para pagamentos globais

## 📱 Responsividade

### **Breakpoints**
- **Mobile**: Carrinho ocupa tela inteira
- **Tablet**: Carrinho lateral com largura média
- **Desktop**: Carrinho lateral com largura fixa

### **Adaptações**
- Botões se adaptam ao tamanho da tela
- Grid de cursos responsivo
- Texto e espaçamentos otimizados

## 🧪 Testes

### **Testes Recomendados**
```typescript
// Teste de adicionar item
test('should add course to cart', () => {
  const { addItem, state } = useCart();
  addItem(mockCourse);
  expect(state.items).toHaveLength(1);
});

// Teste de desconto
test('should apply 20% discount for 3+ courses', () => {
  const { addItem, getDiscount } = useCart();
  addItem(mockCourse1);
  addItem(mockCourse2);
  addItem(mockCourse3);
  
  const discount = getDiscount();
  expect(discount.percentage).toBe(20);
});
```

## 🚀 Deploy e Performance

### **Otimizações**
- Lazy loading dos componentes
- Debounce nas operações de localStorage
- Memoização de cálculos pesados

### **Monitoramento**
- Analytics de conversão
- Tracking de abandono de carrinho
- Métricas de performance

## 📞 Suporte

### **Problemas Comuns**
1. **Carrinho não persiste**: Verificar localStorage
2. **Descontos não aplicam**: Verificar função getDiscount
3. **Erro de tipagem**: Verificar interfaces TypeScript

### **Debug**
```typescript
// Adicione logs para debug
console.log('Cart State:', state);
console.log('Cart Items:', state.items);
console.log('Discount:', getDiscount());
```

## 🎯 Próximos Passos

### **Melhorias Futuras**
- [ ] Sistema de cupons
- [ ] Carrinho compartilhado entre dispositivos
- [ ] Wishlist de cursos
- [ ] Comparação de cursos
- [ ] Sistema de avaliações
- [ ] Integração com analytics

---

**🎉 Sistema de Carrinho Completo e Funcional!**

O carrinho da Fenix Academy está pronto para converter visitantes em alunos, com uma experiência de compra fluida e profissional que reflete a qualidade dos cursos CS50!
