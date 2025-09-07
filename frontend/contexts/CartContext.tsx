'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Tipos para o carrinho
export interface CartItem {
    id: string;
    title: string;
    price: number;
    currency: string;
    thumbnail: string;
    category: string;
    level: string;
    duration_hours: number;
    total_lessons: number;
    total_modules: number;
}

export interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
    isOpen: boolean;
}

// Ações do carrinho
export type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'CLEAR_CART' }
    | { type: 'TOGGLE_CART' }
    | { type: 'CLOSE_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

// Estado inicial
const initialState: CartState = {
    items: [],
    total: 0,
    itemCount: 0,
    isOpen: false,
};

// Reducer do carrinho
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM':
            // Verifica se o item já existe no carrinho
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                // Se já existe, não adiciona novamente (cursos são únicos)
                return state;
            }

            const newItems = [...state.items, action.payload];
            const newTotal = newItems.reduce((sum, item) => sum + item.price, 0);

            return {
                ...state,
                items: newItems,
                total: newTotal,
                itemCount: newItems.length,
            };

        case 'REMOVE_ITEM':
            const filteredItems = state.items.filter(item => item.id !== action.payload);
            const newTotalAfterRemove = filteredItems.reduce((sum, item) => sum + item.price, 0);

            return {
                ...state,
                items: filteredItems,
                total: newTotalAfterRemove,
                itemCount: filteredItems.length,
            };

        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                total: 0,
                itemCount: 0,
            };

        case 'TOGGLE_CART':
            return {
                ...state,
                isOpen: !state.isOpen,
            };

        case 'CLOSE_CART':
            return {
                ...state,
                isOpen: false,
            };

        case 'LOAD_CART':
            const loadedTotal = action.payload.reduce((sum, item) => sum + item.price, 0);

            return {
                ...state,
                items: action.payload,
                total: loadedTotal,
                itemCount: action.payload.length,
            };

        default:
            return state;
    }
}

// Contexto do carrinho
interface CartContextType {
    state: CartState;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    toggleCart: () => void;
    closeCart: () => void;
    isInCart: (id: string) => boolean;
    getDiscount: () => { percentage: number; amount: number; finalTotal: number };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

// Provider do carrinho
interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Carrega o carrinho do localStorage ao inicializar
    useEffect(() => {
        const savedCart = localStorage.getItem('fenix-cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: parsedCart });
            } catch (error) {
                console.error('Erro ao carregar carrinho:', error);
            }
        }
    }, []);

    // Salva o carrinho no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem('fenix-cart', JSON.stringify(state.items));
    }, [state.items]);

    // Funções do carrinho
    const addItem = (item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const toggleCart = () => {
        dispatch({ type: 'TOGGLE_CART' });
    };

    const closeCart = () => {
        dispatch({ type: 'CLOSE_CART' });
    };

    const isInCart = (id: string) => {
        return state.items.some(item => item.id === id);
    };

    // Calcula desconto baseado na quantidade de cursos
    const getDiscount = () => {
        const itemCount = state.items.length;
        let percentage = 0;

        if (itemCount >= 3) {
            percentage = 20; // 20% de desconto para 3+ cursos
        } else if (itemCount >= 2) {
            percentage = 10; // 10% de desconto para 2 cursos
        }

        const amount = (state.total * percentage) / 100;
        const finalTotal = state.total - amount;

        return { percentage, amount, finalTotal };
    };

    const value: CartContextType = {
        state,
        addItem,
        removeItem,
        clearCart,
        toggleCart,
        closeCart,
        isInCart,
        getDiscount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
