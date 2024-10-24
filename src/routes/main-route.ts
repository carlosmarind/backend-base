import express, { Request, Response } from 'express';
import { validateUser, validateUserForJwtToken } from '../auth.js';
import { configuration } from '../config.js';
let mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.send(`Hola mundo al usuario ${configuration.username}`);
});

mainRouter.get("/api-key", (req, res) => {
    res.send(`la apikey de mi aplicacion es: ${configuration.apikey}`);
});

mainRouter.post('/login', (req: Request, res: Response) => {
    const json = req.body;
    console.log(json);
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

mainRouter.post('/auth', (req: Request, res: Response) => {
    const json = req.body;
    console.log(json);
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