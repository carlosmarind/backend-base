import { describe, test, expect } from "@jest/globals";
import { restar, suma, operar } from "../src/app/calculadora";
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
        expect(operar("resta", b, a)).toBe(100);

        a = 10;
        b = "a";
        expect(operar("suma", a, b)).toBeNaN();

        a = undefined;
        b = 1;
        expect(() => { operar("suma", a, b) }).toThrow("No se puede sumar indefinidos");

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

    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toMatch(/Hola mundo al usuario/);
            })
    });
});