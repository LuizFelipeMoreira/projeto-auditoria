import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import { AuthController } from './controllers/AuthControllers';
import { FinanceRequestController } from './controllers/FinanceRequestController';
import { StoreController } from './controllers/StoreController';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';

const app = express();

app.use(cors());

useExpressServer(app, {
    controllers: [AuthController, StoreController, FinanceRequestController],
    middlewares: [LoggerMiddleware, ErrorHandlerMiddleware],
    validation: false,
    defaultErrorHandler: false,
    development: true,
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
