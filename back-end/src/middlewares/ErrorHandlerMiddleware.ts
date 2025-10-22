import { Response } from 'express';
import {
    ExpressErrorMiddlewareInterface,
    HttpError,
    Middleware,
} from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    error(err: unknown, _: unknown, res: Response): void {
        if (err instanceof HttpError) {
            res.status(err.httpCode || 400).json({
                status: 'Error',
                message: err.message,
            });

            return;
        }

        res.status(500).json({
            status: 'Erro',
            message: 'Erro inesperado no servidor',
        });
    }
}
