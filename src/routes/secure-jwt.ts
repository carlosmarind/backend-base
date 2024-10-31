/* Endpoints utilizando jwt */
import express from 'express';
import { verifyJwtToken } from '../auth.js';

let secureJwtRouter = express.Router();

secureJwtRouter.use((req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '')
    verifyJwtToken(token!) ? next() : res.status(401).json({ message: 'Acceso no autorizado' });
})

// Endpoint GET
secureJwtRouter.get('/get_endpoint', (_req, res) => {
    res.json({ message: 'Este es un endpoint GET protegido.' });
});

// Endpoint POST
secureJwtRouter.post('/post_endpoint', (req, res) => {
    res.json({ message: 'Este es un endpoint POST protegido.', receivedData: req.body });
});

// Endpoint PUT
secureJwtRouter.put('/put_endpoint', (req, res) => {
    res.json({ message: 'Este es un endpoint PUT protegido.', receivedData: req.body });
});

// Endpoint DELETE
secureJwtRouter.delete('/delete_endpoint', (_req, res) => {
    res.json({ message: 'Este es un endpoint DELETE protegido.' });
});

export default secureJwtRouter;