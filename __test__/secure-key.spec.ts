import request from 'supertest';
import express from 'express';
import secureRouter from '../src/routes/secure-key';
import { verifyApiKey } from '../src/auth';

jest.mock('../src/auth');

const app = express();
app.use(express.json());
app.use('/secure', secureRouter);

describe('Secure Router', () => {
    beforeEach(() => {
        (verifyApiKey as jest.Mock).mockClear();
    });

    it('should return 401 if API key is missing', async () => {
        const response = await request(app).get('/secure/get_endpoint');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Acceso no autorizado');
    });

    it('should return 401 if API key is invalid', async () => {
        (verifyApiKey as jest.Mock).mockReturnValue(false);
        const response = await request(app).get('/secure/get_endpoint').set('x-api-key', 'invalid-key');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Acceso no autorizado');
    });

    it('should allow access to GET endpoint with valid API key', async () => {
        (verifyApiKey as jest.Mock).mockReturnValue(true);
        const response = await request(app).get('/secure/get_endpoint').set('x-api-key', 'valid-key');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Este es un endpoint GET protegido.');
    });

    it('should allow access to POST endpoint with valid API key', async () => {
        (verifyApiKey as jest.Mock).mockReturnValue(true);
        const response = await request(app).post('/secure/post_endpoint').set('x-api-key', 'valid-key').send({ data: 'test' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Este es un endpoint POST protegido.');
        expect(response.body.receivedData).toEqual({ data: 'test' });
    });

    it('should allow access to PUT endpoint with valid API key', async () => {
        (verifyApiKey as jest.Mock).mockReturnValue(true);
        const response = await request(app).put('/secure/put_endpoint').set('x-api-key', 'valid-key').send({ data: 'test' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Este es un endpoint PUT protegido.');
        expect(response.body.receivedData).toEqual({ data: 'test' });
    });

    it('should allow access to DELETE endpoint with valid API key', async () => {
        (verifyApiKey as jest.Mock).mockReturnValue(true);
        const response = await request(app).delete('/secure/delete_endpoint').set('x-api-key', 'valid-key');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Este es un endpoint DELETE protegido.');
    });
});