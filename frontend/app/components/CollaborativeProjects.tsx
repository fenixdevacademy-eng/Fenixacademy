'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Users,
    Calendar,
    CheckCircle,
    Clock,
    AlertTriangle,
    MessageCircle,
    Video,
    FileText,
    GitBranch,
    Plus,
    Edit,
    Trash2,
    UserPlus,
    Settings,
    BarChart3,
    Download,
    Share2
} from 'lucide-react';
import { CollaborativeProject, ProjectPhase, ProjectTask } from '../data/interactiveElements';

interface CollaborativeProjectsProps {
    project: CollaborativeProject;
    onTaskUpdate?: (taskId: string, updates: Partial<ProjectTask>) => void;
    onPhaseUpdate?: (phaseId: string, updates: Partial<ProjectPhase>) => void;
    onMemberAdd?: (memberId: string) => void;
    onMemberRemove?: (memberId: string) => void;
    onExport?: (format: 'pdf' | 'json' | 'csv') => void;
    onShare?: () => void;
    showAnalytics?: boolean;
    showChat?: boolean;
}

export default function CollaborativeProjects({
    project,
    onTaskUpdate,
    onPhaseUpdate,
    onMemberAdd,
    onMemberRemove,
    onExport,
    onShare,
    showAnalytics = true,
    showChat = true
}: CollaborativeProjectsProps) {
    const [selectedPhase, setSelectedPhase] = useState<ProjectPhase | null>(project.phases[0] || null);
    const [showAddTask, setShowAddTask] = useState(false);
    const [showAddPhase, setShowAddPhase] = useState(false);
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [newTask, setNewTask] = useState<Partial<ProjectTask>>({});
    const [newPhase, setNewPhase] = useState<Partial<ProjectPhase>>({});
    const [newMember, setNewMember] = useState('');
    const [chatMessages, setChatMessages] = useState<Array<{
        id: string;
        user: string;
        message: string;
        timestamp: Date;
        type: 'text' | 'file' | 'system';
    }>>([]);
    const [newMessage, setNewMessage] = useState('');

    const chatRef = useRef<HTMLDivElement>(null);

    // Auto-scroll chat
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const getProjectIcon = () => {
        switch (project.type) {
            case 'web-app': return '🌐';
            case 'mobile-app': return '📱';
            case 'api': return '🔌';
            case 'data-analysis': return '📊';
            case 'game': return '🎮';
            default: return '💻';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'review': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Concluído';
            case 'in-progress': return 'Em Progresso';
            case 'pending': return 'Pendente';
            case 'review': return 'Em Revisão';
            default: return 'Desconhecido';
        }
    };

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'high': return 'Alta';
            case 'medium': return 'Média';
            case 'low': return 'Baixa';
            default: return 'Desconhecida';
        }
    };

    const addTask = () => {
        if (!selectedPhase || !newTask.title) return;

        const task: ProjectTask = {
            id: `task-${Date.now()}`,
            title: newTask.title,
            description: newTask.description || '',
            status: 'todo',
            priority: newTask.priority || 'medium',
            estimatedHours: newTask.estimatedHours || 0,
            dependencies: newTask.dependencies || [],
            ...newTask
        };

        const updatedPhase = {
            ...selectedPhase,
            tasks: [...selectedPhase.tasks, task]
        };

        onPhaseUpdate?.(selectedPhase.id, updatedPhase);
        setNewTask({});
        setShowAddTask(false);
    };

    const addPhase = () => {
        if (!newPhase.name) return;

        const phase: ProjectPhase = {
            id: `phase-${Date.now()}`,
            name: newPhase.name,
            description: newPhase.description || '',
            tasks: [],
            deadline: newPhase.deadline || new Date(),
            status: 'pending',
            ...newPhase
        };

        onPhaseUpdate?.(phase.id, phase);
        setNewPhase({});
        setShowAddPhase(false);
    };

    const updateTaskStatus = (taskId: string, status: ProjectTask['status']) => {
        if (!selectedPhase) return;

        const updatedTasks = selectedPhase.tasks.map(task =>
            task.id === taskId ? { ...task, status } : task
        );

        const updatedPhase = { ...selectedPhase, tasks: updatedTasks };
        onPhaseUpdate?.(selectedPhase.id, updatedPhase);
    };

    const addChatMessage = () => {
        if (!newMessage.trim()) return;

        const message = {
            id: `msg-${Date.now()}`,
            user: 'Você',
            message: newMessage,
            timestamp: new Date(),
            type: 'text' as const
        };

        setChatMessages(prev => [...prev, message]);
        setNewMessage('');

        // Simulate team response
        setTimeout(() => {
            const teamMessage = {
                id: `msg-${Date.now()}`,
                user: 'Equipe',
                message: 'Mensagem recebida! Vamos analisar.',
                timestamp: new Date(),
                type: 'text' as const
            };
            setChatMessages(prev => [...prev, teamMessage]);
        }, 1000);
    };

    const calculateProgress = (phase: ProjectPhase) => {
        if (phase.tasks.length === 0) return 0;
        const completedTasks = phase.tasks.filter(task => task.status === 'done').length;
        return (completedTasks / phase.tasks.length) * 100;
    };

    const getProjectProgress = () => {
        const totalTasks = project.phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
        const completedTasks = project.phases.reduce((acc, phase) =>
            acc + phase.tasks.filter(task => task.status === 'done').length, 0
        );
        return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getProjectIcon()}</span>
                        <div>
                            <h2 className="text-xl font-bold">{project.title}</h2>
                            <p className="text-blue-100 text-sm">{project.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.type === 'web-app' ? 'bg-blue-500/20' :
                            project.type === 'mobile-app' ? 'bg-green-500/20' :
                                project.type === 'api' ? 'bg-purple-500/20' :
                                    project.type === 'data-analysis' ? 'bg-orange-500/20' :
                                        'bg-gray-500/20'
                            }`}>
                            {project.type === 'web-app' ? 'Aplicação Web' :
                                project.type === 'mobile-app' ? 'App Mobile' :
                                    project.type === 'api' ? 'API' :
                                        project.type === 'data-analysis' ? 'Análise de Dados' : 'Jogo'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Project Overview */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{project.teamSize.current}</div>
                        <div className="text-sm text-gray-600">Membros</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{project.phases.length}</div>
                        <div className="text-sm text-gray-600">Fases</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                            {Math.round(getProjectProgress())}%
                        </div>
                        <div className="text-sm text-gray-600">Progresso</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                            {project.phases.reduce((acc, phase) => acc + phase.tasks.length, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Tarefas</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Phases */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Fases do Projeto</h3>
                            <button
                                onClick={() => setShowAddPhase(true)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                            >
                                <Plus className="w-4 h-4 inline mr-1" />
                                Nova Fase
                            </button>
                        </div>

                        <div className="space-y-4">
                            {project.phases.map((phase) => (
                                <div
                                    key={phase.id}
                                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedPhase?.id === phase.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setSelectedPhase(phase)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-gray-800">{phase.name}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                                            {getStatusText(phase.status)}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-3">{phase.description}</p>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>Progresso: {Math.round(calculateProgress(phase))}%</span>
                                        <span>Prazo: {phase.deadline.toLocaleDateString('pt-BR')}</span>
                                    </div>

                                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${calculateProgress(phase)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tasks */}
                    {selectedPhase && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Tarefas - {selectedPhase.name}
                                </h3>
                                <button
                                    onClick={() => setShowAddTask(true)}
                                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                                >
                                    <Plus className="w-4 h-4 inline mr-1" />
                                    Nova Tarefa
                                </button>
                            </div>

                            <div className="space-y-3">
                                {selectedPhase.tasks.map((task) => (
                                    <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800">{task.title}</h4>
                                                <p className="text-sm text-gray-600">{task.description}</p>
                                            </div>

                                            <div className="flex items-center space-x-2 ml-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                                    {getPriorityText(task.priority)}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                                    {getStatusText(task.status)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                            <span>Estimativa: {task.estimatedHours}h</span>
                                            {task.assignee && <span>Responsável: {task.assignee}</span>}
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={task.status}
                                                onChange={(e) => updateTaskStatus(task.id, e.target.value as ProjectTask['status'])}
                                                className="px-2 py-1 border border-gray-300 rounded text-xs"
                                            >
                                                <option value="todo">A fazer</option>
                                                <option value="in-progress">Em progresso</option>
                                                <option value="review">Em revisão</option>
                                                <option value="done">Concluído</option>
                                            </select>

                                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                                <Edit className="w-3 h-3" />
                                            </button>

                                            <button className="p-1 text-red-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Team */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                <Users className="w-5 h-5 mr-2" />
                                Equipe
                            </h3>
                            <button
                                onClick={() => setShowMemberModal(true)}
                                className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <UserPlus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm text-gray-600">
                                {project.teamSize.current} de {project.teamSize.max} membros
                            </div>

                            <div className="space-y-2">
                                {['João Silva', 'Maria Santos', 'Pedro Costa'].slice(0, project.teamSize.current).map((member, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <span className="text-sm text-gray-700">{member}</span>
                                        <button className="text-red-400 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tecnologias</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Collaboration Features */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Colaboração</h3>
                        <div className="space-y-3">
                            {Object.entries(project.collaboration).map(([feature, enabled]) => (
                                <div key={feature} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 capitalize">
                                        {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {enabled ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
                        <div className="space-y-2">
                            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-50 rounded transition-colors">
                                <MessageCircle className="w-4 h-4 text-blue-600" />
                                <span className="text-sm">Chat da Equipe</span>
                            </button>

                            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-50 rounded transition-colors">
                                <Video className="w-4 h-4 text-green-600" />
                                <span className="text-sm">Video Call</span>
                            </button>

                            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-50 rounded transition-colors">
                                <FileText className="w-4 h-4 text-purple-600" />
                                <span className="text-sm">Compartilhar Arquivos</span>
                            </button>

                            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-50 rounded transition-colors">
                                <GitBranch className="w-4 h-4 text-orange-600" />
                                <span className="text-sm">Controle de Versão</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Section */}
            {showChat && (
                <div className="border-t border-gray-200 p-6">
                    <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                            <h3 className="font-medium text-gray-800">Chat da Equipe</h3>
                        </div>

                        <div
                            ref={chatRef}
                            className="h-64 overflow-y-auto p-4 space-y-3"
                        >
                            {chatMessages.map((message) => (
                                <div key={message.id} className="flex items-start space-x-2">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                        {message.user.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-medium text-gray-800">{message.user}</span>
                                            <span className="text-xs text-gray-500">
                                                {message.timestamp.toLocaleTimeString('pt-BR')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700">{message.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-200">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Digite sua mensagem..."
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                    onKeyPress={(e) => e.key === 'Enter' && addChatMessage()}
                                />
                                <button
                                    onClick={addChatMessage}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modals */}
            {showAddTask && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Nova Tarefa</h3>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Título da tarefa"
                                value={newTask.title || ''}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />

                            <textarea
                                placeholder="Descrição"
                                value={newTask.description || ''}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                rows={3}
                            />

                            <select
                                value={newTask.priority || 'medium'}
                                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            >
                                <option value="low">Baixa Prioridade</option>
                                <option value="medium">Média Prioridade</option>
                                <option value="high">Alta Prioridade</option>
                            </select>

                            <input
                                type="number"
                                placeholder="Horas estimadas"
                                value={newTask.estimatedHours || ''}
                                onChange={(e) => setNewTask({ ...newTask, estimatedHours: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowAddTask(false)}
                                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={addTask}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAddPhase && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Nova Fase</h3>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nome da fase"
                                value={newPhase.name || ''}
                                onChange={(e) => setNewPhase({ ...newPhase, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />

                            <textarea
                                placeholder="Descrição"
                                value={newPhase.description || ''}
                                onChange={(e) => setNewPhase({ ...newPhase, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                rows={3}
                            />

                            <input
                                type="date"
                                value={newPhase.deadline?.toISOString().split('T')[0] || ''}
                                onChange={(e) => setNewPhase({ ...newPhase, deadline: new Date(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowAddPhase(false)}
                                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={addPhase}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showMemberModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Membro</h3>

                        <input
                            type="text"
                            placeholder="Email ou nome do usuário"
                            value={newMember}
                            onChange={(e) => setNewMember(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-4"
                        />

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowMemberModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    if (newMember) {
                                        onMemberAdd?.(newMember);
                                        setNewMember('');
                                        setShowMemberModal(false);
                                    }
                                }}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
