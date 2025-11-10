import { $Enums } from '../generated/prisma';

export interface FinanceRequestDTO {
    id: number;
    description: string;
    value: number;
    status: $Enums.STATUS;
    solicitante: number;
    lojaId: number;
}

export interface FinanceRequestResponseDTO {
    id: number;
    description: string;
    value: number;
    status: $Enums.STATUS;
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
