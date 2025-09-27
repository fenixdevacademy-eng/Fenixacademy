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
  Zap,
  Heart,
  Share2
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  isEnrolled?: boolean;
  isCompleted?: boolean;
  progress?: number;
  lessonsCount: number;
  studentsCount: number;
  tags: string[];
  isNew?: boolean;
  isPopular?: boolean;
  isFree?: boolean;
}

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  onView?: (courseId: string) => void;
  onFavorite?: (courseId: string) => void;
  onShare?: (courseId: string) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

export default function CourseCard({
  course,
  onEnroll,
  onView,
  onFavorite,
  onShare,
  className = '',
  variant = 'default'
}: CourseCardProps) {
  const {
    id,
    title,
    description,
    instructor,
    price,
    originalPrice,
    rating,
    reviewCount,
    duration,
    level,
    category,
    thumbnail,
    isEnrolled,
    isCompleted,
    progress = 0,
    lessonsCount,
    studentsCount,
    tags,
    isNew,
    isPopular,
    isFree
  } = course;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return level;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
      />
    ));
  };

  if (variant === 'compact') {
    return (
      <div className={`course-card-compact bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${className}`}>
        <div className="flex">
          <div className="relative w-24 h-24 flex-shrink-0">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover rounded-l-lg"
            />
            {isNew && (
              <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                Novo
              </span>
            )}
          </div>

          <div className="flex-1 p-3">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
              {title}
            </h3>
            <p className="text-xs text-gray-600 mb-2">{instructor}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {renderStars(rating)}
                <span className="text-xs text-gray-600">({reviewCount})</span>
              </div>

              <div className="text-right">
                {isFree ? (
                  <span className="text-green-600 font-semibold text-sm">Grátis</span>
                ) : (
                  <span className="text-gray-900 font-semibold text-sm">
                    {formatPrice(price)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`course-card-detailed bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow ${className}`}>
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />

          <div className="absolute top-3 left-3 flex gap-2">
            {isNew && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Novo
              </span>
            )}
            {isPopular && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Popular
              </span>
            )}
            {isFree && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Grátis
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex gap-1">
            <button
              onClick={() => onFavorite?.(id)}
              className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
            >
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => onShare?.(id)}
              className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">por {instructor}</p>
            </div>

            <div className="text-right">
              {isFree ? (
                <span className="text-2xl font-bold text-green-600">Grátis</span>
              ) : (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(price)}
                  </span>
                  {originalPrice && originalPrice > price && (
                    <span className="block text-sm text-gray-500 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>

          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{lessonsCount} aulas</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{studentsCount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
              <span className="text-sm text-gray-600">
                {rating.toFixed(1)} ({reviewCount})
              </span>
            </div>

            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(level)}`}>
              {getLevelLabel(level)}
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {isEnrolled && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>Progresso</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {isEnrolled ? (
              <button
                onClick={() => onView?.(id)}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Concluído
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Continuar
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => onEnroll?.(id)}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                {isFree ? 'Começar Grátis' : 'Inscrever-se'}
              </button>
            )}

            <button
              onClick={() => onView?.(id)}
              className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Ver
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`course-card bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${className}`}>
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-cover rounded-t-lg"
        />

        <div className="absolute top-2 left-2 flex gap-1">
          {isNew && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              Novo
            </span>
          )}
          {isPopular && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Popular
            </span>
          )}
        </div>

        <div className="absolute top-2 right-2">
          <button
            onClick={() => onFavorite?.(id)}
            className="p-1.5 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
            {title}
          </h3>
          <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getLevelColor(level)}`}>
            {getLevelLabel(level)}
          </span>
        </div>

        <p className="text-xs text-gray-600 mb-2">{instructor}</p>

        <div className="flex items-center gap-1 mb-2">
          {renderStars(rating)}
          <span className="text-xs text-gray-600">({reviewCount})</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{studentsCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {isFree ? (
              <span className="text-green-600 font-semibold">Grátis</span>
            ) : (
              <div>
                <span className="text-gray-900 font-semibold">
                  {formatPrice(price)}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="block text-xs text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => onView?.(id)}
              className="p-1.5 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>

            {isEnrolled ? (
              <button
                onClick={() => onView?.(id)}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 flex items-center gap-1"
              >
                <Play className="w-3 h-3" />
                {isCompleted ? 'Ver' : 'Continuar'}
              </button>
            ) : (
              <button
                onClick={() => onEnroll?.(id)}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 flex items-center gap-1"
              >
                <Zap className="w-3 h-3" />
                {isFree ? 'Grátis' : 'Inscrever'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}