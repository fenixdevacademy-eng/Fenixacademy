'use client';

import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    Play,
    Pause,
    RotateCcw,
    CheckCircle,
    Star,
    Clock,
    Users,
    Award,
    Target,
    TrendingUp,
    BarChart3,
    Brain,
    Lightbulb,
    Zap,
    Shield,
    Heart,
    MessageCircle,
    Share2,
    Download,
    Settings,
    Maximize2,
    Minimize2
} from 'lucide-react';

interface IntegratedCourseViewProps {
    className?: string;
    courseId?: string;
    onLessonComplete?: (lessonId: string) => void;
    onProgressUpdate?: (progress: number) => void;
    onNoteSave?: (note: Note) => void;
    onBookmarkAdd?: (bookmark: Bookmark) => void;
}

interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    rating: number;
    studentsCount: number;
    thumbnail: string;
    lessons: Lesson[];
    progress: number;
    isBookmarked: boolean;
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'text' | 'quiz' | 'exercise' | 'project';
    duration: number;
    isCompleted: boolean;
    isLocked: boolean;
    content: string;
    resources: Resource[];
    notes: Note[];
    bookmarks: Bookmark[];
}

interface Resource {
    id: string;
    title: string;
    type: 'pdf' | 'video' | 'link' | 'code';
    url: string;
    size?: number;
}

interface Note {
    id: string;
    content: string;
    timestamp: number;
    lessonId: string;
    createdAt: string;
}

interface Bookmark {
    id: string;
    title: string;
    timestamp: number;
    lessonId: string;
    createdAt: string;
}

const mockCourse: Course = {
    id: '1',
    title: 'JavaScript Completo do Zero ao Avançado',
    description: 'Aprenda JavaScript desde o básico até conceitos avançados com projetos práticos',
    instructor: 'João Silva',
    duration: 1200,
    difficulty: 'intermediate',
    rating: 4.8,
    studentsCount: 15420,
    thumbnail: '/images/courses/javascript-complete.jpg',
    progress: 65,
    isBookmarked: true,
    lessons: [
        {
            id: '1',
            title: 'Introdução ao JavaScript',
            description: 'Conceitos fundamentais e sintaxe básica',
            type: 'video',
            duration: 45,
            isCompleted: true,
            isLocked: false,
            content: 'Nesta lição você aprenderá...',
            resources: [
                { id: '1', title: 'Guia de Referência', type: 'pdf', url: '/resources/js-guide.pdf', size: 1024 },
                { id: '2', title: 'Código Fonte', type: 'code', url: '/resources/js-examples.zip' }
            ],
            notes: [],
            bookmarks: []
        },
        {
            id: '2',
            title: 'Variáveis e Tipos de Dados',
            description: 'Como declarar e usar variáveis em JavaScript',
            type: 'video',
            duration: 30,
            isCompleted: true,
            isLocked: false,
            content: 'Nesta lição você aprenderá...',
            resources: [],
            notes: [],
            bookmarks: []
        },
        {
            id: '3',
            title: 'Funções e Escopo',
            description: 'Criando e usando funções em JavaScript',
            type: 'video',
            duration: 60,
            isCompleted: false,
            isLocked: false,
            content: 'Nesta lição você aprenderá...',
            resources: [],
            notes: [],
            bookmarks: []
        }
    ]
};

