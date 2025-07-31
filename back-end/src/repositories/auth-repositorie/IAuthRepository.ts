import { Prisma, User } from '../../generated/prisma';

export interface IUserRepository {
    create(data: Prisma.UserCreateInput): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    findById(id: number): Promise<User | null>;
}
