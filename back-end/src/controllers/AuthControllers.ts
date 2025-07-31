import { JsonController, Post, Body, HttpCode } from 'routing-controllers';
import { AuthService } from '../services/AuthService';

@JsonController('/auth')
export class AuthController {
    private service = new AuthService();
}
