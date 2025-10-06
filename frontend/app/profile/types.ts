'use client';

﻿export interface UserCourse {
  id: number;
  title: string;
  description: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: number;
  category: string;
  lessons: number;
  certificate: boolean;
  progress: number;
  completed: boolean;
  lastAccessed: string | null;
  enrolledAt: string | null;
  completedAt?: string;
}

export interface UserAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  points: number;
  category: 'learning' | 'social' | 'milestone' | 'special';
}

export interface UserCertificate {
  id: string;
  courseId: number;
  courseTitle: string;
  issuedAt: string;
  certificateUrl: string;
  verificationCode: string;
  validUntil?: string;
}

export interface StudyStats {
  totalHours: number;
  totalLessons: number;
  totalCourses: number;
  completedCourses: number;
  currentStreak: number;
  longestStreak: number;
  averageScore: number;
  totalPoints: number;
  level: number;
  experience: number;
  nextLevelExperience: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      inApp: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'private' | 'friends';
      showProgress: boolean;
      showAchievements: boolean;
    };
  };
  enrolled_courses: UserCourse[];
  available_courses: UserCourse[];
  achievements: UserAchievement[];
  certificates: UserCertificate[];
  study_stats: StudyStats;
  learning_goals: string[];
  recent_activity: Array<{
    type: string;
    course: string;
    lesson?: string;
    exercise?: string;
    score?: number;
    timestamp: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateData {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  preferences?: {
    theme?: 'light' | 'dark' | 'auto';
    language?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
      inApp?: boolean;
    };
    privacy?: {
      profileVisibility?: 'public' | 'private' | 'friends';
      showProgress?: boolean;
      showAchievements?: boolean;
    };
  };
}

export interface ProfileStats {
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  currentStreak: number;
  achievements: number;
  certificates: number;
  level: number;
  experience: number;
  nextLevelExperience: number;
  progressPercentage: number;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  type: 'course_started' | 'course_completed' | 'lesson_completed' | 'achievement_earned' | 'certificate_earned';
  title: string;
  description: string;
  timestamp: string;
  courseId?: number;
  courseTitle?: string;
  lessonId?: number;
  lessonTitle?: string;
  achievementId?: string;
  achievementTitle?: string;
  certificateId?: string;
  certificateTitle?: string;
  points?: number;
  icon?: string;
}

export interface ProfileSettings {
  account: {
    email: string;
    password: string;
    twoFactorEnabled: boolean;
    deleteAccount: boolean;
  };
  notifications: {
    email: {
      courseUpdates: boolean;
      achievementEarned: boolean;
      certificateEarned: boolean;
      weeklyProgress: boolean;
      marketing: boolean;
    };
    push: {
      courseUpdates: boolean;
      achievementEarned: boolean;
      certificateEarned: boolean;
      weeklyProgress: boolean;
    };
    inApp: {
      courseUpdates: boolean;
      achievementEarned: boolean;
      certificateEarned: boolean;
      weeklyProgress: boolean;
      social: boolean;
    };
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showProgress: boolean;
    showAchievements: boolean;
    showCertificates: boolean;
    showActivity: boolean;
    allowMessages: boolean;
    showEmail: boolean;
    showLocation: boolean;
  };
  learning: {
    autoPlay: boolean;
    playbackSpeed: number;
    subtitles: boolean;
    darkMode: boolean;
    fontSize: 'small' | 'medium' | 'large';
    language: string;
    timezone: string;
  };
  data: {
    exportData: boolean;
    deleteData: boolean;
    downloadCertificates: boolean;
    backupProgress: boolean;
  };
}

export default {
  UserCourse,
  UserAchievement,
  UserCertificate,
  StudyStats,
  UserProfile,
  ProfileUpdateData,
  ProfileStats,
  LearningGoal,
  ActivityItem,
  ProfileSettings
};