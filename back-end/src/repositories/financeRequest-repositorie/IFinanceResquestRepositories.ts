import { FinanceRequest, Prisma } from '../../generated/prisma';

export interface IFinanceRequest {
    create: (finance: Prisma.FinanceRequestCreateInput) => Promise<FinanceRequest>;

    update: (finance: FinanceRequest) => Promise<FinanceRequest>;

    delete: (id: number) => Promise<void>;

    getFinanceByDescription: (description: string) => Promise<FinanceRequest[] | null>;
}
