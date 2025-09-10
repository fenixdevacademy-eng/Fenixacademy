# 🛒 Configuração de Pagamento e Pixel Tracking - Fenix Academy

## 📋 Visão Geral

Este documento descreve como configurar o sistema completo de pagamento e pixel tracking para a Fenix Academy.

## 🚀 Funcionalidades Implementadas

### 💳 Sistema de Pagamento
- **Stripe** - Cartões de crédito/débito
- **PIX** - Pagamento instantâneo
- **Boleto** - Pagamento bancário
- **PayPal** - Pagamento internacional
- **Carrinho de compras** - Gerenciamento de itens
- **Checkout responsivo** - Interface mobile-first

### 📊 Pixel Tracking
- **Facebook Pixel** - Rastreamento de conversões
- **Google Analytics** - Métricas de comportamento
- **TikTok Pixel** - Análise de campanhas
- **LinkedIn Pixel** - B2B tracking
- **Twitter Pixel** - Social media tracking

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na pasta `frontend/` com as seguintes variáveis:

```bash
# Payment Providers
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PagSeguro
PAGSEGURO_EMAIL=seu-email@exemplo.com
PAGSEGURO_TOKEN=seu-token-pagseguro
PAGSEGURO_SANDBOX=true

# Mercado Pago
MERCADOPAGO_PUBLIC_KEY=APP_USR_...
MERCADOPAGO_ACCESS_TOKEN=APP_USR_...

# PayPal
PAYPAL_CLIENT_ID=seu-client-id-paypal
PAYPAL_CLIENT_SECRET=seu-client-secret-paypal
PAYPAL_SANDBOX=true

# Pixel Tracking
FACEBOOK_PIXEL_ID=123456789012345
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
TIKTOK_PIXEL_ID=1234567890123456789
LINKEDIN_PIXEL_ID=1234567
TWITTER_PIXEL_ID=1234567890
```

### 2. Instalação de Dependências

```bash
cd frontend
npm install @stripe/stripe-js stripe @mercadopago/sdk-js lucide-react
```

### 3. Configuração do Stripe

1. Crie uma conta no [Stripe](https://stripe.com)
2. Obtenha suas chaves de API
3. Configure o webhook para `/api/webhooks/stripe`
4. Eventos necessários:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 4. Configuração do PagSeguro

1. Crie uma conta no [PagSeguro](https://pagseguro.uol.com.br)
2. Obtenha seu email e token
3. Configure o ambiente sandbox para testes

### 5. Configuração do Mercado Pago

1. Crie uma conta no [Mercado Pago](https://mercadopago.com.br)
2. Obtenha suas chaves de API
3. Configure as credenciais de produção

### 6. Configuração do PayPal

1. Crie uma conta no [PayPal Developer](https://developer.paypal.com)
2. Obtenha suas credenciais de API
3. Configure o ambiente sandbox para testes

## 📱 Uso dos Componentes

### 1. Carrinho de Compras

```tsx
import { ShoppingCart } from '@/components/ShoppingCart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    <ShoppingCart 
      isOpen={isCartOpen} 
      onClose={() => setIsCartOpen(false)} 
    />
  );
}
```

### 2. Botão de Compra

```tsx
import { CoursePurchaseButton } from '@/components/CoursePurchaseButton';

const course = {
  id: 'web-fundamentals',
  name: 'Web Fundamentals',
  price: 297.00,
  // ... outros dados
};

function CoursePage() {
  return (
    <CoursePurchaseButton 
      course={course}
      variant="primary"
      size="lg"
      showPrice={true}
    />
  );
}
```

### 3. Pixel Tracking

```tsx
import { usePixelTracking } from '@/lib/pixel-tracking';

function MyComponent() {
  const { trackPurchase, trackCourseView } = usePixelTracking();
  
  const handlePurchase = () => {
    trackPurchase('order_123', 297.00, 'BRL', items);
  };
  
  const handleCourseView = () => {
    trackCourseView('Web Fundamentals', 'web-fundamentals');
  };
}
```

## 🎯 Eventos de Tracking

### Eventos Automáticos
- **PageView** - Visualização de página
- **ViewContent** - Visualização de curso
- **AddToCart** - Adição ao carrinho
- **RemoveFromCart** - Remoção do carrinho

### Eventos de Conversão
- **CompleteRegistration** - Inscrição em curso
- **Purchase** - Compra realizada
- **Lead** - Geração de lead

### Eventos Customizados
- **CustomConversion** - Conversões específicas

## 🔒 Segurança

### Validação de Dados
- Validação client-side e server-side
- Sanitização de inputs
- Validação de CPF/CNPJ
- Validação de cartão de crédito

### Proteção de Dados
- Criptografia de dados sensíveis
- HTTPS obrigatório
- Tokens seguros para APIs
- Rate limiting

## 📊 Analytics e Métricas

### Métricas de Conversão
- Taxa de conversão por fonte
- Valor médio do pedido
- Abandono de carrinho
- Tempo até conversão

### Métricas de Comportamento
- Páginas mais visitadas
- Tempo na página
- Taxa de rejeição
- Funil de conversão

## 🚀 Deploy

### 1. Variáveis de Produção
Configure as variáveis de ambiente no seu provedor de hosting.

### 2. Webhooks
Configure os webhooks do Stripe para o domínio de produção.

### 3. SSL
Certifique-se de que o SSL está configurado corretamente.

### 4. Testes
Execute testes completos antes do deploy:
- Teste de pagamento
- Teste de pixel tracking
- Teste de carrinho
- Teste de checkout

## 🐛 Troubleshooting

### Problemas Comuns

1. **Pixel não carrega**
   - Verifique as variáveis de ambiente
   - Confirme que os IDs estão corretos
   - Verifique o console do navegador

2. **Pagamento falha**
   - Verifique as chaves de API
   - Confirme a configuração do webhook
   - Verifique os logs do servidor

3. **Carrinho não persiste**
   - Verifique se o localStorage está habilitado
   - Confirme a implementação do hook useCart

### Logs e Debug

```javascript
// Habilitar logs de debug
localStorage.setItem('debug', 'pixel-tracking,payment-service');

// Verificar eventos de pixel
window.fbq('track', 'PageView');
console.log('Facebook Pixel loaded:', !!window.fbq);
```

## 📞 Suporte

Para dúvidas ou problemas:
- Documentação: [docs.fenixacademy.com.br](https://docs.fenixacademy.com.br)
- Email: suporte@fenixacademy.com.br
- Discord: [discord.gg/fenixacademy](https://discord.gg/fenixacademy)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Fenix Academy** - Transformando vidas através da tecnologia 🚀
