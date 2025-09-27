import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/database';

export interface JWTPayload {
    userId: number;
    email: string;
    role: string;
}

export function generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn});
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        console.log('🔐 Verificando token JWT:', { tokenLength: token.length });
        const decoded = jwt.verify(token, jwtConfig.secret) as JWTPayload;
        console.log('✅ Token JWT válido:', { userId: decoded.userId, email: decoded.email });
        return decoded;
    } catch (error) {
        console.error('❌ JWT verification failed:', error);
        return null;
    }
}

export function generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, jwtConfig.secret, {
        expiresIn: '30d', // Refresh token válido por 30 dias
    });
}
