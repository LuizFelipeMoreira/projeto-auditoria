import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { useExpressServer } from 'routing-controllers';

const app = express();

app.use(cors);
app.use(express.json());

useExpressServer(app, {
    controllers: [],
    middlewares: [],
    validation: true,
    development: true,
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
