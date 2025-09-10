'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Settings, Maximize, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface Subtitle {
    id: string;
    startTime: number;
    endTime: number;
    text: string;
    language: string;
}

interface VideoPlayerProps {
    src: string;
    subtitles?: Subtitle[];
    poster?: string;
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

export function VideoPlayer({
    src,
    subtitles = [],
    poster,
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
}: VideoPlayerProps) {
    const { t, language } = useTranslation();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(muted);
    const [showSubtitles, setShowSubtitles] = useState(true);
    const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
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
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
            onPlay?.();
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
            onPause?.();
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const time = videoRef.current.currentTime;
            setCurrentTime(time);
            onTimeUpdate?.(time);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
        }
    };

    const handleMuteToggle = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handlePlaybackRateChange = (rate: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = rate;
            setPlaybackRate(rate);
        }
    };

    const handleFullscreen = () => {
        if (videoRef.current) {
            if (!document.fullscreenElement) {
                videoRef.current.requestFullscreen();
                setIsFullscreen(true);
            } else {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
            {/* Vídeo */}
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full"
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

            {/* Legendas */}
            {showSubtitles && currentSubtitle && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black bg-opacity-75 text-white text-center rounded-lg max-w-4xl">
                    <p className="text-lg font-medium">{currentSubtitle.text}</p>
                </div>
            )}

            {/* Controles */}
            {controls && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    {/* Barra de progresso */}
                    <div className="mb-4">
                        <div
                            className="w-full h-1 bg-gray-600 rounded-full cursor-pointer"
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
                    </div>

                    {/* Controles principais */}
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                            {/* Play/Pause */}
                            <button
                                onClick={isPlaying ? handlePause : handlePlay}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6" />
                                ) : (
                                    <Play className="w-6 h-6" />
                                )}
                            </button>

                            {/* Volume */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleMuteToggle}
                                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
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
                                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            {/* Tempo */}
                            <span className="text-sm font-mono">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Legendas */}
                            {currentSubtitles.length > 0 && (
                                <button
                                    onClick={() => setShowSubtitles(!showSubtitles)}
                                    className={`p-2 rounded-full transition-colors ${showSubtitles
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-white hover:bg-opacity-20'
                                        }`}
                                >
                                    {/* <ClosedCaption className="w-5 h-5" /> */}
                                </button>
                            )}

                            {/* Velocidade de reprodução */}
                            <select
                                value={playbackRate}
                                onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                                className="bg-gray-800 text-white text-sm rounded px-2 py-1"
                            >
                                <option value={0.5}>0.5x</option>
                                <option value={0.75}>0.75x</option>
                                <option value={1}>1x</option>
                                <option value={1.25}>1.25x</option>
                                <option value={1.5}>1.5x</option>
                                <option value={2}>2x</option>
                            </select>

                            {/* Tela cheia */}
                            <button
                                onClick={handleFullscreen}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                            >
                                <Maximize className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VideoPlayer;


