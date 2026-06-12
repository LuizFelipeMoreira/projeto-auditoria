import {
    CreateFinanceRequestDTO,
    UpdateFinanceRequestDTO,
} from '../../dto/finance-request.dto';
import { $Enums, FinanceRequest } from '../../generated/prisma';

export interface IFinanceRequest {
    create: (finance: CreateFinanceRequestDTO) => Promise<FinanceRequest>;

    update: (finance: UpdateFinanceRequestDTO) => Promise<void>;

    delete: (id: number) => Promise<void>;

    getFinances: (limit: number, offset: number) => Promise<FinanceRequest[]>;

    authorize: (id: number, status: $Enums.STATUS) => Promise<void>;

    getFinanceByDescription: (description: string) => Promise<FinanceRequest[] | null>;
}
