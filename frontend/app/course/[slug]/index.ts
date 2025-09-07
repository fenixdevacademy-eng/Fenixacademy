import { CourseContent } from './types/course-types';
import { webFundamentalsCourse } from './courses/web-fundamentals';
import { pythonDataScienceCourse } from './courses/python-data-science';
import { reactAdvancedCourse } from './courses/react-advanced';
import { backendDevelopmentCourse } from './courses/backend-development';
import { machineLearningCourse } from './courses/machine-learning';
import { frontendDevelopmentCourse } from './courses/frontend-development';
import { cybersecurityCourse } from './courses/cybersecurity';
import { devopsDockerCourse } from './courses/devops-docker';
import { flutterMobileCourse } from './courses/flutter-mobile';
import { awsCloudCourse } from './courses/aws-cloud';
import { blockchainSmartContractsCourse } from './courses/blockchain-smart-contracts';
import { reactNativeMobileCourse } from './courses/react-native-mobile';
import { dataScienceCourse } from './courses/data-science';
import { gameDevelopmentCourse } from './courses/game-development';

export function getCourseContent(courseId: string): CourseContent | null {
    const courseMap: { [key: string]: CourseContent } = {
        'web-fundamentals': webFundamentalsCourse,
        'python-data-science': pythonDataScienceCourse,
        'react-avancado': reactAdvancedCourse,
        'nodejs-backend-development': backendDevelopmentCourse,
        'machine-learning-python': machineLearningCourse,
        'desenvolvimento-mobile': frontendDevelopmentCourse,
        'cybersecurity-ethical-hacking': cybersecurityCourse,
        'devops-cicd': devopsDockerCourse,
        'flutter-mobile': flutterMobileCourse,
        'aws-cloud': awsCloudCourse,
        'blockchain-smart-contracts': blockchainSmartContractsCourse,
        'react-native-mobile': reactNativeMobileCourse,
        'data-engineering': dataScienceCourse,
        'game-development': gameDevelopmentCourse
    };

    return courseMap[courseId] || null;
}

export {
    webFundamentalsCourse,
    pythonDataScienceCourse,
    reactAdvancedCourse,
    backendDevelopmentCourse,
    machineLearningCourse,
    frontendDevelopmentCourse,
    cybersecurityCourse,
    devopsDockerCourse,
    flutterMobileCourse,
    awsCloudCourse,
    blockchainSmartContractsCourse,
    reactNativeMobileCourse,
    dataScienceCourse,
    gameDevelopmentCourse
};

export type { CourseContent, Module, Lesson } from './types/course-types';
