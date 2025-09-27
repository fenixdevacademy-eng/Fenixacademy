'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, CheckCircle, XCircle, AlertCircle, Loader2, Crown, Star, Shield, User } from 'lucide-react';

interface Subscription {
  id: string;
  plan: 'free' | 'basic' | 'premium' | 'admin';
  status: 'active' | 'cancelled' | 'past_due' | 'incomplete';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  price: number;
  currency: string;
  interval: 'month' | 'year';
}

interface SubscriptionManagerProps {
  className?: string;
  onSubscriptionChange?: (subscription: Subscription) => void;
}

export default function SubscriptionManager({
  className = '',
  onSubscriptionChange
}: SubscriptionManagerProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock subscription data
      const mockSubscription: Subscription = {
        id: 'sub_1234567890',
        plan: 'premium',
        status: 'active',
        currentPeriodStart: '2024-01-01T00:00:00Z',
        currentPeriodEnd: '2024-02-01T00:00:00Z',
        cancelAtPeriodEnd: false,
        price: 99.90,
        currency: 'BRL',
        interval: 'month'
      };

      setSubscription(mockSubscription);
      onSubscriptionChange?.(mockSubscription);
    } catch (err) {
      console.error('Error loading subscription:', err);
      setError('Erro ao carregar assinatura');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async (newPlan: 'basic' | 'premium') => {
    try {
      setIsUpgrading(true);
      setError(null);

      // Simulate upgrade process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock upgrade success
      const updatedSubscription: Subscription = {
        ...subscription!,
        plan: newPlan,
        price: newPlan === 'basic' ? 29.90 : 99.90
      };

      setSubscription(updatedSubscription);
      onSubscriptionChange?.(updatedSubscription);
    } catch (err) {
      console.error('Error upgrading subscription:', err);
      setError('Erro ao fazer upgrade da assinatura');
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setIsUpgrading(true);
      setError(null);

      // Simulate cancellation
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedSubscription: Subscription = {
        ...subscription!,
        cancelAtPeriodEnd: true
      };

      setSubscription(updatedSubscription);
      onSubscriptionChange?.(updatedSubscription);
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      setError('Erro ao cancelar assinatura');
    } finally {
      setIsUpgrading(false);
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'admin': return Crown;
      case 'premium': return Star;
      case 'basic': return Shield;
      default: return User;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'admin': return 'text-red-600 bg-red-100';
      case 'premium': return 'text-purple-600 bg-purple-100';
      case 'basic': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'cancelled': return XCircle;
      case 'past_due': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'past_due': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-64 ${className}`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando assinatura...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-64 ${className}`}>
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadSubscription}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className={`flex items-center justify-center min-h-64 ${className}`}>
        <div className="text-center">
          <p className="text-gray-600">Nenhuma assinatura encontrada</p>
        </div>
      </div>
    );
  }

  const PlanIcon = getPlanIcon(subscription.plan);
  const StatusIcon = getStatusIcon(subscription.status);

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Gerenciar Assinatura
        </h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(subscription.plan)}`}>
          <PlanIcon className="w-4 h-4 inline mr-1" />
          {subscription.plan.toUpperCase()}
        </div>
      </div>

      {/* Subscription Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
            <StatusIcon className="w-4 h-4" />
            {subscription.status === 'active' ? 'Ativa' :
              subscription.status === 'cancelled' ? 'Cancelada' :
                subscription.status === 'past_due' ? 'Vencida' : 'Incompleta'}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Plano:</span>
          <span className="text-sm font-medium text-gray-900">
            {subscription.plan === 'free' ? 'Gratuito' :
              subscription.plan === 'basic' ? 'Básico' :
                subscription.plan === 'premium' ? 'Premium' : 'Administrador'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Valor:</span>
          <span className="text-sm font-medium text-gray-900">
            {formatPrice(subscription.price, subscription.currency)}/{subscription.interval === 'month' ? 'mês' : 'ano'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Próxima cobrança:</span>
          <span className="text-sm font-medium text-gray-900">
            {formatDate(subscription.currentPeriodEnd)}
          </span>
        </div>

        {subscription.cancelAtPeriodEnd && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                Sua assinatura será cancelada em {formatDate(subscription.currentPeriodEnd)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {subscription.plan === 'free' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => handleUpgrade('basic')}
              disabled={isUpgrading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUpgrading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              Upgrade para Básico
            </button>
            <button
              onClick={() => handleUpgrade('premium')}
              disabled={isUpgrading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUpgrading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Star className="w-4 h-4" />
              )}
              Upgrade para Premium
            </button>
          </div>
        )}

        {subscription.plan === 'basic' && (
          <button
            onClick={() => handleUpgrade('premium')}
            disabled={isUpgrading}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUpgrading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Star className="w-4 h-4" />
            )}
            Upgrade para Premium
          </button>
        )}

        {subscription.plan === 'premium' && !subscription.cancelAtPeriodEnd && (
          <button
            onClick={handleCancel}
            disabled={isUpgrading}
            className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUpgrading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            Cancelar Assinatura
          </button>
        )}

        {subscription.cancelAtPeriodEnd && (
          <button
            onClick={() => {/* Reactivate logic */ }}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Reativar Assinatura
          </button>
        )}
      </div>

      {/* Billing History */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Histórico de Cobrança
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
              </p>
              <p className="text-xs text-gray-600">
                {subscription.plan === 'free' ? 'Gratuito' :
                  subscription.plan === 'basic' ? 'Básico' :
                    subscription.plan === 'premium' ? 'Premium' : 'Administrador'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {formatPrice(subscription.price, subscription.currency)}
              </p>
              <p className="text-xs text-green-600">
                Pago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}