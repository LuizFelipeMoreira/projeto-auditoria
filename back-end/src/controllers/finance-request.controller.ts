import {
    Body,
    HttpCode,
    JsonController,
    Post,
    Req,
    UseBefore,
} from 'routing-controllers';
import {
    CreateFinanceRequestDTO,
    UpdateFinanceRequestDTO,
} from '../dto/finance-request.dto';
import { $Enums } from '../generated/prisma';
import { FinanceRequestService } from '../services/finance-request.service';
import { JwtMiddleware } from '../middlewares/jwt.middleware';
import { AdminOnlyMiddleware } from '../middlewares/admin-only.middleware';
import { ValidateBody } from '../middlewares/validation.middleware';
import {
    authorizeFinanceRequestSchema,
    createFinanceRequestSchema,
    getFinanceByDescriptionSchema,
    updateFinanceRequestSchema,
} from '../schemas/finance-request.shemas';
import { Request } from 'express';

@JsonController('/finance')
@UseBefore(JwtMiddleware)
export class FinanceRequestController {
    constructor(private readonly financeRequestService: FinanceRequestService) {}

    @Post('/new')
    @UseBefore(ValidateBody(createFinanceRequestSchema))
    @HttpCode(201)
    async create(@Req() req: Request) {
        return await this.financeRequestService.create(req.body);
    }

    @Post('/update')
    @UseBefore(ValidateBody(updateFinanceRequestSchema))
    @HttpCode(201)
    async update(@Body() body: UpdateFinanceRequestDTO) {
        return await this.financeRequestService.update(body);
    }

    @Post('/authorize')
    @UseBefore(ValidateBody(authorizeFinanceRequestSchema))
    @UseBefore(AdminOnlyMiddleware)
    @HttpCode(200)
    async authorizeFinance(@Body() body: { id: number; status: $Enums.STATUS }) {
        return await this.financeRequestService.authorizeFinance(body.id, body.status);
    }

    @Post('/getByDescription')
    @UseBefore(ValidateBody(getFinanceByDescriptionSchema))
    @HttpCode(200)
    async getFinanceByDescription(@Body() body: { description: string }) {
        return await this.financeRequestService.getFinanceByDescription(body.description);
    }
}
