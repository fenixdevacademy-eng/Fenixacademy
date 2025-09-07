'use client';

import React, { useState } from 'react';
import {
    BookOpen,
    BarChart3,
    Code,
    Users,
    Play,
    Settings,
    Home,
    Search,
    Filter,
    Grid,
    List
} from 'lucide-react';
import InteractiveSlides from './InteractiveSlides';
import InteractiveInfographics from './InteractiveInfographics';
import InteractiveQuiz from './InteractiveQuiz';
import InteractiveSimulator from './InteractiveSimulator';
import CodePlayground from './CodePlayground';
import CollaborativeProjects from './CollaborativeProjects';
import { sampleInteractiveElements } from '../data/interactiveElements';

interface InteractiveLearningHubProps {
    showAllComponents?: boolean;
    defaultView?: 'slides' | 'infographics' | 'quiz' | 'simulator' | 'playground' | 'projects';
}

export default function InteractiveLearningHub({
    showAllComponents = true,
    defaultView = 'slides'
}: InteractiveLearningHubProps) {
    const [currentView, setCurrentView] = useState(defaultView);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const navigationItems = [
        { id: 'slides', label: 'Slides Interativos', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
        { id: 'infographics', label: 'Infográficos', icon: BarChart3, color: 'from-green-500 to-green-600' },
        { id: 'quiz', label: 'Quizzes', icon: Play, color: 'from-purple-500 to-purple-600' },
        { id: 'simulator', label: 'Simuladores', icon: BarChart3, color: 'from-orange-500 to-orange-600' },
        { id: 'playground', label: 'Code Playground', icon: Code, color: 'from-red-500 to-red-600' },
        { id: 'projects', label: 'Projetos Colaborativos', icon: Users, color: 'from-indigo-500 to-indigo-600' }
    ];

    const categories = [
        { id: 'all', label: 'Todos', count: navigationItems.length },
        { id: 'beginner', label: 'Iniciante', count: 3 },
        { id: 'intermediate', label: 'Intermediário', count: 2 },
        { id: 'advanced', label: 'Avançado', count: 1 }
    ];

    const filteredItems = navigationItems.filter(item => {
        const matchesSearch = item.label.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.id.includes(filterCategory);
        return matchesSearch && matchesCategory;
    });

    const renderCurrentView = () => {
        switch (currentView) {
            case 'slides':
                return (
                    <InteractiveSlides
                        slides={sampleInteractiveElements.slides}
                        onSlideChange={(slideId) => console.log('Slide changed:', slideId)}
                        onComplete={() => console.log('Slides completed')}
                        autoPlay={false}
                        showProgress={true}
                    />
                );

            case 'infographics':
                return (
                    <InteractiveInfographics
                        infographic={sampleInteractiveElements.infographics[0]}
                        onElementClick={(elementId) => console.log('Element clicked:', elementId)}
                        onExport={(format) => console.log('Exporting as:', format)}
                        onShare={() => console.log('Sharing infographic')}
                        showControls={true}
                        autoAnimate={true}
                    />
                );

            case 'quiz':
                return (
                    <InteractiveQuiz
                        quiz={sampleInteractiveElements.quizzes[0]}
                        onComplete={(score, total, time) => console.log('Quiz completed:', { score, total, time })}
                        onClose={() => setCurrentView('slides')}
                        showTimer={true}
                        allowRetry={true}
                    />
                );

            case 'simulator':
                return (
                    <InteractiveSimulator
                        simulator={sampleInteractiveElements.simulators[0]}
                        onParameterChange={(param, value) => console.log('Parameter changed:', { param, value })}
                        onScenarioLoad={(scenario) => console.log('Scenario loaded:', scenario)}
                        onExport={(format) => console.log('Exporting as:', format)}
                        onShare={() => console.log('Sharing simulator')}
                        showControls={true}
                        autoRun={false}
                    />
                );

            case 'playground':
                return (
                    <CodePlayground
                        playground={sampleInteractiveElements.codePlaygrounds[0]}
                        onCodeRun={(code, output) => console.log('Code run:', { code, output })}
                        onChallengeComplete={(challengeId, points) => console.log('Challenge completed:', { challengeId, points })}
                        onExport={(format) => console.log('Exporting as:', format)}
                        onShare={() => console.log('Sharing playground')}
                        showExamples={true}
                        showChallenges={true}
                    />
                );

            case 'projects':
                return (
                    <CollaborativeProjects
                        project={sampleInteractiveElements.collaborativeProjects[0]}
                        onTaskUpdate={(taskId, updates) => console.log('Task updated:', { taskId, updates })}
                        onPhaseUpdate={(phaseId, updates) => console.log('Phase updated:', { phaseId, updates })}
                        onMemberAdd={(memberId) => console.log('Member added:', memberId)}
                        onMemberRemove={(memberId) => console.log('Member removed:', memberId)}
                        onExport={(format) => console.log('Exporting as:', format)}
                        onShare={() => console.log('Sharing project')}
                        showAnalytics={true}
                        showChat={true}
                    />
                );

            default:
                return (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Selecione uma ferramenta</h3>
                        <p className="text-gray-600">Escolha uma das opções acima para começar a aprender</p>
                    </div>
                );
        }
    };

    if (!showAllComponents) {
        return renderCurrentView();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <h1 className="text-xl font-bold text-gray-900">Fenix Interactive Hub</h1>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <nav className="flex space-x-8">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = currentView === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setCurrentView(item.id as any)}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                                                ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar ferramentas interativas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.label} ({category.count})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {currentView === 'slides' ? (
                    renderCurrentView()
                ) : (
                    <div className="space-y-8">
                        {/* Current Tool Header */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {navigationItems.find(item => item.id === currentView)?.label}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        Ferramenta interativa para aprendizado prático
                                    </p>
                                </div>

                                <button
                                    onClick={() => setCurrentView('slides')}
                                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <Home className="w-4 h-4" />
                                    <span>Voltar ao Hub</span>
                                </button>
                            </div>
                        </div>

                        {/* Tool Content */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {renderCurrentView()}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Fenix Academy - Plataforma de Aprendizado Interativo
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Transformando a educação em tecnologia com ferramentas interativas e colaborativas
                        </p>
                        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                            <span>Slides Interativos</span>
                            <span>•</span>
                            <span>Infográficos</span>
                            <span>•</span>
                            <span>Quizzes</span>
                            <span>•</span>
                            <span>Simuladores</span>
                            <span>•</span>
                            <span>Code Playground</span>
                            <span>•</span>
                            <span>Projetos Colaborativos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
