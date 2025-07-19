import { JsonController, Post, Body, HttpCode } from 'routing-controllers';
import { AuthService } from '../services/AuthService';
import { LoginDTO } from '../dtos/LoginDTO';
// import { RegisterDTO } from '../dtos/RegisterDTO';

@JsonController('/auth')
export class AuthController {
    private service = new AuthService();

    @Post('/login')
    @HttpCode(200)
    login(@Body() body: LoginDTO) {
        return this.service.login(body);
    }

    @Post('/register')
    @HttpCode(201)
    register(@Body() body: RegisterDTO) {
        return this.service.register(body);
    }
}
