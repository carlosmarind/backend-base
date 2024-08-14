import { describe, test } from "@jest/globals";
import { suma } from "../src/calculadora.js";

// describe("Calculadora",() => {
//     test ("sumar dos numeros",() =>{
//         let a = 100;
//         let b = 100;
//         expect(100).toBe(100);
//     });
// }
// )

// describe("Calculadora",() => {
//     test ("sumar dos numeros",() =>{
//         let a = 100;
//         let b = 200;
//         expect(suma(a,b)).toBe(300);
//     });
// }
// )

//Cuando se ingresa un undefined(NaN)
describe("Calculadora",() => {
    test ("sumar dos numeros",() =>{
        let a: any = 100;
        let b: any = 200;
        expect(suma(a, b)).toBe(300);

        // a = 10;
        // b= "20";
        // expect(()=>suma(a, b)).toThrow("Los valores deben ser numeros");
    });
}
)
