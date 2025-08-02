import { JsonController, Post, Body, HttpCode } from 'routing-controllers';
import { AuthService } from '../services/AuthService';
import { Prisma } from '../generated/prisma';

@JsonController('/auth')
export class AuthController {
    private readonly service = new AuthService();

    @Post('/user')
    async getUser(@Body() body: Prisma.UserCreateInput) {}
}
