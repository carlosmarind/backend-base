function operar(operacion: string, a: number, b: number): number {
    switch (operacion) {
        case 'suma':
            return suma(a, b);
        case 'resta':
            return restar(a, b);
        case 'multiplicar':
            return multiplicar(a, b);
        case 'dividir':
            return dividir(a, b);
        case 'potencia':
            return potencia(a, b);
        case 'factorial':
            return factorial(a);
        default:
            throw new Error("Operación no soportada");
    }
}

function suma(a: number, b: number): number {
    if (a == null || b == null) {
        throw new Error("No se puede sumar indefinidos");
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    return a + b;
}

function restar(a: number, b: number): number {
    if (a == null || b == null) {
        throw new Error("No se puede restar indefinidos");
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    return a - b;
}

function multiplicar(a: number, b: number): number {
    if (a == null || b == null) {
        throw new Error("No se puede multiplicar indefinidos");
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    return a * b;
}

function dividir(a: number, b: number): number {
    if (a == null || b == null) {
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

function potencia(a: number, b: number): number {
    if (a == null || b == null) {
        throw new Error("No se puede realizar operación con N° indefinidos");
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    return Math.pow(a, b);
}

function factorial(a: number): number {
    if (a == null) {
        throw new Error("No se puede calcular el factorial de un indefinido");
    }
    if (typeof a !== 'number' || a < 0 || !Number.isInteger(a)) {
        return NaN;
    }
    let result = 1;
    for (let i = 2; i <= a; i++) {
        result *= i;
    }
    return result;
}

export { suma, operar, restar, multiplicar, dividir, potencia, factorial };
