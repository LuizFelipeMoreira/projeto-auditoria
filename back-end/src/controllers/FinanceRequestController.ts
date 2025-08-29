import { Post, Body, JsonController, HttpCode } from 'routing-controllers';
import { FinanceRequestService } from '../services/FinanceRequestService';
import { FinanceRequest, Prisma } from '../generated/prisma';

@JsonController('/finance')
export class FinanceRequestController {
    constructor(private readonly financeRequestService = new FinanceRequestService()) {}

    @Post('/new')
    @HttpCode(201)
    async create(@Body() body: Prisma.FinanceRequestCreateInput) {
        return await this.financeRequestService.create(body);
    }

    @Post('/update')
    @HttpCode(201)
    async update(@Body() body: FinanceRequest) {
        return await this.financeRequestService.update(body);
    }
}
