'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Users, Star, Zap, Gift } from 'lucide-react';

interface Course {
    id: string;
    name: string;
    originalPrice: number;
    launchPrice: number;
    discount: number;
    currency: string;
    description: string;
    features: string[];
    bonuses: Array<{
        name: string;
        value: number;
        description: string;
    }>;
    totalBonusValue: number;
    totalValue: number;
    savings: number;
}

export default function LaunchPricingCard({
    course,
    launchPrice,
    discount,
    currency,
    description,
    features,
    bonuses,
    totalBonusValue,
    totalValue,
    savings
}: LaunchPricingCardProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const endDate = new Date('2024-12-31T23:59:59Z').getTime();
            const distance = endDate - now;

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    }

    return (
        <div className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${isPopular ? 'border-blue-500 ring-4 ring-blue-100' : 'border-gray-200'}`}>
            {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        MAIS POPULAR
                    </div>
                </div>
            )}

            <div className="p-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h3>
                    <p className="text-gray-600 mb-4">{description}</p>

                    {/* Discount Badge */}
                    <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {discount}% DE DESCONTO
                    </div>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                        {formatPrice(launchPrice)}
                    </div>
                    <div className="text-lg text-gray-500 line-through mb-1">
                        {formatPrice(course.originalPrice)}
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                        Economize {formatPrice(savings)}
                    </div>
                </div>

                {/* Timer */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="text-center mb-2">
                        <span className="text-sm text-gray-600">Oferta termina em:</span>
                    </div>
                    <div className="flex justify-center gap-2">
                        <div className="bg-white rounded-lg p-2 min-w-[60px]">
                            <div className="text-xl font-bold text-gray-900">{timeLeft.days}</div>
                            <div className="text-xs text-gray-500">dias</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 min-w-[60px]">
                            <div className="text-xl font-bold text-gray-900">{timeLeft.hours}</div>
                            <div className="text-xs text-gray-500">horas</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 min-w-[60px]">
                            <div className="text-xl font-bold text-gray-900">{timeLeft.minutes}</div>
                            <div className="text-xs text-gray-500">min</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 min-w-[60px]">
                            <div className="text-xl font-bold text-gray-900">{timeLeft.seconds}</div>
                            <div className="text-xs text-gray-500">seg</div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">O que você vai aprender:</h4>
                    <ul className="space-y-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bonuses */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                        Bônus inclusos (Valor: {formatPrice(totalBonusValue)})
                    </h4>
                    <ul className="space-y-2">
                        {bonuses.map((bonus, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                                <div>
                                    <span className="font-medium">{bonus.name}</span>
                                    <span className="text-gray-500 ml-1">({formatPrice(bonus.value)})</span>
                                    <p className="text-xs text-gray-500">{bonus.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Total Value */}
                <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(totalValue)}</p>
                    <p className="text-sm text-green-600 font-semibold">
                        Você paga apenas {formatPrice(launchPrice)}
                    </p>
                </div>

                {/* CTA Button */}
                <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${isPopular
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                            : 'bg-gray-800 hover:bg-gray-900'
                        }`}
                    onClick={() => onSelect(course)}
                >
                    {isPopular ? 'QUERO MINHA VAGA' : 'ADQUIRIR AGORA'}
                </button>

                {/* Guarantee */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                        ✅ Garantia de 30 dias ou seu dinheiro de volta
                    </p>
                </div>
            </div>
        </div>
    );
}
