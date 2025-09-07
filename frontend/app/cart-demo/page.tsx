'use client';

import React from 'react';
import { CartProvider } from '../../contexts/CartContext';
import Cart from '../../components/Cart';
import CartButton from '../../components/CartButton';
import CourseCard from '../../components/CourseCard';
import { getAllCourses } from '../course/[slug]/courses';

export default function CartDemoPage() {
    const courses = getAllCourses();

    return (
        <CartProvider>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Fenix Academy
                                </h1>
                                <span className="text-gray-500">|</span>
                                <span className="text-gray-600">Demonstração do Carrinho</span>
                            </div>

                            <CartButton />
                        </div>
                    </div>
                </header>

                {/* Conteúdo Principal */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Cursos de Qualidade CS50
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore nossa coleção completa de cursos com conteúdo textual de alto nível.
                            Adicione quantos cursos quiser ao carrinho e aproveite descontos especiais!
                        </p>
                    </div>

                    {/* Informações do Carrinho */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">
                            🎯 Como Funciona o Carrinho
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
                            <div className="flex items-center space-x-2">
                                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                <span>Adicione cursos ao carrinho clicando no botão azul</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                <span>Visualize seu carrinho clicando no botão "Carrinho"</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                <span>Aproveite descontos: 10% para 2 cursos, 20% para 3+</span>
                            </div>
                        </div>
                    </div>

                    {/* Grid de Cursos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {/* CTA Final */}
                    <div className="text-center mt-16">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                            <h3 className="text-3xl font-bold mb-4">
                                Pronto para Transformar sua Carreira?
                            </h3>
                            <p className="text-xl mb-6 opacity-90">
                                Com 20 cursos completos de qualidade CS50, você tem tudo para se tornar um profissional de destaque!
                            </p>
                            <CartButton />
                        </div>
                    </div>
                </main>

                {/* Carrinho */}
                <Cart />
            </div>
        </CartProvider>
    );
}
