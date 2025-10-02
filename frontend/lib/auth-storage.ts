// Sistema de armazenamento local para simular banco de dados
// Em produção, isso seria substituído por um banco de dados real

interface User {
    id: string
    name: string
    email: string
    phone?: string
    birthDate?: string
    password: string
    role: 'student' | 'admin' | 'instructor'
    createdAt: string
    lastLogin?: string
    isActive: boolean
}

class AuthStorage {
    private users: User[] = []
    private currentUser: User | null = null

    constructor() {
        this.loadUsers()
    }

    // Carregar usuários do localStorage
    private loadUsers() {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('fenix-users')
            if (stored) {
                this.users = JSON.parse(stored)
            }
        }
    }

    // Salvar usuários no localStorage
    private saveUsers() {
        if (typeof window !== 'undefined') {
            localStorage.setItem('fenix-users', JSON.stringify(this.users))
        }
    }

    // Criar novo usuário
    createUser(userData: Omit<User, 'id' | 'createdAt' | 'isActive'>): User {
        const newUser: User = {
            ...userData,
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            isActive: true
        }

        this.users.push(newUser)
        this.saveUsers()
        return newUser
    }

    // Buscar usuário por email
    findByEmail(email: string): User | null {
        return this.users.find(user =>
            user.email.toLowerCase() === email.toLowerCase() && user.isActive
        ) || null
    }

    // Buscar usuário por ID
    findById(id: string): User | null {
        return this.users.find(user => user.id === id && user.isActive) || null
    }

    // Verificar se email já existe
    emailExists(email: string): boolean {
        return this.users.some(user =>
            user.email.toLowerCase() === email.toLowerCase()
        )
    }

    // Atualizar último login
    updateLastLogin(userId: string) {
        const user = this.findById(userId)
        if (user) {
            user.lastLogin = new Date().toISOString()
            this.saveUsers()
        }
    }

    // Atualizar dados do usuário
    updateUser(userId: string, updates: Partial<User>): User | null {
        const userIndex = this.users.findIndex(user => user.id === userId)
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updates }
            this.saveUsers()
            return this.users[userIndex]
        }
        return null
    }

    // Desativar usuário
    deactivateUser(userId: string): boolean {
        const user = this.findById(userId)
        if (user) {
            user.isActive = false
            this.saveUsers()
            return true
        }
        return false
    }

    // Listar todos os usuários (para admin)
    getAllUsers(): User[] {
        return this.users.filter(user => user.isActive)
    }

    // Definir usuário atual
    setCurrentUser(user: User | null) {
        this.currentUser = user
        if (typeof window !== 'undefined') {
            if (user) {
                localStorage.setItem('fenix-current-user', JSON.stringify(user))
            } else {
                localStorage.removeItem('fenix-current-user')
            }
        }
    }

    // Obter usuário atual
    getCurrentUser(): User | null {
        if (this.currentUser) {
            return this.currentUser
        }

        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('fenix-current-user')
            if (stored) {
                this.currentUser = JSON.parse(stored)
                return this.currentUser
            }
        }

        return null
    }

    // Limpar dados (para logout)
    clearCurrentUser() {
        this.currentUser = null
        if (typeof window !== 'undefined') {
            localStorage.removeItem('fenix-current-user')
            localStorage.removeItem('fenix-jwt-token')
        }
    }

    // Gerar token JWT simulado
    generateToken(userId: string): string {
        return `fenix-jwt-token-${userId}-${Date.now()}`
    }

    // Verificar token
    verifyToken(token: string): User | null {
        if (!token.startsWith('fenix-jwt-token-')) {
            return null
        }

        const parts = token.split('-')
        if (parts.length < 4) {
            return null
        }

        // Extrair o ID do usuário (tudo entre 'fenix-jwt-token-' e o timestamp final)
        // parts = ['fenix', 'jwt', 'token', 'user_xxx', 'timestamp']
        const userId = parts.slice(3, -1).join('-')
        return this.findById(userId)
    }

    // Hash de senha simples (em produção, use bcrypt)
    hashPassword(password: string): string {
        return Buffer.from(password).toString('base64')
    }

    // Verificar senha
    verifyPassword(password: string, hashedPassword: string): boolean {
        const hashedInput = this.hashPassword(password)
        return hashedInput === hashedPassword
    }
}

// Instância singleton
export const authStorage = new AuthStorage()
export type { User }

// Funções de conveniência para compatibilidade
export function createUser(userData: Omit<User, 'id' | 'createdAt' | 'isActive'>): User {
    return authStorage.createUser(userData)
}

export function hashPassword(password: string): string {
    return authStorage.hashPassword(password)
}

export function generateToken(userId: string): string {
    return authStorage.generateToken(userId)
}

export function emailExists(email: string): boolean {
    return authStorage.emailExists(email)
}
