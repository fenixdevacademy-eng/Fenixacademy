'use client';

import { useState, useEffect, useCallback } from 'react';
import { enhancedAIService, AIResponse, LearningPath, PersonalizedRecommendation, CodeAnalysis } from '@/lib/ai/enhanced-ai-service';

export interface UseSuperIntelligentAIReturn {
  // Core AI functions
  generateResponse: (message: string, context?: any) => Promise<AIResponse>;
  isInitialized: boolean;
  isLoading: boolean;
  
  // Learning functions
  generateLearningPath: (goals: string[], skills: string[]) => Promise<LearningPath[]>;
  getRecommendations: (userProgress: any) => Promise<PersonalizedRecommendation[]>;
  
  // Code analysis functions
  analyzeCode: (code: string, language: string) => Promise<CodeAnalysis>;
  generateCodeSolution: (problem: string, language: string, requirements: string[]) => Promise<AIResponse>;
  
  // Tutoring functions
  explainConcept: (concept: string, level: string, examples?: boolean) => Promise<AIResponse>;
  generateQuiz: (topic: string, difficulty: string, questionCount?: number) => Promise<any>;
  
  // Project guidance
  generateProjectIdea: (skills: string[], interests: string[], timeAvailable: string) => Promise<any>;
  reviewProject: (projectCode: string, projectDescription: string) => Promise<any>;
  
  // Cognitive enhancement
  adaptToLearningStyle: (message: string, learningStyle: string) => Promise<AIResponse>;
  generateMemoryAids: (concept: string, difficulty: string) => Promise<string[]>;
  
  // User profile management
  updateUserProfile: (profile: any) => void;
  getUserProfile: () => any;
  
  // Conversation management
  getConversationHistory: () => any[];
  clearConversationHistory: () => void;
  
  // Analytics
  getAIAnalytics: () => any;
  
  // Error handling
  error: string | null;
  clearError: () => void;
}

export function useSuperIntelligentAI(): UseSuperIntelligentAIReturn {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize AI service
  useEffect(() => {
    const initAI = async () => {
      try {
        setIsLoading(true);
        const success = await enhancedAIService.initialize();
        setIsInitialized(success);
        if (!success) {
          setError('Falha ao inicializar a IA superinteligente');
        }
      } catch (err) {
        setError('Erro ao inicializar a IA: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
      } finally {
        setIsLoading(false);
      }
    };

    initAI();
  }, []);

  // Core AI functions
  const generateResponse = useCallback(async (message: string, context?: any): Promise<AIResponse> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await enhancedAIService.generateResponse(message, context);
      return response;
    } catch (err) {
      const errorMessage = 'Erro ao gerar resposta: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  // Learning functions
  const generateLearningPath = useCallback(async (goals: string[], skills: string[]): Promise<LearningPath[]> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const paths = await enhancedAIService.generatePersonalizedLearningPath(goals, skills);
      return paths;
    } catch (err) {
      const errorMessage = 'Erro ao gerar roteiros: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const getRecommendations = useCallback(async (userProgress: any): Promise<PersonalizedRecommendation[]> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const recommendations = await enhancedAIService.getPersonalizedRecommendations(userProgress);
      return recommendations;
    } catch (err) {
      const errorMessage = 'Erro ao gerar recomendações: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  // Code analysis functions
  const analyzeCode = useCallback(async (code: string, language: string): Promise<CodeAnalysis> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const analysis = await enhancedAIService.analyzeCode(code, language);
      return analysis;
    } catch (err) {
      const errorMessage = 'Erro ao analisar código: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const generateCodeSolution = useCallback(async (problem: string, language: string, requirements: string[]): Promise<AIResponse> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const solution = await enhancedAIService.generateCodeSolution(problem, language, requirements);
      return solution;
    } catch (err) {
      const errorMessage = 'Erro ao gerar solução: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  // Tutoring functions
  const explainConcept = useCallback(async (concept: string, level: string, examples: boolean = true): Promise<AIResponse> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const explanation = await enhancedAIService.explainConcept(concept, level, examples);
      return explanation;
    } catch (err) {
      const errorMessage = 'Erro ao explicar conceito: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const generateQuiz = useCallback(async (topic: string, difficulty: string, questionCount: number = 5): Promise<any> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const quiz = await enhancedAIService.generateInteractiveQuiz(topic, difficulty, questionCount);
      return quiz;
    } catch (err) {
      const errorMessage = 'Erro ao gerar quiz: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  // Project guidance
  const generateProjectIdea = useCallback(async (skills: string[], interests: string[], timeAvailable: string): Promise<any> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const project = await enhancedAIService.generateProjectIdea(skills, interests, timeAvailable);
      return project;
    } catch (err) {
      const errorMessage = 'Erro ao gerar projeto: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const reviewProject = useCallback(async (projectCode: string, projectDescription: string): Promise<any> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const review = await enhancedAIService.reviewProject(projectCode, projectDescription);
      return review;
    } catch (err) {
      const errorMessage = 'Erro ao revisar projeto: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  // Cognitive enhancement
  const adaptToLearningStyle = useCallback(async (message: string, learningStyle: string): Promise<AIResponse> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await enhancedAIService.adaptToLearningStyle(message, learningStyle);
      return response;
    } catch (err) {
      const errorMessage = 'Erro ao adaptar estilo: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const generateMemoryAids = useCallback(async (concept: string, difficulty: string): Promise<string[]> => {
    if (!isInitialized) {
      throw new Error('IA não está inicializada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const aids = await enhancedAIService.generateMemoryAids(concept, difficulty);
      return aids;
    } catch (err) {
      const errorMessage = 'Erro ao gerar auxiliares: ' + (err instanceof Error ? err.message : 'Erro desconhecido');
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  // User profile management
  const updateUserProfile = useCallback((profile: any) => {
    enhancedAIService.updateUserProfile(profile);
  }, []);

  const getUserProfile = useCallback(() => {
    return enhancedAIService.getUserProfile();
  }, []);

  // Conversation management
  const getConversationHistory = useCallback(() => {
    return enhancedAIService.getConversationHistory();
  }, []);

  const clearConversationHistory = useCallback(() => {
    enhancedAIService.clearConversationHistory();
  }, []);

  // Analytics
  const getAIAnalytics = useCallback(() => {
    return enhancedAIService.getAIAnalytics();
  }, []);

  // Error handling
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Core AI functions
    generateResponse,
    isInitialized,
    isLoading,
    
    // Learning functions
    generateLearningPath,
    getRecommendations,
    
    // Code analysis functions
    analyzeCode,
    generateCodeSolution,
    
    // Tutoring functions
    explainConcept,
    generateQuiz,
    
    // Project guidance
    generateProjectIdea,
    reviewProject,
    
    // Cognitive enhancement
    adaptToLearningStyle,
    generateMemoryAids,
    
    // User profile management
    updateUserProfile,
    getUserProfile,
    
    // Conversation management
    getConversationHistory,
    clearConversationHistory,
    
    // Analytics
    getAIAnalytics,
    
    // Error handling
    error,
    clearError
  };
}

export default useSuperIntelligentAI;


