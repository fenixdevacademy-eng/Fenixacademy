// Serviço do Stripe para pagamentos e webhooks
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: Stripe.Address;
  created: number;
}

export interface StripeProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  active: boolean;
  metadata?: Record<string, string>;
}

export interface StripeSubscription {
  id: string;
  customerId: string;
  status: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  items: Stripe.SubscriptionItem[];
}

export class StripeService {
  static async createCustomer(email: string, name?: string, phone?: string): Promise<StripeCustomer> {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        phone,
      });

      return {
        id: customer.id,
        email: customer.email || email,
        name: customer.name || name,
        phone: customer.phone || phone,
        address: customer.address,
        created: customer.created,
      };
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  static async getCustomer(customerId: string): Promise<StripeCustomer | null> {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      
      if (customer.deleted) {
        return null;
      }

      return {
        id: customer.id,
        email: customer.email || '',
        name: customer.name || undefined,
        phone: customer.phone || undefined,
        address: customer.address || undefined,
        created: customer.created,
      };
    } catch (error) {
      console.error('Error retrieving Stripe customer:', error);
      return null;
    }
  }

  static async createProduct(name: string, description?: string, metadata?: Record<string, string>): Promise<StripeProduct> {
    try {
      const product = await stripe.products.create({
        name,
        description,
        metadata,
      });

      return {
        id: product.id,
        name: product.name,
        description: product.description || undefined,
        price: 0, // Preço será definido no price
        currency: 'brl',
        active: product.active,
        metadata: product.metadata,
      };
    } catch (error) {
      console.error('Error creating Stripe product:', error);
      throw new Error('Failed to create product');
    }
  }

  static async createPrice(productId: string, amount: number, currency: string = 'brl'): Promise<Stripe.Price> {
    try {
      const price = await stripe.prices.create({
        product: productId,
        unit_amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
      });

      return price;
    } catch (error) {
      console.error('Error creating Stripe price:', error);
      throw new Error('Failed to create price');
    }
  }

  static async createPaymentIntent(amount: number, currency: string = 'brl', customerId?: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        customer: customerId,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  static async createSubscription(customerId: string, priceId: string): Promise<StripeSubscription> {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      return {
        id: subscription.id,
        customerId: subscription.customer as string,
        status: subscription.status,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        items: subscription.items.data,
      };
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('Failed to create subscription');
    }
  }

  static async getSubscription(subscriptionId: string): Promise<StripeSubscription | null> {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      return {
        id: subscription.id,
        customerId: subscription.customer as string,
        status: subscription.status,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        items: subscription.items.data,
      };
    } catch (error) {
      console.error('Error retrieving subscription:', error);
      return null;
    }
  }

  static async cancelSubscription(subscriptionId: string, atPeriodEnd: boolean = true): Promise<boolean> {
    try {
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: atPeriodEnd,
      });

      if (!atPeriodEnd) {
        await stripe.subscriptions.cancel(subscriptionId);
      }

      return true;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return false;
    }
  }

  static async createWebhookEndpoint(url: string, events: string[]): Promise<Stripe.WebhookEndpoint> {
    try {
      const webhook = await stripe.webhookEndpoints.create({
        url,
        enabled_events: events as Stripe.WebhookEndpointCreateParams.EnabledEvent[],
      });

      return webhook;
    } catch (error) {
      console.error('Error creating webhook endpoint:', error);
      throw new Error('Failed to create webhook endpoint');
    }
  }

  static async verifyWebhookSignature(payload: string, signature: string, secret: string): Promise<Stripe.Event> {
    try {
      const event = stripe.webhooks.constructEvent(payload, signature, secret);
      return event;
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      throw new Error('Invalid webhook signature');
    }
  }

  static async handleWebhookEvent(event: Stripe.Event): Promise<void> {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
          break;
        case 'customer.subscription.created':
          await this.handleSubscriptionCreated(event.data.object as Stripe.Subscription);
          break;
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.error('Error handling webhook event:', error);
      throw error;
    }
  }

  private static async handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    console.log('Payment succeeded:', paymentIntent.id);
    // Implementar lógica de pagamento bem-sucedido
  }

  private static async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    console.log('Payment failed:', paymentIntent.id);
    // Implementar lógica de pagamento falhado
  }

  private static async handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<void> {
    console.log('Subscription created:', subscription.id);
    // Implementar lógica de assinatura criada
  }

  private static async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
    console.log('Subscription updated:', subscription.id);
    // Implementar lógica de assinatura atualizada
  }

  private static async handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
    console.log('Subscription deleted:', subscription.id);
    // Implementar lógica de assinatura deletada
  }
}
