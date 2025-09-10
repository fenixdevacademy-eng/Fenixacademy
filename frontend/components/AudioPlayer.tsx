'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface AudioSubtitle {
    id: string;
    startTime: number;
    endTime: number;
    text: string;
    language: string;
}

interface AudioPlayerProps {
    src: string;
    subtitles?: AudioSubtitle[];
    title?: string;
    artist?: string;
    className?: string;
    autoPlay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: 'none' | 'metadata' | 'auto';
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onTimeUpdate?: (currentTime: number) => void;
}

export function AudioPlayer({
    src,
    subtitles = [],
    title,
    artist,
    className = '',
    autoPlay = false,
    controls = true,
    loop = false,
    muted = false,
    preload = 'metadata',
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate
}: AudioPlayerProps) {
    const { t, language } = useTranslation();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(muted);
    const [showSubtitles, setShowSubtitles] = useState(true);
    const [currentSubtitle, setCurrentSubtitle] = useState<AudioSubtitle | null>(null);
    const [playbackRate, setPlaybackRate] = useState(1);

    // Filtrar legendas pelo idioma atual
    const availableSubtitles = subtitles.filter(sub => sub.language === language);
    const currentSubtitles = availableSubtitles.length > 0 ? availableSubtitles : subtitles;

    // Atualizar legenda atual baseada no tempo
    useEffect(() => {
        if (!showSubtitles || currentSubtitles.length === 0) {
            setCurrentSubtitle(null);
            return;
        }

        const subtitle = currentSubtitles.find(
            sub => currentTime >= sub.startTime && currentTime <= sub.endTime
        );
        setCurrentSubtitle(subtitle || null);
    }, [currentTime, currentSubtitles, showSubtitles]);

    // Event handlers
    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
            onPlay?.();
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
            onPause?.();
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const time = audioRef.current.currentTime;
            setCurrentTime(time);
            onTimeUpdate?.(time);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
        }
    };

    const handleMuteToggle = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handlePlaybackRateChange = (rate: number) => {
        if (audioRef.current) {
            audioRef.current.playbackRate = rate;
            setPlaybackRate(rate);
        }
    };

    const handleSkip = (seconds: number) => {
        if (audioRef.current) {
            const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
            handleSeek(newTime);
        }
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
            {/* Áudio */}
            <audio
                ref={audioRef}
                src={src}
                autoPlay={autoPlay}
                loop={loop}
                muted={isMuted}
                preload={preload}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                    setIsPlaying(false);
                    onEnded?.();
                }}
            />

            {/* Informações do áudio */}
            {(title || artist) && (
                <div className="mb-4 text-center">
                    {title && (
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                    )}
                    {artist && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {artist}
                        </p>
                    )}
                </div>
            )}

            {/* Legendas */}
            {showSubtitles && currentSubtitle && (
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                    <p className="text-gray-900 dark:text-white">{currentSubtitle.text}</p>
                </div>
            )}

            {/* Controles */}
            {controls && (
                <div className="space-y-4">
                    {/* Barra de progresso */}
                    <div>
                        <div
                            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const clickX = e.clientX - rect.left;
                                const percentage = clickX / rect.width;
                                handleSeek(percentage * duration);
                            }}
                        >
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-200"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controles principais */}
                    <div className="flex items-center justify-center gap-4">
                        {/* Pular para trás */}
                        <button
                            onClick={() => handleSkip(-10)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <SkipBack className="w-6 h-6" />
                        </button>

                        {/* Play/Pause */}
                        <button
                            onClick={isPlaying ? handlePause : handlePlay}
                            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6" />
                            ) : (
                                <Play className="w-6 h-6" />
                            )}
                        </button>

                        {/* Pular para frente */}
                        <button
                            onClick={() => handleSkip(10)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <SkipForward className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Controles secundários */}
                    <div className="flex items-center justify-between">
                        {/* Volume */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleMuteToggle}
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5" />
                                ) : (
                                    <Volume2 className="w-5 h-5" />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                className="w-20 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Legendas */}
                        {currentSubtitles.length > 0 && (
                            <button
                                onClick={() => setShowSubtitles(!showSubtitles)}
                                className={`px-3 py-1 rounded-full text-sm transition-colors ${showSubtitles
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                {t('common.subtitles', 'Legendas')}
                            </button>
                        )}

                        {/* Velocidade de reprodução */}
                        <select
                            value={playbackRate}
                            onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded px-2 py-1"
                        >
                            <option value={0.5}>0.5x</option>
                            <option value={0.75}>0.75x</option>
                            <option value={1}>1x</option>
                            <option value={1.25}>1.25x</option>
                            <option value={1.5}>1.5x</option>
                            <option value={2}>2x</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AudioPlayer;


