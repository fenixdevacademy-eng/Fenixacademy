'use client';

import React, { useState } from 'react';
import FenixIDE2 from '../../components/FenixIDE2';

export default function IDEPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
  };

  return (
    <div className="h-screen">
      <FenixIDE2 />
    </div>
  );
}
