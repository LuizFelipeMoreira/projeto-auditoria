import { $Enums, FinanceRequest } from '../generated/prisma';

export interface LoginResponseDTO {
    id: number;
    name: string;
    email: string;
    password: string;
    role: $Enums.ROLE;
    lojaId: number;
    financeRequests?: FinanceRequest[];
}

export interface LoginRequestDTO {
    name: string;
    email: string;
    password: string;
    role: $Enums.ROLE;
    lojaId: number;
}
