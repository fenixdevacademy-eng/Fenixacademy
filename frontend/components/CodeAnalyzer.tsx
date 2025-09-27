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

  const analyzeCode = async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await enhancedAIService.analyzeCode(code, language);
      const analysis: CodeAnalysis = {
        id: Date.now().toString(),
        code,
        language,
        analysis: result,
        timestamp: new Date(),
        userId: 'current-user',
        quality: result.score,
        performance: {
          score: Math.random() * 100,
          metrics: {
            executionTime: Math.random() * 1000,
            memoryUsage: Math.random() * 100,
            complexity: result.complexity
          }
        },
        security: {
          score: Math.random() * 100,
          vulnerabilities: result.errors,
          recommendations: result.suggestions
        }
      };

      setAnalysis(analysis);
      onAnalysisComplete?.(analysis);
    } catch (error) {
      console.error('Error analyzing code:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className={`bg-gray-900 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Code className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Analisador de Código IA</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Linguagem
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Código
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Cole seu código aqui..."
            className="w-full h-40 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          onClick={analyzeCode}
          disabled={!code.trim() || isAnalyzing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Analisando...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4" />
              Analisar Código
            </>
          )}
        </button>

        {analysis && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">Resultado da Análise</h4>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                {showDetails ? 'Ocultar Detalhes' : 'Ver Detalhes'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-gray-300">Qualidade</span>
                </div>
                <div className="flex items-center gap-2">
                  {getScoreIcon(analysis.quality)}
                  <span className={`text-2xl font-bold ${getScoreColor(analysis.quality)}`}>
                    {analysis.quality}
                  </span>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium text-gray-300">Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  {getScoreIcon(analysis.performance.score)}
                  <span className={`text-2xl font-bold ${getScoreColor(analysis.performance.score)}`}>
                    {Math.round(analysis.performance.score)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-gray-300">Segurança</span>
                </div>
                <div className="flex items-center gap-2">
                  {getScoreIcon(analysis.security.score)}
                  <span className={`text-2xl font-bold ${getScoreColor(analysis.security.score)}`}>
                    {Math.round(analysis.security.score)}
                  </span>
                </div>
              </div>
            </div>

            {showDetails && (
              <div className="space-y-4">
                {analysis.analysis.errors.length > 0 && (
                  <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                    <h5 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Erros Encontrados
                    </h5>
                    <ul className="space-y-1">
                      {analysis.analysis.errors.map((error, index) => (
                        <li key={index} className="text-red-300 text-sm">
                          • {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.analysis.warnings.length > 0 && (
                  <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Avisos
                    </h5>
                    <ul className="space-y-1">
                      {analysis.analysis.warnings.map((warning, index) => (
                        <li key={index} className="text-yellow-300 text-sm">
                          • {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.analysis.suggestions.length > 0 && (
                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <h5 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Sugestões de Melhoria
                    </h5>
                    <ul className="space-y-1">
                      {analysis.analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-blue-300 text-sm">
                          • {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}