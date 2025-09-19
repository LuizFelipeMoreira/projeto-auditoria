import {
    FinanceRequestDTO,
    FinanceRequestResponseDTO,
} from '../../dto/FInanceRequestDto';
import { prisma } from '../../lib/prisma';
import { IFinanceRequest } from './IFinanceResquestRepositories';

class PrismaFinanceRequestRepository implements IFinanceRequest {
    async create(finance: FinanceRequestDTO) {
        const newFinance = await prisma.financeRequest.create({ data: { ...finance } });
        return newFinance;
    }

    async update(finance: FinanceRequestResponseDTO) {
        await prisma.financeRequest.update({
            where: { id: finance.id },
            data: { ...finance },
        });

        return finance;
    }

    async delete(id: number) {
        await prisma.financeRequest.delete({ where: { id } });
    }

    async getFinances(limit: number, offset: number) {
        const finances = await prisma.financeRequest.findMany({
            skip: offset,
            take: limit,
        });

        return finances;
    }

    async getFinanceByDescription(description: string) {
        const financeRequest = await prisma.financeRequest.findMany({
            where: { description },
        });

        if (!financeRequest) return null;

        return financeRequest;
    }
}

export default new PrismaFinanceRequestRepository();
