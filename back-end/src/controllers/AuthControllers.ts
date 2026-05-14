import { Body, HttpCode, JsonController, Post } from 'routing-controllers';
import { AuthService } from '../services/AuthService';
import { LoginRequestDTO } from '../dto/LoginDTO';
import { AuthRepository } from '../repositories/auth-repositorie/PrismaAuthRepository';
import { JwTServices } from '../utils/jwt';

@JsonController('/auth')
export class AuthController {
    private readonly authService: AuthService;

    constructor() {
        const authRepository = new AuthRepository();
        const jwtServices = new JwTServices();
        const service = new AuthService(authRepository, jwtServices);
        this.authService = service;
    }

    @Post('/signup')
    @HttpCode(201)
    public async signup(@Body() loginRequest: LoginRequestDTO) {
        return await this.authService.register(loginRequest);
    }

    @Post('/signin')
    @HttpCode(201)
    public async signin(@Body() loginRequest: LoginRequestDTO) {
        return await this.authService.login(loginRequest);
    }
}
