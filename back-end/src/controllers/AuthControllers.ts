import {
    BadRequestError,
    Body,
    HttpCode,
    JsonController,
    Post,
} from 'routing-controllers';
import { AuthService } from '../services/AuthService';
import { LoginRequestDTO } from '../dto/LoginDTO';

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

@JsonController('/auth')
export class AuthController {
    constructor(private readonly authService = new AuthService()) {}

    @Post('/signup')
    @HttpCode(201)
    public async signup(@Body() body: LoginRequestDTO) {
        const user = await this.authService.register(body);

        console.log(user);

        if (!user) {
            throw new BadRequestError('Usuario ja existe');
        }

        return user;
    }

    @Post('/signin')
    @HttpCode(201)
    public async signin(@Body() body: UserRequest) {
        const user = await this.authService.login(body.email, body.password);

        if (!user) {
            throw new BadRequestError('Usuario ja existe');
        }

        return user;
    }
}
