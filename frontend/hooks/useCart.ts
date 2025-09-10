'use client';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { CartItem, CourseItem } from '../lib/payment-service';
import { usePixelTracking } from '../lib/pixel-tracking';
import React from 'react';
interface CartContextType {
    items: CartItem[];
    addItem: (item: CourseItem) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    isInCart: (itemId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const { trackAddToCart, trackRemoveFromCart } = usePixelTracking();

    useEffect(() => {
        const savedCart = localStorage.getItem('fenix-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('fenix-cart', JSON.stringify(items));
    }, [items]);

    const addItem = (item: CourseItem) => {
        setItems(prev => {
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                const updatedItems = prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
                trackAddToCart(item.name, item.id, item.price);
                return updatedItems;
            } else {
                const newItem: CartItem = { ...item, quantity: 1 };
                trackAddToCart(item.name, item.id, item.price);
                return [...prev, newItem];
            }
        });
    };

    const removeItem = (itemId: string) => {
        const item = items.find(i => i.id === itemId);
        if (item) {
            trackRemoveFromCart(item.name, item.id, item.price);
        }
        setItems(prev => prev.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(itemId);
            return;
        }
        setItems(prev => {
            const item = prev.find(i => i.id === itemId);
            if (!item) return prev;
            const oldQuantity = item.quantity;
            const updatedItems = prev.map(i =>
                i.id === itemId ? { ...i, quantity } : i
            );
            if (quantity > oldQuantity) {
                trackAddToCart(item.name, item.id, item.price);
            } else if (quantity < oldQuantity) {
                trackRemoveFromCart(item.name, item.id, item.price);
            }
            return updatedItems;
        });
    };

    const clearCart = () => {
        items.forEach(item => {
            trackRemoveFromCart(item.name, item.id, item.price);
        });
        setItems([]);
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const isInCart = (itemId: string) => {
        return items.some(item => item.id === itemId);
    };

    const value: CartContextType = {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isInCart
    };

    return React.createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
