import { Prisma } from '../generated/prisma';
import AuthRepository from '../repositories/auth-repositorie/PrismaAuthRepository';

export class AuthService {
    constructor(private readonly authRepository = AuthRepository) {}

    async register(data: Prisma.UserCreateInput) {
        const isValidEmail = await this.authRepository.findByEmail(data.email);
        if (!isValidEmail) return null;

        const newUser = await this.authRepository.create(data);
    }

    async login(email: string, password: string) {}
}
