# Aula 1: E-commerce Completo

## Objetivos da Aula
- Desenvolver um e-commerce completo com funcionalidades avançadas
- Implementar carrinho de compras, checkout e pagamento
- Integrar APIs de terceiros para produtos e pagamentos
- Aplicar conceitos de segurança e performance

## Estrutura do Projeto

### 1. Frontend (React + TypeScript)
```typescript
// src/components/ProductCard.tsx
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">R$ {product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
};
```

### 2. Carrinho de Compras
```typescript
// src/hooks/useCart.ts
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return { cart, addToCart, removeFromCart, updateQuantity, total };
};
```

### 3. Checkout e Pagamento
```typescript
// src/components/Checkout.tsx
const Checkout: React.FC = () => {
  const { cart, total } = useCart();
  const [customer, setCustomer] = useState<Customer>({});
  const [payment, setPayment] = useState<Payment>({});
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const order = {
        items: cart,
        customer,
        payment,
        total,
        status: 'pending'
      };
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      
      if (response.ok) {
        // Redirecionar para página de sucesso
        router.push('/success');
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="customer-info">
        <h3>Informações do Cliente</h3>
        <input
          type="text"
          placeholder="Nome completo"
          value={customer.name}
          onChange={(e) => setCustomer({...customer, name: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={customer.email}
          onChange={(e) => setCustomer({...customer, email: e.target.value})}
          required
        />
      </div>
      
      <div className="payment-info">
        <h3>Pagamento</h3>
        <select
          value={payment.method}
          onChange={(e) => setPayment({...payment, method: e.target.value})}
          required
        >
          <option value="">Selecione o método</option>
          <option value="credit">Cartão de Crédito</option>
          <option value="debit">Cartão de Débito</option>
          <option value="pix">PIX</option>
        </select>
      </div>
      
      <div className="order-summary">
        <h3>Resumo do Pedido</h3>
        {cart.map(item => (
          <div key={item.id} className="order-item">
            <span>{item.name}</span>
            <span>R$ {item.price.toFixed(2)}</span>
          </div>
        ))}
        <div className="total">
          <strong>Total: R$ {total.toFixed(2)}</strong>
        </div>
      </div>
      
      <button type="submit" className="checkout-btn">
        Finalizar Compra
      </button>
    </form>
  );
};
```

## Backend (Node.js + Express)

