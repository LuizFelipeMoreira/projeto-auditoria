import { $Enums } from '../generated/prisma';

export interface FinanceRequestDTO {
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
}
