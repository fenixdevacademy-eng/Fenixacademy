'use client';

import React, { useState } from 'react';
import { Code, AlertTriangle, CheckCircle, TrendingUp, Shield, Clock, Star, Lightbulb, Target, Zap, Brain, Award } from 'lucide-react';
import { enhancedAIService, CodeAnalysis } from '@/lib/ai/enhanced-ai-service';

interface CodeAnalyzerProps {
  className?: string;
  onAnalysisComplete?: (analysis: CodeAnalysis) => void;
}

export function CodeAnalyzer({ className = '', onAnalysisComplete }: CodeAnalyzerProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' }
  ];

  const handleAnalyze = async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await enhancedAIService.analyzeCode(code, language);
      setAnalysis(result);
      onAnalysisComplete?.(result);
    } catch (error) {
      console.error('Code analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-blue-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-red-200 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20';
      case 'suggestion': return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-gray-200 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500 text-white rounded-lg">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Analisador de Código Superinteligente
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Análise completa de qualidade, performance e segurança
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Code Input */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Código para análise
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Cole seu código aqui..."
                className="w-full h-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Linguagem
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAnalyze}
                disabled={!code.trim() || isAnalyzing}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    Analisar Código
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Quality Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg ${getQualityBg(analysis.quality)}`}>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Qualidade</p>
                    <p className={`text-2xl font-bold ${getQualityColor(analysis.quality)}`}>
                      {analysis.quality}/100
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${getQualityBg(analysis.performance.score)}`}>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Performance</p>
                    <p className={`text-2xl font-bold ${getQualityColor(analysis.performance.score)}`}>
                      {analysis.performance.score}/100
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${getQualityBg(analysis.security.score)}`}>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Segurança</p>
                    <p className={`text-2xl font-bold ${getQualityColor(analysis.security.score)}`}>
                      {analysis.security.score}/100
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Issues */}
            {analysis.issues.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Problemas Encontrados ({analysis.issues.length})
                </h4>
                <div className="space-y-3">
                  {analysis.issues.map((issue, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${getIssueColor(issue.type)}`}
                    >
                      <div className="flex items-start gap-3">
                        {getIssueIcon(issue.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {issue.type === 'error' ? 'Erro' : issue.type === 'warning' ? 'Aviso' : 'Sugestão'}
                            </span>
                            {issue.line && (
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Linha {issue.line}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">{issue.message}</p>
                          {issue.fix && (
                            <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                              <p className="text-sm text-green-800 dark:text-green-200">
                                <strong>Sugestão de correção:</strong> {issue.fix}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvements */}
            {analysis.improvements.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Melhorias Sugeridas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.improvements.map((improvement, index) => (
                    <div
                      key={index}
                      className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <p className="text-sm text-blue-800 dark:text-blue-200">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best Practices */}
            {analysis.bestPractices.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Boas Práticas Aplicáveis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.bestPractices.map((practice, index) => (
                    <div
                      key={index}
                      className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <p className="text-sm text-green-800 dark:text-green-200">{practice}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Details */}
            {analysis.performance.bottlenecks.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Análise de Performance
                </h4>
                <div className="space-y-3">
                  {analysis.performance.bottlenecks.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gargalos Identificados:
                      </p>
                      <ul className="space-y-1">
                        {analysis.performance.bottlenecks.map((bottleneck, index) => (
                          <li key={index} className="text-sm text-red-600 dark:text-red-400">
                            • {bottleneck}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysis.performance.optimizations.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Otimizações Sugeridas:
                      </p>
                      <ul className="space-y-1">
                        {analysis.performance.optimizations.map((optimization, index) => (
                          <li key={index} className="text-sm text-green-600 dark:text-green-400">
                            • {optimization}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Security Details */}
            {analysis.security.vulnerabilities.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Análise de Segurança
                </h4>
                <div className="space-y-3">
                  {analysis.security.vulnerabilities.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Vulnerabilidades Encontradas:
                      </p>
                      <ul className="space-y-1">
                        {analysis.security.vulnerabilities.map((vulnerability, index) => (
                          <li key={index} className="text-sm text-red-600 dark:text-red-400">
                            • {vulnerability}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysis.security.recommendations.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Recomendações de Segurança:
                      </p>
                      <ul className="space-y-1">
                        {analysis.security.recommendations.map((recommendation, index) => (
                          <li key={index} className="text-sm text-blue-600 dark:text-blue-400">
                            • {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {showDetails ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(JSON.stringify(analysis, null, 2))}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Copiar Análise
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeAnalyzer;


