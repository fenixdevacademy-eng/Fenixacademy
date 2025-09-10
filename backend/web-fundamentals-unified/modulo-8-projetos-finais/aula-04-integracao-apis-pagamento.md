# Aula 4: Integração com APIs de Pagamento

## Objetivos da Aula
- Integrar múltiplas APIs de pagamento (Stripe, Mercado Pago, PayPal)
- Implementar sistema de webhooks para confirmação de pagamentos
- Criar sistema de reembolsos e cancelamentos
- Desenvolver interface de checkout segura

## Estrutura do Sistema de Pagamento

### 1. Configuração de APIs
```typescript
// src/config/payment.ts
export const paymentConfig = {
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  },
  mercadoPago: {
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    publicKey: process.env.MERCADO_PAGO_PUBLIC_KEY,
    webhookSecret: process.env.MERCADO_PAGO_WEBHOOK_SECRET
  },
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    environment: process.env.PAYPAL_ENVIRONMENT || 'sandbox'
  }
};
```

### 2. Interface de Pagamento
```typescript
// src/types/Payment.ts
interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'pix' | 'boleto' | 'paypal';
  provider: 'stripe' | 'mercadopago' | 'paypal';
  name: string;
  icon: string;
  enabled: boolean;
}

interface PaymentData {
  amount: number;
  currency: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    document: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
}
```

## Integração com Stripe

### 1. Serviço Stripe
```typescript
// src/services/stripeService.ts
import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(paymentConfig.stripe.secretKey, {
      apiVersion: '2023-10-16'
    });
  }

  async createPaymentIntent(paymentData: PaymentData): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(paymentData.amount * 100), // Stripe usa centavos
        currency: paymentData.currency.toLowerCase(),
        metadata: {
          orderId: paymentData.orderId,
          customerEmail: paymentData.customer.email
        },
        customer: await this.getOrCreateCustomer(paymentData.customer),
        shipping: {
          name: paymentData.customer.name,
          address: {
            line1: paymentData.billingAddress.street,
            city: paymentData.billingAddress.city,
            state: paymentData.billingAddress.state,
            postal_code: paymentData.billingAddress.zipCode,
            country: paymentData.billingAddress.country
          }
        }
      });

      return {
        success: true,
        transactionId: paymentIntent.id,
        status: 'pending'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      
      return {
        success: paymentIntent.status === 'succeeded',
        transactionId: paymentIntent.id,
        status: paymentIntent.status === 'succeeded' ? 'paid' : 'failed'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }

  async refundPayment(paymentIntentId: string, amount?: number): Promise<PaymentResult> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined
      });

      return {
        success: refund.status === 'succeeded',
        transactionId: refund.id,
        status: refund.status === 'succeeded' ? 'paid' : 'failed'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }

  private async getOrCreateCustomer(customer: any): Promise<string> {
    try {
      // Buscar cliente existente
      const customers = await this.stripe.customers.list({
        email: customer.email,
        limit: 1
      });

      if (customers.data.length > 0) {
        return customers.data[0].id;
      }

      // Criar novo cliente
      const newCustomer = await this.stripe.customers.create({
        email: customer.email,
        name: customer.name,
        metadata: {
          document: customer.document
        }
      });

      return newCustomer.id;
    } catch (error) {
      throw new Error('Erro ao criar/buscar cliente: ' + error.message);
    }
  }

  async handleWebhook(payload: string, signature: string): Promise<void> {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        paymentConfig.stripe.webhookSecret
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object);
          break;
        case 'charge.dispute.created':
          await this.handleDispute(event.data.object);
          break;
      }
    } catch (error) {
      throw new Error('Webhook inválido: ' + error.message);
    }
  }

  private async handlePaymentSuccess(paymentIntent: any): Promise<void> {
    const orderId = paymentIntent.metadata.orderId;
    await Order.findByIdAndUpdate(orderId, {
      status: 'paid',
      paymentStatus: 'completed',
      paymentMethod: 'stripe',
      transactionId: paymentIntent.id
    });
  }

  private async handlePaymentFailure(paymentIntent: any): Promise<void> {
    const orderId = paymentIntent.metadata.orderId;
    await Order.findByIdAndUpdate(orderId, {
      status: 'failed',
      paymentStatus: 'failed',
      paymentMethod: 'stripe',
      transactionId: paymentIntent.id
    });
  }

  private async handleDispute(charge: any): Promise<void> {
    // Implementar lógica de disputa
    console.log('Disputa criada:', charge.id);
  }
}
```

