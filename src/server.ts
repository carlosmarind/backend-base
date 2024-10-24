import cors from 'cors';
import express, { } from 'express';
import 'dotenv/config'
import secureRouter from "./routes/secure-key.js";
import secureJwtRouter from "./routes/secure-jwt.js";
import secureBasicRouter from "./routes/secure-basic.js";
import mainRouter from "./routes/main-route.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', mainRouter);
app.use('/secure-key', secureRouter);
app.use('/secure-basic', secureBasicRouter);
app.use('/secure-jwt', secureJwtRouter);

export default app;