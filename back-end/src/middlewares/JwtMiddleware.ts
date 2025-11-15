import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import {
    ExpressMiddlewareInterface,
    Middleware,
    UnauthorizedError,
} from 'routing-controllers';
import { JwTServices } from '../utils/jwt';

@Middleware({ type: 'before' })
export class JwtMiddleware implements ExpressMiddlewareInterface {
    private readonly jwtServices = new JwTServices();

    use(req: Request, _: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new UnauthorizedError('Token ausente');

        const payload = this.jwtServices.verifyToken(token) as JwtPayload | Error;

        if (payload instanceof Error) {
            throw new UnauthorizedError('Token inválido');
        }

        next();
    }
}
