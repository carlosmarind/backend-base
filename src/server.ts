import cors from 'cors';
import express from 'express';
import secureRouter from "./routes/secure-key";
import secureJwtRouter from "./routes/secure-jwt";
import secureBasicRouter from "./routes/secure-basic";
import mainRouter from "./routes/main-route";
import labRouter from './routes/lab-route';
import lab2Router from './routes/lab2-route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', mainRouter);
app.use('/secure-key', secureRouter);
app.use('/secure-basic', secureBasicRouter);
app.use('/secure-jwt', secureJwtRouter);
app.use('/api', labRouter);
app.use('/lab-2', lab2Router);

export default app;