import React from 'react';

export default function CourseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            {children}
        </div>
    );
}

export const metadata = {
    title: 'Curso - Fenix Academy',
    description: 'Aprenda com os melhores cursos de programação e tecnologia',
};
