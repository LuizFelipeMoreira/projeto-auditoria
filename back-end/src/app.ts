import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import { AuthController } from './controllers/AuthControllers';
import { StoreController } from './controllers/StoreController';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { FinanceRequestController } from './controllers/FinanceRequestController';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware';
//import { EmailService } from './services/EmailService';

const app = express();

app.use(cors());

// const emailService = new EmailService();

// emailService
//     .sendEmail(
//         'Felipe',
//         'noturnog9@gmail.com',
//         'luizfelipemlds65@gmail.com',
//         'Teste de envio',
//         'Esse aqui é apenas um teste de envio de e-mail'
//     )
//     .then((info) => console.log('E-mail enviado:', info))
//     .catch((err) => console.error('Erro ao enviar:', err));

useExpressServer(app, {
    controllers: [AuthController, StoreController, FinanceRequestController],
    middlewares: [LoggerMiddleware, ErrorHandlerMiddleware],
    validation: true,
    development: true,
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
