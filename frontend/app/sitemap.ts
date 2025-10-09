import { MetadataRoute } from 'next'
import { ROUTES } from '@/lib/routes'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://fenixdevacademy.com.br'
    const currentDate = new Date()

    // Static pages
    const staticPages = [
        { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'yearly' as const },
        { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/courses`, priority: 0.9, changeFrequency: 'weekly' as const },
        { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: 'weekly' as const },
        { url: `${baseUrl}/careers`, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/support`, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/help`, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/community`, priority: 0.7, changeFrequency: 'weekly' as const },
        { url: `${baseUrl}/founders`, priority: 0.5, changeFrequency: 'yearly' as const },
        { url: `${baseUrl}/auth/login`, priority: 0.5, changeFrequency: 'yearly' as const },
        { url: `${baseUrl}/auth/register`, priority: 0.5, changeFrequency: 'yearly' as const },
        { url: `${baseUrl}/dashboard`, priority: 0.6, changeFrequency: 'daily' as const },
        { url: `${baseUrl}/profile`, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/settings`, priority: 0.4, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/my-courses`, priority: 0.6, changeFrequency: 'daily' as const },
        { url: `${baseUrl}/progress`, priority: 0.5, changeFrequency: 'daily' as const },
        { url: `${baseUrl}/certificates`, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/expanded-courses`, priority: 0.8, changeFrequency: 'weekly' as const },
        { url: `${baseUrl}/expanded-dashboard`, priority: 0.6, changeFrequency: 'daily' as const },
        { url: `${baseUrl}/expanded-search`, priority: 0.5, changeFrequency: 'weekly' as const },
        { url: `${baseUrl}/expanded-exercises`, priority: 0.6, changeFrequency: 'weekly' as const },
        { url: `${baseUrl}/expanded-quizzes`, priority: 0.6, changeFrequency: 'weekly' as const },
        { url: `${baseUrl}/ide-advanced`, priority: 0.7, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/ide`, priority: 0.7, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/ide-advanced-simple`, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/fenix-ide`, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/intellisense`, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/payment`, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/payments`, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/subscriptions`, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/comecar-agora`, priority: 0.8, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/become-student`, priority: 0.7, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/launch`, priority: 0.6, changeFrequency: 'yearly' as const },
        { url: `${baseUrl}/ai`, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/assinaturas`, priority: 0.5, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/faturamento`, priority: 0.4, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/gestao-trafego`, priority: 0.4, changeFrequency: 'monthly' as const },
        { url: `${baseUrl}/courses-content`, priority: 0.6, changeFrequency: 'weekly' as const },
        { url: `${baseUrl}/exercicios`, priority: 0.6, changeFrequency: 'weekly' as const },
        { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
        { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
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
        url: `${baseUrl}/course-detail/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8
    }))

    const expandedCoursePages = courseSlugs.map(slug => ({
        url: `${baseUrl}/expanded-course-detail/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7
    }))

    return [
        ...staticPages.map(page => ({
            url: `${baseUrl}${page.url}`,
            lastModified: currentDate,
            changeFrequency: page.changeFrequency,
            priority: page.priority
        })),
        ...coursePages,
        ...expandedCoursePages,
    ]
}