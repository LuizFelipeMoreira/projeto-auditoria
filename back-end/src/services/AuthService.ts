import { Prisma } from '../generated/prisma';
import AuthRepository from '../repositories/auth-repositorie/PrismaAuthRepository';
import { decodedPassword, hashPassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export class AuthService {
    constructor(private readonly authRepository = AuthRepository) {}

    async register(data: Prisma.UserCreateInput) {
        const existingUser = await this.authRepository.findByEmail(data.email);
        if (existingUser) return null;

        const hash = await hashPassword(data.password);
        const newUser = await this.authRepository.create({ ...data, password: hash });

        return { id: newUser.id, name: newUser.name, email: newUser.email };
    }

    async login(email: string, password: string) {
        const existingUser = await this.authRepository.findByEmail(email);
        if (!existingUser) return null;

        const correctPassword = await decodedPassword(password, existingUser.password);
        if (!correctPassword) return null;

        const { id, name, lojaId, role } = existingUser;

        const token = generateToken({ id, name, email });

        return {
            token,
            user: { id, name, email, role, lojaId },
        };
    }
}
