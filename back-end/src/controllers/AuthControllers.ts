import { Body, HttpCode, JsonController, Post } from 'routing-controllers';
import { LoginRequestDTO } from '../dto/LoginDTO';
//import { ValidateBody } from '../middlewares/ValidationMiddleware';
import { AuthService } from '../services/AuthService';

@JsonController('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @HttpCode(201)
    public async signup(@Body() loginRequestDTO: LoginRequestDTO) {
        return await this.authService.register(loginRequestDTO);
    }

    @Post('/signin')
    @HttpCode(201)
    public async signin(@Body() loginRequestDTO: LoginRequestDTO) {
        return await this.authService.login(loginRequestDTO);
    }
}
