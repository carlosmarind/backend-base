import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from './data/db.js';
import { configuration } from './config/index.js';

export interface JwtRequest extends Request {
    token: string | JwtPayload;
}

export const verifyApiKey = (token: string) => {
    return token === `${configuration.apikey}`;
};

export const verifyBasicAuth = (token: string = "") => {
    let decryptedToken = Buffer.from(token, 'base64').toString('ascii').trim();
    const [username, password] = decryptedToken.split(':');
    return validateUser(username, password).isAuthenticated;
};

export const verifyJwtToken = (token: string = "") => {
    try {
        jwt.verify(token, configuration.jwtSecretKey);
        return true;
    } catch (err) {
        return false;
    }
};

export const validateUser = (user: string, password: string) => {
    if (user === db.user.username && password === db.user.password) {
        let userInfo = {
            username: db.user.username,
            email: db.user.email,
            role: db.user.role
        }

        return { isAuthenticated: true, ...userInfo };
    }
    return { isAuthenticated: false };
}

export const validateUserForJwtToken = (user: string, password: string) => {

    if (user === db.user.username && password === db.user.password) {
        let token = jwt.sign(
            {
                username: db.user.username,
                email: db.user.email,
                role: db.user.role
            },
            configuration.jwtSecretKey,
            {
                expiresIn: "1d",
            });
        return { isAuthenticated: true, token };
    }
    return { isAuthenticated: false };
}