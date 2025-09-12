import { StoreRequestDTO, StoreResponseDTO } from '../dto/StoreDTO';
import { StoreService } from '../services/StoreService';
import { Body, HttpCode, JsonController, Post } from 'routing-controllers';

@JsonController('/store')
export class StoreController {
    constructor(private readonly storeService = new StoreService()) {}

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

        console.log(storeUpdated);

        return {
            ...storeUpdated,
        };
    }
}
