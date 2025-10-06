'use client';

// Fenix Button Actions - Sistema de ações para botões da Fênix Dev Academy

export interface FenixActions {
    openAI: (router: any) => void;
    goToCommunity: (router: any) => void;
    openIDE: (router: any) => void;
    openCourses: (router: any) => void;
    openDashboard: (router: any) => void;
    openProfile: (router: any) => void;
    openSettings: (router: any) => void;
    openHelp: (router: any) => void;
}

export function useFenixActions(): { actions: FenixActions } {
    const actions: FenixActions = {
        openAI: (router) => {
            console.log('🤖 Abrindo IA Tutor...');
            router?.push('/ai');
        },

        goToCommunity: (router) => {
            console.log('👥 Indo para Comunidade...');
            router?.push('/community');
        },

        openIDE: (router) => {
            console.log('💻 Abrindo IDE...');
            router?.push('/ide');
        },

        openCourses: (router) => {
            console.log('📚 Abrindo Cursos...');
            router?.push('/courses');
        },

        openDashboard: (router) => {
            console.log('📊 Abrindo Dashboard...');
            router?.push('/dashboard');
        },

        openProfile: (router) => {
            console.log('👤 Abrindo Perfil...');
            router?.push('/profile');
        },

        openSettings: (router) => {
            console.log('⚙️ Abrindo Configurações...');
            router?.push('/settings');
        },

        openHelp: (router) => {
            console.log('❓ Abrindo Ajuda...');
            router?.push('/help');
        }
    };

    return { actions };
}

// Hook temporário para notificações
export const useNotifications = () => {
    return {
        show: (message: string, type: 'success' | 'error' | 'info' = 'info') => {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    };
};

