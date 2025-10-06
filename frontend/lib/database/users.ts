'use client';

// Banco de dados compartilhado para usuários
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'student' | 'instructor';
    access_level: 'basic' | 'premium';
    phone?: string;
    city?: string;
    state?: string;
    country?: string;
    bio?: string;
    skills?: string[];
    interests?: string[];
    created_at: string;
    last_login?: string | null;
    is_active: boolean;
    avatar?: string | null;
    // Dados de progresso
    level?: number;
    title?: string;
    progress?: number;
    coursesCompleted?: number;
    hoursStudied?: number;
    streak?: number;
    points?: number;
    rank?: number;
}

// Banco de dados em memória (em produção, usar banco real)
let USERS_DATABASE: User[] = [
    {
        id: '1',
        name: 'Admin Fênix',
        email: 'admin@fenix.com',
        password: 'admin123',
        role: 'admin',
        access_level: 'premium',
        phone: '+55 11 99999-9999',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        bio: 'Administrador da Fênix Dev Academy',
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        interests: ['Desenvolvimento Web', 'Data Science', 'Machine Learning'],
        created_at: '2024-01-01T00:00:00.000Z',
        last_login: null,
        is_active: true,
        avatar: null,
        level: 10,
        title: 'Administrador',
        progress: 100,
        coursesCompleted: 25,
        hoursStudied: 500,
        streak: 30,
        points: 5000,
        rank: 1
    }
];

// Funções para gerenciar usuários
export const userDatabase = {
    // Buscar usuário por ID
    findById: (id: string): User | undefined => {
        return USERS_DATABASE.find(user => user.id === id && user.is_active);
    },

    // Buscar usuário por email
    findByEmail: (email: string): User | undefined => {
        return USERS_DATABASE.find(user => user.email === email && user.is_active);
    },

    // Adicionar novo usuário
    create: (userData: Omit<User, 'id' | 'created_at' | 'last_login' | 'is_active'>): User => {
        const newUser: User = {
            ...userData,
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            created_at: new Date().toISOString(),
            last_login: null,
            is_active: true,
            // Dados padrão para novos usuários
            level: 1,
            title: 'Estudante',
            progress: 0,
            coursesCompleted: 0,
            hoursStudied: 0,
            streak: 0,
            points: 0,
            rank: 999
        };

        USERS_DATABASE.push(newUser);
        return newUser;
    },

    // Atualizar usuário
    update: (id: string, updates: Partial<User>): User | null => {
        const userIndex = USERS_DATABASE.findIndex(user => user.id === id);
        if (userIndex === -1) return null;

        USERS_DATABASE[userIndex] = { ...USERS_DATABASE[userIndex], ...updates };
        return USERS_DATABASE[userIndex];
    },

    // Atualizar progresso do usuário
    updateProgress: (id: string, progressData: {
        level?: number;
        title?: string;
        progress?: number;
        coursesCompleted?: number;
        hoursStudied?: number;
        streak?: number;
        points?: number;
        rank?: number;
    }): User | null => {
        const user = userDatabase.findById(id);
        if (!user) return null;

        return userDatabase.update(id, progressData);
    },

    // Buscar todos os usuários (para ranking)
    getAll: (): User[] => {
        return USERS_DATABASE.filter(user => user.is_active);
    },

    // Buscar ranking de usuários
    getRanking: (): User[] => {
        return USERS_DATABASE
            .filter(user => user.is_active && user.role === 'student')
            .sort((a, b) => (b.points || 0) - (a.points || 0))
            .map((user, index) => ({ ...user, rank: index + 1 }));
    }
};

export default USERS_DATABASE;
