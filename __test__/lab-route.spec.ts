import request from 'supertest';
import express from 'express';
import labRouter from '../src/routes/lab-route';
import { users } from '../src/data/users';
import { validateUserForJwtToken, verifyJwtToken } from '../src/auth';


jest.mock('../src/auth');
jest.mock('../src/data/users', () => ({
    users: []
}));

jest.mock('../src/app/utils', () => ({
    getRandomInt: jest.fn(() => 0)
}));

const app = express();
app.use(express.json());
app.use('/lab', labRouter);

describe('Lab Router', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should return login URL on GET /lab', async () => {
        const res = await request(app).get('/lab');
        expect(res.status).toBe(200);
        expect(res.body.queryLoginUrl).toMatch(/login-\d+/);
        expect(res.body.queryMethod).toBe('GET');
    });

    it('should return authenticate URL on GET /lab/login-<random>', async () => {
        const res = await request(app).get(`/lab/login-0`);
        expect(res.status).toBe(200);
        expect(res.body.queryLoginUrl).toMatch(/authenticate-\d+/);
        expect(res.body.queryMethod).toBe('POST');
    });

    it('should authenticate user on POST /lab/authenticate-<random>', async () => {
        (validateUserForJwtToken as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            token: 'fake-token'
        });

        const res = await request(app)
            .post(`/lab/authenticate-0`)
            .send({ username: 'test', password: 'test' });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Usuario autenticado con exito');
        expect(res.body.token).toBe('fake-token');
    });

    it('should not authenticate invalid user on POST /lab/authenticate-<random>', async () => {
        (validateUserForJwtToken as jest.Mock).mockReturnValue({
            isAuthenticated: false
        });

        const res = await request(app)
            .post(`/lab/authenticate-0`)
            .send({ username: 'test', password: 'wrong' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Usuario o contraseña no validos');
    });

    it('should create a new user on POST /lab/create-user-<random>', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(true);

        const newUser = { id: '1', name: 'newuser', email: 'password' };
        const res = await request(app)
            .post(`/lab/create-user-0`)
            .set('Authorization', 'Bearer fake-token')
            .send(newUser);

        expect(res.status).toBe(201);
        expect(users).toContainEqual(newUser);
    });

    it('should not create an existing user on POST /lab/create-user-<random>', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(true);

        const existingUser = { id: '1', name: 'existinguser', email: 'password' };
        users.push(existingUser);

        const res = await request(app)
            .post(`/lab/create-user-0`)
            .set('Authorization', 'Bearer fake-token')
            .send(existingUser);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Usuario ya existe');
    });

    it('should delete an existing user on DELETE /lab/delete-user-<random>', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(true);

        const userToDelete = { id: '2', name: 'userToDelete', email: 'password' };
        users.push(userToDelete);

        const res = await request(app)
            .delete(`/lab/delete-user-0`)
            .set('Authorization', 'Bearer fake-token')
            .send({ id: '2' });

        expect(res.status).toBe(200);
        expect(users).not.toContainEqual(userToDelete);
    });

    it('should not delete a non-existing user on DELETE /lab/delete-user-<random>', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(true);

        const res = await request(app)
            .delete(`/lab/delete-user-0`)
            .set('Authorization', 'Bearer fake-token')
            .send({ id: 'non-existing' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Usuario no encontrado');
    });

    it('should return all users on GET /lab/query-user-<random>', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(true);

        const res = await request(app)
            .get(`/lab/query-user-0`)
            .set('Authorization', 'Bearer fake-token');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(users);
    });

    it('should return 401 if JWT token is missing', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(false);
        const res = await request(app)
            .post(`/lab/create-user-0`)
            .send({ id: '1', name: 'newuser', email: 'password' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Acceso no autorizado');
    });

    it('should return 401 if JWT token is invalid', async () => {
        (verifyJwtToken as jest.Mock).mockReturnValue(false);

        const res = await request(app)
            .post(`/lab/create-user-0`)
            .set('Authorization', 'Bearer invalid-token')
            .send({ id: '1', name: 'newuser', email: 'password' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Acceso no autorizado');
    });
});