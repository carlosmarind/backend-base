export const esPalindromo = (frase: string) => {
    const fraseSinEspacios = frase.replace(/\s/g, "").toLowerCase();
    const fraseInvertida = fraseSinEspacios.split("").reverse().join("");
    console.log(fraseSinEspacios);
    console.log(fraseInvertida);
    return fraseSinEspacios === fraseInvertida;
}