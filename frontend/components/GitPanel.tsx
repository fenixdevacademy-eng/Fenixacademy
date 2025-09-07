'use client';

import React, { useState } from 'react';
import { GitBranch, Plus, Minus, RotateCcw, Upload, Download, Eye, Check, X, AlertCircle } from 'lucide-react';

const GitPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState('changes');
    const [commitMessage, setCommitMessage] = useState('');

    const [changes, setChanges] = useState([
        {
            file: 'src/components/Button.tsx',
            status: 'modified',
            additions: 5,
            deletions: 2,
            diff: [
                { type: 'context', line: 10, content: '  const [isLoading, setIsLoading] = useState(false);' },
                { type: 'removed', line: 11, content: '  const handleClick = () => {' },
                { type: 'added', line: 11, content: '  const handleClick = async () => {' },
                { type: 'added', line: 12, content: '    setIsLoading(true);' },
                { type: 'added', line: 13, content: '    try {' },
                { type: 'context', line: 14, content: '      await onClick();' },
                { type: 'added', line: 15, content: '    } finally {' },
                { type: 'added', line: 16, content: '      setIsLoading(false);' },
                { type: 'added', line: 17, content: '    }' },
                { type: 'context', line: 18, content: '  };' }
            ]
        },
        {
            file: 'src/pages/Home.tsx',
            status: 'added',
            additions: 15,
            deletions: 0,
            diff: []
        },
        {
            file: 'src/utils/helpers.ts',
            status: 'deleted',
            additions: 0,
            deletions: 8,
            diff: []
        }
    ]);

    const [branches] = useState([
        { name: 'main', current: true, lastCommit: 'Adicionar funcionalidade de loading' },
        { name: 'feature/new-button', current: false, lastCommit: 'Implementar novo componente Button' },
        { name: 'bugfix/fix-validation', current: false, lastCommit: 'Corrigir validação de formulário' }
    ]);

    const [commits] = useState([
        {
            hash: 'a1b2c3d',
            message: 'Adicionar funcionalidade de loading',
            author: 'João Silva',
            date: '2024-01-15 14:30',
            files: 3
        },
        {
            hash: 'e4f5g6h',
            message: 'Corrigir bug na validação',
            author: 'Maria Santos',
            date: '2024-01-15 10:15',
            files: 1
        },
        {
            hash: 'i7j8k9l',
            message: 'Atualizar dependências',
            author: 'Pedro Costa',
            date: '2024-01-14 16:45',
            files: 2
        }
    ]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'added': return <Plus className="w-4 h-4" />;
            case 'modified': return <RotateCcw className="w-4 h-4" />;
            case 'deleted': return <Minus className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'added': return '#10b981';
            case 'modified': return '#f59e0b';
            case 'deleted': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const handleStageFile = (file: string) => {
        console.log('Staging file:', file);
    };

    const handleUnstageFile = (file: string) => {
        console.log('Unstaging file:', file);
    };

    const handleCommit = () => {
        if (commitMessage.trim()) {
            console.log('Committing:', commitMessage);
            setCommitMessage('');
        }
    };

    const handlePush = () => {
        console.log('Pushing to remote');
    };

    const handlePull = () => {
        console.log('Pulling from remote');
    };

    return (
        <div className="git-panel">
            <div className="git-header">
                <h3>
                    <GitBranch className="w-5 h-5" />
                    Controle de Versão
                </h3>

                <div className="git-tabs">
                    <button
                        className={`git-tab ${activeTab === 'changes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('changes')}
                    >
                        Alterações
                    </button>
                    <button
                        className={`git-tab ${activeTab === 'branches' ? 'active' : ''}`}
                        onClick={() => setActiveTab('branches')}
                    >
                        Branches
                    </button>
                    <button
                        className={`git-tab ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        Histórico
                    </button>
                </div>
            </div>

            <div className="git-content">
                {activeTab === 'changes' && (
                    <div className="changes-tab">
                        {/* Commit Message */}
                        <div className="commit-section">
                            <h4>Mensagem de Commit</h4>
                            <div className="commit-input">
                                <input
                                    type="text"
                                    placeholder="Descreva suas alterações..."
                                    value={commitMessage}
                                    onChange={(e) => setCommitMessage(e.target.value)}
                                    className="commit-message"
                                />
                                <button
                                    className="commit-button"
                                    onClick={handleCommit}
                                    disabled={!commitMessage.trim()}
                                >
                                    <Check className="w-4 h-4" />
                                    Commit
                                </button>
                            </div>
                        </div>

                        {/* Changes List */}
                        <div className="changes-section">
                            <h4>Alterações ({changes.length})</h4>
                            <div className="changes-list">
                                {changes.map((change, index) => (
                                    <div key={index} className="change-item">
                                        <div className="change-header">
                                            <div className="change-info">
                                                {getStatusIcon(change.status)}
                                                <span className="change-file">{change.file}</span>
                                                <span
                                                    className="change-status"
                                                    style={{ color: getStatusColor(change.status) }}
                                                >
                                                    {change.status}
                                                </span>
                                            </div>
                                            <div className="change-stats">
                                                <span className="additions">+{change.additions}</span>
                                                <span className="deletions">-{change.deletions}</span>
                                            </div>
                                            <div className="change-actions">
                                                <button
                                                    className="change-action"
                                                    onClick={() => handleStageFile(change.file)}
                                                    title="Adicionar ao stage"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="change-action"
                                                    onClick={() => handleUnstageFile(change.file)}
                                                    title="Remover do stage"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="change-action"
                                                    title="Ver diferenças"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {change.diff.length > 0 && (
                                            <div className="change-diff">
                                                {change.diff.map((line, lineIndex) => (
                                                    <div
                                                        key={lineIndex}
                                                        className={`diff-line ${line.type}`}
                                                    >
                                                        <span className="diff-line-number">{line.line}</span>
                                                        <span className="diff-content">{line.content}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Git Actions */}
                        <div className="git-actions">
                            <button className="git-action" onClick={handlePull}>
                                <Download className="w-4 h-4" />
                                Pull
                            </button>
                            <button className="git-action" onClick={handlePush}>
                                <Upload className="w-4 h-4" />
                                Push
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'branches' && (
                    <div className="branches-tab">
                        <div className="branches-list">
                            {branches.map((branch, index) => (
                                <div key={index} className="branch-item">
                                    <div className="branch-info">
                                        <GitBranch className="w-4 h-4" />
                                        <span className={`branch-name ${branch.current ? 'current' : ''}`}>
                                            {branch.name}
                                        </span>
                                        {branch.current && (
                                            <span className="current-badge">Atual</span>
                                        )}
                                    </div>
                                    <div className="branch-commit">
                                        {branch.lastCommit}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="history-tab">
                        <div className="commits-list">
                            {commits.map((commit, index) => (
                                <div key={index} className="commit-item">
                                    <div className="commit-hash">
                                        {commit.hash}
                                    </div>
                                    <div className="commit-message">
                                        {commit.message}
                                    </div>
                                    <div className="commit-meta">
                                        <span className="commit-author">{commit.author}</span>
                                        <span className="commit-date">{commit.date}</span>
                                        <span className="commit-files">{commit.files} arquivo(s)</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GitPanel;

