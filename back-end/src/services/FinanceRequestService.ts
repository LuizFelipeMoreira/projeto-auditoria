import { JwtPayload } from 'jsonwebtoken';
import { BadRequestError, UnauthorizedError } from 'routing-controllers';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/FInanceRequestDTO';
import { $Enums } from '../generated/prisma';
import { PrismaFinanceRequestRepository } from '../repositories/financeRequest-repositorie/PrismaFinanceRequestRepository';
import { JwTServices } from '../utils/jwt';
import { EmailService } from './EmailService';

export class FinanceRequestService {
    private readonly jwtServices: JwTServices;
    constructor(
        private readonly emailService: EmailService,
        private readonly financeRequestRepository: PrismaFinanceRequestRepository
    ) {
        this.jwtServices = new JwTServices();
    }

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

    public async authorizeFinance(token: string, id: number, status: $Enums.STATUS) {
        if (!token) throw new UnauthorizedError('Token ausente');

        const payload = this.jwtServices.verifyToken(token) as JwtPayload | Error;

        if (payload instanceof Error) {
            throw new UnauthorizedError('Token inválido');
        }

        if (payload.role !== 'ADMIN') {
            throw new UnauthorizedError('Ação restrita a administradores');
        }

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
