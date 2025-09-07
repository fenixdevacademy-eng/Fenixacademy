import { CourseContent } from '../types/course-types';
import { webFundamentalsCourse } from './web-fundamentals';

// Importar o curso React Avançado
import { reactAdvancedCourse } from './react-advanced';

// Importar o curso Node.js e APIs
import { nodejsApisCourse } from './nodejs-apis';

// Importar o curso UI/UX Design
import { uiUxDesignCourse } from './ui-ux-design';

// Importar o curso Python para Data Science
import { pythonDataScienceCourse } from './python-data-science';

// Importar o curso Flutter Mobile
import { flutterMobileCourse } from './flutter-mobile';

// Importar o curso DevOps e Docker
import { devopsDockerCourse } from './devops-docker';

// Importar o curso AWS Cloud Computing
import { awsCloudCourse } from './aws-cloud';

// Importar o curso Blockchain e Smart Contracts
import { blockchainSmartContractsCourse } from './blockchain-smart-contracts';

// Importar o curso Cibersegurança
import { cybersecurityCourse } from './cybersecurity';

// Importar os novos cursos
import { reactNativeMobileCourse } from './react-native-mobile';
import { machineLearningCourse } from './machine-learning';
import { dataScienceCourse } from './data-science';
import { backendDevelopmentCourse } from './backend-development';
import { frontendDevelopmentCourse } from './frontend-development';
import { fullStackDevelopmentCourse } from './full-stack-development';
import { gameDevelopmentCourse } from './game-development';
import { productManagementCourse } from './product-management';
import { softwareArchitectureCourse } from './software-architecture';
import { gestaoTrafegoCourse } from './gestao-trafego';

// Exportar todos os cursos da versão 2.0.0
export const allCourses: Record<string, CourseContent> = {
    'web-fundamentals': webFundamentalsCourse,
    'react-advanced': reactAdvancedCourse,
    'nodejs-apis': nodejsApisCourse,
    'ui-ux-design': uiUxDesignCourse,
    'python-data-science': pythonDataScienceCourse,
    'flutter-mobile': flutterMobileCourse,
    'devops-docker': devopsDockerCourse,
    'aws-cloud': awsCloudCourse,
    'blockchain-smart-contracts': blockchainSmartContractsCourse,
    'cybersecurity': cybersecurityCourse,
    'react-native-mobile': reactNativeMobileCourse,
    'machine-learning': machineLearningCourse,
    'data-science': dataScienceCourse,
    'backend-development': backendDevelopmentCourse,
    'frontend-development': frontendDevelopmentCourse,
    'full-stack-development': fullStackDevelopmentCourse,
    'game-development': gameDevelopmentCourse,
    'product-management': productManagementCourse,
    'software-architecture': softwareArchitectureCourse,
    'gestao-trafego': gestaoTrafegoCourse,
    // Outros cursos serão adicionados aqui
};

// Função para obter curso por slug
export function getCourseBySlug(slug: string): CourseContent | null {
    return allCourses[slug] || null;
}

// Função para obter todos os cursos
export function getAllCourses(): CourseContent[] {
    return Object.values(allCourses);
}

// Função para obter cursos por categoria
export function getCoursesByCategory(category: string): CourseContent[] {
    return getAllCourses().filter(course => course.category === category);
}

// Função para obter cursos por nível
export function getCoursesByLevel(level: string): CourseContent[] {
    return getAllCourses().filter(course => course.level === level);
}

// Exportar tipos
export type { CourseContent, CourseSummary, CourseProgress, UserProgress } from '../types/course-types';

