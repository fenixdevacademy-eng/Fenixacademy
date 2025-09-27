"use client";
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CourseItem {
    id: string;
    name: string;
    price: number;
}

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

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('fenix-cart');
            if (savedCart) setItems(JSON.parse(savedCart));
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('fenix-cart', JSON.stringify(items));
    }, [items]);

    const addItem = (item: CourseItem) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            const newItem: CartItem = { ...item, quantity: 1 }
            return [...prev, newItem];
        });
    }

    const removeItem = (itemId: string) => {
        setItems(prev => prev.filter(i => i.id !== itemId));
    }

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(itemId);
            return;
        }
        setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
    }

    const clearCart = () => setItems([]);
    const getTotalItems = () => items.reduce((total, item) => total + item.quantity, 0);
    const getTotalPrice = () => items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const isInCart = (itemId: string) => items.some(item => item.id === itemId);

    const value: CartContextType = {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isInCart
    }

    return React.createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return ctx;
}