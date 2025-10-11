'use client';

import { useEffect, useState } from 'react';

export default function DeployVersion() {
    const [version, setVersion] = useState('');

    useEffect(() => {
        setVersion(process.env.NEXT_PUBLIC_DEPLOY_VERSION || '2025.01.15.002');
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 9999
        }}>
            Deploy: {version}
        </div>
    );
}

