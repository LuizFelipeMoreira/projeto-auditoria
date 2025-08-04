import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { useExpressServer } from 'routing-controllers';
import { AuthController } from './controllers/AuthControllers';

const app = express();

app.use(cors());

useExpressServer(app, {
    controllers: [AuthController],
    middlewares: [],
    validation: true,
    development: true,
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
