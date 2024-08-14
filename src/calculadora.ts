const suma = (a:number,b:number) => {
if(isNaN(a) || isNaN(b)){
    throw new Error("Los valores deben ser numeros");
}

    return a + b;
}
export {suma};