### 1. API de Produtos
```javascript
// routes/products.js
router.get('/products', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 2. API de Pedidos
```javascript
// routes/orders.js
router.post('/orders', async (req, res) => {
  try {
    const { items, customer, payment, total } = req.body;
    
    // Validar dados
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }
    
    // Criar pedido
    const order = new Order({
      items,
      customer,
      payment,
      total,
      status: 'pending',
      createdAt: new Date()
    });
    
    await order.save();
    
    // Processar pagamento (simulado)
    const paymentResult = await processPayment(payment, total);
    
    if (paymentResult.success) {
      order.status = 'paid';
      await order.save();
      
      // Enviar email de confirmação
      await sendOrderConfirmation(customer.email, order);
      
      res.json({ 
        success: true, 
        orderId: order._id,
        message: 'Pedido realizado com sucesso!'
      });
    } else {
      order.status = 'failed';
      await order.save();
      
      res.status(400).json({ 
        error: 'Falha no pagamento',
        details: paymentResult.error
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Funcionalidades Avançadas

### 1. Busca e Filtros
```typescript
// src/components/ProductFilters.tsx
const ProductFilters: React.FC = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    search: ''
  });
  
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={filters.search}
        onChange={(e) => handleFilterChange('search', e.target.value)}
      />
      
      <select
        value={filters.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="">Todas as categorias</option>
        <option value="electronics">Eletrônicos</option>
        <option value="clothing">Roupas</option>
        <option value="books">Livros</option>
      </select>
      
      <div className="price-range">
        <label>Faixa de preço: R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
        />
      </div>
    </div>
  );
};
```

### 2. Sistema de Avaliações
```typescript
// src/components/ProductReviews.tsx
const ProductReviews: React.FC<{ productId: string }> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Partial<Review>>({});
  
  const submitReview = async () => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      
      if (response.ok) {
        const review = await response.json();
        setReviews(prev => [...prev, review]);
        setNewReview({});
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };
  
  return (
    <div className="reviews">
      <h3>Avaliações</h3>
      
      {reviews.map(review => (
        <div key={review.id} className="review">
          <div className="review-header">
            <span className="author">{review.author}</span>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
                  ⭐
                </span>
              ))}
            </div>
          </div>
          <p className="review-text">{review.text}</p>
        </div>
      ))}
      
      <div className="new-review">
        <h4>Deixe sua avaliação</h4>
        <textarea
          placeholder="Compartilhe sua experiência..."
          value={newReview.text}
          onChange={(e) => setNewReview({...newReview, text: e.target.value})}
        />
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              onClick={() => setNewReview({...newReview, rating})}
              className={newReview.rating === rating ? 'selected' : ''}
            >
              ⭐
            </button>
          ))}
        </div>
        <button onClick={submitReview}>Enviar Avaliação</button>
      </div>
    </div>
  );
};
```

## Segurança e Performance

### 1. Validação de Dados
```javascript
// middleware/validation.js
const validateOrder = (req, res, next) => {
  const { items, customer, payment, total } = req.body;
  
  // Validar itens
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Carrinho inválido' });
  }
  
  // Validar cliente
  if (!customer.name || !customer.email) {
    return res.status(400).json({ error: 'Dados do cliente incompletos' });
  }
  
  // Validar pagamento
  if (!payment.method) {
    return res.status(400).json({ error: 'Método de pagamento não selecionado' });
  }
  
  // Validar total
  if (typeof total !== 'number' || total <= 0) {
    return res.status(400).json({ error: 'Total inválido' });
  }
  
  next();
};
```

### 2. Cache e Otimização
```javascript
// middleware/cache.js
const cache = require('memory-cache');

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = cache.get(key);
    
    if (cachedBody) {
      res.json(cachedBody);
      return;
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    
    next();
  };
};

// Usar cache para produtos
router.get('/products', cacheMiddleware(300), getProducts);
```

## Testes

### 1. Testes de Componente
```typescript
// src/components/__tests__/ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

const mockProduct = {
  id: '1',
  name: 'Produto Teste',
  price: 99.99,
  image: 'test.jpg',
  description: 'Descrição teste',
  category: 'test'
};

test('renders product information', () => {
  render(<ProductCard product={mockProduct} />);
  
  expect(screen.getByText('Produto Teste')).toBeInTheDocument();
  expect(screen.getByText('R$ 99.99')).toBeInTheDocument();
});

test('calls addToCart when button is clicked', () => {
  const mockAddToCart = jest.fn();
  render(<ProductCard product={mockProduct} />);
  
  fireEvent.click(screen.getByText('Adicionar ao Carrinho'));
  expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
});
```

### 2. Testes de API
```javascript
// tests/api/orders.test.js
const request = require('supertest');
const app = require('../../app');

describe('POST /api/orders', () => {
  test('should create a new order', async () => {
    const orderData = {
      items: [{ id: '1', name: 'Produto', price: 99.99, quantity: 1 }],
      customer: { name: 'João', email: 'joao@test.com' },
      payment: { method: 'credit' },
      total: 99.99
    };
    
    const response = await request(app)
      .post('/api/orders')
      .send(orderData)
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.orderId).toBeDefined();
  });
  
  test('should reject empty cart', async () => {
    const orderData = {
      items: [],
      customer: { name: 'João', email: 'joao@test.com' },
      payment: { method: 'credit' },
      total: 0
    };
    
    const response = await request(app)
      .post('/api/orders')
      .send(orderData)
      .expect(400);
    
    expect(response.body.error).toBe('Carrinho vazio');
  });
});
```

## Deploy e Produção

### 1. Docker
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy E-commerce

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Deploy logic here
```

## Exercícios Práticos

### 1. Implementar Carrinho Persistente
- Salvar carrinho no localStorage
- Sincronizar entre abas do navegador
- Recuperar carrinho após login

### 2. Sistema de Descontos
- Cupons de desconto
- Descontos por quantidade
- Promoções sazonais

### 3. Recomendações de Produtos
- Baseado no histórico de compras
- Produtos relacionados
- Algoritmo de recomendação

## Próximos Passos

1. **Aula 2**: Sistema de Usuários e Autenticação
2. **Aula 3**: Dashboard Administrativo
3. **Aula 4**: Integração com APIs de Pagamento
4. **Aula 5**: Sistema de Notificações
5. **Aula 6**: Analytics e Relatórios

## Recursos Adicionais

- [Stripe API](https://stripe.com/docs/api)
- [Mercado Pago API](https://www.mercadopago.com.br/developers)
- [React Query](https://react-query.tanstack.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

**Tempo estimado**: 4-6 horas
**Dificuldade**: Avançado
**Pré-requisitos**: Módulos 1-7 completos







