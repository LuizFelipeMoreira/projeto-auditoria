import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import { AuthController } from './controllers/AuthControllers';
import { StoreController } from './controllers/StoreController';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { FinanceRequestController } from './controllers/FinanceRequestController';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';

const app = express();

app.use(cors());

useExpressServer(app, {
    controllers: [AuthController, StoreController, FinanceRequestController],
    middlewares: [LoggerMiddleware, ErrorHandlerMiddleware],
    validation: true,
    development: true,
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
