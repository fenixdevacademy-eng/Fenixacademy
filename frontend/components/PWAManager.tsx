'use client';

/**
 * Gerenciador de PWA
 * Instalação, atualizações e notificações push
 */

import React, { useState, useEffect } from 'react';
import { usePushNotifications } from '@/lib/push-notifications';
import { useToastNotifications } from './Toast';
import { Download, Bell, BellOff, RefreshCw, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAManager() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [showInstallBanner, setShowInstallBanner] = useState(false);
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const { isSupported: pushSupported, isSetup: pushSetup, setup: setupPush } = usePushNotifications();
    const { showSuccess, showInfo, showError } = useToastNotifications();

    useEffect(() => {
        // Verificar se já está instalado
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
        }

        // Escutar evento de instalação
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowInstallBanner(true);
        });

        // Escutar evento de instalação concluída
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
            setShowInstallBanner(false);
            showSuccess('App instalado!', 'Fenix Academy foi instalado com sucesso');
        });

        // Verificar atualizações do Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                setIsUpdateAvailable(true);
            });
        }

        // Configurar notificações push automaticamente
        if (pushSupported && !pushSetup) {
            setupPush().then((success) => {
                if (success) {
                    showInfo('Notificações ativadas', 'Você receberá notificações sobre novos conteúdos');
                }
            });
        }
    }, [pushSupported, pushSetup, setupPush, showSuccess, showInfo]);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                showSuccess('Instalando...', 'O app será instalado em breve');
            }

            setDeferredPrompt(null);
            setShowInstallBanner(false);
        } catch (error) {
            showError('Erro na instalação', 'Não foi possível instalar o app');
        }
    }

    const handleUpdate = async () => {
        setIsUpdating(true);

        try {
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    await registration.update();
                    showSuccess('Atualizando...', 'A nova versão será carregada');
                    window.location.reload();
                }
            }
        } catch (error) {
            showError('Erro na atualização', 'Não foi possível atualizar o app');
        } finally {
            setIsUpdating(false);
        }
    }

    const handleDismissInstall = () => {
        setShowInstallBanner(false);
    }

    const handleDismissUpdate = () => {
        setIsUpdateAvailable(false);
    }

    if (isInstalled && !isUpdateAvailable) {
        return null;
    }

    return (
        <>
            {/* Banner de instalação */}
            {showInstallBanner && !isInstalled && (
                <div className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <Download className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Instalar Fenix Academy</h3>
                                <p className="text-sm opacity-90">Acesse rapidamente pelo seu dispositivo</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleInstall}
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Instalar
                            </button>
                            <button
                                onClick={handleDismissInstall}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Banner de atualização */}
            {isUpdateAvailable && (
                <div className="fixed top-4 left-4 right-4 z-50 bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <RefreshCw className={`w-6 h-6 ${isUpdating ? 'animate-spin' : ''}`} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Atualização disponível</h3>
                                <p className="text-sm opacity-90">Nova versão com melhorias e correções</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                {isUpdating ? 'Atualizando...' : 'Atualizar'}
                            </button>
                            <button
                                onClick={handleDismissUpdate}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Botão de notificações */}
            {pushSupported && (
                <div className="fixed bottom-4 right-4 z-40">
                    <button
                        onClick={() => setupPush()}
                        className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
                        title={pushSetup ? 'Notificações ativadas' : 'Ativar notificações'}
                    >
                        {pushSetup ? (
                            <Bell className="w-6 h-6" />
                        ) : (
                            <BellOff className="w-6 h-6" />
                        )}
                    </button>
                </div>
            )}
        </>
    );
}

