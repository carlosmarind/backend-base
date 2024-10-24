/* Endpoints utilizando jwt */

import express, { Request, Response, } from 'express';
import { verifyJwtToken } from '../auth.js';

let secureJwtRouter = express.Router();

secureJwtRouter.use((req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '')
    verifyJwtToken(token!) ? next() : res.status(401).json({ message: 'Acceso no autorizado' });
 })


// Endpoint GET
secureJwtRouter.get('/get_endpoint', (req: Request, res: Response) => {
    res.json({ message: 'Este es un endpoint GET protegido.' });
    console.log(req.headers);
});

// Endpoint POST
secureJwtRouter.post('/post_endpoint', (req: Request, res: Response) => {
    const data = req.body;
    res.json({ message: 'Este es un endpoint POST protegido.', receivedData: data });
});

// Endpoint PUT
secureJwtRouter.put('/put_endpoint', (req: Request, res: Response) => {
    const data = req.body;
    res.json({ message: 'Este es un endpoint PUT protegido.', receivedData: data });
});

// Endpoint DELETE
secureJwtRouter.delete('/delete_endpoint', (_req: Request, res: Response) => {
    res.json({ message: 'Este es un endpoint DELETE protegido.' });
});

export default secureJwtRouter;