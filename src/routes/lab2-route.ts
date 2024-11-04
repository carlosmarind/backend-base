import express, { NextFunction, Request, Response } from 'express';
import { esPalindromo } from '../app/palabras';
import { esPrimo } from '../app/numeros';

const labRouter = express.Router();

labRouter.get("/palindromo/:frase", (req, res) => {
    const { frase } = req.params
    res.send(`Hola, La frase ingresada ${esPalindromo(frase) ? "es" : "no es"} palindromo`);
});

labRouter.get("/primo/:numero", (req, res) => {
    const { numero } = req.params
    res.send(`Hola, el numero ingresado ${esPrimo(+numero) ? "es" : "no es"} un numero primo`);
});

export default labRouter;