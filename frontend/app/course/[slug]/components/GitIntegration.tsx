'use client';

import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  GitMerge, 
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  MessageSquare,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';

interface GitCommit {
  id: string;
  message: string;
  author: string;
  email: string;
  date: string;
  hash: string;
  files: string[];
  additions: number;
  deletions: number;
}

interface GitBranch {
  name: string;
  isCurrent: boolean;
  lastCommit: string;
  ahead: number;
  behind: number;
  isRemote: boolean;
}

interface GitStatus {
  branch: string;
  status: 'clean' | 'modified' | 'staged' | 'conflict';
  modifiedFiles: string[];
  stagedFiles: string[];
  untrackedFiles: string[];
  conflicts: string[];
}

interface GitIntegrationProps {
  className?: string;
  onCommit?: (message: string, files: string[]) => void;
  onPush?: () => void;
  onPull?: () => void;
  onBranchChange?: (branchName: string) => void;
}

const mockCommits: GitCommit[] = [
  {
    id: '1',
    message: 'feat: adiciona componente de integração Git',
    author: 'Fenix Academy',
    email: 'dev@fenix.academy',
    date: '2024-01-15T10:30:00Z',
    hash: 'a1b2c3d',
    files: ['GitIntegration.tsx', 'GitPanel.tsx'],
    additions: 150,
    deletions: 20
  },
  {
    id: '2',
    message: 'fix: corrige erro de sintaxe no componente',
    author: 'Fenix Academy',
    email: 'dev@fenix.academy',
    date: '2024-01-15T09:15:00Z',
    hash: 'e4f5g6h',
    files: ['CodeEditor.tsx'],
    additions: 5,
    deletions: 12
  },
  {
    id: '3',
    message: 'docs: atualiza documentação da API',
    author: 'Fenix Academy',
    email: 'dev@fenix.academy',
    date: '2024-01-14T16:45:00Z',
    hash: 'i7j8k9l',
    files: ['README.md', 'API.md'],
    additions: 80,
    deletions: 15
  }
];

const mockBranches: GitBranch[] = [
  {
    name: 'main',
    isCurrent: true,
    lastCommit: 'a1b2c3d',
    ahead: 0,
    behind: 0,
    isRemote: false
  },
  {
    name: 'feature/git-integration',
    isCurrent: false,
    lastCommit: 'm1n2o3p',
    ahead: 3,
    behind: 1,
    isRemote: false
  },
  {
    name: 'origin/main',
    isCurrent: false,
    lastCommit: 'q4r5s6t',
    ahead: 0,
    behind: 2,
    isRemote: true
  }
];

const mockStatus: GitStatus = {
  branch: 'main',
  status: 'modified',
  modifiedFiles: ['GitIntegration.tsx', 'package.json'],
  stagedFiles: ['README.md'],
  untrackedFiles: ['new-file.ts'],
  conflicts: []
};

