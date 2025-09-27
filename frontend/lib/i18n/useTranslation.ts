'use client';

import { useState, useEffect } from 'react';
import { getBrowserLanguage } from './index';

export interface Translation {
  [key: string]: string;
}

export const translations: { [locale: string]: Translation } = {
  'pt-BR': {
    'welcome': 'Bem-vindo',
    'hello': 'Olá',
    'goodbye': 'Tchau',
    'loading': 'Carregando...',
    'error': 'Erro',
    'success': 'Sucesso',
    'save': 'Salvar',
    'cancel': 'Cancelar',
    'confirm': 'Confirmar',
    'delete': 'Excluir',
    'edit': 'Editar',
    'create': 'Criar',
    'search': 'Pesquisar',
    'filter': 'Filtrar',
    'sort': 'Ordenar',
    'next': 'Próximo',
    'previous': 'Anterior',
    'home': 'Início',
    'about': 'Sobre',
    'contact': 'Contato',
    'login': 'Entrar',
    'register': 'Cadastrar',
    'logout': 'Sair',
    'profile': 'Perfil',
    'settings': 'Configurações',
    'help': 'Ajuda',
    'support': 'Suporte'
  },
  'en-US': {
    'welcome': 'Welcome',
    'hello': 'Hello',
    'goodbye': 'Goodbye',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'save': 'Save',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'delete': 'Delete',
    'edit': 'Edit',
    'create': 'Create',
    'search': 'Search',
    'filter': 'Filter',
    'sort': 'Sort',
    'next': 'Next',
    'previous': 'Previous',
    'home': 'Home',
    'about': 'About',
    'contact': 'Contact',
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    'profile': 'Profile',
    'settings': 'Settings',
    'help': 'Help',
    'support': 'Support'
  },
  'es-ES': {
    'welcome': 'Bienvenido',
    'hello': 'Hola',
    'goodbye': 'Adiós',
    'loading': 'Cargando...',
    'error': 'Error',
    'success': 'Éxito',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'confirm': 'Confirmar',
    'delete': 'Eliminar',
    'edit': 'Editar',
    'create': 'Crear',
    'search': 'Buscar',
    'filter': 'Filtrar',
    'sort': 'Ordenar',
    'next': 'Siguiente',
    'previous': 'Anterior',
    'home': 'Inicio',
    'about': 'Acerca de',
    'contact': 'Contacto',
    'login': 'Iniciar sesión',
    'register': 'Registrarse',
    'logout': 'Cerrar sesión',
    'profile': 'Perfil',
    'settings': 'Configuración',
    'help': 'Ayuda',
    'support': 'Soporte'
  }
};

export const useTranslation = (locale?: string) => {
  const [currentLocale, setCurrentLocale] = useState<string>(
    locale || getBrowserLanguage()
  );

  useEffect(() => {
    if (locale) {
      setCurrentLocale(locale);
    }
  }, [locale]);

  const t = (key: string): string => {
    const translation = translations[currentLocale]?.[key];
    return translation || key;
  };

  return { t, locale: currentLocale };
};