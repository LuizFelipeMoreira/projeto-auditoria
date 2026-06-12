import {
    CreateFinanceRequestDTO,
    FinanceRequestResponseDTO,
} from '../../dto/finance-request.dto';
import { $Enums } from '../../generated/prisma';
import { prisma } from '../../lib/prisma';
import { IFinanceRequest } from './finance-request.repository.interface';

class PrismaFinanceRequestRepository implements IFinanceRequest {
    async create(finance: CreateFinanceRequestDTO) {
        const newFinance = await prisma.financeRequest.create({
            data: { ...finance },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                loja: true,
            },
        });
        return newFinance;
    }

    async update(finance: Omit<FinanceRequestResponseDTO, 'user' | 'loja'>) {
        await prisma.financeRequest.update({
            where: { id: finance.id },
            data: { ...finance },
        });
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

    async authorize(id: number, status: $Enums.STATUS) {
        await prisma.financeRequest.update({
            data: { status },
            where: { id },
        });
        return;
    }

    async getFinanceByDescription(description: string) {
        const financeRequest = await prisma.financeRequest.findMany({
            where: { description },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                loja: true,
            },
        });

        if (!financeRequest) return null;

        return financeRequest;
    }
}

export { PrismaFinanceRequestRepository };
