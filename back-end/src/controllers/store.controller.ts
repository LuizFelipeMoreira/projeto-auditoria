import { StoreRequestDTO, StoreResponseDTO } from '../dto/store.dto';
import { StoreService } from '../services/store.service';
import { Body, HttpCode, JsonController, Post, UseBefore } from 'routing-controllers';
import { AdminOnlyMiddleware } from '../middlewares/admin-only.middleware';
import { JwtMiddleware } from '../middlewares/jwt.middleware';
import { ValidateBody } from '../middlewares/validation.middleware';
import { createStoreSchema, updateStoreSchema } from '../schemas/store.schemas';

@JsonController('/store')
@UseBefore(JwtMiddleware)
@UseBefore(AdminOnlyMiddleware)
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post('/create')
    @UseBefore(ValidateBody(createStoreSchema))
    @HttpCode(201)
    async createStore(@Body() body: StoreRequestDTO) {
        const newStore = await this.storeService.create(body.name);

        return newStore;
    }

    @Post('/update')
    @UseBefore(ValidateBody(updateStoreSchema))
    @HttpCode(200)
    async updateStore(@Body() body: StoreResponseDTO) {
        const storeUpdated = await this.storeService.update(body.id, body.name);

        return {
            ...storeUpdated,
        };
    }
}
