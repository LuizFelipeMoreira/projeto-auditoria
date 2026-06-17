import { z } from 'zod';

export const createStoreSchema = z.object({
    name: z.string().min(1, 'Store name is required'),
});

export const updateStoreSchema = z.object({
    id: z.number().int('Store ID must be an integer'),
    name: z.string().min(1, 'Store name is required'),
});
