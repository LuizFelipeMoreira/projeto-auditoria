import z from 'zod';

export const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Email must be valid'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['ADMIN', 'FUNCIONARIO'], 'Role must be either ADMIN or FUNCIONARIO'),
    lojaId: z.number().int('Loja ID must be an integer'),
});

export const signinSchema = z.object({
    email: z.email('Email must be valid'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});
