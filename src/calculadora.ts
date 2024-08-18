function operar(operacion: string, a: number, b?: number) {
    if (operacion === 'suma') {
        return suma(a, b);
    } else if (operacion === 'resta') {
        return restar(a, b);
    } else if (operacion === 'multiplicacion') {
        return multiplicar(a, b);
    } else if (operacion === 'division') {
        return dividir(a, b);
    } else if (operacion === 'potencia') {
        return potencia(a, b);
    } else if (operacion === 'factorial') {
        return factorial(a);
    } else {
        throw new Error("Operación no reconocida");
    }
}

function suma(a: number, b?: number) {

    if (a === undefined || b === undefined) {
        console.log("retornando throw")
        throw new Error("No se puede sumar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a + b;
}

function restar(a: number, b?: number) {
    if (a === undefined || b === undefined) {
        console.log("retornando throw")
        throw new Error("No se puede sumar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a - b;
}

function multiplicar(a: number, b?: number) {
    if (a === undefined || b === undefined) {
        throw new Error("No se puede multiplicar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a * b;
}

function dividir(a: number, b?: number) {
    if (a === undefined || b === undefined) {
        throw new Error("No se puede dividir indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    if (b === 0) {
        throw new Error("No se puede dividir por cero");
    }

    return a / b;
}

function potencia(a: number, b?: number) {
    if (a === undefined || b === undefined) {
        throw new Error("No se puede calcular la potencia con indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return Math.pow(a, b);
}

function factorial(a: number): number {
    if (a === undefined) {
        throw new Error("No se puede calcular el factorial de un indefinido");
    }

    if (typeof a !== 'number' || a < 0) {
        throw new Error("El factorial solo está definido para números no negativos");
    }

    if (a === 0 || a === 1) {
        return 1;
    }

    return a * factorial(a - 1);
}

export { suma, operar, restar, multiplicar, dividir, potencia, factorial };