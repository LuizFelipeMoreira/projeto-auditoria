import { LoginRequestDTO } from '../dto/LoginDTO';
import { AuthRepository } from '../repositories/auth-repositorie/PrismaAuthRepository';
import { decodedPassword, hashPassword } from '../utils/hash';
import { JwTServices } from '../utils/jwt';

export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtServices: JwTServices
    ) {}

    async register(loginServiceDTO: LoginRequestDTO) {
        const existingUser = await this.authRepository.findByEmail(loginServiceDTO.email);
        if (existingUser) return null;

        const hash = await hashPassword(loginServiceDTO.password);
        const newUser = await this.authRepository.create({
            ...loginServiceDTO,
            password: hash,
        });

        return { id: newUser.id, name: newUser.name, email: newUser.email };
    }

    async login({ email, password }: LoginRequestDTO) {
        const existingUser = await this.authRepository.findByEmail(email);
        if (!existingUser) return null;

        const correctPassword = await decodedPassword(password, existingUser.password);
        if (!correctPassword) return null;

        const { id, name, lojaId, role } = existingUser;

        const token = this.jwtServices.generateToken({ id, name, email, role });

        return {
            token,
            user: { id, name, email, role, lojaId },
        };
    }
}
