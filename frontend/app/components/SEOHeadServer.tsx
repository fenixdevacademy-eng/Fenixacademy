import Head from 'next/head';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'course' | 'profile';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
    locale?: string;
    alternateLocales?: string[];
    noIndex?: boolean;
    noFollow?: boolean;
    canonicalUrl?: string;
    structuredData?: any;
    pathname?: string;
}

export default function SEOHeadServer({
    title = 'Fenix Academy - Learn Programming from Zero to Advanced',
    description = 'International programming education platform with practical courses, real projects, and personalized mentorship. From basic to advanced in Python, JavaScript, React and much more.',
    keywords = 'programming, courses, python, javascript, react, web development, technology, education, coding, software development',
    image = '/og-image.jpg',
    url,
    type = 'website',
    author = 'Fenix Academy',
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    locale = 'en_US',
    alternateLocales = ['pt_BR', 'es_ES', 'fr_FR', 'de_DE'],
    noIndex = false,
    noFollow = false,
    canonicalUrl,
    structuredData,
    pathname = '/'
}: SEOHeadProps) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fenixacademy.com';
    const currentUrl = url || `${siteUrl}${pathname}`;
    const canonical = canonicalUrl || currentUrl;

    // Generate structured data for educational content
    const generateStructuredData = () => {
        const baseData = {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Fenix Academy",
            "description": description,
            "url": siteUrl,
            "logo": `${siteUrl}/logo.png`,
            "sameAs": [
                "https://www.linkedin.com/company/fenix-academy",
                "https://twitter.com/fenixacademy",
                "https://www.instagram.com/fenixacademy",
                "https://www.youtube.com/fenixacademy"
            ],
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contato@fenixacademy.com",
                "availableLanguage": ["English", "Portuguese", "Spanish"]
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Programming Courses",
                "description": "Comprehensive programming courses from beginner to advanced"
            }
        };

        // Add course-specific structured data if type is 'course'
        if (type === 'course') {
            return {
                "@context": "https://schema.org",
                "@type": "Course",
                "name": title,
                "description": description,
                "provider": {
                    "@type": "EducationalOrganization",
                    "name": "Fenix Academy"
                },
                "courseMode": "online",
                "educationalLevel": "beginner",
                "inLanguage": ["en", "pt", "es"],
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            };
        }

        return structuredData || baseData;
    };

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />

            {/* Robots */}
            {noIndex && <meta name="robots" content="noindex" />}
            {noFollow && <meta name="robots" content="nofollow" />}
            {!noIndex && !noFollow && <meta name="robots" content="index, follow" />}

            {/* Canonical URL */}
            <link rel="canonical" href={canonical} />

            {/* Language and Locale */}
            <meta property="og:locale" content={locale} />
            {alternateLocales.map(loc => (
                <meta key={loc} property="og:locale:alternate" content={loc} />
            ))}

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={`${siteUrl}${image}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:site_name" content="Fenix Academy" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}${image}`} />
            <meta name="twitter:site" content="@fenixacademy" />
            <meta name="twitter:creator" content="@fenixacademy" />

            {/* Article specific meta tags */}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            {type === 'article' && author && (
                <meta property="article:author" content={author} />
            )}
            {type === 'article' && section && (
                <meta property="article:section" content={section} />
            )}
            {type === 'article' && tags.length > 0 && (
                tags.map(tag => (
                    <meta key={tag} property="article:tag" content={tag} />
                ))
            )}

            {/* Course specific meta tags */}
            {type === 'course' && (
                <>
                    <meta property="og:type" content="website" />
                    <meta name="twitter:card" content="summary_large_image" />
                </>
            )}

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateStructuredData())
                }}
            />

            {/* Additional Meta Tags for International SEO */}
            <meta name="geo.region" content="BR" />
            <meta name="geo.placename" content="São Paulo" />
            <meta name="geo.position" content="-23.5505;-46.6333" />
            <meta name="ICBM" content="-23.5505, -46.6333" />

            {/* Language alternatives for hreflang */}
            <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${pathname}`} />
            <link rel="alternate" hrefLang="pt" href={`${siteUrl}/pt${pathname}`} />
            <link rel="alternate" hrefLang="es" href={`${siteUrl}/es${pathname}`} />
            <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr${pathname}`} />
            <link rel="alternate" hrefLang="de" href={`${siteUrl}/de${pathname}`} />
            <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${pathname}`} />

            {/* Mobile and Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="theme-color" content="#3B82F6" />
            <meta name="msapplication-TileColor" content="#3B82F6" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Fenix Academy" />

            {/* Favicon and App Icons */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />

            {/* Preconnect to external domains for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://js.stripe.com" />
            <link rel="preconnect" href="https://www.google-analytics.com" />

            {/* DNS prefetch for performance */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//js.stripe.com" />

            {/* Security Headers */}
            <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            <meta httpEquiv="X-Frame-Options" content="DENY" />
            <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

            {/* Performance and Caching */}
            <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />

            {/* Social Media Verification */}
            <meta name="google-site-verification" content="your-google-verification-code" />
            <meta name="facebook-domain-verification" content="your-facebook-verification-code" />

            {/* Additional SEO Meta Tags */}
            <meta name="application-name" content="Fenix Academy" />
            <meta name="msapplication-config" content="/browserconfig.xml" />
            <meta name="format-detection" content="telephone=no" />

            {/* Educational Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "EducationalOrganization",
                        "name": "Fenix Academy",
                        "description": "International programming education platform",
                        "url": siteUrl,
                        "logo": `${siteUrl}/logo.png`,
                        "foundingDate": "2024",
                        "numberOfEmployees": "50-100",
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "BR",
                            "addressLocality": "São Paulo",
                            "addressRegion": "SP"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "customer service",
                            "email": "contato@fenixacademy.com",
                            "availableLanguage": ["English", "Portuguese", "Spanish", "French", "German"]
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Programming Courses",
                            "description": "Comprehensive programming courses from beginner to advanced levels"
                        },
                        "alumni": {
                            "@type": "Person",
                            "name": "Graduates"
                        },
                        "award": [
                            "Best Online Programming Platform 2024",
                            "Excellence in Education Technology"
                        ]
                    })
                }}
            />
        </Head>
    );
} 