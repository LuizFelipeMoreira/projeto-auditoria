import { LoginRequestDTO, LoginResponseDTO } from '../../dto/LoginDTO';
import { prisma } from '../../lib/prisma';
import { IUserRepository } from './IAuthRepository';

export class AuthRepository implements IUserRepository {
    async create(data: LoginRequestDTO): Promise<LoginResponseDTO> {
        return prisma.user.create({ data });
    }

    async findByEmail(email: string): Promise<LoginResponseDTO | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findById(id: number): Promise<LoginResponseDTO | null> {
        return prisma.user.findUnique({ where: { id } });
    }
}

export default new AuthRepository();
