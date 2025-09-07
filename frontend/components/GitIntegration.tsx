'use client';

import React, { useState, useEffect } from 'react';
import { GitBranch, GitCommit, GitPullRequest, GitMerge, History, Plus, Trash2, Download, Upload, RefreshCw, Eye, Code, FileText, AlertCircle, CheckCircle, Clock, User, MessageSquare, Hash, Settings } from 'lucide-react';

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
    isStaged: boolean;
    isModified: boolean;
}

interface Branch {
    name: string;
    isActive: boolean;
    isRemote: boolean;
    lastCommit: string;
    ahead: number;
    behind: number;
    upstream?: string;
}

interface FileStatus {
    name: string;
    status: 'staged' | 'modified' | 'untracked' | 'deleted' | 'conflicted';
    path: string;
    isStaged: boolean;
    diff?: string;
}

interface Remote {
    name: string;
    url: string;
    isActive: boolean;
    lastFetch: string;
}

interface GitIntegrationProps {
    onClose: () => void;
}

export default function GitIntegration({ onClose }: GitIntegrationProps) {
    const [activeTab, setActiveTab] = useState<'status' | 'commits' | 'branches' | 'remotes' | 'settings'>('status');
    const [commits, setCommits] = useState<Commit[]>([
        {
            id: '1',
            hash: 'a1b2c3d',
            message: 'Initial commit - Fenix IDE setup',
            author: 'Fenix Developer',
            email: 'dev@fenix.academy',
            date: '2024-01-15T10:00:00Z',
            files: ['index.html', 'styles.css', 'main.js'],
            branch: 'main',
            isHead: true,
            isStaged: false,
            isModified: false
        },
        {
            id: '2',
            hash: 'e4f5g6h',
            message: 'Add theme management system',
            author: 'Fenix Developer',
            email: 'dev@fenix.academy',
            date: '2024-01-14T15:30:00Z',
            files: ['IDEThemeManager.tsx', 'themes.json'],
            branch: 'main',
            isHead: false,
            isStaged: false,
            isModified: false
        }
    ]);

    const [branches, setBranches] = useState<Branch[]>([
        {
            name: 'main',
            isActive: true,
            isRemote: false,
            lastCommit: 'a1b2c3d',
            ahead: 0,
            behind: 0
        },
        {
            name: 'develop',
            isActive: false,
            isRemote: false,
            lastCommit: 'i7j8k9l',
            ahead: 2,
            behind: 1
        },
        {
            name: 'feature/ide-enhancements',
            isActive: false,
            isRemote: false,
            lastCommit: 'm0n1o2p',
            ahead: 5,
            behind: 0
        }
    ]);

    const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([
        {
            name: 'FenixIDE.tsx',
            status: 'modified',
            path: 'components/FenixIDE.tsx',
            isStaged: false,
            diff: '+ // New Git integration feature\n+ import { GitIntegration } from "./GitIntegration";'
        },
        {
            name: 'new-feature.ts',
            status: 'untracked',
            path: 'components/new-feature.ts',
            isStaged: false
        },
        {
            name: 'old-file.js',
            status: 'deleted',
            path: 'components/old-file.js',
            isStaged: true
        }
    ]);

    const [remotes, setRemotes] = useState<Remote[]>([
        {
            name: 'origin',
            url: 'https://github.com/fenix-academy/fenix-ide.git',
            isActive: true,
            lastFetch: '2024-01-15T09:00:00Z'
        },
        {
            name: 'upstream',
            url: 'https://github.com/fenix-academy/fenix-core.git',
            isActive: false,
            lastFetch: '2024-01-10T14:00:00Z'
        }
    ]);

    const [commitMessage, setCommitMessage] = useState('');
    const [newBranchName, setNewBranchName] = useState('');
    const [newRemoteName, setNewRemoteName] = useState('');
    const [newRemoteUrl, setNewRemoteUrl] = useState('');
    const [showNewBranchModal, setShowNewBranchModal] = useState(false);
    const [showNewRemoteModal, setShowNewRemoteModal] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'staged': return 'text-green-600';
            case 'modified': return 'text-yellow-600';
            case 'untracked': return 'text-blue-600';
            case 'deleted': return 'text-red-600';
            case 'conflicted': return 'text-purple-600';
            default: return 'text-gray-600';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'staged': return <CheckCircle className="w-4 h-4" />;
            case 'modified': return <AlertCircle className="w-4 h-4" />;
            case 'untracked': return <Plus className="w-4 h-4" />;
            case 'deleted': return <Trash2 className="w-4 h-4" />;
            case 'conflicted': return <AlertCircle className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const stageFile = (fileName: string) => {
        setFileStatuses(prev =>
            prev.map(file =>
                file.name === fileName
                    ? { ...file, isStaged: true, status: 'staged' as const }
                    : file
            )
        );
    };

    const unstageFile = (fileName: string) => {
        setFileStatuses(prev =>
            prev.map(file =>
                file.name === fileName
                    ? { ...file, isStaged: false, status: 'modified' as const }
                    : file
            )
        );
    };

    const createCommit = () => {
        if (!commitMessage.trim()) return;

        const stagedFiles = fileStatuses.filter(f => f.isStaged);
        if (stagedFiles.length === 0) return;

        const newCommit: Commit = {
            id: Date.now().toString(),
            hash: Math.random().toString(36).substring(2, 9),
            message: commitMessage,
            author: 'Fenix Developer',
            email: 'dev@fenix.academy',
            date: new Date().toISOString(),
            files: stagedFiles.map(f => f.name),
            branch: branches.find(b => b.isActive)?.name || 'main',
            isHead: true,
            isStaged: false,
            isModified: false
        };

        // Update commits
        setCommits(prev => prev.map(c => ({ ...c, isHead: false })).concat(newCommit));

        // Update file statuses
        setFileStatuses(prev =>
            prev.filter(f => !f.isStaged || f.status === 'deleted')
        );

        setCommitMessage('');
    };

    const createBranch = () => {
        if (!newBranchName.trim()) return;

        const newBranch: Branch = {
            name: newBranchName,
            isActive: false,
            isRemote: false,
            lastCommit: commits[0]?.hash || '',
            ahead: 0,
            behind: 0
        };

        setBranches(prev => prev.concat(newBranch));
        setNewBranchName('');
        setShowNewBranchModal(false);
    };

    const switchBranch = (branchName: string) => {
        setBranches(prev =>
            prev.map(b => ({ ...b, isActive: b.name === branchName }))
        );
    };

    const createRemote = () => {
        if (!newRemoteName.trim() || !newRemoteUrl.trim()) return;

        const newRemote: Remote = {
            name: newRemoteName,
            url: newRemoteUrl,
            isActive: false,
            lastFetch: new Date().toISOString()
        };

        setRemotes(prev => prev.concat(newRemote));
        setNewRemoteName('');
        setNewRemoteUrl('');
        setShowNewRemoteModal(false);
    };

    const fetchRemote = (remoteName: string) => {
        setRemotes(prev =>
            prev.map(r =>
                r.name === remoteName
                    ? { ...r, lastFetch: new Date().toISOString() }
                    : r
            )
        );
    };

    const pullFromRemote = (remoteName: string) => {
        // Simulate pull operation
        const remote = remotes.find(r => r.name === remoteName);
        if (remote) {
            // Update branch status
            setBranches(prev =>
                prev.map(b =>
                    b.isActive
                        ? { ...b, behind: Math.max(0, b.behind - 1) }
                        : b
                )
            );
        }
    };

    const pushToRemote = (remoteName: string) => {
        // Simulate push operation
        const remote = remotes.find(r => r.name === remoteName);
        if (remote) {
            // Update branch status
            setBranches(prev =>
                prev.map(b =>
                    b.isActive
                        ? { ...b, ahead: Math.max(0, b.ahead - 1) }
                        : b
                )
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-11/12 h-5/6 max-w-7xl overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <GitBranch className="w-6 h-6 text-green-600" />
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Git Integration
                            </h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Fenix IDE Repository
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-600">
                    {[
                        { id: 'status', label: 'Status', icon: Eye },
                        { id: 'commits', label: 'Commits', icon: GitCommit },
                        { id: 'branches', label: 'Branches', icon: GitBranch },
                        { id: 'remotes', label: 'Remotes', icon: Download },
                        { id: 'settings', label: 'Settings', icon: Settings }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-green-500 text-green-600 dark:text-green-400'
                                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    {activeTab === 'status' && (
                        <div className="space-y-6">
                            {/* Repository Status */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                                    Repository Status
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {fileStatuses.filter(f => f.isStaged).length}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Staged</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-600">
                                            {fileStatuses.filter(f => !f.isStaged && f.status !== 'untracked').length}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Modified</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {fileStatuses.filter(f => f.status === 'untracked').length}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Untracked</div>
                                    </div>
                                </div>
                            </div>

                            {/* File Status */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                                    File Changes
                                </h3>
                                <div className="space-y-2">
                                    {fileStatuses.map(file => (
                                        <div key={file.name} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center space-x-3">
                                                <span className={getStatusColor(file.status)}>
                                                    {getStatusIcon(file.status)}
                                                </span>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {file.name}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {file.path}
                                                </span>
                                            </div>
                                            <div className="flex space-x-2">
                                                {!file.isStaged ? (
                                                    <button
                                                        onClick={() => stageFile(file.name)}
                                                        className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                                                    >
                                                        Stage
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => unstageFile(file.name)}
                                                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                                    >
                                                        Unstage
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Commit Section */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                                    Create Commit
                                </h3>
                                <div className="space-y-3">
                                    <textarea
                                        value={commitMessage}
                                        onChange={(e) => setCommitMessage(e.target.value)}
                                        placeholder="Enter commit message..."
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        rows={3}
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {fileStatuses.filter(f => f.isStaged).length} files staged
                                        </span>
                                        <button
                                            onClick={createCommit}
                                            disabled={!commitMessage.trim() || fileStatuses.filter(f => f.isStaged).length === 0}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Create Commit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'commits' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Commit History
                            </h3>
                            {commits.map(commit => (
                                <div key={commit.id} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                                                    {commit.hash}
                                                </span>
                                                {commit.isHead && (
                                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                                                        HEAD
                                                    </span>
                                                )}
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {commit.branch}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                                {commit.message}
                                            </h4>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center space-x-1">
                                                    <User className="w-4 h-4" />
                                                    <span>{commit.author}</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{formatDate(commit.date)}</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <FileText className="w-4 h-4" />
                                                    <span>{commit.files.length} files</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'branches' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Branches
                                </h3>
                                <button
                                    onClick={() => setShowNewBranchModal(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    New Branch
                                </button>
                            </div>

                            <div className="space-y-2">
                                {branches.map(branch => (
                                    <div key={branch.name} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center space-x-3">
                                            <GitBranch className={`w-4 h-4 ${branch.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                                            <span className={`font-medium ${branch.isActive ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                                                {branch.name}
                                            </span>
                                            {branch.isActive && (
                                                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                <span className="text-green-600">+{branch.ahead}</span>
                                                <span className="mx-1">/</span>
                                                <span className="text-red-600">-{branch.behind}</span>
                                            </div>
                                            {!branch.isActive && (
                                                <button
                                                    onClick={() => switchBranch(branch.name)}
                                                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                                >
                                                    Switch
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'remotes' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Remote Repositories
                                </h3>
                                <button
                                    onClick={() => setShowNewRemoteModal(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Add Remote
                                </button>
                            </div>

                            <div className="space-y-2">
                                {remotes.map(remote => (
                                    <div key={remote.name} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {remote.name}
                                                </span>
                                                {remote.isActive && (
                                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                                                        Active
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Last fetch: {formatDate(remote.lastFetch)}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            {remote.url}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => fetchRemote(remote.name)}
                                                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                            >
                                                Fetch
                                            </button>
                                            <button
                                                onClick={() => pullFromRemote(remote.name)}
                                                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                            >
                                                Pull
                                            </button>
                                            <button
                                                onClick={() => pushToRemote(remote.name)}
                                                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                                            >
                                                Push
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Git Configuration
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">User Configuration</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                User Name
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="Fenix Developer"
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                User Email
                                            </label>
                                            <input
                                                type="email"
                                                defaultValue="dev@fenix.academy"
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Repository Settings</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Default Branch
                                            </label>
                                            <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                                                <option value="main">main</option>
                                                <option value="master">master</option>
                                                <option value="develop">develop</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Auto Stash
                                            </label>
                                            <input type="checkbox" className="mr-2" defaultChecked />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Stash changes before pull
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* New Branch Modal */}
            {showNewBranchModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Create New Branch
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Branch Name
                                </label>
                                <input
                                    type="text"
                                    value={newBranchName}
                                    onChange={(e) => setNewBranchName(e.target.value)}
                                    placeholder="feature/new-feature"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={createBranch}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Create Branch
                                </button>
                                <button
                                    onClick={() => setShowNewBranchModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* New Remote Modal */}
            {showNewRemoteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Add New Remote
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Remote Name
                                </label>
                                <input
                                    type="text"
                                    value={newRemoteName}
                                    onChange={(e) => setNewRemoteName(e.target.value)}
                                    placeholder="origin"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Remote URL
                                </label>
                                <input
                                    type="url"
                                    value={newRemoteUrl}
                                    onChange={(e) => setNewRemoteUrl(e.target.value)}
                                    placeholder="https://github.com/user/repo.git"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={createRemote}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Add Remote
                                </button>
                                <button
                                    onClick={() => setShowNewRemoteModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
