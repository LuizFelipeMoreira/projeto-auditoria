import { Body, HttpCode, JsonController, Post } from 'routing-controllers';
import { AuthService } from '../services/AuthService';
import { LoginRequestDTO, LoginResponseDTO } from '../dto/LoginDTO';

@JsonController('/auth')
export class AuthController {
    constructor(private readonly authService = new AuthService()) {}

    @Post('/signup')
    @HttpCode(201)
    public async signup(@Body() body: LoginRequestDTO) {
        return await this.authService.register(body);
    }

    @Post('/signin')
    @HttpCode(201)
    public async signin(@Body() body: LoginResponseDTO) {
        return await this.authService.login(body.email, body.password);
    }
}
