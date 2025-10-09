'use client';

import React from 'react';

interface PageWrapperFunctionalProps {
    children: React.ReactNode;
    className?: string;
}

function PageWrapperFunctional({
    children,
    className = ''
}: PageWrapperFunctionalProps) {
    return (
        <div className={`min-h-screen bg-gray-50 ${className}`}>
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
}

export default PageWrapperFunctional;
export { PageWrapperFunctional };