'use client';

import React from 'react';
import { useCart, CartItem } from '../contexts/CartContext';
import { X, ShoppingCart, Trash2, CreditCard, Lock } from 'lucide-react';

export default function Cart() {
    const { state, removeItem, clearCart, closeCart, getDiscount } = useCart();
    const { items, total, itemCount, isOpen } = state;

    if (!isOpen) return null;

    const { percentage, amount, finalTotal } = getDiscount();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const handleCheckout = () => {
        // Aqui você implementaria a integração com gateway de pagamento
        alert('Redirecionando para checkout...');
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={closeCart}
            />

            {/* Carrinho */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center space-x-2">
                            <ShoppingCart className="h-6 w-6 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Carrinho de Compras
                            </h2>
                        </div>
                        <button
                            onClick={closeCart}
                            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <ShoppingCart className="h-16 w-16 text-gray-300" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900">
                                    Seu carrinho está vazio
                                </h3>
                                <p className="mt-2 text-center text-sm text-gray-500">
                                    Adicione alguns cursos incríveis para começar sua jornada de aprendizado!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <CartItemCard
                                        key={item.id}
                                        item={item}
                                        onRemove={removeItem}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-200 px-6 py-4">
                            {/* Resumo */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal ({itemCount} cursos):</span>
                                    <span className="font-medium">{formatPrice(total)}</span>
                                </div>

                                {percentage > 0 && (
                                    <>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-green-600">Desconto ({percentage}%):</span>
                                            <span className="font-medium text-green-600">-{formatPrice(amount)}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-2">
                                            <div className="flex justify-between text-lg font-semibold">
                                                <span>Total Final:</span>
                                                <span className="text-green-600">{formatPrice(finalTotal)}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Botões */}
                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={handleCheckout}
                                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
                                >
                                    <CreditCard className="h-5 w-5" />
                                    <span>Finalizar Compra</span>
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    <Trash2 className="h-5 w-5" />
                                    <span>Limpar Carrinho</span>
                                </button>
                            </div>

                            {/* Segurança */}
                            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                                <Lock className="h-4 w-4" />
                                <span>Compra 100% segura</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Componente para cada item do carrinho
interface CartItemCardProps {
    item: CartItem;
    onRemove: (id: string) => void;
}

function CartItemCard({ item, onRemove }: CartItemCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    return (
        <div className="flex space-x-4 rounded-lg border border-gray-200 p-4">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-16 w-16 rounded-lg object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/images/course-placeholder.jpg';
                    }}
                />
            </div>

            {/* Informações */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                    {item.category} • {item.level}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{item.total_modules} módulos</span>
                    <span>{item.total_lessons} lições</span>
                    <span>{item.duration_hours}h</span>
                </div>
                <p className="text-sm font-semibold text-blue-600 mt-2">
                    {formatPrice(item.price)}
                </p>
            </div>

            {/* Botão remover */}
            <button
                onClick={() => onRemove(item.id)}
                className="flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500 transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
