'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ROUTES, routeHelpers } from '@/lib/routes';

export interface NavigationOptions {
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
}

export interface NavigationState {
    isLoading: boolean;
    error: string | null;
    previousPath: string | null;
}

export const useNavigation = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [state, setState] = useState<NavigationState>({
        isLoading: false,
        error: null,
        previousPath: null
    });

    // Track previous path
    useEffect(() => {
        setState(prev => ({
            ...prev,
            previousPath: prev.previousPath || pathname
        }));
    }, [pathname]);

    const navigate = useCallback((
        path: string,
        options: NavigationOptions = {}
    ) => {
        const { replace = false, scroll = true, shallow = false } = options;

        setState(prev => ({
            ...prev,
            isLoading: true,
            error: null
        }));

        try {
            if (replace) {
                router.replace(path, { scroll });
            } else {
                router.push(path, { scroll });
            }

            // Reset loading state after navigation
            setTimeout(() => {
                setState(prev => ({
                    ...prev,
                    isLoading: false
                }));
            }, 100);
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Navigation failed'
            }));
        }
    }, [router]);

    const goBack = useCallback(() => {
        router.back();
    }, [router]);

    const goForward = useCallback(() => {
        router.forward();
    }, [router]);

    const refresh = useCallback(() => {
        router.refresh();
    }, [router]);

    // Predefined navigation functions
    const navigateToHome = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.HOME, options);
    }, [navigate]);

    const navigateToCourses = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.COURSES, options);
    }, [navigate]);

    const navigateToCourse = useCallback((slug: string, options?: NavigationOptions) => {
        navigate(ROUTES.COURSE_DETAIL(slug), options);
    }, [navigate]);

    const navigateToDashboard = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.DASHBOARD, options);
    }, [navigate]);

    const navigateToLogin = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.LOGIN, options);
    }, [navigate]);

    const navigateToRegister = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.REGISTER, options);
    }, [navigate]);

    const navigateToProfile = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.PROFILE, options);
    }, [navigate]);

    const navigateToSettings = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.SETTINGS, options);
    }, [navigate]);

    const navigateToCommunity = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.COMMUNITY, options);
    }, [navigate]);

    const navigateToAI = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.AI, options);
    }, [navigate]);

    const navigateToIDE = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.IDE_ADVANCED, options);
    }, [navigate]);

    const navigateToPayment = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.PAYMENTS, options);
    }, [navigate]);

    const navigateToPricing = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.PRICING, options);
    }, [navigate]);

    const navigateToAbout = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.ABOUT, options);
    }, [navigate]);

    const navigateToContact = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.CONTACT, options);
    }, [navigate]);

    const navigateToBlog = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.BLOG, options);
    }, [navigate]);

    const navigateToCareers = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.CAREERS, options);
    }, [navigate]);

    const navigateToSupport = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.SUPPORT, options);
    }, [navigate]);

    const navigateToHelp = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.HELP, options);
    }, [navigate]);

    const navigateToSubscriptions = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.ASSINATURAS, options);
    }, [navigate]);

    const navigateToBecomeStudent = useCallback((options?: NavigationOptions) => {
        navigate(ROUTES.BECOME_STUDENT, options);
    }, [navigate]);

    // Course-specific navigation
    const navigateToCourseLesson = useCallback((slug: string, lessonId: string, options?: NavigationOptions) => {
        navigate(ROUTES.COURSE_LESSON(slug, lessonId), options);
    }, [navigate]);

    const navigateToCourseModule = useCallback((slug: string, moduleId: string, options?: NavigationOptions) => {
        navigate(ROUTES.COURSE_MODULE(slug, moduleId), options);
    }, [navigate]);

    const navigateToCourseExercise = useCallback((slug: string, exerciseId: string, options?: NavigationOptions) => {
        navigate(ROUTES.COURSE_EXERCISE(slug, exerciseId), options);
    }, [navigate]);

    const navigateToCourseQuiz = useCallback((slug: string, quizId: string, options?: NavigationOptions) => {
        navigate(ROUTES.COURSE_QUIZ(slug, quizId), options);
    }, [navigate]);

    const navigateToCourseProject = useCallback((slug: string, projectId: string, options?: NavigationOptions) => {
        navigate(ROUTES.COURSE_PROJECT(slug, projectId), options);
    }, [navigate]);

    const navigateToCoursePurchase = useCallback((slug: string, options?: NavigationOptions) => {
        navigate(ROUTES.COURSE_PURCHASE(slug), options);
    }, [navigate]);

    // Utility functions
    const isCurrentPath = useCallback((path: string) => {
        return routeHelpers.isActive(pathname, path);
    }, [pathname]);

    const getCurrentCategory = useCallback(() => {
        return routeHelpers.getCategory(pathname);
    }, [pathname]);

    const requiresAuth = useCallback((path?: string) => {
        return routeHelpers.requiresAuth(path || pathname);
    }, [pathname]);

    const getBreadcrumb = useCallback(() => {
        return routeHelpers.getBreadcrumb(pathname);
    }, [pathname]);

    return {
        // State
        ...state,
        currentPath: pathname,

        // Navigation functions
        navigate,
        goBack,
        goForward,
        refresh,

        // Predefined navigation
        navigateToHome,
        navigateToCourses,
        navigateToCourse,
        navigateToDashboard,
        navigateToLogin,
        navigateToRegister,
        navigateToProfile,
        navigateToSettings,
        navigateToCommunity,
        navigateToAI,
        navigateToIDE,
        navigateToPayment,
        navigateToPricing,
        navigateToAbout,
        navigateToContact,
        navigateToBlog,
        navigateToCareers,
        navigateToSupport,
        navigateToHelp,
        navigateToSubscriptions,
        navigateToBecomeStudent,

        // Course navigation
        navigateToCourseLesson,
        navigateToCourseModule,
        navigateToCourseExercise,
        navigateToCourseQuiz,
        navigateToCourseProject,
        navigateToCoursePurchase,

        // Utility functions
        isCurrentPath,
        getCurrentCategory,
        requiresAuth,
        getBreadcrumb
    }
}

export default useNavigation;