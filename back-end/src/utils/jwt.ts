import jwt from 'jsonwebtoken';
import { Prisma } from '../generated/prisma';

const secret = process.env.JWT_SECRET || 'sua_chave_secreta';

export const generateToken = (payload: Prisma.UserCreateInput, expiresIn = '1h') => {
    return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};
