const valores: Record<string, number> = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4,
    I: 1
};

export default function converterNumerosRomanos(str: string): number | null {
    const match = str.toUpperCase().match(/\bM{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b/);
    if (!match || !match[0]) return null;

    const romano = match[0];
    let resultado = 0;
    let i = 0;

    while (i < romano.length) {
        const duplo = romano.slice(i, i + 2);
        if (valores[duplo]) {
            resultado += valores[duplo];
            i += 2;
        } else {
            resultado += valores[romano[i]];
            i++;
        }
    }

    return resultado;
}