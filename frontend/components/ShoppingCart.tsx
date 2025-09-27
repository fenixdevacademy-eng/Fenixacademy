"use client";

import React from 'react';

interface ShoppingCartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Carrinho</h2>
                    <button onClick={onClose} className="text-sm text-gray-600">Fechar</button>
                </div>
                <div className="p-4 text-gray-600">Seu carrinho está vazio.</div>
            </div>
        </div>
    );
}