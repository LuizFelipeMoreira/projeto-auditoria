import { $Enums } from '../generated/prisma';

export interface CreateFinanceRequestDTO {
    description: string;
    value: number;
    status?: $Enums.STATUS;
    solicitante: number;
    lojaId: number;
}

export type UpdateFinanceRequestDTO = Omit<FinanceRequestResponseDTO, 'loja' | 'user'>;

export interface FinanceRequestResponseDTO {
    id: number;
    description: string;
    value: number;
    solicitante: number;
    lojaId: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    loja: {
        id: number;
        name: string;
    };
}
