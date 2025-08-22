import PrismaStoreRepositories from '../repositories/store-repositorie/PrismaStoreRepositories';

export class StoreService {
    constructor(private readonly storeRepository = PrismaStoreRepositories) {}

    async create(name: string) {
        return await this.storeRepository.create(name);
    }

    async update(id: number, name: string) {
        await this.storeRepository.update(id, name);

        return { id, name };
    }
}
