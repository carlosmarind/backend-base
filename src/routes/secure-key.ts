import express from 'express';
import { verifyApiKey } from '../auth.js';

let secureRouter = express.Router();

secureRouter.use((req, res, next) => {
    const token = req.headers["x-api-key"] as string;
    verifyApiKey(token!) ? next() : res.status(401).json({ message: 'Acceso no autorizado' });
})

// Endpoint GET
secureRouter.get('/get_endpoint', (_req, res) => {
    res.json({ message: 'Este es un endpoint GET protegido.' });
});

// Endpoint POST
secureRouter.post('/post_endpoint', (req, res) => {
    res.json({ message: 'Este es un endpoint POST protegido.', receivedData: req.body });
});

// Endpoint PUT
secureRouter.put('/put_endpoint', (req, res) => {
    res.json({ message: 'Este es un endpoint PUT protegido.', receivedData: req.body });
});

// Endpoint DELETE
secureRouter.delete('/delete_endpoint', (_req, res) => {
    res.json({ message: 'Este es un endpoint DELETE protegido.' });
});

export default secureRouter;