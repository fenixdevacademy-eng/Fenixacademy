'use client';

import AnimatedComponent from '../../components/AnimatedComponent';
import {
    Users,
    Award,
    BookOpen,
    Globe,
    Heart,
    CheckCircle,
    ArrowRight,
    Star,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const stats = [
        { number: '10K+', label: 'Alunos Formados', icon: Users },
        { number: '50+', label: 'Cursos Disponíveis', icon: BookOpen },
        { number: '95%', label: 'Taxa de Satisfação', icon: Star },
        { number: '200+', label: 'Empresas Parceiras', icon: Globe },
    ];

    const values = [
        {
            title: 'Excelência',
            description: 'Comprometimento com a qualidade máxima em todos os nossos cursos e serviços.',
            icon: Award,
            color: 'text-blue-600'
        },
        {
            title: 'Inovação',
            description: 'Sempre buscando as tecnologias mais recentes e metodologias inovadoras.',
            icon: TrendingUp,
            color: 'text-green-600'
        },
        {
            title: 'Comunidade',
            description: 'Construindo uma comunidade forte e colaborativa de desenvolvedores.',
            icon: Users,
            color: 'text-purple-600'
        },
        {
            title: 'Acessibilidade',
            description: 'Educação de qualidade acessível para todos, independente da localização.',
            icon: Globe,
            color: 'text-orange-600'
        },
    ];

    const team = [
        {
            name: 'João Silva',
            role: 'CEO & Fundador',
            bio: 'Especialista em desenvolvimento web com mais de 10 anos de experiência.',
            image: '/team/joao.jpg'
        },
        {
            name: 'Maria Santos',
            role: 'CTO',
            bio: 'Arquiteta de software e especialista em tecnologias emergentes.',
            image: '/team/maria.jpg'
        },
        {
            name: 'Pedro Costa',
            role: 'Head de Educação',
            bio: 'Pedagogo especializado em metodologias de ensino online.',
            image: '/team/pedro.jpg'
        },
        {
            name: 'Ana Oliveira',
            role: 'Lead Designer',
            bio: 'Designer UX/UI com foco em experiências educacionais.',
            image: '/team/ana.jpg'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            Sobre a Fenix Academy
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
                            Transformando vidas através da educação em tecnologia
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/courses"
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Ver Cursos
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                Fale Conosco
                            </Link>
                        </div>
                    </AnimatedComponent>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <AnimatedComponent
                                key={stat.label}
                                animation="slideUp"
                                duration={0.5}
                                delay={index * 0.1}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <stat.icon className="w-12 h-12 text-blue-600" />
                                </div>
                                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600">{stat.label}</div>
                            </AnimatedComponent>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <AnimatedComponent
                            animation="slideUp"
                            duration={0.8}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                Nossa Missão
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Democratizar o acesso à educação de qualidade em tecnologia,
                                capacitando pessoas de todas as origens para se tornarem
                                profissionais de sucesso no mercado digital.
                            </p>
                        </AnimatedComponent>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <AnimatedComponent
                            animation="slideLeft"
                            duration={0.8}
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Por que escolher a Fenix Academy?
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Metodologia Comprovada</h4>
                                        <p className="text-gray-600">Nossa metodologia já formou milhares de profissionais de sucesso.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Instrutores Especialistas</h4>
                                        <p className="text-gray-600">Professores com vasta experiência no mercado de trabalho.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Suporte Personalizado</h4>
                                        <p className="text-gray-600">Acompanhamento individual durante todo o processo de aprendizado.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Certificação Reconhecida</h4>
                                        <p className="text-gray-600">Certificados aceitos pelo mercado e empresas parceiras.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedComponent>

                        <AnimatedComponent
                            animation="slideRight"
                            duration={0.8}
                            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
                        >
                            <h3 className="text-2xl font-bold mb-6">Nossa Visão</h3>
                            <p className="text-lg leading-relaxed mb-6">
                                Ser a principal referência em educação tecnológica no Brasil,
                                formando profissionais que transformam o futuro digital.
                            </p>
                            <div className="flex items-center">
                                <Heart className="w-6 h-6 mr-2" />
                                <span className="text-lg font-semibold">Educação que transforma vidas</span>
                            </div>
                        </AnimatedComponent>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                            Nossos Valores
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Os princípios que guiam nossa missão de transformar vidas através da educação
                        </p>
                    </AnimatedComponent>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <AnimatedComponent
                                key={value.title}
                                animation="slideUp"
                                duration={0.5}
                                delay={index * 0.1}
                                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex justify-center mb-4">
                                    <value.icon className={`w-12 h-12 ${value.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </AnimatedComponent>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                            Nossa Equipe
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Conheça os especialistas que fazem a Fenix Academy acontecer
                        </p>
                    </AnimatedComponent>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <AnimatedComponent
                                key={member.name}
                                animation="slideUp"
                                duration={0.5}
                                delay={index * 0.1}
                                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-blue-600 font-semibold mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    {member.bio}
                                </p>
                            </AnimatedComponent>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            Junte-se à Nossa Comunidade
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Faça parte da transformação digital e comece sua jornada de sucesso hoje mesmo
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/courses"
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Ver Cursos
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                Fale Conosco
                            </Link>
                        </div>
                    </AnimatedComponent>
                </div>
            </section>
        </div>
    );
} 