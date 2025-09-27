'use client';

import React from 'react';
import { useCart, CartItem } from '../contexts/CartContext';
import { X, ShoppingCart, Trash2, CreditCard, Lock, Plus, Minus, ArrowRight } from 'lucide-react';

export default function Cart() {
    const { state, removeItem, updateQuantity, clearCart, closeCart, getDiscount } = useCart();
    const { items, total, itemCount, isOpen } = state;

    if (!isOpen) return null;

    const { percentage, amount, finalTotal } = getDiscount();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(itemId);
        } else {
            updateQuantity(itemId, newQuantity);
        }
    };

    const handleCheckout = () => {
        // Navigate to checkout page
        window.location.href = '/checkout';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Carrinho</h2>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {itemCount}
                        </span>
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="text-center py-8">
                            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">Seu carrinho está vazio</p>
                            <p className="text-sm text-gray-500">Adicione alguns cursos para começar</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-gray-600">{item.instructor}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm font-semibold text-gray-900">
                                                {formatPrice(item.price)}
                                            </span>
                                            {item.originalPrice && item.originalPrice > item.price && (
                                                <span className="text-xs text-gray-500 line-through">
                                                    {formatPrice(item.originalPrice)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center border border-gray-300 rounded">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="px-2 py-1 text-sm min-w-[2rem] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-gray-200 p-4 space-y-4">
                        {/* Discount */}
                        {percentage > 0 && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-green-800">Desconto ({percentage}%)</span>
                                    <span className="font-semibold text-green-800">
                                        -{formatPrice(amount)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Total */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>Subtotal ({itemCount} itens)</span>
                                <span>{formatPrice(total)}</span>
                            </div>

                            {percentage > 0 && (
                                <div className="flex items-center justify-between text-sm text-green-600">
                                    <span>Desconto</span>
                                    <span>-{formatPrice(amount)}</span>
                                </div>
                            )}

                            <div className="flex items-center justify-between text-lg font-semibold text-gray-900 border-t border-gray-200 pt-2">
                                <span>Total</span>
                                <span>{formatPrice(finalTotal)}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                            <button
                                onClick={handleCheckout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                <CreditCard className="w-4 h-4" />
                                Finalizar Compra
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="flex gap-2">
                                <button
                                    onClick={clearCart}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                                >
                                    Limpar Carrinho
                                </button>
                                <button
                                    onClick={closeCart}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                                >
                                    Continuar Comprando
                                </button>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Lock className="w-3 h-3" />
                            <span>Compra 100% segura e protegida</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}