import express from 'express';
import dotenv from 'dotenv';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';

dotenv.config();

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando' });
});

app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
});

export default app;
