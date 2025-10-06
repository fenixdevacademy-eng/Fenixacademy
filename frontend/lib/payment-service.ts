'use client';

﻿// Serviço de pagamento para Stripe
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-08-27.basil'
});

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  image?: string;
  features?: string[];
  duration?: string;
  level?: string;
  category?: string;
  duration_hours?: number;
  total_lessons?: number;
  total_modules?: number;
}

export class PaymentService {
  static async createPaymentIntent(amount: number, currency: string = 'brl'): Promise<PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        automatic_payment_methods: {
          enabled: true
        }
      });

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret || ''
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  static async confirmPayment(paymentIntentId: string): Promise<boolean> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent.status === 'succeeded';
    } catch (error) {
      console.error('Error confirming payment:', error);
      return false;
    }
  }

  static async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent | null> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret || ''
      };
    } catch (error) {
      console.error('Error retrieving payment intent:', error);
      return null;
    }
  }
}

// Hook para usar o serviço de pagamento
export const usePayment = () => {
  const createPayment = async (amount: number, currency: string = 'brl') => {
    return await PaymentService.createPaymentIntent(amount, currency);
  };

  const confirmPayment = async (paymentIntentId: string) => {
    return await PaymentService.confirmPayment(paymentIntentId);
  };

  return {
    createPayment,
    confirmPayment
  };
};