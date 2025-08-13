import { Store } from '../../generated/prisma';

export interface IStoreRepositories {
    create(name: string): Promise<Store>;

    update(id: number, name: string): Promise<void>;
}
