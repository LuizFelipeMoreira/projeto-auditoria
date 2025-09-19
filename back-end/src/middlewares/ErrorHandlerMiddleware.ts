import { NextFunction, Request, Response } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressMiddlewareInterface {
    error(error: any, req: Request, res: Response, next: NextFunction) {
        const status = error.httpCode || 500;

        res.status(status).json({ message: error.message || 'erro interno no servidor' });
    }
}

// import { Request, Response, NextFunction } from 'express';
// import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';

// @Middleware({ type: 'after' })
// export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
//   error(
//     error: any,
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): void {
//     const status = error.httpCode || 500;
//     res.status(status).json({ message: error.message || 'Erro interno do servidor' });
//   }
// }
