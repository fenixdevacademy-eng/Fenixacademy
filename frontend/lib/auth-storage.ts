// Auth storage utilities
export const authStorage = {
    getToken: () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('auth_token');
    },

    setToken: (token: string) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('auth_token', token);
    },

    removeToken: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('auth_token');
    },

    getUser: () => {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    setUser: (user: any) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('user', JSON.stringify(user));
    },

    clear: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }
};