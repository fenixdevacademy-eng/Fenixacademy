import React from 'react';

interface CourseLayoutProps {
    children: React.ReactNode;
}

export default function CourseLayout({ children }: CourseLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            {children}
        </div>
    );
}