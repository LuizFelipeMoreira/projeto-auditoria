import { StoreResponseDTO } from '../../dto/StoreDTO';

export interface IStoreRepositories {
    create(name: string): Promise<StoreResponseDTO>;

    update(id: number, name: string): Promise<void>;
}
