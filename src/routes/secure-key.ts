import express, { Request, Response } from 'express';
import { verifyApiKey } from '../auth.js';

let secureRouter = express.Router();

secureRouter.use((req, res, next) => {
    const token = req.headers["x-api-key"] as string;
    verifyApiKey(token!) ? next() : res.status(401).json({ message: 'Acceso no autorizado' });
})

// Endpoint GET
secureRouter.get('/get_endpoint', (req: Request, res: Response) => {
    res.json({ message: 'Este es un endpoint GET protegido.' });
    console.log(req.headers);
});

// Endpoint POST
secureRouter.post('/post_endpoint', (req: Request, res: Response) => {
    const data = req.body;
    res.json({ message: 'Este es un endpoint POST protegido.', receivedData: data });
});

// Endpoint PUT
secureRouter.put('/put_endpoint', (req: Request, res: Response) => {
    const data = req.body;
    res.json({ message: 'Este es un endpoint PUT protegido.', receivedData: data });
});

// Endpoint DELETE
secureRouter.delete('/delete_endpoint', (_req: Request, res: Response) => {
    res.json({ message: 'Este es un endpoint DELETE protegido.' });
});

export default secureRouter;