import { BadRequestError } from 'routing-controllers';
import PrismaFinanceRequestRepository from '../repositories/financeRequest-repositorie/PrismaFinanceRequestRepository';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/FInanceRequestDto';

export class FinanceRequestService {
    constructor(
        private readonly financeRequestRepository = PrismaFinanceRequestRepository
    ) {}

    async create(financeRequest: FinanceRequestDTO) {
        const newFinanceRequest = await this.financeRequestRepository.create(
            financeRequest
        );

        if (!newFinanceRequest) throw new BadRequestError('Erro interno no servidor');

        return newFinanceRequest;
    }

    async update(finance: FinanceRequestResponseDTO) {}

    async getFinances(limit: number, offset: number) {
        const finances = await this.financeRequestRepository.getFinances(limit, offset);

        return finances;
    }

    async getFinanceByDescription(description: string) {
        const finance = await this.financeRequestRepository.getFinanceByDescription(
            description
        );

        if (!finance) throw new BadRequestError('nao foi possivel localizar solicitaçao');

        return finance;
    }
}
