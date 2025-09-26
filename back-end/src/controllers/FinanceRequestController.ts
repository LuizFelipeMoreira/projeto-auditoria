import { Body, HttpCode, JsonController, Post } from 'routing-controllers';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/FinanceRequestDTO';
import { FinanceRequestService } from '../services/FinanceRequestService';

@JsonController('/finance')
export class FinanceRequestController {
    constructor(private readonly financeRequestService = new FinanceRequestService()) {}

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
