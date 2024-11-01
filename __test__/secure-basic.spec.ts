import request from 'supertest';
import express from 'express';
import secureBasicRouter from '../src/routes/secure-basic';
import { verifyBasicAuth } from '../src/auth';

jest.mock('../src/auth');

const app = express();
app.use(express.json());
app.use('/secure', secureBasicRouter);

describe('secureBasicRouter', () => {
    beforeEach(() => {
        (verifyBasicAuth as jest.Mock).mockClear();
    });

    const validToken = 'validToken';
    const invalidToken = 'invalidToken';

    test('GET /secure/get_endpoint - success', async () => {
        (verifyBasicAuth as jest.Mock).mockReturnValue(true);

        const response = await request(app)
            .get('/secure/get_endpoint')
            .set('Authorization', `Basic ${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Este es un endpoint GET protegido.' });
    });

    test('POST /secure/post_endpoint - success', async () => {
        (verifyBasicAuth as jest.Mock).mockReturnValue(true);

        const response = await request(app)
            .post('/secure/post_endpoint')
            .set('Authorization', `Basic ${validToken}`)
            .send({ data: 'test' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Este es un endpoint POST protegido.', receivedData: { data: 'test' } });
    });

    test('PUT /secure/put_endpoint - success', async () => {
        (verifyBasicAuth as jest.Mock).mockReturnValue(true);

        const response = await request(app)
            .put('/secure/put_endpoint')
            .set('Authorization', `Basic ${validToken}`)
            .send({ data: 'test' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Este es un endpoint PUT protegido.', receivedData: { data: 'test' } });
    });

    test('DELETE /secure/delete_endpoint - success', async () => {
        (verifyBasicAuth as jest.Mock).mockReturnValue(true);

        const response = await request(app)
            .delete('/secure/delete_endpoint')
            .set('Authorization', `Basic ${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Este es un endpoint DELETE protegido.' });
    });

    test('GET /secure/get_endpoint - unauthorized', async () => {
        (verifyBasicAuth as jest.Mock).mockReturnValue(false);

        const response = await request(app)
            .get('/secure/get_endpoint')
            .set('Authorization', `Basic ${invalidToken}`);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Acceso no autorizado' });
    });

    // Repeat unauthorized tests for POST, PUT, DELETE similarly
});