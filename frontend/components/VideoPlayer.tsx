'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Subtitles } from 'lucide-react';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    subtitles?: Array<{
        start: number;
        end: number;
        text: string;
    }>;
    className?: string;
    autoPlay?: boolean;
    controls?: boolean;
}

export function VideoPlayer({
    src,
    poster,
    subtitles = [],
    className = '',
    autoPlay = false,
    controls = true
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSubtitles, setShowSubtitles] = useState(true);
    const [currentSubtitles, setCurrentSubtitles] = useState<string>('');

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);
        const updateVolume = () => setVolume(video.volume);

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('volumechange', updateVolume);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
            video.removeEventListener('volumechange', updateVolume);
        };
    }, []);

    useEffect(() => {
        if (!showSubtitles || subtitles.length === 0) {
            setCurrentSubtitles('');
            return;
        }

        const currentSubtitle = subtitles.find(
            sub => currentTime >= sub.start && currentTime <= sub.end
        );
        setCurrentSubtitles(currentSubtitle?.text || '');
    }, [currentTime, currentSubtitles, showSubtitles]);

    const handlePlay = () => {
        const video = videoRef.current;
        if (video) {
            video.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        const video = videoRef.current;
        if (video) {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleSeek = (time: number) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = time;
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        const video = videoRef.current;
        if (video) {
            video.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
        }
    };

    const handleMute = () => {
        const video = videoRef.current;
        if (video) {
            if (isMuted) {
                video.volume = volume;
                setIsMuted(false);
            } else {
                video.volume = 0;
                setIsMuted(true);
            }
        }
    };

    const handleFullscreen = () => {
        const video = videoRef.current;
        if (video) {
            if (!isFullscreen) {
                video.requestFullscreen();
                setIsFullscreen(true);
            } else {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full"
                autoPlay={autoPlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
            />

            {currentSubtitles && showSubtitles && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black bg-opacity-75 text-white text-center rounded-lg max-w-4xl">
                    {currentSubtitles}
                </div>
            )}

            {controls && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div
                            className="w-full h-1 bg-gray-600 rounded-full cursor-pointer"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const clickX = e.clientX - rect.left;
                                const newTime = (clickX / rect.width) * duration;
                                handleSeek(newTime);
                            }}
                        >
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={isPlaying ? handlePause : handlePlay}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                            >
                                {isPlaying ? (
                                    <Pause className="w-5 h-5" />
                                ) : (
                                    <Play className="w-5 h-5" />
                                )}
                            </button>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleMute}
                                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                                >
                                    {isMuted ? (
                                        <VolumeX className="w-4 h-4" />
                                    ) : (
                                        <Volume2 className="w-4 h-4" />
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={isMuted ? 0 : volume}
                                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                    className="w-20"
                                />
                            </div>

                            <span className="text-sm">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowSubtitles(!showSubtitles)}
                                className={`p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors ${showSubtitles ? 'bg-white bg-opacity-20' : ''
                                    }`}
                            >
                                <Subtitles className="w-4 h-4" />
                            </button>

                            <button
                                onClick={handleFullscreen}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                            >
                                {isFullscreen ? (
                                    <Minimize className="w-4 h-4" />
                                ) : (
                                    <Maximize className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}