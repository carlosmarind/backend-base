import { describe, test, expect } from "@jest/globals";
import { restar, suma, operar, operar_un_numero, factorial, multiplicar, dividir, exponer } from "../src/calculadora.js";
import app from "../src/server.js";
import request from "supertest";
import exp from "constants";

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


    test("restar dos numeros", () => {

        let a: any = 100;
        let b: any = 200;
        expect(restar(b, a)).toBe(100);

        a = 10;
        b = "a";
        expect(restar(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { restar(a, b) }).toThrow("No se puede restar indefinidos");
    });

    test("multiplicar dos numeros", () => {

        let a: any = 100;
        let b: any = 1;
        expect(multiplicar(b, a)).toBe(100);

        a = 10;
        b = -0.01;
        expect(multiplicar(a, b)).toBe(-0.1);

        a = 10;
        b = "a";
        expect(multiplicar(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { multiplicar(a, b) }).toThrow("No se puede multiplicar indefinidos");
    });


    test("dividir dos numeros", () => {

        let a: any = 100;
        let b: any = 1;
        expect(dividir(b, a)).toBe(0.01);

        a = 10;
        b = 0.1;
        expect(dividir(a,b)).toBe(100);

        a = 10;
        b = "a";
        expect(dividir(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { dividir(a, b) }).toThrow("No se puede dividir indefinidos");

        a = 10;
        b = 0;
        expect(dividir(a, b)).toBeUndefined();
        //expect(() => { dividir(a, b) }).toThrow("No se puede dividir por 0")

        
    });

    test("elevar dos numeros", () => {

        let a: any = 10;
        let b: any = 2;
        expect(exponer(a,b)).toBe(100);

        a = 10;
        b = 0;
        expect(exponer(a,b)).toBe(1);

        a = 10;
        b = -1;
        expect(exponer(a,b)).toBe(0.1);

        a = 10;
        b = "a";
        expect(exponer(a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => {exponer(a, b) }).toThrow("No se puede elevar indefinidos");
    });


    test("factorial de a", () => {

        let a: any = 5;
        expect(factorial(a)).toBe(120);

        a = -1;
        expect(factorial(a)).toBe(-1);

        a = 0;
        expect(factorial(a)).toBe(1);

        a = "a";
        expect(factorial(a)).toBeNaN();

        a = undefined;
        expect(() => { factorial(a) }).toThrow("no se puede hacer factorial de indefinidos");
    });

    test("operar dos numeros", () => {

        let a: any = 100;
        let b: any = 200;
        expect(operar("resta", b, a)).toBe(100);

        a = 10;
        b = "a";
        expect(operar("suma", a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { operar("suma", a, b) }).toThrow("No se puede sumar indefinidos");
 
        a = 10;
        b = 40;
        expect(operar("multiplicacion", a, b)).toBe(400);

        a = 10;
        b = 5;
        expect(operar("divicion", a, b)).toBe(2);

        a = 10;
        b = "a";
        expect(operar("elevar", a, b)).toBeNaN();

        a = 4;
        b = undefined
        expect(operar_un_numero("factorial", a)).toBe(24);

    });






    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola mundo al usuario cmd");
            })

    });

    test("test de endpoint operar", async () => {
        await request(app)
            .get("/operar?a=30&b=30&oper=suma")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("el resultado de la operacion suma de 30 y 30 es 60");
            })

        await request(app)
            .get("/operar?a=30&b=30&oper=divicion")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("el resultado de la operacion divicion de 30 y 30 es 1");
            })

        await request(app)
            .get("/operar?a=5&oper=factorial")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("el resultado de la operacion factorial de 5 es 120");
            })

        return await request(app)
            .get("/operar?a=30&b=30&oper=multiplicacion")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("el resultado de la operacion multiplicacion de 30 y 30 es 900");
            })
    });

});