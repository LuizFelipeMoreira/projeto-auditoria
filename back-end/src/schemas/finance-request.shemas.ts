import { z } from 'zod';

export const createFinanceRequestSchema = z.object({
    description: z.string().min(1, 'Description is required'),
    value: z.number().min(0, 'Value must be positive'),
    solicitante: z.number().int('Solicitante must be an integer'),
    lojaId: z.number().int('Loja ID must be an integer'),
});

export const updateFinanceRequestSchema = z.object({
    id: z.number().int('ID must be an integer'),
    description: z.string().min(1, 'Description is required').optional(),
    value: z.number().min(0, 'Value must be positive').optional(),
    status: z
        .enum(
            ['PENDING', 'APPROVED', 'REJECTED'],
            'Status must be either PENDING, APPROVED, or REJECTED'
        )
        .optional(),
});
