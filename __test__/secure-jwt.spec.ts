import request from 'supertest';
import express from 'express';
import secureJwtRouter from '../src/routes/secure-jwt';
import { verifyJwtToken } from '../src/auth';

jest.mock('../src/auth');

const app = express();
app.use(express.json());
app.use('/secure', secureJwtRouter);

describe('secure-jwt routes', () => {
    beforeEach(() => {
        (verifyJwtToken as jest.Mock).mockClear();
    });

    it('should return 401 if token is invalid', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(false);
        const response = await request(app).get('/secure/get_endpoint').set('Authorization', 'Bearer invalidtoken');
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Acceso no autorizado' });
    });

    it('should return 200 for valid GET request', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(true);
        const response = await request(app).get('/secure/get_endpoint').set('Authorization', 'Bearer validtoken');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Este es un endpoint GET protegido.' });
    });

    it('should return 200 for valid POST request', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(true);
        const response = await request(app).post('/secure/post_endpoint').send({ data: 'test' }).set('Authorization', 'Bearer validtoken');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Este es un endpoint POST protegido.', receivedData: { data: 'test' } });
    });

    it('should return 200 for valid PUT request', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(true);
        const response = await request(app).put('/secure/put_endpoint').send({ data: 'test' }).set('Authorization', 'Bearer validtoken');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Este es un endpoint PUT protegido.', receivedData: { data: 'test' } });
    });

    it('should return 200 for valid DELETE request', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(true);
        const response = await request(app).delete('/secure/delete_endpoint').set('Authorization', 'Bearer validtoken');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Este es un endpoint DELETE protegido.' });
    });
});