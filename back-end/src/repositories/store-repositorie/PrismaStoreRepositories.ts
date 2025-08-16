import { prisma } from '../../lib/prisma';
import { IStoreRepositories } from './IStoreRepositories';

class StoreRepository implements IStoreRepositories {
    async create(name: string) {
        const store = prisma.store.create({
            data: {
                name,
            },
        });
        return store;
    }

    async update(id: number, name: string) {
        prisma.store.update({
            where: { id },
            data: { name },
        });
    }
}

export default new StoreRepository();
