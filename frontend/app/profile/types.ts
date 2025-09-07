
export interface UserCourse {
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
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

export interface UserCertificate {
  id: number;
  course_title: string;
  instructor: string;
  completed_at: string;
  certificate_url: string;
  score: number;
  valid_until: string | null;
  verification_code: string;
}

export interface StudySession {
  date: string;
  duration: number;
  course: string;
  lessons_completed: number;
}

export interface WeeklyProgress {
  day: string;
  hours: number;
}

export interface StudyStats {
  total_study_time: number;
  current_streak: number;
  longest_streak: number;
  average_session_time: number;
  favorite_study_time: string;
  study_sessions: StudySession[];
  weekly_progress: WeeklyProgress[];
}

export interface UserProfile {
  user_info: {
    name: string;
    email: string;
    avatar: string;
    joinDate: string;
    totalCourses: number;
    completedCourses: number;
    totalHours: number;
    studyHours: number;
    averageRating: number;
    currentStreak: number;
    longestStreak: number;
    level: number;
    experiencePoints: number;
    experienceToNextLevel: number;
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
    date: string;
  }>;
}
