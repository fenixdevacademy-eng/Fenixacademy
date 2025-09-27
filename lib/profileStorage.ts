// Profile Storage Service
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  preferences?: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
    timezone?: string;
    emailNotifications?: boolean;
    pushNotifications?: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export class ProfileStorage {
  private static readonly STORAGE_KEY = 'fenix-user-profile';

  static save(profile: UserProfile): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  }

  static load(): UserProfile | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  }

  static clear(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing profile:', error);
    }
  }

  static update(updates: Partial<UserProfile>): UserProfile | null {
    const current = this.load();
    if (current) {
      const updated = { ...current, ...updates, updatedAt: new Date() };
      this.save(updated);
      return updated;
    }
    return null;
  }
}