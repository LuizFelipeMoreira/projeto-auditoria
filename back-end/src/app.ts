import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import { AuthController } from './controllers/auth.controller';
import { FinanceRequestController } from './controllers/finance-request.controller';
import { StoreController } from './controllers/store.controller';
import { ErrorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { appContainer } from './container';
const app = express();

app.use(cors());

useContainer(appContainer);

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
