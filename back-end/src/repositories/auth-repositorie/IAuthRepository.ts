import { Prisma } from '../../generated/prisma';

export interface IUserRepository {
    create(data: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput | null>;

    findByEmail(email: string): Promise<Prisma.UserCreateInput | null>;

    findUserById(id: number): Promise<Prisma.UserCreateInput | null>;
}
