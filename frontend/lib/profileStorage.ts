'use client';

﻿// Profile Storage Service
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

export class ProfileStorageService {
    private static readonly STORAGE_KEY = 'fenix-user-profile';

    static save(profile: UserProfile): void {
        try {
            const profileData = {
                ...profile,
                createdAt: profile.createdAt.toISOString(),
                updatedAt: profile.updatedAt.toISOString()
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profileData));
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    }

    static load(): UserProfile | null {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (!stored) return null;

            const profileData = JSON.parse(stored);
            return {
                ...profileData,
                createdAt: new Date(profileData.createdAt),
                updatedAt: new Date(profileData.updatedAt)
            };
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
        if (!current) return null;

        const updated = {
            ...current,
            ...updates,
            updatedAt: new Date()
        };

        this.save(updated);
        return updated;
    }
}