export function GitIntegration({
  className = '',
  onCommit,
  onPush,
  onPull,
  onBranchChange
}: GitIntegrationProps) {
  const [commits, setCommits] = useState<GitCommit[]>(mockCommits);
  const [branches, setBranches] = useState<GitBranch[]>(mockBranches);
  const [status, setStatus] = useState<GitStatus>(mockStatus);
  const [commitMessage, setCommitMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCommit = () => {
    if (!commitMessage.trim() || selectedFiles.length === 0) return;

    const newCommit: GitCommit = {
      id: Date.now().toString(),
      message: commitMessage,
      author: 'Current User',
      email: 'user@example.com',
      date: new Date().toISOString(),
      hash: Math.random().toString(36).substring(7),
      files: selectedFiles,
      additions: Math.floor(Math.random() * 50) + 10,
      deletions: Math.floor(Math.random() * 20) + 5
    };

    setCommits(prev => [newCommit, ...prev]);
    setCommitMessage('');
    setSelectedFiles([]);
    onCommit?.(commitMessage, selectedFiles);
  };

  const handlePush = async () => {
    setIsLoading(true);
    // Simular push
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onPush?.();
  };

  const handlePull = async () => {
    setIsLoading(true);
    // Simular pull
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onPull?.();
  };

  const handleBranchChange = (branchName: string) => {
    setBranches(prev => 
      prev.map(branch => ({
        ...branch,
        isCurrent: branch.name === branchName
      }))
    );
    setStatus(prev => ({ ...prev, branch: branchName }));
    onBranchChange?.(branchName);
  };

  const toggleFileSelection = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName) 
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'modified':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'staged':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'conflict':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'modified':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'staged':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'conflict':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Integração Git
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePull}
              disabled={isLoading}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white text-sm rounded flex items-center gap-1 transition-colors"
            >
              <Download className="w-3 h-3" />
              Pull
            </button>
            <button
              onClick={handlePush}
              disabled={isLoading}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white text-sm rounded flex items-center gap-1 transition-colors"
            >
              <Upload className="w-3 h-3" />
              Push
            </button>
            <button
              onClick={() => window.location.reload()}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Status */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Status do Repositório
          </h4>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              {getStatusIcon(status.status)}
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status.status)}`}>
                {status.status}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Branch: {status.branch}
              </span>
            </div>

            {status.modifiedFiles.length > 0 && (
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Arquivos Modificados:
                </h5>
                <div className="space-y-1">
                  {status.modifiedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file)}
                        onChange={() => toggleFileSelection(file)}
                        className="rounded"
                      />
                      <span className="text-yellow-600 dark:text-yellow-400">M</span>
                      <span className="text-gray-600 dark:text-gray-400">{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {status.stagedFiles.length > 0 && (
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Arquivos Staged:
                </h5>
                <div className="space-y-1">
                  {status.stagedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="text-green-600 dark:text-green-400">A</span>
                      <span className="text-gray-600 dark:text-gray-400">{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {status.untrackedFiles.length > 0 && (
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Arquivos Não Rastreados:
                </h5>
                <div className="space-y-1">
                  {status.untrackedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file)}
                        onChange={() => toggleFileSelection(file)}
                        className="rounded"
                      />
                      <span className="text-red-600 dark:text-red-400">?</span>
                      <span className="text-gray-600 dark:text-gray-400">{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Commit */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Fazer Commit
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mensagem do Commit
              </label>
              <input
                type="text"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="Descreva as mudanças..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleCommit}
              disabled={!commitMessage.trim() || selectedFiles.length === 0}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <GitCommit className="w-4 h-4" />
              Fazer Commit ({selectedFiles.length} arquivos)
            </button>
          </div>
        </div>

        {/* Branches */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Branches
          </h4>
          <div className="space-y-2">
            {branches.map((branch, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  branch.isCurrent 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {branch.name}
                  </span>
                  {branch.isRemote && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      (remote)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {branch.ahead > 0 && (
                    <span className="text-xs text-green-600 dark:text-green-400">
                      +{branch.ahead}
                    </span>
                  )}
                  {branch.behind > 0 && (
                    <span className="text-xs text-red-600 dark:text-red-400">
                      -{branch.behind}
                    </span>
                  )}
                  {!branch.isRemote && !branch.isCurrent && (
                    <button
                      onClick={() => handleBranchChange(branch.name)}
                      className="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      Checkout
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Commits */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Commits Recentes
          </h4>
          <div className="space-y-3">
            {commits.slice(0, 5).map((commit) => (
              <div
                key={commit.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {commit.message}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <User className="w-3 h-3" />
                      <span>{commit.author}</span>
                      <span>•</span>
                      <span>{new Date(commit.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="font-mono">{commit.hash}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-green-600 dark:text-green-400">
                      +{commit.additions}
                    </span>
                    <span className="text-red-600 dark:text-red-400">
                      -{commit.deletions}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {commit.files.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}