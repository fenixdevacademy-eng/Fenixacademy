'use client';

import React from 'react';
import { 
  Play, 
  Lock, 
  Eye, 
  Star, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  BookOpen,
  Zap
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  level: string;
  duration: string;
  modules: number;
  lessons: number;
  rating: number;
  students: number;
  price: number;
  originalPrice: number;
  category: string;
  tags: string[];
  isFree: boolean;
  preview: {
    available: boolean;
    lessons: number;
    duration: string;
  };
  access: {
    hasAccess: boolean;
    isPurchased: boolean;
    canPreview: boolean;
    previewLessons: number;
    previewDuration: string;
  };
}

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  onPreview?: (courseId: string) => void;
  onAccess?: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onEnroll, 
  onPreview, 
  onAccess 
}) => {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'iniciante':
        return 'bg-green-100 text-green-800';
      case 'intermediário':
        return 'bg-yellow-100 text-yellow-800';
      case 'avançado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return 'bg-blue-100 text-blue-800';
      case 'backend':
        return 'bg-purple-100 text-purple-800';
      case 'data science':
        return 'bg-orange-100 text-orange-800';
      case 'fundamentos':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Overlay com informações de acesso */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          {course.access.hasAccess ? (
            <button
              onClick={() => onAccess?.(course.id)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Acessar Curso</span>
            </button>
          ) : course.access.canPreview ? (
            <button
              onClick={() => onPreview?.(course.id)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Eye className="w-5 h-5" />
              <span>Ver Prévia</span>
            </button>
          ) : (
            <button
              onClick={() => onEnroll?.(course.id)}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Inscrever-se</span>
            </button>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
            {course.category}
          </span>
        </div>

        {/* Status de acesso */}
        <div className="absolute top-4 right-4">
          {course.access.hasAccess ? (
            <div className="bg-green-500 text-white p-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
            </div>
          ) : course.access.isPurchased ? (
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <BookOpen className="w-5 h-5" />
            </div>
          ) : (
            <div className="bg-gray-500 text-white p-2 rounded-full">
              <Lock className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {/* Título e instrutor */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          
          <div className="flex items-center space-x-3">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-600">{course.instructor}</span>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Estatísticas */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{course.rating}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Informações do curso */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{course.modules} módulos • {course.lessons} aulas</span>
          
          {course.access.canPreview && !course.access.hasAccess && (
            <span className="text-blue-600 font-medium">
              {course.access.previewLessons} aulas gratuitas
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Preço e botão de ação */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {course.isFree ? (
              <span className="text-green-600 font-bold text-lg">Gratuito</span>
            ) : (
              <>
                <span className="text-gray-900 font-bold text-lg">
                  R$ {course.price.toFixed(2)}
                </span>
                {course.originalPrice > course.price && (
                  <span className="text-gray-500 line-through text-sm">
                    R$ {course.originalPrice.toFixed(2)}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Botão de ação baseado no status de acesso */}
          {course.access.hasAccess ? (
            <button
              onClick={() => onAccess?.(course.id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Acessar</span>
            </button>
          ) : course.access.canPreview ? (
            <button
              onClick={() => onPreview?.(course.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Prévia</span>
            </button>
          ) : (
            <button
              onClick={() => onEnroll?.(course.id)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Inscrever</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;