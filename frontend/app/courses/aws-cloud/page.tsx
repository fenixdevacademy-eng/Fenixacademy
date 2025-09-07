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

const AwsCloudPage: React.FC = () => {
    const [expandedModules, setExpandedModules] = useState<number[]>([1]);

    const courseData: CourseContent = {
        id: 12,
        title: "AWS Cloud Computing",
        description: "Domine a Amazon Web Services e aprenda a arquitetar, implementar e gerenciar soluções na nuvem. Prepare-se para certificações AWS.",
        instructor: "Roberto Silva",
        level: "Avançado",
        duration: "16 semanas",
        students: 1893,
        rating: 4.9,
        price: 397.00,
        originalPrice: 697.00,
        image: "/images/courses/aws-cloud.jpg",
        category: "Cloud Computing",
        lessons: 64,
        certificate: true,
        discount: 43,
        modules: [
            {
                id: 1,
                title: "Fundamentos da AWS",
                description: "Introdução à AWS e conceitos fundamentais de cloud computing",
                duration: "3 semanas",
                isExpanded: true,
                lessons: [
                    {
                        id: 1,
                        title: "Introdução ao Cloud Computing e AWS",
                        duration: "60 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-intro",
                        transcript: "Entenda o que é cloud computing, os benefícios da AWS e a estrutura global da plataforma.",
                        resources: ["AWS Documentation", "Cloud Computing Guide", "AWS Global Infrastructure"],
                        exercises: ["Criar conta AWS", "Explorar console", "Configurar billing alerts"]
                    },
                    {
                        id: 2,
                        title: "Regiões, Zonas de Disponibilidade e Edge Locations",
                        duration: "45 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-regions",
                        transcript: "Aprenda sobre a arquitetura global da AWS e como escolher a região ideal.",
                        resources: ["AWS Regions Guide", "Availability Zones", "Edge Locations"],
                        exercises: ["Identificar regiões", "Escolher região", "Configurar VPC"]
                    },
                    {
                        id: 3,
                        title: "IAM - Identity and Access Management",
                        duration: "75 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-iam",
                        transcript: "Configure usuários, grupos, roles e políticas de segurança na AWS.",
                        resources: ["IAM Documentation", "Security Best Practices", "Policy Examples"],
                        exercises: ["Criar usuário IAM", "Configurar grupos", "Implementar políticas"]
                    }
                ]
            },
            {
                id: 2,
                title: "Computação na Nuvem",
                description: "EC2, Lambda, ECS e outros serviços de computação",
                duration: "4 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 4,
                        title: "EC2 - Elastic Compute Cloud",
                        duration: "90 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-ec2",
                        transcript: "Crie e gerencie instâncias EC2, configure security groups e use key pairs.",
                        resources: ["EC2 Documentation", "Instance Types", "Security Groups"],
                        exercises: ["Lançar instância EC2", "Configurar security group", "Conectar via SSH"]
                    },
                    {
                        id: 5,
                        title: "Auto Scaling e Load Balancing",
                        duration: "80 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-autoscaling",
                        transcript: "Configure Auto Scaling Groups e Application Load Balancer para alta disponibilidade.",
                        resources: ["Auto Scaling Guide", "Load Balancer Types", "Scaling Policies"],
                        exercises: ["Criar Auto Scaling Group", "Configurar ALB", "Testar escalabilidade"]
                    },
                    {
                        id: 6,
                        title: "Lambda - Serverless Computing",
                        duration: "70 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-lambda",
                        transcript: "Desenvolva funções serverless usando AWS Lambda e API Gateway.",
                        resources: ["Lambda Documentation", "Serverless Architecture", "API Gateway"],
                        exercises: ["Criar função Lambda", "Configurar API Gateway", "Testar serverless"]
                    }
                ]
            },
            {
                id: 3,
                title: "Armazenamento e Banco de Dados",
                description: "S3, RDS, DynamoDB e outros serviços de armazenamento",
                duration: "3 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 7,
                        title: "S3 - Simple Storage Service",
                        duration: "85 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-s3",
                        transcript: "Configure buckets S3, configure versionamento e implemente backup.",
                        resources: ["S3 Documentation", "Bucket Policies", "Lifecycle Management"],
                        exercises: ["Criar bucket S3", "Configurar versionamento", "Implementar backup"]
                    },
                    {
                        id: 8,
                        title: "RDS - Relational Database Service",
                        duration: "75 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-rds",
                        transcript: "Configure bancos de dados relacionais gerenciados na AWS.",
                        resources: ["RDS Documentation", "Database Engines", "Multi-AZ Deployment"],
                        exercises: ["Criar instância RDS", "Configurar backup", "Implementar Multi-AZ"]
                    },
                    {
                        id: 9,
                        title: "DynamoDB - NoSQL Database",
                        duration: "65 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-dynamodb",
                        transcript: "Trabalhe com banco de dados NoSQL gerenciado da AWS.",
                        resources: ["DynamoDB Documentation", "NoSQL Design", "Global Tables"],
                        exercises: ["Criar tabela DynamoDB", "Implementar queries", "Configurar backup"]
                    }
                ]
            },
            {
                id: 4,
                title: "Rede e Segurança",
                description: "VPC, Security Groups, NACLs e outros serviços de rede",
                duration: "3 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 10,
                        title: "VPC - Virtual Private Cloud",
                        duration: "90 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-vpc",
                        transcript: "Configure redes privadas virtuais e subnets na AWS.",
                        resources: ["VPC Documentation", "Subnet Design", "Route Tables"],
                        exercises: ["Criar VPC", "Configurar subnets", "Implementar route tables"]
                    },
                    {
                        id: 11,
                        title: "Security Groups e NACLs",
                        duration: "60 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-security",
                        transcript: "Configure segurança de rede usando Security Groups e Network ACLs.",
                        resources: ["Security Groups Guide", "NACL Documentation", "Security Best Practices"],
                        exercises: ["Configurar Security Groups", "Implementar NACLs", "Testar conectividade"]
                    },
                    {
                        id: 12,
                        title: "CloudFront e Route 53",
                        duration: "70 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-cdn",
                        transcript: "Configure CDN e DNS gerenciado na AWS.",
                        resources: ["CloudFront Documentation", "Route 53 Guide", "CDN Optimization"],
                        exercises: ["Configurar CloudFront", "Implementar Route 53", "Otimizar performance"]
                    }
                ]
            },
            {
                id: 5,
                title: "Monitoramento e Logs",
                description: "CloudWatch, CloudTrail e outros serviços de monitoramento",
                duration: "2 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 13,
                        title: "CloudWatch - Monitoramento",
                        duration: "65 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-cloudwatch",
                        transcript: "Configure monitoramento, alertas e dashboards usando CloudWatch.",
                        resources: ["CloudWatch Documentation", "Metrics and Logs", "Alarms and Dashboards"],
                        exercises: ["Configurar métricas", "Criar alarmes", "Implementar dashboards"]
                    },
                    {
                        id: 14,
                        title: "CloudTrail e Config",
                        duration: "55 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-cloudtrail",
                        transcript: "Implemente auditoria e compliance usando CloudTrail e AWS Config.",
                        resources: ["CloudTrail Documentation", "AWS Config Guide", "Compliance Frameworks"],
                        exercises: ["Configurar CloudTrail", "Implementar AWS Config", "Auditar recursos"]
                    }
                ]
            },
            {
                id: 6,
                title: "DevOps e CI/CD",
                description: "CodePipeline, CodeBuild e outros serviços de DevOps",
                duration: "2 semanas",
                isExpanded: false,
                lessons: [
                    {
                        id: 15,
                        title: "CodePipeline e CodeBuild",
                        duration: "80 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-codepipeline",
                        transcript: "Configure pipelines de CI/CD usando AWS CodePipeline e CodeBuild.",
                        resources: ["CodePipeline Documentation", "CodeBuild Guide", "CI/CD Best Practices"],
                        exercises: ["Criar pipeline", "Configurar build", "Implementar deploy"]
                    },
                    {
                        id: 16,
                        title: "ECS e EKS - Containers",
                        duration: "90 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-containers",
                        transcript: "Trabalhe com containers usando ECS e Kubernetes na AWS.",
                        resources: ["ECS Documentation", "EKS Guide", "Container Orchestration"],
                        exercises: ["Criar cluster ECS", "Deploy containers", "Configurar EKS"]
                    }
                ]
            },
            {
                id: 7,
                title: "Preparação para Certificação",
                description: "Prepare-se para as certificações AWS",
                duration: "1 semana",
                isExpanded: false,
                lessons: [
                    {
                        id: 17,
                        title: "AWS Solutions Architect Associate",
                        duration: "120 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-certification",
                        transcript: "Prepare-se para a certificação AWS Solutions Architect Associate.",
                        resources: ["Certification Guide", "Practice Exams", "Study Materials"],
                        exercises: ["Simular exames", "Revisar tópicos", "Praticar cenários"]
                    },
                    {
                        id: 18,
                        title: "Projeto Final - Arquitetura Completa",
                        duration: "180 min",
                        videoUrl: "https://www.youtube.com/watch?v=aws-final-project",
                        transcript: "Implemente uma arquitetura completa usando todos os serviços aprendidos.",
                        resources: ["Architecture Patterns", "Best Practices", "Cost Optimization"],
                        exercises: ["Desenhar arquitetura", "Implementar solução", "Otimizar custos"]
                    }
                ]
            }
        ],
        whatYouWillLearn: [
            "Dominar os principais serviços da AWS",
            "Arquitetar soluções escaláveis na nuvem",
            "Implementar segurança e compliance",
            "Configurar monitoramento e alertas",
            "Automatizar deploy com CI/CD",
            "Otimizar custos e performance",
            "Preparar-se para certificações AWS",
            "Trabalhar com containers e serverless"
        ],
        requirements: [
            "Conhecimento básico de redes e sistemas",
            "Familiaridade com Linux e linha de comando",
            "Conceitos básicos de programação",
            "Computador com acesso à internet",
            "Disposição para aprender novas tecnologias"
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
            <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {courseData.title}
                            </h1>
                            <p className="text-xl mb-6 text-orange-100">
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
                                <span className="text-xl line-through text-orange-200">R$ {courseData.originalPrice}</span>
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
                                    src="/images/instructors/roberto-silva.jpg"
                                    alt="Roberto Silva"
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h4 className="font-semibold text-lg">{courseData.instructor}</h4>
                                <p className="text-gray-600 text-sm">
                                    Arquiteto de soluções AWS certificado com mais de 8 anos de experiência em cloud computing.
                                    Especialista em arquiteturas escaláveis e otimização de custos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AwsCloudPage; 