import React, { useState, useEffect } from 'react';
import {
    GitBranch,
    GitCommit,
    GitPullRequest,
    GitMerge,
    Plus,
    Minus,
    FileText,
    CheckCircle,
    AlertCircle,
    Clock,
    User,
    MessageSquare,
    Hash,
    RefreshCw,
    Download,
    Upload,
    History,
    Settings,
    X
} from 'lucide-react';

interface GitFile {
    name: string;
    status: 'modified' | 'added' | 'deleted' | 'untracked' | 'staged';
    changes: number;
}

interface GitCommit {
    hash: string;
    author: string;
    message: string;
    date: Date;
    files: string[];
}

interface GitBranch {
    name: string;
    isCurrent: boolean;
    isRemote: boolean;
    lastCommit: string;
    ahead: number;
    behind: number;
}

interface GitIntegrationProps {
    onFileSelect?: (fileName: string) => void;
}

const GitIntegration: React.FC<GitIntegrationProps> = ({ onFileSelect }) => {
    const [activeTab, setActiveTab] = useState<'changes' | 'commits' | 'branches' | 'remote'>('changes');
    const [stagedFiles, setStagedFiles] = useState<GitFile[]>([]);
    const [unstagedFiles, setUnstagedFiles] = useState<GitFile[]>([]);
    const [commits, setCommits] = useState<GitCommit[]>([]);
    const [branches, setBranches] = useState<GitBranch[]>([]);
    const [currentBranch, setCurrentBranch] = useState<string>('main');
    const [commitMessage, setCommitMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [gitStatus, setGitStatus] = useState({
        ahead: 0,
        behind: 0,
        totalChanges: 0
    });

    // Simular dados do Git
    useEffect(() => {
        loadGitData();
    }, []);

    const loadGitData = () => {
        setIsLoading(true);

        // Simular carregamento de dados
        setTimeout(() => {
            setStagedFiles([
                { name: 'index.html', status: 'modified', changes: 5 },
                { name: 'styles.css', status: 'added', changes: 12 },
                { name: 'script.js', status: 'staged', changes: 8 }
            ]);

            setUnstagedFiles([
                { name: 'README.md', status: 'modified', changes: 3 },
                { name: 'package.json', status: 'untracked', changes: 0 },
                { name: 'old-file.txt', status: 'deleted', changes: 0 }
            ]);

            setCommits([
                {
                    hash: 'a1b2c3d',
                    author: 'João Silva',
                    message: 'feat: adicionar sistema de autenticação',
                    date: new Date(Date.now() - 3600000),
                    files: ['auth.js', 'login.html', 'styles.css']
                },
                {
                    hash: 'e4f5g6h',
                    author: 'Maria Santos',
                    message: 'fix: corrigir bug no formulário de contato',
                    date: new Date(Date.now() - 7200000),
                    files: ['contact.html', 'script.js']
                },
                {
                    hash: 'i7j8k9l',
                    author: 'Pedro Costa',
                    message: 'docs: atualizar documentação da API',
                    date: new Date(Date.now() - 10800000),
                    files: ['README.md', 'API.md']
                }
            ]);

            setBranches([
                { name: 'main', isCurrent: true, isRemote: false, lastCommit: 'a1b2c3d', ahead: 0, behind: 0 },
                { name: 'develop', isCurrent: false, isRemote: false, lastCommit: 'm1n2o3p', ahead: 2, behind: 0 },
                { name: 'feature/auth', isCurrent: false, isRemote: false, lastCommit: 'q4r5s6t', ahead: 5, behind: 0 },
                { name: 'origin/main', isCurrent: false, isRemote: true, lastCommit: 'a1b2c3d', ahead: 0, behind: 0 },
                { name: 'origin/develop', isCurrent: false, isRemote: true, lastCommit: 'm1n2o3p', ahead: 0, behind: 2 }
            ]);

            setGitStatus({
                ahead: 2,
                behind: 0,
                totalChanges: 28
            });

            setIsLoading(false);
        }, 1000);
    };

    const stageFile = (fileName: string) => {
        const file = unstagedFiles.find(f => f.name === fileName);
        if (file) {
            setUnstagedFiles(prev => prev.filter(f => f.name !== fileName));
            setStagedFiles(prev => [...prev, { ...file, status: 'staged' }]);
        }
    };

    const unstageFile = (fileName: string) => {
        const file = stagedFiles.find(f => f.name === fileName);
        if (file) {
            setStagedFiles(prev => prev.filter(f => f.name !== fileName));
            setUnstagedFiles(prev => [...prev, { ...file, status: 'modified' }]);
        }
    };

    const discardChanges = (fileName: string) => {
        setUnstagedFiles(prev => prev.filter(f => f.name !== fileName));
    };

    const createCommit = () => {
        if (!commitMessage.trim() || stagedFiles.length === 0) return;

        const newCommit: GitCommit = {
            hash: Math.random().toString(36).substring(2, 9),
            author: 'Usuário Atual',
            message: commitMessage,
            date: new Date(),
            files: stagedFiles.map(f => f.name)
        };

        setCommits(prev => [newCommit, ...prev]);
        setStagedFiles([]);
        setCommitMessage('');

        // Atualizar branch atual
        setBranches(prev => prev.map(b =>
            b.isCurrent ? { ...b, lastCommit: newCommit.hash, ahead: b.ahead + 1 } : b
        ));
    };

    const checkoutBranch = (branchName: string) => {
        setBranches(prev => prev.map(b => ({
            ...b,
            isCurrent: b.name === branchName
        })));
        setCurrentBranch(branchName);
    };

    const createBranch = () => {
        const branchName = prompt('Nome da nova branch:');
        if (branchName && !branches.find(b => b.name === branchName)) {
            const newBranch: GitBranch = {
                name: branchName,
                isCurrent: false,
                isRemote: false,
                lastCommit: currentBranch,
                ahead: 0,
                behind: 0
            };
            setBranches(prev => [...prev, newBranch]);
        }
    };

    const mergeBranch = (branchName: string) => {
        if (confirm(`Mesclar branch '${branchName}' para '${currentBranch}'?`)) {
            // Simular merge
            console.log(`Merging ${branchName} into ${currentBranch}`);
        }
    };

    const pullChanges = () => {
        setIsLoading(true);
        setTimeout(() => {
            setGitStatus(prev => ({ ...prev, behind: 0 }));
            setIsLoading(false);
        }, 2000);
    };

    const pushChanges = () => {
        setIsLoading(true);
        setTimeout(() => {
            setGitStatus(prev => ({ ...prev, ahead: 0 }));
            setIsLoading(false);
        }, 2000);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'modified':
                return <Minus className="w-4 h-4 text-yellow-400" />;
            case 'added':
                return <Plus className="w-4 h-4 text-green-400" />;
            case 'deleted':
                return <Minus className="w-4 h-4 text-red-400" />;
            case 'untracked':
                return <FileText className="w-4 h-4 text-blue-400" />;
            case 'staged':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            default:
                return <FileText className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'modified':
                return 'text-yellow-400';
            case 'added':
                return 'text-green-400';
            case 'deleted':
                return 'text-red-400';
            case 'untracked':
                return 'text-blue-400';
            case 'staged':
                return 'text-green-500';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-200 flex items-center space-x-2">
                    <GitBranch className="w-5 h-5" />
                    <span>Controle de Versão Git</span>
                </h2>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={pullChanges}
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>Pull</span>
                    </button>

                    <button
                        onClick={pushChanges}
                        disabled={isLoading || gitStatus.ahead === 0}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                        <Upload className="w-4 h-4" />
                        <span>Push</span>
                    </button>

                    <button
                        onClick={loadGitData}
                        disabled={isLoading}
                        className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 text-white px-3 py-2 rounded-lg transition-colors"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Status do Git */}
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <GitBranch className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300">Branch:</span>
                            <span className="text-blue-400 font-medium">{currentBranch}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-gray-400">|</span>
                            <span className="text-green-400">{gitStatus.ahead} ahead</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-red-400">{gitStatus.behind} behind</span>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-sm text-gray-400">Total de mudanças</div>
                        <div className="text-2xl font-bold text-blue-400">{gitStatus.totalChanges}</div>
                    </div>
                </div>
            </div>

            {/* Tabs de Navegação */}
            <div className="flex space-x-1 mb-6 bg-gray-700 p-1 rounded-lg">
                <button
                    onClick={() => setActiveTab('changes')}
                    className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${activeTab === 'changes'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                        }`}
                >
                    <FileText className="w-4 h-4" />
                    <span>Mudanças</span>
                </button>
                <button
                    onClick={() => setActiveTab('commits')}
                    className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${activeTab === 'commits'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                        }`}
                >
                    <GitCommit className="w-4 h-4" />
                    <span>Commits</span>
                </button>
                <button
                    onClick={() => setActiveTab('branches')}
                    className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${activeTab === 'branches'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                        }`}
                >
                    <GitBranch className="w-4 h-4" />
                    <span>Branches</span>
                </button>
                <button
                    onClick={() => setActiveTab('remote')}
                    className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${activeTab === 'remote'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                        }`}
                >
                    <GitPullRequest className="w-4 h-4" />
                    <span>Remote</span>
                </button>
            </div>

            {/* Conteúdo das Tabs */}
            <div className="space-y-6">
                {/* Tab: Mudanças */}
                {activeTab === 'changes' && (
                    <div className="space-y-6">
                        {/* Arquivos Staged */}
                        {stagedFiles.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Staged ({stagedFiles.length})</span>
                                </h3>
                                <div className="space-y-2">
                                    {stagedFiles.map(file => (
                                        <div key={file.name} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                {getStatusIcon(file.status)}
                                                <span className="text-gray-200">{file.name}</span>
                                                <span className="text-sm text-gray-400">({file.changes} mudanças)</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => unstageFile(file.name)}
                                                    className="text-gray-400 hover:text-yellow-400 p-1"
                                                    title="Unstage"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                {onFileSelect && (
                                                    <button
                                                        onClick={() => onFileSelect(file.name)}
                                                        className="text-blue-400 hover:text-blue-300 p-1"
                                                        title="Ver arquivo"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Arquivos Unstaged */}
                        {unstagedFiles.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center space-x-2">
                                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                                    <span>Unstaged ({unstagedFiles.length})</span>
                                </h3>
                                <div className="space-y-2">
                                    {unstagedFiles.map(file => (
                                        <div key={file.name} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                {getStatusIcon(file.status)}
                                                <span className="text-gray-200">{file.name}</span>
                                                <span className="text-sm text-gray-400">({file.changes} mudanças)</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => stageFile(file.name)}
                                                    className="text-green-400 hover:text-green-300 p-1"
                                                    title="Stage"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => discardChanges(file.name)}
                                                    className="text-red-400 hover:text-red-300 p-1"
                                                    title="Descartar mudanças"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                {onFileSelect && (
                                                    <button
                                                        onClick={() => onFileSelect(file.name)}
                                                        className="text-blue-400 hover:text-blue-300 p-1"
                                                        title="Ver arquivo"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Commit */}
                        {stagedFiles.length > 0 && (
                            <div className="bg-gray-700 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-200 mb-4">Criar Commit</h3>
                                <div className="space-y-4">
                                    <textarea
                                        value={commitMessage}
                                        onChange={(e) => setCommitMessage(e.target.value)}
                                        placeholder="Mensagem do commit..."
                                        className="w-full bg-gray-600 text-white p-3 rounded-lg border-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        rows={3}
                                    />
                                    <button
                                        onClick={createCommit}
                                        disabled={!commitMessage.trim()}
                                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                                    >
                                        <GitCommit className="w-4 h-4" />
                                        <span>Commit</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab: Commits */}
                {activeTab === 'commits' && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Histórico de Commits</h3>
                        <div className="space-y-3">
                            {commits.map(commit => (
                                <div key={commit.hash} className="bg-gray-700 p-4 rounded-lg">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="font-mono text-sm text-blue-400">{commit.hash}</span>
                                                <span className="text-gray-400">|</span>
                                                <span className="text-gray-200 font-medium">{commit.message}</span>
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                <div className="flex items-center space-x-1">
                                                    <User className="w-3 h-3" />
                                                    <span>{commit.author}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{commit.date.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <FileText className="w-3 h-3" />
                                                    <span>{commit.files.length} arquivos</span>
                                                </div>
                                            </div>

                                            {commit.files.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {commit.files.map(file => (
                                                        <span
                                                            key={file}
                                                            className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded"
                                                        >
                                                            {file}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab: Branches */}
                {activeTab === 'branches' && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-200">Branches</h3>
                            <button
                                onClick={createBranch}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Nova Branch</span>
                            </button>
                        </div>

                        <div className="space-y-3">
                            {branches.map(branch => (
                                <div
                                    key={branch.name}
                                    className={`p-4 rounded-lg border-2 transition-all ${branch.isCurrent
                                        ? 'border-blue-500 bg-blue-600 bg-opacity-20'
                                        : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <GitBranch className={`w-4 h-4 ${branch.isRemote ? 'text-purple-400' : 'text-blue-400'}`} />
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`font-medium ${branch.isCurrent ? 'text-blue-400' : 'text-gray-200'}`}>
                                                        {branch.name}
                                                    </span>
                                                    {branch.isCurrent && (
                                                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                                            Atual
                                                        </span>
                                                    )}
                                                    {branch.isRemote && (
                                                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                                                            Remote
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {branch.ahead > 0 && <span className="text-green-400">+{branch.ahead} </span>}
                                                    {branch.behind > 0 && <span className="text-red-400">-{branch.behind} </span>}
                                                    <span className="text-gray-500">commit {branch.lastCommit}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            {!branch.isCurrent && !branch.isRemote && (
                                                <button
                                                    onClick={() => checkoutBranch(branch.name)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                                >
                                                    Checkout
                                                </button>
                                            )}
                                            {!branch.isCurrent && !branch.isRemote && (
                                                <button
                                                    onClick={() => mergeBranch(branch.name)}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                                >
                                                    Merge
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab: Remote */}
                {activeTab === 'remote' && (
                    <div className="space-y-6">
                        <div className="bg-gray-700 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-200 mb-4">Configurações Remote</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        URL do Remote
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="https://github.com/usuario/repositorio.git"
                                        className="w-full bg-gray-600 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Nome do Remote
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="origin"
                                        defaultValue="origin"
                                        className="w-full bg-gray-600 text-white px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-700 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-200 mb-4">Ações Remote</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={pullChanges}
                                    disabled={isLoading}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 justify-center"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Pull (Baixar mudanças)</span>
                                </button>

                                <button
                                    onClick={pushChanges}
                                    disabled={isLoading || gitStatus.ahead === 0}
                                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 justify-center"
                                >
                                    <Upload className="w-4 h-4" />
                                    <span>Push (Enviar mudanças)</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GitIntegration;
