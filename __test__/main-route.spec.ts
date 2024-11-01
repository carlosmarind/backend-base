import request from 'supertest';
import express from 'express';
import mainRouter from '../src/routes/main-route.js';
import { validateUser, validateUserForJwtToken } from '../src/auth.js';
import { configuration } from '../src/config';

jest.mock('../src/auth.js');
jest.mock('../src/config.js');

const app = express();
app.use(express.json());
app.use('/', mainRouter);

describe('Main Router', () => {
    beforeAll(() => {
        configuration.username = 'testuser';
        configuration.apikey = 'testapikey';
    });

    test('GET / should return greeting message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hola mundo al usuario testuser');
    });

    test('GET /api-key should return API key', async () => {
        const response = await request(app).get('/api-key');
        expect(response.status).toBe(200);
        expect(response.text).toBe('la apikey de mi aplicacion es: testapikey');
    });

    test('POST /login should authenticate user', async () => {
        (validateUser as jest.Mock).mockReturnValue({ isAuthenticated: true });

        const response = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpassword' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            success: true,
            message: 'Usuario autenticado con exito',
            metadata: { isAuthenticated: true }
        });
    });

    test('POST /login should fail authentication', async () => {
        (validateUser as jest.Mock).mockReturnValue({ isAuthenticated: false });

        const response = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            status: 401,
            success: false,
            message: "Usuario no encontrado o contraseña incorrecta",
        });
    });

    test('POST /auth should return JWT token', async () => {
        (validateUserForJwtToken as jest.Mock).mockReturnValue({ isAuthenticated: true, token: 'testtoken' });

        const response = await request(app)
            .post('/auth')
            .send({ username: 'testuser', password: 'testpassword' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            success: true,
            message: "Autenticacion correcta",
            token: 'testtoken',
        });
    });

    test('POST /auth should fail JWT authentication', async () => {
        (validateUserForJwtToken as jest.Mock).mockReturnValue({ isAuthenticated: false });

        const response = await request(app)
            .post('/auth')
            .send({ username: 'testuser', password: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            status: 401,
            success: false,
            message: "Usuario no encontrado o contraseña incorrecta",
        });
    });
});