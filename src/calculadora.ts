function operar(operacion: string, a: number, b: number) {
    if (operacion === 'suma') {
        return suma(a, b);
    } 
    else if (operacion === 'resta') {
        return restar(a, b);
    }
    else if(operacion === 'multiplicacion' ){
        return multiplicar(a,b)
    }
    else if(operacion === 'divicion' ){
        return dividir(a,b)
    }
    else if(operacion === 'elevar' ){
        return exponer(a,b)
    }
}

function operar_un_numero(operacion: string, a: number) {
    if(operacion === 'factorial' ){
        return factorial(a)
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
        throw new Error("No se puede restar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a - b;
}

function multiplicar(a: number, b: number){
    if (a === undefined || b === undefined) {
        console.log("retornando throw")
        throw new Error("No se puede multiplicar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    return a*b;
}

function dividir(a: number, b: number){
    if (a === undefined || b === undefined) {
        console.log("retornando throw")
        throw new Error("No se puede dividir indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    if(b!==0){
        return a/b;
    }
    return ;

    
}

function exponer(a: number, b: number ){
    if (a === undefined || b === undefined) {
        console.log("retornando throw")
        throw new Error("No se puede elevar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    return a**b;
}

function factorial(a: number){
    if (a === undefined ) {
        console.log("retornando throw")
        throw new Error("no se puede hacer factorial de indefinidos");
    }
    if (typeof a !== 'number') {
        return NaN;
    }

    if (a<0){
        return -1;
    }
    if (a==0){
        return 1;
    }
    let x =  a;
    for(var i = a -1; i>=1;i--){
        x *= i;
    }
    
    return x
}

export { suma, restar, multiplicar, dividir ,exponer, factorial, operar, operar_un_numero};