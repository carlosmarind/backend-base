function operar(operacion: string, a: number, b: number) {
    if (operacion === 'suma') {
        return suma(a, b);
    } else if (operacion === 'resta') {
        return restar(a, b);
    } else if (operacion === 'multiplicar') {
        return multiplicar(a, b);
    } else if (operacion === 'dividir') {
        return dividir(a, b);
    } else if (operacion === 'potencia') {
        return potencia(a, b);
    } else if (operacion === 'factorial') {
        return factorial(a);
    }
}

function suma(a: number, b: number) {

    if (a === undefined || b === undefined) {
        console.log("retornando throw")
        throw new Error("No se puede sumar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    

    return a + b;
}

function restar(a: number, b: number) {
    if (a === undefined || b === undefined) {
        console.log("retornando throw")
        throw new Error("No se puede sumar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a - b;
}

function multiplicar(a: number, b: number) {
    if (a === undefined || b === undefined) {
        console.log("retornando throw")
        throw new Error("No se puede multiplicar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a * b;
}

function dividir(a: number, b: number): number {
    // Verificar si alguno de los parámetros es undefined
    if (a === undefined || b === undefined) {
        console.log("retornando throw");
        throw new Error("No se puede dividir indefinidos");
    }

    // Verificar si ambos parámetros son números
    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    // Verificar si b es cero, ya que la división por cero no está permitida
    if (b === 0) {
        console.log("retornando throw");
        throw new Error("No se puede dividir por cero");
    }

    // Realizar la divisiónn
    return a / b;
}

function potencia(a: number, b: number): number {

    // Verificar si alguno de los parámetros es undefined
    if (a === undefined || b === undefined) {
        console.log("retornando throw");
        throw new Error("No se puede realizar operación con N° indefinidos");
    }

    // Verificar si ambos parámetros son números
    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    // Calcular la potencia
    return Math.pow(a, b);
}

function factorial(a: number): number {
    // Verificar si el parámetro es undefined
    if (a === undefined) {
        console.log("retornando throw");
        throw new Error("No se puede calcular el factorial de un indefinido");
    }

    // Verificar si el parámetro es un número y si es un número entero positivo
    if (typeof a !== 'number' || a < 0 || !Number.isInteger(a)) {
        return NaN;
    }

    // Calcular el factorial
    let result = 1;
    for (let i = 2; i <= a; i++) {
        result *= i;
    }

    return result;
}



export { suma, operar, restar, multiplicar, dividir, potencia, factorial };