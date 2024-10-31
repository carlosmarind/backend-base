import express from 'express';
import { verifyBasicAuth } from '../auth.js';

let secureBasicRouter = express.Router();

secureBasicRouter.use((req, res, next) => {
    const token = req.headers.authorization?.replace('Basic ', '')
    verifyBasicAuth(token!) ? next() : res.status(401).json({ message: 'Acceso no autorizado' });
})

// Endpoint GET
secureBasicRouter.get('/get_endpoint', (_req, res) => {
    res.json({ message: 'Este es un endpoint GET protegido.' });
});

// Endpoint POST
secureBasicRouter.post('/post_endpoint', (req, res) => {
    res.json({ message: 'Este es un endpoint POST protegido.', receivedData: req.body });
});

// Endpoint PUT
secureBasicRouter.put('/put_endpoint', (req, res) => {
    res.json({ message: 'Este es un endpoint PUT protegido.', receivedData: req.body });
});

// Endpoint DELETE
secureBasicRouter.delete('/delete_endpoint', (_req, res) => {
    res.json({ message: 'Este es un endpoint DELETE protegido.' });
});

export default secureBasicRouter;