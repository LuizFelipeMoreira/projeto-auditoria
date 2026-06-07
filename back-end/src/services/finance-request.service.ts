import { BadRequestError } from 'routing-controllers';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/finance-request.dto';
import { $Enums } from '../generated/prisma';
import { PrismaFinanceRequestRepository } from '../repositories/finance-request-repository/prisma-finance-request.repository';
import { EmailService } from './email.service';

export class FinanceRequestService {
    constructor(
        private readonly emailService: EmailService,
        private readonly financeRequestRepository: PrismaFinanceRequestRepository
    ) {}

    public async create(financeRequest: FinanceRequestDTO) {
        if (!financeRequest.value || !financeRequest.description) {
            throw new BadRequestError('Campos obrigatórios não preenchidos');
        }

        const newFinanceRequest =
            await this.financeRequestRepository.create(financeRequest);

        if (!newFinanceRequest)
            throw new BadRequestError('Nao foi possivel criar nova finança');

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

    public async update(finance: FinanceRequestResponseDTO) {
        const financeUpdated = await this.financeRequestRepository.update(finance);
        return financeUpdated;
    }

    public async getFinances(limit: number, offset: number) {
        const finances = await this.financeRequestRepository.getFinances(limit, offset);
        return finances;
    }

    public async authorizeFinance(id: number, status: $Enums.STATUS) {
        await this.financeRequestRepository.authorize(id, status);

        return { message: 'Solicitação de finança atualizada com sucesso' };
    }

    public async getFinanceByDescription(description: string) {
        const finance =
            await this.financeRequestRepository.getFinanceByDescription(description);

        if (!finance) throw new BadRequestError('Não foi possível localizar solicitação');

        return finance;
    }
}
