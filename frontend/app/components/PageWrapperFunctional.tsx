'use client';

import React from 'react';
import SEOHead from './SEOHead';

interface PageWrapperFunctionalProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export const PageWrapperFunctional: React.FC<PageWrapperFunctionalProps> = ({
    title,
    description,
    children,
    className = '',
}) => {
    return (
        <>
            {title && <SEOHead title={title} description={description} />}
            <div className={`min-h-screen bg-gray-50 ${className}`}>
                {children}
            </div>
        </>
    );
};









