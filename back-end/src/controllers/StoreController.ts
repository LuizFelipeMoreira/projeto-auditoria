import { StoreService } from '../services/StoreService';
import {
    BadRequestError,
    Body,
    HttpCode,
    JsonController,
    Post,
} from 'routing-controllers';

@JsonController('/store')
export class StoreController {
    constructor(private readonly storeService = new StoreService()) {}

    @Post('/create')
    @HttpCode(201)
    async create() {}

    @Post('/update')
    @HttpCode(200)
    async update() {}
}
