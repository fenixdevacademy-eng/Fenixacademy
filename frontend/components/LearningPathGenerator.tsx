'use client';

import React, { useState } from 'react';
import { Target, Clock, BookOpen, Code, Award, Users, TrendingUp, CheckCircle, ArrowRight, Star, Zap, Brain, Rocket, Loader2 } from 'lucide-react';

interface LearningPathGeneratorProps {
  className?: string;
  onPathGenerated?: (paths: LearningPath[]) => void;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  goals: string[];
  modules: Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    lessons: number;
    completed: boolean;
  }>;
  prerequisites: string[];
  outcomes: string[];
  rating: number;
  students: number;
  price: number;
  isFree: boolean;
}

export function LearningPathGenerator({ className = '', onPathGenerated }: LearningPathGeneratorProps) {
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [timeCommitment, setTimeCommitment] = useState<'part-time' | 'full-time'>('part-time');

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
    'Tornar-se especialista em DevOps',
    'Tornar-se especialista em Data Science',
    'Tornar-se especialista em Machine Learning',
    'Tornar-se especialista em Cloud Computing',
    'Tornar-se especialista em Mobile Development',
    'Tornar-se especialista em Blockchain',
    'Tornar-se especialista em Cybersecurity',
    'Tornar-se especialista em UI/UX',
    'Tornar-se especialista em QA/Testing',
    'Tornar-se especialista em Product Management',
    'Tornar-se especialista em Technical Writing',
    'Tornar-se especialista em Open Source',
    'Tornar-se especialista em Freelancing',
    'Tornar-se especialista em Entrepreneurship',
    'Tornar-se especialista em Consulting',
    'Tornar-se especialista em Teaching',
    'Tornar-se especialista em Research'
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

  const generatePaths = async () => {
    if (userGoals.length === 0) return;

    setIsGenerating(true);

    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockPaths: LearningPath[] = [
        {
          id: '1',
          title: 'Desenvolvedor Frontend Moderno',
          description: 'Aprenda as tecnologias mais atuais para desenvolvimento frontend, incluindo React, TypeScript e ferramentas modernas.',
          duration: '6 meses',
          difficulty: 'intermediate',
          skills: ['JavaScript', 'TypeScript', 'React', 'HTML/CSS', 'Node.js'],
          goals: userGoals,
          modules: [
            {
              id: '1',
              title: 'Fundamentos de JavaScript',
              description: 'Aprenda os conceitos fundamentais de JavaScript moderno',
              duration: '4 semanas',
              lessons: 20,
              completed: false
            },
            {
              id: '2',
              title: 'TypeScript Avançado',
              description: 'Domine TypeScript para desenvolvimento robusto',
              duration: '3 semanas',
              lessons: 15,
              completed: false
            },
            {
              id: '3',
              title: 'React e Hooks',
              description: 'Desenvolva aplicações modernas com React',
              duration: '6 semanas',
              lessons: 30,
              completed: false
            }
          ],
          prerequisites: currentSkills,
          outcomes: [
            'Desenvolver aplicações web modernas',
            'Trabalhar com APIs e integrações',
            'Implementar testes automatizados',
            'Deploy em produção'
          ],
          rating: 4.8,
          students: 1250,
          price: 299,
          isFree: false
        },
        {
          id: '2',
          title: 'Desenvolvedor Full-Stack',
          description: 'Torne-se um desenvolvedor completo, dominando tanto frontend quanto backend.',
          duration: '12 meses',
          difficulty: 'advanced',
          skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
          goals: userGoals,
          modules: [
            {
              id: '1',
              title: 'Fundamentos de Backend',
              description: 'Aprenda Node.js e Express',
              duration: '6 semanas',
              lessons: 25,
              completed: false
            },
            {
              id: '2',
              title: 'Bancos de Dados',
              description: 'Domine PostgreSQL e MongoDB',
              duration: '4 semanas',
              lessons: 20,
              completed: false
            },
            {
              id: '3',
              title: 'DevOps e Deploy',
              description: 'Aprenda Docker e CI/CD',
              duration: '5 semanas',
              lessons: 22,
              completed: false
            }
          ],
          prerequisites: currentSkills,
          outcomes: [
            'Desenvolver aplicações full-stack',
            'Gerenciar bancos de dados',
            'Implementar DevOps',
            'Liderar projetos técnicos'
          ],
          rating: 4.9,
          students: 890,
          price: 599,
          isFree: false
        }
      ];

      setLearningPaths(mockPaths);
      onPathGenerated?.(mockPaths);
    } catch (error) {
      console.error('Error generating paths:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className={`learning-path-generator ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Gerador de Trilhas de Aprendizado
          </h2>
          <p className="text-lg text-gray-600">
            Crie uma trilha personalizada baseada em seus objetivos e habilidades atuais
          </p>
        </div>

        {/* Configuration Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Nível de Experiência
              </label>
              <div className="space-y-2">
                {[
                  { value: 'beginner', label: 'Iniciante', icon: Star },
                  { value: 'intermediate', label: 'Intermediário', icon: TrendingUp },
                  { value: 'advanced', label: 'Avançado', icon: Award }
                ].map((level) => {
                  const Icon = level.icon;
                  return (
                    <label key={level.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="experience"
                        value={level.value}
                        checked={experienceLevel === level.value}
                        onChange={(e) => setExperienceLevel(e.target.value as any)}
                        className="text-blue-600"
                      />
                      <Icon className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {level.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Time Commitment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Disponibilidade de Tempo
              </label>
              <div className="space-y-2">
                {[
                  { value: 'part-time', label: 'Meio Período', description: '2-4 horas por dia' },
                  { value: 'full-time', label: 'Período Integral', description: '6-8 horas por dia' }
                ].map((time) => (
                  <label key={time.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="time"
                      value={time.value}
                      checked={timeCommitment === time.value}
                      onChange={(e) => setTimeCommitment(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        {time.label}
                      </span>
                      <p className="text-xs text-gray-500">
                        {time.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Goals Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Seus Objetivos (selecione um ou mais)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {goalOptions.map((goal) => (
                <label key={goal} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userGoals.includes(goal)}
                    onChange={() => handleGoalToggle(goal)}
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Current Skills */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Suas Habilidades Atuais (selecione as que você já possui)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
              {skillOptions.map((skill) => (
                <label key={skill} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentSkills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-6 text-center">
            <button
              onClick={generatePaths}
              disabled={userGoals.length === 0 || isGenerating}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gerando Trilhas...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Gerar Trilhas Personalizadas
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Paths */}
        {learningPaths.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center">
              Trilhas Geradas para Você
            </h3>

            {learningPaths.map((path) => (
              <div key={path.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {path.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {path.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(path.difficulty)}`}>
                        {getDifficultyLabel(path.difficulty)}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {path.duration}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {path.rating} ⭐
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {path.students} alunos
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {path.isFree ? 'Grátis' : `R$ ${path.price}`}
                    </div>
                    <button
                      onClick={() => setSelectedPath(selectedPath?.id === path.id ? null : path)}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      {selectedPath?.id === path.id ? 'Ocultar Detalhes' : 'Ver Detalhes'}
                    </button>
                  </div>
                </div>

                {selectedPath?.id === path.id && (
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Modules */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Módulos</h5>
                        <div className="space-y-2">
                          {path.modules.map((module) => (
                            <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <h6 className="font-medium text-gray-900">{module.title}</h6>
                                <p className="text-sm text-gray-600">{module.description}</p>
                                <p className="text-xs text-gray-500">{module.duration} • {module.lessons} aulas</p>
                              </div>
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">O que você vai aprender</h5>
                        <ul className="space-y-2">
                          {path.outcomes.map((outcome, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningPathGenerator;