'use client';

import React, { useState } from 'react';
import { CartItem, usePayment } from '../lib/payment-service';
import { usePixelTracking } from '../lib/pixel-tracking';
import { ShoppingCart, X, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import CheckoutForm from './CheckoutForm';

interface ShoppingCartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
    const { formatCurrency } = usePayment();
    const { trackAddToCart, trackRemoveFromCart } = usePixelTracking();

    const [items, setItems] = useState<CartItem[]>([
        {
            id: 'web-fundamentals',
            name: 'Web Fundamentals Completo',
            description: 'Curso completo de desenvolvimento web moderno',
            price: 297.00,
            originalPrice: 497.00,
            discount: 200.00,
            image: '/images/courses/web-fundamentals.jpg',
            category: 'Desenvolvimento Web',
            duration: '200 horas',
            level: 'iniciante',
            quantity: 1
        },
        {
            id: 'react-advanced',
            name: 'React Avançado e Moderno',
            description: 'React 18, Hooks, Context API e muito mais',
            price: 397.00,
            originalPrice: 597.00,
            discount: 200.00,
            image: '/images/courses/react-advanced.jpg',
            category: 'Frontend',
            duration: '150 horas',
            level: 'avancado',
            quantity: 1
        }
    ]);

    const [showCheckout, setShowCheckout] = useState(false);
    const [checkoutResult, setCheckoutResult] = useState<any>(null);

    const updateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(itemId);
            return;
        }

        setItems(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, quantity: newQuantity }
                : item
        ));

        const item = items.find(i => i.id === itemId);
        if (item) {
            if (newQuantity > item.quantity) {
                trackAddToCart(item.name, item.id, item.price);
            } else {
                trackRemoveFromCart(item.name, item.id, item.price);
            }
        }
    };

    const removeItem = (itemId: string) => {
        const item = items.find(i => i.id === itemId);
        if (item) {
            trackRemoveFromCart(item.name, item.id, item.price);
        }

        setItems(prev => prev.filter(item => item.id !== itemId));
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateSavings = () => {
        return items.reduce((total, item) => {
            const originalTotal = (item.originalPrice || item.price) * item.quantity;
            const currentTotal = item.price * item.quantity;
            return total + (originalTotal - currentTotal);
        }, 0);
    };

    const handleCheckoutSuccess = (result: any) => {
        setCheckoutResult(result);
        setShowCheckout(false);
        // Clear cart after successful payment
        setItems([]);
    };

    const handleCheckoutError = (error: string) => {
        console.error('Checkout error:', error);
        // Handle error (show notification, etc.)
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Carrinho ({items.length})
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {showCheckout ? (
                        /* Checkout Form */
                        <div className="flex-1 overflow-y-auto">
                            <CheckoutForm
                                items={items}
                                onSuccess={handleCheckoutSuccess}
                                onError={handleCheckoutError}
                            />
                        </div>
                    ) : checkoutResult ? (
                        /* Success Message */
                        <div className="flex-1 flex items-center justify-center p-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Pagamento Realizado!
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.
                                </p>
                                {checkoutResult.transactionId && (
                                    <p className="text-sm text-gray-500">
                                        ID da Transação: {checkoutResult.transactionId}
                                    </p>
                                )}
                                <button
                                    onClick={() => {
                                        setCheckoutResult(null);
                                        onClose();
                                    }}
                                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Cart Items */
                        <div className="flex-1 overflow-y-auto">
                            {items.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center p-6">
                                    <div className="text-center">
                                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Seu carrinho está vazio
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Adicione alguns cursos para começar sua jornada de aprendizado!
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Explorar Cursos
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                                <p className="text-sm text-gray-600">{item.category}</p>
                                                <p className="text-sm text-gray-600">{item.duration}</p>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        {formatCurrency(item.price)}
                                                    </span>
                                                    {item.originalPrice && item.originalPrice > item.price && (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            {formatCurrency(item.originalPrice)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="w-8 h-8 rounded-full border border-red-300 text-red-600 flex items-center justify-center hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    {!showCheckout && !checkoutResult && items.length > 0 && (
                        <div className="border-t border-gray-200 p-6">
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal:</span>
                                    <span>{formatCurrency(calculateTotal())}</span>
                                </div>
                                {calculateSavings() > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Economia:</span>
                                        <span>-{formatCurrency(calculateSavings())}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total:</span>
                                    <span>{formatCurrency(calculateTotal())}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowCheckout(true)}
                                className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                            >
                                <CreditCard className="w-5 h-5 mr-2" />
                                Finalizar Compra
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
