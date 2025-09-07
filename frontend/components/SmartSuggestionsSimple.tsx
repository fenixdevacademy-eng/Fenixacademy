'use client';

import React from 'react';

interface SmartSuggestionsProps {
    content: string;
    language: string;
    theme: 'dark' | 'light';
    onSuggestionApply?: (suggestion: any) => void;
}

export default function SmartSuggestions({
    content,
    language,
    theme,
    onSuggestionApply
}: SmartSuggestionsProps) {
    // Versão simplificada - apenas retorna null por enquanto
    return null;
}
