'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

const TestMonaco: React.FC = () => {
    return (
        <div className="h-screen bg-gray-900 text-white p-4">
            <h1 className="text-2xl mb-4">Teste Monaco Editor</h1>

            <div className="h-96 border border-gray-600">
                <Editor
                    height="100%"
                    defaultLanguage="html"
                    theme="vs-dark"
                    defaultValue="<h1>Teste Monaco Editor</h1>"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14
                    }}
                />
            </div>

            <div className="mt-4 text-sm text-gray-400">
                Se você vê o editor acima, o Monaco está funcionando!
            </div>
        </div>
    );
};

export default TestMonaco;




