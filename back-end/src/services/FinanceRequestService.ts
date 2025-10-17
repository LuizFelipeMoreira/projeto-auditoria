import { BadRequestError } from 'routing-controllers';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/FinanceRequestDTO';
import PrismaFinanceRequestRepository from '../repositories/financeRequest-repositorie/PrismaFinanceRequestRepository';
import { EmailService } from './EmailService';

export class FinanceRequestService {
    constructor(
        private readonly emailService: EmailService,
        private readonly financeRequestRepository = PrismaFinanceRequestRepository
    ) {}

    async create(financeRequest: FinanceRequestDTO) {
        if (!financeRequest.value || !financeRequest.description) {
            throw new BadRequestError('Campos obrigatórios não preenchidos');
        }

        const newFinanceRequest = await this.financeRequestRepository.create(
            financeRequest
        );

        if (!newFinanceRequest) throw new BadRequestError('Erro interno no servidor');

        try {
            const email = await this.emailService.notifyAdminSolicitation(
                newFinanceRequest.user.name,
                newFinanceRequest.loja.name,
                newFinanceRequest.value,
                newFinanceRequest.description
            );

            console.log(email);
        } catch (err) {
            console.error('Falha ao enviar e-mail:', err);
        }

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

        if (!finance) throw new BadRequestError('Não foi possível localizar solicitação');

        return finance;
    }
}
