import { StoreService } from '../services/StoreService';
import { Body, HttpCode, JsonController, Post } from 'routing-controllers';

interface StoreRequest {
    id: number;
    name: string;
}

@JsonController('/store')
export class StoreController {
    constructor(private readonly storeService = new StoreService()) {}

    @Post('/create')
    @HttpCode(201)
    async createStore(@Body() body: StoreRequest) {
        const newStore = this.storeService.create(body.name);

        return newStore;
    }

    @Post('/update')
    @HttpCode(200)
    async updateStore(@Body() body: StoreRequest) {
        const storeUpdated = await this.storeService.update(body.id, body.name);

        console.log(storeUpdated);

        return {
            ...storeUpdated,
        };
    }
}
