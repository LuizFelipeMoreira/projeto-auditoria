import { PrismaStoreRepository } from '../repositories/store-repository/prisma-store.repository';

export class StoreService {
    constructor(private readonly storeRepository: PrismaStoreRepository) {}

    async create(name: string) {
        return await this.storeRepository.create(name);
    }

    async update(id: number, name: string) {
        await this.storeRepository.update(id, name);

        return { id, name };
    }
}
