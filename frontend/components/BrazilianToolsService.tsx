'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  DollarSign,
  CreditCard,
  Truck,
  Package,
  Star,
  Shield,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface BrazilianToolsServiceProps {
  className?: string;
  onServiceSelect?: (service: Service) => void;
  onServiceRequest?: (service: Service, data: any) => void;
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
  requirements: string[];
  isAvailable: boolean;
  icon: string;
  provider: string;
  rating: number;
  reviews: number;
}

const mockServices: Service[] = [
  {
    id: '1',
    name: 'CPF Generator',
    description: 'Gera CPF válido para testes e desenvolvimento',
    category: 'Documentos',
    price: 0,
    currency: 'BRL',
    duration: 'Instantâneo',
    features: ['CPF válido', 'Formatação automática', 'Validação incluída'],
    requirements: ['Nenhum'],
    isAvailable: true,
    icon: '📄',
    provider: 'Fenix Academy',
    rating: 4.8,
    reviews: 1250
  },
  {
    id: '2',
    name: 'CNPJ Generator',
    description: 'Gera CNPJ válido para testes empresariais',
    category: 'Documentos',
    price: 0,
    currency: 'BRL',
    duration: 'Instantâneo',
    features: ['CNPJ válido', 'Matriz/Filial', 'Validação completa'],
    requirements: ['Nenhum'],
    isAvailable: true,
    icon: '🏢',
    provider: 'Fenix Academy',
    rating: 4.7,
    reviews: 890
  },
  {
    id: '3',
    name: 'CEP Lookup',
    description: 'Consulta CEP e retorna endereço completo',
    category: 'Localização',
    price: 0,
    currency: 'BRL',
    duration: '1-2 segundos',
    features: ['Endereço completo', 'Bairro e cidade', 'Estado e região'],
    requirements: ['CEP válido'],
    isAvailable: true,
    icon: '📍',
    provider: 'ViaCEP API',
    rating: 4.9,
    reviews: 2100
  },
  {
    id: '4',
    name: 'Boleto Generator',
    description: 'Gera boleto bancário para pagamentos',
    category: 'Financeiro',
    price: 29.90,
    currency: 'BRL',
    duration: '5 minutos',
    features: ['Boleto válido', 'Código de barras', 'PDF gerado'],
    requirements: ['Dados bancários', 'Valor do boleto'],
    isAvailable: true,
    icon: '💰',
    provider: 'Fenix Academy',
    rating: 4.6,
    reviews: 450
  },
  {
    id: '5',
    name: 'PIX Generator',
    description: 'Gera chave PIX para pagamentos instantâneos',
    category: 'Financeiro',
    price: 0,
    currency: 'BRL',
    duration: 'Instantâneo',
    features: ['Chave PIX válida', 'QR Code', 'Copia e cola'],
    requirements: ['Dados bancários'],
    isAvailable: true,
    icon: '📱',
    provider: 'Fenix Academy',
    rating: 4.8,
    reviews: 1800
  },
  {
    id: '6',
    name: 'NFe Generator',
    description: 'Gera Nota Fiscal Eletrônica para testes',
    category: 'Fiscal',
    price: 49.90,
    currency: 'BRL',
    duration: '10 minutos',
    features: ['XML válido', 'Assinatura digital', 'Validação SEFAZ'],
    requirements: ['Dados da empresa', 'Produtos/serviços'],
    isAvailable: false,
    icon: '📋',
    provider: 'Fenix Academy',
    rating: 4.5,
    reviews: 320
  }
];

export function BrazilianToolsService({
  className = '',
  onServiceSelect,
  onServiceRequest
}: BrazilianToolsServiceProps) {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    onServiceSelect?.(service);
  };

  const handleServiceRequest = async (service: Service, data: any) => {
    setIsRequesting(true);
    try {
      // Simular requisição do serviço
      await new Promise(resolve => setTimeout(resolve, 2000));
      onServiceRequest?.(service, data);
    } finally {
      setIsRequesting(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Documentos':
        return <Package className="w-4 h-4" />;
      case 'Localização':
        return <MapPin className="w-4 h-4" />;
      case 'Financeiro':
        return <DollarSign className="w-4 h-4" />;
      case 'Fiscal':
        return <Shield className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (isAvailable: boolean) => {
    return isAvailable 
      ? 'text-green-600 bg-green-100 dark:bg-green-900/20'
      : 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const getStatusIcon = (isAvailable: boolean) => {
    return isAvailable ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <AlertCircle className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Ferramentas Brasileiras
            </h3>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {services.filter(s => s.isAvailable).length} serviços disponíveis
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar ferramentas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas as categorias' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`border rounded-lg p-4 transition-all ${
                service.isAvailable
                  ? 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {service.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {service.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(service.isAvailable)}
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(service.isAvailable)}`}>
                    {service.isAvailable ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {service.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Star className="w-3 h-3" />
                  <span>{service.rating} ({service.reviews} avaliações)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Por {service.provider}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {service.price === 0 ? 'Gratuito' : `R$ ${service.price.toFixed(2)}`}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {service.currency}
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recursos:
                </h5>
                <div className="flex flex-wrap gap-1">
                  {service.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 2 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      +{service.features.length - 2}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleServiceSelect(service)}
                disabled={!service.isAvailable}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  service.isAvailable
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {service.isAvailable ? 'Usar Ferramenta' : 'Indisponível'}
              </button>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhuma ferramenta encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros para encontrar o que você está procurando
            </p>
          </div>
        )}
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {selectedService.name}
              </h3>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {selectedService.description}
              </p>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Recursos:</h4>
                <ul className="space-y-1">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Requisitos:</h4>
                <ul className="space-y-1">
                  {selectedService.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Info className="w-3 h-3 text-blue-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedService.price === 0 ? 'Gratuito' : `R$ ${selectedService.price.toFixed(2)}`}
                </div>
                <button
                  onClick={() => handleServiceRequest(selectedService, {})}
                  disabled={!selectedService.isAvailable || isRequesting}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  {isRequesting ? 'Processando...' : 'Usar Ferramenta'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}