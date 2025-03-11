import express from 'express';
import cors from 'cors';
import { registerRoute } from './routes/register.js';
import { loginRoute } from './routes/login.js';
import { logger } from './util/logger.js';
import { globalErrorHandler } from './util/globalErrorHandler.js';
import { connectMongo } from './util/connections.js';
const app = express();
const port = 3000;

connectMongo();//this is to connect to mongodb.
app.use(cors());
app.use(express.json());
app.use(logger);//To log all incoming requests. //make sure in future that this is to handle ddos attack, i.e. not to let process request if ddos.

app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.get('/', (req, res) => {
    res.send('Hello, TypeScript and Express!');
});

app.use(globalErrorHandler);//To handle all Unhandled exceptions.

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});