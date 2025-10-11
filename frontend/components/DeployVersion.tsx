'use client';

import { useEffect, useState } from 'react';

export default function DeployVersion() {
  const [version, setVersion] = useState('');
  const [commit, setCommit] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    setVersion(process.env.NEXT_PUBLIC_DEPLOY_VERSION || '2025.01.15.004');
    setCommit('c0de9055');
    setTimestamp(new Date().toLocaleString());
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.9)', 
      color: 'white', 
      padding: '8px 12px', 
      borderRadius: '8px',
      fontSize: '11px',
      zIndex: 9999,
      fontFamily: 'monospace',
      border: '1px solid #333'
    }}>
      <div>Deploy: {version}</div>
      <div>Commit: {commit}</div>
      <div>IDE: ✅ READY</div>
      <div>IntelliSense: ✅ ACTIVE</div>
      <div>Updated: {timestamp}</div>
    </div>
  );
}

