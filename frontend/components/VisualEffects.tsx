'use client';

import React from 'react';

interface VisualEffectsProps {
  className?: string;
}

export default function VisualEffects({ className = '' }: VisualEffectsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-blue-500/5 to-purple-500/10"></div>
      <div className="absolute top-1/3 right-0 w-32 h-32 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-lg"></div>
    </div>
  );
}