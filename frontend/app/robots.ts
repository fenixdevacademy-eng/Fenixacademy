import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/'},
        sitemap: 'https://fenixdevacademy.com.br/sitemap.xml'}
}