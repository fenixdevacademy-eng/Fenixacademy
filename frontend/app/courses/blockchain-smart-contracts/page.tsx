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

const BlockchainSmartContractsPage: React.FC = () => {
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);

  const courseData: CourseContent = {
    id: 13,
    title: "Blockchain e Smart Contracts",
    description: "Aprenda a desenvolver aplicações descentralizadas (DApps) e smart contracts usando Solidity e Ethereum. Domine Web3 e DeFi.",
    instructor: "Mariana Santos",
    level: "Avançado",
    duration: "18 semanas",
    students: 1247,
    rating: 4.8,
    price: 447.00,
    originalPrice: 747.00,
    image: "/images/courses/blockchain-smart-contracts.jpg",
    category: "Blockchain Development",
    lessons: 72,
    certificate: true,
    discount: 40,
    modules: [
      {
        id: 1,
        title: "Fundamentos de Blockchain",
        description: "Introdução aos conceitos fundamentais de blockchain e criptomoedas",
        duration: "3 semanas",
        isExpanded: true,
        lessons: [
          {
            id: 1,
            title: "O que é Blockchain e como funciona",
            duration: "75 min",
            videoUrl: "https://www.youtube.com/watch?v=blockchain-intro",
            transcript: "Entenda os conceitos fundamentais de blockchain, descentralização e consenso distribuído.",
            resources: ["Blockchain Basics", "Cryptography Guide", "Distributed Systems"],
            exercises: ["Criar blockchain simples", "Implementar hash", "Simular consenso"]
          },
          {
            id: 2,
            title: "Bitcoin e criptomoedas",
            duration: "60 min",
            videoUrl: "https://www.youtube.com/watch?v=bitcoin-fundamentals",
            transcript: "Aprenda sobre Bitcoin, mineração, proof-of-work e o ecossistema de criptomoedas.",
            resources: ["Bitcoin Whitepaper", "Cryptocurrency Guide", "Mining Process"],
            exercises: ["Configurar wallet", "Entender transações", "Simular mineração"]
          },
          {
            id: 3,
            title: "Ethereum e smart contracts",
            duration: "65 min",
            videoUrl: "https://www.youtube.com/watch?v=ethereum-intro",
            transcript: "Entenda Ethereum, EVM, gas e o conceito de smart contracts.",
            resources: ["Ethereum Documentation", "Smart Contracts Guide", "EVM Specification"],
            exercises: ["Configurar MetaMask", "Explorar Etherscan", "Entender gas"]
          }
        ]
      },
      {
        id: 2,
        title: "Solidity - Linguagem de Smart Contracts",
        description: "Aprenda a programar smart contracts usando Solidity",
        duration: "4 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 4,
            title: "Introdução ao Solidity",
            duration: "80 min",
            videoUrl: "https://www.youtube.com/watch?v=solidity-intro",
            transcript: "Aprenda a sintaxe básica do Solidity e estrutura de um smart contract.",
            resources: ["Solidity Documentation", "Remix IDE", "Smart Contract Patterns"],
            exercises: ["Criar primeiro contract", "Compilar código", "Deploy no testnet"]
          },
          {
            id: 5,
            title: "Variáveis, tipos de dados e funções",
            duration: "90 min",
            videoUrl: "https://www.youtube.com/watch?v=solidity-variables",
            transcript: "Trabalhe com variáveis, tipos de dados e funções em Solidity.",
            resources: ["Data Types Guide", "Function Modifiers", "Visibility Specifiers"],
            exercises: ["Implementar variáveis", "Criar funções", "Usar modificadores"]
          },
          {
            id: 6,
            title: "Mappings, arrays e structs",
            duration: "70 min",
            videoUrl: "https://www.youtube.com/watch?v=solidity-data-structures",
            transcript: "Use estruturas de dados complexas em smart contracts.",
            resources: ["Data Structures", "Storage vs Memory", "Gas Optimization"],
            exercises: ["Criar mappings", "Implementar arrays", "Definir structs"]
          },
          {
            id: 7,
            title: "Events e logs",
            duration: "55 min",
            videoUrl: "https://www.youtube.com/watch?v=solidity-events",
            transcript: "Implemente eventos para comunicação off-chain e logs.",
            resources: ["Events Guide", "Logs Documentation", "Indexed Parameters"],
            exercises: ["Criar eventos", "Emitir logs", "Filtrar eventos"]
          }
        ]
      },
      {
        id: 3,
        title: "Padrões de Smart Contracts",
        description: "Aprenda padrões comuns e melhores práticas",
        duration: "3 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 8,
            title: "Ownable e Access Control",
            duration: "75 min",
            videoUrl: "https://www.youtube.com/watch?v=smart-contract-patterns",
            transcript: "Implemente controle de acesso e propriedade em smart contracts.",
            resources: ["OpenZeppelin", "Access Control", "Security Patterns"],
            exercises: ["Implementar Ownable", "Criar roles", "Gerenciar permissões"]
          },
          {
            id: 9,
            title: "Pausable e Upgradeable",
            duration: "80 min",
            videoUrl: "https://www.youtube.com/watch?v=upgradeable-contracts",
            transcript: "Crie contratos pausáveis e upgradeáveis usando proxies.",
            resources: ["Proxy Patterns", "Upgradeable Contracts", "Storage Layout"],
            exercises: ["Implementar Pausable", "Criar proxy", "Upgrade contract"]
          },
          {
            id: 10,
            title: "Reentrancy e segurança",
            duration: "85 min",
            videoUrl: "https://www.youtube.com/watch?v=smart-contract-security",
            transcript: "Aprenda sobre vulnerabilidades comuns e como evitá-las.",
            resources: ["Security Best Practices", "Common Vulnerabilities", "Audit Tools"],
            exercises: ["Identificar vulnerabilidades", "Implementar proteções", "Auditar código"]
          }
        ]
      },
      {
        id: 4,
        title: "DeFi - Decentralized Finance",
        description: "Desenvolva aplicações DeFi e tokens",
        duration: "3 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 11,
            title: "ERC-20 Tokens",
            duration: "90 min",
            videoUrl: "https://www.youtube.com/watch?v=erc20-tokens",
            transcript: "Crie tokens ERC-20 e implemente funcionalidades customizadas.",
            resources: ["ERC-20 Standard", "Token Economics", "Mint and Burn"],
            exercises: ["Criar token ERC-20", "Implementar mint/burn", "Configurar supply"]
          },
          {
            id: 12,
            title: "ERC-721 NFTs",
            duration: "85 min",
            videoUrl: "https://www.youtube.com/watch?v=erc721-nfts",
            transcript: "Desenvolva NFTs usando o padrão ERC-721.",
            resources: ["ERC-721 Standard", "NFT Metadata", "IPFS Integration"],
            exercises: ["Criar NFT contract", "Mint NFTs", "Configurar metadata"]
          },
          {
            id: 13,
            title: "DEX - Decentralized Exchanges",
            duration: "100 min",
            videoUrl: "https://www.youtube.com/watch?v=dex-development",
            transcript: "Implemente um DEX básico com AMM (Automated Market Maker).",
            resources: ["Uniswap V2", "AMM Algorithm", "Liquidity Pools"],
            exercises: ["Criar DEX simples", "Implementar AMM", "Gerenciar liquidez"]
          }
        ]
      },
      {
        id: 5,
        title: "Web3 e Frontend",
        description: "Integre smart contracts com aplicações web",
        duration: "3 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 14,
            title: "Web3.js e Ethers.js",
            duration: "80 min",
            videoUrl: "https://www.youtube.com/watch?v=web3-integration",
            transcript: "Conecte frontend com blockchain usando Web3.js e Ethers.js.",
            resources: ["Web3.js Documentation", "Ethers.js Guide", "Provider Setup"],
            exercises: ["Configurar Web3", "Conectar wallet", "Interagir com contract"]
          },
          {
            id: 15,
            title: "React e DApps",
            duration: "90 min",
            videoUrl: "https://www.youtube.com/watch?v=react-dapps",
            transcript: "Crie DApps usando React e hooks para Web3.",
            resources: ["React Web3 Hooks", "DApp Architecture", "State Management"],
            exercises: ["Criar DApp React", "Implementar hooks", "Gerenciar estado"]
          },
          {
            id: 16,
            title: "MetaMask e Wallet Integration",
            duration: "70 min",
            videoUrl: "https://www.youtube.com/watch?v=metamask-integration",
            transcript: "Integre MetaMask e outras wallets em sua DApp.",
            resources: ["MetaMask API", "Wallet Connect", "Provider Injection"],
            exercises: ["Conectar MetaMask", "Detectar rede", "Assinar transações"]
          }
        ]
      },
      {
        id: 6,
        title: "Testing e Deploy",
        description: "Teste e faça deploy de smart contracts",
        duration: "2 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 17,
            title: "Testing com Hardhat",
            duration: "85 min",
            videoUrl: "https://www.youtube.com/watch?v=hardhat-testing",
            transcript: "Configure ambiente de desenvolvimento e testes com Hardhat.",
            resources: ["Hardhat Documentation", "Testing Framework", "Mock Contracts"],
            exercises: ["Configurar Hardhat", "Escrever testes", "Mock de dados"]
          },
          {
            id: 18,
            title: "Deploy e verificação",
            duration: "75 min",
            videoUrl: "https://www.youtube.com/watch?v=contract-deploy",
            transcript: "Faça deploy de smart contracts e verifique no Etherscan.",
            resources: ["Deploy Guide", "Etherscan Verification", "Gas Optimization"],
            exercises: ["Deploy no testnet", "Verificar contract", "Otimizar gas"]
          }
        ]
      },
      {
        id: 7,
        title: "Projetos Avançados",
        description: "Desenvolva projetos complexos de blockchain",
        duration: "2 semanas",
        isExpanded: false,
        lessons: [
          {
            id: 19,
            title: "DAO - Decentralized Autonomous Organization",
            duration: "120 min",
            videoUrl: "https://www.youtube.com/watch?v=dao-development",
            transcript: "Crie uma DAO com governance e voting mechanisms.",
            resources: ["DAO Architecture", "Governance Tokens", "Voting Systems"],
            exercises: ["Implementar DAO", "Criar governance", "Configurar voting"]
          },
          {
            id: 20,
            title: "Yield Farming e Staking",
            duration: "110 min",
            videoUrl: "https://www.youtube.com/watch?v=yield-farming",
            transcript: "Desenvolva protocolos de yield farming e staking.",
            resources: ["Yield Farming Guide", "Staking Mechanisms", "Reward Distribution"],
            exercises: ["Criar staking contract", "Implementar rewards", "Configurar farming"]
          }
        ]
      }
    ],
    whatYouWillLearn: [
      "Entender fundamentos de blockchain e criptomoedas",
      "Programar smart contracts em Solidity",
      "Desenvolver tokens ERC-20 e NFTs ERC-721",
      "Criar aplicações DeFi e DEX",
      "Integrar Web3 com frontend React",
      "Implementar padrões de segurança",
      "Testar e fazer deploy de smart contracts",
      "Desenvolver DAOs e protocolos DeFi"
    ],
    requirements: [
      "Conhecimento sólido de JavaScript/TypeScript",
      "Familiaridade com React e desenvolvimento web",
      "Conceitos básicos de criptografia",
      "Computador com acesso à internet",
      "Disposição para aprender tecnologias emergentes"
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {courseData.title}
              </h1>
              <p className="text-xl mb-6 text-purple-100">
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
                <span className="text-xl line-through text-purple-200">R$ {courseData.originalPrice}</span>
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
                  src="/images/instructors/mariana-santos.jpg" 
                  alt="Mariana Santos"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h4 className="font-semibold text-lg">{courseData.instructor}</h4>
                <p className="text-gray-600 text-sm">
                  Desenvolvedora blockchain experiente com mais de 5 anos criando smart contracts e DApps. 
                  Especialista em DeFi, NFTs e arquiteturas descentralizadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainSmartContractsPage; 