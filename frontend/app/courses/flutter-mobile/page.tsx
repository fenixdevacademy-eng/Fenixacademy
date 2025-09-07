'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, PlayIcon, ClockIcon, UserIcon, StarIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Lesson {
    id: number;
    title: string;
    duration: string;
    videoUrl: string;
    transcript: string;
    resources: string[];
    exercises: string[];
}

interface Module {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
    duration: string;
    isExpanded: boolean;
}

interface CourseContent {
    id: number;
    title: string;
    description: string;
    instructor: string;
    level: string;
    duration: string;
    students: number;
    rating: number;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    lessons: number;
    certificate: boolean;
    discount: number;
    modules: Module[];
    whatYouWillLearn: string[];
    requirements: string[];
}

const FlutterMobilePage: React.FC = () => {
    const [expandedModules, setExpandedModules] = useState<number[]>([1]);

    const courseData: CourseContent = {
        id: 10,
        title: "Flutter Mobile Development",
        description: "Aprenda a criar aplicativos móveis nativos para iOS e Android usando Flutter. Desenvolva apps modernos com interface única e performance excepcional.",
        instructor: "Ana Costa",
        level: "Intermediário",
        duration: "12 semanas",
        students: 2847,
        rating: 4.8,
        price: 297.00,
        originalPrice: 497.00,
        image: "/images/courses/flutter-mobile.jpg",
        category: "Mobile Development",
        lessons: 48,
        certificate: true,
        discount: 40,
        modules: [
            {
                id: 1,
                title: "Fundamentos do Flutter",
                description: "Introdução ao Flutter e configuração do ambiente de desenvolvimento",
                duration: "2 semanas",
                isExpanded: true,
                lessons: [
                    {
                        id: 1,
                        title: "O que é Flutter e por que usar?",
                        duration: "45 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-intro",
                        transcript: "Nesta aula, vamos entender o que é Flutter, suas vantagens e por que é uma excelente escolha para desenvolvimento mobile.",
                        resources: ["Flutter SDK", "Dart Language Guide", "Flutter Documentation"],
                        exercises: ["Instalar Flutter SDK", "Configurar IDE", "Criar primeiro projeto"]
                    },
                    {
                        id: 2,
                        title: "Configuração do ambiente de desenvolvimento",
                        duration: "60 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-setup",
                        transcript: "Aprenda a configurar o ambiente de desenvolvimento Flutter no Windows, macOS e Linux.",
                        resources: ["Flutter Installation Guide", "VS Code Extensions", "Android Studio Setup"],
                        exercises: ["Instalar Android Studio", "Configurar emulador", "Testar instalação"]
                    },
                    {
                        id: 3,
                        title: "Primeiro app Flutter - Hello World",
                        duration: "30 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-hello",
                        transcript: "Crie seu primeiro aplicativo Flutter e entenda a estrutura básica do projeto.",
                        resources: ["Flutter Project Structure", "Dart Basics", "Widgets Introduction"],
                        exercises: ["Criar projeto Flutter", "Modificar texto", "Adicionar botão"]
                    }
                ]
            },
            {
                id: 2,
                title: "Widgets e Interface do Usuário",
                description: "Aprenda sobre widgets, layout e criação de interfaces",
                duration: "3 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 4,
                        title: "Widgets Stateless vs Stateful",
                        duration: "50 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-widgets",
                        transcript: "Entenda a diferença entre widgets stateless e stateful, e quando usar cada um.",
                        resources: ["Widget Lifecycle", "State Management", "Performance Tips"],
                        exercises: ["Criar widget stateless", "Converter para stateful", "Gerenciar estado"]
                    },
                    {
                        id: 5,
                        title: "Layout e posicionamento",
                        duration: "55 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-layout",
                        transcript: "Aprenda sobre Row, Column, Stack e outros widgets de layout.",
                        resources: ["Layout Widgets", "Flexbox in Flutter", "Responsive Design"],
                        exercises: ["Criar layout responsivo", "Usar Row e Column", "Implementar Stack"]
                    },
                    {
                        id: 6,
                        title: "Navegação entre telas",
                        duration: "40 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-navigation",
                        transcript: "Implemente navegação entre telas usando Navigator e rotas nomeadas.",
                        resources: ["Navigation Guide", "Route Management", "Deep Linking"],
                        exercises: ["Criar múltiplas telas", "Implementar navegação", "Adicionar rotas nomeadas"]
                    }
                ]
            },
            {
                id: 3,
                title: "Gerenciamento de Estado",
                description: "Aprenda sobre Provider, Bloc e outros padrões de estado",
                duration: "2 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 7,
                        title: "Provider Pattern",
                        duration: "65 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-provider",
                        transcript: "Implemente gerenciamento de estado usando o padrão Provider.",
                        resources: ["Provider Package", "State Management Guide", "Best Practices"],
                        exercises: ["Configurar Provider", "Criar ChangeNotifier", "Consumir estado"]
                    },
                    {
                        id: 8,
                        title: "Bloc Pattern",
                        duration: "70 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-bloc",
                        transcript: "Aprenda sobre o padrão Bloc para gerenciamento de estado complexo.",
                        resources: ["Bloc Library", "Event-Driven Architecture", "Testing Bloc"],
                        exercises: ["Implementar Bloc", "Criar Events e States", "Testar Bloc"]
                    }
                ]
            },
            {
                id: 4,
                title: "Integração com APIs",
                description: "Conecte seu app com APIs REST e serviços externos",
                duration: "2 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 9,
                        title: "HTTP e requisições",
                        duration: "45 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-http",
                        transcript: "Aprenda a fazer requisições HTTP usando http package e Dio.",
                        resources: ["HTTP Package", "Dio Package", "API Integration"],
                        exercises: ["Fazer requisição GET", "Implementar POST", "Tratar erros"]
                    },
                    {
                        id: 10,
                        title: "JSON parsing e serialização",
                        duration: "40 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-json",
                        transcript: "Trabalhe com JSON data usando json_serializable e json_annotation.",
                        resources: ["JSON Serialization", "Model Classes", "Type Safety"],
                        exercises: ["Criar model classes", "Implementar serialização", "Parsing JSON"]
                    }
                ]
            },
            {
                id: 5,
                title: "Persistência de Dados",
                description: "Aprenda sobre SharedPreferences, SQLite e Hive",
                duration: "2 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 11,
                        title: "SharedPreferences",
                        duration: "35 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-preferences",
                        transcript: "Armazene dados simples usando SharedPreferences.",
                        resources: ["SharedPreferences Guide", "Local Storage", "Settings Management"],
                        exercises: ["Salvar configurações", "Ler dados salvos", "Implementar cache"]
                    },
                    {
                        id: 12,
                        title: "SQLite com sqflite",
                        duration: "50 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-sqlite",
                        transcript: "Implemente banco de dados local usando SQLite.",
                        resources: ["Sqflite Package", "Database Design", "CRUD Operations"],
                        exercises: ["Criar tabelas", "Implementar CRUD", "Consultas complexas"]
                    }
                ]
            },
            {
                id: 6,
                title: "Publicação e Deploy",
                description: "Prepare seu app para publicação nas lojas",
                duration: "1 semana",
                isExpanded: false,
                lessons: [
                    {
                        id: 13,
                        title: "Build para Android",
                        duration: "45 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-android-build",
                        transcript: "Configure e gere APK/AAB para publicação no Google Play.",
                        resources: ["Android Build Guide", "Signing APK", "Play Console"],
                        exercises: ["Configurar signing", "Gerar APK", "Testar em dispositivo"]
                    },
                    {
                        id: 14,
                        title: "Build para iOS",
                        duration: "50 min",
                        videoUrl: "https://www.youtube.com/watch?v=flutter-ios-build",
                        transcript: "Configure e gere IPA para publicação na App Store.",
                        resources: ["iOS Build Guide", "Apple Developer", "App Store Connect"],
                        exercises: ["Configurar certificados", "Gerar IPA", "Upload para TestFlight"]
                    }
                ]
            }
        ],
        whatYouWillLearn: [
            "Criar aplicativos móveis nativos para iOS e Android",
            "Dominar widgets e interface do usuário",
            "Implementar gerenciamento de estado eficiente",
            "Integrar APIs REST e serviços externos",
            "Persistir dados localmente",
            "Publicar apps nas lojas oficiais",
            "Implementar navegação e rotas",
            "Trabalhar com animações e transições"
        ],
        requirements: [
            "Conhecimento básico de programação",
            "Familiaridade com conceitos de OOP",
            "Computador com Windows, macOS ou Linux",
            "Conexão com internet estável",
            "Dispositivo Android ou iOS para testes"
        ]
    };

    const toggleModule = (moduleId: number) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {courseData.title}
                            </h1>
                            <p className="text-xl mb-6 text-blue-100">
                                {courseData.description}
                            </p>
                            <div className="flex items-center space-x-6 mb-6">
                                <div className="flex items-center">
                                    <UserIcon className="w-5 h-5 mr-2" />
                                    <span>{courseData.instructor}</span>
                                </div>
                                <div className="flex items-center">
                                    <ClockIcon className="w-5 h-5 mr-2" />
                                    <span>{courseData.duration}</span>
                                </div>
                                <div className="flex items-center">
                                    <StarIcon className="w-5 h-5 mr-2" />
                                    <span>{courseData.rating}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-3xl font-bold">R$ {courseData.price}</span>
                                <span className="text-xl line-through text-blue-200">R$ {courseData.originalPrice}</span>
                                <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-semibold">
                                    {courseData.discount}% OFF
                                </span>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src={courseData.image}
                                alt={courseData.title}
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Course Overview */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-4">Visão Geral do Curso</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-2">Informações do Curso</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• {courseData.lessons} aulas</li>
                                        <li>• {courseData.duration} de duração</li>
                                        <li>• Nível: {courseData.level}</li>
                                        <li>• {courseData.students.toLocaleString()} alunos matriculados</li>
                                        <li>• {courseData.certificate ? 'Certificado incluído' : 'Sem certificado'}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Categoria</h3>
                                    <p className="text-gray-600">{courseData.category}</p>
                                </div>
                            </div>
                        </div>

                        {/* Course Content */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-6">Conteúdo do Curso</h2>
                            <div className="space-y-4">
                                {courseData.modules.map((module) => (
                                    <div key={module.id} className="border rounded-lg">
                                        <button
                                            onClick={() => toggleModule(module.id)}
                                            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                                        >
                                            <div>
                                                <h3 className="font-semibold text-lg">{module.title}</h3>
                                                <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                                    <ClockIcon className="w-4 h-4 mr-1" />
                                                    <span>{module.duration}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{module.lessons.length} aulas</span>
                                                </div>
                                            </div>
                                            {expandedModules.includes(module.id) ? (
                                                <ChevronDownIcon className="w-5 h-5" />
                                            ) : (
                                                <ChevronRightIcon className="w-5 h-5" />
                                            )}
                                        </button>

                                        {expandedModules.includes(module.id) && (
                                            <div className="border-t bg-gray-50">
                                                {module.lessons.map((lesson) => (
                                                    <div key={lesson.id} className="p-4 border-b last:border-b-0">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <PlayIcon className="w-4 h-4 mr-3 text-blue-600" />
                                                                <div>
                                                                    <h4 className="font-medium">{lesson.title}</h4>
                                                                    <p className="text-sm text-gray-600 mt-1">{lesson.duration}</p>
                                                                </div>
                                                            </div>
                                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                                Assistir
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What You Will Learn */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-4">O que você vai aprender</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {courseData.whatYouWillLearn.map((item, index) => (
                                    <div key={index} className="flex items-start">
                                        <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-4">Requisitos</h2>
                            <ul className="space-y-2">
                                {courseData.requirements.map((requirement, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckIcon className="w-4 h-4 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{requirement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Course Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                            <div className="text-center mb-6">
                                <img
                                    src={courseData.image}
                                    alt={courseData.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <div className="flex items-center justify-center space-x-4 mb-4">
                                    <span className="text-3xl font-bold text-green-600">R$ {courseData.price}</span>
                                    <span className="text-xl line-through text-gray-400">R$ {courseData.originalPrice}</span>
                                </div>
                                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                    {courseData.discount}% de desconto
                                </span>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                                Matricular-se Agora
                            </button>

                            <div className="text-center text-sm text-gray-600">
                                <p>30 dias de garantia</p>
                                <p>Acesso vitalício</p>
                                <p>Certificado incluído</p>
                            </div>
                        </div>

                        {/* Instructor */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold mb-4">Sobre a Instrutora</h3>
                            <div className="text-center">
                                <img
                                    src="/images/instructors/ana-costa.jpg"
                                    alt="Ana Costa"
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h4 className="font-semibold text-lg">{courseData.instructor}</h4>
                                <p className="text-gray-600 text-sm">
                                    Desenvolvedora mobile experiente com mais de 5 anos criando apps Flutter.
                                    Especialista em UI/UX e arquitetura de aplicações móveis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlutterMobilePage; 