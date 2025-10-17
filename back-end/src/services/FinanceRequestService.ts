import { BadRequestError } from 'routing-controllers';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/FinanceRequestDTO';
import PrismaFinanceRequestRepository from '../repositories/financeRequest-repositorie/PrismaFinanceRequestRepository';
import { EmailService } from './EmailService';

export class FinanceRequestService {
    constructor(
        private readonly emailService = new EmailService(),
        private readonly financeRequestRepository = PrismaFinanceRequestRepository
    ) {}

    async create(financeRequest: FinanceRequestDTO) {
        const newFinanceRequest = await this.financeRequestRepository.create(
            financeRequest
        );

        if (!newFinanceRequest) throw new BadRequestError('Erro interno no servidor');

        const email = await this.emailService.notifyAdminSolicitation(
            newFinanceRequest.user.name,
            newFinanceRequest.loja.name,
            newFinanceRequest.value,
            newFinanceRequest.description
        );

        console.log(email);

        return newFinanceRequest;
    }

    async update(finance: FinanceRequestResponseDTO) {
        const financeUpdated = await this.financeRequestRepository.update(finance);

        return financeUpdated;
    }

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
