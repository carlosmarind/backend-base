import express from 'express';
import { validateUser, validateUserForJwtToken } from '../auth.js';
import { configuration } from '../config/index.js';

let mainRouter = express.Router();

mainRouter.get("/", (_req, res) => {
    res.send(`Hola mundo al usuario ${configuration.username}`);
});

mainRouter.get("/api-key", (_req, res) => {
    res.send(`la apikey de mi aplicacion es: ${configuration.apikey}`);
});

mainRouter.post('/login', (req, res) => {
    const json = req.body;
    let validation = validateUser(json.username, json.password);
    if (validation.isAuthenticated) {
        return res.json({
            status: 200,
            success: true,
            message: 'Usuario autenticado con exito',
            metadata: validation
        });
    } else {
        return res.status(401).json({
            status: 401,
            success: false,
            message: "Usuario no encontrado o contraseña incorrecta",
        });
    }
});

mainRouter.post('/auth', (req, res) => {
    const json = req.body;
    let validation = validateUserForJwtToken(json.username, json.password);
    if (validation.isAuthenticated) {
        return res.json({
            status: 200,
            success: true,
            message: "Autenticacion correcta",
            token: validation.token,
        });
    } else {
        return res.status(401).json({
            status: 401,
            success: false,
            message: "Usuario no encontrado o contraseña incorrecta",
        });
    }
});

export default mainRouter;