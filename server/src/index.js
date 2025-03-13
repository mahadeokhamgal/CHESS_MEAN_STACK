import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { registerRoute } from './routes/register.js';
import { loginRoute } from './routes/login.js';
import { usersRoute } from './routes/users.js';
import { logger } from './util/logger.js';
import { validatejwt } from './util/validatejwt.js';
import { globalErrorHandler } from './util/globalErrorHandler.js';
import { connectMongo } from './util/connections.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

connectMongo();
app.use(cors({
  origin: 'http://localhost:57001',
  credentials: true,// Allow cookies to be sent
}));

app.use(cookieParser());
app.use(express.json());
app.use(logger);//To log all incoming requests. //make sure in future that this is to handle ddos attack, i.e. not to let process request if ddos.

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/', validatejwt);
app.use('/users', usersRoute);//To-do this route is to be checked for valid jwt

app.get('/', (req, res) => {
    res.send('Hello, TypeScript and Express!');
});

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});