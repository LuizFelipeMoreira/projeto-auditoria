import { StoreRequestDTO, StoreResponseDTO } from '../dto/store.dto';
import { StoreService } from '../services/store.service';
import { Body, HttpCode, JsonController, Post } from 'routing-controllers';

@JsonController('/store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post('/create')
    @HttpCode(201)
    async createStore(@Body() body: StoreRequestDTO) {
        const newStore = await this.storeService.create(body.name);

        return newStore;
    }

    @Post('/update')
    @HttpCode(200)
    async updateStore(@Body() body: StoreResponseDTO) {
        const storeUpdated = await this.storeService.update(body.id, body.name);

        return {
            ...storeUpdated,
        };
    }
}
