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

const CibersegurancaPage: React.FC = () => {
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);

  const courseData: CourseContent = {
    id: 14,
    title: "Cibersegurança e Ethical Hacking",
    description: "Aprenda técnicas de segurança da informação, pentesting e defesa cibernética. Prepare-se para certificações como CEH e CompTIA Security+.",
    instructor: "Pedro Almeida",
    level: "Avançado",
    duration: "20 semanas",
    students: 2156,
    rating: 4.9,
    price: 497.00,
    originalPrice: 847.00,
    image: "/images/courses/ciberseguranca.jpg",
    category: "Cybersecurity",
    lessons: 80,
    certificate: true,
    discount: 41,
    modules: [
      {
        id: 1,
        title: "Fundamentos de Cibersegurança",
        description: "Introdução aos conceitos básicos de segurança da informação",
        duration: "3 semanas",
        isExpanded: true,
        lessons: [
          {
            id: 1,
            title: "Introdução à Cibersegurança",
            duration: "70 min",
            videoUrl: "https://www.youtube.com/watch?v=cybersecurity-intro",
            transcript: "Entenda os fundamentos da segurança da informação, CIA triad e tipos de ameaças.",
            resources: ["CIA Triad", "Security Fundamentals", "Threat Landscape"],
            exercises: ["Identificar ameaças", "Classificar vulnerabilidades", "Analisar riscos"]
          },
          {
            id: 2,
            title: "Tipos de ataques e vulnerabilidades",
            duration: "85 min",
            videoUrl: "https://www.youtube.com/watch?v=attack-types",
            transcript: "Aprenda sobre diferentes tipos de ataques cibernéticos e vulnerabilidades comuns.",
            resources: ["OWASP Top 10", "Attack Vectors", "Vulnerability Database"],
            exercises: ["Categorizar ataques", "Identificar vulnerabilidades", "Analisar CVEs"]
          },
          {
            id: 3,
            title: "Legislação e compliance",
            duration: "60 min",
            videoUrl: "https://www.youtube.com/watch?v=cybersecurity-law",
            transcript: "Entenda as leis de proteção de dados e frameworks de compliance.",
            resources: ["LGPD", "GDPR", "ISO 27001", "NIST Framework"],
            exercises: ["Analisar LGPD", "Implementar controles", "Auditar compliance"]
          }
        ]
      },
      {
        id: 2,
        title: "Redes e Segurança de Infraestrutura",
        description: "Aprenda sobre segurança de redes e infraestrutura",
        duration: "4 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 4,
            title: "Protocolos de rede e segurança",
            duration: "90 min",
            videoUrl: "https://www.youtube.com/watch?v=network-security",
            transcript: "Entenda protocolos de rede, criptografia e segurança de comunicações.",
            resources: ["TCP/IP Security", "SSL/TLS", "VPN Technologies"],
            exercises: ["Configurar VPN", "Analisar tráfego", "Implementar SSL"]
          },
          {
            id: 5,
            title: "Firewalls e IDS/IPS",
            duration: "80 min",
            videoUrl: "https://www.youtube.com/watch?v=firewall-ids",
            transcript: "Configure firewalls e sistemas de detecção/prevenção de intrusão.",
            resources: ["Firewall Configuration", "IDS/IPS Setup", "Network Monitoring"],
            exercises: ["Configurar firewall", "Implementar IDS", "Monitorar tráfego"]
          },
          {
            id: 6,
            title: "Segurança wireless",
            duration: "75 min",
            videoUrl: "https://www.youtube.com/watch?v=wireless-security",
            transcript: "Aprenda sobre vulnerabilidades wireless e técnicas de proteção.",
            resources: ["WiFi Security", "WPA3", "Rogue Access Points"],
            exercises: ["Auditar redes WiFi", "Configurar WPA3", "Detectar rogues"]
          }
        ]
      },
      {
        id: 3,
        title: "Web Application Security",
        description: "Segurança de aplicações web e testes de penetração",
        duration: "4 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 7,
            title: "OWASP Top 10 e vulnerabilidades web",
            duration: "100 min",
            videoUrl: "https://www.youtube.com/watch?v=owasp-top10",
            transcript: "Aprenda sobre as principais vulnerabilidades web e como explorá-las.",
            resources: ["OWASP Top 10", "Web Vulnerabilities", "Exploitation Techniques"],
            exercises: ["Testar SQL Injection", "Explorar XSS", "Analisar CSRF"]
          },
          {
            id: 8,
            title: "Burp Suite e ferramentas de pentesting",
            duration: "85 min",
            videoUrl: "https://www.youtube.com/watch?v=burp-suite",
            transcript: "Use Burp Suite e outras ferramentas para testes de penetração web.",
            resources: ["Burp Suite Guide", "Web Testing Tools", "Proxy Configuration"],
            exercises: ["Configurar Burp", "Interceptar tráfego", "Analisar requests"]
          },
          {
            id: 9,
            title: "API Security Testing",
            duration: "70 min",
            videoUrl: "https://www.youtube.com/watch?v=api-security",
            transcript: "Teste a segurança de APIs REST e GraphQL.",
            resources: ["API Security", "REST Testing", "GraphQL Security"],
            exercises: ["Testar APIs REST", "Analisar GraphQL", "Explorar endpoints"]
          }
        ]
      },
      {
        id: 4,
        title: "Sistemas Operacionais e Malware",
        description: "Segurança de sistemas operacionais e análise de malware",
        duration: "3 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 10,
            title: "Windows Security",
            duration: "80 min",
            videoUrl: "https://www.youtube.com/watch?v=windows-security",
            transcript: "Configure segurança do Windows, Active Directory e políticas de grupo.",
            resources: ["Windows Security", "Active Directory", "Group Policies"],
            exercises: ["Configurar políticas", "Auditar AD", "Implementar controles"]
          },
          {
            id: 11,
            title: "Linux Security",
            duration: "75 min",
            videoUrl: "https://www.youtube.com/watch?v=linux-security",
            transcript: "Configure segurança do Linux, permissões e hardening.",
            resources: ["Linux Security", "File Permissions", "System Hardening"],
            exercises: ["Configurar permissões", "Hardening do sistema", "Auditar logs"]
          },
          {
            id: 12,
            title: "Análise de Malware",
            duration: "90 min",
            videoUrl: "https://www.youtube.com/watch?v=malware-analysis",
            transcript: "Analise malware usando ferramentas estáticas e dinâmicas.",
            resources: ["Malware Analysis", "Static Analysis", "Dynamic Analysis"],
            exercises: ["Analisar malware", "Usar sandbox", "Reverse engineering"]
          }
        ]
      },
      {
        id: 5,
        title: "Cryptography e PKI",
        description: "Criptografia, certificados digitais e infraestrutura de chaves públicas",
        duration: "3 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 13,
            title: "Criptografia simétrica e assimétrica",
            duration: "85 min",
            videoUrl: "https://www.youtube.com/watch?v=cryptography-basics",
            transcript: "Entenda algoritmos de criptografia simétrica e assimétrica.",
            resources: ["Cryptography Guide", "AES", "RSA", "ECC"],
            exercises: ["Implementar AES", "Gerar chaves RSA", "Criptografar dados"]
          },
          {
            id: 14,
            title: "Certificados digitais e PKI",
            duration: "70 min",
            videoUrl: "https://www.youtube.com/watch?v=pki-certificates",
            transcript: "Configure infraestrutura de chaves públicas e certificados digitais.",
            resources: ["PKI Architecture", "Certificate Authority", "SSL/TLS"],
            exercises: ["Configurar CA", "Gerar certificados", "Implementar SSL"]
          },
          {
            id: 15,
            title: "Hashing e assinatura digital",
            duration: "60 min",
            videoUrl: "https://www.youtube.com/watch?v=digital-signatures",
            transcript: "Use algoritmos de hash e implemente assinaturas digitais.",
            resources: ["Hash Functions", "Digital Signatures", "HMAC"],
            exercises: ["Implementar hash", "Criar assinaturas", "Verificar integridade"]
          }
        ]
      },
      {
        id: 6,
        title: "Incident Response e Forensics",
        description: "Resposta a incidentes e análise forense digital",
        duration: "3 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 16,
            title: "Incident Response Framework",
            duration: "80 min",
            videoUrl: "https://www.youtube.com/watch?v=incident-response",
            transcript: "Implemente framework de resposta a incidentes cibernéticos.",
            resources: ["NIST Framework", "Incident Response", "CSIRT"],
            exercises: ["Criar playbook", "Simular incidente", "Documentar resposta"]
          },
          {
            id: 17,
            title: "Digital Forensics",
            duration: "90 min",
            videoUrl: "https://www.youtube.com/watch?v=digital-forensics",
            transcript: "Realize análise forense digital em diferentes tipos de mídia.",
            resources: ["Forensics Tools", "Memory Analysis", "Disk Imaging"],
            exercises: ["Criar imagem", "Analisar memória", "Recuperar dados"]
          },
          {
            id: 18,
            title: "Threat Hunting",
            duration: "75 min",
            videoUrl: "https://www.youtube.com/watch?v=threat-hunting",
            transcript: "Implemente técnicas de threat hunting e detecção proativa.",
            resources: ["Threat Hunting", "SIEM Tools", "IOC Analysis"],
            exercises: ["Configurar SIEM", "Criar queries", "Analisar IOCs"]
          }
        ]
      },
      {
        id: 7,
        title: "Cloud Security",
        description: "Segurança em ambientes de nuvem",
        duration: "2 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 19,
            title: "AWS Security",
            duration: "85 min",
            videoUrl: "https://www.youtube.com/watch?v=aws-security",
            transcript: "Configure segurança na AWS, IAM, VPC e monitoramento.",
            resources: ["AWS Security", "IAM Best Practices", "CloudTrail"],
            exercises: ["Configurar IAM", "Auditar recursos", "Monitorar logs"]
          },
          {
            id: 20,
            title: "Azure Security",
            duration: "80 min",
            videoUrl: "https://www.youtube.com/watch?v=azure-security",
            transcript: "Implemente segurança no Azure, Azure AD e políticas de compliance.",
            resources: ["Azure Security", "Azure AD", "Security Center"],
            exercises: ["Configurar Azure AD", "Implementar políticas", "Monitorar segurança"]
          }
        ]
      },
      {
        id: 8,
        title: "Preparação para Certificações",
        description: "Prepare-se para certificações de cibersegurança",
        duration: "2 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 21,
            title: "CEH - Certified Ethical Hacker",
            duration: "120 min",
            videoUrl: "https://www.youtube.com/watch?v=ceh-preparation",
            transcript: "Prepare-se para a certificação CEH com foco em ethical hacking.",
            resources: ["CEH Study Guide", "Practice Exams", "Lab Environment"],
            exercises: ["Simular exames", "Praticar técnicas", "Revisar tópicos"]
          },
          {
            id: 22,
            title: "CompTIA Security+",
            duration: "110 min",
            videoUrl: "https://www.youtube.com/watch?v=security-plus",
            transcript: "Prepare-se para a certificação CompTIA Security+.",
            resources: ["Security+ Guide", "Practice Tests", "Study Materials"],
            exercises: ["Revisar objetivos", "Praticar exames", "Focar em áreas fracas"]
          }
        ]
      }
    ],
    whatYouWillLearn: [
      "Dominar fundamentos de cibersegurança",
      "Realizar testes de penetração web",
      "Analisar malware e vulnerabilidades",
      "Configurar segurança de redes",
      "Implementar criptografia e PKI",
      "Responder a incidentes cibernéticos",
      "Gerenciar segurança em nuvem",
      "Preparar-se para certificações"
    ],
    requirements: [
      "Conhecimento básico de redes e sistemas",
      "Familiaridade com Linux e linha de comando",
      "Conceitos básicos de programação",
      "Computador com acesso à internet",
      "Disposição para aprender técnicas de hacking ético"
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
      <div className="bg-gradient-to-r from-red-600 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {courseData.title}
              </h1>
              <p className="text-xl mb-6 text-red-100">
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
                <span className="text-xl line-through text-red-200">R$ {courseData.originalPrice}</span>
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
                  src="/images/instructors/pedro-almeida.jpg" 
                  alt="Pedro Almeida"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h4 className="font-semibold text-lg">{courseData.instructor}</h4>
                <p className="text-gray-600 text-sm">
                  Especialista em cibersegurança com mais de 10 anos de experiência em pentesting e análise forense. 
                  Certificado CEH, CISSP e instrutor de segurança da informação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CibersegurancaPage; 