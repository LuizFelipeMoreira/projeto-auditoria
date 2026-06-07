import {
    Body,
    HttpCode,
    JsonController,
    Post,
    UseBefore,
} from 'routing-controllers';
import { FinanceRequestDTO, FinanceRequestResponseDTO } from '../dto/finance-request.dto';
import { $Enums } from '../generated/prisma';
import { FinanceRequestService } from '../services/finance-request.service';
import { JwtMiddleware } from '../middlewares/jwt.middleware';
import { AdminOnlyMiddleware } from '../middlewares/admin-only.middleware';

@JsonController('/finance')
@UseBefore(JwtMiddleware)
export class FinanceRequestController {
    constructor(private readonly financeRequestService: FinanceRequestService) {}

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
    @UseBefore(AdminOnlyMiddleware)
    @HttpCode(200)
    async authorizeFinance(@Body() body: { id: number; status: $Enums.STATUS }) {
        return await this.financeRequestService.authorizeFinance(body.id, body.status);
    }

    @Post('/getByDescription')
    @HttpCode(200)
    async getFinanceByDescription(@Body() body: { description: string }) {
        return await this.financeRequestService.getFinanceByDescription(body.description);
    }
}
