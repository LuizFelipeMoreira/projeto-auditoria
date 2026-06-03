import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { z } from 'zod';

export function ValidateBody(schema: z.ZodSchema) {
    class ValidationMiddleware implements ExpressMiddlewareInterface {
        use(req: Request, res: Response, next: NextFunction): void {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                const errors = result.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }));

                res.status(400).json({
                    error: 'Invalid Request body',
                    errors,
                });
                return;
            }

            next();
        }
    }
    return ValidationMiddleware;
}
