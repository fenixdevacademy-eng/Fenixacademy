import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://fenixacademy.com.br'

    const courses = [
        'web-fundamentals',
        'python-data-science',
        'react-avancado',
        'nodejs-apis',
        'javascript-es6',
        'html5-css3',
        'express-js',
        'docker-devops',
        'machine-learning',
        'artificial-intelligence',
        'blockchain-smart-contracts',
        'cybersecurity',
        'mobile-development',
        'full-stack-development',
        'ui-ux-design',
        'product-management',
        'agile-methodology',
        'cloud-computing',
        'database-design',
        'game-development'
    ]

    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/courses`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/ide`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ]

    const coursePages = courses.map((course) => ({
        url: `${baseUrl}/course/${course}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...coursePages]
}
