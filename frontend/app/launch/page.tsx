'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Users, Star, Zap, CheckCircle, Gift, ArrowRight } from 'lucide-react';
import LaunchPricingCard from '@/components/LaunchPricingCard';
import pricingData from '@/data/pricing-launch.json';

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

export default function LaunchPage() {
    const [remainingSlots, setRemainingSlots] = useState(10000);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const courses: Course[] = pricingData.launchPricing.courses;

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const endDate = new Date('2024-12-31T23:59:59Z').getTime();
            const distance = endDate - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleCourseSelect = (course: Course) => {
        // Implementar lógica de seleção de curso
        console.log('Curso selecionado:', course);
        // Redirecionar para checkout ou modal de compra
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-2">
                        🎉 LANÇAMENTO EXCLUSIVO - FENIX ACADEMY
                    </h1>
                    <p className="text-xl opacity-90">
                        Os primeiros 10.000 alunos pagam apenas 5% do valor normal!
                    </p>
                </div>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                        <Zap className="w-5 h-5" />
                        OFERTA LIMITADA - 94% DE DESCONTO
                    </div>

                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Aprenda Programação do Zero ao Profissional
                    </h2>

                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Junte-se aos mais de 50.000 alunos que já transformaram suas carreiras
                        com nossos cursos. Agora com preços especiais para os primeiros 10.000 alunos!
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Users className="w-6 h-6 text-blue-500" />
                                <span className="text-2xl font-bold text-gray-900">50.000+</span>
                            </div>
                            <p className="text-gray-600">Alunos formados</p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Star className="w-6 h-6 text-yellow-500" />
                                <span className="text-2xl font-bold text-gray-900">4.9/5</span>
                            </div>
                            <p className="text-gray-600">Avaliação média</p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                <span className="text-2xl font-bold text-gray-900">95%</span>
                            </div>
                            <p className="text-gray-600">Taxa de sucesso</p>
                        </div>
                    </div>
                </div>

                {/* Urgency Banner */}
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-6 mb-12">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">
                            ⏰ OFERTA TERMINA EM:
                        </h3>
                        <div className="flex justify-center gap-4 mb-4">
                            <div className="bg-white bg-opacity-20 rounded-lg p-4 min-w-[80px]">
                                <div className="text-3xl font-bold">{timeLeft.days}</div>
                                <div className="text-sm">dias</div>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-4 min-w-[80px]">
                                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                                <div className="text-sm">horas</div>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-4 min-w-[80px]">
                                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                                <div className="text-sm">minutos</div>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-4 min-w-[80px]">
                                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                                <div className="text-sm">segundos</div>
                            </div>
                        </div>
                        <p className="text-lg">
                            Restam apenas <span className="font-bold">{remainingSlots.toLocaleString()}</span> vagas disponíveis!
                        </p>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {courses.map((course, index) => (
                        <LaunchPricingCard
                            key={course.id}
                            course={course}
                            onSelect={handleCourseSelect}
                            isPopular={index === 0} // Primeiro curso é o mais popular
                        />
                    ))}
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Por que escolher a Fenix Academy?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Garantia de 30 dias</h4>
                            <p className="text-gray-600 text-sm">
                                Se não ficar satisfeito, devolvemos 100% do seu dinheiro
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Comunidade VIP</h4>
                            <p className="text-gray-600 text-sm">
                                Acesso exclusivo ao grupo VIP com networking
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-purple-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Bônus Exclusivos</h4>
                            <p className="text-gray-600 text-sm">
                                R$ 5.000 em bônus grátis para os primeiros alunos
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-yellow-600" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Suporte Vitalício</h4>
                            <p className="text-gray-600 text-sm">
                                Suporte 24/7 para tirar suas dúvidas
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Final */}
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        Não perca esta oportunidade única!
                    </h3>
                    <p className="text-xl text-gray-600 mb-8">
                        Junte-se aos milhares de alunos que já transformaram suas carreiras
                    </p>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 mx-auto">
                        GARANTIR MINHA VAGA AGORA
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
