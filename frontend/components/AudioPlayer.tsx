'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, RotateCcw, Settings, Download, Share2 } from 'lucide-react';

interface AudioSubtitle {
    id: string;
    startTime: number;
    endTime: number;
    text: string;
    language: string;
}

interface AudioPlayerProps {
    src: string;
    title?: string;
    artist?: string;
    coverImage?: string;
    subtitles?: AudioSubtitle[];
    onTimeUpdate?: (currentTime: number) => void;
    onEnded?: () => void;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
    src,
    title = 'Audio Track',
    artist = 'Unknown Artist',
    coverImage,
    subtitles = [],
    onTimeUpdate,
    onEnded,
    className = '',
    autoPlay = false,
    loop = false,
    muted = false
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(muted);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [currentSubtitle, setCurrentSubtitle] = useState<AudioSubtitle | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            onTimeUpdate?.(audio.currentTime);

            // Update current subtitle
            const activeSubtitle = subtitles.find(
                sub => audio.currentTime >= sub.startTime && audio.currentTime <= sub.endTime
            );
            setCurrentSubtitle(activeSubtitle || null);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            onEnded?.();
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [src, onTimeUpdate, onEnded, subtitles]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = isMuted ? 0 : volume;
    }, [volume, isMuted]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.playbackRate = playbackRate;
    }, [playbackRate]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const skipBackward = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    };

    const skipForward = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.min(duration, audio.currentTime + 10);
    };

    const restart = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = 0;
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = src;
        link.download = `${title}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Ouça: ${title} por ${artist}`,
                    url: window.location.href
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className={`audio-player bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>
            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                autoPlay={autoPlay}
                loop={loop}
            />

            {/* Cover and Info */}
            <div className="flex items-center gap-4 p-4">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-16 h-16 rounded-lg object-cover"
                    />
                ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
                    <p className="text-sm text-gray-600 truncate">{artist}</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDownload}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Download"
                    >
                        <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Share"
                    >
                        <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Settings"
                    >
                        <Settings className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="px-4 pb-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{formatTime(currentTime)}</span>
                    <div className="flex-1 relative">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                    </div>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 p-4">
                <button
                    onClick={restart}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Restart"
                >
                    <RotateCcw className="w-5 h-5 text-gray-600" />
                </button>

                <button
                    onClick={skipBackward}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Skip Backward 10s"
                >
                    <SkipBack className="w-5 h-5 text-gray-600" />
                </button>

                <button
                    onClick={togglePlayPause}
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                    {isPlaying ? (
                        <Pause className="w-6 h-6" />
                    ) : (
                        <Play className="w-6 h-6" />
                    )}
                </button>

                <button
                    onClick={skipForward}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Skip Forward 10s"
                >
                    <SkipForward className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleMute}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted ? (
                            <VolumeX className="w-5 h-5 text-gray-600" />
                        ) : (
                            <Volume2 className="w-5 h-5 text-gray-600" />
                        )}
                    </button>

                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-3">Settings</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Playback Speed
                            </label>
                            <select
                                value={playbackRate}
                                onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                </div>
            )}

            {/* Subtitles */}
            {currentSubtitle && (
                <div className="px-4 pb-4">
                    <div className="bg-gray-100 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-800">{currentSubtitle.text}</p>
                    </div>
                </div>
            )}

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                }
                
                .slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: none;
                }
            `}</style>
        </div>
    );
};

export default AudioPlayer;