import {
    Body,
    HttpCode,
    JsonController,
    Post,
    Req,
    UseBefore,
} from 'routing-controllers';
import { LoginRequestDTO } from '../dto/login.dto';
import { ValidateBody } from '../middlewares/validation.middleware';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';
import { signinSchema, signupSchema } from '../schemas/auth.schemas';

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
    @UseBefore(ValidateBody(signinSchema))
    public async signin(@Req() req: Request) {
        return await this.authService.login(req.body);
    }
}
