import { describe, test, expect } from "@jest/globals";
import { restar, suma, operar, multiplicar, dividir, potencia, factorial } from "../src/calculadora.js";
import app from "../src/server.js";
import request from "supertest";

describe("Calculadora", () => {

    test("sumar dos numeros", () => {

        let a: any = 100;
        let b: any = 200;
        expect(suma(a, b)).toBe(300);

        a = 10;
        b = "a";
        expect(suma(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { suma(a, b) }).toThrow("No se puede sumar indefinidos");

    });

    test("operar dos numeros", () => {

        let a: any = 100;
        let b: any = 200;
    
        // Resta
        expect(operar("resta", b, a)).toBe(100);
    
        // Suma
        a = 10;
        b = "a";
        expect(operar("suma", a, b)).toBeNaN();
    
        a = undefined;
        b = 1;
        expect(() => { operar("suma", a, b) }).toThrow("No se puede sumar indefinidos");
    
        // Multiplicación
        a = 10;
        b = 20;
        expect(operar("multiplicacion", a, b)).toBe(200);
    
        a = 10;
        b = "a";
        expect(operar("multiplicacion", a, b)).toBeNaN();
    
        a = undefined;
        b = 1;
        expect(() => { operar("multiplicacion", a, b) }).toThrow("No se puede multiplicar indefinidos");
    
        // División
        a = 10;
        b = 2;
        expect(operar("division", a, b)).toBe(5);
    
        a = 10;
        b = 0;
        expect(() => { operar("division", a, b) }).toThrow("No se puede dividir por cero");
    
        a = 10;
        b = "a";
        expect(operar("division", a, b)).toBeNaN();
    
        a = undefined;
        b = 1;
        expect(() => { operar("division", a, b) }).toThrow("No se puede dividir indefinidos");
    
        // Potencia
        a = 2;
        b = 3;
        expect(operar("potencia", a, b)).toBe(8);
    
        a = 2;
        b = "a";
        expect(operar("potencia", a, b)).toBeNaN();
    
        a = undefined;
        b = 1;
        expect(() => { operar("potencia", a, b) }).toThrow("No se puede calcular la potencia con indefinidos");
    
        // Factorial
        a = 5;
        expect(operar("factorial", a)).toBe(120);
    
        a = 0;
        expect(operar("factorial", a)).toBe(1);
    
        a = -1;
        expect(() => { operar("factorial", a) }).toThrow("El factorial solo está definido para números no negativos");
    
        a = "a";
        expect(() => { operar("factorial", a) }).toThrow("El factorial solo está definido para números no negativos");
    
        a = undefined;
        expect(() => { operar("factorial", a) }).toThrow("No se puede calcular el factorial de un indefinido");
    
        a = 10;
        b = 20;
        expect(() => { operar("operacion_invalida", a, b) }).toThrow("Operación no reconocida");
    });    

    test("restar dos numeros", () => {

        let a: any = 100;
        let b: any = 200;
        expect(restar(b, a)).toBe(100);

        a = 10;
        b = "a";
        expect(restar(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { restar(a, b) }).toThrow("No se puede sumar indefinidos");
    });

    // Nuevos tests agregados

    test("multiplicar dos numeros", () => {
        let a: any = 10;
        let b: any = 20;
        expect(multiplicar(a, b)).toBe(200);

        a = 10;
        b = "a";
        expect(multiplicar(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { multiplicar(a, b) }).toThrow("No se puede multiplicar indefinidos");
    });

    test("dividir dos numeros", () => {
        let a: any = 10;
        let b: any = 2;
        expect(dividir(a, b)).toBe(5);

        a = 10;
        b = 0;
        expect(() => { dividir(a, b) }).toThrow("No se puede dividir por cero");

        a = 10;
        b = "a";
        expect(dividir(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { dividir(a, b) }).toThrow("No se puede dividir indefinidos");
    });

    test("calcular la potencia de dos numeros", () => {
        let a: any = 2;
        let b: any = 3;
        expect(potencia(a, b)).toBe(8);

        a = 2;
        b = "a";
        expect(potencia(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { potencia(a, b) }).toThrow("No se puede calcular la potencia con indefinidos");
    });

    test("calcular el factorial de un numero", () => {
        let a: any = 5;
        expect(factorial(a)).toBe(120);

        a = 0;
        expect(factorial(a)).toBe(1);

        a = -1;
        expect(() => { factorial(a) }).toThrow("El factorial solo está definido para números no negativos");

        a = "a";
        expect(() => { factorial(a) }).toThrow("El factorial solo está definido para números no negativos");

        a = undefined;
        expect(() => { factorial(a) }).toThrow("No se puede calcular el factorial de un indefinido");
    });

    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola mundo al usuario Andrez Higuera");
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

});