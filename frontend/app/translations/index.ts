// Translation system for internationalization
export interface Translation {
  [key: string]: string | Translation;
}

export interface Locale {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

export const supportedLocales: Locale[] = [
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷', rtl: false },
  { code: 'en-US', name: 'English (US)', nativeName: 'English (United States)', flag: '🇺🇸', rtl: false },
  { code: 'es-ES', name: 'Spanish (Spain)', nativeName: 'Español (España)', flag: '🇪🇸', rtl: false },
  { code: 'fr-FR', name: 'French (France)', nativeName: 'Français (France)', flag: '🇫🇷', rtl: false }
];

export const translations: Record<string, Translation> = {
  'pt-BR': {
    common: {
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      cancel: 'Cancelar',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      create: 'Criar',
      update: 'Atualizar',
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      next: 'Próximo',
      previous: 'Anterior',
      close: 'Fechar',
      open: 'Abrir',
      yes: 'Sim',
      no: 'Não',
      ok: 'OK',
      back: 'Voltar',
      continue: 'Continuar',
      finish: 'Finalizar',
      start: 'Iniciar',
      stop: 'Parar',
      pause: 'Pausar',
      resume: 'Retomar'
    },
    navigation: {
      home: 'Início',
      courses: 'Cursos',
      profile: 'Perfil',
      settings: 'Configurações',
      help: 'Ajuda',
      about: 'Sobre',
      contact: 'Contato',
      login: 'Entrar',
      register: 'Cadastrar',
      logout: 'Sair',
      dashboard: 'Painel',
      admin: 'Administração'
    },
    course: {
      title: 'Cursos',
      description: 'Explore nossa coleção de cursos',
      startCourse: 'Iniciar Curso',
      continueCourse: 'Continuar Curso',
      completed: 'Concluído',
      inProgress: 'Em Progresso',
      notStarted: 'Não Iniciado',
      duration: 'Duração',
      difficulty: 'Dificuldade',
      rating: 'Avaliação',
      students: 'Estudantes',
      instructor: 'Instrutor',
      modules: 'Módulos',
      lessons: 'Aulas',
      price: 'Preço',
      free: 'Gratuito',
      certificate: 'Certificado',
      prerequisites: 'Pré-requisitos',
      objectives: 'Objetivos',
      curriculum: 'Currículo',
      reviews: 'Avaliações',
      faq: 'Perguntas Frequentes'
    },
    auth: {
      login: 'Entrar',
      register: 'Cadastrar',
      logout: 'Sair',
      email: 'E-mail',
      password: 'Senha',
      confirmPassword: 'Confirmar Senha',
      name: 'Nome',
      rememberMe: 'Lembrar de mim',
      forgotPassword: 'Esqueci minha senha',
      resetPassword: 'Redefinir Senha',
      createAccount: 'Criar Conta',
      alreadyHaveAccount: 'Já tem uma conta?',
      dontHaveAccount: 'Não tem uma conta?',
      welcomeBack: 'Bem-vindo de volta!',
      createYourAccount: 'Crie sua conta',
      loginSuccess: 'Login realizado com sucesso!',
      registerSuccess: 'Conta criada com sucesso!',
      logoutSuccess: 'Logout realizado com sucesso!',
      invalidCredentials: 'Credenciais inválidas',
      emailRequired: 'E-mail é obrigatório',
      passwordRequired: 'Senha é obrigatória',
      passwordMismatch: 'Senhas não coincidem',
      nameRequired: 'Nome é obrigatório'
    },
    errors: {
      generic: 'Ocorreu um erro inesperado',
      network: 'Erro de conexão',
      unauthorized: 'Não autorizado',
      forbidden: 'Acesso negado',
      notFound: 'Não encontrado',
      serverError: 'Erro interno do servidor',
      validation: 'Erro de validação',
      timeout: 'Tempo limite excedido',
      offline: 'Você está offline',
      tryAgain: 'Tente novamente',
      contactSupport: 'Entre em contato com o suporte'
    }
  },
  'en-US': {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      update: 'Update',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      open: 'Open',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      back: 'Back',
      continue: 'Continue',
      finish: 'Finish',
      start: 'Start',
      stop: 'Stop',
      pause: 'Pause',
      resume: 'Resume'
    },
    navigation: {
      home: 'Home',
      courses: 'Courses',
      profile: 'Profile',
      settings: 'Settings',
      help: 'Help',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      dashboard: 'Dashboard',
      admin: 'Administration'
    },
    course: {
      title: 'Courses',
      description: 'Explore our course collection',
      startCourse: 'Start Course',
      continueCourse: 'Continue Course',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      duration: 'Duration',
      difficulty: 'Difficulty',
      rating: 'Rating',
      students: 'Students',
      instructor: 'Instructor',
      modules: 'Modules',
      lessons: 'Lessons',
      price: 'Price',
      free: 'Free',
      certificate: 'Certificate',
      prerequisites: 'Prerequisites',
      objectives: 'Objectives',
      curriculum: 'Curriculum',
      reviews: 'Reviews',
      faq: 'FAQ'
    },
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Name',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password',
      resetPassword: 'Reset Password',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      welcomeBack: 'Welcome back!',
      createYourAccount: 'Create your account',
      loginSuccess: 'Login successful!',
      registerSuccess: 'Account created successfully!',
      logoutSuccess: 'Logout successful!',
      invalidCredentials: 'Invalid credentials',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordMismatch: 'Passwords do not match',
      nameRequired: 'Name is required'
    },
    errors: {
      generic: 'An unexpected error occurred',
      network: 'Connection error',
      unauthorized: 'Unauthorized',
      forbidden: 'Access denied',
      notFound: 'Not found',
      serverError: 'Internal server error',
      validation: 'Validation error',
      timeout: 'Request timeout',
      offline: 'You are offline',
      tryAgain: 'Try again',
      contactSupport: 'Contact support'
    }
  }
};

export function getTranslation(locale: string, key: string): string {
  const keys = key.split('.');
  let translation: any = translations[locale] || translations['pt-BR'];
  
  for (const k of keys) {
    if (translation && typeof translation === 'object' && k in translation) {
      translation = translation[k];
    } else {
      return key;
    }
  }
  
  return typeof translation === 'string' ? translation : key;
}

export function getCurrentLocale(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('locale') || 'pt-BR';
  }
  return 'pt-BR';
}

export function setCurrentLocale(locale: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
  }
}

export function getLocaleFromBrowser(): string {
  if (typeof window !== 'undefined') {
    const browserLocale = navigator.language || navigator.languages[0];
    const supportedCodes = supportedLocales.map(l => l.code);
    
    if (supportedCodes.includes(browserLocale)) {
      return browserLocale;
    }
    
    const languageCode = browserLocale.split('-')[0];
    const match = supportedCodes.find(code => code.startsWith(languageCode));
    if (match) {
      return match;
    }
  }
  
  return 'pt-BR';
}

export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale).format(date);
}

export function formatNumber(number: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(number);
}

export function formatCurrency(amount: number, locale: string, currency: string = 'BRL'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}





