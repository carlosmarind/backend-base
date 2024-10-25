import express, { NextFunction, Request, Response } from 'express';
import { validateUserForJwtToken, verifyJwtToken } from '../auth.js';
import { User, users } from '../data/users.js';

let labRouter = express.Router();

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
const MAX_RANDOM = 1000;

let getLoginUrlPath = `login-${getRandomInt(MAX_RANDOM)}`
let loginUrlPath = `authenticate-${getRandomInt(MAX_RANDOM)}`
let createUserPath = `create-user-${getRandomInt(MAX_RANDOM)}`
let deleteUserUrlPath = `delete-user-${getRandomInt(MAX_RANDOM)}`
let queryUserUrlPath = `query-user-${getRandomInt(MAX_RANDOM)}`

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '')
    verifyJwtToken(token!) ? next() : res.status(401).json({ message: 'Acceso no autorizado' });
};

labRouter.get("/", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    let response = {
        queryLoginUrl: `${fullUrl}/${getLoginUrlPath}`,
        queryMethod: 'GET'
    }
    res.send(response);
});

labRouter.get(`/${getLoginUrlPath}`, (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + '/api';
    let response = {
        queryLoginUrl: `${fullUrl}/${loginUrlPath}`,
        queryMethod: 'POST'
    }
    res.send(response);
});

labRouter.post(`/${loginUrlPath}`, (req, res) => {

    let fullUrl = req.protocol + '://' + req.get('host') + '/api';
    const json = req.body;
    console.log(json)
    let validation = validateUserForJwtToken(json.username, json.password);

    if (validation.isAuthenticated) {
        let response = {
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
        }
        return res.status(200).send(response);
    }
    return res.status(401).send({ message: 'Usuario o contraseña no validos' });
});

labRouter.post(`/${createUserPath}`, validateJwt, (req, res) => {
    const json = req.body as User;
    users.push(json);
    res.status(200).send(users);
});

labRouter.delete(`/${deleteUserUrlPath}`, validateJwt, (req, res) => {
    const json = req.body as User;
    let newUsers = users.filter(user => user.id !== json.id);
    res.status(200).send(newUsers);
});

labRouter.get(`/${queryUserUrlPath}`, validateJwt, (req, res) => {
    res.status(200).send(users);
});

export default labRouter;