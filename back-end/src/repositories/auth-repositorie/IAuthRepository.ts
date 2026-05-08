import { LoginRequestDTO } from '../../dto/LoginDTO';
import { User } from '../../generated/prisma';

export interface IUserRepository {
    create(data: LoginRequestDTO): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    findById(id: number): Promise<User | null>;
}
