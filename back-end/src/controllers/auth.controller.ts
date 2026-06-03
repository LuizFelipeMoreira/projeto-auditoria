import {
    Body,
    HttpCode,
    JsonController,
    Post,
    Req,
    UseBefore,
} from 'routing-controllers';
import z from 'zod';
import { LoginRequestDTO } from '../dto/login.dto';
import { ValidateBody } from '../middlewares/validation.middleware';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';

const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Email must be valid'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['ADMIN', 'FUNCIONARIO'], 'Role must be either ADMIN or FUNCIONARIO'),
    lojaId: z.number().int('Loja ID must be an integer'),
});

@JsonController('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @UseBefore(ValidateBody(signupSchema))
    @HttpCode(201)
    public async signup(@Req() req: Request) {
        return await this.authService.register(req.body);
    }

    @Post('/signin')
    @HttpCode(201)
    public async signin(@Body() loginRequestDTO: LoginRequestDTO) {
        return await this.authService.login(loginRequestDTO);
    }
}
