// Hook de tradução para internacionalização
export interface Translation {
  [key: string]: string;
}

export const translations: { [locale: string]: Translation } = {
  'pt-BR': {
    'welcome': 'Bem-vindo',
    'courses': 'Cursos',
    'login': 'Entrar',
    'register': 'Cadastrar',
    'dashboard': 'Painel',
    'profile': 'Perfil',
    'settings': 'Configurações',
    'logout': 'Sair'
  },
  'en-US': {
    'welcome': 'Welcome',
    'courses': 'Courses',
    'login': 'Login',
    'register': 'Register',
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'settings': 'Settings',
    'logout': 'Logout'
  }
};

export const useTranslation = (locale: string = 'pt-BR') => {
  const t = (key: string): string => {
    return translations[locale]?.[key] || key;
  };

  return { t, locale };
};
