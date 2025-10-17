import { Body, HttpCode, JsonController, Post } from 'routing-controllers';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/FinanceRequestDTO';
import { PrismaFinanceRequestRepository } from '../repositories/financeRequest-repositorie/PrismaFinanceRequestRepository';
import { EmailService } from '../services/EmailService';
import { FinanceRequestService } from '../services/FinanceRequestService';

@JsonController('/finance')
export class FinanceRequestController {
    private financeRequestService: FinanceRequestService;

    constructor() {
        const financeRepo = new PrismaFinanceRequestRepository();
        const emailService = new EmailService();

        this.financeRequestService = new FinanceRequestService(emailService, financeRepo);
    }

    @Post('/new')
    @HttpCode(201)
    async create(@Body() body: FinanceRequestDTO) {
        return await this.financeRequestService.create(body);
    }

    @Post('/update')
    @HttpCode(201)
    async update(@Body() body: FinanceRequestResponseDTO) {
        return await this.financeRequestService.update(body);
    }

    @Post('/getByDescription')
    @HttpCode(200)
    async getFinanceByDescription(@Body() body: { description: string }) {
        return await this.financeRequestService.getFinanceByDescription(body.description);
    }
}
