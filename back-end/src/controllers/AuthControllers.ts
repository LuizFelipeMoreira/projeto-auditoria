import {
    BadRequestError,
    Body,
    Get,
    HttpCode,
    JsonController,
    Post,
} from 'routing-controllers';
import { Prisma } from '../generated/prisma';
import { AuthService } from '../services/AuthService';

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

@JsonController('/auth')
export class AuthController {
    private readonly authService = new AuthService();

    constructor() {
        console.log('AuthController carregado');
    }

    @Get('/users')
    @HttpCode(200)
    async users() {
        return {
            id: 15,
            nome: 'Luiz Felipe',
            email: 'lipao@gmail.com',
            loja: 'Santos',
        };
    }

    @Post('/signup')
    @HttpCode(201)
    async signup(@Body() body: Prisma.UserCreateInput) {
        const user = this.authService.register(body);

        if (!user) {
            throw new BadRequestError('Usuario ja existe');
        }

        return user;
    }

    @Post('/signin')
    @HttpCode(201)
    async signin(@Body() body: UserRequest) {
        const user = this.authService.login(body.email, body.password);

        if (!user) {
            throw new BadRequestError('Usuario ja existe');
        }

        return user;
    }
}
