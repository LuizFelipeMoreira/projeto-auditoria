import { BadRequestError, NotFoundError } from 'routing-controllers';
import { LoginRequestDTO } from '../dto/LoginDTO';
import { PrismaAuthRepository } from '../repositories/auth-repositorie/PrismaAuthRepository';
import { decodedPassword, hashPassword } from '../utils/hash';
import { JwTServices } from '../utils/jwt';

export class AuthService {
    constructor(
        private readonly authRepository: PrismaAuthRepository,
        private readonly jwtServices: JwTServices
    ) {}

    async register(loginServiceDTO: LoginRequestDTO) {
        const existingUser = await this.authRepository.findByEmail(loginServiceDTO.email);
        if (existingUser) throw new NotFoundError('Usuário já existe');

        const hash = await hashPassword(loginServiceDTO.password);
        const newUser = await this.authRepository.create({
            ...loginServiceDTO,
            password: hash,
        });

        return { id: newUser.id, name: newUser.name, email: newUser.email };
    }

    async login({ email, password }: LoginRequestDTO) {
        const existingUser = await this.authRepository.findByEmail(email);
        if (!existingUser) throw new NotFoundError('Usuário não encontrado');

        const correctPassword = await decodedPassword(password, existingUser.password);
        if (!correctPassword) throw new BadRequestError('Senha incorreta');

        const { id, name, lojaId, role } = existingUser;

        const token = this.jwtServices.generateToken({ id, name, email, role });

        return {
            token,
            user: { id, name, email, role, lojaId },
        };
    }
}
