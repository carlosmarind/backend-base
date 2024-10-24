import express, { Request, Response } from 'express';
import { verifyBasicAuth } from '../auth.js';

let secureBasicRouter = express.Router();

secureBasicRouter.use((req, res, next) => {
    const token = req.headers.authorization?.replace('Basic ', '')
    verifyBasicAuth(token!) ? next() : res.status(401).json({ message: 'Acceso no autorizado' });
})

// Endpoint GET
secureBasicRouter.get('/get_endpoint', (req: Request, res: Response) => {
    res.json({ message: 'Este es un endpoint GET protegido.' });
});

// Endpoint POST
secureBasicRouter.post('/post_endpoint', (req: Request, res: Response) => {
    const data = req.body;
    res.json({ message: 'Este es un endpoint POST protegido.', receivedData: data });
});

// Endpoint PUT
secureBasicRouter.put('/put_endpoint', (req: Request, res: Response) => {
    const data = req.body;
    res.json({ message: 'Este es un endpoint PUT protegido.', receivedData: data });
});

// Endpoint DELETE
secureBasicRouter.delete('/delete_endpoint', (_req: Request, res: Response) => {
    res.json({ message: 'Este es un endpoint DELETE protegido.' });
});

export default secureBasicRouter;