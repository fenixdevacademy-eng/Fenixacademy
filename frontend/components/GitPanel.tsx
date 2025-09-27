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
            file: 'src/utils/api.ts',
            status: 'added',
            additions: 15,
            deletions: 0,
            diff: [
                { type: 'added', line: 1, content: 'export const api = {' },
                { type: 'added', line: 2, content: '  baseURL: process.env.REACT_APP_API_URL,' },
                { type: 'added', line: 3, content: '  async request(endpoint: string, options: RequestInit = {}) {' },
                { type: 'added', line: 4, content: '    const response = await fetch(`${this.baseURL}${endpoint}`, options);' },
                { type: 'added', line: 5, content: '    return response.json();' },
                { type: 'added', line: 6, content: '  }' },
                { type: 'added', line: 7, content: '};' }
            ]
        }
    ]);

    const [branches] = useState([
        { name: 'main', current: true },
        { name: 'feature/user-auth', current: false },
        { name: 'feature/payment', current: false }
    ]);

    const [commits] = useState([
        { hash: 'a1b2c3d', message: 'Add user authentication', author: 'John Doe', date: '2 hours ago' },
        { hash: 'e4f5g6h', message: 'Fix payment processing bug', author: 'Jane Smith', date: '1 day ago' },
        { hash: 'i7j8k9l', message: 'Update documentation', author: 'Bob Johnson', date: '3 days ago' }
    ]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'modified': return <Minus className="w-4 h-4 text-yellow-500" />;
            case 'added': return <Plus className="w-4 h-4 text-green-500" />;
            case 'deleted': return <X className="w-4 h-4 text-red-500" />;
            default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'modified': return 'bg-yellow-100 text-yellow-800';
            case 'added': return 'bg-green-100 text-green-800';
            case 'deleted': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleStageFile = (file: string) => {
        console.log('Staging file:', file);
    };

    const handlePush = () => {
        console.log('Pushing changes...');
    };

    return (
        <div className="git-panel h-full bg-gray-900 text-white">
            {/* Header */}
            <div className="border-b border-gray-700 p-4">
                <div className="flex items-center gap-2 mb-4">
                    <GitBranch className="w-5 h-5" />
                    <h2 className="text-lg font-semibold">Git Panel</h2>
                </div>

                {/* Tabs */}
                <div className="flex gap-1">
                    <button
                        className={`px-3 py-1 rounded text-sm ${activeTab === 'changes' ? 'bg-blue-600' : 'bg-gray-700'}`}
                        onClick={() => setActiveTab('changes')}
                    >
                        Changes
                    </button>
                    <button
                        className={`px-3 py-1 rounded text-sm ${activeTab === 'branches' ? 'bg-blue-600' : 'bg-gray-700'}`}
                        onClick={() => setActiveTab('branches')}
                    >
                        Branches
                    </button>
                    <button
                        className={`px-3 py-1 rounded text-sm ${activeTab === 'commits' ? 'bg-blue-600' : 'bg-gray-700'}`}
                        onClick={() => setActiveTab('commits')}
                    >
                        Commits
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
                {activeTab === 'changes' && (
                    <div>
                        {/* Commit Message */}
                        <div className="mb-4">
                            <textarea
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm"
                                placeholder="Commit message..."
                                value={commitMessage}
                                onChange={(e) => setCommitMessage(e.target.value)}
                                rows={3}
                            />
                        </div>

                        {/* Changes List */}
                        <div className="space-y-2">
                            {changes.map((change, index) => (
                                <div key={index} className="border border-gray-700 rounded p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(change.status)}
                                            <span className="text-sm font-medium">{change.file}</span>
                                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(change.status)}`}>
                                                {change.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <span className="text-green-400">+{change.additions}</span>
                                            <span className="text-red-400">-{change.deletions}</span>
                                            <button
                                                className="p-1 hover:bg-gray-700 rounded"
                                                onClick={() => handleStageFile(change.file)}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Diff Preview */}
                                    <div className="bg-gray-800 rounded p-2 text-xs font-mono">
                                        {change.diff.slice(0, 3).map((line, lineIndex) => (
                                            <div key={lineIndex} className={`flex ${line.type === 'added' ? 'text-green-400' :
                                                line.type === 'removed' ? 'text-red-400' :
                                                    'text-gray-400'
                                                }`}>
                                                <span className="w-8 text-gray-500">{line.line}</span>
                                                <span className="ml-2">{line.content}</span>
                                            </div>
                                        ))}
                                        {change.diff.length > 3 && (
                                            <div className="text-gray-500 text-center py-1">
                                                ... {change.diff.length - 3} more lines
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex gap-2">
                            <button
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
                                onClick={handlePush}
                            >
                                <Upload className="w-4 h-4 inline mr-1" />
                                Push
                            </button>
                            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm">
                                <Download className="w-4 h-4 inline mr-1" />
                                Pull
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'branches' && (
                    <div>
                        <div className="space-y-2">
                            {branches.map((branch, index) => (
                                <div key={index} className={`flex items-center justify-between p-2 rounded ${branch.current ? 'bg-blue-900' : 'bg-gray-800'
                                    }`}>
                                    <div className="flex items-center gap-2">
                                        <GitBranch className="w-4 h-4" />
                                        <span className="text-sm">{branch.name}</span>
                                        {branch.current && (
                                            <span className="text-xs bg-blue-600 px-2 py-1 rounded">current</span>
                                        )}
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="p-1 hover:bg-gray-700 rounded">
                                            <Eye className="w-3 h-3" />
                                        </button>
                                        <button className="p-1 hover:bg-gray-700 rounded">
                                            <Check className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'commits' && (
                    <div>
                        <div className="space-y-2">
                            {commits.map((commit, index) => (
                                <div key={index} className="bg-gray-800 rounded p-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-mono text-blue-400">{commit.hash}</span>
                                        <span className="text-xs text-gray-400">{commit.date}</span>
                                    </div>
                                    <div className="text-sm text-gray-300 mb-1">{commit.message}</div>
                                    <div className="text-xs text-gray-500">{commit.author}</div>
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