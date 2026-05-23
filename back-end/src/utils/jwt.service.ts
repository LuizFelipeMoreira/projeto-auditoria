import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export class JwTServices {
    private readonly secret: string;
    private readonly expiresIn: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'default_secret_key';
        this.expiresIn = '1h';
    }

    public generateToken = (payload: JwtPayload, options?: SignOptions): string => {
        return jwt.sign(payload, this.secret, {
            expiresIn: '1h',
            ...options,
        });
    };

    public verifyToken = (token: string) => {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            return error;
        }
    };
}
