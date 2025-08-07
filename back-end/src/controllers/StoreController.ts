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
}
