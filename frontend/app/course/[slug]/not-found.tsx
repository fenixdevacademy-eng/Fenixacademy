'use client';

import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function CourseNotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Search className="w-12 h-12 text-white" />
                </div>

                <h1 className="text-4xl font-bold text-white mb-4">
                    Curso não encontrado
                </h1>

                <p className="text-gray-300 mb-8 text-lg">
                    O curso que você está procurando não existe ou foi removido.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar aos Cursos
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                    >
                        <Home className="w-5 h-5" />
                        Ir para Home
                    </Link>
                </div>
            </div>
        </div>
    )
}


