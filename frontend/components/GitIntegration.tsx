'use client';

import { useState } from 'react';
import {
    GitBranch,
    GitCommit,
    GitPullRequest,
    Plus,
    Trash2,
    Check,
    X,
    RefreshCw,
    Download,
    Upload,
    Eye,
    EyeOff
} from 'lucide-react';

interface FileStatus {
    name: string;
    path: string;
    status: 'modified' | 'added' | 'deleted' | 'untracked';
    isStaged: boolean;
}

interface Commit {
    id: string;
    hash: string;
    message: string;
    author: string;
    email: string;
    date: string;
    files: string[];
    branch: string;
    isHead: boolean;
}

interface Branch {
    name: string;
    isActive: boolean;
    isRemote: boolean;
    lastCommit: string;
    ahead: number;
    behind: number;
}

interface Remote {
    name: string;
    url: string;
    isActive: boolean;
}

export default function GitIntegration() {
    const [activeTab, setActiveTab] = useState<'status' | 'commits' | 'branches' | 'remotes'>('status');
    const [commitMessage, setCommitMessage] = useState('');
    const [showNewBranchModal, setShowNewBranchModal] = useState(false);
    const [showNewRemoteModal, setShowNewRemoteModal] = useState(false);
    const [newBranchName, setNewBranchName] = useState('');
    const [newRemoteName, setNewRemoteName] = useState('');
    const [newRemoteUrl, setNewRemoteUrl] = useState('');

    // Mock data
    const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([
        { name: 'src/App.tsx', path: 'src/App.tsx', status: 'modified', isStaged: true },
        { name: 'src/components/Header.tsx', path: 'src/components/Header.tsx', status: 'added', isStaged: false },
        { name: 'src/utils/helpers.ts', path: 'src/utils/helpers.ts', status: 'deleted', isStaged: true },
        { name: 'src/styles/global.css', path: 'src/styles/global.css', status: 'untracked', isStaged: false }
    ]);

    const [commits, setCommits] = useState<Commit[]>([
        {
            id: '1',
            hash: 'a1b2c3d',
            message: 'feat: add new header component',
            author: 'João Silva',
            email: 'joao@email.com',
            date: '2024-03-20T10:30:00Z',
            files: ['src/components/Header.tsx'],
            branch: 'main',
            isHead: true
        },
        {
            id: '2',
            hash: 'e4f5g6h',
            message: 'fix: resolve navigation issue',
            author: 'Maria Santos',
            email: 'maria@email.com',
            date: '2024-03-19T15:45:00Z',
            files: ['src/App.tsx', 'src/components/Navigation.tsx'],
            branch: 'main',
            isHead: false
        }
    ]);

    const [branches] = useState<Branch[]>([
        { name: 'main', isActive: true, isRemote: false, lastCommit: 'a1b2c3d', ahead: 0, behind: 0 },
        { name: 'feature/new-ui', isActive: false, isRemote: false, lastCommit: 'x9y8z7w', ahead: 3, behind: 1 },
        { name: 'origin/main', isActive: false, isRemote: true, lastCommit: 'a1b2c3d', ahead: 0, behind: 0 }
    ]);

    const [remotes] = useState<Remote[]>([
        { name: 'origin', url: 'https://github.com/user/repo.git', isActive: true },
        { name: 'upstream', url: 'https://github.com/original/repo.git', isActive: false }
    ]);

    const toggleFileStaged = (fileName: string) => {
        setFileStatuses(prev =>
            prev.map(file =>
                file.name === fileName
                    ? { ...file, isStaged: !file.isStaged }
                    : file
            )
        );
    }

    const createCommit = () => {
        if (!commitMessage.trim() || fileStatuses.filter(f => f.isStaged).length === 0) return;

        const newCommit: Commit = {
            id: Date.now().toString(),
            hash: Math.random().toString(36).substr(2, 7),
            message: commitMessage,
            author: 'Current User',
            email: 'user@email.com',
            date: new Date().toISOString(),
            files: fileStatuses.filter(f => f.isStaged).map(f => f.name),
            branch: 'main',
            isHead: true
        }

        setCommits(prev => [newCommit, ...prev.map(c => ({ ...c, isHead: false }))]);
        setCommitMessage('');

        // Remove staged files
        setFileStatuses(prev => prev.filter(f => !f.isStaged));
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'modified': return 'text-yellow-600';
            case 'added': return 'text-green-600';
            case 'deleted': return 'text-red-600';
            case 'untracked': return 'text-gray-600';
            default: return 'text-gray-600';
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'modified': return 'M';
            case 'added': return 'A';
            case 'deleted': return 'D';
            case 'untracked': return '?';
            default: return '?';
        }
    }

    return (
        <div className="h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Git Integration</h2>
                    <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <Upload className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-4">
                    {[
                        { id: 'status', label: 'Status', icon: GitBranch },
                        { id: 'commits', label: 'Commits', icon: GitCommit },
                        { id: 'branches', label: 'Branches', icon: GitBranch },
                        { id: 'remotes', label: 'Remotes', icon: GitPullRequest }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="p-6 h-full overflow-y-auto">
                {activeTab === 'status' && (
                    <div className="space-y-6">
                        {/* Repository Status */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">
                                    {fileStatuses.filter(f => f.isStaged).length}
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300">Staged</div>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {fileStatuses.filter(f => !f.isStaged && f.status !== 'untracked').length}
                                </div>
                                <div className="text-sm text-yellow-700 dark:text-yellow-300">Modified</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-gray-600">
                                    {fileStatuses.filter(f => f.status === 'untracked').length}
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-300">Untracked</div>
                            </div>
                        </div>

                        {/* File Status */}
                        <div className="space-y-2">
                            {fileStatuses.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center space-x-3">
                                        <span className={getStatusColor(file.status)}>
                                            {getStatusIcon(file.status)}
                                        </span>
                                        <span className="font-mono text-sm">{file.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => toggleFileStaged(file.name)}
                                            className={`p-1 rounded ${file.isStaged
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {file.isStaged ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                        </button>
                                        <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Commit Section */}
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h3 className="font-medium mb-3">Commit Changes</h3>
                            <textarea
                                value={commitMessage}
                                onChange={(e) => setCommitMessage(e.target.value)}
                                placeholder="Enter commit message..."
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                rows={3}
                            />
                            <div className="flex justify-between items-center mt-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {fileStatuses.filter(f => f.isStaged).length} files staged
                                </span>
                                <button
                                    onClick={createCommit}
                                    disabled={!commitMessage.trim() || fileStatuses.filter(f => f.isStaged).length === 0}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Commit
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'commits' && (
                    <div className="space-y-4">
                        {commits.map((commit) => (
                            <div key={commit.id} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                                                {commit.hash}
                                            </span>
                                            {commit.isHead && (
                                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                                    HEAD
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                            {commit.message}
                                        </h4>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {commit.author} &lt;{commit.email}&gt; • {new Date(commit.date).toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                            {commit.files.length} file(s) changed
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                                            <GitBranch className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'branches' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Branches</h3>
                            <button
                                onClick={() => setShowNewBranchModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4 inline mr-2" />
                                New Branch
                            </button>
                        </div>
                        {branches.map((branch) => (
                            <div key={branch.name} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                <div className="flex items-center space-x-3">
                                    <GitBranch className={`w-4 h-4 ${branch.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                                    <span className={`font-medium ${branch.isActive ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                                        {branch.name}
                                    </span>
                                    {branch.isRemote && (
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            Remote
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {branch.ahead > 0 && <span className="text-green-600">+{branch.ahead}</span>}
                                        {branch.behind > 0 && <span className="text-red-600">-{branch.behind}</span>}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                                            <GitPullRequest className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'remotes' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Remotes</h3>
                            <button
                                onClick={() => setShowNewRemoteModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4 inline mr-2" />
                                Add Remote
                            </button>
                        </div>
                        {remotes.map((remote) => (
                            <div key={remote.name} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {remote.name}
                                        </span>
                                        {remote.isActive && (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                                            <Upload className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                                    {remote.url}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}