import { z } from 'zod';

const financeRequestStatusSchema = z.enum(
    ['AGUARDANDO', 'APROVADO', 'REPROVADO'],
    'Status must be either AGUARDANDO, APROVADO, or REPROVADO'
);

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
    status: financeRequestStatusSchema.optional(),
    solicitante: z.number().int('Solicitante must be an integer').optional(),
    lojaId: z.number().int('Loja ID must be an integer').optional(),
});

export const authorizeFinanceRequestSchema = z.object({
    id: z.number().int('ID must be an integer'),
    status: financeRequestStatusSchema,
});

export const getFinanceByDescriptionSchema = z.object({
    description: z.string().min(1, 'Description is required'),
});
