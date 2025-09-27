// Serviço do Stripe para pagamentos e webhooks
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-08-27.basil'
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
  metadata: Record<string, string>;
}

export interface StripePrice {
  id: string;
  productId: string;
  amount: number;
  currency: string;
  recurring?: {
    interval: 'day' | 'week' | 'month' | 'year';
    intervalCount: number;
  };
}

export interface StripeSubscription {
  id: string;
  customerId: string;
  status: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  items: any[];
}

export class StripeService {
  static async createCustomer(email: string, name?: string, phone?: string): Promise<StripeCustomer> {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        phone
      });

      return {
        id: customer.id,
        email: customer.email || email,
        name: customer.name || name,
        phone: customer.phone || phone,
        address: customer.address || undefined,
        created: customer.created
      };
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  static async getCustomer(customerId: string): Promise<StripeCustomer | null> {
    try {
      const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
      return {
        id: customer.id,
        email: customer.email || '',
        name: customer.name || undefined,
        phone: customer.phone || undefined,
        address: customer.address || undefined,
        created: customer.created
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
        metadata: metadata || {}
      });

      return {
        id: product.id,
        name: product.name,
        description: product.description || undefined,
        price: 0, // Preço será definido no price
        currency: 'brl',
        active: product.active,
        metadata: product.metadata
      };
    } catch (error) {
      console.error('Error creating Stripe product:', error);
      throw new Error('Failed to create product');
    }
  }

  static async createPrice(productId: string, amount: number, currency: string = 'brl'): Promise<StripePrice> {
    try {
      const price = await stripe.prices.create({
        product: productId,
        unit_amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase()
      });

      return {
        id: price.id,
        productId: price.product as string,
        amount: price.unit_amount || 0,
        currency: price.currency,
        recurring: price.recurring ? {
          interval: price.recurring.interval,
          intervalCount: price.recurring.interval_count
        } : undefined
      };
    } catch (error) {
      console.error('Error creating Stripe price:', error);
      throw new Error('Failed to create price');
    }
  }

  static async createPaymentIntent(amount: number, currency: string = 'brl', customerId?: string): Promise<any> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: currency.toLowerCase(),
        customer: customerId,
        automatic_payment_methods: {
          enabled: true
        }
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
        payment_settings: { save_default_payment_method: 'on_subscription' }
      });

      return {
        id: subscription.id,
        customerId: subscription.customer as string,
        status: subscription.status,
        currentPeriodStart: (subscription as any).current_period_start,
        currentPeriodEnd: (subscription as any).current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        items: subscription.items.data
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
        currentPeriodStart: (subscription as any).current_period_start,
        currentPeriodEnd: (subscription as any).current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        items: subscription.items.data
      };
    } catch (error) {
      console.error('Error retrieving subscription:', error);
      return null;
    }
  }

  static async cancelSubscription(subscriptionId: string): Promise<boolean> {
    try {
      await stripe.subscriptions.cancel(subscriptionId);
      return true;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return false;
    }
  }

  static async createWebhookEndpoint(url: string, events: Stripe.WebhookEndpointCreateParams.EnabledEvent[]): Promise<any> {
    try {
      const webhook = await stripe.webhookEndpoints.create({
        url,
        enabled_events: events
      });
      return webhook;
    } catch (error) {
      console.error('Error creating webhook endpoint:', error);
      throw new Error('Failed to create webhook endpoint');
    }
  }

  static verifyWebhookSignature(payload: string, signature: string, secret: string): any {
    try {
      return stripe.webhooks.constructEvent(payload, signature, secret);
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      throw new Error('Invalid webhook signature');
    }
  }

  static handleWebhookEvent(event: any): void {
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object);
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object);
        break;
      case 'customer.subscription.created':
        console.log('Subscription created:', event.data.object);
        break;
      case 'customer.subscription.updated':
        console.log('Subscription updated:', event.data.object);
        break;
      case 'customer.subscription.deleted':
        console.log('Subscription deleted:', event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }
}

export { stripe };