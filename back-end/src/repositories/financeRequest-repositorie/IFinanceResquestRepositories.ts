import {
    FinanceRequestDTO,
    FinanceRequestResponseDTO,
} from '../../dto/FinanceRequestDTO';

export interface IFinanceRequest {
    create: (finance: FinanceRequestDTO) => Promise<FinanceRequestResponseDTO>;

    update: (finance: FinanceRequestResponseDTO) => Promise<void>;

    delete: (id: number) => Promise<void>;

    getFinances: (limit: number, offset: number) => Promise<FinanceRequestDTO[]>;

    authorize: (id: number, status: string) => Promise<void>;

    getFinanceByDescription: (
        description: string
    ) => Promise<FinanceRequestResponseDTO[] | null>;
}
