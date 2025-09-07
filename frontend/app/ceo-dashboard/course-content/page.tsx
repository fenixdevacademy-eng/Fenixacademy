'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigationConfig } from '../../navigation-config';

interface CourseModule {
    id: number;
    title: string;
    description: string;
    lessons: number;
    duration: string;
}

interface CourseContent {
    id: number;
    title: string;
    slug: string;
    category: string;
    totalLessons: number;
    totalModules: number;
    duration: string;
    modules: CourseModule[];
}

export default function CourseContentPage() {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

    const toggleModule = (courseId: number, moduleId: number) => {
        const key = courseId * 1000 + moduleId;
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(key)) {
            newExpanded.delete(key);
        } else {
            newExpanded.add(key);
        }
        setExpandedModules(newExpanded);
    };

    const coursesContent: CourseContent[] = [
        {
            id: 1,
            title: 'Fundamentos de Desenvolvimento Web',
            slug: 'fundamentos-desenvolvimento-web',
            category: 'Desenvolvimento Web',
            totalLessons: 72,
            totalModules: 4,
            duration: '70h',
            modules: [
                {
                    id: 1,
                    title: 'Introdução ao Desenvolvimento Web',
                    description: 'Conceitos básicos e história da web',
                    lessons: 4,
                    duration: '4h'
                },
                {
                    id: 2,
                    title: 'HTML Básico',
                    description: 'Estrutura e tags HTML fundamentais',
                    lessons: 4,
                    duration: '4h'
                },
                {
                    id: 3,
                    title: 'CSS e Estilização',
                    description: 'Estilização e layout responsivo',
                    lessons: 5,
                    duration: '10h'
                },
                {
                    id: 4,
                    title: 'JavaScript para Iniciantes',
                    description: 'Programação básica com JavaScript',
                    lessons: 6,
                    duration: '12h'
                }
            ]
        },
        {
            id: 2,
            title: 'Python Data Science',
            slug: 'python-data-science',
            category: 'Data Science',
            totalLessons: 600,
            totalModules: 30,
            duration: '160h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos do Python',
                    description: 'Sintaxe básica e estruturas de dados',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Manipulação de Dados',
                    description: 'Pandas, NumPy e análise exploratória',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Visualização de Dados',
                    description: 'Matplotlib, Seaborn e dashboards',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Machine Learning Básico',
                    description: 'Algoritmos de ML e scikit-learn',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 3,
            title: 'React Avançado',
            slug: 'react-avancado',
            category: 'Frontend',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos do React',
                    description: 'Componentes, props e estado',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Hooks Avançados',
                    description: 'useEffect, useContext, useReducer',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Gerenciamento de Estado',
                    description: 'Redux, Zustand e Context API',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Performance e Otimização',
                    description: 'Memo, useMemo e React.memo',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 4,
            title: 'Node.js Backend Development',
            slug: 'nodejs-backend-development',
            category: 'Backend',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos do Node.js',
                    description: 'Runtime, módulos e NPM',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Express.js Framework',
                    description: 'Rotas, middleware e controllers',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Banco de Dados',
                    description: 'MongoDB, PostgreSQL e ORMs',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'APIs RESTful',
                    description: 'Design de APIs e documentação',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 5,
            title: 'Machine Learning com Python',
            slug: 'machine-learning-python',
            category: 'Data Science',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos de ML',
                    description: 'Conceitos básicos e tipos de aprendizado',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Algoritmos Supervisionados',
                    description: 'Classificação e regressão',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Algoritmos Não Supervisionados',
                    description: 'Clustering e redução de dimensionalidade',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Deep Learning',
                    description: 'Redes neurais e TensorFlow/PyTorch',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 6,
            title: 'Desenvolvimento Mobile',
            slug: 'desenvolvimento-mobile',
            category: 'Mobile',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos Mobile',
                    description: 'Conceitos e plataformas',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'React Native',
                    description: 'Desenvolvimento cross-platform',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Flutter',
                    description: 'Framework Google para mobile',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Publicação e Deploy',
                    description: 'App Store e Google Play',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 7,
            title: 'Cybersecurity e Ethical Hacking',
            slug: 'cybersecurity-ethical-hacking',
            category: 'Segurança',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos de Segurança',
                    description: 'Conceitos básicos de cibersegurança',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Análise de Vulnerabilidades',
                    description: 'Identificação e exploração',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Penetration Testing',
                    description: 'Testes de penetração éticos',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Defesa e Mitigação',
                    description: 'Proteção e resposta a incidentes',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 8,
            title: 'DevOps e CI/CD',
            slug: 'devops-cicd',
            category: 'DevOps',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos DevOps',
                    description: 'Cultura e práticas DevOps',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Docker e Containers',
                    description: 'Containerização e orquestração',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'CI/CD Pipelines',
                    description: 'Integração e entrega contínua',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Monitoramento e Observabilidade',
                    description: 'Logs, métricas e alertas',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 9,
            title: 'Flutter Mobile Development',
            slug: 'flutter-mobile',
            category: 'Mobile',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos do Flutter',
                    description: 'Dart e widgets básicos',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Widgets Avançados',
                    description: 'Custom widgets e layouts',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Estado e Gerenciamento',
                    description: 'Provider, Bloc e Riverpod',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Integração com APIs',
                    description: 'HTTP, WebSockets e Firebase',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 10,
            title: 'AWS Cloud',
            slug: 'aws-cloud',
            category: 'Cloud',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos AWS',
                    description: 'Conceitos básicos de cloud computing',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Serviços de Computação',
                    description: 'EC2, Lambda e ECS',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Serviços de Armazenamento',
                    description: 'S3, EBS e RDS',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Segurança e IAM',
                    description: 'Controle de acesso e compliance',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 11,
            title: 'Blockchain e Smart Contracts',
            slug: 'blockchain-smart-contracts',
            category: 'Blockchain',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos Blockchain',
                    description: 'Conceitos e arquitetura',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Ethereum e Solidity',
                    description: 'Plataforma e linguagem',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Smart Contracts',
                    description: 'Desenvolvimento e deploy',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'DeFi e Tokens',
                    description: 'Finanças descentralizadas',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 12,
            title: 'React Native Mobile Development',
            slug: 'react-native-mobile',
            category: 'Mobile',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos React Native',
                    description: 'Componentes nativos e bridge',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Navegação e Roteamento',
                    description: 'React Navigation e deep linking',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'APIs e Networking',
                    description: 'HTTP, WebSockets e push notifications',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Performance e Otimização',
                    description: 'Bundle splitting e lazy loading',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 13,
            title: 'Data Engineering',
            slug: 'data-engineering',
            category: 'Data Science',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos Data Engineering',
                    description: 'Conceitos e arquitetura de dados',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Big Data e Processamento',
                    description: 'Hadoop, Spark e processamento distribuído',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Data Pipelines',
                    description: 'ETL, ELT e orquestração',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Data Quality e Governance',
                    description: 'Qualidade, lineage e compliance',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        },
        {
            id: 14,
            title: 'Game Development',
            slug: 'game-development',
            category: 'Game Development',
            totalLessons: 600,
            totalModules: 30,
            duration: '430h',
            modules: [
                {
                    id: 1,
                    title: 'Fundamentos Game Development',
                    description: 'Conceitos e game design',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 2,
                    title: 'Unity Engine',
                    description: 'Editor, componentes e scripting',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 3,
                    title: 'Unreal Engine',
                    description: 'Blueprint e C++ para jogos',
                    lessons: 20,
                    duration: '20h'
                },
                {
                    id: 4,
                    title: 'Game Mechanics',
                    description: 'Física, IA e multiplayer',
                    lessons: 20,
                    duration: '20h'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        📚 Conteúdo dos Cursos - Fenix Academy
                    </h1>
                    <p className="text-xl text-purple-200 mb-6">
                        Visualize o conteúdo detalhado de todos os 14 cursos expandidos
                    </p>
                    <div className="flex justify-center space-x-4 mb-6">
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                            ✅ 14 Cursos Disponíveis
                        </div>
                        <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                            ✅ 7.200+ Aulas
                        </div>
                        <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium">
                            ✅ 4.000+ Horas
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {coursesContent.map((course) => (
                        <div
                            key={course.id}
                            className={`bg-white rounded-xl shadow-2xl overflow-hidden transition-all ${selectedCourse === course.id ? 'ring-4 ring-purple-500' : ''
                                }`}
                        >
                            {/* Header do Curso */}
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                                        <div className="flex items-center space-x-4 text-purple-100">
                                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                                {course.category}
                                            </span>
                                            <span className="text-sm">
                                                📚 {course.totalModules} módulos
                                            </span>
                                            <span className="text-sm">
                                                🎯 {course.totalLessons} aulas
                                            </span>
                                            <span className="text-sm">
                                                ⏰ {course.duration}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-4xl font-bold text-purple-200">
                                            {course.id}
                                        </div>
                                        <Link
                                            href={navigationConfig.getRedirectUrl(course.id)}
                                            className="inline-block mt-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                                        >
                                            🔄 Acessar Curso
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Módulos do Curso */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    📖 Módulos Disponíveis
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.modules.map((module) => {
                                        const isExpanded = expandedModules.has(course.id * 1000 + module.id);
                                        return (
                                            <div
                                                key={module.id}
                                                className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-semibold text-gray-900">
                                                        Módulo {module.id}: {module.title}
                                                    </h4>
                                                    <button
                                                        onClick={() => toggleModule(course.id, module.id)}
                                                        className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                                    >
                                                        {isExpanded ? '🔽 Recolher' : '▶️ Expandir'}
                                                    </button>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-2">
                                                    {module.description}
                                                </p>
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <span>📚 {module.lessons} aulas</span>
                                                    <span>⏰ {module.duration}</span>
                                                </div>

                                                {isExpanded && (
                                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                                        <div className="text-xs text-gray-600">
                                                            <p><strong>Conteúdo Detalhado:</strong></p>
                                                            <p>Este módulo contém {module.lessons} aulas práticas e teóricas,
                                                                totalizando {module.duration} de conteúdo de alta qualidade.</p>
                                                            <p className="mt-2 text-purple-600">
                                                                💡 <strong>Dica:</strong> Cada aula inclui exercícios práticos,
                                                                projetos e recursos adicionais para maximizar o aprendizado.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {course.totalModules > 4 && (
                                    <div className="mt-4 text-center">
                                        <div className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                                            🔄 +{course.totalModules - 4} módulos adicionais disponíveis no curso completo
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/ceo-dashboard"
                        className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-purple-900 font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl"
                    >
                        👑 Voltar ao Dashboard do CEO
                    </Link>
                </div>

                <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        📊 Resumo do Conteúdo da Plataforma
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h3 className="font-bold text-xl mb-2">Estatísticas Gerais</h3>
                            <ul className="space-y-1 text-purple-200">
                                <li>• Total de cursos: 14</li>
                                <li>• Total de módulos: 420+</li>
                                <li>• Total de aulas: 7.200+</li>
                                <li>• Horas de conteúdo: 4.000+</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-xl mb-2">Categorias</h3>
                            <ul className="space-y-1 text-purple-200">
                                <li>• Desenvolvimento Web</li>
                                <li>• Data Science</li>
                                <li>• Frontend & Backend</li>
                                <li>• Mobile & Cloud</li>
                                <li>• Segurança & DevOps</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-xl mb-2">Recursos</h3>
                            <ul className="space-y-1 text-purple-200">
                                <li>• Aulas práticas e teóricas</li>
                                <li>• Projetos hands-on</li>
                                <li>• Exercícios interativos</li>
                                <li>• Certificados de conclusão</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
