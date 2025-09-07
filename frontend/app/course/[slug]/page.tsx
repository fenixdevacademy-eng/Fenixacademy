'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CoursePageEnhanced from './CoursePageEnhanced';

const CoursePage: React.FC = () => {
    const params = useParams();
    const slug = params.slug as string;

    if (!slug) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Slug não encontrado</h2>
                    <p className="text-gray-600">O slug do curso não foi fornecido.</p>
                </div>
            </div>
        );
    }

    return <CoursePageEnhanced courseId={slug} />;
};

export default CoursePage;
