import { LoginRequestDTO, LoginResponseDTO } from '../../dto/LoginDTO';

export interface IUserRepository {
    create(data: LoginRequestDTO): Promise<LoginResponseDTO | null>;

    findByEmail(email: string): Promise<LoginResponseDTO | null>;

    findById(id: number): Promise<LoginResponseDTO | null>;
}
