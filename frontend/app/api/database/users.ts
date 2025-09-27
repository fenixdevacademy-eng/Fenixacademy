// Simular banco de dados em memória para usuários
const users = new Map<string, any>();

export function addUser(userData: any) {
    users.set(userData.email, userData);
}

export function getUserByEmail(email: string) {
    return users.get(email);
}

export function getAllUsers() {
    return Array.from(users.values());
}

export function updateUser(email: string, userData: any) {
    const existingUser = users.get(email);
    if (existingUser) {
        const updatedUser = { ...existingUser, ...userData }
        users.set(email, updatedUser);
        return updatedUser;
    }
    return null;
}

export function deleteUser(email: string) {
    return users.delete(email);
}
