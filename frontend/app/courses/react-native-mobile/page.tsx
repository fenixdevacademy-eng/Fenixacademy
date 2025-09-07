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

const ReactNativeMobilePage: React.FC = () => {
    const [expandedModules, setExpandedModules] = useState<number[]>([1]);

    const courseData: CourseContent = {
        id: 11,
        title: "React Native Mobile Development",
        description: "Desenvolva aplicativos móveis nativos para iOS e Android usando React Native. Crie apps modernos com JavaScript/TypeScript e performance nativa.",
        instructor: "Carlos Mendes",
        level: "Intermediário",
        duration: "14 semanas",
        students: 3125,
        rating: 4.7,
        price: 327.00,
        originalPrice: 547.00,
        image: "/images/courses/react-native-mobile.jpg",
        category: "Mobile Development",
        lessons: 52,
        certificate: true,
        discount: 40,
        modules: [
            {
                id: 1,
                title: "Fundamentos do React Native",
                description: "Introdução ao React Native e configuração do ambiente de desenvolvimento",
                duration: "2 semanas",
                isExpanded: true,
                lessons: [
                    {
                        id: 1,
                        title: "O que é React Native e suas vantagens",
                        duration: "50 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-intro",
                        transcript: "Entenda o que é React Native, suas vantagens sobre outras tecnologias e quando usar.",
                        resources: ["React Native Documentation", "JavaScript ES6+", "React Fundamentals"],
                        exercises: ["Instalar Node.js", "Configurar React Native CLI", "Criar primeiro projeto"]
                    },
                    {
                        id: 2,
                        title: "Configuração do ambiente de desenvolvimento",
                        duration: "70 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-setup",
                        transcript: "Configure o ambiente de desenvolvimento para iOS e Android no Windows, macOS e Linux.",
                        resources: ["React Native CLI", "Android Studio", "Xcode (macOS)", "Metro Bundler"],
                        exercises: ["Instalar dependências", "Configurar emuladores", "Testar Hello World"]
                    },
                    {
                        id: 3,
                        title: "Estrutura de um projeto React Native",
                        duration: "40 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-structure",
                        transcript: "Entenda a estrutura de pastas e arquivos de um projeto React Native.",
                        resources: ["Project Structure Guide", "App.js", "Package.json", "Metro Config"],
                        exercises: ["Explorar estrutura", "Modificar App.js", "Adicionar dependência"]
                    }
                ]
            },
            {
                id: 2,
                title: "Componentes e Navegação",
                description: "Aprenda sobre componentes nativos e navegação entre telas",
                duration: "3 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 4,
                        title: "Componentes básicos do React Native",
                        duration: "60 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-components",
                        transcript: "Aprenda sobre View, Text, Image, ScrollView e outros componentes básicos.",
                        resources: ["Core Components", "Component API", "Styling Guide"],
                        exercises: ["Criar layout básico", "Estilizar componentes", "Usar ScrollView"]
                    },
                    {
                        id: 5,
                        title: "React Navigation v6",
                        duration: "80 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-navigation",
                        transcript: "Implemente navegação entre telas usando React Navigation v6.",
                        resources: ["React Navigation Docs", "Navigation Types", "Screen Options"],
                        exercises: ["Instalar React Navigation", "Criar stack navigator", "Implementar navegação"]
                    },
                    {
                        id: 6,
                        title: "Tab Navigation e Drawer Navigation",
                        duration: "65 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-tabs",
                        transcript: "Implemente navegação por abas e menu lateral.",
                        resources: ["Tab Navigator", "Drawer Navigator", "Custom Tabs"],
                        exercises: ["Criar tab navigation", "Implementar drawer", "Customizar ícones"]
                    }
                ]
            },
            {
                id: 3,
                title: "Estados e Hooks",
                description: "Gerenciamento de estado usando useState, useEffect e outros hooks",
                duration: "2 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 7,
                        title: "useState e useEffect",
                        duration: "55 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-hooks",
                        transcript: "Aprenda a usar useState para gerenciar estado local e useEffect para side effects.",
                        resources: ["React Hooks Guide", "State Management", "Lifecycle Methods"],
                        exercises: ["Implementar contador", "Usar useEffect", "Gerenciar estado"]
                    },
                    {
                        id: 8,
                        title: "useContext e useReducer",
                        duration: "70 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-context",
                        transcript: "Implemente gerenciamento de estado global usando Context API e useReducer.",
                        resources: ["Context API", "useReducer Hook", "State Patterns"],
                        exercises: ["Criar context", "Implementar reducer", "Consumir context"]
                    }
                ]
            },
            {
                id: 4,
                title: "APIs e Integração",
                description: "Conecte seu app com APIs REST e serviços externos",
                duration: "2 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 9,
                        title: "Fetch API e Axios",
                        duration: "50 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-fetch",
                        transcript: "Faça requisições HTTP usando Fetch API e Axios.",
                        resources: ["Fetch API", "Axios Library", "Error Handling"],
                        exercises: ["Fazer requisição GET", "Implementar POST", "Tratar erros"]
                    },
                    {
                        id: 10,
                        title: "AsyncStorage e persistência local",
                        duration: "45 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-storage",
                        transcript: "Armazene dados localmente usando AsyncStorage.",
                        resources: ["AsyncStorage API", "Data Persistence", "Local Storage"],
                        exercises: ["Salvar dados", "Ler dados", "Implementar cache"]
                    }
                ]
            },
            {
                id: 5,
                title: "Componentes Nativos",
                description: "Aprenda sobre componentes específicos de cada plataforma",
                duration: "2 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 11,
                        title: "Platform-specific code",
                        duration: "40 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-platform",
                        transcript: "Escreva código específico para iOS e Android usando Platform API.",
                        resources: ["Platform API", "Platform-specific Files", "Conditional Rendering"],
                        exercises: ["Usar Platform.OS", "Criar arquivos específicos", "Implementar condicionais"]
                    },
                    {
                        id: 12,
                        title: "Native Modules",
                        duration: "90 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-modules",
                        transcript: "Crie e use módulos nativos para funcionalidades específicas da plataforma.",
                        resources: ["Native Modules Guide", "Linking Libraries", "Custom Modules"],
                        exercises: ["Instalar módulo nativo", "Linkar biblioteca", "Criar módulo customizado"]
                    }
                ]
            },
            {
                id: 6,
                title: "Performance e Otimização",
                description: "Técnicas para melhorar a performance do seu app",
                duration: "2 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 13,
                        title: "FlatList e Virtualization",
                        duration: "60 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-performance",
                        transcript: "Use FlatList para renderizar listas grandes com performance otimizada.",
                        resources: ["FlatList API", "Virtualization", "Performance Tips"],
                        exercises: ["Implementar FlatList", "Otimizar renderização", "Usar virtualization"]
                    },
                    {
                        id: 14,
                        title: "Debugging e Profiling",
                        duration: "50 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-debug",
                        transcript: "Use ferramentas de debugging e profiling para identificar problemas de performance.",
                        resources: ["React Native Debugger", "Flipper", "Performance Monitor"],
                        exercises: ["Configurar debugger", "Usar Flipper", "Analisar performance"]
                    }
                ]
            },
            {
                id: 7,
                title: "Deploy e Publicação",
                description: "Prepare seu app para publicação nas lojas",
                duration: "1 semana",
                isExpanded: false,
                lessons: [
                    {
                        id: 15,
                        title: "Build para produção",
                        duration: "55 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-build",
                        transcript: "Configure e gere builds de produção para Android e iOS.",
                        resources: ["Build Configuration", "Signing APK", "App Store Guidelines"],
                        exercises: ["Configurar signing", "Gerar APK/AAB", "Testar build"]
                    },
                    {
                        id: 16,
                        title: "CodePush e atualizações OTA",
                        duration: "45 min",
                        videoUrl: "https://www.youtube.com/watch?v=react-native-codepush",
                        transcript: "Implemente atualizações over-the-air usando Microsoft CodePush.",
                        resources: ["CodePush Documentation", "OTA Updates", "Release Management"],
                        exercises: ["Configurar CodePush", "Implementar OTA", "Gerenciar releases"]
                    }
                ]
            }
        ],
        whatYouWillLearn: [
            "Criar aplicativos móveis nativos para iOS e Android",
            "Dominar componentes e navegação do React Native",
            "Implementar gerenciamento de estado eficiente",
            "Integrar APIs REST e serviços externos",
            "Usar componentes específicos de cada plataforma",
            "Otimizar performance e debugging",
            "Publicar apps nas lojas oficiais",
            "Implementar atualizações over-the-air"
        ],
        requirements: [
            "Conhecimento sólido de JavaScript/TypeScript",
            "Familiaridade com React (componentes, props, state)",
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
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
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
                            <h3 className="text-xl font-bold mb-4">Sobre o Instrutor</h3>
                            <div className="text-center">
                                <img
                                    src="/images/instructors/carlos-mendes.jpg"
                                    alt="Carlos Mendes"
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h4 className="font-semibold text-lg">{courseData.instructor}</h4>
                                <p className="text-gray-600 text-sm">
                                    Desenvolvedor mobile experiente com mais de 6 anos criando apps React Native.
                                    Especialista em performance e arquitetura de aplicações móveis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReactNativeMobilePage; 