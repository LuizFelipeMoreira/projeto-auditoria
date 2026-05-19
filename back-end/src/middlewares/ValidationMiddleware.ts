import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { z } from 'zod';

export function ValidateBody(schema: z.ZodSchema) {
    class ValidationMiddleware implements ExpressMiddlewareInterface {
        use(req: Request, res: Response, next: NextFunction): void {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                res.status(400).json({
                    error: 'Invalid Request body',
                    issues: result.error.issues,
                });
                return;
            }

            next();
        }
    }
    return ValidationMiddleware;
}
