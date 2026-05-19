import { Body, HttpCode, JsonController, Post, UseBefore } from 'routing-controllers';
import z from 'zod';
import { LoginRequestDTO } from '../dto/LoginDTO';
import { ValidateBody } from '../middlewares/ValidationMIddleware';
import { AuthRepository } from '../repositories/auth-repositorie/PrismaAuthRepository';
import { AuthService } from '../services/AuthService';
import { JwTServices } from '../utils/jwt';

const UserSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'FUNCIONARIO']),
    lojaId: z.number(),
});

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
    @UseBefore(ValidateBody(UserSchema))
    public async signup(@Body() loginRequest: LoginRequestDTO) {
        return await this.authService.register(loginRequest);
    }

    @Post('/signin')
    @HttpCode(201)
    @UseBefore(ValidateBody(UserSchema))
    public async signin(@Body() loginRequest: LoginRequestDTO) {
        return await this.authService.login(loginRequest);
    }
}
