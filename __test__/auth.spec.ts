import { verifyApiKey, verifyBasicAuth, verifyJwtToken, validateUser, validateUserForJwtToken } from '../src/auth';
import jwt from 'jsonwebtoken';
import { db } from '../src/data/db';
import { configuration } from '../src/config';

jest.mock('../src/data/db');
jest.mock('../src/config');

describe('Auth Tests', () => {
    beforeAll(() => {
        db.user = {
            username: 'testuser',
            password: 'testpassword',
            email: 'testuser@example.com',
            role: ['user']
        };
        configuration.apikey = 'testapikey';
        configuration.jwtSecretKey = 'testsecretkey';
    });

    describe('verifyApiKey', () => {
        it('should return true for valid API key', () => {
            expect(verifyApiKey('testapikey')).toBe(true);
        });

        it('should return false for invalid API key', () => {
            expect(verifyApiKey('invalidapikey')).toBe(false);
        });
    });

    describe('verifyBasicAuth', () => {
        it('should return true for valid basic auth token', () => {
            const token = Buffer.from('testuser:testpassword').toString('base64');
            expect(verifyBasicAuth(token)).toBe(true);
        });

        it('should return false for invalid basic auth token', () => {
            const token = Buffer.from('invaliduser:invalidpassword').toString('base64');
            expect(verifyBasicAuth(token)).toBe(false);
        });

        it('should return false for invalid undef basic auth token', () => {
            const token = undefined;
            expect(verifyBasicAuth(token)).toBe(false);
        });
    });

    describe('verifyJwtToken', () => {
        it('should return true for valid JWT token', () => {
            const token = jwt.sign({ username: 'testuser' }, configuration.jwtSecretKey);
            expect(verifyJwtToken(token)).toBe(true);
        });

        it('should return false for invalid JWT token', () => {
            expect(verifyJwtToken('invalidtoken')).toBe(false);
        });

        it('should return false for undef JWT token', () => {
            expect(verifyJwtToken(undefined)).toBe(false);
        });
    });

    describe('validateUser', () => {
        it('should return user info for valid credentials', () => {
            const result = validateUser('testuser', 'testpassword');
            expect(result.isAuthenticated).toBe(true);

            expect(result).toHaveProperty('username');
            if ('username' in result) {
                expect(result.username).toBe('testuser');
            }
            expect(result).toHaveProperty('email');
            if ('email' in result) {
                expect(result.email).toBe('testuser@example.com');
            }
            expect(result).toHaveProperty('role');
            if ('role' in result) {
                expect(result.role).toContain('user');
            }
        });

        it('should return false for invalid credentials', () => {
            const result = validateUser('invaliduser', 'invalidpassword');
            expect(result.isAuthenticated).toBe(false);
        });
    });

    describe('validateUserForJwtToken', () => {
        it('should return token for valid credentials', () => {
            const result = validateUserForJwtToken('testuser', 'testpassword');
            expect(result.isAuthenticated).toBe(true);
            expect(result.token).toBeDefined();
        });

        it('should return false for invalid credentials', () => {
            const result = validateUserForJwtToken('invaliduser', 'invalidpassword');
            expect(result.isAuthenticated).toBe(false);
        });
    });
});