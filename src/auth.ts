import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from './data/db.js';
import { configuration } from './config.js';

export interface JwtRequest extends Request {
    token: string | JwtPayload;
}

export const verifyApiKey = (token: string) => {
    return token === `${configuration.apikey}`;
};

export const verifyBasicAuth = (token: string) => {

    if (token === undefined) {
        return false;
    }

    let decryptedToken = Buffer.from(token, 'base64').toString('ascii').trim();
    const [username, password] = decryptedToken.split(':');
    return validateUser(username, password).isAuthenticated;
};

export const verifyJwtToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, configuration.jwtSecretKey);
        console.log(decoded)
        return true;
    } catch (err) {
        return false;
    }
};

export const validateUser = (user: string, password: string) => {
    if (user === db.user.username && password === db.user.password) {
        return { isAuthenticated: true, username: db.user.username, email: db.user.email, role: db.user.role };
    }
    return { isAuthenticated: false };
}

export const validateUserForJwtToken = (user: string, password: string) => {

    let secret: string = configuration.jwtSecretKey;
    console.log('secret:', secret);
    if (user === db.user.username && password === db.user.password) {
        let token = jwt.sign(
            {
                username: db.user.username,
                email: db.user.email,
                role: db.user.role
            },
            secret,
            {
                expiresIn: "1d",
            });
        console.log('token:', token);
        return { isAuthenticated: true, token };
    }
    return { isAuthenticated: false };
}