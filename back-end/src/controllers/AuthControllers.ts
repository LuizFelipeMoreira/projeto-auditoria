import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface User {
    email: string;
    password: string;
}

export class AuthService {
    private JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

    async register(email: string, password: string): Promise<string> {}

    async login(email: string, password: string): Promise<User> {}
}
