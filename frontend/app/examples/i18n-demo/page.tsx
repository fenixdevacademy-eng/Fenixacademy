'use client';

import React, { useState } from 'react';
import { I18nProvider } from '@/contexts/I18nContext';
import LanguageSelector from '@/components/LanguageSelector';
import TranslatedText, { TranslatedHeading, TranslatedButton, TranslatedLabel } from '@/components/TranslatedText';
import VideoPlayer from '@/components/VideoPlayer';
import AudioPlayer from '@/components/AudioPlayer';
import TranslatedContent from '@/components/TranslatedContent';

// Dados de exemplo para demonstração
const sampleSubtitles = [
    {
        id: '1',
        startTime: 0,
        endTime: 5,
        text: 'Bem-vindo à Fenix Academy!',
        language: 'pt'
    },
    {
        id: '2',
        startTime: 5,
        endTime: 10,
        text: 'Welcome to Fenix Academy!',
        language: 'en'
    },
    {
        id: '3',
        startTime: 10,
        endTime: 15,
        text: '¡Bienvenido a Fenix Academy!',
        language: 'es'
    }
];

const sampleContent = `
# Fenix Academy - Sistema de Legendas Multilíngues

## 🎯 Funcionalidades Implementadas

### 1. **Sistema de Internacionalização Completo**
- Suporte a 11 idiomas
- Tradução automática de conteúdo
- Formatação de datas, números e moedas
- Suporte a RTL (direita para esquerda)

### 2. **Componentes de Legendas**
- VideoPlayer com legendas sincronizadas
- AudioPlayer com transcrições
- TranslatedContent para texto
- Seletor de idioma interativo

### 3. **APIs de Tradução**
- Endpoint para tradução de texto
- Detecção automática de idioma
- Cache de traduções
- Fallback para idiomas não suportados

## 🚀 Como Usar

1. **Selecione um idioma** usando o seletor acima
2. **Teste os componentes** abaixo
3. **Experimente as legendas** nos players de vídeo e áudio
4. **Veja a tradução** do conteúdo em tempo real
`;

function I18nDemoContent() {
    const [selectedVideo, setSelectedVideo] = useState<string>('');
    const [selectedAudio, setSelectedAudio] = useState<string>('');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <TranslatedHeading
                        translationKey="common.title"
                        level={1}
                        className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                        fallback="Sistema de Legendas Multilíngues"
                    />
                    <TranslatedParagraph
                        translationKey="common.description"
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                        fallback="Demonstração completa do sistema de internacionalização da Fenix Academy"
                    />
                </div>

                {/* Seletor de Idioma */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <TranslatedHeading
                        translationKey="settings.language"
                        level={2}
                        className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                        fallback="Seleção de Idioma"
                    />
                    <LanguageSelector variant="dropdown" showLabel={true} />
                </div>

                {/* Demonstração de Componentes de Texto */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <TranslatedHeading
                            translationKey="common.textComponents"
                            level={3}
                            className="text-xl font-semibold text-gray-900 dark:text-white mb-4"
                            fallback="Componentes de Texto"
                        />

                        <div className="space-y-4">
                            <TranslatedButton
                                translationKey="common.save"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                fallback="Salvar"
                            />

                            <TranslatedLabel
                                translationKey="profile.name"
                                fallback="Nome"
                            />

                            <TranslatedText
                                translationKey="course.description"
                                className="text-gray-700 dark:text-gray-300"
                                fallback="Descrição do curso"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <TranslatedHeading
                            translationKey="common.formatting"
                            level={3}
                            className="text-xl font-semibold text-gray-900 dark:text-white mb-4"
                            fallback="Formatação"
                        />

                        <div className="space-y-2 text-sm">
                            <p><strong>Data:</strong> {new Date().toLocaleDateString()}</p>
                            <p><strong>Moeda:</strong> R$ 1.234,56</p>
                            <p><strong>Número:</strong> 1.234.567</p>
                        </div>
                    </div>
                </div>

                {/* Player de Vídeo com Legendas */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <TranslatedHeading
                        translationKey="common.videoPlayer"
                        level={2}
                        className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                        fallback="Player de Vídeo com Legendas"
                    />

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setSelectedVideo('/videos/sample1.mp4')}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Vídeo 1
                            </button>
                            <button
                                onClick={() => setSelectedVideo('/videos/sample2.mp4')}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Vídeo 2
                            </button>
                        </div>

                        {selectedVideo && (
                            <VideoPlayer
                                src={selectedVideo}
                                subtitles={sampleSubtitles}
                                poster="/images/video-poster.jpg"
                                className="w-full h-64"
                            />
                        )}
                    </div>
                </div>

                {/* Player de Áudio com Transcrições */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <TranslatedHeading
                        translationKey="common.audioPlayer"
                        level={2}
                        className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                        fallback="Player de Áudio com Transcrições"
                    />

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setSelectedAudio('/audio/sample1.mp3')}
                                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                            >
                                Áudio 1
                            </button>
                            <button
                                onClick={() => setSelectedAudio('/audio/sample2.mp3')}
                                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                            >
                                Áudio 2
                            </button>
                        </div>

                        {selectedAudio && (
                            <AudioPlayer
                                src={selectedAudio}
                                subtitles={sampleSubtitles}
                                title="Aula de Programação"
                                artist="Fenix Academy"
                                className="w-full"
                            />
                        )}
                    </div>
                </div>

                {/* Conteúdo Traduzido */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <TranslatedHeading
                        translationKey="common.translatedContent"
                        level={2}
                        className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                        fallback="Conteúdo Traduzido"
                    />

                    <TranslatedContent
                        content={sampleContent}
                        sourceLanguage="pt"
                        autoTranslate={true}
                        showOriginal={true}
                        showTranslation={true}
                        className="w-full"
                    />
                </div>

                {/* Estatísticas */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <TranslatedHeading
                        translationKey="common.statistics"
                        level={2}
                        className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                        fallback="Estatísticas do Sistema"
                    />

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">11</div>
                            <div className="text-gray-600 dark:text-gray-400">Idiomas Suportados</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">100%</div>
                            <div className="text-gray-600 dark:text-gray-400">Cobertura de Tradução</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">0ms</div>
                            <div className="text-gray-600 dark:text-gray-400">Latência de Tradução</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function I18nDemoPage() {
    return (
        <I18nProvider>
            <I18nDemoContent />
        </I18nProvider>
    );
}


