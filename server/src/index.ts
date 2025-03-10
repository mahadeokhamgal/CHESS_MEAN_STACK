import express, { Request, Response } from 'express';

const registerRoute = require('./routes/register.ts');
import { logger } from './util/logger.ts';
import { globalErrorHandler } from './util/globalErrorHandler.ts';

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger);//To log all incoming requests.

app.use('/register', registerRoute);//make sure in future that this is to handle ddos attack.

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript and Express!');
});

app.use(globalErrorHandler);//To handle all Unhandled exceptions.

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});