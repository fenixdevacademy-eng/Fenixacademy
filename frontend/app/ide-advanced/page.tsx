'use client';

import React from 'react';
import { AdvancedIDEProvider } from '../../components/AdvancedIDECore';
import AdvancedIDE from '../../components/AdvancedIDE';
import '../../components/AdvancedIDE.css';
import '../../components/AdvancedIDEComponents.css';

const AdvancedIDEPage: React.FC = () => {
    return (
        <AdvancedIDEProvider>
            <div className="advanced-ide-page">
                <AdvancedIDE
                    initialWorkspace="/workspace"
                    theme="dark"
                    showWelcome={true}
                />
            </div>
        </AdvancedIDEProvider>
    );
};

export default AdvancedIDEPage;
