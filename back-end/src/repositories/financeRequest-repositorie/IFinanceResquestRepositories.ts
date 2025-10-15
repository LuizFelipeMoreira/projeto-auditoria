import {
    FinanceRequestDTO,
    FinanceRequestResponseDTO,
} from '../../dto/FinanceRequestDTO';

export interface IFinanceRequest {
    create: (finance: FinanceRequestDTO) => Promise<FinanceRequestResponseDTO>;

    update: (finance: FinanceRequestResponseDTO) => Promise<void>;

    delete: (id: number) => Promise<void>;

    getFinanceByDescription: (
        description: string
    ) => Promise<FinanceRequestResponseDTO[] | null>;
}
