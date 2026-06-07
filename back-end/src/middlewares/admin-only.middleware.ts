import { NextFunction, Request, Response } from 'express';
import {
    ExpressMiddlewareInterface,
    Middleware,
    UnauthorizedError,
} from 'routing-controllers';

@Middleware({ type: 'before' })
export class AdminOnlyMiddleware implements ExpressMiddlewareInterface {
    use(req: Request, _: Response, next: NextFunction) {
        if (!req.user) {
            throw new UnauthorizedError('Usuário não autenticado');
        }

        if (req.user.role !== 'ADMIN') {
            throw new UnauthorizedError('Ação restrita a administradores');
        }

        next();
    }
}
