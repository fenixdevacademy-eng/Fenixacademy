"use client";
import { useContext } from 'react';
import { UserContext } from '../components/Providers';

export default function GestaoTrafegoPage() {
  const user = useContext(UserContext);
  if (user.email !== 'cezar@exemplo.com') {
    return <div className="p-8 text-center text-red-600 font-bold">Acesso restrito: apenas para gestor de tráfego.</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Gestão de Tráfego - Área Exclusiva</h1>
      <p className="mb-6 text-lg">Bem-vindo, {user.name}! Aqui você pode monitorar campanhas, analisar fontes de leads, acompanhar funil de conversão e gerenciar todo o tráfego da Fenix.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Campanhas Ativas</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Google Ads - Conversão Landing</li>
            <li>Facebook Ads - Remarketing</li>
            <li>Instagram - Captação de Leads</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Principais Métricas</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Leads captados: <span className="font-bold">1.250</span></li>
            <li>Taxa de conversão: <span className="font-bold">7,2%</span></li>
            <li>Investimento total: <span className="font-bold">R$ 8.500</span></li>
            <li>ROI estimado: <span className="font-bold">3,1x</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Ações Rápidas</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium mr-4">Nova Campanha</button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">Exportar Relatório</button>
      </div>
    </div>
  );
} 