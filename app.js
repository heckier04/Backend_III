import express from 'express';
import dotenv from 'dotenv';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionRouter from './routes/adoption.router.js';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

dotenv.config();

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml')

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando' });
});

app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
});

export default app;
