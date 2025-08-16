import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import { AuthController } from './controllers/AuthControllers';
import { StoreController } from './controllers/StoreController';
import { LoggerMiddleware } from './middlewares/ErrorHandler';

const app = express();

app.use(cors());

useExpressServer(app, {
    controllers: [AuthController, StoreController],
    middlewares: [LoggerMiddleware],
    validation: true,
    development: true,
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
