'use client';

import React, { useState } from 'react';
import { Target, Clock, BookOpen, Code, Award, Users, TrendingUp, CheckCircle, ArrowRight, Star, Zap, Brain, Rocket } from 'lucide-react';
import { enhancedAIService, LearningPath } from '@/lib/ai/enhanced-ai-service';

interface LearningPathGeneratorProps {
  className?: string;
  onPathGenerated?: (paths: LearningPath[]) => void;
}

export function LearningPathGenerator({ className = '', onPathGenerated }: LearningPathGeneratorProps) {
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const skillOptions = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js',
    'Python', 'Java', 'C#', 'C++', 'Go', 'Rust', 'PHP', 'Ruby',
    'HTML/CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'Redis',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'Machine Learning', 'Data Science', 'AI', 'Blockchain',
    'DevOps', 'CI/CD', 'Testing', 'Agile', 'Scrum'
  ];

  const goalOptions = [
    'Tornar-se desenvolvedor frontend',
    'Tornar-se desenvolvedor backend',
    'Tornar-se desenvolvedor full-stack',
    'Especializar-se em Data Science',
    'Aprender Machine Learning',
    'Tornar-se DevOps Engineer',
    'Especializar-se em Cloud Computing',
    'Aprender Blockchain',
    'Tornar-se Mobile Developer',
    'Especializar-se em Cybersecurity',
    'Aprender UI/UX Design',
    'Tornar-se Tech Lead',
    'Aprender Arquitetura de Software',
    'Especializar-se em Performance',
    'Aprender Testes Automatizados'
  ];

  const handleGoalToggle = (goal: string) => {
    setUserGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setCurrentSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleGeneratePaths = async () => {
    if (userGoals.length === 0) return;

    setIsGenerating(true);
    try {
      const paths = await enhancedAIService.generatePersonalizedLearningPath(userGoals, currentSkills);
      setLearningPaths(paths);
      onPathGenerated?.(paths);
    } catch (error) {
      console.error('Failed to generate learning paths:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'iniciante': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediário': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'avançado': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDurationColor = (duration: string) => {
    if (duration.includes('1-2') || duration.includes('2-4')) return 'text-green-600 dark:text-green-400';
    if (duration.includes('4-8') || duration.includes('8-12')) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500 text-white rounded-lg">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Gerador de Roteiros de Aprendizado
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Crie caminhos personalizados para seus objetivos
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Goals Selection */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Seus Objetivos
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {goalOptions.map((goal) => (
              <button
                key={goal}
                onClick={() => handleGoalToggle(goal)}
                className={`p-3 text-left rounded-lg border transition-colors ${
                  userGoals.includes(goal)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    userGoals.includes(goal)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {userGoals.includes(goal) && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm">{goal}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Selection */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Code className="w-5 h-5" />
            Habilidades Atuais
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  currentSkills.includes(skill)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGeneratePaths}
            disabled={userGoals.length === 0 || isGenerating}
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Gerando Roteiros...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                Gerar Roteiros Personalizados
              </>
            )}
          </button>
        </div>

        {/* Learning Paths */}
        {learningPaths.length > 0 && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5" />
              Roteiros Gerados ({learningPaths.length})
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {learningPaths.map((path, index) => (
                <div
                  key={path.id}
                  className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedPath?.id === path.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedPath(selectedPath?.id === path.id ? null : path)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {path.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {path.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                        {path.difficulty}
                      </span>
                      <span className={`text-xs font-medium ${getDurationColor(path.duration)}`}>
                        {path.duration}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Topics */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tópicos Principais:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {path.topics.slice(0, 4).map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            {topic}
                          </span>
                        ))}
                        {path.topics.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded">
                            +{path.topics.length - 4} mais
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Projetos Práticos:
                      </p>
                      <div className="space-y-1">
                        {path.projects.slice(0, 2).map((project, projectIndex) => (
                          <div key={projectIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {project}
                          </div>
                        ))}
                        {path.projects.length > 2 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            +{path.projects.length - 2} projetos adicionais
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Prerequisites */}
                    {path.prerequisites.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pré-requisitos:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {path.prerequisites.slice(0, 3).map((prereq, prereqIndex) => (
                            <span
                              key={prereqIndex}
                              className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs rounded"
                            >
                              {prereq}
                            </span>
                          ))}
                          {path.prerequisites.length > 3 && (
                            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400 text-xs rounded">
                              +{path.prerequisites.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Outcomes */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Resultados Esperados:
                      </p>
                      <div className="space-y-1">
                        {path.outcomes.slice(0, 2).map((outcome, outcomeIndex) => (
                          <div key={outcomeIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {outcome}
                          </div>
                        ))}
                        {path.outcomes.length > 2 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            +{path.outcomes.length - 2} resultados adicionais
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {path.resources.videos.length} vídeos
                        </div>
                        <div className="flex items-center gap-1">
                          <Code className="w-3 h-3" />
                          {path.resources.exercises.length} exercícios
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {path.resources.projects.length} projetos
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Path Details */}
        {selectedPath && (
          <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Detalhes do Roteiro: {selectedPath.title}
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* All Topics */}
              <div>
                <h6 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Todos os Tópicos:</h6>
                <div className="space-y-1">
                  {selectedPath.topics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* All Projects */}
              <div>
                <h6 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Todos os Projetos:</h6>
                <div className="space-y-1">
                  {selectedPath.projects.map((project, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Rocket className="w-3 h-3 text-blue-500" />
                      {project}
                    </div>
                  ))}
                </div>
              </div>

              {/* All Outcomes */}
              <div>
                <h6 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Resultados Completos:</h6>
                <div className="space-y-1">
                  {selectedPath.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {outcome}
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h6 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Recursos Disponíveis:</h6>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    {selectedPath.resources.videos.length} Vídeos
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Code className="w-4 h-4 text-green-500" />
                    {selectedPath.resources.exercises.length} Exercícios
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Award className="w-4 h-4 text-purple-500" />
                    {selectedPath.resources.projects.length} Projetos
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    {selectedPath.resources.articles.length} Artigos
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Iniciar Roteiro
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Compartilhar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningPathGenerator;


