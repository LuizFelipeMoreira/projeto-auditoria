import { BadRequestError } from 'routing-controllers';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/FInanceRequestDto';
import PrismaFinanceRequestRepository from '../repositories/financeRequest-repositorie/PrismaFinanceRequestRepository';

export class FinanceRequestService {
    constructor(
        private readonly financeRequestRepository = PrismaFinanceRequestRepository
    ) {}

    async create(financeRequest: FinanceRequestDTO) {
        const newFinanceRequest = await this.financeRequestRepository.create(
            financeRequest
        );

        if (!newFinanceRequest) throw new BadRequestError('Erro interno no servidor');
    }

    async update(finance: FinanceRequestResponseDTO) {}
}
