import { prisma } from '../../lib/prisma';
import { IStoreRepositories } from './store.repository.interface';

class PrismaStoreRepository implements IStoreRepositories {
    async create(name: string) {
        const store = await prisma.store.create({
            data: {
                name,
            },
        });
        return store;
    }

    async update(id: number, name: string) {
        await prisma.store.update({
            where: { id },
            data: { name },
        });
    }
}

export { PrismaStoreRepository };
