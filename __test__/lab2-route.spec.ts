import request from 'supertest';
import express from 'express';
import labRouter from '../src/routes/lab2-route';
import { esPalindromo } from '../src/app/palabras';
import { esPrimo } from '../src/app/numeros';

const app = express();

app.use('/lab2', labRouter);

describe('esPrimo', () => {
    test('should return false for numbers less than 2', () => {
        expect(esPrimo(0)).toBe(false);
        expect(esPrimo(1)).toBe(false);
    });

    test('should return true for prime numbers', () => {
        expect(esPrimo(2)).toBe(true);
        expect(esPrimo(3)).toBe(true);
        expect(esPrimo(5)).toBe(true);
        expect(esPrimo(7)).toBe(true);
    });

    test('should return false for non-prime numbers', () => {
        expect(esPrimo(4)).toBe(false);
        expect(esPrimo(6)).toBe(false);
        expect(esPrimo(8)).toBe(false);
        expect(esPrimo(9)).toBe(false);
    });
});

describe('esPalindromo', () => {
    test('should return true for a palindrome with spaces and mixed case', () => {
        expect(esPalindromo('A man a plan a canal Panama')).toBe(true);
    });

    test('should return true for a simple palindrome', () => {
        expect(esPalindromo('racecar')).toBe(true);
    });

    test('should return false for a non-palindrome', () => {
        expect(esPalindromo('hello')).toBe(false);
    });

    test('should return true for a palindrome with punctuation', () => {
        expect(esPalindromo('Madam in Eden Im Adam')).toBe(true);
    });

    test('should return true for an empty string', () => {
        expect(esPalindromo('')).toBe(true);
    });
});

describe('GET /lab2/palindromo/:frase', () => {
    it('should return that the phrase is a palindrome', async () => {
        const response = await request(app).get('/lab2/palindromo/ana');
        expect(response.text).toBe('Hola, La frase ingresada es palindromo');
    });

    it('should return that the phrase is not a palindrome', async () => {
        const response = await request(app).get('/lab2/palindromo/hello');
        expect(response.text).toBe('Hola, La frase ingresada no es palindromo');
    });
});

describe('GET /lab2/primo/:numero', () => {
    it('should return that the number is prime', async () => {
        const response = await request(app).get('/lab2/primo/7');
        expect(response.text).toBe('Hola, el numero ingresado es un numero primo');
    });

    it('should return that the number is not prime', async () => {
        const response = await request(app).get('/lab2/primo/4');
        expect(response.text).toBe('Hola, el numero ingresado no es un numero primo');
    });
});