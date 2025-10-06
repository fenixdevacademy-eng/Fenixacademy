import { MetadataRoute } from 'next'
import { ROUTES } from '@/lib/routes'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://fenixdevacademy.com.br'
    const currentDate = new Date()

    // Static pages
    const staticPages = [
        { url: ROUTES.HOME, priority: 1.0, changeFrequency: 'yearly' as const },
        { url: ROUTES.ABOUT, priority: 0.8, changeFrequency: 'monthly' as const },
        { url: ROUTES.COURSES, priority: 0.9, changeFrequency: 'weekly' as const },
        { url: ROUTES.PRICING, priority: 0.8, changeFrequency: 'monthly' as const },
        { url: ROUTES.CONTACT, priority: 0.7, changeFrequency: 'monthly' as const },
        { url: ROUTES.BLOG, priority: 0.7, changeFrequency: 'weekly' as const },
        { url: ROUTES.CAREERS, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: ROUTES.SUPPORT, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: ROUTES.HELP, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: ROUTES.COMMUNITY, priority: 0.7, changeFrequency: 'weekly' as const },
        { url: ROUTES.FOUNDERS, priority: 0.5, changeFrequency: 'yearly' as const },
        { url: ROUTES.LOGIN, priority: 0.5, changeFrequency: 'yearly' as const },
        { url: ROUTES.REGISTER, priority: 0.5, changeFrequency: 'yearly' as const },
        { url: ROUTES.DASHBOARD, priority: 0.6, changeFrequency: 'daily' as const },
        { url: ROUTES.PROFILE, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: ROUTES.SETTINGS, priority: 0.4, changeFrequency: 'monthly' as const },
        { url: ROUTES.MY_COURSES, priority: 0.6, changeFrequency: 'daily' as const },
        { url: ROUTES.PROGRESS, priority: 0.5, changeFrequency: 'daily' as const },
        { url: ROUTES.CERTIFICATES, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: ROUTES.EXPANDED_COURSES, priority: 0.8, changeFrequency: 'weekly' as const },
        { url: ROUTES.EXPANDED_DASHBOARD, priority: 0.6, changeFrequency: 'daily' as const },
        { url: ROUTES.EXPANDED_SEARCH, priority: 0.5, changeFrequency: 'weekly' as const },
        { url: ROUTES.EXPANDED_EXERCISES, priority: 0.6, changeFrequency: 'weekly' as const },
        { url: ROUTES.EXPANDED_QUIZZES, priority: 0.6, changeFrequency: 'weekly' as const },
        { url: ROUTES.IDE_ADVANCED, priority: 0.7, changeFrequency: 'monthly' as const },
        { url: ROUTES.IDE_ADVANCED, priority: 0.7, changeFrequency: 'monthly' as const },
        { url: ROUTES.IDE_ADVANCED_SIMPLE, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: ROUTES.FENIX_IDE, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: ROUTES.INTELLISENSE, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: ROUTES.PAYMENT, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: ROUTES.PAYMENTS, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: ROUTES.SUBSCRIPTIONS, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: ROUTES.COMEÇAR_AGORA, priority: 0.8, changeFrequency: 'monthly' as const },
        { url: ROUTES.BECOME_STUDENT, priority: 0.7, changeFrequency: 'monthly' as const },
        { url: ROUTES.LAUNCH, priority: 0.6, changeFrequency: 'yearly' as const },
        { url: ROUTES.AI, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: ROUTES.ASSINATURAS, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: ROUTES.FATURAMENTO, priority: 0.4, changeFrequency: 'monthly' as const },
        { url: ROUTES.GESTAO_TRAFEGO, priority: 0.4, changeFrequency: 'monthly' as const },
        { url: ROUTES.COURSES_CONTENT, priority: 0.6, changeFrequency: 'weekly' as const },
        { url: ROUTES.EXERCICIOS, priority: 0.6, changeFrequency: 'weekly' as const },
        { url: ROUTES.TERMS, priority: 0.3, changeFrequency: 'yearly' as const },
        { url: ROUTES.PRIVACY, priority: 0.3, changeFrequency: 'yearly' as const },
    ]

    // Course pages (dynamic)
    const courseSlugs = [
        'python-data-science',
        'web-development',
        'mobile-development',
        'javascript-advanced',
        'devops-aws',
        'ai-machine-learning',
        'java-spring-boot',
        'csharp-dotnet',
        'php-laravel',
        'ruby-rails',
        'go-programming',
        'rust-systems',
        'swift-ios',
        'kotlin-android',
        'vue-js',
        'angular-complete',
        'svelte-modern',
        'next-js-advanced',
        'nuxt-js-vue',
        'gatsby-react',
        'django-python',
        'flask-python',
        'express-nodejs',
        'fastapi-python',
        'react-advanced',
        'nodejs-apis'
    ]

    const coursePages = courseSlugs.map(slug => ({
        url: `${baseUrl}${ROUTES.COURSE_DETAIL(slug)}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8}))

    const expandedCoursePages = courseSlugs.map(slug => ({
        url: `${baseUrl}${ROUTES.EXPANDED_COURSE_DETAIL(slug)}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7}))

    return [
        ...staticPages.map(page => ({
            url: `${baseUrl}${page.url}`,
            lastModified: currentDate,
            changeFrequency: page.changeFrequency,
            priority: page.priority})),
        ...coursePages,
        ...expandedCoursePages,
    ]
}