'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdvancedIDE from '@/components/IDE/AdvancedIDE';

export default function IDEPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <AdvancedIDE />;
}