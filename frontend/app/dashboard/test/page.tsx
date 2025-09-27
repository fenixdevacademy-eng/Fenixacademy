'use client';

import React from 'react';

export default function DashboardTestPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Dashboard Test
                </h1>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Status do Dashboard</h2>
                    <p className="text-gray-600">
                        Esta é uma página de teste para verificar se o dashboard está funcionando.
                    </p>

                    <div className="mt-6">
                        <button
                            onClick={() => {
                                fetch('/api/dashboard')
                                    .then(res => res.json())
                                    .then(data => console.log('API Response:', data))
                                    .catch(err => console.error('API Error:', err));
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Testar API Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