### 2. Componente de Checkout Stripe
```typescript
// src/components/checkout/StripeCheckout.tsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(paymentConfig.stripe.publicKey);

const CheckoutForm: React.FC<{ orderData: any }> = ({ orderData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      // Criar Payment Intent
      const response = await fetch('/api/payments/stripe/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const { clientSecret } = await response.json();

      // Confirmar pagamento
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: orderData.customer.name,
            email: orderData.customer.email
          }
        }
      });

      if (result.error) {
        setError(result.error.message || 'Erro no pagamento');
      } else {
        // Pagamento bem-sucedido
        window.location.href = '/success';
      }
    } catch (error) {
      setError('Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-checkout">
      <div className="card-element-container">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4'
                }
              }
            }
          }}
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="pay-button"
      >
        {loading ? 'Processando...' : `Pagar R$ ${orderData.amount.toFixed(2)}`}
      </button>
    </form>
  );
};

const StripeCheckout: React.FC<{ orderData: any }> = ({ orderData }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderData={orderData} />
    </Elements>
  );
};

export default StripeCheckout;
```

## Integração com Mercado Pago

### 1. Serviço Mercado Pago
```typescript
// src/services/mercadoPagoService.ts
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: paymentConfig.mercadoPago.accessToken
    });
  }

  async createPreference(paymentData: PaymentData): Promise<PaymentResult> {
    try {
      const preference = new Preference(this.client);

      const preferenceData = {
        items: [
          {
            title: `Pedido #${paymentData.orderId}`,
            quantity: 1,
            unit_price: paymentData.amount,
            currency_id: paymentData.currency.toUpperCase()
          }
        ],
        payer: {
          name: paymentData.customer.name,
          email: paymentData.customer.email,
          identification: {
            type: 'CPF',
            number: paymentData.customer.document
          }
        },
        back_urls: {
          success: `${process.env.FRONTEND_URL}/success`,
          failure: `${process.env.FRONTEND_URL}/failure`,
          pending: `${process.env.FRONTEND_URL}/pending`
        },
        auto_return: 'approved',
        external_reference: paymentData.orderId,
        notification_url: `${process.env.BACKEND_URL}/api/payments/mercadopago/webhook`
      };

      const result = await preference.create({ body: preferenceData });

      return {
        success: true,
        paymentUrl: result.init_point,
        transactionId: result.id,
        status: 'pending'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }

  async getPayment(paymentId: string): Promise<PaymentResult> {
    try {
      const payment = new Payment(this.client);
      const result = await payment.get({ id: paymentId });

      return {
        success: result.status === 'approved',
        transactionId: result.id,
        status: this.mapStatus(result.status)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<PaymentResult> {
    try {
      const payment = new Payment(this.client);
      const result = await payment.refund({
        id: paymentId,
        body: {
          amount: amount
        }
      });

      return {
        success: result.status === 'approved',
        transactionId: result.id,
        status: this.mapStatus(result.status)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }

  async handleWebhook(data: any): Promise<void> {
    try {
      if (data.type === 'payment') {
        const payment = await this.getPayment(data.data.id);
        
        if (payment.success) {
          const orderId = data.data.external_reference;
          await Order.findByIdAndUpdate(orderId, {
            status: 'paid',
            paymentStatus: 'completed',
            paymentMethod: 'mercadopago',
            transactionId: data.data.id
          });
        }
      }
    } catch (error) {
      throw new Error('Erro no webhook: ' + error.message);
    }
  }

  private mapStatus(status: string): string {
    const statusMap = {
      'approved': 'paid',
      'pending': 'pending',
      'rejected': 'failed',
      'cancelled': 'cancelled'
    };
    return statusMap[status] || 'failed';
  }
}
```

### 2. Componente de Checkout Mercado Pago
```typescript
// src/components/checkout/MercadoPagoCheckout.tsx
import React, { useState } from 'react';

const MercadoPagoCheckout: React.FC<{ orderData: any }> = ({ orderData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/payments/mercadopago/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const { paymentUrl } = await response.json();
      
      if (paymentUrl) {
        // Redirecionar para o Mercado Pago
        window.location.href = paymentUrl;
      } else {
        setError('Erro ao criar preferência de pagamento');
      }
    } catch (error) {
      setError('Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mercadopago-checkout">
      <div className="payment-methods">
        <div className="method-item">
          <img src="/icons/credit-card.svg" alt="Cartão" />
          <span>Cartão de Crédito</span>
        </div>
        <div className="method-item">
          <img src="/icons/pix.svg" alt="PIX" />
          <span>PIX</span>
        </div>
        <div className="method-item">
          <img src="/icons/boleto.svg" alt="Boleto" />
          <span>Boleto</span>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        onClick={handlePayment}
        disabled={loading}
        className="pay-button"
      >
        {loading ? 'Processando...' : `Pagar R$ ${orderData.amount.toFixed(2)}`}
      </button>
    </div>
  );
};

export default MercadoPagoCheckout;
```

## Integração com PayPal

### 1. Serviço PayPal
```typescript
// src/services/paypalService.ts
import { PayPalApi } from '@paypal/checkout-server-sdk';

export class PayPalService {
  private client: PayPalApi;

  constructor() {
    this.client = new PayPalApi({
      clientId: paymentConfig.paypal.clientId,
      clientSecret: paymentConfig.paypal.clientSecret,
      environment: paymentConfig.paypal.environment
    });
  }

  async createOrder(paymentData: PaymentData): Promise<PaymentResult> {
    try {
      const order = await this.client.orders.create({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: paymentData.currency.toUpperCase(),
              value: paymentData.amount.toFixed(2)
            },
            description: `Pedido #${paymentData.orderId}`,
            custom_id: paymentData.orderId
          }
        ],
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/success`,
          cancel_url: `${process.env.FRONTEND_URL}/cancel`
        }
      });

      return {
        success: true,
        transactionId: order.id,
        paymentUrl: order.links.find(link => link.rel === 'approve')?.href,
        status: 'pending'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }

  async captureOrder(orderId: string): Promise<PaymentResult> {
    try {
      const capture = await this.client.orders.capture(orderId);

      return {
        success: capture.status === 'COMPLETED',
        transactionId: capture.id,
        status: capture.status === 'COMPLETED' ? 'paid' : 'failed'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }

  async refundPayment(captureId: string, amount?: number): Promise<PaymentResult> {
    try {
      const refund = await this.client.payments.refund(captureId, {
        amount: {
          currency_code: 'BRL',
          value: amount?.toFixed(2) || '0.00'
        }
      });

      return {
        success: refund.status === 'COMPLETED',
        transactionId: refund.id,
        status: refund.status === 'COMPLETED' ? 'paid' : 'failed'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }
}
```

## Sistema de Webhooks

### 1. Webhook Handler
```typescript
// src/middleware/webhookHandler.ts
import { Request, Response, NextFunction } from 'express';
import { StripeService } from '../services/stripeService';
import { MercadoPagoService } from '../services/mercadoPagoService';

export const handleWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provider = req.params.provider;
    const signature = req.headers['stripe-signature'] || req.headers['x-signature'];
    const payload = JSON.stringify(req.body);

    switch (provider) {
      case 'stripe':
        await new StripeService().handleWebhook(payload, signature as string);
        break;
      case 'mercadopago':
        await new MercadoPagoService().handleWebhook(req.body);
        break;
      default:
        throw new Error('Provedor de pagamento não suportado');
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(400).json({ error: error.message });
  }
};
```

### 2. Rotas de Webhook
```javascript
// routes/payments.js
const express = require('express');
const router = express.Router();

// Webhooks
router.post('/stripe/webhook', handleWebhook);
router.post('/mercadopago/webhook', handleWebhook);

// Stripe
router.post('/stripe/create-intent', async (req, res) => {
  try {
    const stripeService = new StripeService();
    const result = await stripeService.createPaymentIntent(req.body);
    
    if (result.success) {
      res.json({ clientSecret: result.transactionId });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mercado Pago
router.post('/mercadopago/create-preference', async (req, res) => {
  try {
    const mercadoPagoService = new MercadoPagoService();
    const result = await mercadoPagoService.createPreference(req.body);
    
    if (result.success) {
      res.json({ paymentUrl: result.paymentUrl });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PayPal
router.post('/paypal/create-order', async (req, res) => {
  try {
    const paypalService = new PayPalService();
    const result = await paypalService.createOrder(req.body);
    
    if (result.success) {
      res.json({ orderId: result.transactionId, paymentUrl: result.paymentUrl });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## Interface de Checkout Unificada

### 1. Componente Principal de Checkout
```typescript
// src/components/checkout/Checkout.tsx
import React, { useState } from 'react';
import StripeCheckout from './StripeCheckout';
import MercadoPagoCheckout from './MercadoPagoCheckout';

const Checkout: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [orderData, setOrderData] = useState({
    amount: 99.99,
    currency: 'BRL',
    orderId: '12345',
    customer: {
      name: 'João Silva',
      email: 'joao@test.com',
      document: '12345678901'
    },
    billingAddress: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'BR'
    }
  });

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Cartão de Crédito',
      provider: 'Stripe',
      icon: '/icons/credit-card.svg',
      component: StripeCheckout
    },
    {
      id: 'mercadopago',
      name: 'Mercado Pago',
      provider: 'Mercado Pago',
      icon: '/icons/mercadopago.svg',
      component: MercadoPagoCheckout
    }
  ];

  const renderPaymentMethod = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (!method) return null;

    const Component = method.component;
    return <Component orderData={orderData} />;
  };

  return (
    <div className="checkout">
      <div className="checkout-header">
        <h2>Finalizar Compra</h2>
        <div className="order-summary">
          <h3>Resumo do Pedido</h3>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>R$ {orderData.amount.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Frete:</span>
            <span>R$ 0.00</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>R$ {orderData.amount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="payment-methods">
        <h3>Escolha a forma de pagamento</h3>
        <div className="method-options">
          {paymentMethods.map(method => (
            <div
              key={method.id}
              className={`method-option ${selectedMethod === method.id ? 'selected' : ''}`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <img src={method.icon} alt={method.name} />
              <div className="method-info">
                <h4>{method.name}</h4>
                <p>{method.provider}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMethod && (
        <div className="payment-form">
          {renderPaymentMethod()}
        </div>
      )}
    </div>
  );
};

export default Checkout;
```

## Sistema de Reembolsos

### 1. Serviço de Reembolsos
```typescript
// src/services/refundService.ts
export class RefundService {
  async processRefund(orderId: string, amount?: number): Promise<PaymentResult> {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Pedido não encontrado');
      }

      if (order.paymentStatus !== 'completed') {
        throw new Error('Pedido não foi pago');
      }

      let result: PaymentResult;

      switch (order.paymentMethod) {
        case 'stripe':
          const stripeService = new StripeService();
          result = await stripeService.refundPayment(order.transactionId, amount);
          break;
        case 'mercadopago':
          const mercadoPagoService = new MercadoPagoService();
          result = await mercadoPagoService.refundPayment(order.transactionId, amount);
          break;
        case 'paypal':
          const paypalService = new PayPalService();
          result = await paypalService.refundPayment(order.transactionId, amount);
          break;
        default:
          throw new Error('Método de pagamento não suportado para reembolso');
      }

      if (result.success) {
        await Order.findByIdAndUpdate(orderId, {
          status: 'refunded',
          paymentStatus: 'refunded',
          refundAmount: amount || order.total,
          refundDate: new Date()
        });
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }
}
```

## Testes

### 1. Testes de Integração
```typescript
// tests/payment.test.ts
import request from 'supertest';
import app from '../app';

describe('Payment Integration', () => {
  test('should create Stripe payment intent', async () => {
    const paymentData = {
      amount: 99.99,
      currency: 'BRL',
      orderId: '12345',
      customer: {
        name: 'João Silva',
        email: 'joao@test.com',
        document: '12345678901'
      }
    };

    const response = await request(app)
      .post('/api/payments/stripe/create-intent')
      .send(paymentData)
      .expect(200);

    expect(response.body.clientSecret).toBeDefined();
  });

  test('should create Mercado Pago preference', async () => {
    const paymentData = {
      amount: 99.99,
      currency: 'BRL',
      orderId: '12345',
      customer: {
        name: 'João Silva',
        email: 'joao@test.com',
        document: '12345678901'
      }
    };

    const response = await request(app)
      .post('/api/payments/mercadopago/create-preference')
      .send(paymentData)
      .expect(200);

    expect(response.body.paymentUrl).toBeDefined();
  });
});
```

## Exercícios Práticos

### 1. Sistema de Assinaturas
- Pagamentos recorrentes
- Gerenciamento de planos
- Cancelamento de assinaturas

### 2. Split de Pagamentos
- Divisão entre múltiplos vendedores
- Comissões automáticas
- Relatórios de comissões

### 3. Análise de Fraude
- Detecção de transações suspeitas
- Sistema de blacklist
- Monitoramento em tempo real

## Próximos Passos

1. **Aula 5**: Sistema de Notificações
2. **Aula 6**: Analytics e Relatórios

## Recursos Adicionais

- [Stripe Documentation](https://stripe.com/docs)
- [Mercado Pago API](https://www.mercadopago.com.br/developers)
- [PayPal Developer](https://developer.paypal.com/)
- [Webhook Testing](https://webhook.site/)

---

**Tempo estimado**: 5-6 horas
**Dificuldade**: Avançado
**Pré-requisitos**: Aulas 1-3 do Módulo 8







