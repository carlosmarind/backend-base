import express, { NextFunction, Request, Response } from 'express';
import { validateUserForJwtToken, verifyJwtToken } from '../auth.js';
import { User, users } from '../data/users.js';
import { getRandomInt } from '../app/utils';

const MAX_RANDOM = 1000;

const getLoginUrlPath = `login-${getRandomInt(MAX_RANDOM)}`;
const loginUrlPath = `authenticate-${getRandomInt(MAX_RANDOM)}`;
const createUserPath = `create-user-${getRandomInt(MAX_RANDOM)}`;
const deleteUserUrlPath = `delete-user-${getRandomInt(MAX_RANDOM)}`;
const queryUserUrlPath = `query-user-${getRandomInt(MAX_RANDOM)}`;

const getFullUrl = (req: Request) => `${req.protocol}://${req.get('host')}${req.baseUrl}`;

const labRouter = express.Router();

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!verifyJwtToken(token)) {
        return res.status(401).json({ message: 'Acceso no autorizado' })
    }

    next();
};

labRouter.get("/", (req, res) => {
    const fullUrl = getFullUrl(req);
    res.send({
        queryLoginUrl: `${fullUrl}/${getLoginUrlPath}`,
        queryMethod: 'GET'
    });
});

labRouter.get(`/${getLoginUrlPath}`, (req, res) => {
    const fullUrl = getFullUrl(req);
    res.send({
        queryLoginUrl: `${fullUrl}/${loginUrlPath}`,
        queryMethod: 'POST'
    });
});

labRouter.post(`/${loginUrlPath}`, (req, res) => {
    const { username, password } = req.body;
    const validation = validateUserForJwtToken(username, password);

    if (validation.isAuthenticated) {
        const fullUrl = getFullUrl(req);
        return res.status(200).send({
            message: "Usuario autenticado con exito",
            createUser: {
                url: `${fullUrl}/${createUserPath}`,
                method: 'POST'
            },
            deleteUser: {
                url: `${fullUrl}/${deleteUserUrlPath}`,
                method: 'DELETE'
            },
            queryUser: {
                url: `${fullUrl}/${queryUserUrlPath}`,
                method: 'GET'
            },
            token: validation.token
        });
    }
    return res.status(401).send({ message: 'Usuario o contraseña no validos' });
});

labRouter.post(`/${createUserPath}`, validateJwt, (req, res) => {
    const newUser = req.body as User;
    const userIndex = users.findIndex(user => user.id === newUser.id);

    if (userIndex !== -1) {
        return res.status(401).send({ message: 'Usuario ya existe' });
    }

    users.push(newUser);
    return res.status(201).send(users);
});

labRouter.delete(`/${deleteUserUrlPath}`, validateJwt, (req, res) => {
    const { id } = req.body as User;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return res.status(200).send(users);
    }
    return res.status(401).send({ message: 'Usuario no encontrado' });
});

labRouter.get(`/${queryUserUrlPath}`, validateJwt, (_req, res) => {
    return res.status(200).send(users);
});

export default labRouter;