export function IntegratedCourseView({
    className = '',
    courseId,
    onLessonComplete,
    onProgressUpdate,
    onNoteSave,
    onBookmarkAdd
}: IntegratedCourseViewProps) {
    const [course, setCourse] = useState<Course>(mockCourse);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(course.lessons[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showResources, setShowResources] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    useEffect(() => {
        if (currentLesson) {
            setDuration(currentLesson.duration * 60); // Convert to seconds
            setNotes(currentLesson.notes);
            setBookmarks(currentLesson.bookmarks);
        }
    }, [currentLesson]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (time: number) => {
        setCurrentTime(time);
    };

    const handlePlaybackRateChange = (rate: number) => {
        setPlaybackRate(rate);
    };

    const handleVolumeChange = (vol: number) => {
        setVolume(vol);
    };

    const handleLessonSelect = (lesson: Lesson) => {
        if (lesson.isLocked) return;
        setCurrentLesson(lesson);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const handleLessonComplete = () => {
        if (!currentLesson) return;

        setCourse(prev => ({
            ...prev,
            lessons: prev.lessons.map(lesson =>
                lesson.id === currentLesson.id
                    ? { ...lesson, isCompleted: true }
                    : lesson
            ),
            progress: Math.min(100, prev.progress + (100 / prev.lessons.length))
        }));

        onLessonComplete?.(currentLesson.id);
        onProgressUpdate?.(course.progress + (100 / course.lessons.length));
    };

    const handleAddNote = () => {
        if (!newNote.trim() || !currentLesson) return;

        const note: Note = {
            id: Date.now().toString(),
            content: newNote,
            timestamp: currentTime,
            lessonId: currentLesson.id,
            createdAt: new Date().toISOString()
        };

        setNotes(prev => [...prev, note]);
        setCourse(prev => ({
            ...prev,
            lessons: prev.lessons.map(lesson =>
                lesson.id === currentLesson.id
                    ? { ...lesson, notes: [...lesson.notes, note] }
                    : lesson
            )
        }));

        onNoteSave?.(note);
        setNewNote('');
    };

    const handleAddBookmark = () => {
        if (!currentLesson) return;

        const bookmark: Bookmark = {
            id: Date.now().toString(),
            title: `Bookmark em ${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`,
            timestamp: currentTime,
            lessonId: currentLesson.id,
            createdAt: new Date().toISOString()
        };

        setBookmarks(prev => [...prev, bookmark]);
        setCourse(prev => ({
            ...prev,
            lessons: prev.lessons.map(lesson =>
                lesson.id === currentLesson.id
                    ? { ...lesson, bookmarks: [...lesson.bookmarks, bookmark] }
                    : lesson
            )
        }));

        onBookmarkAdd?.(bookmark);
    };

    const handleToggleBookmark = () => {
        setCourse(prev => ({
            ...prev,
            isBookmarked: !prev.isBookmarked
        }));
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'text-green-600 bg-green-100 dark:bg-green-900/20';
            case 'intermediate':
                return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
            case 'advanced':
                return 'text-red-600 bg-red-100 dark:bg-red-900/20';
            default:
                return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <Play className="w-4 h-4" />;
            case 'text':
                return <BookOpen className="w-4 h-4" />;
            case 'quiz':
                return <Target className="w-4 h-4" />;
            case 'exercise':
                return <Brain className="w-4 h-4" />;
            case 'project':
                return <Award className="w-4 h-4" />;
            default:
                return <BookOpen className="w-4 h-4" />;
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {course.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                por {course.instructor}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {course.rating}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {course.studentsCount.toLocaleString()} alunos
                                    </span>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(course.difficulty)}`}>
                                    {course.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleToggleBookmark}
                            className={`p-2 rounded-lg transition-colors ${course.isBookmarked
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            title="Favoritar curso"
                        >
                            <Star className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                        >
                            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Progresso do Curso</span>
                        <span>{Math.round(course.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="flex h-96">
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Video Player */}
                    <div className="flex-1 bg-gray-900 relative">
                        {currentLesson ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center text-white">
                                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <h3 className="text-xl font-semibold mb-2">{currentLesson.title}</h3>
                                    <p className="text-gray-300">{currentLesson.description}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white">
                                <div className="text-center">
                                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>Selecione uma lição para começar</p>
                                </div>
                            </div>
                        )}

                        {/* Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handlePlayPause}
                                    className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-colors"
                                >
                                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                </button>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 text-white text-sm">
                                        <span>{formatTime(currentTime)}</span>
                                        <div className="flex-1 bg-white bg-opacity-20 rounded-full h-1">
                                            <div
                                                className="bg-white h-1 rounded-full transition-all duration-300"
                                                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleAddBookmark}
                                        className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-colors"
                                        title="Adicionar bookmark"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setShowNotes(!showNotes)}
                                        className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-colors"
                                        title="Notas"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lesson Content */}
                    {currentLesson && (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {currentLesson.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowResources(!showResources)}
                                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        Recursos
                                    </button>
                                    <button
                                        onClick={handleLessonComplete}
                                        className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                                    >
                                        Marcar como Concluída
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                {currentLesson.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="w-80 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                    {/* Lessons List */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Lições do Curso
                            </h4>
                        </div>
                        <div className="space-y-1">
                            {course.lessons.map((lesson) => (
                                <button
                                    key={lesson.id}
                                    onClick={() => handleLessonSelect(lesson)}
                                    className={`w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${currentLesson?.id === lesson.id
                                            ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500'
                                            : ''
                                        } ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={lesson.isLocked}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0">
                                            {lesson.isCompleted ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : lesson.isLocked ? (
                                                <Shield className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                getTypeIcon(lesson.type)
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="font-medium text-gray-900 dark:text-white truncate">
                                                {lesson.title}
                                            </h5>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                {lesson.description}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Clock className="w-3 h-3 text-gray-400" />
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {lesson.duration}min
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes Panel */}
                    {showNotes && (
                        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Notas
                            </h4>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        placeholder="Adicionar nota..."
                                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleAddNote}
                                        className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {notes.map((note) => (
                                        <div key={note.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <p className="text-sm text-gray-900 dark:text-white">{note.content}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {formatTime(note.timestamp)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Resources Panel */}
                    {showResources && currentLesson && (
                        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Recursos
                            </h4>
                            <div className="space-y-2">
                                {currentLesson.resources.map((resource) => (
                                    <div key={resource.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <Download className="w-4 h-4 text-gray-400" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {resource.title}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {resource.type.toUpperCase()}
                                                {resource.size && ` • ${(resource.size / 1024).toFixed(1)} KB`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}