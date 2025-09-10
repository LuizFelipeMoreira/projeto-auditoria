import { Post, Body, JsonController, HttpCode } from 'routing-controllers';
import { FinanceRequestService } from '../services/FinanceRequestService';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/FInanceRequestDto';

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
}
