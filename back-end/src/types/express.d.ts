import { JwtPayload } from 'jsonwebtoken';
import { $Enums } from '../generated/prisma';

export interface AuthenticatedUserPayload extends JwtPayload {
    id: number;
    name: string;
    email: string;
    role: $Enums.ROLE;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: AuthenticatedUserPayload;
    }
}
