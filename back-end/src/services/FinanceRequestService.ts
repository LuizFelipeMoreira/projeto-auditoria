import { BadRequestError } from 'routing-controllers';
import { FinanceRequest, Prisma } from '../generated/prisma';
import PrismaFinanceRequestRepository from '../repositories/financeRequest-repositorie/PrismaFinanceRequestRepository';

export class FinanceRequestService {
    constructor(
        private readonly financeRequestRepository = PrismaFinanceRequestRepository
    ) {}

    async create(financeRequest: Prisma.FinanceRequestCreateInput) {
        const newFinanceRequest = await this.financeRequestRepository.create(
            financeRequest
        );

        if (!newFinanceRequest) throw new BadRequestError('Erro interno no servidor');
    }

    async update(finance: FinanceRequest) {}
}
