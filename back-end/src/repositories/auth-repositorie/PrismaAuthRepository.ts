import { LoginRequestDTO } from '../../dto/LoginDTO';
import { User } from '../../generated/prisma';
import { prisma } from '../../lib/prisma';
import { IUserRepository } from './IAuthRepository';

export class AuthRepository implements IUserRepository {
    async create(data: LoginRequestDTO): Promise<User> {
        return prisma.user.create({ data });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }
}
