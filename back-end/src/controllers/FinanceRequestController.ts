import { Request } from 'express';
import {
    Body,
    HttpCode,
    JsonController,
    Post,
    Req,
    UseBefore,
} from 'routing-controllers';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/FinanceRequestDTO';
import { $Enums } from '../generated/prisma';
import { PrismaFinanceRequestRepository } from '../repositories/financeRequest-repositorie/PrismaFinanceRequestRepository';
import { EmailService } from '../services/EmailService';
import { FinanceRequestService } from '../services/FinanceRequestService';
import { JwtMiddleware } from '../middlewares/JwtMiddleware';

@JsonController('/finance')
@UseBefore(JwtMiddleware)
export class FinanceRequestController {
    private readonly financeRequestService: FinanceRequestService;

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

    @Post('/authorize')
    @HttpCode(200)
    async authorizeFinance(
        @Req() req: Request,
        @Body() body: { id: number; status: $Enums.STATUS }
    ) {
        const token = req.headers.authorization?.split(' ')[1] || '';

        return await this.financeRequestService.authorizeFinance(
            token,
            body.id,
            body.status
        );
    }

    @Post('/getByDescription')
    @HttpCode(200)
    async getFinanceByDescription(@Body() body: { description: string }) {
        return await this.financeRequestService.getFinanceByDescription(body.description);
    }
}
