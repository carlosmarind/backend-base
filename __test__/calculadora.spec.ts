import { describe, test, expect } from "@jest/globals";
import { restar, suma, operar, multiplicar, dividir, potencia, factorial } from "../src/calculadora.js";
import app from "../src/server.js";
import request from "supertest";

describe("Calculadora", () => {

    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola mundo al usuario undefined ");
            })
    });

        test("test de endpoint operar", async () => {
        return await request(app)
            .get("/operar?a=30&b=30&oper=suma")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("el resultado de la operacion suma de 30 y 30 es 60");
            })
    });



    test("sumar dos números", () => {

        let a: any = 100;
        let b: any = 200;
        expect(suma(a, b)).toBe(300); // 100 + 200 = 300
    
        a = 10;
        b = "a";
        expect(suma(a, b)).toBeNaN(); // "a" no es un número, debe retornar NaN
    
        a = undefined;
        b = 1;
        expect(() => { suma(a, b) }).toThrow("No se puede sumar indefinidos"); // a es undefined, debe lanzar un error
    
        a = null;
        b = 1;
        expect(() => { suma(a, b) }).toThrow("No se puede sumar indefinidos"); // a es null, debe lanzar un error
    
        a = 5;
        b = null;
        expect(() => { suma(a, b) }).toThrow("No se puede sumar indefinidos"); // b es null, debe lanzar un error
    
        a = NaN;
        b = 1;
        expect(suma(a, b)).toBeNaN(); // a es NaN, el resultado debe ser NaN
    
        a = 0;
        b = 0;
        expect(suma(a, b)).toBe(0); // 0 + 0 = 0
    
        a = -5;
        b = -10;
        expect(suma(a, b)).toBe(-15); // -5 + -10 = -15
    
        a = 1.5;
        b = 2.5;
        expect(suma(a, b)).toBe(4); // 1.5 + 2.5 = 4
    });

    test("operar dos números", () => {

        let a: any = 100;
        let b: any = 200;
    
        // Prueba para resta
        expect(operar("resta", b, a)).toBe(100); // 200 - 100 = 100
    
        // Prueba para suma
        a = 10;
        b = 20;
        expect(operar("suma", a, b)).toBe(30); // 10 + 20 = 30
    
        // Prueba para multiplicar
        a = 10;
        b = 5;
        expect(operar("multiplicar", a, b)).toBe(50); // 10 * 5 = 50
    
        // Prueba para dividir
        a = 20;
        b = 5;
        expect(operar("dividir", a, b)).toBe(4); // 20 / 5 = 4
    
        // Prueba de división por cero
        a = 10;
        b = 0;
        expect(() => { operar("dividir", a, b) }).toThrow("No se puede dividir por cero"); // Dividir por 0 debe lanzar un error
    
        // Prueba para potencia
        a = 2;
        b = 3;
        expect(operar("potencia", a, b)).toBe(8); // 2^3 = 8
    
        // Prueba para factorial
        a = 5;
        b= 1;
        expect(operar("factorial", a, b)).toBe(120); // 5! = 120
    
        // Prueba para valor no numérico
        a = 10;
        b = "a";
        expect(operar("suma", a, b)).toBeNaN(); // "a" no es un número, debe retornar NaN
    
        // Prueba para valores indefinidos
        a = undefined;
        b = 1;
        expect(() => { operar("suma", a, b) }).toThrow("No se puede sumar indefinidos"); // a es undefined, debe lanzar un error
    
        // Prueba para operación desconocida
        a = 10;
        b = 5;
        expect(() => { operar("desconocido", a, b) }).toThrow("Operación no soportada"); // Operación desconocida debe lanzar un error
    });

    test("restar dos números", () => {

        let a: any = 10;
        let b: any = 5;
        expect(restar(a, b)).toBe(5); // 10 - 5 = 5
    
        a = 0;
        b = 5;
        expect(restar(a, b)).toBe(-5); // 0 - 5 = -5
    
        a = 5;
        b = 0;
        expect(restar(a, b)).toBe(5); // 5 - 0 = 5
    
        a = "a";
        b = 5;
        expect(restar(a, b)).toBeNaN(); // "a" no es un número, debe retornar NaN
    
        a = 10;
        b = undefined;
        expect(() => { restar(a, b) }).toThrow("No se puede restar indefinidos"); // b es undefined, debe lanzar un error
    
        a = undefined;
        b = 5;
        expect(() => { restar(a, b) }).toThrow("No se puede restar indefinidos"); // a es undefined, debe lanzar un error
    });

    test("multiplicar dos números", () => {

        let a: any = 10;
        let b: any = 5;
        expect(multiplicar(a, b)).toBe(50); // 10 * 5 = 50
    
        a = 0;
        b = 5;
        expect(multiplicar(a, b)).toBe(0); // 0 * 5 = 0
    
        a = "a";
        b = 5;
        expect(multiplicar(a, b)).toBeNaN(); // "a" no es un número, debe retornar NaN
    
        a = undefined;
        b = 5;
        expect(() => { multiplicar(a, b) }).toThrow("No se puede multiplicar indefinidos"); // a es undefined, debe lanzar un error
    
        a = 10;
        b = undefined;
        expect(() => { multiplicar(a, b) }).toThrow("No se puede multiplicar indefinidos"); // b es undefined, debe lanzar un error
    });

    test("dividir dos números", () => {

        let a: any = 10;
        let b: any = 2;
        expect(dividir(a, b)).toBe(5); // 10 / 2 = 5
    
        a = 10;
        b = 0;
        expect(() => { dividir(a, b) }).toThrow("No se puede dividir por cero"); // División por cero
    
        a = "a";
        b = 2;
        expect(dividir(a, b)).toBeNaN(); // "a" no es un número, debe retornar NaN
    
        a = undefined;
        b = 2;
        expect(() => { dividir(a, b) }).toThrow("No se puede dividir indefinidos"); // a es undefined, debe lanzar un error
    
        a = 10;
        b = undefined;
        expect(() => { dividir(a, b) }).toThrow("No se puede dividir indefinidos"); // b es undefined, debe lanzar un error
    });
    
    test("elevar un número a una potencia", () => {

        let base: any = 2;
        let exponente: any = 3;
        expect(potencia(base, exponente)).toBe(8); // 2^3 = 8
    
        base = 5;
        exponente = 0;
        expect(potencia(base, exponente)).toBe(1); // 5^0 = 1
    
        base = -2;
        exponente = 3;
        expect(potencia(base, exponente)).toBe(-8); // (-2)^3 = -8
    
        base = 2;
        exponente = "a";
        expect(potencia(base, exponente)).toBeNaN(); // "a" no es un número, debe retornar NaN
    
        base = undefined;
        exponente = 3;
        expect(() => { potencia(base, exponente) }).toThrow("No se puede realizar operación con N° indefinidos"); // base es undefined, debe lanzar un error
    
        base = 2;
        exponente = undefined;
        expect(() => { potencia(base, exponente) }).toThrow("No se puede realizar operación con N° indefinidos"); // exponente es undefined, debe lanzar un error
    });

    test("calcular factorial de un número", () => {

        let a: any = 5;
        expect(factorial(a)).toBe(120); // 5! = 120
    
        a = 0;
        expect(factorial(a)).toBe(1); // 0! = 1
    
        a = -5;
        expect(factorial(a)).toBeNaN(); // Factorial no está definido para números negativos, debe retornar NaN
    
        a = 1.5;
        expect(factorial(a)).toBeNaN(); // Factorial no está definido para números no enteros, debe retornar NaN
    
        a = undefined;
        expect(() => { factorial(a) }).toThrow("No se puede calcular el factorial de un indefinido"); // a es undefined, debe lanzar un error
    
        a = "a";
        expect(factorial(a)).toBeNaN(); // "a" no es un número, debe retornar NaN
    });

    // afterAll(() => {
    //     app.close();
    // });
});
