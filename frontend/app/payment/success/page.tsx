'use client';

import React from 'react';

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Pagamento Realizado com Sucesso!
                </h1>
                <p className="text-lg text-gray-600">
                    Obrigado por sua compra. Você receberá um email de confirmação em breve.
                </p>
            </div>
        </div>
    );
}