'use client';

import { useState } from 'react';
import {
    MessageCircle,
    X,
    Send,
    ThumbsUp,
    Play,
    Pause,
    Volume2,
    VolumeX
} from 'lucide-react';

// Chat de Suporte
export function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Olá! Como posso ajudar você hoje?", isBot: true, time: "14:30" }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const userMessage = {
                id: messages.length + 1,
                text: newMessage,
                isBot: false,
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            };

            setMessages([...messages, userMessage]);
            setNewMessage('');

            // Simular resposta do bot
            setTimeout(() => {
                const botMessage = {
                    id: messages.length + 2,
                    text: "Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.",
                    isBot: true,
                    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, botMessage]);
            }, 1000);
        }
    };

    return (
        <>
            {/* Botão do Chat */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-40"
            >
                <MessageCircle className="w-6 h-6 mx-auto" />
            </button>

            {/* Modal do Chat */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-end z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl w-96 max-h-[500px] flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">Suporte Fenix Academy</h3>
                                    <p className="text-sm opacity-90">Online agora</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Mensagens */}
                        <div className="flex-1 p-4 overflow-y-auto max-h-80">
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div
                                            className={`max-w-xs p-3 rounded-lg ${message.isBot
                                                ? 'bg-gray-100 text-gray-800'
                                                : 'bg-blue-600 text-white'
                                                }`}
                                        >
                                            <p className="text-sm">{message.text}</p>
                                            <p className="text-xs opacity-70 mt-1">{message.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Digite sua mensagem..."
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// Player de Vídeo Interativo
export function VideoPlayer({ title }: { title: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress] = useState(0);
    const [duration] = useState(0);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleMute = () => setIsMuted(!isMuted);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative bg-black rounded-lg overflow-hidden">
            {/* Thumbnail/Preview */}
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">{title}</h3>
                    <p className="text-gray-300 text-sm">Clique para reproduzir</p>
                </div>
            </div>

            {/* Controles */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={togglePlay}
                        className="text-white hover:text-blue-400 transition-colors"
                    >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>

                    <div className="flex-1">
                        <div className="w-full bg-gray-600 rounded-full h-1">
                            <div
                                className="bg-blue-600 h-1 rounded-full transition-all duration-200"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 text-white text-sm">
                        <span>{formatTime(progress)}</span>
                        <span>/</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    <button
                        onClick={toggleMute}
                        className="text-white hover:text-blue-400 transition-colors"
                    >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Sistema de Avaliações
export function RatingSystem({ courseId }: { courseId: number }) {
    const [rating, setRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [comment, setComment] = useState('');

    const handleRating = (value: number) => {
        setRating(value);
    };

    const handleSubmitRating = () => {
        if (rating > 0) {
            setHasRated(true);
            // Aqui você enviaria a avaliação para o backend
            console.log('Avaliação enviada:', { courseId, rating, comment });
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Avalie este curso</h3>

            {!hasRated ? (
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRating(star)}
                                className={`text-2xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-400'
                                    } hover:text-yellow-400`}
                            >
                                ★
                            </button>
                        ))}
                        <span className="text-white ml-2">{rating}/5</span>
                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Compartilhe sua experiência (opcional)"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                    />

                    <button
                        onClick={handleSubmitRating}
                        disabled={rating === 0}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Enviar Avaliação
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ThumbsUp className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Obrigado pela avaliação!</h4>
                    <p className="text-gray-300">Sua opinião é muito importante para nós.</p>
                </div>
            )}
        </div>
    );
}

// Progress Tracker
export function ProgressTracker({ progress, total }: { progress: number; total: number }) {
    const percentage = Math.round((progress / total) * 100);

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold">Seu Progresso</h3>
                <span className="text-white text-sm">{percentage}%</span>
            </div>

            <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <p className="text-gray-300 text-sm">
                {progress} de {total} aulas concluídas
            </p>
        </div>
    );
}

// Notification System
export function NotificationSystem() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Novo curso disponível!",
            message: "JavaScript Avançado foi adicionado à plataforma",
            type: "info",
            time: "2 min atrás"
        },
        {
            id: 2,
            title: "Lembrete de aula",
            message: "Sua próxima aula começa em 30 minutos",
            type: "warning",
            time: "5 min atrás"
        }
    ]);

    const removeNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="fixed top-20 right-4 z-50 space-y-2">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 max-w-sm animate-slide-in"
                >
                    <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'info' ? 'bg-blue-400' : 'bg-yellow-400'
                            }`}></div>
                        <div className="flex-1">
                            <h4 className="text-white font-semibold">{notification.title}</h4>
                            <p className="text-gray-300 text-sm">{notification.message}</p>
                            <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                        </div>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
} 